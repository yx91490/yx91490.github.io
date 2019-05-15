### 调优目标

Hive调优的目标是：在不影响其他业务正常运行的前提下，最大限度利用集群的物理资源，如CPU、内存、磁盘IO，使其某一项达到瓶颈。

### 调优原则

1、保证map扫描的数据量尽量少

减少map端扫描数量，需要控制待处理的表文件或中间文件的数据量尽量少。  
优化的方式如：Hive表文件使用高效的文件格式、Hive表文件使用合适的文件压缩格式、中间文件使用合适的文件压缩格式、利用列裁剪、利用分区裁剪、使用分桶。

2、保证map传送给reduce的数据量尽量小

控制map传送给reduce的数据量，是指JOIN避免笛卡尔积、启动谓词下推、开启map端聚合功能。

3、保证map和reduce处理的数据量尽量均衡

保证map处理的数据量尽量均衡，是指使用Hive合并输入格式、必要时对小文件进行合并。  
保证reduce处理的数据量尽量均衡，是指解决数据倾斜问题。包括解决group by造成的数据倾斜、解决join造成的数据倾斜。

4、合理调整map和reduce占用的计算资源

合理调整map和reduce占用的计算资源，是指通过参数设置合理调整map和reduce的内存及虚拟核数。  
根据集群总体资源情况，以及分配给当前租户的资源情况，在不影响其他业务正常运行的条件下，最大限度地利用可使用的计算资源。

5、合理调整map和reduce的数量

合理调整map数，是指通过设置每个map处理数据量的最大和最小值来合理控制map的数量。  
合理调整reduce数，是指通过直接设置reduce数量或通过设置每个reduce的处理数据量来合理控制reduce的数量。

6、重用计算结果

重用计算结果，是指将重复的子查询结果保存到中间表，供其他查询使用，减少重复计算，节省计算资源。

7、使用稳定成熟的Hive优化特性

  使用稳定成熟的Hive优化特性，包括：

1. 相关性优化器（CorrelationOptimizer）
2. 基于代价的优化（Cost-based optimization）
3. 向量化查询引擎（Vectorized Query Execution）
4. Join相关优化（Map Join、SMB Join）
5. Multiple Insert特性
6. TABLESAMPLE抽样查询
7. Limit优化
8. 局部排序（SORT BY、 DISTRIBUTE BY）

8、使用高效HQL或改用MR

使用高效HQL，包括慎用低性能的UDF和SerDe、优化count(distinct)。  
对于使用HQL比较冗余同时性能低下的场景，在充分理解业务需求后，改用MR效率更高。

### 调优手段

**1、利用分区裁剪、列裁剪**

当待查询的表字段较多时，选取需要使用的字段进行查询，避免直接select *出大表的所有字段，以免当使用Beeline查询时控制台输出缓冲区被大数据量撑爆。

在分区剪裁中，当使用外关联时，如果将副表的过滤条件写在Where后面，那么就会先全表关联，之后再过滤，比如：

```sql
SELECT a.id
FROM lxw1234_a a
left outer join t_lxw1234_partitioned b
ON (a.id = b.url);
WHERE b.day = ‘2015-05-10′
-- 正确的写法是写在ON后面：
SELECT a.id
FROM lxw1234_a a
left outer join t_lxw1234_partitioned b
ON (a.id = b.url AND b.day = ‘2015-05-10′);
--或者直接写成子查询：
SELECT a.id
FROM lxw1234_a a
left outer join (SELECT url FROM t_lxw1234_partitioned WHERE day = ‘2015-05-10′) b
ON (a.id = b.url)
```

**2、JOIN避免笛卡尔积**

JOIN场景应严格避免出现笛卡尔积的情况。参与笛卡尔积JOIN的两个表，交叉关联后的数据条数是两个原表记录数之积，对于JOIN后还有聚合的场景而言，会导致reduce端处理的数据量暴增，极大地影响运行效率。  

```
//笛卡尔积
select a.* from a join b; 
//正常Join
select a.* from a join b on a.key = b.key; 
```

