# Commons Pool笔记

### PooledObjectState类

| 状态                      |      在队列中    | 备注                                                         |
| ------------------------- | ------------------ | ------------------------------------------------------------ |
| IDLE                      | 是       | 未使用                                                       |
| ALLOCATED                 | 否       | 使用中                                                       |
| EVICTION                  | 是       | 正在测试能否被回收                                           |
| EVICTION_RETURN_TO_HEAD   | 否       | 正在测试能否被回收，在测试过程中会尝试借出，完成后插入队列头部 |
| VALIDATION                | 是       | 正在被验证                                                   |
| VALIDATION_PREALLOCATED   | 否       | 正在被验证，在验证过程中会尝试借出                           |
| VALIDATION_RETURN_TO_HEAD | 否       | 正在被验证，尝试借出，完成后插入队列头部                     |
| INVALID                   | -        | 驱逐测试或验证失败，将会或已经被销毁     |
| ABANDONED                 | -        | 废弃，将会销毁                                               |
| RETURNING                 | -        | 归还到池中                                                   |

### PooledObject接口

方法：

```
// 获取封装的对象
T getObject();
// 获取对象状态
PooledObjectState getState();

// 获取对象在最后一次活动状态的时间间隔
long getActiveTimeMillis();
// 获取对象在最后一次空闲状态的时间间隔
long getIdleTimeMillis();
// 获取对象的创建时间
long getCreateTime();
// 获取对象在上次借出的时间点
long getLastBorrowTime();
// 获取对象在上次归还的时间点
long getLastReturnTime();
// 获取对象在上次使用的估计时间点
long getLastUsedTime();
// 获取对象被借出的次数
long getBorrowedCount();

// 分配对象
boolean allocate();
// 回收对象并置为空闲状态
boolean deallocate();
// 把对象置为无效状态
void invalidate();
// 把对象标记为废弃状态
void markAbandoned();
// 把对象标记为正在归还状态
void markReturning();
// 尝试将对象置于EVICTION状态
boolean startEvictionTest();
// 通知对象结束eviction测试
boolean endEvictionTest(Deque<PooledObject<T>> idleQueue);

// 设置是否跟踪废弃对象的堆栈信息
void setLogAbandoned(boolean logAbandoned);
// 是否记录完整的堆栈信息（除了类名之外的方法名，行号等）
void setRequireFullStackTrace(final boolean requireFullStackTrace);
// 记录对象上次调用时候的堆栈信息
void use();
// 打印借出对象和使用对象代码的堆栈信息
void printStackTrace(PrintWriter writer);
```

EvictionTest？

Borrow?allocate

### PooledObjectFactory接口

```
 创建一个实例
 PooledObject<T> makeObject()
 销毁实例
 void destroyObject(PooledObject<T> p)
 验证能否安全归还到池中
 boolean validateObject(PooledObject<T> p)
 重新初始化实例
 void activateObject(PooledObject<T> p)
 钝化实例
 void passivateObject(PooledObject<T> p)
```

### ObjectPool接口

```
// 使用PooledObjectFactory创建一个实例并钝化，然后放入空闲对象池
addObject()
获取一个实例
borrowObject()
清空空闲实例并释放相应的资源
clear()
关闭对象池并释放所有资源
close()
已借出的实例数
getNumActive()
空闲的实例数
getNumIdle()
销毁实例
invalidateObject()
归还实例
returnObject()
```

示例代码：

```java
Object obj = null;
try {
   obj = pool.borrowObject();
   try {
       //...use the object...
   } catch(Exception e) {
       // invalidate the object
       pool.invalidateObject(obj);
       // do not return the object to the pool twice
       obj = null;
   } finally {
       // make sure the object is returned to the pool
       if(null != obj) {
           pool.returnObject(obj);
      }
   }
} catch(Exception e) {
     // failed to borrow an object
}
```

### 配置

GenericObjectPool类：

| 参数                           | 默认值 | 备注                                                         |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| maxTotal                       | -1                             | 池可以分配的容量，负值代表无限制                             |
| minIdle | 0 | 池中维持对象的最少数量，timeBetweenEvictionRunsMillis为正值时生效 |
| maxIdle | 8 | 池中维持对象的最大数量 |
| blockWhenExhausted             | true                           | 当池中借出数量超过最大活跃数量时候是否阻塞                   |
| maxWaitMillis                  | -1                             | 当借出对象阻塞时，在抛出异常前的超时时间，负值代表无限期阻塞 |
| maxBorrowWaitTimeMillis        |                                | 一个线程从池中获取对象等待的最长时间                         |
| lifo                           | true                           | 是LIFO队列为true，是FIFO队列为false                          |
| fairness                       |                                | 池对等待线程的服务是否是公平的（FIFO）                       |
| testOnCreate                   | false                          | 在借出前是否对新建对象进行验证                               |
| testOnBorrow                   | alse                           | 在借出前是否对对象进行验证                                   |
| testOnReturn                   | false                          | 归还的对象是否进行验证：验证成功则归还到池中，验证失败则销毁对象 |
| testWhileIdle                  | false                          | 池中的空闲对象是否会被evictor验证，验证失败则从池中移除并销毁 |
| timeBetweenEvictionRunsMillis  | -1                             | evictor线程运行的时间间隔                                    |
| numTestsPerEvictionRun         | 3                              | evictor线程每次运行检查的最大数量                            |
| minEvictableIdleTimeMillis     | 1000 * 60 * 30                 | 对象空闲的最小时间，超过此值后将可能会被移除优先级高于`softMinEvictableIdleTimeMillis` |
| softMinEvictableIdleTimeMillis | -1                             | 对象空闲的最小时间，超过此值后将可能会被移除，但至少保留minIdle个空闲连接数，优先级低于`minEvictableIdleTimeMillis` |

AbandonedConfig：



参考：

- [Apache Commons-pool2（整理）](https://www.jianshu.com/p/b0189e01de35)
- [Apache Common Pool2 对象池应用浅析](https://zhuanlan.zhihu.com/p/36216932)