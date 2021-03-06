# GC算法与垃圾收集器笔记

### GC算法

#### 标记算法

1. 引用计数算法

   每个对象有一个引用计数器，当对象被引用一次则计数器加1，当对象引用失效一次则计数器减1，对于计数器为0的对象意味着是垃圾对象，可以被GC回收。

2. 可达性分析算法

   从GC Roots作为起点开始搜索，那么整个连通图中的对象便都是活对象，对于GC Roots无法到达的对象便成了垃圾回收的对象，随时可被GC回收。

   GC管理的主要区域是Java堆，一般情况下只针对堆进行垃圾回收。**方法区、栈和本地方法区**不被GC所管理,因而选择这些区域内的对象作为GC roots,被GC roots引用的对象不被GC回收。

   在Java语言中，可以作为GC Roots的对象包括下面几种：

   - 虚拟机栈（栈帧中的本地变量表）中引用的对象；
   - 方法区中类静态属性引用的对象；
   - 方法区中常量引用的对象；
   - 本地方法栈中JNI（即一般说的Native方法）引用的对象；

   总结就是，方法运行时，方法中引用的对象；类的静态变量引用的对象；类中常量引用的对象；Native方法中引用的对象。

#### 垃圾收集算法

| 算法          | 备注                                               |
| ------------- | -------------------------------------------------- |
| 标记-清除算法 | 1. 效率低 2.产生不连续的内存碎片                   |
| 复制算法      | 1. 内存使用率低 2. 分配担保                        |
| 标记-整理算法 | 标记后让所有对象向一端移动                         |
| 分代收集算法  | 新生代复制算法，老年代标记-清除算法或标记-整理算法 |

### 垃圾收集器

- **并行** 多条垃圾收集线程同时工作，用户线程等待
- **并发** 用户线程与垃圾收集线程同时工作（多CPU）

> https://blogs.oracle.com/jonthecollector/our-collectors

#### 动态年龄计算

Hotspot遍历所有对象时，按照年龄从小到大对其所占用的大小进行累积，当累积的某个年龄大小超过了survivor区的一半时，取这个年龄和MaxTenuringThreshold中更小的一个值，作为新的晋升年龄阈值。在本案例中，调优前：Survivor区 = 64M，desired survivor = 32M，此时Survivor区中age<=2的对象累计大小为41M，41M大于32M，所以晋升年龄阈值被设置为2，下次Minor GC时将年龄超过2的对象被晋升到老年代。

JVM引入动态年龄计算，主要基于如下两点考虑：

1. 如果固定按照MaxTenuringThreshold设定的阈值作为晋升条件：
   a）MaxTenuringThreshold设置的过大，原本应该晋升的对象一直停留在Survivor区，直到Survivor区溢出，一旦溢出发生，Eden+Svuvivor中对象将不再依据年龄全部提升到老年代，这样对象老化的机制就失效了。
   b）MaxTenuringThreshold设置的过小，“过早晋升”即对象不能在新生代充分被回收，大量短期对象被晋升到老年代，老年代空间迅速增长，引起频繁的Major GC。分代回收失去了意义，严重影响GC性能。
2. 相同应用在不同时间的表现不同：特殊任务的执行或者流量成分的变化，都会导致对象的生命周期分布发生波动，那么固定的阈值设定，因为无法动态适应变化，会造成和上面相同的问题。

#### Serial收集器

- 串行收集器是最古老，最稳定以及效率高的收集器

- 可能会产生较长的停顿，只使用一个线程去回收

- 新生代复制算法

- 老年代标记-压缩

- 作为CMS的后备预案

- -XX:+UseSerialGC

```
0.844: [GC 0.844: [DefNew: 17472K->2176K(19648K), 0.0188339 secs] 17472K->2375K(63360K), 0.0189186 secs][Times: user=0.01 sys=0.00, real=0.02 secs]
  8.259: [Full GC 8.259: [Tenured: 43711K->40302K(43712K), 0.2960477 secs] 63350K->40302K(63360K), [Perm : 17836K->17836K(32768K)], 0.2961554 secs][Times: user=0.28 sys=0.02, real=0.30 secs]
```

#### ParNew收集器

- Serial收集器新生代的并行版本

- 在新生代回收时使用复制算法

- -XX:ParallelGCThreads 限制线程数量

- -XX:+UseParNewGC

```
0.834: [GC 0.834: [ParNew: 13184K->1600K(14784K), 0.0092203 secs] 13184K->1921K(63936K), 0.0093401 secs][Times: user=0.00 sys=0.00, real=0.00 secs]
```

#### Parallel Scavenge收集器

- 新生代复制算法

- 老年代标记-压缩算法

- 并行收集器

