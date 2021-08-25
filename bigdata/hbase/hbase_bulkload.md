# HBase BulkLoad总结

## 问题

### 1.没有排序问题

```
Caused by: java.io.IOException: Added a key not lexically larger than previous. Current cell = 2b686f5f030b9de5/cf1:create_time/1605862302304/Put/vlen=21/seqid=0, prevCell = da84a314ede70a1a/cf1:create_time/1605862302304/Put/vlen=21/seqid=0
    at org.apache.hadoop.hbase.util.BloomContext.sanityCheck(BloomContext.java:63)
    at org.apache.hadoop.hbase.util.BloomContext.writeBloom(BloomContext.java:54)
    at org.apache.hadoop.hbase.regionserver.StoreFileWriter.appendGeneralBloomfilter(StoreFileWriter.java:213)
    at org.apache.hadoop.hbase.regionserver.StoreFileWriter.append(StoreFileWriter.java:232)
    at org.apache.hadoop.hbase.mapreduce.HFileOutputFormat2$1.write(HFileOutputFormat2.java:337)
    at org.apache.hadoop.hbase.mapreduce.HFileOutputFormat2$1.write(HFileOutputFormat2.java:230)
    at org.apache.spark.internal.io.HadoopMapReduceWriteConfigUtil.write(SparkHadoopWriter.scala:356)
    at org.apache.spark.internal.io.SparkHadoopWriter$$anonfun$4.apply(SparkHadoopWriter.scala:130)
    at org.apache.spark.internal.io.SparkHadoopWriter$$anonfun$4.apply(SparkHadoopWriter.scala:127)
    at org.apache.spark.util.Utils$.tryWithSafeFinallyAndFailureCallbacks(Utils.scala:1394)
    at org.apache.spark.internal.io.SparkHadoopWriter$.org$apache$spark$internal$io$SparkHadoopWriter$$executeTask(SparkHadoopWriter.scala:139)
    ... 10 more
```

### 2.单个列簇的hfile过多

```
2020-11-20 19:37:35 ERROR LoadIncrementalHFiles:582 - Trying to load more than 32 hfiles to family cf1 of region with start key 
2020-11-20 19:37:35 INFO  ConnectionImplementation:1775 - Closing master protocol: MasterService
Exception in thread "main" java.security.PrivilegedActionException: java.io.IOException: Trying to load more than 32 hfiles to one family of one region
    at java.security.AccessController.doPrivileged(Native Method)
    at javax.security.auth.Subject.doAs(Subject.java:360)
    at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1672)
    at io.github.centercode.hbase.BulkLoad$$anonfun$main$1.apply(BulkLoad.scala:55)
    at io.github.centercode.hbase.BulkLoad$$anonfun$main$1.apply(BulkLoad.scala:49)
    at scala.util.Using$.apply(Using.scala:11)
    at io.github.centercode.hbase.BulkLoad$.main(BulkLoad.scala:49)
    at io.github.centercode.hbase.BulkLoad.main(BulkLoad.scala)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
    at java.lang.reflect.Method.invoke(Method.java:498)
    at org.apache.spark.deploy.JavaMainApplication.start(SparkApplication.scala:52)
    at org.apache.spark.deploy.SparkSubmit.org$apache$spark$deploy$SparkSubmit$$runMain(SparkSubmit.scala:849)
    at org.apache.spark.deploy.SparkSubmit.doRunMain$1(SparkSubmit.scala:167)
    at org.apache.spark.deploy.SparkSubmit.submit(SparkSubmit.scala:195)
    at org.apache.spark.deploy.SparkSubmit.doSubmit(SparkSubmit.scala:86)
    at org.apache.spark.deploy.SparkSubmit$$anon$2.doSubmit(SparkSubmit.scala:924)
    at org.apache.spark.deploy.SparkSubmit$.main(SparkSubmit.scala:933)
    at org.apache.spark.deploy.SparkSubmit.main(SparkSubmit.scala)
Caused by: java.io.IOException: Trying to load more than 32 hfiles to one family of one region
    at org.apache.hadoop.hbase.tool.LoadIncrementalHFiles.performBulkLoad(LoadIncrementalHFiles.java:430)
    at org.apache.hadoop.hbase.tool.LoadIncrementalHFiles.doBulkLoad(LoadIncrementalHFiles.java:342)
    at org.apache.hadoop.hbase.tool.LoadIncrementalHFiles.doBulkLoad(LoadIncrementalHFiles.java:256)
    at io.github.centercode.hbase.BulkLoad$$anonfun$main$1$$anon$1.run(BulkLoad.scala:58)
    at io.github.centercode.hbase.BulkLoad$$anonfun$main$1$$anon$1.run(BulkLoad.scala:55)
    ... 20 more
```

Yarn任务失败后重试2次问题：

```
spark.yarn.maxAppAttempts
```

参考：https://spark.apache.org/docs/latest/running-on-yarn.html

### 3.不支持Snappy压缩

[错误日志](http://al-bj-bigdata-inf-test08:8042/node/containerlogs/container_e110_1606223626620_0027_01_000001/hive/stdout/?start=0)

参考：[Snappy问题](http://support-it.huawei.com/docs/zh-cn/fusioninsight-all/fusioninsight_hd_6.5.1_documentation/zh-cn_topic_0165576467.html)

### 4.Spark任务被kill

参考：https://stackoverflow.com/questions/47907561/spark-error-executor-coarsegrainedexecutorbackend-received-signal-term





## 参考

[RDD Programming Guide](https://spark.apache.org/docs/2.4.0/rdd-programming-guide.html)

[Tuning Spark](https://spark.apache.org/docs/2.4.0/tuning.html)

