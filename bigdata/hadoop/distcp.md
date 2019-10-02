# Distcp命令

usage：

```
usage: distcp OPTIONS [source_path...] <target_path>
                            OPTIONS
 -append                       Reuse existing data in target files and
                               append new data to them if possible
 -async                        Should distcp execution be blocking
 -atomic                       Commit all changes or none
 -bandwidth <arg>              Specify bandwidth per map in MB
 -blocksperchunk <arg>         If set to a positive value, fileswith more
                               blocks than this value will be split into
                               chunks of <blocksperchunk> blocks to be
                               transferred in parallel, and reassembled on
                               the destination. By default,
                               <blocksperchunk> is 0 and the files will be
                               transmitted in their entirety without
                               splitting. This switch is only applicable
                               when the source file system implements
                               getBlockLocations method and the target
                               file system implements concat method
 -copybuffersize <arg>         Size of the copy buffer to use. By default
                               <copybuffersize> is 8192B.
 -delete                       Delete from target, files missing in source
 -diff <arg>                   Use snapshot diff report to identify the
                               difference between source and target
 -f <arg>                      List of files that need to be copied
 -filelimit <arg>              (Deprecated!) Limit number of files copied
                               to <= n
 -filters <arg>                The path to a file containing a list of
                               strings for paths to be excluded from the
                               copy.
 -i                            Ignore failures during copy
 -log <arg>                    Folder on DFS where distcp execution logs
                               are saved
 -m <arg>                      Max number of concurrent maps to use for
                               copy
 -mapredSslConf <arg>          Configuration for ssl config file, to use
                               with hftps://. Must be in the classpath.
 -numListstatusThreads <arg>   Number of threads to use for building file
                               listing (max 40).
 -overwrite                    Choose to overwrite target files
                               unconditionally, even if they exist.
 -p <arg>                      preserve status (rbugpcaxt)(replication,
                               block-size, user, group, permission,
                               checksum-type, ACL, XATTR, timestamps). If
                               -p is specified with no <arg>, then
                               preserves replication, block size, user,
                               group, permission, checksum type and
                               timestamps. raw.* xattrs are preserved when
                               both the source and destination paths are
                               in the /.reserved/raw hierarchy (HDFS
                               only). raw.* xattrpreservation is
                               independent of the -p flag. Refer to the
                               DistCp documentation for more details.
 -rdiff <arg>                  Use target snapshot diff report to identify
                               changes made on target
 -sizelimit <arg>              (Deprecated!) Limit number of files copied
                               to <= n bytes
 -skipcrccheck                 Whether to skip CRC checks between source
                               and target paths.
 -strategy <arg>               Copy strategy to use. Default is dividing
                               work based on file sizes
 -tmp <arg>                    Intermediate work path to be used for
                               atomic commit
 -update                       Update target, copying only missingfiles or
                               directories
```



### 注意事项

1. 使用有权限的用户（hdfs）
2. 在源集群运行命令
3. 目的集群使用active namenode地址。



**尝试一**

命令：

```
hadoop distcp -atomic hdfs://nameservice1/user/58box/ hdfs://10.9.15.227:9000/home/hdp_mis_yxzn/resultdata/58box/online
```

报错：

```
Caused by: java.io.IOException: Couldn't run retriable-command: Copying hdfs://nameservice1/user/58box/2011010815591950f73e6a/1055776356865953793 to hdfs://10.9.15.227:9000/home/hdp_mis_yxzn/resultdata/58box/._WIP_online-342047731/2011010815591950f73e6a/1055776356865953793
	at org.apache.hadoop.tools.util.RetriableCommand.execute(RetriableCommand.java:101)
	at org.apache.hadoop.tools.mapred.CopyMapper.copyFileWithRetry(CopyMapper.java:304)
	... 11 more
Caused by: java.io.IOException: Check-sum mismatch between hdfs://nameservice1/user/58box/2011010815591950f73e6a/1055776356865953793 and hdfs://10.9.15.227:9000/home/hdp_mis_yxzn/resultdata/58box/._WIP_online-342047731/.distcp.tmp.attempt_local1251455226_0001_m_000000_0. Source and target differ in block-size. Use -pb to preserve block-sizes during copy. Alternatively, skip checksum-checks altogether, using -skipCrc. (NOTE: By skipping checksums, one runs the risk of masking data-corruption during file-transfer.)
	at org.apache.hadoop.tools.mapred.RetriableFileCopyCommand.compareCheckSums(RetriableFileCopyCommand.java:221)
	at org.apache.hadoop.tools.mapred.RetriableFileCopyCommand.doCopy(RetriableFileCopyCommand.java:134)
	at org.apache.hadoop.tools.mapred.RetriableFileCopyCommand.doExecute(RetriableFileCopyCommand.java:100)
	at org.apache.hadoop.tools.util.RetriableCommand.execute(RetriableCommand.java:87)
	... 12 more
```

**尝试二**

命令：

