# Hadoop命令笔记

### hadoop --help

```
Usage: hadoop [--config confdir] COMMAND
       where COMMAND is one of:
  fs                   run a generic filesystem user client
  version              print the version
  jar <jar>            run a jar file
  checknative [-a|-h]  check native hadoop and compression libraries availability
  distcp <srcurl> <desturl> copy file or directories recursively
  archive -archiveName NAME -p <parent path> <src>* <dest> create a hadoop archive
  classpath            prints the class path needed to get the
  credential           interact with credential providers
                       Hadoop jar and the required libraries
  daemonlog            get/set the log level for each daemon
  s3guard              manage data on S3
  trace                view and modify Hadoop tracing settings
 or
  CLASSNAME            run the class named CLASSNAME

Most commands print help when invoked w/o parameters.
```

> 注：当调用不带参数的命令时，大多数命令都会显示帮助。

### hadoop version

```
$ hadoop version
Hadoop 2.6.0-cdh5.16.2
Subversion http://github.com/cloudera/hadoop -r 4f94d60caa4cbb9af0709a2fd96dc3861af9cf20
Compiled by jenkins on 2019-06-03T10:41Z
Compiled with protoc 2.5.0
From source with checksum 79b9b24a29c6358b53597c3b49575e37
This command was run using /opt/cloudera/parcels/CDH-5.16.2-1.cdh5.16.2.p0.8/jars/hadoop-common-2.6.0-cdh5.16.2.jar
```

### hdfs dfs -ls

```
Usage: hadoop fs [generic options] -ls [-C] [-d] [-h] [-q] [-R] [-t] [-S] [-r] [-u] [<path> ...]
```



```
$ hdfs dfs -ls /
Found 5 items
drwxr-xr-x   - flink hdfs                0 2019-09-04 14:51 /flink
drwxr-xr-x   - hbase hbase               0 2020-02-26 12:55 /hbase
drwxr-xr-x   - hdfs  supergroup          0 2019-09-20 13:56 /system
drwxrwxrwt   - hdfs  supergroup          0 2020-04-09 11:04 /tmp
drwxr-xr-x   - hdfs  supergroup          0 2019-09-11 21:02 /user
```

### hdfs dfs -mkdir

创建HDFS目录：

```
Usage: hadoop fs [generic options] -mkdir [-p] <path> ...
```

### hdfs dfs -df

展示给定hdfs目标的剩余空间大小：

```
$ hdfs dfs -df hdfs:/
Filesystem                    Size          Used     Available  Use%
hdfs://nameservice1  1241336426496  674560343997  389376255958   54%
```

### hdfs dfs -count

统计符合特定模式的路径下的目录数、文件数和字节数：

```
$ hdfs dfs -count /
       14477        32802       222969126341 /
```

### hdfs fsck

检查Hadoop文件系统的健康状况：

```
$ hdfs fsck /
Connecting to namenode via http://hdp0.local.org:50070/fsck?ugi=hdfs&path=%2F
FSCK started by hdfs (auth:SIMPLE) from /192.168.12.213 for path / at Thu Apr 09 12:52:43 CST 2020
........................................................................................................................................................................................Status: HEALTHY
 Total size:	222969126092 B (Total open files size: 249 B)
 Total dirs:	14477
 Total files:	32794
 Total symlinks:		0 (Files currently being written: 4)
 Total blocks (validated):	25453 (avg. block size 8760033 B) (Total open file blocks (not validated): 3)
 Minimally replicated blocks:	25453 (100.0 %)
 Over-replicated blocks:	0 (0.0 %)
 Under-replicated blocks:	0 (0.0 %)
 Mis-replicated blocks:		0 (0.0 %)
 Default replication factor:	3
 Average block replication:	2.9756021
 Corrupt blocks:		0
 Missing replicas:		0 (0.0 %)
 Number of data-nodes:		3
 Number of racks:		1
FSCK ended at Thu Apr 09 12:52:44 CST 2020 in 1306 milliseconds


The filesystem under path '/' is HEALTHY
```

### hdfs balancer

