# zeppelin使用趟坑

### 环境

| 组件     | 版本  |
| -------- | ----- |
| zeppelin | 0.8.0 |
| CDH      | 5.15  |
| spark    | 2.3.0 |
| python   | 3.6.5 |

### PySpark

#### netty包版本冲突

pyspark不能运行，产生下面的`NoSuchMethodError`异常：

    WARN [2018-12-14 14:14:40,397] ({pool-2-thread-67} NotebookServer.java[afterStatusChange]:2302) - Job 20181204-201952_953985087 is finished, status: ERROR, exception: null, result: %text java.lang.NoSuchMethodError: io.netty.buffer.PooledByteBufAllocator.metric()Lio/netty/buffer/PooledByteBufAllocatorMetric;
                at org.apache.spark.network.util.NettyMemoryMetrics.registerMetrics(NettyMemoryMetrics.java:80)
                at org.apache.spark.network.util.NettyMemoryMetrics.<init>(NettyMemoryMetrics.java:76)
                at org.apache.spark.network.client.TransportClientFactory.<init>(TransportClientFactory.java:109)
                at org.apache.spark.network.TransportContext.createClientFactory(TransportContext.java:99)
                ...//堆栈信息
                at org.apache.zeppelin.spark.BaseSparkScalaInterpreter.spark2CreateContext(BaseSparkScalaInterpreter.scala:189)
大致原因是zeppelin的`netty-all`包版本比spark的版本低，将zeppelin的lib目录里的`netty-all-4.0.23.Final.jar`替换成`netty-all-4.1.17.Final.jar`解决，但是又产生下面的异常：

#### jackson包版本冲突

异常信息如下：

    com.fasterxml.jackson.databind.JsonMappingException: Incompatible Jackson version: 2.8.11-1
           at com.fasterxml.jackson.module.scala.JacksonModule$class.setupModule(JacksonModule.scala:64)
           at com.fasterxml.jackson.module.scala.DefaultScalaModule.setupModule(DefaultScalaModule.scala:19)
           at com.fasterxml.jackson.databind.ObjectMapper.registerModule(ObjectMapper.java:747)
           at org.apache.spark.util.JsonProtocol$.<init>(JsonProtocol.scala:59)
           at org.apache.spark.util.JsonProtocol$.<clinit>(JsonProtocol.scala)
zeppelin使用的`jackson-databind`包的版本是`2.8.11.1`，换成`2.6.7.1`问题解决。

#### commons-lang3包版本冲突

运行下面的代码：

```
%spark.pyspark
df = spark.read.format("csv").option("header", "true").load("test.csv")
print(df.show(5))
```

使用pyspark读取csv文件到dataframe中，当调用`df.show()`后产生如下异常：

```shell
java.io.InvalidClassException: org.apache.commons.lang3.time.FastDateParser; local class incompatible: stream classdesc serialVersionUID = 2, local class serialVersionUID = 3
	at java.io.ObjectStreamClass.initNonProxy(ObjectStreamClass.java:621)
	at java.io.ObjectInputStream.readNonProxyDesc(ObjectInputStream.java:1623)
	at java.io.ObjectInputStream.readClassDesc(ObjectInputStream.java:1518)
	...//堆栈信息
(<class 'py4j.protocol.Py4JJavaError'>, Py4JJavaError('An error occurred while calling o98.showString.\n', JavaObject id=o100), <traceback object at 0x7faeb0e56048>)	
```

大致原因是类FastDateParser序列化时的serialVersionUID是2，而反序列化时serialVersionUID是3，查看发现zeppelin使用的commons-lang3包的版本是3.4，而spark使用的是3.5，把zeppelin的包替换成3.5后此问题解决。

### 开发环境配置

#### 编译

	# zeppelin 0.9 maven编译参数
	mvn clean install -DskipTests -Drat.skip=true -Dcheckstyle.skip -pl '!groovy,!angular,!shell,!livy,!hbase,!pig,!jdbc,!file,!flink,!ignite,!kylin,!lens,!cassandra,!elasticsearch,!bigquery,!alluxio,!scio,!neo4j,!sap,!scalding,!java,!beam,!hazelcastjet,!geode' -Pscala-2.11 -Pspark-2.3 -Dhadoop.version=2.6.0-cdh5.15.0
#### maven CheckStyle插件

略过checkstyle检查：


	mvn [goal] -Dcheckstyle.skip

IDE插件：

1. 安装[CheckStyle IDEA plugin](https://plugins.jetbrains.com/plugin/1065-checkstyle-idea).
2. [把配置引入编辑器](https://stackoverflow.com/a/35273850/2062384)

参考：

> https://stackoverflow.com/questions/8409074/how-can-i-easily-fix-checkstyle-errors/8417213#8417213
>
> https://stackoverflow.com/questions/35149422/how-to-fix-the-maven-check-style-error/35149647