- 关注可控制的**吞吐量**（运行用户代码时间/(运行用户代码时间+垃圾收集时间)）

- -XX:MaxGCPauseMills 最大垃圾收集停顿时间

- -XX:GCTimeRatio 垃圾收集时间占总时间的比，0-100的取值范围，默认99即最大允许1%时间做GC

- -XX:+UseAdaptiveSizePolicy动态调整jvm参数

- -XX:+UseParallelGC 使用Parallel收集器+ 老年代串行

- -XX:+UseParallelOldGC 使用Parallel收集器+ 老年代并行

```
1.500: [Full GC [PSYoungGen: 2682K->0K(19136K)] [ParOldGen: 28035K->30437K(43712K)] 30717K->30437K(62848K) [PSPermGen: 10943K->10928K(32768K)], 0.2902791 secs][Times: user=1.44 sys=0.03, real=0.30 secs]
```

#### CMS收集器

- 使用标记-清除算法
- 老年代收集器
- -XX:+ UseCMSCompactAtFullCollection Full GC后，进行一次整理
- -XX:+CMSFullGCsBeforeCompaction  进行几次Full GC后，进行一次碎片整理
- -XX:ParallelCMSThreads 设定CMS的线程数量
- -XX:+UseConcMarkSweepGC

**CMS阶段**

先回顾一下CMS的四个主要阶段，以及各个阶段的工作内容。

1. Init-mark初始标记(STW) ，该阶段进行可达性分析，标记GC ROOT能直接关联到的对象，所以很快。
2. Concurrent-mark并发标记，由前阶段标记过的绿色对象出发，所有可到达的对象都在本阶段中标记。
3. Remark重标记(STW) ，暂停所有用户线程，重新扫描堆中的对象，进行可达性分析，标记活着的对象。因为并发标记阶段是和用户线程并发执行的过程，所以该过程中可能有用户线程修改某些活跃对象的字段，指向了一个未标记过的对象，如下图中红色对象在并发标记开始时不可达，但是并行期间引用发生变化，变为对象可达，这个阶段需要重新标记出此类对象，防止在下一阶段被清理掉，这个过程也是需要STW的。特别需要注意一点，这个阶段是以新生代中对象为根来判断对象是否存活的。
4. 并发清理，进行并发的垃圾清理。

**并发预清理**

新生代中对象的特点是“朝生夕灭”，这样如果Remark前执行一次Minor GC，大部分对象就会被回收。CMS就采用了这样的方式，在Remark前增加了一个可中断的并发预清理（CMS-concurrent-abortable-preclean），该阶段主要工作仍然是并发标记对象是否存活，只是这个过程可被中断。此阶段在Eden区使用超过2M时启动，当然2M是默认的阈值，可以通过参数修改。如果此阶段执行时等到了Minor GC，那么上述灰色对象将被回收，Reamark阶段需要扫描的对象就少了。

除此之外CMS为了避免这个阶段没有等到Minor GC而陷入无限等待，提供了参数CMSMaxAbortablePrecleanTime ，默认为5s，含义是如果可中断的预清理执行超过5s，不管发没发生Minor GC，都会中止此阶段，进入Remark。
根据GC日志红色标记2处显示，可中断的并发预清理执行了5.35s，超过了设置的5s被中断，期间没有等到Minor GC ，所以Remark时新生代中仍然有很多对象。

对于这种情况，CMS提供CMSScavengeBeforeRemark参数，用来保证Remark前强制进行一次Minor GC。

**CMS log**

```
1.662: [GC [1 CMS-initial-mark: 28122K(49152K)] 29959K(63936K), 0.0046877 secs][Times: user=0.00 sys=0.00, real=0.00 secs] 
1.666: [CMS-concurrent-mark-start]
1.699: [CMS-concurrent-mark: 0.033/0.033 secs][Times: user=0.25 sys=0.00, real=0.03 secs] 
1.699: [CMS-concurrent-preclean-start]
1.700: [CMS-concurrent-preclean: 0.000/0.000 secs][Times: user=0.00 sys=0.00, real=0.00 secs] 
1.700: [GC[YG occupancy: 1837 K (14784 K)]1.700: [Rescan (parallel) , 0.0009330 secs]1.701: [weak refs processing, 0.0000180 secs] [1 CMS-remark: 28122K(49152K)] 29959K(63936K), 0.0010248 secs][Times: user=0.00 sys=0.00, real=0.00 secs] 
1.702: [CMS-concurrent-sweep-start]
1.739: [CMS-concurrent-sweep: 0.035/0.037 secs][Times: user=0.11 sys=0.02, real=0.05 secs] 
1.739: [CMS-concurrent-reset-start]
1.741: [CMS-concurrent-reset: 0.001/0.001 secs][Times: user=0.00 sys=0.00, real=0.00 secs]
```