```
Usage: hdfs balancer
	[-policy <policy>]	the balancing policy: datanode or blockpool
	[-threshold <threshold>]	Percentage of disk capacity
	[-exclude [-f <hosts-file> | <comma-separated list of hosts>]]	Excludes the specified datanodes.
	[-include [-f <hosts-file> | <comma-separated list of hosts>]]	Includes only the specified datanodes.
	[-source [-f <hosts-file> | <comma-separated list of hosts>]]	Pick only the specified datanodes as source nodes.
	[-idleiterations <idleiterations>]	Number of consecutive idle iterations (-1 for Infinite) before exit.
	[-runDuringUpgrade]	Whether to run the balancer during an ongoing HDFS upgrade.This is usually not desired since it will not affect used space on over-utilized machines.

Generic options supported are
-conf <configuration file>     specify an application configuration file
-D <property=value>            use value for given property
-fs <local|namenode:port>      specify a namenode
-jt <local|resourcemanager:port>    specify a ResourceManager
-files <comma separated list of files>    specify comma separated files to be copied to the map reduce cluster
-libjars <comma separated list of jars>    specify comma separated jar files to include in the classpath.
-archives <comma separated list of archives>    specify comma separated archives to be unarchived on the compute machines.

The general command line syntax is
bin/hadoop command [genericOptions] [commandOptions]
```

Output:

```
$ hdfs balancer
20/04/14 20:03:12 INFO balancer.Balancer: namenodes  = [hdfs://nameservice1]
20/04/14 20:03:12 INFO balancer.Balancer: parameters = Balancer.Parameters [BalancingPolicy.Node, threshold = 10.0, max idle iteration = 5, #excluded nodes = 0, #included nodes = 0, #source nodes = 0, run during upgrade = false]
20/04/14 20:03:12 INFO balancer.Balancer: included nodes = []
20/04/14 20:03:12 INFO balancer.Balancer: excluded nodes = []
20/04/14 20:03:12 INFO balancer.Balancer: source nodes = []
Time Stamp               Iteration#  Bytes Already Moved  Bytes Left To Move  Bytes Being Moved
20/04/14 20:03:13 INFO balancer.Balancer: dfs.balancer.movedWinWidth = 5400000 (default=5400000)
20/04/14 20:03:13 INFO balancer.Balancer: dfs.balancer.moverThreads = 1000 (default=1000)
20/04/14 20:03:13 INFO balancer.Balancer: dfs.balancer.dispatcherThreads = 200 (default=200)
20/04/14 20:03:13 INFO balancer.Balancer: dfs.datanode.balance.max.concurrent.moves = 50 (default=50)
20/04/14 20:03:13 INFO balancer.Balancer: dfs.balancer.max-size-to-move = 10737418240 (default=10737418240)
20/04/14 20:03:13 INFO net.NetworkTopology: Adding a new node: /default/192.168.12.212:50010
20/04/14 20:03:13 INFO net.NetworkTopology: Adding a new node: /default/192.168.12.211:50010
20/04/14 20:03:13 INFO net.NetworkTopology: Adding a new node: /default/192.168.12.213:50010
20/04/14 20:03:13 INFO balancer.Balancer: 0 over-utilized: []
20/04/14 20:03:13 INFO balancer.Balancer: 0 underutilized: []
The cluster is balanced. Exiting...
2020-4-14 20:03:13                0                  0 B                 0 B               -1 B
2020-4-14 20:03:13       Balancing took 1.833 seconds
```



## fs命令

### ls

1. 按修改时间倒序排序

   hadoop fs -ls -r -t /path

2. 只列出文件名称

   hadoop fs -ls -C /path

### du

1. 按大小逆序输出子目录及文件的大小

   hadoop fs -du -s /path/* |sort -rnk1

### rm

1. 跳过回收站删除文件

   hadoop rm -r -skipTrash /path

## 参考

[Merging small files in hadoop](https://stackoverflow.com/questions/39103872/merging-small-files-in-hadoop?answertab=votes#tab-top)

[30 Most Frequently Used Hadoop HDFS Shell Commands](https://linoxide.com/file-system/hadoop-hdfs-shell-commands/)