```
hadoop distcp -pb -atomic -log /tmp/box_distcp.log hdfs://nameservice1/user/58box/ hdfs://10.9.15.227:9000/home/hdp_mis_yxzn/resultdata/58box/online
```

报错：

```
java.io.IOException: Failed on local exception: java.io.IOException: Connection reset by peer; Host Details : local host is: "tjtx148-14-137.58os.org/10.148.14.137"; destination host is: "bjm6-15-227.58os.org":9000; 
	at org.apache.hadoop.net.NetUtils.wrapException(NetUtils.java:772)
	at org.apache.hadoop.ipc.Client.call(Client.java:1508)
	at org.apache.hadoop.ipc.Client.call(Client.java:1441)
	at org.apache.hadoop.ipc.ProtobufRpcEngine$Invoker.invoke(ProtobufRpcEngine.java:230)
	at com.sun.proxy.$Proxy10.addBlock(Unknown Source)
	at org.apache.hadoop.hdfs.protocolPB.ClientNamenodeProtocolTranslatorPB.addBlock(ClientNamenodeProtocolTranslatorPB.java:425)
	at sun.reflect.GeneratedMethodAccessor7.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.apache.hadoop.io.retry.RetryInvocationHandler.invokeMethod(RetryInvocationHandler.java:258)
	at org.apache.hadoop.io.retry.RetryInvocationHandler.invoke(RetryInvocationHandler.java:104)
	at com.sun.proxy.$Proxy11.addBlock(Unknown Source)
	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.locateFollowingBlock(DFSOutputStream.java:1860)
	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.nextBlockOutputStream(DFSOutputStream.java:1656)
	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.run(DFSOutputStream.java:790)
Caused by: java.io.IOException: Connection reset by peer
	at sun.nio.ch.FileDispatcherImpl.read0(Native Method)
	at sun.nio.ch.SocketDispatcher.read(SocketDispatcher.java:39)
	at sun.nio.ch.IOUtil.readIntoNativeBuffer(IOUtil.java:223)
	at sun.nio.ch.IOUtil.read(IOUtil.java:197)
	at sun.nio.ch.SocketChannelImpl.read(SocketChannelImpl.java:380)
	at org.apache.hadoop.net.SocketInputStream$Reader.performIO(SocketInputStream.java:57)
	at org.apache.hadoop.net.SocketIOWithTimeout.doIO(SocketIOWithTimeout.java:142)
	at org.apache.hadoop.net.SocketInputStream.read(SocketInputStream.java:161)
	at org.apache.hadoop.net.SocketInputStream.read(SocketInputStream.java:131)
	at java.io.FilterInputStream.read(FilterInputStream.java:133)
	at java.io.FilterInputStream.read(FilterInputStream.java:133)
	at org.apache.hadoop.ipc.Client$Connection$PingInputStream.read(Client.java:553)
	at java.io.BufferedInputStream.fill(BufferedInputStream.java:246)
	at java.io.BufferedInputStream.read(BufferedInputStream.java:265)
	at java.io.DataInputStream.readInt(DataInputStream.java:387)
	at org.apache.hadoop.ipc.Client$Connection.receiveRpcResponse(Client.java:1113)
	at org.apache.hadoop.ipc.Client$Connection.run(Client.java:1006)
19/03/27 16:51:33 ERROR util.RetriableCommand: Failure in Retriable command: Copying hdfs://nameservice1/user/58box/2011010815591950f73e6a/1055384719614566400 to hdfs://10.9.15.227:9000/home/hdp_mis_yxzn/resultdata/58box/._WIP_online-1811973567/2011010815591950f73e6a/1055384719614566400
java.net.ConnectException: Call From tjtx148-14-137.58os.org/10.148.14.137 to bjm6-15-227.58os.org:9000 failed on connection exception: java.net.ConnectException: 拒绝连接; For more details see:  http://wiki.apache.org/hadoop/ConnectionRefused
	at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62)
	at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	at java.lang.reflect.Constructor.newInstance(Constructor.java:423)
	at org.apache.hadoop.net.NetUtils.wrapWithMessage(NetUtils.java:791)
	at org.apache.hadoop.net.NetUtils.wrapException(NetUtils.java:731)
	at org.apache.hadoop.ipc.Client.call(Client.java:1508)
	at org.apache.hadoop.ipc.Client.call(Client.java:1441)
	at org.apache.hadoop.ipc.ProtobufRpcEngine$Invoker.invoke(ProtobufRpcEngine.java:230)
	at com.sun.proxy.$Proxy10.getFileInfo(Unknown Source)
	at org.apache.hadoop.hdfs.protocolPB.ClientNamenodeProtocolTranslatorPB.getFileInfo(ClientNamenodeProtocolTranslatorPB.java:788)
	at sun.reflect.GeneratedMethodAccessor3.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.apache.hadoop.io.retry.RetryInvocationHandler.invokeMethod(RetryInvocationHandler.java:258)
	at org.apache.hadoop.io.retry.RetryInvocationHandler.invoke(RetryInvocationHandler.java:104)
	at com.sun.proxy.$Proxy11.getFileInfo(Unknown Source)
	at org.apache.hadoop.hdfs.DFSClient.getFileInfo(DFSClient.java:2168)
	at org.apache.hadoop.hdfs.DistributedFileSystem$20.doCall(DistributedFileSystem.java:1266)
	at org.apache.hadoop.hdfs.DistributedFileSystem$20.doCall(DistributedFileSystem.java:1262)
	at org.apache.hadoop.fs.FileSystemLinkResolver.resolve(FileSystemLinkResolver.java:81)
	at org.apache.hadoop.hdfs.DistributedFileSystem.getFileStatus(DistributedFileSystem.java:1262)
	at org.apache.hadoop.fs.FileSystem.exists(FileSystem.java:1418)
	at org.apache.hadoop.tools.mapred.RetriableFileCopyCommand.doCopy(RetriableFileCopyCommand.java:148)
	at org.apache.hadoop.tools.mapred.RetriableFileCopyCommand.doExecute(RetriableFileCopyCommand.java:100)
	at org.apache.hadoop.tools.util.RetriableCommand.execute(RetriableCommand.java:87)
	at org.apache.hadoop.tools.mapred.CopyMapper.copyFileWithRetry(CopyMapper.java:304)
	at org.apache.hadoop.tools.mapred.CopyMapper.map(CopyMapper.java:267)
	at org.apache.hadoop.tools.mapred.CopyMapper.map(CopyMapper.java:52)
	at org.apache.hadoop.mapreduce.Mapper.run(Mapper.java:145)
	at org.apache.hadoop.mapred.MapTask.runNewMapper(MapTask.java:793)
	at org.apache.hadoop.mapred.MapTask.run(MapTask.java:341)
	at org.apache.hadoop.mapred.LocalJobRunner$Job$MapTaskRunnable.run(LocalJobRunner.java:270)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at java.util.concurrent.FutureTask.run(FutureTask.java:266)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
Caused by: java.net.ConnectException: 拒绝连接
	at sun.nio.ch.SocketChannelImpl.checkConnect(Native Method)
	at sun.nio.ch.SocketChannelImpl.finishConnect(SocketChannelImpl.java:717)
	at org.apache.hadoop.net.SocketIOWithTimeout.connect(SocketIOWithTimeout.java:206)
	at org.apache.hadoop.net.NetUtils.connect(NetUtils.java:530)
	at org.apache.hadoop.net.NetUtils.connect(NetUtils.java:494)
	at org.apache.hadoop.ipc.Client$Connection.setupConnection(Client.java:648)
	at org.apache.hadoop.ipc.Client$Connection.setupIOstreams(Client.java:744)
	at org.apache.hadoop.ipc.Client$Connection.access$3000(Client.java:396)
	at org.apache.hadoop.ipc.Client.getConnection(Client.java:1557)
	at org.apache.hadoop.ipc.Client.call(Client.java:1480)
	... 31 more
```









