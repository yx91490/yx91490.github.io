# Impala

## 端口

| 客户端                    | 端口  |
| ------------------------- | ----- |
| impala-shell, ODBC driver | 21000 |
| JDBC, ODBC driver         | 21050 |

## JDBC连接方式

1. 使用Cloudera JDBC Connector`com.cloudera.impala.jdbc41.Driver`，连接串格式：
    ```
    jdbc:impala://Host:Port[/Schema];Property1=Value;Property2=Value;...
    ```

2. 使用Hive JDBC Driver`org.apache.hive.jdbc.HiveDriver`：
   1. 简单连接串（注意21050端口号后面的“/”，以及“;auth=noSasl”，缺少会出错）：
      ```
      jdbc:hive2://myhost.example.com:21050/;auth=noSasl
      ```
   2. kerberos连接串：
      ```
      jdbc:hive2://myhost.example.com:21050/;principal=impala/myhost.example.com@H2.EXAMPLE.COM
      ```
   3. LDAP连接串：
      ```
      jdbc:hive2://host:port/db_name;user=ldap_userid;password=ldap_password
      ```
      

## 问题

**PreparedStatement不能使用UPSERT语句的问题**

在Version 2.6.8中已被解决（参考 [IMPJ-419] ）。

**中文乱码**

参考：https://docs.cloudera.com/documentation/enterprise/latest/topics/impala_string.html#string

## SQL Hints

> In Impala 2.0 and higher, you can specify the hints inside comments that use either the `/* */` or `--` notation. Specify a `+` symbol immediately before the hint name. Recently added hints are only available using the `/* */` and `--` notation. For clarity, the `/* */` and `--` styles are used in the syntax and examples throughout this section. With the `/* */` or `--` notation for hints, specify a `+` symbol immediately before the first hint name. Multiple hints can be specified separated by commas, for example `/* +clustered,shuffle */`

```
UPSERT /* +NOCLUSTERED,NOSHUFFLE */ INTO ...
```

> Starting from CDH 5.12 / Impala 2.9, the INSERT or UPSERT operations into Kudu tables automatically add an exchange and a sort node to the plan that partitions and sorts the rows according to the partitioning/primary key scheme of the target table (unless the number of rows to be inserted is small enough to trigger single node execution). Since Kudu partitions and sorts rows on write, pre-partitioning and sorting takes some of the load off of Kudu and helps large INSERT operations to complete without timing out. However, this default behavior may slow down the end-to-end performance of the INSERT or UPSERT operations. Starting from CDH 5.13 / Impala 2.10, you can use the /* +NOCLUSTERED */ and /* +NOSHUFFLE */ hints together to disable partitioning and sorting before the rows are sent to Kudu. Additionally, since sorting may consume a large amount of memory, consider setting the MEM_LIMIT query option for those queries.

参考：

https://impala.apache.org/docs/build/html/topics/impala_hints.html

https://docs.cloudera.com/documentation/enterprise/5-16-x/topics/impala_upsert.html

https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/impala_kudu.html

## Impala flush mode

Use Kudu AUTO_FLUSH_BACKGROUND mode

https://issues.apache.org/jira/browse/IMPALA-4134

## 参考

- [Configuring Impala to Work with JDBC](https://docs.cloudera.com/documentation/enterprise/latest/topics/impala_jdbc1.html#impala_jdbc)
- [impala-shell Configuration Options](https://docs.cloudera.com/documentation/enterprise/5-15-x/topics/impala_shell_options.html)
- [Connecting to impalad through impala-shell](https://docs.cloudera.com/documentation/enterprise/5-15-x/topics/impala_connecting.html#connecting)
- [Apache Impala Guide](http://impala.apache.org/docs/build/impala-2.12.pdf)
- [Cloudera JDBC Driver 2.5.5 for Impala](https://docs.cloudera.com/documentation/other/connectors/impala-jdbc/2-5-5/Cloudera-JDBC-Driver-for-Impala-Install-Guide-2-5-5.pdf)
- [Cloudera JDBC Driver for Impala 2.6.15](https://docs.cloudera.com/documentation/other/connectors/impala-jdbc/2-6-15/Cloudera-JDBC-Driver-for-Impala-Release-Notes.pdf)

