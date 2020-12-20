# HDFS Issue

### 1.DataNode汇报块不及时导致报错

```
2020-11-02 16:39:41,515 INFO org.apache.hadoop.hdfs.server.namenode.FSNamesystem: BLOCK* checkFileProgress: blk_1653438437_582833232{blockUCState=COMMITTED, primaryNodeIndex=-1, 
replicas=[ReplicaUnderConstruction[[DISK]DS-b2dc6b07-b55a-4176-a5db-206250c4aed6:NORMAL:
172.16.36.158:1004|RBW], ReplicaUnderConstruction[[DISK]DS-06c29767-45cf-43de-a68b-86b103ea9c0a:NORMAL:
172.16.36.179:1004|RBW], ReplicaUnderConstruction[[DISK]DS-9a76064f-6b52-4cb3-b469-f86efedc582b:NORMAL:
172.16.22.209:1004|RBW]]} has not reached minimal replication 1

2020-11-02 16:39:41,918 INFO org.apache.hadoop.hdfs.server.namenode.FSNamesystem: BLOCK* checkFileProgress: blk_1653438437_582833232{
  blockUCState=COMMITTED, primaryNodeIndex=-1, replicas=[ReplicaUnderConstruction[
    [DISK]DS-b2dc6b07-b55a-4176-a5db-206250c4aed6:NORMAL:172.16.36.158:1004|RBW], 
    ReplicaUnderConstruction[[DISK]DS-06c29767-45cf-43de-a68b-86b103ea9c0a:NORMAL:
    172.16.36.179:1004|RBW], ReplicaUnderConstruction[[DISK]DS-9a76064f-6b52-4cb3-b469-f86efedc582b:NORMAL:172.16.22.209:1004|RBW]]} has not reached minimal replication 1
2020-11-02 16:39
```

### 2.没有足够副本数

参考：

- [ There are 1 datanode(s) running and no node(s) are excluded in this operation](https://stackoverflow.com/questions/36015864/hadoop-be-replicated-to-0-nodes-instead-of-minreplication-1-there-are-1/36310025)

- [could only be replicated to 0 nodes instead of minReplication (=1)](https://stackoverflow.com/questions/34245682/could-only-be-replicated-to-0-nodes-instead-of-minreplication-1-there-are-4)

- [hdfs通过put命令上传文件成果，reduce阶段写入hdfs报错是什么原因？](https://www.runexception.com/q/180)

### 3.小文件问题

所谓的小文件是指远远小于文件块大小的文件。众所周知HDFS中过多的小文件会给NameNode造成很大的压力，在使用HDFS的过程中，应尽量避免生成过多的小文件。

将本地的小文件合并上传到HDFS：

```shell
hadoop fs -appendToFile 1.txt 2.txt hdfs://cdh5/tmp/merged.txt
```

下载HDFS的小文件并合并到本地：

```shell
hadoop fs -getmerge hdfs://cdh5/tmp/*.txt local.txt
```

参考：

- [合并HDFS和本地文件系统中的小文件](http://lxw1234.com/archives/2015/09/481.htm)