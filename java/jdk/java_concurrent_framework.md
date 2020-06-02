# Java并发集合框架

## 队列

### Queue接口

|      | 抛出异常  | 返回特定值 |
| ---- | --------- | ---------- |
| 插入 | add(e)    | offer(e)   |
| 删除 | remove()  | poll()     |
| 检查 | element() | peek()     |

### BlockingQueue接口

|      | 抛出异常  | 返回特定值 | 阻塞   | 超时                 |
| ---- | --------- | ---------- | ------ | -------------------- |
| 插入 | add(e)    | offer(e)   | put(e) | offer(e, time, unit) |
| 删除 | remove()  | poll()     | take() | poll(time, unit)     |
| 检查 | element() | peek()     | /      | /                    |

当阻塞队列不可用时，会有四种相应的处理方式：

- 返回特殊值：插入元素时，会返回是否插入成功，成功返回true。如果是移除方法，则是从队列中取出一个元素，没有则返回null。
- 一直阻塞：当阻塞队列满时，如果生产者线程往队列里面 put 元素，则生产者线程会被阻塞，知道队列不满或者响应中断退出。当队列为空时，如果消费者线程从队列里 take 元素。
- 超时退出：当阻塞队列满时，如果生产者线程往队列里插入元素，队列会阻塞生产者线程一段时间，如果超过了指定时间，生产者线程就会退出。

如果是无界阻塞队列，队列则不会出现满的情况。

JDK7提供了7个阻塞队列。分别是

- ArrayBlockingQueue ：一个由数组结构组成的有界阻塞队列。
- LinkedBlockingQueue ：一个由链表结构组成的有界阻塞队列。
- PriorityBlockingQueue ：一个支持优先级排序的无界阻塞队列。
- DelayQueue：一个使用优先级队列实现的无界阻塞队列。
- SynchronousQueue：一个不存储元素的阻塞队列。
- LinkedTransferQueue：一个由链表结构组成的无界阻塞队列。
- LinkedBlockingDeque：一个由链表结构组成的双向阻塞队列。

所谓**公平访问队列**是指阻塞的所有生产者线程或消费者线程，当队列可用时，可以按照阻塞的先后顺序访问队列，**即先阻塞的生产者线程，可以先往队列里插入元素，先阻塞的消费者线程，可以先从队列里获取元素**。

| 类                    | 名称                       | 界限 | 特性                                              |
| --------------------- | -------------------------- | ---- | ------------------------------------------------- |
| ArrayBlockingQueue    | 基于数组的并发阻塞队列     | 有界 | 数组， FIFO，<br />必须设置长度，<br />默认不公平 |
| LinkedBlockingQueue   | 基于链表的FIFO阻塞队列     | 有界 | 链表， FIFO，没有指定长度                         |
| PriorityBlockingQueue | 带优先级的无界阻塞队列     | 无界 | 支持优先级排序                                    |
| DelayQueue            | 延期阻塞队列               | 无界 | 优先级队列实现，没有指定长度                      |
| SynchronousQueue      | 并发同步阻塞队列           | 有界 | 不存储元素，不能指定长度                          |
| LinkedTransferQueue   |                            | 无界 | 链表                                              |
| LinkedBlockingDeque   | 基于链表的FIFO双端阻塞队列 | 有界 | 链表，双向，没有指定长度                          |

### ArrayBlockingQueue

此队列按照先进先出（FIFO）的原则对元素进行排序

默认情况下不保证线程公平地访问队列（所谓公平是指当队列可用时，先被阻塞的线程先访问队列）

为了保证公平性通常会降低吞吐量。

公平锁是利用了可重入锁的公平锁来实现。

### ArrayBlockingQueue

此队列按照先进先出（FIFO）的原则对元素进行排序

默认长度为 `Integer.MAX_VALUE`

### PriorityBlockingQueue

默认情况下元素采取自然顺序升序排列

可以自定义 `Comparator` 或者自定义类实现 `compareTo()` 方法来指定排序规则

不支持同优先级元素排序

### DelayQueue

队列使用 `PriorityQueue` 来实现，队列中的元素必须实现 `Delayed` 接口

只有在延时期满才能从队列中提取元素

### CopyOnWriteArrayList

## 参考

[Java中Lock，tryLock，lockInterruptibly有什么区别？](https://www.zhihu.com/question/36771163)