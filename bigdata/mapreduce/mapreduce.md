## MapReduce

### 四种常见的MapReduce设计模式

整个MapReduce作业的阶段主要可以分为以下四种：
　　1、Input-Map-Reduce-Output

　　2、Input-Map-Output

　　3、Input-Multiple Maps-Reduce-Output

　　4、Input-Map-Combiner-Reduce-Output

**Input-Map-Reduce-Output**

如果我们需要做一些聚合操作(aggregation)，我们就需要使用这种模式。

| 场景            | 计算各性别员工薪水平均值                     |
| --------------- | -------------------------------------------- |
| Map(Key, Value) | Key: Gender Value: Their Salary              |
| Reduce          | 对Gender进行Group by，并计算每种性别的总薪水 |

**Input-Map-Output**

如果我们仅仅想改变输入数据的格式，这时候我们可以使用这种模式。

| 场景            | 对性别进行处理                                               |
| --------------- | ------------------------------------------------------------ |
| Map(Key, Value) | Key : Employee Id Value : Gender -> if Gender is Female/ F/ f/ 0 then converted to F else if Gender is Male/M/m/1 then convert to M |

 **Input-Multiple Maps-Reduce-Output**

```
Input1➜Map1➘
                            Reduce➜Output
Input2➜Map2➚
```

在这种设计模式中，我们有两个输入文件，其文件的格式都不一样，
文件一的格式是性别作为名字的前缀，比如：Ms. Shital Katkar或Mr. Krishna Katkar
文件二的格式是性别的格式是固定的，但是其位置不固定，比如 Female/Male, 0/1, F/M

| 场景            | 对性别进行处理                                               |
| --------------- | ------------------------------------------------------------ |
| Map(Key, Value) | **Map 1 (For input 1)**：我们需要将性别从名字中分割出来，然后根据前缀来确定性别，然后得到 (Gender,Salary)键值对； **Map 2 (For input 2)**：这种情况程序编写比较直接，处理固定格式的性别，然后得到(Gender,Salary)键值对。 |
| Reduce          | 对Gender进行Group by，并计算每种性别的总薪水                 |

**Input-Map-Combiner-Reduce-Output**

在MapReduce中，Combiner也被成为Reduce，其接收Map端的输出作为其输入，并且将输出的 key-value 键值对作为Reduce的输入。Combiner的使用目的是为了减少数据传入到Reduce的负载。



### MapReduce作业的map task和reduce task调度参数

MapReduce作业可以细分为map task和reduce task，而MRAppMaster又将map task和reduce task分为四种状态：

　　1、pending：刚启动但尚未向resourcemanager发送资源请求；

　　2、scheduled：已经向resourceManager发送资源请求，但尚未分配到资源；

　　3、assigned：已经分配到了资源且正在运行；

　　4、completed：已经运行完成。

　　map task的生命周期为：scheduled -> assigned -> completed
　　reduce task 生命周期：pending -> scheduled -> assigned -> completed。

`mapreduce.job.reduce.slowstart.completedmaps`：当map task完成的比例达到该值后才会为reduce task申请资源，默认是0.05。

`yarn.app.mapreduce.am.job.reduce.rampup.limit`：在map task完成之前，最多启动reduce task比例，默认是0.5

`yarn.app.mapreduce.am.job.reduce.preemption.limit`：当map task需要资源但暂时无法获取资源（比如reduce task运行过程中，部分map task因结果丢失需重算）时，为了保证至少一个map task可以得到资源，最多可以抢占reduce task比例，默认是0.5。



### 使用lzo压缩文件作为输入文件

 对于Mapreduce程序，我们需要把程序中所有的TextInputFormat修改为LzoTextInputFormat，如下：

```
job.setInputFormatClass(TextInputFormat.class);
修改为
job.setInputFormatClass(LzoTextInputFormat.class);
```

LzoTextInputFormat类需要引入相应的包，如果你是使用pom文件，可以引入以下依赖：

```
<dependency>
            <groupId>com.hadoop.gplcompression</groupId>
            <artifactId>hadoop-lzo</artifactId>
            <version>0.4.19</version>
</dependency>
```

对于Hive，需要在建表的时候注意，如下：