**real time > usr time + sys time**

- real：指的是操作从开始到结束所经过的墙钟时间（WallClock Time）
- user：指的是用户态消耗的CPU时间；
- sys：指的是内核态消耗的CPU时间。

墙钟时间包括各种非运算的等待耗时，例如等待磁盘I/O、等待线程阻塞，而CPU时间不包括这些耗时，但当系统有多CPU或者多核的话，多线程操作会叠加这些CPU时间，所以看到user或sys时间超过real时间是完全正常的。

**CMS问题**

CMS并行GC是大多数应用的最佳选择，然而， CMS并不是完美的，在使用CMS的过程中会产生2个最让人头痛的问题：

1. promotion failed
2. concurrent mode failure

第一个问题promotion failed是在进行Minor GC时，Survivor Space放不下，对象只能放入老年代，而此时老年代也放不下造成的，多数是由于老年代有足够的空闲空间，但是由于碎片较多

解决办法：-XX:UseCMSCompactAtFullCollection -XX:CMSFullGCBeforeCompaction=5 或者 调大新生代或者救助空间

第二个问题concurrent mode failure是在执行CMS GC的过程中同时业务线程将对象放入老年代，而此时老年代空间不足，这时CMS还没有机会回收老年代产生的，或者在做Minor GC的时候，新生代救助空间放不下，需要放入老年代，而老年代也放不下而产生的。

解决办法：+XX:CMSInitiatingOccupancyFraction，调大老年代的空间，+XX:CMSMaxAbortablePrecleanTime

总结一句话：使用标记整理清除碎片和提早进行CMS操作。

### 垃圾收集器参数总结

| 参数                               | 描述                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| -XX:SurvivorRatio                  | 新生代中Eden区域与Survivor区域的容量比值，默认为8，代表Eden:Subrvivor = 8:1 |
| -XX:PretenureSizeThreshold         | 直接晋升到老年代对象的大小，设置这个参数后，大于这个参数的对象将直接在老年代分配 |
| -XX:MaxTenuringThreshold           | 晋升到老年代的对象年龄，每次Minor GC之后，年龄就加1，当超过这个参数的值时进入老年代 |
| -XX:UseAdaptiveSizePolicy          | 动态调整java堆中各个区域的大小以及进入老年代的年龄           |
| -XX:+HandlePromotionFailure        | 是否允许新生代收集担保，进行一次minor gc后, 另一块Survivor空间不足时，将直接会在老年代中保留 |
| -XX:ParallelGCThreads              | 设置并行GC进行内存回收的线程数                               |
| -XX:GCTimeRatio                    | GC时间占总时间的比列，默认值为99，即允许1%的GC时间，仅在使用Parallel Scavenge 收集器时有效 |
| -XX:MaxGCPauseMillis               | 设置GC的最大停顿时间，在Parallel Scavenge 收集器下有效       |
| -XX:CMSInitiatingOccupancyFraction | 设置CMS收集器在老年代空间被使用多少后出发垃圾收集，默认值为68%，仅在CMS收集器时有效，-XX:CMSInitiatingOccupancyFraction=70 |
| -XX:+UseCMSCompactAtFullCollection | 由于CMS收集器会产生碎片，此参数设置在垃圾收集器后是否需要一次内存碎片整理过程，仅在CMS收集器时有效 |
| -XX:+CMSFullGCBeforeCompaction     | 设置CMS收集器在进行若干次垃圾收集后再进行一次内存碎片整理过程，通常与UseCMSCompactAtFullCollection参数一起使用 |
| -XX:+UseFastAccessorMethods        | 原始类型优化                                                 |
| -XX:+DisableExplicitGC             | 是否关闭手动System.gc                                        |
| -XX:+CMSParallelRemarkEnabled      | 降低标记停顿                                                 |
| -XX:LargePageSizeInBytes           | 内存页的大小不可设置过大，会影响Perm的大小，-XX:LargePageSizeInBytes=128m |

#### Client、Server模式默认GC

|        | 新生代GC方式                  | 老年代和持久**代**GC方式 |
| ------ | ----------------------------- | ------------------------ |
| Client | Serial 串行GC                 | Serial Old 串行GC        |
| Server | Parallel Scavenge  并行回收GC | Parallel Old 并行GC      |

#### Hotspot虚拟机GC组合方式