**3、启动谓词下推**

谓词下推（Predicate Pushdown）是一个逻辑优化：尽早的对底层数据进行过滤以减少后续需要处理的数据量。通过以下参数启动谓词下推。

```
set hive.optimize.ppd=true;
```

**4、开启Map端聚合功能**

在map中会做部分聚集操作，能够使map传送给reduce的数据量大大减少，从而在一定程度上减轻group by带来的数据倾斜。通过以下参数开启map端聚合功能。

```
set hive.map.aggr=true;
```

**5、使用Hive合并输入格式**

设置Hive合并输入格式，使Hive在执行map前进行文件合并，使得本轮map处理数据量均衡。通过以下参数设置Hive合并输入格式。

```
set hive.input.format=org.apache.Hadoop.hive.ql.io.CombineHiveInputFormat;
```

**6、合并小文件**

启动较多的map或reduce能够提高并发度，加快任务运行速度；但同时在HDFS上生成的文件数目也会越来越多，给HDFS的NameNode造成内存上压力，进而影响HDFS读写效率。对于集群的小文件（主要由Hive启动的MR生成）过多已造成NameNode压力时，建议在Hive启动的MR中启动小文件合并。小文件合并能够使本轮map输出及整个任务输出的文件完成合并，保证下轮MapReduce任务map处理数据量均衡。

**7、解决group by造成的数据倾斜**

通过开启group by倾斜优化开关，解决group by数据倾斜问题。  开启优化开关后group by会启动两个MR。第一个 MR Job 中，Map 的输出结果集合会随机分布到 Reduce 中，每个Reduce做部分聚合操作，并输出结果，这样处理的结果是相同的Group By Key有可能被分发到不同的Reduce中，从而达到负载均衡的目的；第二个MR Job再根据预处理的数据结果按照Group By Key分布到Reduce中（这个过程可以保证相同的Group By Key被分布到同一个Reduce中），最后完成最终的聚合操作。  

```
set hive.groupby.skewindata = true;
//这个是group的键对应的记录条数超过这个值则会进行分拆,值根据具体数据量设置
set hive.groupby.mapaggr.checkinterval=100000 ;
```

存在大量空值或NULL，或者某一个值的记录特别多，可以先把该值过滤掉，在最后单独处理。比如某一天的IMEI值为’lxw1234’的特别多，当我要统计总的IMEI数，可以先统计不为’lxw1234’的，之后再加1:

```
SELECT CAST(COUNT(DISTINCT imei)+1 AS bigint)
FROM lxw1234 where pt = ‘2012-05-28′
AND imei <> ‘lxw1234′ ;
```

多重COUNT DISTINCT通常使用UNION ALL + ROW_NUMBER() + SUM + GROUP BY来变通实现。???

**8、解决Join造成的数据倾斜**

两个表关联键的数据分布倾斜，会形成Skew Join。  
解决方案是将这类倾斜的特殊值（记录数超过hive.skewjoin.key参数值）不落入reduce计算，而是先写入HDFS，然后再启动一轮MapJoin专门做这类特殊值的计算，期望能提高计算这部分值的处理速度。设置以下参数。  

```
//如果是join 过程出现倾斜 应该设置为true
set hive.optimize.skewjoin=true;
//join的键对应的记录条数超过这个值则会进行分拆
set hive.skewjoin.key=100000;
```

关联键存在大量空值或者某一特殊值如"NULL"：

1. 空值单独处理，不参与关联；
2. 空值或特殊值加随机数作为关联键；

不同数据类型的字段关联：

1. 转换为同一数据类型之后再做关联

**9、合理调整map和reduce的内存及虚拟核数**

map和reduce的内存及虚拟核数设置，决定了集群资源所能同时启动的container个数，影响集群并行计算的能力。  

