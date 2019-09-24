Hadoop HDFS：

| 默认端口 | 配置项                                                       | 备注                                         |
| -------- | :----------------------------------------------------------- | -------------------------------------------- |
| 111      |                                                              | 端口映射（或 Rpcbind）端口                   |
| 2049     | nfs3.server.port                                             | NFS Gateway 服务器端口                       |
| 4242     | nfs3.mountd.port                                             | NFS Gateway MountD 端口                      |
| 8019     | dfs.ha.zkfc.port                                             |                                              |
| 8020     | fs.default.name, fs.defaultFS                                | NameNode 端口                                |
| 8480     | dfs.journalnode.http-address                                 | JournalNode HTTP 端口                        |
| 8481     | dfs.journalnode.https-address                                | 安全 JournalNode Web UI 端口 (TLS/SSL)       |
| 8485     | dfs.journalnode.rpc-address                                  | JournalNode RPC 端口                         |
| 14000    | hdfs.httpfs.http.port                                        | REST 端口                                    |
| 14001    | hdfs.httpfs.admin.port                                       | 管理端口                                     |
| 50020    | dfs.datanode.ipc.address                                     | DataNode 协议端口                            |
| 50070    | dfs.http.address, dfs.namenode.http-address                  | NameNode Web UI 端口                         |
| 50075    | dfs.datanode.http.address                                    | DataNode HTTP Web UI 端口                    |
| 50079    | nfs.http.port                                                | NFS Gateway Web UI Port                      |
| 50090    | dfs.secondary.http.address, dfs.namenode.secondary.http-address | SecondaryNameNode Web UI 端口                |
| 50091    | dfs.namenode.secondary.https-address                         |                                              |
| 50100    | dfs.namenode.backup.address                                  | DataNode 收发器端口                          |
| 50105    | dfs.namenode.backup.http-address                             |                                              |
| 50470    | dfs.https.port,dfs.namenode.https-address?                   | 安全 NameNode Web UI 端口 (TLS/SSL)          |
| 50475    | dfs.datanode.https.address                                   | 安全 DataNode Web UI 端口 (TLS/SSL)          |
| 50495    | dfs.secondary.https.port                                     | 安全 SecondaryNameNode Web UI 端口 (TLS/SSL) |
| 50579    | nfs.https.port                                               | Secure NFS Gateway Web UI Port (TLS/SSL)     |


Hadoop YARN:

| 默认端口 | 配置项                               | 备注         |
| ---- | --------------------------------------------- | ----- |
| 8032 | yarn.resourcemanager.address                  |       |
| 8030 | yarn.resourcemanager.scheduler.address        |       |
| 8088 | yarn.resourcemanager.webapp.address           | WebUI |
| 8090 | yarn.resourcemanager.webapp.https.address     |       |
| 8031 | yarn.resourcemanager.resource-tracker.address |       |
| 8033 | yarn.resourcemanager.admin.address            |       |
| 8044 | yarn.nodemanager.webapp.https.address         |       |
| 8047 | yarn.sharedcache.admin.address                |       |
| 8788 | yarn.sharedcache.webapp.address               |       |
| 8046 | yarn.sharedcache.uploader.server.address      |       |
| 8045 | yarn.sharedcache.client-server.address        |       |
| 8049 | yarn.nodemanager.amrmproxy.address            |       |
| 8089 | yarn.router.webapp.address                    |       |
| 8091 | yarn.router.webapp.https.address              |       |

Hadoop MapReduce：

| 默认端口 | 配置项                               | 备注         |
| ----- | ----------------------------------------- | ---- |
| 10020 | mapreduce.jobhistory.address              |      |
| 19888 | mapreduce.jobhistory.webapp.address       |      |
| 19890 | mapreduce.jobhistory.webapp.https.address |      |

Hive

| 默认端口 | 配置项                               | 备注         |
| ----- | ----------------------------------------- | ---- |
| 9083  | metastore |      |
| 10000 | thrift    |      |

Spark

| 默认端口 | 配置项                               | 备注         |
| ----- | ----------------------------------------- | ---- |
| 8080  | spark.master.ui.port   | Master WebUI         |
| 8081  | spark.worker.ui.port   | Worker WebUI         |
| 18080 | spark.history.ui.port  | History server WebUI |
| 7077  | SPARK_MASTER_PORT      | Master port          |
| 6066  | spark.master.rest.port | Master REST port     |
| 4040  | spark.ui.port          | Driver WebUI         |

Zookeeper：

| 默认端口 | 配置项                               | 备注         |
| ----- | ----------------------------------------- | ---- |
| 2181 | /etc/zookeeper/conf/zoo.cfg clientPort | 客户端连接端口             |
| 2888 | server.x                               | follower连接到leader的端口 |
| 3888 | server.x                               | leader选举时的端口         |

Kafka

| 默认端口 | 配置项                               | 备注         |
| ----- | ----------------------------------------- | ---- |
| 9092 | server.properties | 客户端连接 |

**Redis**：

​    6379： Redis服务端口

**CDH**：

​    7180： Cloudera Manager WebUI端口

​    7182： Cloudera Manager Server 与 Agent 通讯端口

**HUE**：

​    8888： Hue WebUI 端口