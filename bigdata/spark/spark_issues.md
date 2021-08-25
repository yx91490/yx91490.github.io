# Spark问题记录

### 启动脚本软连接报错

启动`spark-submit`报错：

```
/bin/spark-submit: line 21: /bin/find-spark-home: No such file or directory
/bin/spark-submit: line 27: /bin/spark-class: No such file or directory
```

原因：环境变量没有正确设置`SPARK_HOME`变量。

参考：https://issues.apache.org/jira/browse/SPARK-13915

### SparkSQL insert overwrite  + 动态分区报错

在spark程序中执行类似下面代码（其中目标表`tmp.id_name2`是外部表）：

```sql
set hive.exec.dynamic.partition.mode=nostrict;
insert overwrite table tmp.id_name2 partition(dt) select * from tmp.id_name where dt='2001';
```

#### 日志

```
20/08/05 14:38:05 ERROR Hive: Exception when loading partition with parameters  partPath=hdfs://nameservice/user/hive/warehouse/tmp.db/id_name2/.hive-staging_hive_2020-08-05_14-38-00_715_3629476922121193803-1/-ext-10000/dt=2001,  table=id_name2,  partSpec={dt=2001},  loadFileType=REPLACE_ALL,  listBucketingLevel=0,  isAcid=false,  resetStatistics=false
org.apache.hadoop.hive.ql.metadata.HiveException: Directory hdfs://nameservice/user/hive/warehouse/tmp.db/id_name2/dt=2001 could not be cleaned up.
    at org.apache.hadoop.hive.ql.metadata.Hive.deleteOldPathForReplace(Hive.java:4666)
    at org.apache.hadoop.hive.ql.metadata.Hive.replaceFiles(Hive.java:4597)
    at org.apache.hadoop.hive.ql.metadata.Hive.loadPartition(Hive.java:2132)
    at org.apache.hadoop.hive.ql.metadata.Hive$5.call(Hive.java:2588)
    at org.apache.hadoop.hive.ql.metadata.Hive$5.call(Hive.java:2579)
    at java.util.concurrent.FutureTask.run(FutureTask.java:266)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
    at java.lang.Thread.run(Thread.java:748)
Caused by: java.io.FileNotFoundException: File hdfs://nameservice/user/hive/warehouse/tmp.db/id_name2/dt=2001 does not exist.
    at org.apache.hadoop.hdfs.DistributedFileSystem.listStatusInternal(DistributedFileSystem.java:1053)
    at org.apache.hadoop.hdfs.DistributedFileSystem.access$1000(DistributedFileSystem.java:131)
    at org.apache.hadoop.hdfs.DistributedFileSystem$24.doCall(DistributedFileSystem.java:1113)
    at org.apache.hadoop.hdfs.DistributedFileSystem$24.doCall(DistributedFileSystem.java:1110)
    at org.apache.hadoop.fs.FileSystemLinkResolver.resolve(FileSystemLinkResolver.java:81)
    at org.apache.hadoop.hdfs.DistributedFileSystem.listStatus(DistributedFileSystem.java:1120)
    at org.apache.hadoop.fs.FileSystem.listStatus(FileSystem.java:1868)
    at org.apache.hadoop.fs.FileSystem.listStatus(FileSystem.java:1910)
    at org.apache.hadoop.hive.ql.metadata.Hive.cleanUpOneDirectoryForReplace(Hive.java:4681)
    at org.apache.hadoop.hive.ql.metadata.Hive.deleteOldPathForReplace(Hive.java:4661)
    ... 8 more
Error in query: org.apache.hadoop.hive.ql.metadata.HiveException: Exception when loading 1 in table id_name2 with loadPath=hdfs://nameservice/user/hive/warehouse/tmp.db/id_name2/.hive-staging_hive_2020-08-05_14-38-00_715_3629476922121193803-1/-ext-10000;
```

#### 分析

发现只有在partition元信息存在但是对应HDFS目录被删除才会出现，spark-sql命令行没有复现。

#### 嫌疑代码

[InsertIntoHadoopFsRelationCommand.scala](https://github.com/apache/spark/blob/v2.4.6/sql/core/src/main/scala/org/apache/spark/sql/execution/datasources/InsertIntoHadoopFsRelationCommand.scala)

[InsertIntoHiveTable.scala](https://github.com/apache/spark/blob/v2.4.6/sql/hive/src/main/scala/org/apache/spark/sql/hive/execution/InsertIntoHiveTable.scala)

[SQLConf.scala](https://github.com/apache/spark/blob/v2.4.6/sql/catalyst/src/main/scala/org/apache/spark/sql/internal/SQLConf.scala#L1417)

#### 参考

[SPARK-29295_Duplicate result when dropping partition of an external table and then overwriting](https://issues.apache.org/jira/browse/SPARK-29295#)

### 一个scala版本兼容问题

运行一个spark任务的时候报错：

```
Exception in thread "main" java.lang.NoSuchMethodError: scala.Predef$.refArrayOps([Ljava/lang/Object;)[Ljava/lang/Object;
```

按理说这种问题原因是类版本问题，看了一下scala2.11里`scala.Predef$.refArrayOps`的签名返回的是`ArrayOps[] `，而scala2.12里`scala.Predef$.refArrayOps`的签名返回的是`Object[] `，也就是说集群实际运行的scala版本是2.11，而项目里依赖的是2.12，那么只要把项目的scala版本和集群的scala版本保持一致就可以了，修改完项目里scala版本之后再编译执行结果还是同样的报错，瞬间感觉没招了。然后死马当活马医各种猜测各种改依然没有见效。

在毫无头绪之际，突然瞥见maven编译过程中有几个警告信息：

```
[INFO] --- scala-maven-plugin:3.3.1:compile (scala-compile-first) @ spark-demo ---
[WARNING]  Expected all dependencies to require Scala version: 2.12.0
[WARNING]  com.twitter:chill_2.11:0.8.0 requires scala version: 2.11.7
[WARNING] Multiple versions of scala libraries detected!
```

`scala-maven-plugin`插件为什么依赖的scala版本是2.12？突然灵机一动看了一下pom：

```xml
<plugin>
    <groupId>net.alchim31.maven</groupId>
    <artifactId>scala-maven-plugin</artifactId>
    <version>3.3.1</version>
    <executions>
        <execution>
            <id>scala-compile-first</id>
            <phase>process-resources</phase>
            <goals>
                <goal>add-source</goal>
                <goal>compile</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <scalaVersion>2.12</scalaVersion>
    </configuration>
</plugin>
```

竟然在插件里指定了scala的版本！把`<configuration>`标签去掉之后重新编译执行结果顺利执行。

总结：总的来说scala的这个编译插件还是有很多黑科技，处处要小心，另外任何问题都有符合逻辑的原因，随意猜测解决不了问题。

