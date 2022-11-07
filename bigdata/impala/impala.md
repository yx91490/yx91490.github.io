# Impala

## 端口

| 客户端                       | 端口    |
| ------------------------- | ----- |
| impala-shell, ODBC driver | 21000 |
| JDBC, ODBC driver         | 21050 |

## JDBC连接方式

1.  使用Cloudera JDBC Connector`com.cloudera.impala.jdbc41.Driver`，连接串格式：

        jdbc:impala://Host:Port[/Schema];Property1=Value;Property2=Value;...

2.  使用Hive JDBC Driver`org.apache.hive.jdbc.HiveDriver`：

    1.  简单连接串（注意21050端口号后面的“/”，以及“;auth=noSasl”，缺少会出错）：

            jdbc:hive2://myhost.example.com:21050/;auth=noSasl

    2.  kerberos连接串：

            jdbc:hive2://myhost.example.com:21050/;principal=impala/myhost.example.com@H2.EXAMPLE.COM

    3.  LDAP连接串：

            jdbc:hive2://host:port/db_name;user=ldap_userid;password=ldap_password

参考：

*   [Configuring Impala to Work with JDBC](https://docs.cloudera.com/documentation/enterprise/latest/topics/impala_jdbc1.html#impala_jdbc)

*   [impala-shell Configuration Options](https://docs.cloudera.com/documentation/enterprise/5-15-x/topics/impala_shell_options.html)

*   [Connecting to impalad through impala-shell](https://docs.cloudera.com/documentation/enterprise/5-15-x/topics/impala_connecting.html#connecting)

*   [Apache Impala Guide](http://impala.apache.org/docs/build/impala-2.12.pdf)

*   [Cloudera JDBC Driver 2.5.5 for Impala](https://docs.cloudera.com/documentation/other/connectors/impala-jdbc/2-5-5/Cloudera-JDBC-Driver-for-Impala-Install-Guide-2-5-5.pdf)

*   [Cloudera JDBC Driver for Impala 2.6.15](https://docs.cloudera.com/documentation/other/connectors/impala-jdbc/2-6-15/Cloudera-JDBC-Driver-for-Impala-Release-Notes.pdf)

## 负载均衡

负载均衡主要适用于`impalad`进程。

负载均衡有下面的优势：

1.  应用程序只需要连接到一个地址

2.  实现高可用连接

3.  coordinator节点比其他节点需要更多CPU和内存。代理服务器可以调度查询从而使每个连接使用不同的coordinator节点。

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

1.  仅在Server上有ALL权限的用户可以创建外部Kudu表

2.  DELETE, UPDATE, 和 UPSERT 操作要求ALL权限

参考：

[GRANT Statement (CDH 5.2 or higher only)](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/impala_grant.html)

## 数据类型

| 类型                              | 范围                                                    | 备注    |
| ------------------------------- | ----------------------------------------------------- | ----- |
| TINYINT                         | -128 .. 127                                           |       |
| SMALLINT                        | -32768 .. 32767                                       |       |
| INT                             | -2147483648 .. 2147483647                             |       |
| BIGINT                          | -9223372036854775808 .. 9223372036854775807           |       |
| FLOAT                           | 正负1.40129846432481707e-45 .. 3.40282346638528860e+38  |       |
| DOUBLE,REAL                     | 4.94065645841246544e-324d .. 1.79769313486231570e+308 |       |
| DECIMAL\[(precision\[, scale])] | precision:between 1 and 38(default 9)scale:default 0  |       |
| STRING                          | 2 GB                                                  |       |
| CHAR                            |                                                       |       |
| VARCHAR                         |                                                       |       |
| TIMESTAMP                       | 1400-01-01 to 9999-12-31                              | UTC时区 |
| BOOLEAN                         |                                                       |       |

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

## Query Option

| 名称                                               | 适用角色 | 标签          | 默认值                                                       | 候选值                                                       | 说明                                                         |
| -------------------------------------------------- | -------- | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ABORT\_JAVA\_UDF\_ON\_EXCEPTION                    |          |               |                                                              |                                                              |                                                              |
| ABORT\_ON\_DEFAULT\_LIMIT\_EXCEEDED                |          | Removed       |                                                              |                                                              |                                                              |
| ABORT\_ON\_ERROR                                   |          |               | false                                                        |                                                              | When this option is enabled, Impala cancels a query immediately when any of the nodes encounters an error, rather than continuing and possibly returning incomplete results. |
| ALLOW\_ERASURE\_CODED\_FILES                       |          | @since 3.1    | false                                                        |                                                              | When the ALLOW\_ERASURE\_CODED\_FILES query option is set to FALSE, Impala returns an error when a query requires scanning an erasure coded file. |
| ALLOW\_UNSUPPORTED\_FORMATS                        |          | Removed       |                                                              |                                                              |                                                              |
| ANALYTIC\_RANK\_PUSHDOWN\_THRESHOLD                |          |               |                                                              |                                                              |                                                              |
| APPX\_COUNT\_DISTINCT                              |          | @since 2.0    | false                                                        |                                                              | When the `APPX_COUNT_DISTINCT` query option is set to `TRUE`, Impala implicitly converts `COUNT(DISTINCT)` operations to the `NDV()` function calls. |
| ASYNC\_CODEGEN                                     |          |               |                                                              |                                                              |                                                              |
| BATCH\_SIZE                                        |          | @since 2.11   | 0(1024)                                                      | 0-65536                                                      | Number of rows evaluated at a time by SQL operators.Using a large number improves responsiveness, especially for scan operations, at the cost of a higher memory footprint. |
| BROADCAST\_BYTES\_LIMIT                            |          |               | 34359738368 (32 GB)                                          | 0:ignored                                                    | The Impala planner may in rare cases make a bad choice to broadcast a large table or intermediate result and encounter performance problems due to high memory pressure. Setting this limit will make the planner pick a partition based hash join instead of broadcast and avoid such performance problems. |
| BROADCAST\_TO\_PARTITION\_FACTOR                   |          |               |                                                              |                                                              |                                                              |
| BUFFER\_POOL\_LIMIT                                |          |               | the lower of 80% of the `MEM_LIMIT` setting, or the `MEM_LIMIT` setting minus 100 MB. | -- Set an absolute value. set buffer\_pool\_limit=8GB;  -- Set a relative value based on the MEM\_LIMIT setting. set buffer\_pool\_limit=80%; | Defines a limit on the amount of memory that a query can allocate from the internal buffer pool. The value for this limit applies to the memory on each host, not the aggregate memory across the cluster. Typically not changed by users, except during diagnosis of out-of-memory errors during queries. |
| CLIENT\_IDENTIFIER                                 |          |               |                                                              |                                                              |                                                              |
| COMPRESSION\_CODEC                                 |          |               | SNAPPY                                                       | SET COMPRESSION\_CODEC=codec\_name; // Supported for all codecs. SET COMPRESSION\_CODEC=codec\_name:compression\_level; // Only supported for ZSTD.The allowed values for this query option are `SNAPPY` (the default), `GZIP`, `ZSTD`, `LZ4`, and `NONE`. | When Impala writes Parquet data files using the `INSERT` statement, the underlying compression is controlled by the `COMPRESSION_CODEC` query option. |
| COMPUTE\_COLUMN\_MINMAX\_STATS                     |          |               |                                                              |                                                              |                                                              |
| COMPUTE\_STATS\_MIN\_SAMPLE\_SIZE                  |          |               |                                                              |                                                              |                                                              |
| CONVERT\_LEGACY\_HIVE\_PARQUET\_UTC\_TIMESTAMPS    |          |               |                                                              |                                                              |                                                              |
| CPU\_LIMIT\_S                                      |          |               |                                                              |                                                              |                                                              |
| DEBUG\_ACTION                                      |          |               |                                                              |                                                              |                                                              |
| DECIMAL\_V2                                        |          |               |                                                              | A query option that changes behavior related to the DECIMAL data type. Set this option to FALSE for backward compatibility to Impala 2.x. |                                                              |
| DEFAULT\_FILE\_FORMAT                              |          |               | @since 3.2                                                   | TEXT (0)RC\_FILE (1)SEQUENCE\_FILE (2)AVRO (3)PARQUET (4)KUDU (5)ORC (6) | Use the DEFAULT\_FILE\_FORMAT query option to set the default table file format. |
| DEFAULT\_HINTS\_INSERT\_STATEMENT                  |          |               | none                                                         | SET DEFAULT\_HINTS\_INSERT\_STATEMENT=CLUSTERED; SET DEFAULT\_HINTS\_INSERT\_STATEMENT=SHUFFLE; SET DEFAULT\_HINTS\_INSERT\_STATEMENT=NOCLUSTERED:NOSHUFFLE; | The DEFAULT\_HINTS\_INSERT\_STATEMENT query option sets the default hints for the INSERT statements with no optimizer hint specified.The default hints apply to the HDFS and Kudu table formats and are ignored for the HBase table format. |
| DEFAULT\_JOIN\_DISTRIBUTION\_MODE                  |          |               |                                                              | `BROADCAST` (equivalent to 0) or `SHUFFLE` (equivalent to 1) | This option determines the join distribution that Impala uses when any of the tables involved in a join query is missing statistics. |
| DEFAULT\_NDV\_SCALE                                |          |               |                                                              |                                                              |                                                              |
| DEFAULT\_ORDER\_BY\_LIMIT                          |          | Removed       |                                                              |                                                              |                                                              |
| DEFAULT\_SPILLABLE\_BUFFER\_SIZE                   |          | @since 2.10.0 | `2097152` (2 MB)                                             |                                                              | Specifies the default size for a memory buffer used when the spill-to-disk mechanism is activated. |
| DEFAULT\_TRANSACTIONAL\_TYPE                       |          | @since 3.3    | NONE                                                         | `NONE`: The table will not be created as transactional. `INSERT_ONLY`: The table will be created as transactional. | Use the DEFAULT\_TRANSACTIONAL\_TYPE query option to create insert-only transactional tables by default.If either table properties, `transactional` or `transactional_properties`, are set, this query option is ignored. |
| DELETE\_STATS\_IN\_TRUNCATE                        |          | @since 4.0    | TRUE                                                         |                                                              | This query option DELETE\_STATS\_IN\_TRUNCATE can be used to delete or retain table statistics. |
| DISABLE\_CACHED\_READS                             |          |               |                                                              |                                                              |                                                              |
| DISABLE\_CODEGEN                                   |          |               | false                                                        |                                                              | it's used to work around any issues with Impala's runtime code generation |
| DISABLE\_CODEGEN\_ROWS\_THRESHOLD                  |          | @since 2.10.0 | 50000                                                        |                                                              | This setting controls the cutoff point (in terms of number of rows processed per Impala daemon) below which Impala disables native code generation for the whole query.If a query uses the complex data types STRUCT, ARRAY, or MAP, then codegen is never automatically disabled regardless of the DISABLE\_CODEGEN\_ROWS\_THRESHOLD setting. |
| DISABLE\_DATA\_CACHE                               |          |               |                                                              |                                                              |                                                              |
| DISABLE\_HBASE\_NUM\_ROWS\_ESTIMATE                |          |               | FALSE                                                        |                                                              | While generating a plan for an HBase query, the planner samples the underlying HBase tables to estimate their row count and row size, and the sampling can negatively impact the planning time. When the HBase table stats does not change much in short time, disable the sampling by setting the DISABLE\_HBASE\_NUM\_ROWS\_ESTIMATE query option to TRUE. And Impala planner will fall back to using Hive Metastore (HMS) table stats instead. |
| DISABLE\_HDFS\_NUM\_ROWS\_ESTIMATE                 |          |               |                                                              |                                                              |                                                              |
| DISABLE\_OUTERMOST\_TOPN                           |          |               |                                                              |                                                              |                                                              |
| DISABLE\_ROW\_RUNTIME\_FILTERING                   |          |               |                                                              |                                                              |                                                              |
| DISABLE\_STREAMING\_PREAGGREGATIONS                |          |               | false                                                        |                                                              | Turns off the "streaming preaggregation" optimization that is available in Impala 2.5 and higher. |
| DISABLE\_UNSAFE\_SPILLS                            |          |               | false                                                        |                                                              | Enable this option if you prefer to have queries fail when they exceed the Impala memory limit, rather than write temporary data to disk. |
| ENABLE\_ASYNC\_DDL\_EXECUTION                      |          |               |                                                              |                                                              |                                                              |
| ENABLE\_ASYNC\_LOAD\_DATA\_EXECUTION               |          |               |                                                              |                                                              |                                                              |
| ENABLE\_CNF\_REWRITES                              |          |               |                                                              |                                                              |                                                              |
| ENABLE\_DISTINCT\_SEMI\_JOIN\_OPTIMIZATION         |          |               |                                                              |                                                              |                                                              |
| ENABLE\_EXPR\_REWRITES                             |          |               | true                                                         |                                                              | The ENABLE\_EXPR\_REWRITES query option controls whether to enable or disable the query compile time optimizations. |
| ENABLE\_KUDU\_TRANSACTION                          |          |               |                                                              |                                                              |                                                              |
| ENABLE\_OUTER\_JOIN\_TO\_INNER\_TRANSFORMATION     |          |               |                                                              |                                                              |                                                              |
| ENABLE\_REPLAN                                     |          |               |                                                              |                                                              |                                                              |
| ENABLED\_RUNTIME\_FILTER\_TYPES                    |          |               |                                                              |                                                              |                                                              |
| EXEC\_SINGLE\_NODE\_ROWS\_THRESHOLD                |          | @since 2.10   | 100                                                          |                                                              | This setting controls the cutoff point (in terms of number of rows scanned) below which Impala treats a query as a "small" query, turning off optimizations such as parallel execution and native code generation.This setting applies to queries where the number of rows processed can be accurately determined, either through table and column statistics, or by the presence of a `LIMIT` clause. If Impala cannot accurately estimate the number of rows, then this setting does not apply.For a query that is determined to be "small", all work is performed on the coordinator node. |
| EXEC\_TIME\_LIMIT\_S                               |          | @since 2.12   | 0 (no time limit )                                           |                                                              | The EXEC\_TIME\_LIMIT\_S query option sets a time limit on query execution.The time limit only starts once the query is executing. Time spent planning the query, scheduling the query, or in admission control is not counted towards the execution time limit. |
| EXPAND\_COMPLEX\_TYPES                             |          |               |                                                              |                                                              |                                                              |
| EXPLAIN\_LEVEL                                     |          |               | 1                                                            | 0 or MINIMAL, 1 or STANDARD, 2 or EXTENDED, 3 or VERBOSE     | Controls the amount of detail provided in the output of the EXPLAIN statement. |
| FETCH\_ROWS\_TIMEOUT\_MS                           |          | @since 3.4    | 10000                                                        |                                                              | Use the FETCH\_ROWS\_TIMEOUT\_MS query option to control how long Impala waits for query results when clients fetch rows. |
| HBASE\_CACHE\_BLOCKS                               |          |               | false                                                        |                                                              | Setting this option is equivalent to calling the setCacheBlocks method of the class org.apache.hadoop.hbase.client.Scan, in an HBase Java application. |
| HBASE\_CACHING                                     |          |               | 0                                                            |                                                              | Setting this option is equivalent to calling the setCaching method of the class org.apache.hadoop.hbase.client.Scan, in an HBase Java application. |
| IDLE\_SESSION\_TIMEOUT                             |          | @since 2.12   | 0                                                            |                                                              | The `IDLE_SESSION_TIMEOUT` query option sets the time in seconds after which an idle session is cancelled. A session is idle when no activity is occurring for any of the queries in that session, and the session has not started any new queries. Once a session is expired, you cannot issue any new query requests to it. The session remains open, but the only operation you can perform is to close it. |
| JOIN\_ROWS\_PRODUCED\_LIMIT                        |          | @since 4.0    | 0                                                            |                                                              | The JOIN\_ROWS\_PRODUCED\_LIMIT query option limits the number of join rows produced by a join node and is used to prevent runaway join queries. |
| KUDU\_READ\_MODE                                   |          | @since 3.1    | DEFAULT                                                      | "DEFAULT""READ\_LATEST""READ\_AT\_SNAPSHOT"                  | The `KUDU_READ_MODE` query option allows you to set a desired consistency level for scans of Kudu tables. |
| KUDU\_REPLICA\_SELECTION                           |          |               |                                                              |                                                              |                                                              |
| KUDU\_SNAPSHOT\_READ\_TIMESTAMP\_MICROS            |          |               |                                                              |                                                              |                                                              |
| LOCK\_MAX\_WAIT\_TIME\_S                           |          |               |                                                              |                                                              |                                                              |
| LIVE\_PROGRESS                                     |          | @since 2.3.0  | TRUE                                                         |                                                              | When you run a query, the live progress bar appears in the output of a query. The bar shows roughly the percentage of completed processing. When the query finishes, the live progress bar disappears from the console output.Starting in Impala 3.1, the summary output also includes the queuing status consisting of whether the query was queued and what was the latest queuing reason. |
| LIVE\_SUMMARY                                      |          | @since 2.3.0  | FALSE                                                        |                                                              | Impala displays the same output as the `SUMMARY` command for queries submitted through the impala-shell command, with the measurements updated in real time as the query progresses. When the query finishes, the final `SUMMARY` output remains visible in the impala-shell console output. |
| MAX\_CNF\_EXPRS                                    |          |               |                                                              |                                                              |                                                              |
| MAX\_ERRORS                                        |          |               | 0 (meaning 1000 errors)                                      |                                                              | Maximum number of non-fatal errors for any particular query that are recorded in the Impala log file. |
| MAX\_FS\_WRITERS                                   |          |               |                                                              |                                                              |                                                              |
| MAX\_IO\_BUFFERS                                   |          | Removed       |                                                              |                                                              |                                                              |
| MAX\_MEM\_ESTIMATE\_FOR\_ADMISSION                 |          | @since 3.1    |                                                              |                                                              | Use the `MAX_MEM_ESTIMATE_FOR_ADMISSION` query option to set an upper limit on the memory estimates of a query as a workaround for over-estimates precluding a query from being admitted. |
| MAX\_NUM\_RUNTIME\_FILTERS                         |          |               |                                                              |                                                              |                                                              |
| MAX\_RESULT\_SPOOLING\_MEM                         |          | @since 3.4    | 100 MB                                                       |                                                              | Use the `MAX_RESULT_SPOOLING_MEM` query option to set the maximum amount of memory used when spooling query results.If the amount of memory exceeds this value when spooling query results, all memory will most likely be spilled to disk.The `MAX_RESULT_SPOOLING_MEM` query option is applicable only when query result spooling is enabled with the `SPOOL_QUERY_RESULTS` query option set to `TRUE`. |
| MAX\_ROW\_SIZE                                     |          |               |                                                              |                                                              |                                                              |
| MAX\_SCAN\_RANGE\_LENGTH                           |          |               | 0(indicates backend default, which is the same as the HDFS block size for each table.) |                                                              | The `MAX_RESULT_SPOOLING_MEM` query option is applicable only when query result spooling is enabled with the `SPOOL_QUERY_RESULTS` query option set to `TRUE`. |
| MAX\_SPILLED\_RESULT\_SPOOLING\_MEM                |          | @since 3.4    | 1 GB                                                         |                                                              | Use the `MAX_SPILLED_RESULT_SPOOLING_MEM` query option to set the maximum amount of memory that can be spilled when spooling query results. |
| MAX\_STATEMENT\_LENGTH\_BYTES                      |          |               |                                                              |                                                              |                                                              |
| MEM\_LIMIT                                         |          |               | 0 (unlimited)                                                |                                                              | The MEM\_LIMIT query option defines the maximum amount of memory a query can allocate on each node. |
| MEM\_LIMIT\_EXECUTORS                              |          |               |                                                              |                                                              |                                                              |
| MIN\_SPILLABLE\_BUFFER\_SIZE                       |          | @since 2.10.0 | `65536` (64 KB)                                              |                                                              | Specifies the minimum size for a memory buffer used when the spill-to-disk mechanism is activated, for example for queries against a large table with no statistics, or large join operations. |
| MINMAX\_FILTER\_FAST\_CODE\_PATH                   |          |               |                                                              |                                                              |                                                              |
| MINMAX\_FILTER\_PARTITION\_COLUMNS                 |          |               |                                                              |                                                              |                                                              |
| MINMAX\_FILTER\_SORTED\_COLUMNS                    |          |               |                                                              |                                                              |                                                              |
| MINMAX\_FILTER\_THRESHOLD                          |          |               |                                                              |                                                              |                                                              |
| MINMAX\_FILTERING\_LEVEL                           |          |               |                                                              |                                                              |                                                              |
| MT\_DOP                                            |          |               |                                                              |                                                              |                                                              |
| NOW\_STRING                                        |          |               |                                                              |                                                              |                                                              |
| NUM\_NODES                                         |          |               | 0                                                            | 0 (meaning all nodes) or 1 (meaning all work is done on the coordinator node) | Limit the number of nodes that process a query, typically during debugging. |
| NUM\_REMOTE\_EXECUTOR\_CANDIDATES                  |          |               |                                                              |                                                              |                                                              |
| NUM\_ROWS\_PRODUCED\_LIMIT                         |          |               |                                                              |                                                              |                                                              |
| NUM\_SCANNER\_THREADS                              |          |               |                                                              |                                                              |                                                              |
| OPTIMIZE\_PARTITION\_KEY\_SCANS                    |          | @since 2.5.0  | false                                                        |                                                              | Enables a fast code path for queries that apply simple aggregate functions to partition key columns: `MIN(key_column)`, `MAX(key_column)`, or `COUNT(DISTINCT key_column)`. |
| OPTIMIZE\_SIMPLE\_LIMIT                            |          |               |                                                              |                                                              |                                                              |
| ORC\_ASYNC\_READ                                   |          |               |                                                              |                                                              |                                                              |
| ORC\_READ\_STATISTICS                              |          |               |                                                              |                                                              |                                                              |
| ORC\_SCHEMA\_RESOLUTION                            |          |               |                                                              |                                                              |                                                              |
| PARQUET\_ANNOTATE\_STRINGS\_UTF8                   |          | @since 2.6.0  | false                                                        |                                                              | Causes Impala `INSERT` and `CREATE TABLE AS SELECT` statements to write Parquet files that use the UTF-8 annotation for `STRING` columns. |
| PARQUET\_ARRAY\_RESOLUTION                         |          | @since 2.9.0  | THREE_LEVEL                                                  | THREE_LEVEL<br />TWO_LEVEL<br />TWO_LEVEL_THEN_THREE_LEVEL   | The `PARQUET_ARRAY_RESOLUTION` query option controls the behavior of the indexed-based resolution for nested arrays in Parquet. |
| PARQUET\_BLOOM\_FILTER\_WRITE                      |          |               |                                                              |                                                              |                                                              |
| PARQUET\_BLOOM\_FILTERING                          |          |               |                                                              |                                                              |                                                              |
| PARQUET\_DICTIONARY\_FILTERING                     |          | @since 2.9.0  | true                                                         |                                                              | The `PARQUET_DICTIONARY_FILTERING` query option controls whether Impala uses dictionary filtering for Parquet files. |
| PARQUET\_DICTIONARY\_RUNTIME\_FILTER\_ENTRY\_LIMIT |          |               |                                                              |                                                              |                                                              |
| PARQUET\_FALLBACK\_SCHEMA\_RESOLUTION              |          | @since 2.6.0  | POSITION                                                     | POSITION (0)<br />NAME (1)                                   | The `PARQUET_FALLBACK_SCHEMA_RESOLUTION` query option allows Impala to look up columns within Parquet files by column name, rather than column order, when necessary. |
| PARQUET\_FILE\_SIZE                                |          |               | 0 (produces files with a target size of 256 MB; files might be larger for very wide tables) | the maximum value for this setting is 1 gigabyte (`1g`)      | Specifies the maximum size of each Parquet data file produced by Impala `INSERT` statements. |
| PARQUET\_LATE\_MATERIALIZATION\_THRESHOLD          |          |               |                                                              |                                                              |                                                              |
| PARQUET\_OBJECT\_STORE\_SPLIT\_SIZE                |          |               | 256 MB                                                       | The value must be greater than or equal to 1 MB.             | Use the `PARQUET_OBJECT_STORE_SPLIT_SIZE` query option to control the Parquet format specific split sizes on non-block based stores, |
| PARQUET\_PAGE\_ROW\_COUNT\_LIMIT                   |          | @since 3.3    |                                                              |                                                              | set the maximum number of rows that can be written on a single Parquet data page. |
| PARQUET\_READ\_PAGE\_INDEX                         |          |               |                                                              |                                                              | to disable or enable using the Parquet page index during scans. <br />Of the types: Boolean, Integer, Decimal, String, Timestamp.<br />For simple predicates of the forms: `<slot> <op> <constant>` or `<constant> <op> <slot>`, where `<op>` is LT, LE, GE, GT, and EQ |
| PARQUET\_READ\_STATISTICS                          |          | @since 2.9.0  | true                                                         | `true` (`1`)<br />`false` (`0`)                              | set the maximum number of rows that can be written on a single Parquet data page.<br />Of the numerical types for the old version of the statistics: Boolean, Integer, Float<br />Of the types for the new version of the statistics (starting in IMPALA 2.8): Boolean, Integer, Float, Decimal, String, Timestamp<br />For simple predicates of the forms: `<slot> <op> <constant>` or `<constant> <op> <slot>`, where `<op>` is LT, LE, GE, GT, and EQ |
| PARQUET\_TIMESTAMP\_TYPE                           |          |               |                                                              |                                                              |                                                              |
| PARQUET\_WRITE\_PAGE\_INDEX                        |          | @since 3.3    | TRUE                                                         | `true` (`1`)<br />`false` (`0`)                              | to disable or enable the Parquet page index writing.         |
| PLANNER\_TESTCASE\_MODE                            |          |               |                                                              |                                                              |                                                              |
| PREAGG\_BYTES\_LIMIT                               |          |               |                                                              |                                                              |                                                              |
| PREFETCH\_MODE                                     |          | @since 2.6.0  | 1 (equivalent to `HT_BUCKET`)                                | 0(`NONE`)<br />1(HT_BUCKET)                                  | Determines whether the prefetching optimization is applied during join query processing. |
| QUERY\_TIMEOUT\_S                                  |          | @since 2.0.0  | 0                                                            |                                                              | For queries, this means the query has results ready but is waiting for a client to fetch the data.<br />For sessions, this means that no query has been submitted for some period of time. |
| REFRESH\_UPDATED\_HMS\_PARTITIONS                  |          | @since 4.0.0  | FALSE                                                        |                                                              | refresh any updated HMS partitions.                          |
| REPLICA\_PREFERENCE                                |          | @since 2.7.0  | CACHE_LOCAL (0)                                              | `CACHE_LOCAL` (`0`), `DISK_LOCAL` (`2`), `REMOTE` (`4`)      | This allows Impala to schedule reads to suboptimal replicas (e.g. local in the presence of cached ones) in order to distribute the work across more executor nodes. |
| REPORT\_SKEW\_LIMIT                                |          |               |                                                              |                                                              |                                                              |
| REQUEST\_POOL                                      |          |               | empty                                                        |                                                              | The pool or queue name that queries should be submitted to. Only applies when you enable the Impala admission control feature. |
| RESERVATION\_REQUEST\_TIMEOUT                      |          | Removed       |                                                              |                                                              |                                                              |
| RESOURCE\_TRACE\_RATIO                             |          | @since 3.2    | 0                                                            | from 0 to 1 are allowed                                      | specifies the ratio of queries where the CPU usage info will be included in the profiles. |
| RETRY\_FAILED\_QUERIES                             |          | @since 4.0    | TRUE                                                         |                                                              | control whether or not queries are transparently retried on cluster membership changes.<br />This feature supports retrying the entire query and NOT the individual query fragments. INSERT and DDL queries will NOT be retried.<br />query retry will be skipped if the query has returned any results to the client. |
| RM\_INITIAL\_MEM                                   |          | Removed       |                                                              |                                                              |                                                              |
| RUNTIME\_BLOOM\_FILTER\_SIZE                       |          | @since 2.5.0  | 1048576 (1 MB)                                               | **Maximum:** 16 MB                                           | In Impala 2.6 and higher, this query option only applies as a fallback, when statistics are not available. |
| RUNTIME\_FILTER\_ERROR\_RATE                       |          |               |                                                              |                                                              |                                                              |
| RUNTIME\_FILTER\_MAX\_SIZE                         |          | @since 2.6.0  | 0 (meaning use the value from the corresponding impalad startup option) |                                                              | defines the maximum size for a filter.Filter sizes are rounded up to the nearest power of two. |
| RUNTIME\_FILTER\_MIN\_SIZE                         |          | @since 2.6.0  | 0 (meaning use the value from the corresponding impalad startup option) |                                                              | defines the minimum size for a filter.Filter sizes are rounded up to the nearest power of two. |
| RUNTIME\_FILTER\_MODE                              |          | @since 2.5.0  | 2                                                            | numeric (0, 1, 2) or corresponding mnemonic strings (`OFF`, `LOCAL`, `GLOBAL`). | It turns this feature on and off, and controls how extensively the filters are transmitted between hosts. |
| RUNTIME\_FILTER\_WAIT\_TIME\_MS                    |          | @since 2.5.0  | 0 (meaning use the value from the corresponding impalad startup option) |                                                              | specifies a time in milliseconds that each scan node waits for runtime filters to be produced by other plan fragments. |
| RUNTIME\_IN\_LIST\_FILTER\_ENTRY\_LIMIT            |          |               |                                                              |                                                              |                                                              |
| S3\_SKIP\_INSERT\_STAGING                          |          | @since 2.6.0  | true                                                         |                                                              | Speeds up `INSERT` operations on tables or partitions residing on the Amazon S3 filesystem. |
| SCAN\_BYTES\_LIMIT                                 |          | @since 3.1    | `0` (no limit)                                               |                                                              | The `SCAN_BYTES_LIMIT` query option sets a limit on the bytes scanned by HDFS and HBase SCAN operations. |
| SCAN\_NODE\_CODEGEN\_THRESHOLD                     |          | Removed       |                                                              |                                                              |                                                              |
| SCHEDULE\_RANDOM\_REPLICA                          |          | @since 2.5.0  | false                                                        |                                                              | The `SCHEDULE_RANDOM_REPLICA` query option fine-tunes the scheduling algorithm for deciding which host processes each HDFS data block or Kudu tablet to reduce the chance of CPU hotspots.The `SCHEDULE_RANDOM_REPLICA` query option only applies to tables and partitions that are not enabled for the HDFS caching. |
| SCRATCH\_LIMIT                                     |          |               | -1 (amount of spill space is unlimited)                      |                                                              | Specifies the maximum amount of disk storage, in bytes, that any Impala query can consume on any host using the "spill to disk" mechanism that handles queries that exceed the memory limit.<br />A value of zero turns off the spill to disk feature for queries in the current session, causing them to fail immediately if they exceed the memory limit. |
| SEQ\_COMPRESSION\_MODE                             |          | Removed       |                                                              |                                                              |                                                              |
| SHOW\_COLUMN\_MINMAX\_STATS                        |          |               |                                                              |                                                              |                                                              |
| SHUFFLE\_DISTINCT\_EXPRS                           |          |               | false                                                        |                                                              | controls the shuffling behavior when a query has both grouping and distinct expressions. Impala can optionally include the distinct expressions in the hash exchange to spread the data among more nodes. However, this plan requires one more hash exchange phase.<br />It is recommended that you turn off this option if the NDVs of the grouping expressions are high. |
| SORT\_RUN\_BYTES\_LIMIT                            |          |               |                                                              |                                                              |                                                              |
| SPOOL\_ALL\_RESULTS\_FOR\_RETRIES                  |          |               |                                                              |                                                              |                                                              |
| SPOOL\_QUERY\_RESULTS                              |          | @since 3.4    | FALSE                                                        |                                                              | Query result spooling controls how rows are returned to the client. |
| STATEMENT\_EXPRESSION\_LIMIT                       |          |               |                                                              |                                                              |                                                              |
| STRICT\_MODE                                       |          |               |                                                              |                                                              |                                                              |
| SYNC\_DDL                                          |          |               | false                                                        |                                                              | causes any DDL operation such as `CREATE TABLE` or `ALTER TABLE` to return only when the changes have been propagated to all other Impala nodes in the cluster by the Impala catalog service.<br />`INSERT` statements also delay their completion until all the underlying data and metadata changes are propagated to all Impala nodes and this option applies to all filesystem-based tables. |
| TARGETED\_KUDU\_SCAN\_RANGE\_LENGTH                |          |               |                                                              |                                                              |                                                              |
| TEST\_REPLAN                                       |          |               |                                                              |                                                              |                                                              |
| THREAD\_RESERVATION\_AGGREGATE\_LIMIT              |          | @since 3.1    | 0 (no limit)                                                 |                                                              | limits the number of reserved threads for a query across all nodes on which it is executing.Queries that have more threads than this threshold are rejected by Impala’s admission controller before they start executing. |
| THREAD\_RESERVATION\_LIMIT                         |          |               |                                                              |                                                              |                                                              |
| TIMEZONE                                           |          | @since 3.1    | The system time zone where the Coordinator Impalad runs      | a canonical code or a time zone name defined in [IANA Time Zone Database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). | defines the timezone used for conversions between UTC and the local time. If not set, Impala uses the system time zone where the Coordinator Impalad runs. <br />Impala takes the timezone into a consideration in the following cases:<br />When calling the `NOW()` function When converting between Unix time and timestamp if the `use_local_tz_for_unix_timestamp_conversions` flag is `TRUE` When reading Parquet timestamps written by Hive if the `convert_legacy_hive_parquet_utc_timestamps` flag is `TRUE` |
| TOPN\_BYTES\_LIMIT                                 |          | @since 3.1    | 536870912 (512 MB)                                           |                                                              | places a limit on the amount of estimated memory that Impala can process for *top-N* queries.<br />*Top-N* queries don't spill to disk so they have to keep all rows they process in memory.If the Impala planner estimates that a *top-N* operator will process more bytes than the `TOPN_BYTES_LIMIT` value, it will replace the *top-N* operator with the *sort* operator. Switching to the *sort* operator allows Impala to spill to disk, thus requiring less memory than *top-N*, but potentially with performance penalties. |
| USE\_DOP\_FOR\_COSTING                             |          |               |                                                              |                                                              |                                                              |
| USE\_LOCAL\_TZ\_FOR\_UNIX\_TIMESTAMP\_CONVERSIONS  |          |               |                                                              |                                                              |                                                              |
| UTF8\_MODE                                         |          | @since 4.1    | FALSE                                                        |                                                              | allows string functions to recognize the UTF-8 characters, thus processing strings in a compatible way as other engines. |
| V\_CPU\_CORES                                      |          | Removed       |                                                              |                                                              |                                                              |

### 参考

[Query Options for the SET Statement](https://impala.apache.org/docs/build/html/topics/impala_query_options.html)

[ImpalaService.thrift TImpalaQueryOptions](https://github.com/apache/impala/blob/4.0.0/common/thrift/ImpalaService.thrift#L39)

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

在Version 2.6.8中已被解决（参考 \[IMPJ-419] ）。

**中文乱码**

参考：<https://docs.cloudera.com/documentation/enterprise/latest/topics/impala_string.html#string>

## SQL Hints

> In Impala 2.0 and higher, you can specify the hints inside comments that use either the `/* */` or `--` notation. Specify a `+` symbol immediately before the hint name. Recently added hints are only available using the `/* */` and `--` notation. For clarity, the `/* */` and `--` styles are used in the syntax and examples throughout this section. With the `/* */` or `--` notation for hints, specify a `+` symbol immediately before the first hint name. Multiple hints can be specified separated by commas, for example `/* +clustered,shuffle */`

    UPSERT /* +NOCLUSTERED,NOSHUFFLE */ INTO ...

> Starting from CDH 5.12 / Impala 2.9, the INSERT or UPSERT operations into Kudu tables automatically add an exchange and a sort node to the plan that partitions and sorts the rows according to the partitioning/primary key scheme of the target table (unless the number of rows to be inserted is small enough to trigger single node execution). Since Kudu partitions and sorts rows on write, pre-partitioning and sorting takes some of the load off of Kudu and helps large INSERT operations to complete without timing out. However, this default behavior may slow down the end-to-end performance of the INSERT or UPSERT operations. Starting from CDH 5.13 / Impala 2.10, you can use the /\* +NOCLUSTERED */ and /* +NOSHUFFLE \*/ hints together to disable partitioning and sorting before the rows are sent to Kudu. Additionally, since sorting may consume a large amount of memory, consider setting the MEM\_LIMIT query option for those queries.

参考：

<https://impala.apache.org/docs/build/html/topics/impala_hints.html>

<https://docs.cloudera.com/documentation/enterprise/5-16-x/topics/impala_upsert.html>

<https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/impala_kudu.html>

## Impala flush mode

Use Kudu AUTO\_FLUSH\_BACKGROUND mode

<https://issues.apache.org/jira/browse/IMPALA-4134>

## Admission Control

### 配置

对于使用名为`default`的单个资源池的简单配置 ，可以在命令行上指定配置选项：

| 配置项                            | 类型      | 默认值   | 说明                                                                                                                                                                                       |
| ------------------------------ | ------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --queue\_wait\_timeout\_ms     | int64   | 60000 | 请求在队列中等待的超时时间（单位：毫秒）                                                                                                                                                                     |
| --default\_pool\_max\_requests | int64   | -1    | 在请求排队之前允许运行的最大并发数。是一个软限制，在负载较重时，并发查询的总数可能会略高。负值表示没有限制。                                                                                                                                   |
| --default\_pool\_max\_queued   | int64   | 无限制   | 在拒绝请求之前允许排队的最大请求数。是一个软限制，在负载较重时，排队查询的总数可能会略高。负值或 0 表示一旦达到最大并发请求，请求总是被拒绝。                                                                                                                 |
| --default\_pool\_mem\_limit    | string  | ""    | 在对该资源池的新请求排队之前，该资源池中所有未完成的请求可以使用的最大内存量（跨整个集群）。以字节、兆字节或千兆字节为单位，由一个数字后跟大写或小写后缀`b`（可选）`m`、 或`g`指定。可以为兆字节和千兆字节指定浮点值。还可以通过指定`%`后缀将其指定为物理内存的百分比。0 或不设置表示无限制。是一个软限制，在负载较重的时候，并发查询使用的总内存可能会略高一些。 |
| --disable\_pool\_max\_requests | Boolean | false | 解除针对每个资源池的最大运行请求的限制。                                                                                                                                                                     |
| --disable\_pool\_mem\_limits   | Boolean | false | 解除每个资源池的内存限制。                                                                                                                                                                            |

对于具有使用不同设置的多个资源池的高级配置，需要手动设置配置文件：

*   通过`--‑‑fair_scheduler_allocation_path=fair-scheduler.xml`指定`fair-scheduler.xml`配置文件的路径

*   通过`--‑‑llama_site_path=llama-site.xml`指定`llama-site.xml`配置文件的路径

fair-scheduler.xml示例：

```xml
<allocations>
    <queue name="root">
        <aclSubmitApps> </aclSubmitApps>
        <queue name="default">
            <maxResources>50000 mb, 0 vcores</maxResources>
            <aclSubmitApps>*</aclSubmitApps>
        </queue>
        <queue name="development">
            <maxResources>200000 mb, 0 vcores</maxResources>
            <aclSubmitApps>user1,user2 dev,ops,admin</aclSubmitApps>
        </queue>
        <queue name="production">
            <maxResources>1000000 mb, 0 vcores</maxResources>
            <aclSubmitApps> ops,admin</aclSubmitApps>
        </queue>
    </queue>
    <queuePlacementPolicy>
        <rule name="specified" create="false"/>
        <rule name="default" />
    </queuePlacementPolicy>
</allocations>
```

llama-site.xml示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <property>
    <name>llama.am.throttling.maximum.placed.reservations.root.default</name>
    <value>10</value>
  </property>
  <property>
    <name>llama.am.throttling.maximum.queued.reservations.root.default</name>
    <value>50</value>
  </property>
  <property>
    <!--指定该资源池里运行查询的默认查询选项-->
    <name>impala.admission-control.pool-default-query-options.root.default</name>
    <value>mem_limit=128m,query_timeout_s=20,max_io_buffers=10</value>
  </property>
  <property>
    <!--队列排队的超时时间，单位：毫秒-->
    <name>impala.admission-control.pool-queue-timeout-ms.root.default</name>
    <value>30000</value>
  </property>
  <property>
    <name>impala.admission-control.max-query-mem-limit.root.default.regularPool</name>
    <value>1610612736</value><!--1.5GB-->
  </property>
  <property>
    <name>impala.admission-control.min-query-mem-limit.root.default.regularPool</name>
    <value>52428800</value><!--50MB-->
  </property>
  <property>
    <name>impala.admission-control.clamp-mem-limit-query-option.root.default.regularPool</name>
    <value>true</value>
  </property>
</configuration>
```

### 参考

[Configuring Admission Control](https://impala.apache.org/docs/build/html/topics/impala_admission_config.html)
