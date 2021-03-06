# Hadoop面试题

### 列举出hadoop中定义的最常用的InputFormats.哪个是默认的？

**TextInputFormat**(默认)用于读取纯文本文件，key是每一行的位置偏移量，是LongWritable类型的，value是每一行的内容，为Text类型
**KeyValueTextInputFormat** 同样用于读取文件，如果行被分隔符（缺省是tab）分割为两部分，第一部分为key，剩下的部分 为value；如果没有分隔符，整行作为 key，value为空
**SequenceFileInputFormat** 用于读取sequence file。 sequence file是Hadoop用于存储数据自定义格式的binary文件。它有   两个子类：

- SequenceFileAsBinaryInputFormat，将 key和value以BytesWritable的类型读出；

- SequenceFileAsTextInputFormat，将key和value以Text类型读出

**NLineInputFormat** 可以将文件以行为单位进行split，比如文件的每一行对应一个map。得到的key是每一行                     的位置偏移量（LongWritable类型），value是每一行的内容，Text类型。 
**CompositeInputFormat**用于多个数据源的join。 
**extOutputFormat**，输出到纯文本文件，格式为 key + " " + value。
**NullOutputFormat**，hadoop中的/dev/null，将输出送进黑洞。
**SequenceFileOutputFormat**， 输出到sequence file格式文件。
**MultipleSequenceFileOutputFormat**，**MultipleTextOutputFormat**，根据key将记录输出到不同的文件。
**DBInputFormat**和**DBOutputFormat**，从DB读取，输出到DB。

### TextInputFormat和KeyValueInputFormat类不同之处在于哪里？

TextInputFormat读取文本文件中的所有行，提供了行的偏移作为Mapper的键，实际的行作为 mapper的值。 KeyValueInputFormat读取文本文件，解析所有行到中，首个空格前的字符是mapper的key，行的其余部分则是mapper的值。

### Hadoop中InputSplit是什么？

InputSplit是指分片，在MapReduce作业中，作为map task最小输入单位。分片是基于文件基础上出来的概念，通俗的理解一个文件可以切分为多少个片段，每个片段包括了<文件名，开始位置，长度，位于哪些主机>等信息。在    MapTask    拿到这些分片后，会知道从哪开始读取数据。

### Hadoop框架中文件拆分是如何被触发的？

通过运行输入格式类中的getInputSplit()方法。

### 考虑一种情况：Map/Reduce系统中，HDFS块大小是64MB,输入格式FileInputFormat,有三个文件64K,65MB,127MB,那么有hadoop框架会将输入划分成多少？

hadoop将会做5个拆分，64K文件拆分1个，65MB文件拆分2个，127MB文件拆分2个。

### hadoop中的RecordReader的目的是什么？

1. 以怎样的方式从分片中读取一条记录，每读取一条记录都会调用RecordReader类；

2. 系统默认的RecordReader是LineRecordReader，如TextInputFormat；而SequenceFileInputFormat的RecordReader是SequenceFileRecordReader；

3. LineRecordReader是用每行的偏移量作为map的key，每行的内容作为map的value；

4. 应用场景：自定义读取每一条记录的方式；自定义读入key的类型，如希望读取的key是文件的路径或名字而不是该行在文件中的偏移量。 系统默认的LineRecordReader是按照每行的偏移量做为map输出时的key值，每行的内容作为map的value值，默认的分隔符是 回车和换行。 现在要更改map对应的输入的值，key对应的文件的路径（或者是文件名），value对应的是文件的内容 （content）。 那么我们需要重写InputFormat和RecordReader，因为RecordReader是在InputFormat中调用的，当然重写RecordReader才是重点！

### 如果hadoop中没有定义定制分区，那么如何在输出到reduce前执行数据分区？

默认的分区器为各个键计算一个哈希值，并分配给基于这个结果的分区。

### 什么是Combiner?举个例子，什么时候使用combiner,什么时候不用？

当map生成的数据过大时，带宽就成了瓶颈，怎样精简压缩传给Reduce的数据，有不影响最终的结果呢。有一种方法就是使 用 Combiner，Combiner号称本地的Reduce，Reduce最终的输入，是Combiner的输出 Combiner的作用是把一个map产生的多个合并成一个新的,然后再将新的作为reduce的输入； 在map函数与reduce函数之间多了一个combine函数，目的是为了减少map输出的中间结果，这样减少了reduce复制map输出的数据，减少网络 传输负载； 并不是所有情况下都能使用Combiner，Combiner适用于对记录汇总的场景（如求和），但是，求平均数的场景就不能使用Combiner了。如果可以 使用Combiner，一般情况下，和我们的reduce函数是一致的。