1. 对于当前任务是CPU密集型任务（如复杂数学计算）的场景：在map和reduce的虚拟核数默认值基础上，逐渐增大虚拟核数进行调试（mapreduce.map.cpu.vcores和mapreduce.reduce.cpu.vcores参数控制），但不要超过可分配给container的虚拟核数（yarn.nodemanager.resource.cpu-vcores参数控制）。

2. 对于当前任务是内存密集型任务（如ORC文件读取/写入、全局排序）的场景：在map和reduce的内存默认值基础上，逐渐增大内存值进行调试（mapreduce.map.memory.mb和mapreduce.reduce.memory.mb参数控制），但不要超过当前NodeManager上可运行的所有容器的物理内存总大小（yarn.nodemanager.resource.memory-mb参数控制）。

**10、合理控制map的数量**

map的数量会影响MapReduce扫描、过滤数据的效率。对于扫描、过滤数据的逻辑比较复杂、输入数据量较大条数较多的场景：根据集群总体资源情况，以及分配给当前租户的资源情况，在不影响其他业务正常运行的条件下，map数量需要适当增大，增加并行处理的力度。

**11、合理控制reduce的数量**

reduce数量会影响MapReduce过滤、聚合、对数据排序的效率。对于关联、聚合、排序时reduce端待处理数据量较大的场景：首先根据每个reduce处理的合适数据量控制reduce的个数，如果每个reduce处理数据仍然很慢，再考虑设置参数增大reduce个数。另一方面，控制能启动的reduce最大个数为分配给当前租户的资源上限，以免影响其他业务的正常运行。

**12、将重复的子查询结果保存到中间表**

对于指标计算类型的业务场景，多个指标的HQL语句中可能存在相同的子查询，为避免重复计算浪费计算资源，考虑将重复的子查询的计算结果保存到中间表，实现计算一次、结果共享的优化目标。

**13、启用相关性优化器**

相关性优化，旨在利用下面两种查询的相关性：

（a）输入相关性：在原始operator树中，同一个输入表被多个MapReduce任务同时使用的场景；

（b）作业流程的相关性：两个有依赖关系的MapReduce的任务的shuffle方式相同。

通过以下参数启用相关性优化：  

```
set hive.optimize.correlation=true;
```

**14、启用基于代价的优化**

基于代价的优化器，可以基于代价（包括FS读写、CPU、IO等）对查询计划进行进一步的优化选择，提升Hive查询的响应速度。通过以下参数启用基于代价的优化：  

```
set hive.cbo.enable=true;
```

**15、启用向量化查询引擎**

传统方式中，对数据的处理是以行为单位，依次处理的。Hive也采用了这种方案。这种方案带来的问题是，针对每一行数据，都要进行数据解析，条件判断，方法调用等操作，从而导致了低效的CPU利用。向量化特性，通过每次处理1024行数据，列方式处理，从而减少了方法调用，降低了CPU消耗，提高了CPU利用率。结合JDK1.8对SIMD的支持，获得了极高的性能提升。通过以下参数启用向量化查询引擎：  

```
set hive.vectorized.execution.enabled=true;
```

**16、启用Join相关优化**

（a）使用MapJoin。MapJoin是针对以下场景进行的优化：两个待连接表中，有一个表非常大，而另一个表非常小，以至于小表可以直接存放到内存中。这样小表复制多份，在每个map task内存中存在一份（比如存放到hash table中），然后只扫描大表。对于大表中的每一条记录key/value，在hash table中查找是否有相同的key的记录，如果有，则连接后输出即可。

（b）使用SMB Join。

**17、使用Multiple Insert特性**

以下左图为普通insert，右图为Multiple Insert，减少了MR个数，提升了效率。  

```
INSERT OVERWRITE TABLE E1
SELECT KEY, COUNT(*)
FROM SRC
WHERE KEY > 450
GROUP BY KEY;
INSERT OVERWRITE TABLE E2
SELECT KEY, COUNT(*)
FROM SRC
WHERE KEY > 500
GROUP BY KEY;
--------------------
FROM SRC
INSERT OVERWRITE TABLE E1
SELECT KEY, COUNT(*)
WHERE KEY > 450
GROUP BY KEY
INSERT OVERWRITE TABLE E2
SELECT KEY, COUNT(*)
WHERE KEY > 500
GROUP BY KEY
```