```
hive> create table lzo(
    > id int,
    > name string)
    > STORED AS INPUTFORMAT 'com.hadoop.mapred.DeprecatedLzoTextInputFormat'
    > OUTPUTFORMAT 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat';
```

### 三种方法实现Hadoop(MapReduce)全局排序

1. 使用一个Reduce进行排序
2. 自定义分区函数实现全局有序
3. 使用TotalOrderPartitioner进行全排序

**数据抽样**：

寻找合适的Key分割点需要我们对数据的分布有个大概的了解；如果数据量很大的话，我们不可能对所有的数据进行分析然后选出 `N-1` （N代表Reduce的个数）个分割点，最适合的方式是对数据进行抽样，然后对抽样的数据进行分析并选出合适的分割点。Hadoop提供了三种抽样的方法：

- *SplitSampler*：从s个split中选取前n条记录取样
- *RandomSampler*：随机取样
- *IntervalSampler*：从s个split里面按照一定间隔取样，通常适用于有序数据

这三个抽样都实现了`K[] getSample(InputFormat inf, Job job) throws IOException, InterruptedException;` 方法；通过调用这个方法我们可以返回抽样到的Key数组，除了 `IntervalSampler` 类返回的抽样Key是有序的，其他都无序。获取到采样好的Key数组之后，需要对其进行排序，然后选择好`N-1` （N代表Reduce的个数）个分割点，最后将这些Key分割点存储到指定的HDFS文件中，存储的文件格式是SequenceFile。

**TotalOrderPartitioner**

上面通过 `InputSampler.writePartitionFile(job, sampler)` 存储好了分割点，然后 `TotalOrderPartitioner` 类会在 `setConf` 函数中读取这个文件，并根据Key的类型分别创建不同的数据结构：

- 如果 Key 的类型是BinaryComparable（BytesWritable和Text）`mapreduce.totalorderpartitioner.naturalorder`

   属性的指是true，则会构建trie 树，便于后面的查找；

- 其他情况会构建一个 `BinarySearchNode`，用二分查找

**注意事项**

1、我们这里使用的 `InputFormat` 类是 `KeyValueTextInputFormat` ，而不是 `TextInputFormat` 。因为采样是对Key进行的，而 `TextInputFormat` 的 Key 是偏移量，这样的采样结果是无意义的；而如果使用 `KeyValueTextInputFormat` 作为输入类型，则可以将数据存放在 Key 中，从而得到正确的采样结果。

2、我们 map 输出 Key 的类型是 `Text` ，这是没办法的，因为 `InputSampler.writePartitionFile` 函数实现的原因，必须要求 map 输入和输出 Key 的类型一致，否则会出现异常。

### Mapper数目设置

split大小计算：

    Math.max(minSize , Math.min( maxSize, blockSize))
    minSize：max（1，split_minSize(默认为1)）
    maxSize：split_maxSize, 默认为Long的最大值
    blockSize：默认128m

需设置mapper数目为20时，splitSize=fileSize/20
​     当splitSize>128m时，设置minSize=splitSize     FileInputFormat.setMinInputSplitSize
​     当splitSize<128m时，设置maxSize=splitSize     FileInputFormat.setMaxInputSplitSize