### 什么是jobtracker? jobtracker有哪些特别的函数？

JobTracker是整个MapReduce计算框架中的主服务，相当于集群的“管理者”，负责整个集群的作业控制和资源管理；main（）函数

### 什么是tasktracker?

TaskTracker是JobTracker和Task之间的桥梁：一方面，从JobTracker接收并执行各种命令：运行任务、提交任务、杀死任务 等；另一方面，将本地节点上各个任务的状态通过心跳周期性汇报给JobTracker。TaskTracker与JobTracker和Task之间采用了 RPC协议进行通信。

### hadoop中job和task之间是什么关系？

- 概述：

   Hadoop MapReduce采用Master/Slave结构。

   - Master：是整个集群的唯一的全局管理者，功能包括：作业管理、状态监控和任务调度等，即MapReduce中的JobTracker。

   - Slave：负责任务的执行和任务状态的回报，即MapReduce中的TaskTracker。

- JobTracker剖析：

   - 概述：JobTracker是一个后台服务进程，启动之后，会一直监听并接收来自各个TaskTracker发送的心跳信息，包括资源使用 情况和任务运行情况等信息。

   - JobTracker的主要功能：

     1. 作业控制：在hadoop中每个应用程序被表示成一个作业，每个作业又被分成多个任务，JobTracker的作业控制模块则负责作业 的分解和状态监控。

      最重要的是状态监控：主要包括TaskTracker状态监控、作业状态监控和任务状态监控。主要作用：容错和为任务调度提供决 策依据。

     2. 资源管理。

- TaskTracker剖析：

   - TaskTracker概述：TaskTracker是JobTracker和Task之间的桥梁：一方面，从JobTracker接收并执行各种命令：运行任务、提交 任务、杀死任务等；另一方面，将本地节点上各个任务的状态通过心跳周期性汇报给JobTracker。TaskTracker与JobTracker和 Task之间采用了RPC协议进行通信。

   - TaskTracker的功能：

     1. 汇报心跳：Tracker周期性将所有节点上各种信息通过心跳机制汇报给JobTracker。这些信息包括两部分：

        - 机器级别信息：节点健康情况、资源使用情况等。

        - 任务级别信息：任务执行进度、任务运行状态等。

     2. 执行命令：JobTracker会给TaskTracker下达各种命令，主要包括：启动任务(LaunchTaskAction)、提交任务 (CommitTaskAction)、杀死任务(KillTaskAction)、杀死作业(KillJobAction)和重新初始化(TaskTrackerReinitAction)。

### 假设hadoop一个job产生了100个task， 并且其中的一个task失败了，hadoop会如何处理？

hadoop本身的一个设计理念就是在普通的pc硬件上构建高可靠性的系统，任何failed task都不会引起整个job的失败，因为所有失败的任务都会被重新执行（reschedule     execution），只有当重新执行的次数超过4次，才会把这任务标记为失败，导致整个job的失败。

### 通过划分多个节点上任务，hadoop实现了并行处理，对少数慢节点可能会限制剩下其他程序的速率，并拖慢了整个程序。hadoop提供了什么机制防止这种情况的发生？

speculative execution。举个简单的例子，如果某个job有2000个map task，已经完成了1999个，只剩下一个task由于硬件比较慢而成为拖尾任务，为了减少拖尾任务对整个job运行时间的影响，jobtracker会重新启动一个一模一样的duplicate task和原有的task并行的执行，这样有一个task执行成功，整个map过程就会结束。speculative execution(推测执行)只有个处理拖尾任务的优化策略，并不能提高系统的可靠性

### hadoop推测执行是如何实现的？

Hadoop会为该task启动备份任务，让speculative task与原始task同时处理一份数据，哪个先运行完，则将谁的结果作为最终结果，并且在 运行完成后Kill掉另外一个任务。

### Unix中使用命令行，如何查看hadoop集群中的所有运行的任务？或是kill掉任务？

jps

### 说明hadoop2.0的基本构成

 HDFS，MapReduce，YARN

### 相比于HDFS1.0，HDFS2.0最主要的改进在哪几个方面？

引入一个新的资源管理系统YARN；HDFS单点故障得以解决；Hadoop 2.0的最大变化出现在内核（HDFS、MapReduce和YARN）

