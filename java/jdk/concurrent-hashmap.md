# ConcurrentHashMap原理

### synchronized

**synchronized是可重入锁**

1. 在Java内部，同一个线程调用自己类中其他synchronized方法/块时不会阻碍该线程的执行，同一个线程对同一个对象锁是可重入的，同一个线程可以获取同一把锁多次，也就是可以多次重入。原因是Java中线程获得对象锁的操作是以线程为单位的，而不是以调用为单位的。

### ReentrantLock

ReentrantLock 的主要功能和 synchronized 关键字一致，均是用于多线程的同步。但除此之外，ReentrantLock 在功能上比 synchronized 更为丰富。比如 ReentrantLock 在加锁期间，可响应中断，可设置超时等。

**与synchronized对比**

| 特性               | synchronized | ReentrantLock | 相同               |
| ------------------ | ------------ | ------------- | ------------------ |
| 可重入             | 是           | 是            | :white_check_mark: |
| 响应中断           | 否           | 是            | :x:                |
| 超时等待           | 否           | 是            | :x:                |
| 公平锁             | 否           | 是            | :x:                |
| 非公平锁           | 是           | 是            | :white_check_mark: |
| 是否可尝试加锁     | 否           | 是            | :x:                |
| 是否是Java内置特性 | 是           | 否            | :x:                |
| 自动获取/释放锁    | 是           | 否            | :x:                |
| 对异常的处理       | 自动释放锁   | 需手动释放锁  | :x:                |

**公平与非公平**

公平与非公平指的是线程获取锁的方式。公平模式下，线程在同步队列中通过 FIFO 的方式获取锁，每个线程最终都能获取锁。在非公平模式下，线程会通过“插队”的方式去抢占锁，抢不到的则进入同步队列进行排队。

默认情况下，ReentrantLock 使用的是非公平模式获取锁，而不是公平模式。不过我们也可通过 ReentrantLock 构造方法 `ReentrantLock(boolean fair)` 调整加锁的模式。