>  [设置Mapper数量与各节点container数量](https://blog.csdn.net/ukakasu/article/details/80017638)

## Hive

### Hive中Reduce个数是如何计算的

> https://www.iteblog.com/archives/1697.html

### 简单查询不启用Mapreduce job而启用Fetch task

从Hive0.10.0版本开始，对于简单的不需要聚合的类似`SELECT <col> from <table> LIMIT n`语句，不需要起MapReduce job，直接通过Fetch task获取数据：

```
hive> set hive.fetch.task.conversion=more;
```



## Spark

### Spark和Hadoop作业之间的区别

熟悉Hadoop的人应该都知道，用户先编写好一个程序，我们称为Mapreduce程序，一个Mapreduce程序就是一个Job，而一个Job里面可以有一个或多个Task，Task又可以区分为Map Task和Reduce Task.

而在Spark中，也有Job概念，但是这里的Job和Mapreduce中的Job不一样，它不是作业的最高级别的粒度，在它只上还有Application的概念。我们先来看看Spark文档是怎么定义Application，Task ，Job和Stage的：

```
Application：User program built on Spark. Consists of a driver program and executors on the cluster.
Task：A unit of work that will be sent to one executor
Job：A parallel computation consisting of multiple tasks that gets spawned in response to a Spark action (e.g. save, collect); you'll see this term used in the driver's logs.
Stage：Each job gets divided into smaller sets of tasks called stages that depend on each other (similar to the map and reduce stages in MapReduce); you'll see this term used in the driver's logs.
```

　　一个Application和一个SparkContext相关联，每个Application中可以有一个或多个Job，可以并行或者串行运行Job。Spark中的一个Action可以触发一个Job的运行。在Job里面又包含了多个Stage，Stage是以Shuffle进行划分的。在Stage中又包含了多个Task，多个Task构成了Task Set。他们之间的关系如下图所示：

　　Mapreduce中的每个Task分别在自己的进程中运行，当该Task运行完的时候，该进程也就结束了。和Mapreduce不一样的是，Spark中多个Task可以运行在一个进程里面，而且这个进程的生命周期和Application一样，即使没有Job在运行。
　　这个模型有什么好处呢？可以加快Spark的运行速度！Tasks可以快速地启动，并且处理内存中的数据。但是这个模型有的缺点就是粗粒度的资源管理，每个Application拥有固定数量的executor和固定数量的内存。

## Hadoop

### HDFS 块和 Input Splits 的区别与联系

当我们往 HDFS 写文件时，HDFS 会将文件切割成大小为 128MB 的块，切割的时候不会判断文件里面存储的到底是什么东西，所以逻辑上属于一行的数据会被切割成两部分，这两部分的数据被物理的存放在两个不同的 HDFS 块中。

可以看出，每个 FileSplit 的起始偏移量和上面 HDFS 每个文件块一致。但是具体读数据的时候，MapReduce 是如何处理的呢？我们现在已经知道，在将文件存储在 HDFS 的时候，文件被切割成一个一个 HDFS Block，其中会导致一些逻辑上属于一行的数据会被切割成两部分，那 `TextInputFormat` 遇到这样的数据是如何处理的呢？

对于这种情况，`TextInputFormat` 会做出如下两种操作：

- 在初始化 `LineRecordReader` 的时候，如果 `FileSplit` 的起始位置 `start` 不等于0， 说明这个 Block 块不是第一个 Block，这时候一律丢掉这个 Block 的第一行数据。
- 在读取每个 Block 的时候，都会额外地多读取一行，如果出现数据被切割到另外一个 Block 里面，这些数据能够被这个任务读取。

从上面的分析可以得出以下的总结

- Split 和 HDFS Block 是一对多的关系；
- HDFS block 是数据的物理表示，而 Split 是 block 中数据的逻辑表示；
- 满足数据本地性的情况下，程序也会从远程节点上读取少量的数据，因为存在行被切割到不同的 Block 上。

### hdfs  fsck


### 指定JDK版本

**spark**推荐使用的是 `spark.executorEnv.JAVA_HOME` 和 `spark.yarn.appMasterEnv.JAVA_HOME`，这分别为 Spark 的 Executor 和 Driver 指定 JDK 路径，如下：

```
$SPARK_HOME/bin/spark-submit --master yarn-cluster  \
        --executor-memory 8g \
        --num-executors 80 \
        --queue iteblog \
        --conf "spark.yarn.appMasterEnv.JAVA_HOME=/home/iteblog/java/jdk1.8.0_25" \
        --conf "spark.executorEnv.JAVA_HOME=/home/iteblog/java/jdk1.8.0_25" \
        --executor-cores 1 \
        --class com.iteblog.UserActionParser /home/iteblog/spark/IteblogAction-1.0-SNAPSHOT.jar
```

我们可以通过 **MapReduce** 程序里面的 `Configuration` 设置，如下：

```
conf.set("mapred.child.env", "JAVA_HOME=/home/iteblog/java/jdk1.8.0_25");
conf.set("yarn.app.mapreduce.am.env", "JAVA_HOME=/home/iteblog/java/jdk1.8.0_25");
```