### 试使用步骤1，步骤2，步骤3.……说明YARN中运行应用程序的基本流程

1. 用户向YARN中提交应用程序，其中包括ApplicationMaster程序、启动ApplicationMaster的命令、用户程序等。

2. ResourceManager为该应用程序分配第一个Container，并与对应的Node-Manager通信，要求它在这个Container中启动应用程序的 ApplicationMaster。

3. ApplicationMaster首先向ResourceManager注册，这样用户可以直接通过ResourceManage查看应用程序的运行状态，然后它将为各 个任务申请资源，并监控它的运 行状态，直到运行结束，即重复步骤4~7。

4. ApplicationMaster采用轮询的方式通过RPC协议向ResourceManager申请和领取资源。

5. 一旦ApplicationMaster申请到资源后，便与对应的NodeManager通信，要求它启动任务Task。

6. NodeManager为任务Task设置好运行环境（包括环境变量、JAR包、二进制程序等）后，将任务启动命令写到一个脚本中，并通过 运行该脚本启动任务Task。

7. 各个任务Task通过某个RPC协议向ApplicationMaster汇报自己的状态和进度，以让ApplicationMaster随时掌握各个任务的运行状 态，从而可以在任务失败时重新启动任务。 在应用程序运行过程中，用户可随时通过RPC向ApplicationMaster查询应用程序的当前运行状态。

8. 应用程序运行完成后，ApplicationMaster向ResourceManager注销并关闭自己。 

### 什么是MRAppMaster？

我们知道，在MRv1中，JobTracker存在诸多问题，包括存在单点故障，扩展受限等，为了解决这些问题，Apache对MRv1进行了改进，提 出了YARN，YARN将JobTracker中的作业控制和资源管理两个功能分开，分别由两个不同的进程处理，进而解决了原有JobTracker存在的问 题。经过架构调整之后，YARN已经完全不同于MRv1，它已经变成了一个资源管理平台，或者说应用程序管理框架。运行于YARN之上的计 算框架不只限于MapReduce一种，也可以是其他流行计算框架，比如流式计算、迭代式计算等类型的计算框架。为了将一个计算框架运行于 YARN之上，用户需要开发一个组件—ApplicationMaster。作为一个开始，YARN首先支持的计算框架是MapReduce，YARN为用户实现好了 MapReduce的ApplicationMaster，也就是本文要介绍了MRAppMaster。

### 相比于JobTracker，MRAppMaster有什么不同？

既然MRAppMaster是由JobTracker衍化而来的，那么是否将JobTracker的代码稍加修改，就变成了MRAppMaster呢，答案是否定的。事实 上，YARN仅重用了MRv1中的少许代码，基本可看做重写了MRAppMaster。

YARN采用了新的软件设计思想，包括对象服务化、事件驱动的异步编程模型的。作为YARN的一部分，MRAppMaster的实现也采用了这 些设计思想。

下面简要介绍一下MRAppMaster的实现细节： 

在正式介绍MRAppMaster之前，我们先回顾一下MRv1的实现。我们都知道，MRv1主要由两种服务组成，即：JobTracker和TaskTracker， 而在YARN中，TaskTracker已经由NodeManager代替，因此，我们在此重点分析JobTracker。JobTracker包含资源管理和作业控制两个功能， 在YARN中，作业管理由ResourceManager实现，因此，只剩下作业控制这一个功能（由MRAppMaster实现）。MRv1中每个作业由一个 JobInProgress控制，每个任务由一个TaskInProgress控制，由于每个任务可能有多个运行实例，因此，TaskInProgress实际管理了多个运行实 例Task Attempt，对于每个运行实例，可能运行了一个MapTask或者ReduceTask，另外，每个Map Task或者Reduce Task会通过RPC协议将状态 汇报给TaskTracker，再由TaskTracker进一步汇报给JobTracker 在MRAppMaster中，它只负责管理一个作业，包括该作业的资源申请、作业运行过程监控和作业容错等。MRAppMaster使用服务模型和 事件驱动的异步编程模型对JobInProgress和TaskInProgress进行了重写（分别对应JobImpl和TaskImpl），并让Map Task和Reduce Task（Map Task和Reduce Task重用了MRv1中的代码）直接通过RPC将信息汇报给MRAppMaster。此外，为了能够运行于YARN之上，MRAppMaster还要 与ResourceManager和NodeManager两个新的服务通信（用到两个新的RPC协议），以申请资源和启动任务，这些都使得MRAppMaster完全不同于JobTracker。

