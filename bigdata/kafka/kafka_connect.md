# Kafka connect笔记

## 官方文档

官方文档：https://docs.confluent.io/5.3.0/connect/devguide.html

> In addition to the key and value, records have partition IDs and offsets. These are used by the framework to periodically commit the offsets of data that have been processed. In the event of a failure, processing can resume from the last committed offsets, avoiding unnecessary reprocessing and duplication of events.

[Kafka connect的offset commit机制](https://blog.csdn.net/xianzhen376/article/details/51896604)

### Connector

- ConnectorContext.requestTaskReconfiguration()来监控数据源分区的变化

### SourceTask

- 线程操作必须是interruptible
- 没有数据的时候可以sleep，因而基于NIO的方式会更加高效
- commit()阻塞直到commit之后，commitRecord()在每条record commit之后调用
- SourceContext用来恢复offset

### SinkTask

- put() 可以异步，建议缓存，批量写入（类似Kafka producer）
- flush(offsets) 将未完成的数据写入目标系统并阻塞直到确认成功。参数offsets可以用来实现EOS。
- consumer是单线程的，确保put()和flush()不会触发consumer会话超时，否则会触发rebalance
- 同一个connector的task属于同一个consumer组
- task重新配置或者失败会触发整个consumer组的rebalance，从而对所有task都会产生影响
- 在rebalance开始前或者task停止获取数据后会调用close()
- open()用来在分区rebalance后和task获取数据之前创建一个writer
- close()和open()抛出的任何异常都会导致task停止，consumer关闭，进而触发rebalance
- schema校验不通过抛出异常

### JDBC-Sink

- "pk.mode"默认值为none
- 默认delete.enabled=false，启用需要设置"pk.mode"
- "insert.mode"分为"insert"和"upsert", upsert可提供幂等性
- auto.create自动创建表
- auto.evolve自动创建列

### bugs

- Config map not whole override

## 原理

[User Guide](https://docs.confluent.io/3.0.0/connect/userguide.html#getting-started)

## 配置参数

### offset.flush.interval.ms

参考：

[Kafka Connect Worker Configuration](https://docs.confluent.io/current/connect/references/allconfigs.html)

## 源码

### ConfigDef类

Connect参数的定义是由类[ConfigDef](https://kafka.apache.org/10/javadoc/org/apache/kafka/common/config/ConfigDef.html)来负责的，ConfigDef定义了几种[Type](https://kafka.apache.org/10/javadoc/org/apache/kafka/common/config/ConfigDef.Type.html)包括：

```
BOOLEAN, STRING, INT, SHORT, LONG, DOUBLE, LIST, CLASS, PASSWORD
```

ConfigDef的解析由方法[ConfigDef.parseType()](https://kafka.apache.org/10/javadoc/org/apache/kafka/common/config/ConfigDef.html#parseType-java.lang.String-java.lang.Object-org.apache.kafka.common.config.ConfigDef.Type-)来完成。

其中需要注意的是List类型对应逗号分隔的字符串，Class类型对应于Java中的类名。

## 类隔离

## Debezium日期类型

| 类                              | Connect类型 | Java类                  | 释义                               |
| ------------------------------- | ----------- | ----------------------- | ---------------------------------- |
| io.debezium.time.Date           | int32       | java.time.LocalDate     | 自1970-01-01T00:00:00Z之后的天数   |
| io.debezium.time.MicroTime      | int64       | java.time.LocalTime     | 当日时间的微秒数                   |
| io.debezium.time.Timestamp      | int64       | java.time.LocalDateTime | 自1970-01-01T00:00:00Z之后的毫秒数 |
| io.debezium.time.ZonedTimestamp | String      | java.time.ZonedDateTime | 格式化的日期字符串                 |

MySQL的datetime和timestamp等日期类型都映射为UTC时区的值发送到connect。

参考：

[How the MySQL connector maps data types](https://debezium.io/documentation/reference/1.2/connectors/mysql.html#how-the-mysql-connector-maps-data-types_debezium)



