# DataX源码学习笔记

## 插件接口

实现Reader插件和Writer插件主要是实现对应的[Reader接口](https://github.com/alibaba/DataX/blob/datax_v202309/common/src/main/java/com/alibaba/datax/common/spi/Reader.java)和[Writer接口](https://github.com/alibaba/DataX/blob/datax_v202309/common/src/main/java/com/alibaba/datax/common/spi/Writer.java)。每个接口中都拆成了一个Job接口和一个Task接口，一开始看到肯定有这样的疑问：不能都写到一起吗？有必要这样拆分吗？其实Job接口返回的是静态的配置信息，Task接口是动态的操作，两个功能的会话范围和实例化次数也不相同，所以拆开是有必要的。

## 主流程

DataX的启动脚本是[bin/datax.py](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/bin/datax.py)，主要负责拼接类一些启动参数，然后启动JVM进程，JVM进程的入口类是[com.alibaba.datax.core.Engine.java](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/Engine.java)，从入口类开始的数据流程如下：

```
Engine.main()
└── Engine.entry()
    └── Engine.start()
        └── JobContainer.start()
            ├── JobContainer.preHandle()         // 加载PreHandler插件的preHandler()接口
            ├── JobContainer.init()              // 分别加载Reader和Writer插件对应的init()接口
            ├── JobContainer.prepare()           // 分别加载Reader和Writer插件对应的prepare()接口
            ├── JobContainer.split()             // 切分task分片
            ├── JobContainer.schedule()          // 调度执行所有task分片
            ├── JobContainer.post()              // 分别加载Reader和Writer插件对应的post()接口
            ├── JobContainer.postHandle()        // 加载PostHandler插件的postHandler()接口
            └── JobContainer.invokeHooks()       // 调用外部hook
```

### JobContainer.preHandle()方法

[JobContainer.preHandle()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L312)根据配置里面的`job.preHandler.pluginType`和`job.preHandler.pluginName`获取到Handler的类型和名称，然后调用自定义的ClassLoader加载对应的类，并调用`preHandler()`接口。

### JobContainer.init()方法

[JobContainer.init()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L287)首先会初始化`JobId`（`JobId`在`Standalone`模式下没有意义），然后设置线程名。

根据配置里面的`job.content[0].reader.name`获取Reader插件的插件名，根据配置里面的`job.content[0].reader.parameter`获取Reader插件的`jobConf`，根据配置里面的`job.content[0].writer.parameter`获取Writer插件的`jobConf`，最后调用Reader插件的`init()`接口。

同样的Writer插件也是类似。

可以看到虽然`job.content`是一个数组，但是只获取了第一个元素的Reader插件和Writer插件配置，不知道当初为什么这样设计？猜测可能因为要兼容后面切分后分片的配置，但这里显然是一个设计败笔。

还可以看到Reader插件和Writer插件可以互相看到对方的配置，这样的设计的目的可能是特定的配对可以做一些短路处理，但是互相有了侵入，不认为这是一个好的设计。如何设计能更解耦一点呢？或许可以引入一个中枢性质的类。

### JobContainer.prepare()方法

[JobContainer.prepare()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L307)分别调用Reader插件和writer插件的`prepare()`接口。

### JobContainer.split()方法

DataX的数据模型是Reader的一个分片对应一个Writer的分片，中间通过一个Channel交换数据。[JobContainer.split()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L386)主要作用就是切分分片，保证切分后Reader分片和Writer分片比例是`1:1`。

Channel数根据[adjustChannelNumber()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L416)里面的算法确定：

1. 如果设置了字节限速，根据字节限速确定：Job级别限速`job.setting.speed.byte`，Channel级别限速`core.transport.channel.speed.byte`，Channel数= Job级别限速 / Channel级别限速。
2. 如果设置类记录数限速，根据记录数限速确定：Job级别限速`job.setting.speed.record`，Channel级别限速`job.setting.speed.channel`，Channel数= Job级别限速 / Channel级别限速。
3. 取字节限速和记录数限速确定的Channel数两者的最小值。
4. 如果都没有设置，则取`job.setting.speed.channel`的值作为Channel数，如果`job.setting.speed.channel`也没有设置则抛出异常。

[doReaderSplit()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L729)和[doWriterSplit()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L745)分别调用插件的split()接口。

[mergeReaderAndWriterTaskConfigs()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L770)把同一个Channel的Reader插件、Transformer插件、Writer插件的配置合并到一起。

最后会重新设置全局配置的`job.content`为切分后的配置数组。估计懒得再重新定义一个配置项名称，这可能就是`job.content`为什么要设置成为数组的原因吧？

### JobContainer.schedule()方法

首先明确几个概念：

- Task是最小的执行单元，一个Task包含一个Reader分片和一个Writer分片。
- TaskGroup是对Task的一个分组，通过控制Channel数来达到限速的目的。
- Channel是TaskGroup中Task执行的并发通道。

[JobContainer.schedule()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L492)主要流程是确定TaskGroup的数量，把Task均匀分配到TaskGroup中，然后启动线程执行Task。

确定每个TaskGroup的Channel数：获取配置`core.container.taskGroup.channel`。

重新确定Channel数：取原Channel数和切分的Task数的最小值。

#### JobAssignUtil.assignFairly()方法

在[JobAssignUtil.assignFairly()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/container/util/JobAssignUtil.java#L20)中进行了Task的分配：

确定TaskGroup数：TaskGroup数=Channel数/每个TaskGroup的Channel数

然后就出现了`resourceMark`这个概念。

在[parseAndGetResourceMarkAndTaskIdMap()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/container/util/JobAssignUtil.java#L80)中分别对Reader插件和Writer插件按照各自的`resourceMark`对所有分片的taskId进行分组，然后取组数多的得到`resourceMark`组。

然后在[JobAssignUtil.doAssign()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/container/util/JobAssignUtil.java#L129)中将resourceMark组分配到TaskGroup组中，同时在这里分配TaskGroupId。注意`resourceMark`组数量和TaskGroup数量不一定是相等的。具体分配算法是什么呢？简单来说就是依次将每个`resourceMark`组的第一个Task按`roundrobin`分配到TaskGroup，然后remove掉该Task，直到分配完所有Task。`JobAssignUtil.doAssign()`的函数文档中给了一个很好的例子：

```
需要实现的效果通过例子来说是：
  a 库上有表：0, 1, 2
  b 库上有表：3, 4
  c 库上有表：5, 6, 7
 
  如果有 4个 taskGroup
  则 assign 后的结果为：
  taskGroup-0: 0,  4,
  taskGroup-1: 3,  6,
  taskGroup-2: 5,  2,
  taskGroup-3: 1,  7
```

依次将0,3,5,1,4,6,2,7分片分配到TaskGroup-0到TaskGroup-4上。

在[adjustChannelNumPerTaskGroup()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/container/util/JobAssignUtil.java#L59)中对taskGroupConfig做了更均匀分配的优化：

为什么要做这个优化呢？

#### StandAloneScheduler.schedule()方法

划分好TaskGroup之后就是初始化具体的Scheduler然后调用`Scheduler.schedule()`方法进行调度执行了。开源版本的DataX只实现了`STANDALONE`模式的Scheduler版本，即`StandAloneScheduler`。

#### ProcessInnerScheduler.startAllTaskGroup()方法

[ProcessInnerScheduler.startAllTaskGroup()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/scheduler/processinner/ProcessInnerScheduler.java#L24)中启动了一个固定数线程池提交TaskGroupContainerRunner，线程池的线程数就是TaskGroup的数目，后续不会再有新的执行请求进来，因此提交之后就可以调用线程池的`shutdown()`等待线程运行完自己结束。

`TaskGroupContainerRunner`则是负责启动`TaskGroupContainer`，`TaskGroupContainer`会调度该TaskGroup上的任务执行。

#### TaskGroupContainer.start()方法

[TaskGroupContainer.start()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/taskgroup/TaskGroupContainer.java#L93)这块代码算是调度模块的核心。TaskGroupContainer通过调度[TaskExecutor](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/taskgroup/TaskGroupContainer.java#L356)来调度同一个TaskGroup的Task的执行，`TaskExecutor`是单个Task的执行器。其中有几个变量：

- `runTasks`是正在执行的Task列表
- `taskQueue`是待执行的Task列表
- `communicationMap`存放taskId和对应的Communication的映射，Communication可以获取到Task执行状态

主逻辑在一个死循环中不断轮询，分为以下几步：

1. 查询所有Task的状态，从`runTasks`中移除已经结束的Task。如果：
   1. Task是失败状态且支持failover，且没有超过最大重试次数，则将Task的状态重置，重新加入`taskQueue`列表
   2. 如果Task最终失败了，或者被kill了，则抛出异常终止任务
2. 如果`runTasks`数量小于设定的channel数则从`taskQueue`拉取Task，再判断是否为重试Task：
   1. 如果是重试Task，先判断是否等待超过重试间隔时间，如果没有则继续留在`taskQueue`队列，如果超过了则判断上次执行的TaskExecutor的线程是否已经都退出。
   2. 封装为TaskExecutor，调用`taskExecutor.doStart()`执行，同时加入`runTasks`列表。

这里有个细节可以注意下，同一个Task的重试前后要保证不会同时在执行，需要根据线程的`isAlive()`判断，而不是让线程触发中断之后就默认线程已经关闭。

### JobContainer.post()方法

[JobContainer.post()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L559)分别调用Reader插件和Writer插件的`post()`接口。

### JobContainer.postHandle()方法

[JobContainer.postHandle()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L347)根据配置里面的`job.postHandler.pluginType`和`job.postHandler.pluginName`获取到Handler的类型和名称，然后调用自定义的ClassLoader加载对应的类，并调用`postHandler()`接口。

### JobContainer.invokeHooks()方法

[JobContainer.invokeHooks()方法](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/job/JobContainer.java#L971)加载`${DATAX_HOME}/hook`目录下子目录里的jar,通过SPI机制加载Hook接口，并调用`Hook.invoke()`方法。

### 总结

整个流程看下来似乎`init()`接口和`prepare()`接口都是Reader或者Writer插件各自的无参接口，都是在调度执行前执行的，功能有点重复了。

另外PreHandler和PostHandler插件的功能是做什么用的？和Reader或者Writer插件在数据流上似乎又没有衔接，看起来很鸡肋。

## 类隔离

## 类型转换

## 异常处理

## 配置加载

DataX中配置信息由[Configuration类](https://github.com/alibaba/DataX/blob/datax_v202309/common/src/main/java/com/alibaba/datax/common/util/Configuration.java)来表示，Configuration类是一个树状数据结构，可以方便地实现与JSON格式的互相转换，也可以实现多个实例的合并操作。

配置加載流程：

```
ConfigParser.parse()
├── ConfigParser.parseJobConfig     // 解析命令行传入的Job配置文件
├── ConfigParser.parseCoreConfig    // 解析自带的core.json文件
├── Configuration.merge             // 合并配置文件
├── ConfigParser.parsePluginConfig  // 解析插件的plugin.json文件
└── Configuration.merge             // 合并配置文件
```

DataX运行时的完整Configuration实例加载由[ConfigParser.parse()](https://github.com/alibaba/DataX/blob/datax_v202309/core/src/main/java/com/alibaba/datax/core/util/ConfigParser.java#L25)完成：

1. 加载命令行传入的Job配置文件
2. 加载并合并自带的`core.json`
3. 加载并合并preHandler插件、postHandler插件以及Reader插件和Writer插件的`plugin.json`

其中`core.json`文件的路径位于`$DATAX_HOME/conf/core.json`。

插件的配置文件路径位于`$DATAX_HOME/plugin/reader/$xxxReader/plugin.json`和`$DATAX_HOME/plugin/writer/$xxxWriter/plugin.json`。

其中Reader插件的配置路径会被设置为`plugin.reader.${readername}`，Writer插件的配置路径会被设置为`plugin.writer.${writername}`。

## Communacation类

## 总结

DataX最亮眼的地方就是API的设计。阿里的工程师创新性地提出了这样一个星形的数据模型，将从数据源读取和写入操作自然地抽象为Reader和Writer接口，可谓精妙绝伦。 

## 参考

[DataX插件开发宝典](https://github.com/alibaba/DataX/blob/datax_v202309/dataxPluginDev.md)