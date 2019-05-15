## Concurrent Collections FrameWork

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

JDK7提供了7个阻塞队列。分别是

- ArrayBlockingQueue ：一个由数组结构组成的有界阻塞队列。
- LinkedBlockingQueue ：一个由链表结构组成的有界阻塞队列。
- PriorityBlockingQueue ：一个支持优先级排序的无界阻塞队列。
- DelayQueue：一个使用优先级队列实现的无界阻塞队列。
- SynchronousQueue：一个不存储元素的阻塞队列。
- LinkedTransferQueue：一个由链表结构组成的无界阻塞队列。
- LinkedBlockingDeque：一个由链表结构组成的双向阻塞队列。

所谓公平访问队列是指阻塞的所有生产者线程或消费者线程，当队列可用时，可以按照阻塞的先后顺序访问队列，即先阻塞的生产者线程，可以先往队列里插入元素，先阻塞的消费者线程，可以先从队列里获取元素。

| 名称                  | 界限 | 特性           | 公平       |
| --------------------- | ---- | -------------- | ---------- |
| ArrayBlockingQueue    | 有界 | 数组， FIFO    | 默认不公平 |
| LinkedBlockingQueue   | 有界 | 链表， FIFO    |            |
| PriorityBlockingQueue | 无界 | 支持优先级排序 |            |
| DelayQueue            | 无界 | 优先级队列实现 |            |
| SynchronousQueue      |      | 不存储元素     |            |
| LinkedTransferQueue   | 无界 | 链表           |            |
| LinkedBlockingDeque   |      | 链表，双向     |            |

### ArrayBlockingQueue

```java
public void put(E e) throws InterruptedException {
    checkNotNull(e);
    final ReentrantLock lock = this.lock;
    //获取锁的过程中可中断
    lock.lockInterruptibly();
    try {
        while (count == items.length)
            // wait not full condition
            notFull.await();
        insert(e);
    } finally {
        lock.unlock();
    }
}

private void insert(E x) {
    items[putIndex] = x;
    putIndex = inc(putIndex);
    ++count;
    //notify queue is not empty
    notEmpty.signal();
}

public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    //获取锁的过程中可中断
    lock.lockInterruptibly();
    try {
        while (count == 0)
            // wait not empty condition
            notEmpty.await();
        return extract();
    } finally {
        lock.unlock();
    }
}

private E extract() {
    final Object[] items = this.items;
    E x = this.<E>cast(items[takeIndex]);
    items[takeIndex] = null;
    takeIndex = inc(takeIndex);
    --count;
    // notify queue is not full
    notFull.signal();
    return x;
}
```

[Java中Lock，tryLock，lockInterruptibly有什么区别？](https://www.zhihu.com/question/36771163)