### 为什么会产生yarn,它解决了什么问题。有什么优势？

### job的运行流程

job的执行流程如下： dataInput- >split- >Mapper- >Combine- >(产出临时数据)-->Partition- >Sort- >Reducer- >最终数据

### hadoop生态圈中各种框架的运用场景

###  hive中的压缩格式RCFile.TextFile.SequenceFile各有什么区别，以上三种格式一样大的文件哪个占用空间大小

textfile(默认) 存储空间消耗比较大，并且压缩的text 无法分割和合并 查询的效率最低,可以直接存储，加载数据的速度最高 sequencefile 存储空间消耗最大,压缩的文件可以分割和合并 查询效率高，需要通过text文件转化来加载 rcfile 存储空间最小，查询的效率最高 ，需要通过text文件转化来加载，加载的速度最低

### hdfs的 client端，复制到第三个副本时宕机，hdfs怎么恢复下次写第三副本？block块信息是先写 dataNode还是先写nameNode？

### 在Hadoop HA集群中Zookeeper 的主要作用，以及启动和查看状态的命令？

### 哪个程序通常与namenode在一个节点启动

Jobtracker

hadoop的集群是基于master/slave模式，namenode和jobtracker属于master，datanode和tasktracker属于slave，master只有一个，而slave有多个
SecondaryNameNode内存需求和NameNode在一个数量级上，所以通常secondary NameNode（运行在单独的物理机器上）和NameNode运行在不同的机器上。
JobTracker对应于NameNode，TaskTracker对应于DataNode
DataNode和NameNode是针对HDFS数据存放来而言的，JobTracker和TaskTracker是对于MapReduce执行而言的

mapreduce中几个主要概念，mapreduce整体上可以分为这么几条执行线索：jobclient，JobTracker与TaskTracker。
(1)、JobClient会在用户端通过JobClient类将应用已经配置参数打包成jar文件存储到hdfs，
并把路径提交到Jobtracker,然后由JobTracker创建每一个Task（即MapTask和ReduceTask）并将它们分发到各个TaskTracker服务中去执行
(2)、JobTracker是一个master服务，软件启动之后JobTracker接收Job，负责调度Job的每一个子任务task运行于TaskTracker上，
并监控它们，如果发现有失败的task就重新运行它。一般应该把JobTracker部署在单独的机器上。
(3)、TaskTracker是运行在多个节点上的slaver服务。TaskTracker主动与JobTracker通信，接收作业，并负责直接执行每一个任务。
TaskTracker都需要运行在HDFS的DataNode上

### hive中的压缩格式RCFile、TextFile、SequenceFile各有什么区别？

**textfile** 文件存储就是正常的文本格式，将表中的数据在hdfs上 以文本的格式存储，下载后可以直接查看，也可以使用cat命令查看。

指定方式：

1. 默认无需指定
2. 显示指定stored as textfile
3. 显示指定 
   STORED AS INPUTFORMAT 
      'org.apache.hadoop.mapred.TextInputFormat' 
     OUTPUTFORMAT           'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'

优点弊端：

1. 行存储使用textfile存储文件默认每一行就是一条记录，
2. 可以使用任意的分隔符进行分割。
3. 但无压缩，所以造成存储空间大。可结合Gzip、Bzip2、Snappy等使用（系统自动检查，执行查询时自动解压），但使用这种方式，hive不会对数据进行切分，从而无法对数据进行并行操作。

**sequencefile** 在hdfs上将表中的数据以二进制格式编码，并且将数据压缩了，下载数据以后是二进制格式，不可以直接查看，无法可视化。  

指定方式：

1. stored as sequecefile
2. 或者显示指定：
   STORED AS INPUTFORMAT 
     'org.apache.hadoop.mapred.SequenceFileInputFormat' 
   OUTPUTFORMAT 
    'org.apache.hadoop.hive.ql.io.HiveSequenceFileOutputFormat'

优点弊端：

1. sequencefile存储格有压缩，存储空间小，有利于优化磁盘和I/O性能
2. 同时支持文件切割分片，提供了三种压缩方式：none,record,block（块级别压缩效率跟高）.默认是record(记录)

**rcfile** 在hdfs上将表中的数据以二进制格式编码，并且支持压缩。下载后的数据不可以直接可视化。

指定方式：

1. stored as rcfile 
2. 或者显示指定：
   STORED AS INPUTFORMAT 
     'org.apache.hadoop.hive.ql.io.RCFileInputFormat' 
   OUTPUTFORMAT 
     'org.apache.hadoop.hive.ql.io.RCFileOutputFormat'

