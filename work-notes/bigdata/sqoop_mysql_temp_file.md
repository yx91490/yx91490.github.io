### 问题简介

之前DBA跟我们反馈过一个问题，说我们平台的DB导入任务运行时会在MySQL服务端产生大量临时文件把磁盘空间占满，发生问题的任务是拉取很大表的一个全量数据，为了加快导入过程一般开几十个线程并行导入，而且调度任务大多集中在0点运行加重了这种情况的产生。我们导入任务主要使用的是sqoop这个开源工具，后来经过同事调研说把sqoop的direct模式开启就能解决这个问题，原理大致的direct模式会调用MySQLDump这个命令去导出数据，比JDBC的方式更高效。

### 临时解决

为了更灵活的支持导入任务我们之前使用了sqoop的`--query`参数定义导出数据，然而sqoop的direct模式仅支持单表导出，这样最后使用`--table`，`--columns`，`--where`来代替`--query`这种方式。

在修改代码支持direct导入的过程中观察到sqoop打出这样的日志：

	WARN manager.DirectMySQLManager: Direct-mode import from MySQL does not support column
	WARN manager.DirectMySQLManager: selection. Falling back to JDBC-based import.
what？意思是direct模式不支持选择列，最后降级为使用JDBC的方式导出数据？但是DBA反馈说这种方式确实解决了问题。带着先解决问题的做事方法先临时上了这种方案，想着之后有时间再仔细研究下。

### 代码排查

#### 编译

sqoop用ant做包管理，之前并没有用过而且Idea对它的支持也不是很好，还好可以将项目转为eclipse项目，然后再导入idea中：

	ant eclipse
可以把配置文件中的镜像换成国内的镜像站点：

```shell
# 查找配置文件
grep -r "maven.org/maven2" .
# 替换maven镜像站点
sed -i 's/repo2\.maven\.org\/maven2/[maven mirror]' [file]
```
编译：

	ant
编译成功后会在build目录下面出现sqoop-1.4.6.jar这样的jar包。

#### 问题复现

在测试环境有一张150w行数据的表，分别使用两种方式进行导入，数据量约为150M：

	INFO mapreduce.ImportJobBase: Transferred 153.3532 MB in 76.3689 seconds (2.0081 MB/sec)
	INFO mapreduce.ImportJobBase: Retrieved 1579224 records.
在MySQL端可以观察到，当使用`--query`方式导入的时候/tmp目录会从2M陡增到2.7G大小，而且主要被`#sql_xxx.MYD`这个文件占着：

	# du -sh /tmp/
	2.5M	/tmp/
	# du -sh /tmp/
	2.7G	/tmp/
而使用direct模式的导入/tmp目录仅有微微变化，并没有`#sql_xxx.MYD`文件产生。

这两种方式的根本区别是什么呢？带着这个问题去翻翻代码，发现`Falling back to JDBC-based import.`这句话是DirectMySQLManager类里打印出来的，然后直接调用父类MySQLManager的importTable()方法了，也就是最终跟direct模式没有什么关系，只是importTable()还是importQuery()这俩方法的区别，果然去掉`--direct`参数效果一样。期间加了很多日志调试看究竟差在哪里，最后无论mapreduce的mapper类还是InputFormat类都是一样的，最后在DBRecordReader类中一个参数引起了我的注意：

```java
protected ResultSet executeQuery(String query) throws SQLException {
  this.statement = connection.prepareStatement(query,
      ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);

  Integer fetchSize = dbConf.getFetchSize();
  if (fetchSize != null) {
    LOG.info("============Using fetchSize for next query: " + fetchSize);
    statement.setFetchSize(fetchSize);
  }

  LOG.info("Executing query: " + query);
  return statement.executeQuery();
}
```

加了日志后重新运行，两种方式在mr的map端日志的输出如下：

	# importTable()
	org.apache.sqoop.mapreduce.db.DBRecordReader: ============Using fetchSize for next query: -2147483648
	# importQuery()
	org.apache.sqoop.mapreduce.db.DBRecordReader: ============Using fetchSize for next query: 1000
直觉告诉我，这应该是问题产生的根本差异了。

### 代码验证

查询资料说statement.setFetchSize()是用来优化大数据量查询的，当设置成Integer.MIN_VALUE时，配合ResultSet.TYPE_FORWARD_ONLY和ResultSet.CONCUR_READ_ONLY这两个参数会进行流式查询，而设置成1000，则每次网络请求会查询1000条。排除sqoop中其他因素用代码进行了进一步的验证：

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import static java.sql.Connection.TRANSACTION_READ_COMMITTED;

public class MysqlFetchSizeDemo {
    private static final Logger logger = LoggerFactory.getLogger(MysqlFetchSizeDemo.class);

    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            logger.error("", e);
        }
    }

    private String url;

    private int fetchSize;

    public MysqlFetchSizeDemo(String url, int fetchSize) {
        this.url = url;
        this.fetchSize = fetchSize;
    }

    public static void main(String[] args) throws SQLException {
        MysqlFetchSizeDemo demo = new MysqlFetchSizeDemo(args[0], Integer.valueOf(args[1]));
        ResultSet resultSet = demo.exec(args[2]);

        long count = 0;
        logger.info("==start");
        long l = System.nanoTime();
        while (resultSet.next()) {
            count++;
            if (count % 10000 == 0) {
                logger.info("batch:" + count);
            }
            String v = resultSet.getString(1);
            System.out.printf("%s\r", v);
        }
        logger.info("==end");

        long l1 = System.nanoTime();
        logger.info("cost:" + (l1 - l) * 1e-9);
    }

    private ResultSet exec(String sql) throws SQLException {
        PreparedStatement stmt = getConn().prepareStatement(sql
                , ResultSet.TYPE_FORWARD_ONLY
                , ResultSet.CONCUR_READ_ONLY);
        stmt.setFetchSize(fetchSize);

        return stmt.executeQuery();
    }

    private Connection getConn() throws SQLException {
        Connection connection = DriverManager.getConnection(url, "xxxx", "xxxx");
        connection.setTransactionIsolation(TRANSACTION_READ_COMMITTED);
        connection.setAutoCommit(false);
        return connection;
    }
}
```

### 未解决的问题

至于为什么MySQL服务端会产生约为查询数据20倍大小的临时文件还有待深入研究。

### 总结

其实在这次问题排除过程中也走了很多弯路，但是也收获了对sqoop源码的深入了解，在工作中使用的开源组件其实不仅要掌握使用也要掌握原理，这样出现问题的时候能更敏锐的发现问题所在。