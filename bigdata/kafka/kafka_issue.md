# Kafka Issue

```
[2020-06-12 14:30:49,718] [ERROR] org.apache.kafka.connect.runtime.WorkerSourceTask$1.onCompletion(WorkerSourceTask.java:347) [mysql_306077170561026|task-0] WorkerSourceTask{id=mysql_306077170561026-0} failed to send record to mysql_306077170561026.connect_demo.id_name: 
org.apache.kafka.common.KafkaException: Producer is closed forcefully.
    at org.apache.kafka.clients.producer.internals.RecordAccumulator.abortBatches(RecordAccumulator.java:747)
    at org.apache.kafka.clients.producer.internals.RecordAccumulator.abortIncompleteBatches(RecordAccumulator.java:734)
    at org.apache.kafka.clients.producer.internals.Sender.run(Sender.java:284)
    at java.lang.Thread.run(Thread.java:748)
[2020-06-12 14:30:49,718] [ERROR] org.apache.kafka.connect.runtime.WorkerSourceTask$1.onCompletion(WorkerSourceTask.java:347) [mysql_306077170561026|task-0] WorkerSourceTask{id=mysql_306077170561026-0} failed to send record to mysql_306077170561026.connect_demo.id_name: 
org.apache.kafka.common.KafkaException: Producer is closed forcefully.
    at org.apache.kafka.clients.producer.internals.RecordAccumulator.abortBatches(RecordAccumulator.java:747)
    at org.apache.kafka.clients.producer.internals.RecordAccumulator.abortIncompleteBatches(RecordAccumulator.java:734)
    at org.apache.kafka.clients.producer.internals.Sender.run(Sender.java:284)
    at java.lang.Thread.run(Thread.java:748)
```

参考：[kafka producer异步发送在失败回调里close，会失去前面retry的request的正确回调结果](https://www.orchome.com/809)

