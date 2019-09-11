Hadoop HDFS：

| 默认端口 | 配置项                               | 备注         |
| -------- | :----------------------------------- | ------------ |
| 8020     | fs.defaultFS                         | hdfs:// 连接 |
| 50090    | dfs.namenode.secondary.http-address  |              |
| 50091    | dfs.namenode.secondary.https-address |              |
| 50010    | dfs.datanode.address                 |              |
| 50075    | dfs.datanode.http.address            | WebUI        |
| 50020    | dfs.datanode.ipc.address             |              |
| 50070    | dfs.namenode.http-address            |              |
| 50475    | dfs.datanode.https.address           |              |
| 50470    | dfs.namenode.https-address           |              |
| 50100    | dfs.namenode.backup.address          |              |
| 50105    | dfs.namenode.backup.http-address     |              |
| 8485     | dfs.journalnode.rpc-address          |              |
| 8480     | dfs.journalnode.http-address         |              |
| 8481     | dfs.journalnode.https-address        |              |
| 8019     | dfs.ha.zkfc.port                     |              |

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