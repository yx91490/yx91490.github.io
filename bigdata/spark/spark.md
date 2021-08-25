# Spark

## 应用提交

Master URL有效格式：

| Master URL                      | 含义                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| local                           | 使用单线程本地运行Spark                                      |
| local[K]                        | 使用K个线程本地运行Spark                                     |
| local[K,F]                      | 本地运行Spark，使用K个线程，最多允许F个线程失败              |
| local[*]                        | 使用与机器逻辑核心数相同的线程数本地运行Spark                |
| local[*,F]                      | 本地运行Spark，使用与机器逻辑核心数相同的线程数，最多允许F个线程失败 |
| spark://HOST:PORT               | 连接到Spark 独立集群的master节点                             |
| spark://HOST1:PORT1,HOST2:PORT2 | 连接到有备用master的spark独立集群，连接列表必须包含用zookeeper搭建的高可用集群中的所有master地址，端口号默认为7077 |
| mesos://HOST:PORT               | 连接到mesos集群，端口号默认为5050。对于使用zk的mesos集群，使用mesos://zk://格式的URL。使用`--deploy-mode cluster`提交的话，HOST:PORT应该配置成连接到MesosClusterDispatcher |
| yarn                            | 根据`--deploy-mode`的值不同以client或者cluster模式连接到一个YARN集群，集群地址来源于`HADOOP_CONF_DIR`或者`YARN_CONF_DIR`变量 |
| k8s://HOST:PORT                 | 以cluster模式连接到一个kubernetes集群，未来会支持client模式。HOST 和 PORT 参考 [Kubernetes API Server](https://kubernetes.io/docs/reference/generated/kube-apiserver/). 默认使用TLS连接。为了强制使用不安全的连接，可以使用格式：k8s://http://HOST:PORT. |

