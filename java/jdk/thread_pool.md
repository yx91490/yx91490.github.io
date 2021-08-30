# Java线程池

Executor创建方式：

| 创建方式                  | corePoolSize | maximumPoolSize   | keepAliveTime | workQueue           |
| ------------------------- | ------------ | ----------------- | ------------- | ------------------- |
| newCachedThreadPool()     | 0            | Integer.MAX_VALUE | 60s           | SynchronousQueue    |
| newSingleThreadExecutor() | 1            | 1                 | 0             | LinkedBlockingQueue |
| newFixedThreadPool()      | n            | n                 | 0             | LinkedBlockingQueue |
| newScheduledThreadPool()  | n            | Integer.MAX_VALUE | 0             | DelayedWorkQueue    |

RejectedExecutionHandler实现类：

- ThreadPoolExecutor.AbortPolicy：抛出`RejectedExecutionException`
- ThreadPoolExecutor.CallerRunsPolicy：在调用方线程执行任务
- ThreadPoolExecutor.DiscardOldestPolicy：丢弃最早的请求然后重试
- ThreadPoolExecutor.DiscardPolicy：丢弃该请求

### 参考

[从创建线程池的源码来深入分析究竟有哪些方式可以创建线程池](https://www.tuicool.com/articles/im26VfV)