| 参数                    | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| -XX:+UseSerialGC        | Jvm运行在Client模式下的默认值，打开此开关后，使用Serial + Serial Old的收集器组合进行内存回收 |
| -XX:+UseParNewGC        | 打开此开关后，使用ParNew + Serial Old的收集器进行垃圾回收    |
| -XX:+UseConcMarkSweepGC | 使用ParNew + CMS +  Serial Old的收集器组合进行内存回收，Serial Old作为CMS出现“Concurrent Mode Failure”失败后的后备收集器使用。 |
| -XX:+UseParallelGC      | Jvm运行在Server模式下的默认值，打开此开关后，使用Parallel Scavenge +  Serial Old的收集器组合进行回收 |
| -XX:+UseParallelOldGC   | 使用Parallel Scavenge +  Parallel Old的收集器组合进行回收    |

| 参数                    | 新生代GC方式      | 老年代和持久代GC方式                                |
| :---------------------- | :---------------- | :-------------------------------------------------- |
| -XX:+UseSerialGC        | Serial            | Serial Old                                          |
| -XX:+UseParNewGC        | ParNew            | Serial Old                                          |
| -XX:+UseParallelGC      | Parallel Scavenge | Serial Old                                          |
| -XX:+UseParallelOldGC   | Parallel Scavenge | Parallel Old                                        |
| -XX:+UseConcMarkSweepGC | ParNew 并行GC     | CMS 当出现“Concurrent Mode Failure”时采用Serial Old |

### 内存占用调优

#### gc正常的状态

- Minor GC执行的很快（小于50ms）
- Minor GC执行的并不频繁（大概10秒一次）
- Full GC执行的很快（小于1s）
- Full GC执行的并不频繁（10分钟一次）

#### 分区大小

**活跃数据的大小**是指，应用程序稳定运行时长期存活对象在堆中占用的空间大小，也就是Full GC后堆中老年代占用空间的大小。可以通过GC日志中Full GC之后老年代数据大小得出，比较准确的方法是在程序稳定后，多次获取GC数据，通过取平均值的方式计算活跃数据的大小。活跃数据和各分区之间的比例关系如下：

| 空间   | 倍数                                    |
| ------ | --------------------------------------- |
| 总大小 | **3-4** 倍活跃数据的大小                |
| 新生代 | **1-1.5** 活跃数据的大小                |
| 老年代 | **2-3** 倍活跃数据的大小                |
| 永久代 | **1.2-1.5** 倍Full GC后的永久代空间占用 |

#### 优化Minor GC频繁问题
通常情况下，由于新生代空间较小，Eden区很快被填满，就会导致频繁Minor GC，因此可以通过增大新生代空间来降低Minor GC的频率。例如在相同的内存分配率的前提下，新生代中的Eden区增加一倍，Minor GC的次数就会减少一半。

扩容后，Minor GC时增加了T1（扫描时间），但省去T2（复制对象）的时间，更重要的是对于虚拟机来说，复制对象的成本要远高于扫描成本，所以，单次**Minor GC时间更多取决于GC后存活对象的数量，而非Eden区的大小**。因此如果堆中短期对象很多，那么扩容新生代，单次Minor GC时间不会显著增加。

如何选择各分区大小应该依赖应用程序中对象生命周期的分布情况：**如果应用存在大量的短期对象，应该选择较大的年轻代；如果存在相对较多的持久对象，老年代应该适当增大。**

#### Remark阶段为什么要扫描整个堆?


新生代对象持有老年代中对象的引用，这种情况称为**“跨代引用”**。因它的存在，Remark阶段必须扫描整个堆来判断对象是否存活。

**新生代GC和老年代的GC是各自分开独立进行的**，只有Minor GC时才会使用根搜索算法，标记新生代对象是否可达，也就是说虽然一些对象已经不可达，但在Minor GC发生前不会被标记为不可达，CMS也无法辨认哪些对象存活，只能全堆扫描（新生代+老年代）。由此可见堆中对象的数目影响了Remark阶段耗时。



#### JVM是如何避免Minor GC时扫描全堆的？

经过统计信息显示，老年代持有新生代对象引用的情况不足1%，根据这一特性JVM引入了卡表（card table）来实现这一目的。

**卡表**的具体策略是将老年代的空间分成大小为512B的若干张卡（card）。卡表本身是单字节数组，数组中的每个元素对应着一张卡，当发生老年代引用新生代时，虚拟机将该卡对应的卡表元素设置为适当的值。如上图所示，卡表3被标记为脏（卡表还有另外的作用，标识并发标记阶段哪些块被修改过），之后Minor GC时通过扫描卡表就可以很快的识别哪些卡中存在老年代指向新生代的引用。这样虚拟机通过空间换时间的方式，避免了全堆扫描。

#### 什么时候可能会触发STW的Full GC呢

1. Perm空间不足；
2. CMS GC时出现promotion failed和concurrent mode failure
3. 统计得到的Young GC晋升到老年代的平均大小大于老年代的剩余空间；
4. 主动触发Full GC（执行jmap -histo:live [pid]）来避免碎片问题。
