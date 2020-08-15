# JDBC学习笔记

## 概念

### Schema

在MySQL中`schema`和`database`是同义词，在SQL语句中可以把关键字`database`替换为关键字`schema`。但是在Oracle, DB2等数据库中有所不同。

参考：

- [Difference Between Schema / Database in MySQL](https://stackoverflow.com/questions/11618277/difference-between-schema-database-in-mysql)
- [数据库中的Schema是什么?](https://blog.csdn.net/u010429286/article/details/79022484)
- [What is a Database Schema?](https://database.guide/what-is-a-database-schema/)
- [Database-specific Catalog and Schema Considerations](https://docs.oracle.com/cd/E13162_01/odsi/docs10gr3/datasrvc/Database-specific%20Catalog%20and%20Schema%20Considerations.html)
- [ALL_TABLES - Catalog Views - Oracle to SQL Server Migration](http://www.sqlines.com/oracle/all_tables)
- [List All Tables In Oracle Database Query](https://www.arungudelli.com/tutorial/oracle/list-all-tables-in-oracle-query/)
- [System Tables and Views](https://docs.oracle.com/database/timesten-18.1/TTSYS/systemtables.htm#TTSYS379)
- [ORACLE系统表大全](https://www.cnblogs.com/mq0036/p/4157267.html)

## Connection接口

### Timeout

`Connection.setNetworkTimeout()`

参考：

- [Setting Network Timeout for JDBC connection](https://stackoverflow.com/questions/18822552/setting-network-timeout-for-jdbc-connection)

### 切换Database

使用jdbc接口而不要执行`USE <databasename>`语句：

```java
Connection.setCatalog();
```

原因：

1. 数据库无关性
2. driver可能需要执行一些其他操作

注意：

- 不会影响已经存在的或者prepared的statement

参考：

- [Java, how to change current database to another?](https://stackoverflow.com/questions/13433326/java-how-to-change-current-database-to-another)
- [5.3 Configuration Properties for Connector/J](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-configuration-properties.html)

## 查询

### 查询元数据

Oracle获取列comment：

```java
OracleConnection oraCon = (OracleConnection)con;
oraCon.setRemarksReporting(true);
DatabaseMetaData dmt = con.getMetaData();    
colRs = dmt.getColumns(null, "dbo", 'Student', null);
while (colRs.next()) {
   System.out.println(colRs.getString("REMARKS");
}
```

MySQL获取表及列comment：连接参数中指定`useInformationSchema=true`。

参考：

- [How to get Column Comments in JDBC](https://stackoverflow.com/questions/37612183/how-to-get-column-comments-in-jdbc)
- [Retrieve mysql table comment using DatabaseMetaData](https://stackoverflow.com/questions/14146230/retrieve-mysql-table-comment-using-databasemetadata)

### Satement

Statement.setMaxRows() 给JDBC驱动程序一个提示，当此Statement生成的ResultSet对象需要更多行时，应该从数据库中获取行数。

Statement.setFetchSize() 将此Statement对象生成的任何ResultSet对象可以包含的最大行数限制为给定数目。

参考：

- [执行对象Statement、PreparedStatement和CallableStatement详解 JDBC简介（五）](https://www.cnblogs.com/noteless/p/10307273.html)

## MySQL时区

相关配置参数的组合情况：

|                           | useLegacyDatetimeCode=True（默认）                           | useLegacyDatetimeCode=False         |
| ------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| useTimezone=False（默认） | 将年月日时分秒+"连接时区", 创建时间戳                        | 将年月日时分秒+"配置时区"创建时间戳 |
| useTimezone=True          | 先将年月日时分秒+"连接时区", 创建时间戳<br />再进行时区调整, 调整为"配置时区". | 将年月日时分秒+"配置时区"创建时间戳 |

参考：

[5.3 Configuration Properties for Connector/J](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-configuration-properties.html)

[Chapter 16 Known Issues and Limitations](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-usagenotes-known-issues-limitations.html)

[0078 Java与MySQL时间戳传递/存储/协调问题--userLegacyDatetimeCode--userTimezone--serverTimezone](https://www.cnblogs.com/sonng/p/11294609.html)

## 插入数据

### Null处理

```java
Statementstmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT ...");
while (rs.next()) {
    int num = rs.getInt(1);
    if (rs.wasNull()) {
        // num is null
    } else {
        // num is not null
    }
}
```

### 日期类型

**JDBC 4.2 以下：**

不带时间的`DATE`类型：

```java
ps.setDate(2, java.sql.Date.valueOf("2013-09-04"));
//endDate是java.util.Date类的实例
ps.setDate(2, new java.sql.Date(endDate.getTime());
ps.setDate(2, new java.sql.Date(System.currentTimeMillis()));
// Since Java 8
ps.setDate(2, java.sql.Date.valueOf(java.time.LocalDate.now()));
```

带时间的`TIMESTAMP` 或 `DATETIME`类型：

```java
ps.setTimestamp(2, java.sql.Timestamp.valueOf("2013-09-04 13:30:00");
ps.setTimestamp(2, new java.sql.Timestamp(endDate.getTime()));
ps.setTimestamp(2, new java.sql.Timestamp(System.currentTimeMillis()));
// Since Java 8
ps.setTimestamp(2, java.sql.Timestamp.from(java.time.Instant.now()));
ps.setTimestamp(2, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()));
```

**JDBC 4.2 以上：**

```
PreparedStatement.setObject(1 , localDate);
ResultSet.getObject(1 , LocalDate.class);
```

使用`EPOCH_DATE`替代日期`0000-00-00`：

```
LocalDate EPOCH_DATE = LocalDate.ofEpochDay(0); // 1970-01-01 is day 0 in Epoch counting.
```

## 参考

- [JDBC处理SQL NULL值](https://blog.csdn.net/m0_37409332/article/details/78667269)

- [Using setDate in PreparedStatement](https://stackoverflow.com/questions/18614836/using-setdate-in-preparedstatement)