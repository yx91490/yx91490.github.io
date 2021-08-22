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
      

参考：

- [Configuring Impala to Work with JDBC](https://docs.cloudera.com/documentation/enterprise/latest/topics/impala_jdbc1.html#impala_jdbc)
- [impala-shell Configuration Options](https://docs.cloudera.com/documentation/enterprise/5-15-x/topics/impala_shell_options.html)
- [Connecting to impalad through impala-shell](https://docs.cloudera.com/documentation/enterprise/5-15-x/topics/impala_connecting.html#connecting)
- [Apache Impala Guide](http://impala.apache.org/docs/build/impala-2.12.pdf)
- [Cloudera JDBC Driver 2.5.5 for Impala](https://docs.cloudera.com/documentation/other/connectors/impala-jdbc/2-5-5/Cloudera-JDBC-Driver-for-Impala-Install-Guide-2-5-5.pdf)
- [Cloudera JDBC Driver for Impala 2.6.15](https://docs.cloudera.com/documentation/other/connectors/impala-jdbc/2-6-15/Cloudera-JDBC-Driver-for-Impala-Release-Notes.pdf)

## 负载均衡

负载均衡主要适用于`impalad`进程。

负载均衡有下面的优势：

1. 应用程序只需要连接到一个地址
2. 实现高可用连接
3. coordinator节点比其他节点需要更多CPU和内存。代理服务器可以调度查询从而使每个连接使用不同的coordinator节点。

选择负载均衡算法：

###### Leastconn

使用最少的连接将会话连接到coordinator节点，通常用于由许多独立的，短期运行的查询。

###### Source IP Persistence

来自相同IP地址的会话始终会到达相同的协调器。对于混合着查询和DDL语句的情况是一个不错的选择，例如`CREATE TABLE` 和 `ALTER TABLE`。由于DDL语句中的元数据更改需要花费时间才能在整个群集中传播，因此在这种情况下，最好使用`Source IP Persistence`算法。如果无法选择`Source IP Persistence`，请通过同一会话运行DDL和依赖于DDL结果的后续查询，例如通过运行`impala-shell -f script_file` 通过一个会话提交多个语句。

###### Round-robin

将连接分布到所有coordinator节点，通常不建议用于Impala。

你可能需要执行基准测试和负载测试，以确定哪个设置对你的用例是最优的。总是使用两种负载平衡算法：Hue使用`Source IP Persistence`，其他的场景使用`Leastconn`。

### 参考

[Using Impala through a Proxy for High Availability](https://docs.cloudera.com/documentation/enterprise/latest/topics/impala_proxy.html)

## 账号授权

SHOW语句与权限相关语法：

```sql
SHOW ROLES
SHOW CURRENT ROLES
SHOW ROLE GRANT GROUP group_name
SHOW GRANT ROLE role_name

SHOW GRANT USER user_name
SHOW GRANT USER user_name ON SERVER
SHOW GRANT USER user_name ON DATABASE database_name
SHOW GRANT USER user_name ON TABLE table_name
SHOW GRANT USER user_name ON URI uri
```

GRANT语句语法：

```sql
GRANT ROLE role_name TO GROUP group_name

GRANT privilege ON object_type object_name
   TO [ROLE] roleName
   [WITH GRANT OPTION]

privilege ::= ALL | CREATE | INSERT | REFRESH | SELECT | SELECT(column_name)
object_type ::= SERVER | URI | DATABASE | TABLE
```

REVOKE语句语法：

```sql
REVOKE ROLE role_name FROM GROUP group_name

REVOKE [GRANT OPTION FOR] privilege ON object_type object_name
  FROM [ROLE] role_name

privilege ::= ALL | CREATE | INSERT | REFRESH | SELECT | SELECT(column_name)

object_type ::= SERVER | URI | DATABASE | TABLE
```

兼容性：

不需要HDFS权限

Kudu注意事项：

1. 仅在Server上有ALL权限的用户可以创建外部Kudu表
2.  DELETE, UPDATE, 和 UPSERT 操作要求ALL权限

参考：

[GRANT Statement (CDH 5.2 or higher only)](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/impala_grant.html)

## 数据类型

| 类型                          | 范围                                                       | 备注    |
| ----------------------------- | ---------------------------------------------------------- | ------- |
| TINYINT                       | -128 .. 127                                                |         |
| SMALLINT                      | -32768 .. 32767                                            |         |
| INT                           | -2147483648 .. 2147483647                                  |         |
| BIGINT                        | -9223372036854775808 .. 9223372036854775807                |         |
| FLOAT                         | 正负1.40129846432481707e-45 .. 3.40282346638528860e+38     |         |
| DOUBLE,REAL                   | 4.94065645841246544e-324d .. 1.79769313486231570e+308      |         |
| DECIMAL[(precision[, scale])] | precision:between 1 and 38(default 9)<br />scale:default 0 |         |
| STRING                        | 2 GB                                                       |         |
| CHAR                          |                                                            |         |
| VARCHAR                       |                                                            |         |
| TIMESTAMP                     | 1400-01-01 to 9999-12-31                                   | UTC时区 |
| BOOLEAN                       |                                                            |         |

类型转换：

|           | TINYINT | SMALLINT | INT  | BIGINT | FLOAT | DOUBLE | DECIMAL | STRING | CHAR | VARCHAR | TIMESTAMP | BOOLEAN |
| --------- | ------- | -------- | ---- | ------ | ----- | ------ | ------- | ------ | ---- | ------- | --------- | ------- |
| TINYINT   | -       | Auto     | Auto | Auto   | Auto  | Auto   |         | Cast   |      |         | Cast      |         |
| SMALLINT  | Cast    | -        | Auto | Auto   | Auto  | Auto   |         | Cast   |      |         | Cast      |         |
| INT       | Cast    | Cast     | -    | Auto   | Auto  | Auto   |         | Cast   |      |         | Cast      |         |
| BIGINT    | Cast    | Cast     |      | -      | Auto  | Auto   |         | Cast   |      |         | Cast      |         |
| FLOAT     | Cast    | Cast     | Cast | Cast   | -     | Auto   | No      | Cast   |      |         | Cast      | Cast    |
| DOUBLE    | Cast    | Cast     | Cast | Cast   | Cast  | -      | No      | Cast   |      |         | Cast      | Cast    |
| DECIMAL   | Cast    | Cast     | Cast | Cast   | Auto  | Auto   | -       | Cast   |      |         | Cast      | Cast    |
| STRING    | Cast    | Cast     | Cast | Cast   | Cast  | Cast   |         | -      |      |         | Auto      | No      |
| CHAR      |         |          |      |        |       |        |         |        | -    |         |           |         |
| VARCHAR   |         |          |      |        |       |        |         |        |      | -       |           |         |
| TIMESTAMP |         |          |      |        |       |        |         |        |      |         | -         |         |
| BOOLEAN   |         |          |      |        |       |        |         | Cast   |      |         |           | -       |

参考：

[Impala Type Conversion Functions](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/impala_conversion_functions.html)

## DDL

将kudu表从一个impala集群托管到另一个impala集群：

```sql
-- 在A集群创建一个Kudu表
CREATE TABLE id_city (
   id INT NOT NULL,
   city STRING NULL,
   PRIMARY KEY (id) 
) PARTITION BY HASH (id) PARTITIONS 4 STORED AS KUDU;

-- 在B集群创建kudu外表
CREATE external TABLE id_city 
STORED AS KUDU
TBLPROPERTIES ('kudu.table_name'='impala::default.id_city','kudu.master_addresses'='');

-- 将B集群的kudu表改为内表：
ALTER TABLE id_city SET TBLPROPERTIES('EXTERNAL'='false');

-- 将A集群的kudu表改为外表：
ALTER TABLE id_city SET TBLPROPERTIES('EXTERNAL'='true');

-- 删除A集群的kudu表
DROP TABLE id_city;
```

参考：

[CREATE TABLE Statement](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/impala_create_table.html#create_table)

[ALTER TABLE Statement](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/impala_alter_table.html)

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