但是对同一张表的union all要比multi insert快的多。http://superlxw1234.iteye.com/blog/1536440

**18、使用TABLESAMPLE取样查询**

在Hive中提供了数据取样（SAMPLING）的功能，用来从Hive表中根据一定的规则进行数据取样，Hive中的数据取样支持数据块取样和分桶表取样。

以下左图为数据块取样，右图为分桶表取样：  

```
CREATE TABLE HALF AS
SELECT * FROM SRC
TABLESAMPLE (50 PERCENT);

SELECT COUNT（*)
FROM NON_BUCKET_TABLE TABLESAMPLE(BUCKET 1 OUT OF 10 ON RAND());
```

**19、启用Limit优化**

启用limit优化后，使用limit不再是全表查出，而是抽样查询。涉及参数如下：  

```
set hive.limit.optimize.enable=true;
set hive.limit.row.max.size=100000;
set hive.limit.optimize.limit.file=10;
```

**20、利用局部排序**

Hive中使用order by完成全局排序，正常情况下，order by所启动的MR仅有一个reducer，这使得大数据量的表在全局排序时非常低效和耗时。当全局排序为非必须的场景时，可以使用sort by在每个reducer范围进行内部排序。同时可以使用distribute by控制每行记录分配到哪个reducer。

**21、慎用低性能的UDF和SerDe**

慎用低性能的UDF和SerDe，主要指谨慎使用正则表达式类型的UDF和SerDe。如：regexp、regexp_extract、regexp_replace、rlike、RegexSerDe。

当待处理表的条数很多时，如上亿条，采用诸如`([^ ]*)([^ ]*)([^ ]*)(.?)(".*?")(-|[0-9]*)(-|[0-9]*)(".*?")(".*?")`这种复杂类型的正则表达式组成过滤条件去匹配记录，会严重地影响map阶段的过滤速度。

建议在充分理解业务需求后，自行编写更高效准确的UDF实现相应的功能。

**22、优化count(distinct)**

优化方式如下，左图为原始HQL，右图为优化后HQL。  

```
SELECT COUNT（DISTINCT record) FROM t;
SELECT COUNT(*) FROM (SELECT  DISTINCT record FROM t) s;
```

一般COUNT DISTINCT使用先GROUP BY再COUNT的方式替换：

```sql
SELECT day,
COUNT(DISTINCT id) AS uv
FROM lxw1234
GROUP BY day
-- 可以转换成：
SELECT day,
COUNT(id) AS uv
FROM (SELECT day,id FROM lxw1234 GROUP BY day,id) a
GROUP BY day;
```