优点弊端：

1. 行列混合的存储格式，基于列存储。
2. 因为基于列存储，列值重复多，所以压缩效率高。
3. 磁盘存储空间小，io小。

### NameNode与SecondaryNameNode的区别与联系？

### MapReduce出现单点负载多大，怎么负载平衡？

### MapReduce怎么实现Top10？

### 在hadoop开发过程中使用过哪些算法？其应用场景是什么？

### MapReduce程序如何发布？如果MapReduce中涉及到了第三方的jar 包，该如何处理？

### 在实际工作中使用过哪些集群的运维工具，请分别阐述其作用。

### fsimage和edit的区别？







### 比方:如今有10个文件夹, 每个文件夹都有1000000个url. 如今让你找出top1000000url。

方法一：
运用2个job，第一个job直接用filesystem读取10个文件夹作为map输入，url做key，reduce计算url的sum，
下一个job map用url作key，运用sum作二次排序，reduce中取top10000000

方法二：
建hive表A，挂分区channel，每个文件夹是一个分区.
select x.url,x.c from(select url,count(1) as c from A where channel ='' group by url) x order by x.c desc limit 1000000;

### 关于SecondaryNameNode哪项是正确的？

a)它是NameNode的热备 b)它对内存没有要求
c)它的目的是帮助NameNode合并编辑日志，减少NameNode启动时间
d)SecondaryNameNode应与NameNode部署到一个节点
答案C。

### Client 端上传文件的时候下列哪项正确

a)数据经过 NameNode 传递给 DataNode
b)Client端将文件切分为Block，依次上传
c)Client只上传数据到一台DataNode，然后由NameNode负责Block复制工作
答案：B
分析：
Client向NameNode发起文件写入的请求。NameNode根据文件大小和文件块配置情况，返回给Client它所管理部分DataNode的信息。
Client将文件划分为多个Block，根据DataNode的地址信息，按顺序写入到每一个DataNode块中。

### NameNode 负责管理 metadata，client 端每次读写请求，它都会从磁盘中读取或则会写入 metadata 信息并反馈 client 端。（错误）

分析：
NameNode 不需要从磁盘读取 metadata，所有数据都在内存中，硬盘上的只是序列化的结果，只有每次 namenode 启动的时候才会读取。
(1) 文件写入
Client向NameNode发起文件写入的请求。
NameNode根据文件大小和文件块配置情况，返回给Client它所管理部分DataNode的信息。
Client将文件划分为多个Block，根据DataNode的地址信息，按顺序写入到每一个DataNode块中。

(2) 文件读取
Client向NameNode发起文件读取的请求。
NameNode返回文件存储的DataNode的信息。
Client读取文件信息。

### NameNode 本地磁盘保存了 Block 的位置信息。（正确）

分析：
DataNode是文件存储的基本单元，它将Block存储在本地文件系统中，保存了Block的Meta-data，同时周期性地将所有存在的Block信息发送给NameNode。

### DataNode 通过长连接与 NameNode 保持通信。

这个有分歧，首先明确一下概念：
(1) 长连接
Client方与Server方先建立通讯连接，连接建立后不断开，然后再进行报文发送和接收。这种方式下由于通讯连接一直存在，此种方式常用于点对点通讯。

(2) 短连接
Client方与Server每进行一次报文收发交易时才进行通讯连接，交易完毕后立即断开连接。此种方式常用于一点对多点通讯，比如多个Client连接一个Server.

### Hadoop 自身具有严格的权限管理和安全措施保障集群正常运行。（错误）

hadoop只能阻止好人犯错，但是不能阻止坏人干坏事

### Slave 节点要存储数据，所以它的磁盘越大越好。（错误）

分析：
一旦Slave节点宕机，数据恢复是一个难题

### hadoop dfsadmin –report 命令用于检测 HDFS 损坏块。（错误）

分析：
hadoop dfsadmin -report
用这个命令可以快速定位出哪些节点down掉了，HDFS的容量以及使用了多少，以及每个节点的硬盘使用情况。

### Hadoop 默认调度器策略为 FIFO（正确）

### 集群内每个节点都应该配 RAID，这样避免单磁盘损坏，影响整个节点运行。（错误）

分析：
首先明白什么是RAID，可以参考百科磁盘阵列。这句话错误的地方在于太绝对，具体情况具体分析。题目不是重点，知识才是最重要的。因为hadoop本身就具有冗余能力，所以如果不是很严格不需要都配备RAID。具体参考第二题。