参考：[Master URLs](https://spark.apache.org/docs/2.4.0/submitting-applications.html#master-urls)

## RDD编程

#### 窄依赖和宽依赖

![spark_deps](./spark.assets/spark_deps.png)

每个 Transformation 操作都会生成一个新的 RDD，RDD 和它依赖的父 RDD（s）的关系有两种不同的类型，即窄依赖和宽依赖：

- 窄依赖指的是子 RDD 只依赖于父 RDD 中一个固定数量的分区
- 宽依赖指的是子 RDD 的每一个分区都依赖于父 RDD 的所有分区

Spark 会将每一个 Job 分为多个不同的 Stage, 而 Stage 之间的依赖关系则形成了有向无环图。

Spark 会根据 RDD 之间的依赖关系将 DAG 图划分为不同的阶段。

对于窄依赖，由于 Partition 依赖关系的确定性，Partition 的转换处理就可以在同一个线程里完成，窄依赖就被 Spark 划分到同一个 stage 中。

而对于宽依赖，只能等父RDD shuffle 处理完成后，下一个 stage 才能开始接下来的计算。

#### 划分Stage过程

- 首先根据rdd的算子操作顺序生成DAG有向无环图，接下里从最后一个rdd往前推，创建一个新的stage，把该rdd加入到该stage中，它是最后一个stage。
- 在往前推的过程中运行遇到了窄依赖就把该rdd加入到本stage中，如果遇到了宽依赖，就从宽依赖切开，那么最后一个stage也就结束了。
- 重新创建一个新的stage，按照第二个步骤继续往前推，一直到最开始的rdd，整个划分stage也就结束了

#### 设置并行度

// TODO

### Transformations

| Transformation                                               | Meaning                                                      |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| **map**(*func*)                                              | Return a new distributed dataset formed by passing each element of the source through a function *func*. |
| **filter**(*func*)                                           | Return a new dataset formed by selecting those elements of the source on which *func* returns true. |
| **flatMap**(*func*)                                          | Similar to map, but each input item can be mapped to 0 or more output items (so *func* should return a Seq rather than a single item). |
| **mapPartitions**(*func*)                                    | Similar to map, but runs separately on each partition (block) of the RDD, so *func* must be of type Iterator<T> => Iterator<U> when running on an RDD of type T. |
| **mapPartitionsWithIndex**(*func*)                           | Similar to mapPartitions, but also provides *func* with an integer value representing the index of the partition, so *func* must be of type (Int, Iterator<T>) => Iterator<U> when running on an RDD of type T. |
| **sample**(*withReplacement*, *fraction*, *seed*)            | Sample a fraction *fraction* of the data, with or without replacement, using a given random number generator seed. |
| **union**(*otherDataset*)                                    | Return a new dataset that contains the union of the elements in the source dataset and the argument. |
| **intersection**(*otherDataset*)                             | Return a new RDD that contains the intersection of elements in the source dataset and the argument. |
| **distinct**([*numPartitions*]))                             | Return a new dataset that contains the distinct elements of the source dataset. |
| **groupByKey**([*numPartitions*])                            | When called on a dataset of (K, V) pairs, returns a dataset of (K, Iterable<V>) pairs. **Note:** If you are grouping in order to perform an aggregation (such as a sum or average) over each key, using `reduceByKey` or `aggregateByKey` will yield much better performance. **Note:** By default, the level of parallelism in the output depends on the number of partitions of the parent RDD. You can pass an optional `numPartitions` argument to set a different number of tasks. |
| **reduceByKey**(*func*, [*numPartitions*])                   | When called on a dataset of (K, V) pairs, returns a dataset of (K, V) pairs where the values for each key are aggregated using the given reduce function *func*, which must be of type (V,V) => V. Like in `groupByKey`, the number of reduce tasks is configurable through an optional second argument. |
| **aggregateByKey**(*zeroValue*)(*seqOp*, *combOp*, [*numPartitions*]) | When called on a dataset of (K, V) pairs, returns a dataset of (K, U) pairs where the values for each key are aggregated using the given combine functions and a neutral "zero" value. Allows an aggregated value type that is different than the input value type, while avoiding unnecessary allocations. Like in `groupByKey`, the number of reduce tasks is configurable through an optional second argument. |
| **sortByKey**([*ascending*], [*numPartitions*])              | When called on a dataset of (K, V) pairs where K implements Ordered, returns a dataset of (K, V) pairs sorted by keys in ascending or descending order, as specified in the boolean `ascending` argument. |
| **join**(*otherDataset*, [*numPartitions*])                  | When called on datasets of type (K, V) and (K, W), returns a dataset of (K, (V, W)) pairs with all pairs of elements for each key. Outer joins are supported through `leftOuterJoin`, `rightOuterJoin`, and `fullOuterJoin`. |
| **cogroup**(*otherDataset*, [*numPartitions*])               | When called on datasets of type (K, V) and (K, W), returns a dataset of (K, (Iterable<V>, Iterable<W>)) tuples. This operation is also called `groupWith`. |
| **cartesian**(*otherDataset*)                                | When called on datasets of types T and U, returns a dataset of (T, U) pairs (all pairs of elements). |
| **pipe**(*command*, *[envVars]*)                             | Pipe each partition of the RDD through a shell command, e.g. a Perl or bash script. RDD elements are written to the process's stdin and lines output to its stdout are returned as an RDD of strings. |
| **coalesce**(*numPartitions*)                                | Decrease the number of partitions in the RDD to numPartitions. Useful for running operations more efficiently after filtering down a large dataset. |
| **repartition**(*numPartitions*)                             | Reshuffle the data in the RDD randomly to create either more or fewer partitions and balance it across them. This always shuffles all data over the network. |
| **repartitionAndSortWithinPartitions**(*partitioner*)        | Repartition the RDD according to the given partitioner and, within each resulting partition, sort records by their keys. This is more efficient than calling `repartition` and then sorting within each partition because it can push the sorting down into the shuffle machinery. |

其中shuffle算子包括：repartition操作如repartition 和 coalesce，ByKey操作（除了countByKey）如groupByKey 和 reduceByKey，join操作如cogroup 和 join。

### Actions

