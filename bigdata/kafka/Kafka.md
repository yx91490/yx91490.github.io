# Kafka学习笔记

## 原理

生产者-消费者模式

发布-订阅模式与消费者组

subscribe()和assign()

seek()

coordinator

## Producer配置

### replica.fetch.max.bytes

(默认: 1MB) – broker可复制的消息的最大字节数。这个值应该比`message.max.bytes`大，否则broker会接收此消息，但无法将此消息复制出去，从而造成数据丢失。

允许broker的副本发送消息在集群并确保消息被正确地复制。如果这是太小,则消息不会被复制,因此,消费者永远不会看到的消息,因为消息永远不会承诺(完全复制)。

Brokers会为每个分区分配`replica.fetch.max.bytes`参数指定的内存空间，假设`replica.fetch.max.bytes`=1M，且有1000个分区，则需要差不多1G的内存，确保分区数最大的消息不会超过服务器的内存，否则会报OOM错误。

### max.request.size

发送的消息过大报错（大于默认配置1M）:

```
org.apache.kafka.common.errors.RecordTooLargeException: The message is 12792083 bytes when serialized which is larger than the maximum request size you have configured with the max.request.size configuration.
```

需要注意的是`max.request.size` 需要小于`message.max.bytes`，否则报错：

```
org.apache.kafka.common.errors.RecordTooLargeException: The request included a message larger than the max message size the server will accept.
```

 同时，消费端也要配置属性`max.partition.fetch.bytes`以接收大数据。

相关源码：`org.apache.kafka.clients.producer.KafkaProducer#doSend()`

## Broker配置

### message.max.bytes

（默认：1000012）可以接受数据生产者最大消息数据大小

## Topic配置

### max.message.bytes

（默认：1000012）

## Consumer配置

### fetch.max.bytes



### fetch.message.max.bytes

(默认 1MB) – 消费者能读取的最大消息。这个值应该大于或等于`message.max.bytes`。

指定了最大消息需要的内存空间，同样分区数最大需要内存空间不能超过服务器的内存。

### max.partition.fetch.bytes

(默认 1MB) –新消费者能读取的最大消息。这个值应该大于或等于`message.max.bytes`。

### max.poll.records

### auto.offset.reset

**latest和earliest区别**

1. earliest 当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费

2. latest 当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的该分区下的数据

## 命令行

查询 topic 各个分区当前Producer发送的消息Offset值(-1表示当前各个分区的最大位移，-2表示当前各个分区的最小位移)：

```
./bin/kafka-run-class kafka.tools.GetOffsetShell --broker-list localhost:9092 --topic <topic>  [-1|-2]
```

查看Consumer组的offset：

```
kafka-consumer-groups --bootstrap-server localhost:9092 --describe --group  <group>
```

参考：

- [kafka查询最新producer offset的命令](https://blog.csdn.net/wyqwilliam/article/details/84428565)

## 实践

### Kafka consumer处理大消息数据问题

Kafka设计的初衷是迅速处理小量的消息，**一般10K大小的消息吞吐性能最好**。针对大消息数据问题，可以参考如下建议：

- 最好的方法是不直接传送这些大的数据。如果有共享存储，如NAS, HDFS, S3等，可以把这些大的文件存放到共享存储，然后使用Kafka来传送文件的位置信息。
- 第二个方法是，将大的消息数据切片或切块，在生产端将数据切片为10K大小，使用分区主键确保一个大消息的所有部分会被发送到同一个kafka分区（这样每一部分的拆分顺序得以保留），如此以来，当消费端使用时会将这些部分重新还原为原始的消息。
- 第三，Kafka的生产端可以压缩消息，如果原始消息是XML，当通过压缩之后，消息可能会变得不那么大。在生产端的配置参数中使用*compression.codec*和*commpressed.topics*可以开启压缩功能，压缩算法可以使用*GZip*或*Snappy*。

### Kafka打开文件问题

https://shanavas.org/kafka/2019/03/19/tracking-down-kafka-files.html

## 参考

- [Re: the cleaner and log segments](http://mail-archives.apache.org/mod_mbox/kafka-users/201111.mbox/%3cCAFbh0Q3wXeivW9G+xre5eN8-SLVprdNLWyKmd+CcW6n=A=ZSHQ@mail.gmail.com%3e)
- [Kafka consumer处理大消息数据问题分析](https://www.jianshu.com/p/ad53fdf1c2c2)
- [Kafka常见错误整理（不断更新中）](https://www.cnblogs.com/tree1123/p/11531524.html)
- [Increase the number of messages read by a Kafka consumer in a single poll](https://stackoverflow.com/questions/51753883/increase-the-number-of-messages-read-by-a-kafka-consumer-in-a-single-poll)