### 因为 HDFS 有多个副本，所以 NameNode 是不存在单点问题的。（错误）

分析：
NameNode存在单点问题。了解详细信息，可以参考
Hadoop中Namenode单点故障的解决方案及详细介绍AvatarNode

### Mapreduce 的 input split 就是一个 block。（错误 ）

InputFormat的数据划分、Split调度、数据读取三个问题的浅析​	

### DataNode 首次加入 cluster 的时候，如果 log 中报告不兼容文件版本，那需要NameNode执行“Hadoop namenode -format”操作格式化磁盘。（错误 ）

分析：
这个报错是说明DataNode所装的Hadoop版本和其它节点不一致，应该检查DataNode的Hadoop版本

### hive如何调优？

### hive如何权限控制？

### hbase写数据的原理是什么？

### hive能像关系数据库那样，建多个库吗？

### hbase宕机如何处理？

### hive实现统计的查询语句是什么？

### 生产环境中为什么建议使用外部表？

### hadoop mapreduce创建类DataWritable的作用是什么？

### 为什么创建类DataWritable？

### 用mapreduce实现sql语句select count(x) from a group by b？

### sqoop在导入数据到mysql时，如何让数据不重复导入？如果存在数据问题sqoop如何处理？

### 描述一下hadoop中，有哪些地方使用了缓存机制，作用分别是什么？

### 用mapreduce怎么处理数据倾斜问题？

map /reduce程序执行时，reduce节点大部分执行完毕，但是有一个或者几个reduce节点运行很慢，导致整个程序的处理时间很长，这是因为某一个key的条数比其他key多很多（有时是百倍或者千倍之多），这条key所在的reduce节点所处理的数据量比其他节点就大很多，从而导致某几个节点迟迟运行不完，此称之为数据倾斜。

用hadoop程序进行数据关联时，常碰到数据倾斜的情况，这里提供一种解决方法。

(1)设置一个hash份数N，用来对条数众多的key进行打散。

(2)对有多条重复key的那份数据进行处理：从1到N将数字加在key后面作为新key，如果需要和另一份数据关联的话，则要重写比较类和分发类（方法如上篇[《hadoop job解决大数据量关联的一种方法》](https://www.baidu.com/s?wd=%E3%80%8Ahadoop%C2%A0job%E8%A7%A3%E5%86%B3%E5%A4%A7%E6%95%B0%E6%8D%AE%E9%87%8F%E5%85%B3%E8%81%94%E7%9A%84%E4%B8%80%E7%A7%8D%E6%96%B9%E6%B3%95%E3%80%8B&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)）。如此实现多条key的平均分发。

int iNum = iNum % iHashNum;

String strKey = key + CTRLC + String.valueOf(iNum) + CTRLB + “B”;


（3）上一步之后，key被平均分散到很多不同的reduce节点。如果需要和其他数据关联，为了保证每个reduce节点上都有关联的key，对另一份单一key的数据进行处理：循环的从1到N将数字加在key后面作为新key

for(int i = 0; i < iHashNum; ++i){

String strKey =key + CTRLC + String.valueOf(i) ;

output.collect(new Text(strKey), new Text(strValues));}

以此解决数据倾斜的问题，经试验大大减少了程序的运行时间。但此方法会成倍的增加其中一份数据的数据量，以增加shuffle数据量为代价，所以使用此方法时，要多次试验，取一个最佳的hash份数值。

======================================

用上述的方法虽然可以解决数据倾斜，但是当关联的数据量巨大时，如果成倍的增长某份数据，会导致reduce shuffle的数据量变的巨大，得不偿失，从而无法解决运行时间慢的问题。

有一个新的办法可以解决 成倍增长数据 的缺陷：

在两份数据中找共同点，比如两份数据里除了关联的字段以外，还有另外相同含义的字段，如果这个字段在所有log中的重复率比较小，则可以用这个字段作为计算hash的值，如果是数字，可以用来模hash的份数，如果是字符可以用hashcode来模hash的份数（当然数字为了避免落到同一个reduce上的数据过多，也可以用hashcode），这样如果这个字段的值分布足够平均的话，就可以解决上述的问题。-




\48. 毒酒问题－－－1000桶酒，其中1桶有毒，而一旦吃了，毒性会在一周后发作。问最少需要多少只 老鼠可在一周内找出毒酒？

\49. 用栈实现队列？

\50. 链表倒序实现？