| Action                                             | Meaning                                                      |
| :------------------------------------------------- | :----------------------------------------------------------- |
| **reduce**(*func*)                                 | Aggregate the elements of the dataset using a function *func* (which takes two arguments and returns one). The function should be commutative and associative so that it can be computed correctly in parallel. |
| **collect**()                                      | Return all the elements of the dataset as an array at the driver program. This is usually useful after a filter or other operation that returns a sufficiently small subset of the data. |
| **count**()                                        | Return the number of elements in the dataset.                |
| **first**()                                        | Return the first element of the dataset (similar to take(1)). |
| **take**(*n*)                                      | Return an array with the first *n* elements of the dataset.  |
| **takeSample**(*withReplacement*, *num*, [*seed*]) | Return an array with a random sample of *num* elements of the dataset, with or without replacement, optionally pre-specifying a random number generator seed. |
| **takeOrdered**(*n*, *[ordering]*)                 | Return the first *n* elements of the RDD using either their natural order or a custom comparator. |
| **saveAsTextFile**(*path*)                         | Write the elements of the dataset as a text file (or set of text files) in a given directory in the local filesystem, HDFS or any other Hadoop-supported file system. Spark will call toString on each element to convert it to a line of text in the file. |
| **saveAsSequenceFile**(*path*) (Java and Scala)    | Write the elements of the dataset as a Hadoop SequenceFile in a given path in the local filesystem, HDFS or any other Hadoop-supported file system. This is available on RDDs of key-value pairs that implement Hadoop's Writable interface. In Scala, it is also available on types that are implicitly convertible to Writable (Spark includes conversions for basic types like Int, Double, String, etc). |
| **saveAsObjectFile**(*path*) (Java and Scala)      | Write the elements of the dataset in a simple format using Java serialization, which can then be loaded using `SparkContext.objectFile()`. |
| **countByKey**()                                   | Only available on RDDs of type (K, V). Returns a hashmap of (K, Int) pairs with the count of each key. |
| **foreach**(*func*)                                | Run a function *func* on each element of the dataset. This is usually done for side effects such as updating an [Accumulator](https://spark.apache.org/docs/2.4.0/rdd-programming-guide.html#accumulators) or interacting with external storage systems. **Note**: modifying variables other than Accumulators outside of the `foreach()` may result in undefined behavior. See [Understanding closures ](https://spark.apache.org/docs/2.4.0/rdd-programming-guide.html#understanding-closures-a-nameclosureslinka)for more details. |

### 参考

[Transformations](https://spark.apache.org/docs/2.4.0/rdd-programming-guide.html#transformations)

[Actions](https://spark.apache.org/docs/2.4.0/rdd-programming-guide.html#actions)

[Wide and Narrow dependencies in Apache Spark](https://medium.com/@dvcanton/wide-and-narrow-dependencies-in-apache-spark-21acf2faf031)

[Spark中的narrow/wide dependency如何理解，有什么作用?](https://www.zhihu.com/question/37137360)

[Job 逻辑执行图](https://github.com/JerryLead/SparkInternals/blob/master/markdown/2-JobLogicalPlan.md)

[Spark性能调优：合理设置并行度](https://whiteding.fun/2020/05/26/Spark%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98%EF%BC%9A%E5%90%88%E7%90%86%E8%AE%BE%E7%BD%AE%E5%B9%B6%E8%A1%8C%E5%BA%A6/)

## 配置

| 属性名                    | 默认值                                                       | 含义                                     |
| ------------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| spark.default.parallelism | 对于像是`reduceByKey`、 `join`的分布式shuffle操作，取值为父RDD最大的分区数，对于像`parallelize`这样的没有父RDD的操作，它依赖于cluster manager：<br />Local模式：本机的核数<br />Mesos fine grained mode: 8<br />其他：2和所有executor节点核数的最大值 | RDD中transformations算子默认返回的分区数 |
|                           |                                                              |                                          |
|                           |                                                              |                                          |
|                           |                                                              |                                          |

### 参考

[Spark Configuration](https://spark.apache.org/docs/2.4.0/configuration.html#execution-behavior)

[通过spark.default.parallelism谈Spark并行度](https://zhuanlan.zhihu.com/p/97700916)

## 代码示例

### 参考

[examples](https://github.com/apache/spark/tree/master/examples/src/main/scala/org/apache/spark/examples)

## 源码编译

```shell
./dev/make-distribution.sh --name 2.6.0 --tgz  -Pyarn -Phadoop-2.6 -Phive -Phive-thriftserver -Dhadoop.version=2.6.0 -X
```

spark-shell测试：

```Scala
sqlContext.sql("select * from ods.tab1").show();
```

spark2-shell测试：

```scala
spark.sql("select * from ods.tab1").show();
```

## 性能调优

增加executor数 => 增加并行执行的能力

增加每个executor的cpu core数 => 增加并行执行的能力

增加每个executor的内存量：

- 如果需要对RDD进行缓存 => 可以缓存更多数据 => 减少磁盘IO
- 对于shuffle操作，reducer需要内存存放数据和聚合 => 减少磁盘IO
- 减少Task的GC时间

并行度：Spark作业中各个stage的task数量：

- 至少设置成与Spark application的总cpu core数量相同
- 官方是推荐设置成spark application总cpu core数量的2~3倍（尽量让cpu core不要空闲，同时也是尽量提升spark作业运行的效率和速度，提升性能。）

如何设置一个Spark Application的并行度？

设置`spark.default.parallelism`。

#### RDD持久化

尽量去复用RDD。

公共RDD一定要实现持久化：即将RDD的数据缓存到内存中/磁盘中，（BlockManager），以后无论对这个RDD做多少次计算，那么都是直接取这个RDD的持久化的数据，比如从内存中或者磁盘中，直接提取一份数据。

将RDD序列化后可以大大减少内存的空间占用，序列化的唯一的缺点就是在获取数据的时候需要反序列化。

在内存资源极度充足的情况下为了数据的高可靠性，可以使用双副本机制进行持久化。

| 存储级别                              | 意义                                                         |
| :------------------------------------ | :----------------------------------------------------------- |
| MEMORY_ONLY                           | 将 RDD 作为反序列化的 Java 对象存储在 JVM 中。如果 RDD 不适合内存，某些分区将不会被缓存，并且会在每次需要时重新计算。这是默认级别。 |
| MEMORY_AND_DISK                       | 将 RDD 作为反序列化的 Java 对象存储在 JVM 中。如果 RDD 不适合内存，则存储不适合磁盘的分区，并在需要时从那里读取它们。 |
| MEMORY_ONLY_SER （Java 和 Scala）     | 将 RDD 存储为*序列化的*Java 对象（每个分区一个字节数组）。这通常比反序列化对象更节省空间，尤其是在使用[快速序列化器时](https://spark.apache.org/docs/2.4.0/tuning.html)，但读取时更占用 CPU。 |
| MEMORY_AND_DISK_SER （Java 和 Scala） | 与 MEMORY_ONLY_SER 类似，但将不适合内存的分区溢出到磁盘，而不是在每次需要时即时重新计算它们。 |
| DISK_ONLY                             | 仅将 RDD 分区存储在磁盘上。                                  |
| MEMORY_ONLY_2、MEMORY_AND_DISK_2 等   | 与上述级别相同，但在两个集群节点上复制每个分区。             |
| OFF_HEAP（实验性）                    | 与 MEMORY_ONLY_SER 类似，但将数据存储在 [堆外内存中](https://spark.apache.org/docs/2.4.0/configuration.html#memory-management)。这需要启用堆外内存。 |

参考：[RDD Persistence](https://spark.apache.org/docs/2.4.0/rdd-programming-guide.html#rdd-persistence)

#### 广播变量

广播变量：初始的时候，只在Drvier上有一份副本（不是每个task一份副本，而是每个executor才一份副本，这样可以让变量产生的副本大大减少）

task在运行的时候，想要使用广播变量中的数据，此时首先会在自己本地的Executor对应的BlockManager中，尝试获取变量副本；如果本地没有，那么就从Driver远程拉取变量副本，并保存在本地的BlockManager中；此后这个executor上的task，都会直接使用本地的BlockManager中的副本。

executor的BlockManager除了从driver上拉取，也可能从其他节点的BlockManager上拉取变量副本，距离越近越好。

#### 使用Kryo序列化

设置`spark.serializer=org.apache.spark.serializer.KryoSerializer`

启用Kryo序列化机制会生效的地方：

1. 算子函数中使用到的外部变量：优化网络传输的性能，优化集群内存的占用和消耗

2. 持久化RDD时进行序列化，`StorageLevel.MEMORY_ONLY_SER`：优化内存的占用和消耗

3. Shuffle (在进行stage间的task的shuffle操作时，节点与节点之间的task会互相大量通过网络拉取和传输文件，此时，这些数据既然通过网络传输，也是可能要序列化的，就会使用Kryo)：优化网络传输的性能

#### 使用fastutil集合

#### 数据本地化

| 英文          | 中文       | 解释                                                         |
| ------------- | ---------- | ------------------------------------------------------------ |
| PROCESS_LOCAL | 进程本地化 | 数据在executor的BlockManager中，性能最好                     |
| NODE_LOCAL    | 节点本地化 | task在节点上某个executor中运行，数据位于同节点的HDFS block块；<br />或者数据和task在一个节点上的不同executor中；数据需要在进程间进行传输 |
| NO_PREF       |            |                                                              |
| RACK_LOCAL    | 机架本地化 | 数据和task在一个机架的两个节点上；数据需要通过网络在节点之间进行传输。 |
| ANY           |            | 数据和task可能在集群中的任何地方，而且不在一个机架中，性能最差 |

参数调节：

| 参数                        | 默认值 |
| --------------------------- | ------ |
| spark.locality.wait         | 3s     |
| spark.locality.wait.process |        |
| spark.locality.wait.node    |        |
| spark.locality.wait.rack    |        |

#### executor堆外内存

executor的堆外内存不太够用会报错shuffle file cannot find，executor、task lost，out of memory（内存溢出）；

executor在运行的过程中内存溢出，可能导致后续的stage的task在运行的时候，可能要从一些executor中去拉取shuffle map output文件，但是executor可能已经挂掉了，关联的block manager也没有了；所以可能会报shuffle output file not found；resubmitting task；executor lost；spark作业彻底崩溃。

增加executor堆外内存：`--conf spark.yarn.executor.memoryOverhead=2048`

#### 增加连接等待时长

spark默认的网络连接的超时时长，是60s；如果卡住60s都无法建立连接的话，那么就宣告失败了。

当出现`file not found，executor lost，task lost`时，很有可能是有那份数据的executor在jvm gc。

配置连接时长：`--conf spark.core.connection.ack.wait.timeout=300`。

#### shuffle调优

##### 合并map端输出文件

配置`spark.shuffle.consolidateFiles=true`

##### map端内存缓存与reduce端内存占比

| 参数                         | 默认值 |
| ---------------------------- | ------ |
| spark.shuffle.file.buffer    | 32kb   |
| spark.shuffle.memoryFraction | 0.2    |

默认情况下，shuffle的map task，输出到磁盘文件的时候会先写入每个task自己关联的一个内存缓冲区。默认大小是32kb。

当内存缓冲区满溢之后，才会进行spill操作溢写到磁盘文件中去。

在map task处理的数据量比较大的情况下可能会造成多次的map端往磁盘文件的spill溢写操作，发生大量的磁盘IO，从而降低性能。

reduce端聚合内存，如果数据量比较大，reduce task拉取过来的数据很多，那么就会频繁发生reduce端聚合内存不够用，频繁发生spill操作，溢写到磁盘上去。后面在进行聚合操作的时候，很可能会多次读取磁盘中的数据，进行聚合。默认不调优，在数据量比较大的情况下，可能频繁地发生reduce端的磁盘文件的读写。

##### ShuffleManager

临时文件数量：

| ShuffleManager     | 机制       | 数量                                       |
| ------------------ | ---------- | ------------------------------------------ |
| HashShuffleManager | 普通机制   | M（map task的个数）*R（reduce task的个数） |
| HashShuffleManager | 优化机制   | C（core的个数）*R（Reduce的个数）          |
| SortShuffleManager | 普通机制   | 2*M                                        |
| SortShuffleManager | bypass机制 | 没有排序：2*M                              |

| 参数                                    | 选项                            | 备注                                                         |
| --------------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| spark.shuffle.manager                   | sort（默认）,hash,tungsten-sort |                                                              |
| spark.shuffle.sort.bypassMergeThreshold | 200                             | 输出文件小于等于200的；最后只会将所有的输出文件合并为一份文件，并不会进行sort操作 |

SortShuffleManager会对每个reduce task要处理的数据，进行排序。

SortShuffleManager一个task只会写入一个磁盘文件，不同reduce task的数据用offset来划分界定。

HashShuffleManager会创建多份磁盘文件

TungStenSortShuffleManager自己实现内存管理，性能上有很大的提升， 可以避免shuffle过程中产生的大量的OOM，GC等。

##### MapPartitions提升Map类操作性能

##### 使用foreachPartition算子

foreachPartition算子的好处：

1、对于我们写的function函数，就调用一次，一次传入一个partition所有的数据

2、主要创建或者获取一个数据库连接就可以

3、只要向数据库发送一次SQL语句和多组参数即可

##### spark.default.parallelism

官方推荐指定为cpu core总数的2~3倍。

设置的这个并行度，在哪些情况下会生效？哪些情况下，不会生效？

如果没有使用Spark SQL（DataFrame），那么你整个spark application默认所有stage的并行度都是你设置的那个参数。（除非你使用coalesce算子缩减过partition数量）

如果使用了Spark SQL，Spark SQL自己会默认根据hive表对应的hdfs文件的block，自动设置Spark SQL查询所在的那个stage的并行度。

可以用于Spark SQL查询出来的RDD，使用repartition算子重新进行分区，此时可以分区成多个partition。然后从repartition以后的RDD，再往后并行度和task数量就会按照你预期的来了。就可以避免跟Spark SQL绑定在一个stage中的算子，只能使用少量的task去处理大量数据以及复杂的算法逻辑。

#### 控制shuffle reduce端缓冲大小，避免OOM

配置`spark.reducer.maxSizeInFlight`

map端的task是不断的输出数据的，数据量可能是很大的。

而reduce端的task并不是等到map端task将属于自己的那份数据全部写入磁盘文件之后才去拉取的。map端写一点数据reduce端task就会拉取一小部分数据，立即进行后面的聚合、算子函数的应用。

每次reduece能够拉取多少数据就由buffer来决定。因为拉取过来的数据都是先放在buffer中的，然后才用后面的executor分配的堆内存占比（0.2），hashmap，去进行后续的聚合、函数的执行。

但是有的时候，map端的数据量特别大，然后写出的速度特别快。这时候就应该减少reduce端task缓冲的大小来避免OOM。

#### 解决JVM GC导致的shuffle文件拉去失败问题

| 配置项                      | 值   |
| --------------------------- | ---- |
| spark.shuffle.io.maxRetries | 60   |
| spark.shuffle.io.retryWait  | 60s  |

#### 解决各种序列化导致的报错

用client模式去提交spark作业，观察本地打印出来的log。如果报错的log出现了类似于Serializable、Serialize等等字眼。

序列化报错要注意的3个点：

1. 如果你的算子函数里面使用到了外部的自定义类型的变量，就要求你的自定义类型必须是可序列化的。
2. 如果要将自定义的类型作为RDD的元素类型，那么自定义的类型也必须是可以序列化的
3. 不能在上述两种情况下，去使用一些第三方的不支持序列化的类型（数据库连接Connection是不支持序列化的）

#### 解决算子函数返回NULL导致的问题

在有些算子函数里面是需要我们有一个返回值的。如果碰到你的确是对于某些值，不想要有返回值的话，有一个解决的办法：

1. 在返回的时候，返回一些特殊的值
2. 可以对这个RDD执行filter操作
3. 在filter之后可以使用coalesce算子压缩一下RDD的partition的数量

#### 解决yarn-client模式导致的网卡流量激增的问题

在生产环境中用yarn-cluster模式去提交你的spark作业。

#### 正确的持久化使用方式

```scala
usersRDD = usersRDD.cache()
val cachedUsersRDD = usersRDD.cache()
```

## 数据倾斜

### 现象

- 绝大多数task执行得都非常快，但个别task执行特别慢
- 有的task会内存溢出

### 原因定位

数据倾斜只会发生在shuffle过程中。常见会触发shuffle操作的算子有：distinct、groupByKey、reduceByKey、aggregateByKey、join、cogroup、repartition等。

某个task执行特别慢的情况：

确定数据倾斜发生在第几个stage中，然后在Spark Web UI上深入看一下当前这个stage各个task分配的数据量

某个task内存溢出的情况：

查看log的异常栈来定位代码，然后通过Spark Web UI查看报错的那个stage的各个task的运行时间以及分配的数据量

查看导致数据倾斜的key的数据分布情况：

根据你执行操作的情况不同，可以有很多种查看key分布的方式：

1. 如果是Spark SQL中的group by、join语句导致的数据倾斜，那么就查询一下SQL中使用的表的key分布情况。 
2. 如果是对Spark RDD执行shuffle算子导致的数据倾斜，那么可以在Spark作业中加入代码抽样统计。

### 解决方案

#### 方案一：使用Hive ETL预处理数据

#### 方案二：过滤少数导致倾斜的key

如果我们判断那少数几个数据量特别多的key，对作业的执行和计算结果不是特别重要的话，那么干脆就直接过滤掉那少数几个key。

如果需要每次作业执行时，动态判定哪些key的数据量最多然后再进行过滤，那么可以使用sample算子对RDD进行采样，然后计算出每个key的数量，取数据量最多的key过滤掉即可。

#### 方案三：提高shuffle操作的并行度

增加shuffle read task的数量，可以让原本分配给一个task的多个key分配给多个task，从而让每个task处理比原来更少的数据。

在对RDD执行shuffle算子时，给shuffle算子传入一个参数，比如reduceByKey(1000)，该参数就设置了这个shuffle算子执行时shuffle read task的数量。

对于Spark SQL中的shuffle类语句，比如group by、join等，需要设置参数spark.sql.shuffle.partitions，该参数代表了shuffle read task的并行度，默认是200。

#### 方案四：两阶段聚合

将原本相同的key通过附加随机前缀的方式，变成多个不同的key，就可以让原本被一个task处理的数据分散到多个task上去做局部聚合，进而解决单个task处理数据量过多的问题。接着去除掉随机前缀，再次进行全局聚合，就可以得到最终的结果。**适用于reduceByKey等聚合类shuffle算子**。

#### 方案五：将reduce join转为map join

如果一个RDD是比较小的，则可以采用广播小RDD全量数据+map算子来实现与join同样的效果，也就是map join，此时就不会发生shuffle操作，也就不会发生数据倾斜。

#### 方案六：采样倾斜key并分拆join操作

- 对包含少数几个数据量过大的key的那个RDD，通过sample算子采样出一份样本来，然后统计一下每个key的数量，计算出来数据量最大的是哪几个key。
- 然后将这几个key对应的数据从原来的RDD中拆分出来，形成一个单独的RDD，并给每个key都打上n以内的随机数作为前缀，而不会导致倾斜的大部分key形成另外一个RDD。
- 接着将需要join的另一个RDD，也过滤出来那几个倾斜key对应的数据并形成一个单独的RDD，将每条数据膨胀成n条数据，这n条数据都按顺序附加一个0~n的前缀，不会导致倾斜的大部分key也形成另外一个RDD。
- 再将附加了随机前缀的独立RDD与另一个膨胀n倍的独立RDD进行join，此时就可以将原先相同的key打散成n份，分散到多个task中去进行join了。
- 而另外两个普通的RDD就照常join即可。
- 最后将两次join的结果使用union算子合并起来即可，就是最终的join结果。

#### 方案七：使用随机前缀和扩容RDD进行join

- 该方案的实现思路基本和方案六类似，首先查看RDD/Hive表中的数据分布情况，找到那个造成数据倾斜的RDD/Hive表，比如有多个key都对应了超过1万条数据。

- 然后将该RDD的每条数据都打上一个n以内的随机前缀。

- 同时对另外一个正常的RDD进行扩容，将每条数据都扩容成n条数据，扩容出来的每条数据都依次打上一个0~n的前缀。

- 最后将两个处理后的RDD进行join即可。

### 参考

[spark知识点总结](https://zhuanlan.zhihu.com/p/71270044)

[Spark性能优化指南——高级篇](https://tech.meituan.com/2016/05/12/spark-tuning-pro.html)

## 原理

### Join原理

| 类型                  | 特点                                   | 适用场景                                    | 相关配置参数                             |
| --------------------- | -------------------------------------- | ------------------------------------------- | ---------------------------------------- |
| Broadcast Hash Join   | 没有Shuffle                            | 等值Join，不能用于Full Outer Join           | spark.sql.autoBroadcastJoinThreshold=10M |
| Sort Merge Join       | 有Shuffle，内存比Hash Join要少         | 只适用等值Join，且Join条件中的key是可排序的 | spark.sql.join.prefersortmergeJoin=true  |
| Shuffle Hash Join     | 有Shuffle                              | 等值Join，不能用于Full Outer Join           |                                          |
| Broadcast Nested Join | 需要广播数据集和嵌套循环               | 默认                                        |                                          |
| Cartesian Join        | 结果的分区数等于输入数据集的分区数之积 | Cross Join                                  |                                          |

#### 参考

[SparkSQL – 有必要坐下来聊聊Join](http://hbasefly.com/2017/03/19/sparksql-basic-join/)

### Shuffle原理

在spark中，发生shuffle操作主要是以下几个算子：

| 算子        | 操作                                                         |
| ----------- | ------------------------------------------------------------ |
| groupByKey  | 要把分布在集群各个节点上的数据中的同一个key，对应的values，都集中到一个节点的一个executor的一个task中处理 |
| reduceByKey | 算子函数去对values集合进行reduce操作，最后变成一个value      |
| countByKey  | 需要在一个task中，获取到一个key对应的所有的value，然后进行计数，统计总共有多少个value； |
| join        | 只要是两个RDD中，key相同对应的2个value，都能到一个节点的executor的task中，给我们进行处理。 |

reduceByKey(_+_)，在某个action触发job的时候，DAGScheduler，会负责将job划分为多个stage。划分的依据，就是，如果发现有会触发shuffle操作的算子，比如reduceByKey，就将这个操作的前半部分，以及之前所有的RDD和transformation操作，划分为一个stage；shuffle操作的后半部分，以及后面的，直到action为止的RDD和transformation操作，划分为另外一个stage。

每一个shuffle的前半部分stage的task，每个task都会创建下一个stage的task数量相同的文件，比如下一个stage会有100个task，那么当前stage每个task都会创建100份文件；会将同一个key对应的values，一定是写入同一个文件中的；不同节点上的task，也一定会将同一个key对应的values，写入下一个stage，同一个task对应的文件中。

shuffle的后半部分stage的task，每个task都会从各个节点上的task写的属于自己的那一份文件中，拉取key, value对；然后task会有一个内存缓冲区，然后会用HashMap，进行key, values的汇聚：(key ,values)；

task会用我们自己定义的聚合函数，比如reduceByKey(_+_)，把所有values进行一对一的累加；聚合出来最终的值。就完成了shuffle。

shuffle前半部分的task在写入数据到磁盘文件之前，都会先写入一个一个的内存缓冲，内存缓冲满溢之后，再spill溢写到磁盘文件中。

默认Shuffle过程：

第一个stage，每个task，都会给第二个stage的每个task创建一份map端的输出文件。

第二个stage，每个task，会到各个节点上面去，拉取第一个stage每个task输出的，属于自己的那一份文件。

开启了map端输出文件的合并机制之后：

第一个stage，同时就运行cpu core个task，比如cpu core是2个，并行运行2个task；每个task都创建下一个stage的task数量个文件；

第一个stage，并行运行的2个task执行完以后；就会执行另外两个task；另外2个task不会再重新创建输出文件；而是复用之前的task创建的map端输出文件，将数据写入上一批task的输出文件中。

第二个stage，task在拉取数据的时候，就不会去拉取上一个stage每一个task为自己创建的那份输出文件了；而是拉取少量的输出文件，每个输出文件中，可能包含了多个task给自己的map端输出。

对比：

| 项                    | 默认            | 开启map端合并 |
| --------------------- | --------------- | ------------- |
| executor              | 100             |               |
| cpu core              | 2               |               |
| task                  | 1000            |               |
| 单节点输出map端文件数 | 1000/100 * 1000 | 2 * 1000      |
| 总节点输出map端文件数 | 100 * 10000     | 100 * 2000    |

合并map端输出文件，对咱们的spark的性能有哪些方面的影响呢？

- 减少map task写入磁盘文件的IO
- 减少网络传输的性能消耗

#### Hadoop和Spark Shuffle机制对比

参考：[Hadoop和Spark Shuffle机制对比](https://cloud.tencent.com/developer/news/447236)

### 内存管理

Spark 内存模型：

  Spark在一个Executor中的内存分为三块，一块是execution内存，一块是storage内存，一块是other内存。

- execution内存是执行内存，文档中说join，aggregate都在这部分内存中执行，shuffle的数据也会先缓存在这个内存中，满了再写入磁盘，能够减少IO。其实map过程也是在这个内存中执行的。
- storage内存是存储broadcast，cache，persist数据的地方。
- other内存是程序执行时预留给自己的内存。

 execution和storage是Spark Executor中内存的大户，other占用内存相对少很多，这里就不说了。在spark-1.6.0以前的版本，execution和storage的内存分配是固定的，使用的参数配置分别是spark.shuffle.memoryFraction（execution内存占Executor总内存大小，default 0.2）和spark.storage.memoryFraction（storage内存占Executor内存大小，default 0.6），因为是1.6.0以前这两块内存是互相隔离的，这就导致了Executor的内存利用率不高，而且需要根据Application的具体情况，使用者自己来调节这两个参数才能优化Spark的内存使用。在spark-1.6.0以上的版本，execution内存和storage内存可以相互借用，提高了内存的Spark中内存的使用率，同时也减少了OOM的情况。

  在Spark-1.6.0后加入了堆外内存，进一步优化了Spark的内存使用，堆外内存使用JVM堆以外的内存，不会被gc回收，可以减少频繁的full gc，所以在Spark程序中，会长时间逗留再Spark程序中的大内存对象可以使用堆外内存存储。使用堆外内存有两种方式，一种是在rdd调用persist的时候传入参数StorageLevel.OFF_HEAP，这种使用方式需要配合Tachyon一起使用。另外一种是使用Spark自带的spark.memory.offHeap.enabled 配置为true进行使用，但是这种方式在1.6.0的版本还不支持使用，只是多了这个参数，在以后的版本中会开放。

  OOM的问题通常出现在execution这块内存中，因为storage这块内存在存放数据满了之后，会直接丢弃内存中旧的数据，对性能有影响但是不会有OOM的问题。

参考：[Spark面对OOM问题的解决方法及优化总结](https://blog.csdn.net/yhb315279058/article/details/51035631)

静态内存管理：

<img src="./spark.assets/1228818-20180426212247280-1642194580.png" alt="img" style="zoom:33%;" />

<img src="./spark.assets/1228818-20180426212601088-1983526282-20200813090739016.png" alt="img" style="zoom:50%;" />

统一内存管理：

<img src="./spark.assets/1228818-20180426212726300-1935303266.png" alt="img" style="zoom:33%;" />

<img src="./spark.assets/1228818-20180426212753315-871591593.png" alt="img" style="zoom: 67%;" />

其中最重要的优化在于动态占用机制，其规则如下：

- 设定基本的存储内存和执行内存区域（spark.storage.storageFraction 参数），该设定确定了双方各自拥有的空间的范围
- 双方的空间都不足时，则存储到硬盘；若己方空间不足而对方空余时，可借用对方的空间;（存储空间不足是指不足以放下一个完整的 Block）
- 执行内存的空间被对方占用后，可让对方将占用的部分转存到硬盘，然后"归还"借用的空间
- 存储内存的空间被对方占用后，无法让对方"归还"，因为需要考虑 Shuffle 过程中的很多因素，实现起来较为复杂

#### 参考

[Spark（七）Spark内存调优](https://www.cnblogs.com/frankdeng/p/9301783.html)

## 问题排查

[Spark 任务执行排查慢的问题排查-2](https://www.jianshu.com/p/1f45bb8a81b3)

[Spark处理数据出现大量GC导致处理性能变慢的原因及解决方案](https://www.cnblogs.com/tian2fei/p/4285168.html)

[最近在SPARK上定位的几个内存泄露问题总结](https://blog.csdn.net/qq_33160722/article/details/54092560)