> [Hive调优的手段](https://www.jianshu.com/p/58d975a0f8f8)
>
> [Hive调优的目标、原则及手段](https://blog.csdn.net/boyu_tung/article/details/52878412)
>
> [Hive性能优化（全面）](https://mp.weixin.qq.com/s/9V99Dgz_yp-CPMtFFATtXw)
>
> [Correlation Optimizer](https://cwiki.apache.org/confluence/display/Hive/Correlation+Optimizer)
>
> [Cost-based optimization in Hive](https://cwiki.apache.org/confluence/display/Hive/Cost-based+optimization+in+Hive)
>
> [Vectorized Query Execution](https://cwiki.apache.org/confluence/display/Hive/Vectorized+Query+Execution)
>
> [LanguageManual JoinOptimization](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+JoinOptimization)

## 其他优化

#### Fetch抓取

Fetch抓取是指，Hive在全局查找、字段查找、limit查找等都不走mapreduce。

```
set hive.fetch.task.conversion=more
```

#### 本地模式

当 Hive 查询处理的数据量比较小时，其实没有必要启动分布式模式去执行，因为以分布式方式执行就涉及到跨网络传输、多节点协调 等，并且消耗资源。这个时间可以只使用本地模式来执行 mapreduce job，只在一台机器上执行，速度会很快。启动本地模式涉及到三个参数：

```
set hive.exec.mode.local.auto=true
//设置local mr的最大输入数据量，当输入数据量小于这个值时采用local  mr的方式，默认为134217728，即128M
set hive.exec.mode.local.auto.inputbytes.max=50000000;
//设置local mr的最大输入文件个数，当输入文件个数小于这个值时采用local mr的方式，默认为4
set hive.exec.mode.local.auto.input.files.max=10;
```

#### 严格模式

开启严格模式可以禁止3种类型的查询：

1. 对于分区表，除非where语句中含有分区字段过滤条件来限制范围，否则不允许执行。
2. 对于使用了order by语句的查询，要求必须使用limit语句。因为order by会将所有的结果数据分发到同一个Reducer中进行处理，强制要求用户增加这个LIMIT语句可以防止Reducer额外执行很长一段时间。
3. 限制笛卡尔积的查询。

```
set hive.mapred.mode=strict
```

#### 排序选择

**cluster by**：对同一字段分桶并排序，不能和 sort by 连用

**distribute by + sort by**：分桶，保证同一字段值只存在一个结果文件当中，结合 sort by 保证 每个 reduceTask 结果有序

**sort by**：单机排序，单个 reduce 结果有序

**order by**：全局排序，缺陷是只能使用一个 reduce

#### JVM重用

JVM重用是Hadoop调优参数的内容，其对Hive的性能具有非常大的影响，特别是对于很难避免小文件的场景或task特别多的场景，这类场景大多数执行时间都很短。

```
set  mapreduce.job.jvm.numtasks=10
```

#### 推测执行

推测式任务，也叫做Speculative task。它是一种以空间换时间的策略。 
当所有task都开始运行之后，任务对应的ApplicationMaster会统计所有任务的平均进度，如果某个task所在的task node机器配置比较低或者CPU load很高（原因很多），导致任务执行比总体任务的平均执行要慢， 
此时AM会启动一个新的任务（Speculative task），原有任务和新任务哪个先执行完就把另外一个kill掉， 
这也是我们经常在RM页面看到任务执行成功，但是总有些task被kill，就是这个原因。  

```
set mapreduce.map.speculative=true;
set mapreduce.reduce.speculative=true;
```

#### 并行执行

```
//打开任务并行执行
set hive.exec.parallel=true;
//同一个sql允许最大并行度，默认为8
set hive.exec.parallel.thread.number=16;
```

#### map数

控制map数量需要遵循两个原则：**使大数据量利用合适的map数；使单个map任务处理合适的数据量；**

```
set mapred.max.split.size=100000000;
set mapred.min.split.size.per.node=100000000;
set mapred.min.split.size.per.rack=100000000;
# 这个参数表示执行前进行小文件合并
set hive.input.format=org.apache.hadoop.hive.ql.io.CombineHiveInputFormat;
```

前面三个参数确定合并文件块的大小，大于文件块大小128m的，按照128m来分隔，小于128m,大于100m的，按照100m来分隔，把那些小于100m的（包括小文件和分隔大文件剩下的）进行合并。

如果表a只有一个文件，大小为120M，但包含几千万的记录，如果用1个map去完成这个任务，肯定是比较耗时的，这种情况下，我们要考虑将这一个文件合理的拆分成多个，
这样就可以用多个map任务去完成。

```
set mapred.reduce.tasks=10;
create table a_1 as
select * from a
distribute by rand(123);
```

这样会将a表的记录，随机的分散到包含10个文件的a_1表中，再用a_1代替上面sql中的a表，则会用10个map任务去完成。

#### reduce数

不指定reduce个数的情况下，Hive会猜测确定一个reduce个数，计算reducer数的公式很简单N=min(每个任务最大的reduce数，总输入数据量/每个reduce任务处理的数据量)：

```
// 每个reduce任务处理的数据量，默认为1000^3=1G
hive.exec.reducers.bytes.per.reducer
// 每个任务最大的reduce数，默认为999
hive.exec.reducers.max
```

调整reduce个数方法：

```
方法一：
set hive.exec.reducers.bytes.per.reducer=500000000;
方法二：
set mapred.reduce.tasks = 15;
```

很多时候你会发现任务中不管数据量多大，不管你有没有设置调整reduce个数的参数，任务中一直都只有一个reduce任务；其实只有一个reduce任务的情况，除了数据量小于 
hive.exec.reducers.bytes.per.reducer参数值的情况外，还有以下原因：  
a)    没有group by的汇总  
b)    用了Order by

只有一个reduce的场景：

1. 没有group by 的汇总

2. order by

3. 笛卡尔积

[hive优化之——控制hive任务中的map数和reduce数](http://lxw1234.com/archives/2015/04/15.htm)

#### 小文件合并

**小文件是如何产生的**

1.动态分区插入数据，产生大量的小文件，从而导致map数量剧增。

2.reduce数量越多，小文件也越多(reduce的个数和输出文件是对应的)。

3.数据源本身就包含大量的小文件。

**小文件问题的影响**

1.从Hive的角度看，小文件会开很多map，一个map开一个JVM去执行，所以这些任务的初始化，启动，执行会浪费大量的资源，严重影响性能。

2.在HDFS中，每个小文件对象约占150byte，如果小文件过多会占用大量内存。这样NameNode内存容量严重制约了集群的扩展。

**小文件问题的解决方案**

从小文件产生的途经就可以从源头上控制小文件数量，方法如下：

1. 使用Sequencefile作为表存储格式，不要用textfile，在一定程度上可以减少小文件。

2. 减少reduce的数量(可以使用参数进行控制)。

3. 少用动态分区，用时记得按distribute by分区

4. 设置map输入合并小文件

   ```sql
   -- 每个Map最大输入大小(这个值决定了合并后文件的数量)
   set mapred.max.split.size=256000000;  
   -- 一个节点上split的至少的大小(这个值决定了多个DataNode上的文件是否需要合并)
   set mapred.min.split.size.per.node=100000000;
   -- 一个交换机下split的至少的大小(这个值决定了多个交换机上的文件是否需要合并)  
   set mapred.min.split.size.per.rack=100000000;
   -- 执行Map前进行小文件合并
   set hive.input.format=org.apache.hadoop.hive.ql.io.CombineHiveInputFormat; 
   ```


5. 设置map输出和reduce输出进行合并

   ```sql
   -- 在map-only job后合并文件，默认true
   set hive.merge.mapfiles = true
   -- 在map-reduce job后合并文件，默认false
   set hive.merge.mapredfiles = true
   -- 设置合并文件的大小
   set hive.merge.size.per.task = 256*1000*1000
   -- 当输出文件的平均大小小于该值时，启动一个独立的MapReduce任务进行文件merge。
   set hive.merge.smallfiles.avgsize=16000000
   ```

6. 对于输出结果为压缩文件形式存储的情况：

   1. 如果在Map输入前合并，对输出的文件存储格式并没有限制。
   2. 如果使用输出合并，则必须配合SequenceFile来存储，否则无法进行合并

   ```sql
   set mapred.output.compression. type=BLOCK;
   set hive.exec.compress.output= true;
   set mapred.output.compression.codec=org.apache.hadoop.io.compress.LzoCodec;
   set hive.merge.smallfiles.avgsize=100000000;
   drop table if exists dw_stage.zj_small;
   create table dw_stage.zj_small
   STORED AS SEQUENCEFILE
   as select *
   from dw_db.dw_soj_imp_dtl
   where log_dt = '2014-04-14'
   and paid like '%baidu%' ;
   ```

参考：

> [Hive小文件合并](https://blog.csdn.net/yycdaizi/article/details/43341239)
>
> [Hive优化之小文件问题及其解决方案](https://blog.csdn.net/lzm1340458776/article/details/43567209)

### Hive SQL优化

