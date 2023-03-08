# Hive源码分析

## Jdbc

### URL格式

[JDBC URL](https://github.com/apache/hive/blob/rel/release-3.1.3/jdbc/src/java/org/apache/hive/jdbc/HiveConnection.java#L173)的格式（其中每个list部分都是分号分隔的键值对）：

```
jdbc:hive2://<host1>:<port1>,<host2>:<port2>/dbName;initFile=<file>;sess_var_list?hive_conf_list#hive_var_list
```

URL解析的代码在：[org.apache.hive.jdbc.Utils.extractURLComponents(String uri, Properties info)](https://github.com/apache/hive/blob/rel/release-3.1.3/jdbc/src/java/org/apache/hive/jdbc/Utils.java#L349)，主要流程如下：

- 解析Authority部分，即`Host:Port`列表（当动态服务发现的时候支持多个）。
- 从URL的Path部分（“/”后，“?”前）解析db名和SessionVars的键值对。
- 从URL的Query部分（“?”后，“#”前）解析HiveConfs的键值对。
- 从URL的Fragment部分（“#”后）解析HiveVars的键值对。
- 从info的键值对中按前缀"hiveconf:"或"hivevar:"分别覆盖HiveConfs和HiveVars对应的值。
- 如果SessionVars中没有"user"，则从info中取"user"，"password"键值对覆盖。
- 从info的键值对取"auth"覆盖SessionVars中的值。

sess_var_list主要是JDBC客户端的参数，hive_conf_list和hive_var_list主要是服务端的参数，会随着OpenSession请求发送到服务端。info Properties可以覆盖URL中的hive_conf_list和hive_var_list，以及sess_var_list中的"user"，"password"，"auth"等认证相关参数。

### 参考

[HiveServer2 Clients - Connection URLs](https://cwiki.apache.org/confluence/display/hive/hiveserver2+clients#HiveServer2Clients-ConnectionURLs)