> [Using DistCp with Highly Available Remote Clusters](https://www.cloudera.com/documentation/enterprise/5-12-x/topics/cdh_admin_distcp_data_cluster_migrate.html#concept_yjz_2wn_bbb)

1. 新建一个distcpConf目录，把本集群的/etc/hadoop/conf内容拷贝到里面

2. 修改distcpConf/hdfs-site.xml，把远程集群的nameservice ID加入dfs.nameservices属性中，如果nameservice一样则重新命名：

   ```
   <property>
    <name>dfs.nameservices</name>
    <value>nameservice1,externalnameservice</value>
    </property>
   ```

3. 把远程集群hdfs-site.xml中相关属性加入到distcpConf/hdfs-site.xml中，nameserviceID要和第二步中的保持一致：

   ```
   dfs.ha.namenodes.<nameserviceID>
   dfs.client.failover.proxy.provider.<remote nameserviceID>
   dfs.ha.automatic-failover.enabled.<remote nameserviceID>
   dfs.namenode.rpc-address.<nameserviceID>.<namenode1>
   dfs.namenode.servicerpc-address.<nameserviceID>.<namenode1>
   dfs.namenode.http-address.<nameserviceID>.<namenode1>
   dfs.namenode.https-address.<nameserviceID>.<namenode1>
   dfs.namenode.rpc-address.<nameserviceID>.<namenode2>
   dfs.namenode.servicerpc-address.<nameserviceID>.<namenode2>
   dfs.namenode.http-address.<nameserviceID>.<namenode2>
   dfs.namenode.https-address.<nameserviceID>.<namenode2>
   ```

4. 运行distcp命令：

   ```
   #不安全集群
   hadoop --config distcpConf distcp hdfs://<nameservice>/<source_directory> <target directory>
   #安全集群
   hadoop --config distcpConf distcp -Dmapreduce.job.hdfs-servers.token-renewal.exclude=<nameservice>  hdfs://<nameservice>/<source_directory> <target directory>
   ```


> [DistCp Version2 Guide](https://hadoop.apache.org/docs/current/hadoop-distcp/DistCp.html)
