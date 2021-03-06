# 《路人甲java高并发系列》笔记



## 第6天:线程的基本操作

### 新建线程

**调用start方法和直接调用run方法的区别？**

start方法是启动一个线程，run方法只会在当前线程中串行的执行run方法中的代码。**因此推荐通过实现Runnable接口定义线程。**

### 终止线程

`Thread.stop()`会强制把正在执行的线程停止了，不推荐使用。

### 线程中断

**Thread提供了3个与线程中断有关的方法：**

```java
//中断线程
public void interrupt();
//判断线程是否被中断
public boolean isInterrupted();
//判断线程是否被中断，并清除当前中断状态
public static boolean interrupted();
```

**通过变量控制和线程自带的interrupt方法来中断线程有什么区别呢？**

如果一个线程调用了sleep方法，一直处于休眠状态，通过变量控制，不能中断线程，此时只能使用线程提供的interrupt()方法来中断线程了。

调用interrupt()方法之后，线程的sleep方法将会抛出`InterruptedException`异常。

```java
Thread thread1 = new Thread() {
    @Override
    public void run() {
        while (true) {
            //休眠100秒
            try {
                TimeUnit.SECONDS.sleep(100);
            } catch (InterruptedException e) {
                //sleep方法由于中断而抛出异常之后，线程的中断标志会被清除（置为false）
                // 所以在异常中需要执行this.interrupt()方法，将中断标志位置为true
                this.interrupt();
                e.printStackTrace();
            }
            if (this.isInterrupted()) {
                System.out.println("我要退出了!");
                break;
            }
        }
    }
};
```

### 等待和通知

**为了支持多线程之间的协作，JDK提供了两个非常重要的方法：等待wait()方法和通知notify()方法。**

```java
public final void wait() throws InterruptedException;
public final void wait(long timeout, int nanos) throws InterruptedException;
public final native void wait(long timeout) throws InterruptedException;
public final native void notify();
public final native void notifyAll();
```

注意：被等待的线程执行完毕之后，系统自动会调用该线程的notifyAll()方法。所以一般情况下，我们不要去在线程对象上使用wait()、notify()、notifyAll()方法。

**Object.wait()方法和Thread.sleep()方法的区别？**

都可以让现场等待若干时间。除wait()方法可以被唤醒外，另外一个主要的区别就是wait()方法会释放目标对象的锁，而Thread.sleep()方法不会释放锁。

### 挂起和继续执行

**Thread类中还有2个方法，即线程挂起(~~suspend~~)和继续执行(~~resume~~)，不推荐使用的原因？**

系统不推荐使用~~suspend()~~方法去挂起线程是因为~~suspend()~~方法导致线程暂停的同时，并不会释放任何锁资源。而且，对于被挂起的线程，从它线程的状态上看，居然还是`Runnable`状态，这也会影响我们对系统当前状态的判断。

### 等待线程结束和谦让

```java
public final void join() throws InterruptedException;
/**
* 等待此线程结束最多 millis 毫秒. 超时时间为 0 意味着永久等待。
* 在 {this.isAlive} 条件下循环调用 {this.wait}来实现. 当线程结束
* {this.notifyAll} 方法会被调用. 建议应用程序不要调用Thread实例的 {wait}, {notify}, {notifyAll}
*
* @param  millis 需要等待的毫秒时间
* @throws IllegalArgumentException 如果参数 {millis} 是负数
* @throws InterruptedException  如果任何线程中断了当前线程. 异常抛出后
*/
public final synchronized void join(long millis) throws InterruptedException;
public static native void yield();
```

`Thread.yield()`会让当前线程出让CPU，当前线程在出让CPU后，还会进行CPU资源的争夺，但是能否再抢到CPU的执行权就不一定了。如果觉得一个线程不太重要，或者优先级比较低，而又担心此线程会过多的占用CPU资源，那么可以在适当的时候调用一下Thread.yield()方法，给与其他线程更多的机会。

## 第8天:线程组

我们可以把线程归属到某个线程组中，线程组可以包含多个线程以及线程组，线程和线程组组成了父子关系，是个树形结构。

### 为线程组指定父线程组

threadGroup1未指定父线程组，系统获取了主线程的线程组作为threadGroup1的父线程组，输出结果中是：main
threadGroup1为threadGroup2的父线程组
threadGroup1活动线程数为4，包含了threadGroup1线程组中的t1、t2，以及子线程组threadGroup2中的t3、t4
线程组的list()方法，将线程组中的所有子孙节点信息输出到控制台，用于调试使用

### 根线程组

主线程的线程组为main
根线程组为system

### 批量停止线程

调用线程组interrupt()，会将线程组树下的所有子孙线程中断标志置为true，可以用来批量中断线程。

## 第9天:用户线程和守护线程

1. java中的线程分为用户线程和守护线程
2. 程序中的所有的用户线程结束之后，不管守护线程处于什么状态，java虚拟机都会自动退出
3. 调用线程的实例方法setDaemon()来设置线程是否是守护线程
4. setDaemon()方法必须在线程的start()方法之前调用，在后面调用会报异常，并且不起效
5. 线程的daemon默认值和其父线程一样

## 第10天:线程安全和synchronized关键字

### 什么是线程安全？

造成线程安全问题的主要诱因有两点：

1. 一是存在共享数据(也称临界资源)
2. 二是存在多条线程共同操作共享数据

**需要保证同一时刻有且只有一个线程在操作共享数据**，其他线程必须等到该线程处理完数据后再进行，这种方式有个高尚的名称叫**互斥锁**

**关键字 synchronized可以保证在同一个时刻，只有一个线程可以执行某个方法或者某个代码块(主要是对方法或者代码块中存在共享数据的操作)**，**同时我们还应该注意到synchronized另外一个重要的作用，synchronized可保证一个线程的变化(主要是共享数据的变化)被其他线程所看到（保证可见性，完全可以替代volatile功能）**

synchronized主要有3种使用方式：

1. 修饰实例方法，作用于当前实例，进入同步代码前需要先获取实例的锁
2. 修饰静态方法，作用于类的Class对象，进入修饰的静态方法前需要先获取类的Class对象的锁
3. 修饰代码块，需要指定加锁对象(记做lockobj)，在进入同步代码块前需要先获取lockobj的锁

### synchronized可以确保变量的可见性

## 第11天:线程中断的几种方式

- 通过一个变量控制线程中断
- 通过线程自带的中断标志控制
- 线程阻塞状态中的中断

## 第12天JUC:ReentrantLock重入锁

1. 可重入锁：可重入锁是指同一个线程可以多次获得同一把锁；ReentrantLock和关键字Synchronized都是可重入锁
2. 可中断锁：可中断锁时只线程在获取锁的过程中，是否可以相应线程中断操作。synchronized是不可中断的，ReentrantLock是可中断的
3. 公平锁和非公平锁：公平锁是指多个线程尝试获取同一把锁的时候，获取锁的顺序按照线程到达的先后顺序获取，而不是随机插队的方式获取。synchronized是非公平锁，而ReentrantLock是两种都可以实现，不过默认是非公平锁

ReentrantLock的使用过程：

1. 创建锁：ReentrantLock lock = new ReentrantLock();
2. 获取锁：lock.lock()
3. 释放锁：lock.unlock();

上面代码需要注意lock.unlock()一定要放在finally中，否则，若程序出现了异常，锁没有释放，那么其他线程就再也没有机会获取这个锁了。

关于lock()有几点需要注意：

1. lock()方法和unlock()方法需要成对出现，锁了几次，也要释放几次，否则后面的线程无法获取锁了；可以将add中的unlock删除一个试试，上面代码运行将无法结束
2. unlock()方法放在finally中执行，保证不管程序是否有异常，锁必定会释放

关于lockInterruptibly()注意几点:

1. ReentrankLock中必须使用实例方法lockInterruptibly()获取锁时，在线程调用interrupt()方法之后，才会引发InterruptedException异常
2. 线程调用interrupt()之后，线程的中断标志会被置为true
3. 触发InterruptedException异常之后，线程的中断标志有会被清空，即置为false
4. 所以当线程调用interrupt()引发InterruptedException异常，中断标志的变化是:false->true->false

关于tryLock()方法和tryLock(long timeout, TimeUnit unit)方法，说明一下：

1. 都会返回boolean值，结果表示获取锁是否成功

2. tryLock()方法，不管是否获取成功，都会立即返回；

   而有参的tryLock方法会尝试在指定的时间内去获取锁，中间会阻塞的现象，在指定的时间之后会不管是否能够获取锁都会返回结果

3. tryLock()方法不会响应线程的中断方法；而有参的tryLock方法会响应线程的中断方法，而出发`InterruptedException`异常，这个从2个方法的声明上可以可以看出来

## 获取锁的4中方法对比

| 获取锁的方法                         | 是否立即响应(不会阻塞) | 是否响应中断 |
| ------------------------------------ | ---------------------- | ------------ |
| lock()                               | ×                      | ×            |
| tryLock()                            | √                      | ×            |
| tryLock(long timeout, TimeUnit unit) | ×                      | √            |
| lockInterruptibly()                  | ×                      | √            |

## 第13天:JUC中的Condition对象

从整体上来看**Object的wait和notify/notify是与对象监视器配合完成线程间的等待/通知机制，而Condition与Lock配合完成等待通知机制，前者是java底层级别的，后者是语言级别的，具有更高的可控制性和扩展性**。两者除了在使用方式上不同外，在**功能特性**上还是有很多的不同：

1. Condition能够支持不响应中断，而通过使用Object方式不支持
2. Condition能够支持多个等待队列（new 多个Condition对象），而Object方式只能支持一个
3. Condition能够支持超时时间的设置，而Object不支持

Condition由ReentrantLock对象创建，并且可以同时创建多个，Condition接口在使用前必须先调用ReentrantLock的lock()方法获得锁，之后调用Condition接口的await()将释放锁，并且在该Condition上等待，直到有其他线程调用Condition的signal()方法唤醒线程，使用方式和wait()、notify()类似。

Condition接口提供的常用方法有：

1. void await() throws InterruptedException:当前线程进入等待状态，如果其他线程调用condition的signal或者signalAll方法并且当前线程获取Lock从await方法返回，如果在等待状态中被中断会抛出被中断异常；
2. long awaitNanos(long nanosTimeout)：当前线程进入等待状态直到被通知，中断或者**超时**；
3. boolean await(long time, TimeUnit unit) throws InterruptedException：同第二种，支持自定义时间单位，false：表示方法超时之后自动返回的，true：表示等待还未超时时，await方法就返回了（超时之前，被其他线程唤醒了）
4. boolean awaitUntil(Date deadline) throws InterruptedException：当前线程进入等待状态直到被通知，中断或者**到了某个时间**
5. void awaitUninterruptibly();：当前线程进入等待状态，不会响应线程中断操作，只能通过唤醒的方式让线程继续
6. void signal()：唤醒一个等待在condition上的线程，将该线程从**等待队列**中转移到**同步队列**中，如果在同步队列中能够竞争到Lock则可以从等待方法中返回。
7. void signalAll()：与1的区别在于能够唤醒所有等待在condition上的线程

### Object的监视器方法与Condition接口的对比

| 对比项                                     | Object 监视器方法           | Condition                                                    |
| ------------------------------------------ | --------------------------- | ------------------------------------------------------------ |
| 前置条件                                   | 获取对象的锁                | 调用Lock.lock获取锁，调用Lock.newCondition()获取Condition对象 |
| 调用方式                                   | 直接调用，如：object.wait() | 直接调用，如：condition.await()                              |
| 等待队列个数                               | 一个                        | 多个，使用多个condition实现                                  |
| 当前线程释放锁并进入等待状态               | 支持                        | 支持                                                         |
| 当前线程释放锁进入等待状态中不响应中断     | 不支持                      | 支持                                                         |
| 当前线程释放锁并进入超时等待状态           | 支持                        | 支持                                                         |
| 当前线程释放锁并进入等待状态到将来某个时间 | 不支持                      | 支持                                                         |
| 唤醒等待队列中的一个线程                   | 支持                        | 支持                                                         |
| 唤醒等待队列中的全部线程                   | 支持                        | 支持                                                         |

### 总结

1. 使用condition的步骤：创建condition对象，获取锁，然后调用condition的方法
2. 一个ReentrantLock支持床多个condition对象
3. `void await() throws InterruptedException;`方法会释放锁，让当前线程等待，支持唤醒，支持线程中断
4. `void awaitUninterruptibly();`方法会释放锁，让当前线程等待，支持唤醒，不支持线程中断
5. `long awaitNanos(long nanosTimeout) throws InterruptedException;`参数为纳秒，此方法会释放锁，让当前线程等待，支持唤醒，支持中断。超时之后返回的，结果为负数；超时之前返回的，结果为正数（表示返回时距离超时时间相差的纳秒数）
6. `boolean await(long time, TimeUnit unit) throws InterruptedException;`方法会释放锁，让当前线程等待，支持唤醒，支持中断。超时之后返回的，结果为false；超时之前返回的，结果为true
7. `boolean awaitUntil(Date deadline) throws InterruptedException;`参数表示超时的截止时间点，方法会释放锁，让当前线程等待，支持唤醒，支持中断。超时之后返回的，结果为false；超时之前返回的，结果为true
8. `void signal();`会唤醒一个等待中的线程，然后被唤醒的线程会被加入同步队列，去尝试获取锁
9. `void signalAll();`会唤醒所有等待中的线程，将所有等待中的线程加入同步队列，然后去尝试获取锁

## 第14天：JUC中的LockSupport工具类，必备技能

**Object和Condition的局限性：**

关于Object和Condtion中线程等待和唤醒的局限性，有以下几点：

1. 2中方式中的让线程等待和唤醒的方法能够执行的先决条件是：线程需要先获取锁
2. 唤醒方法需要在等待方法之后调用，线程才能够被唤醒

关于这2点，LockSupport都不需要，就能实现线程的等待和唤醒。下面我们来说一下LockSupport类。

**LockSupport类可以阻塞当前线程以及唤醒指定被阻塞的线程。主要是通过park()和unpark(thread)方法来实现阻塞和唤醒线程的操作的：**

1. 每个线程都有一个许可(permit)，**permit只有两个值1和0**，默认是0。
2. 当调用unpark(thread)方法，就会将thread线程的许可permit设置成1(**注意多次调用unpark方法，不会累加，permit值还是1**)。
3. 当调用park()方法，如果当前线程的permit是1，那么将permit设置为0，并立即返回。如果当前线程的permit是0，那么当前线程就会阻塞，直到别的线程将当前线程的permit设置为1时，park方法会被唤醒，然后会将permit再次设置为0，并返回。

> 注意：因为permit默认是0，所以一开始调用park()方法，线程必定会被阻塞。调用unpark(thread)方法后，会自动唤醒thread线程，即park方法立即返回。

**LockSupport.park方法让线程等待之后，唤醒方式有2种：**

1. 调用LockSupport.unpark方法
2. 调用等待线程的`interrupt()`方法，给等待的线程发送中断信号，可以唤醒线程

线程等待和唤醒的3种方式做个对比：

**到目前为止，已经说了3种让线程等待和唤醒的方法了：**

1. 方式1：Object中的wait、notify、notifyAll方法
2. 方式2：juc中Condition接口提供的await、signal、signalAll方法
3. 方式3：juc中的LockSupport提供的park、unpark方法

|                                        | Object                   | Condtion           | LockSupport |
| -------------------------------------- | ------------------------ | ------------------ | ----------- |
| 前置条件                               | 需要在synchronized中运行 | 需要先获取Lock的锁 | 无          |
| 无限等待                               | 支持                     | 支持               | 支持        |
| 超时等待                               | 支持                     | 支持               | 支持        |
| 等待到将来某个时间返回                 | 不支持                   | 支持               | 支持        |
| 等待状态中释放锁                       | 会释放                   | 会释放             | 不会释放    |
| 唤醒方法先于等待方法执行，能否唤醒线程 | 否                       | 否                 | 可以        |
| 是否能响应线程中断                     | 是                       | 是                 | 是          |
| 线程中断是否会清除中断标志             | 是                       | 是                 | 否          |
| 是否支持等待状态中不响应中断           | 不支持                   | 支持               | 不支持      |

## 第15天：JUC中的Semaphore，最简单的限流工具类，必备技能

信号量可以控制有多少个线程可以同时访问特定的资源。

Semaphore主要方法：

- **Semaphore(int permits)**：构造方法，参数表示许可证数量，用来创建信号量
- **Semaphore(int permits,boolean fair)**：构造方法，当fair等于true时，创建具有给定许可数的计数信号量并设置为公平信号量
- **void acquire() throws InterruptedException**：从此信号量获取1个许可前线程将一直阻塞，相当于一辆车占了一个车位，此方法会响应线程中断，表示调用线程的interrupt方法，会使该方法抛出InterruptedException异常
- **void acquire(int permits) throws InterruptedException** ：和acquire()方法类似，参数表示需要获取许可的数量；比如一个大卡车要入停车场，由于车比较大，需要申请3个车位才可以停放
- **void acquireUninterruptibly(int permits)** ：和acquire(int permits) 方法类似，只是不会响应线程中断
- **boolean tryAcquire()**：尝试获取1个许可，不管是否能够获取成功，都立即返回，true表示获取成功，false表示获取失败
- **boolean tryAcquire(int permits)**：和tryAcquire()，表示尝试获取permits个许可
- **boolean tryAcquire(long timeout, TimeUnit unit) throws InterruptedException**：尝试在指定的时间内获取1个许可，获取成功返回true，指定的时间过后还是无法获取许可，返回false
- **boolean tryAcquire(int permits, long timeout, TimeUnit unit) throws InterruptedException**：和tryAcquire(long timeout, TimeUnit unit)类似，多了一个permits参数，表示尝试获取permits个许可
- **void release()**：释放一个许可，将其返回给信号量，相当于车从停车场出去时将钥匙归还给门卫
- **void release(int n)**：释放n个许可
- **int availablePermits()**：当前可用的许可数

其他一些使用说明：

1. Semaphore默认创建的是非公平的信号量。
2. 获取信号量成功后才需要释放。
3. 方法中带有`throws InterruptedException`声明的，表示这个方法会响应线程中断信号，什么意思？表示调用线程的`interrupt()`方法，会让这些方法触发`InterruptedException`异常，即使这些方法处于阻塞状态，也会立即返回，并抛出`InterruptedException`异常，线程中断信号也会被清除。

## 第16天：JUC中等待多线程完成的工具类CountDownLatch，必备技能

可以看一下join的源码，内部其实是在synchronized方法中调用了线程的wait方法，最后被调用的线程执行完毕之后，由jvm自动调用其notifyAll()方法，唤醒所有等待中的线程。这个notifyAll()方法是由jvm内部自动调用的，jdk源码中是看不到的，需要看jvm源码，有兴趣的同学可以去查一下。所以JDK不推荐在线程上调用wait、notify、notifyAll方法。

而在JDK1.5之后的并发包中提供的CountDownLatch也可以实现join的这个功能。

**CountDownLatch使用步骤：**

1. 创建CountDownLatch对象
2. 调用其实例方法`await()`，让当前线程等待
3. 调用`countDown()`方法，让计数器减1
4. 当计数器变为0的时候，`await()`方法会返回

## 第17天：JUC中的循环栅栏CyclicBarrier常见的6种使用场景及代码示例

CyclicBarrier通常称为循环屏障。它和CountDownLatch很相似，都可以使线程先等待然后再执行。不过CountDownLatch是使一批线程等待另一批线程执行完后再执行；而CyclicBarrier只是使等待的线程达到一定数目后再让它们继续执行。

CyclicBarrier还有几点需要注意的地方:

- CyclicBarrier的计数器可以重置而CountDownLatch不行，这意味着CyclicBarrier实例可以被重复使用而CountDownLatch只能被使用一次。而这也是循环屏障循环二字的语义所在。
- CyclicBarrier允许用户自定义barrierAction操作，这是个可选操作，可以在创建CyclicBarrier对象时指定

> CyclicBarrier内部相当于有个计数器（构造方法传入的），每次调用`await();`后，计数器会减1，并且await()方法会让当前线程阻塞，等待计数器减为0的时候，所有在await()上等待的线程被唤醒，然后继续向下执行，此时计数器又会被还原为创建时的值，然后可以继续再次使用。

**结论：**

1. **内部有一个人把规则破坏了（接收到中断信号），其他人都不按规则来了，不会等待了**
2. **接收到中断信号的线程，await方法会触发InterruptedException异常，然后被唤醒向下运行**
3. **其他等待中 或者后面到达的线程，会在await()方法上触发`BrokenBarrierException`异常，然后继续执行**

## 第18天：玩转java线程池，这一篇就够了

`java.util.concurrent.ThreadPoolExecutor`，主要构造方法参数：

**corePoolSize**：核心线程大小，当提交一个任务到线程池时，线程池会创建一个线程来执行任务，即使有其他空闲线程可以处理任务也会创新线程，等到工作的线程数大于核心线程数时就不会在创建了。如果调用了线程池的`prestartAllCoreThreads`方法，线程池会提前把核心线程都创造好，并启动

**maximumPoolSize**：线程池允许创建的最大线程数。如果队列满了，并且以创建的线程数小于最大线程数，则线程池会再创建新的线程执行任务。如果我们使用了无界队列，那么所有的任务会加入队列，这个参数就没有什么效果了

**keepAliveTime**：线程池的工作线程空闲后，保持存活的时间。如果没有任务处理了，有些线程会空闲，空闲的时间超过了这个值，会被回收掉。如果任务很多，并且每个任务的执行时间比较短，避免线程重复创建和回收，可以调大这个时间，提高线程的利用率

**unit**：keepAliveTIme的时间单位，可以选择的单位有天、小时、分钟、毫秒、微妙、千分之一毫秒和纳秒。类型是一个枚举`java.util.concurrent.TimeUnit`，这个枚举也经常使用，有兴趣的可以看一下其源码

**workQueue**：工作队列，用于缓存待处理任务的阻塞队列，常见的有4种，本文后面有介绍

**threadFactory**：线程池中创建线程的工厂，可以通过线程工厂给每个创建出来的线程设置更有意义的名字

**handler**：饱和策略，当线程池无法处理新来的任务了，那么需要提供一种策略处理提交的新任务，默认有4种策略，文章后面会提到

**调用线程池的execute方法处理任务，执行execute方法的过程：**

1. 判断线程池中运行的线程数是否小于corepoolsize，是：则创建新的线程来处理任务，否：执行下一步
2. 试图将任务添加到workQueue指定的队列中，如果无法添加到队列，进入下一步
3. 判断线程池中运行的线程数是否小于`maximumPoolSize`，是：则新增线程处理当前传入的任务，否：将任务传递给`handler`对象`rejectedExecution`方法处理

**线程池中的2个关闭方法：**

调用`shutdown`方法之后，线程池将不再接口新任务，内部会将所有已提交的任务处理完毕，处理完毕之后，工作线程自动退出。

而调用`shutdownNow`方法后，线程池会将还未处理的（在队里等待处理的任务）任务移除，将正在处理中的处理完毕之后，工作线程自动退出。

**扩展线程池：**

`ThreadPoolExecutor`内部提供了几个方法`beforeExecute`、`afterExecute`、`terminated`，可以由开发人员自己去这些方法。

合理地配置线程池：

Java Concurrency inPractice书中给出了估算线程池大小的公式：

```java
Ncpu = CUP的数量
Ucpu = 目标CPU的使用率，0<=Ucpu<=1
W/C = 等待时间与计算时间的比例
为保存处理器达到期望的使用率，最有的线程池的大小等于：
Nthreads = Ncpu × Ucpu × (1+W/C)
```

1. **线程池中的所有线程超过了空闲时间都会被销毁么？**

   如果allowCoreThreadTimeOut为true，超过了空闲时间的所有线程都会被回收，不过这个值默认是false，系统会保留核心线程，其他的会被回收

2. **空闲线程是如何被销毁的？**

   所有运行的工作线程会尝试从队列中获取任务去执行，超过一定时间（keepAliveTime）还没有拿到任务，自己主动退出

3. **核心线程在线程池创建的时候会初始化好么？**

   默认情况下，核心线程不会进行初始化，在刚开始调用线程池执行任务的时候，传入一个任务会创建一个线程，直到达到核心线程数。不过可以在创建线程池之后，调用其`prestartAllCoreThreads`提前将核心线程创建好。

## 第19天：JUC中的Executor框架详解1

**Executors框架包括：**

- Executor
- ExecutorService
- ThreadPoolExecutor
- Executors
- Future
- Callable
- FutureTask
- CompletableFuture
- CompletionService
- ExecutorCompletionService

ExecutorService有三种状态：运行、关闭、终止。创建后便进入运行状态，当调用了shutdown()方法时，便进入了关闭状态，此时意味着ExecutorService不再接受新的任务，但是他还是会执行已经提交的任务，当所有已经提交了的任务执行完后，便达到终止状态。如果不调用shutdown方法，ExecutorService方法会一直运行下去，系统一般不会主动关闭。

假设系统调用scheduleAtFixedRate的时间是T1，那么执行时间如下：

第1次：T1+initialDelay，执行结束时间：E1

第2次：E1+period，执行结束时间：E2

第3次：E2+period，执行结束时间：E3

第4次：E3+period，执行结束时间：E4

第n次：上次执行结束时间+period

**定时任务有异常会怎么样？**

发生异常之后没有任何现象，被ScheduledExecutorService内部给吞掉了，然后这个任务再也不会执行了，`scheduledFuture.isDone()`输出true，表示这个任务已经结束了，再也不会被执行了。

## 第20天：JUC中的Executor框架详解2之ExecutorCompletionService

CompletionService相当于一个执行任务的服务，通过submit丢任务给这个服务，服务内部去执行任务，可以通过服务提供的一些方法获取服务中已经完成的任务。

ExecutorCompletionService类是CompletionService接口的具体实现。

说一下其内部原理，ExecutorCompletionService创建的时候会传入一个线程池，调用submit方法传入需要执行的任务，任务由内部的线程池来处理；ExecutorCompletionService内部有个阻塞队列，任意一个任务完成之后，会将任务的执行结果（Future类型）放入阻塞队列中，然后其他线程可以调用它take、poll方法从这个阻塞队列中获取一个已经完成的任务，获取任务返回结果的顺序和任务执行完成的先后顺序一致，所以最先完成的任务会先返回。

ExecutorCompletionService提供了获取一批任务中最先完成的任务结果的能力。

## 第21天：java中的CAS操作，java并发的基石

系统底层进行CAS操作的时候，会判断当前系统是否为多核系统，如果是就给总线加锁，只有一个线程会对总线加锁成功，加锁成功之后会执行cas操作，也就是说CAS的原子性实际上是CPU实现的， 其实在这一点上还是有排他锁的.，只是比起用synchronized， 这里的排他时间要短的多， 所以在多线程情况下性能会比较好。

CAS需要在操作值的时候检查下值有没有发生变化，如果没有发生变化则更新，但是如果一个值原来是A，变成了B，又变成了A，那么使用CAS进行检查时会发现它的值没有发生变化，但是实际上却变化了。这就是CAS的ABA问题。 常见的解决思路是使用版本号。在变量前面追加上版本号，每次变量更新的时候把版本号加一，那么A-B-A 就会变成1A-2B-3A。 目前在JDK的atomic包里提供了一个类AtomicStampedReference来解决ABA问题。这个类的compareAndSet方法作用是首先检查当前引用是否等于预期引用，并且当前标志是否等于预期标志，如果全部相等，则以原子方式将该引用和该标志的值设置为给定的更新值。

## 第22天：java中底层工具类Unsafe，高手必须要了解

Unsafe类方法：

- CAS
- 数组相关
  - 返回数组元素内存大小
  - 返回数组首元素偏移地址
- 内存屏障
  - 禁止Load，Store重排序
- 内存操作
  - 分配、拷贝、释放堆外内存
  - 设置、获得给定地址中的值
- 系统相关
  - 返回内存页大小
  - 返回系统指针大小
- 线程调度
  - 线程挂起恢复
  - 获取、释放锁
- Class相关
  - 动态创建类（普通类、匿名类）
  - 获取field的内存地址偏移
  - 检测、确保类初始化
- 对象操作
  - 获取对象成员属性内存偏移量
  - 非常规对象实例化
    - 存储、获取指定偏移地址的变量值（包含延迟生效、volatile语义）

### CAS操作相关方法

```
public final native boolean compareAndSwapInt(Object o, long offset, int expected,int update);
public final native boolean compareAndSwapLong(Object o, long offset, long expected, long update);
public final native boolean compareAndSwapObject(Object o, long offset, Object expected, Object update);
```

> Unsafe提供的CAS方法（如compareAndSwapXXX）底层实现即为CPU指令cmpxchg。执行cmpxchg指令的时候，会判断当前系统是否为多核系统，如果是就给总线加锁，只有一个线程会对总线加锁成功，加锁成功之后会执行cas操作，也就是说CAS的原子性实际上是CPU实现的， 其实在这一点上还是有排他锁的，只是比起用synchronized， 这里的排他时间要短的多， 所以在多线程情况下性能会比较好。
>
> 说一下offset，offeset为字段的偏移量，每个对象有个地址，offset是字段相对于对象地址的偏移量，对象地址记为baseAddress，字段偏移量记为offeset，那么字段对应的实际地址就是baseAddress+offeset，所以cas通过对象、偏移量就可以去操作字段对应的值了。

### 原子操作相关方法

```
public final int getAndAddInt(Object o, long offset, int delta);
public final long getAndAddLong(Object o, long offset, long delta);
public final int getAndSetInt(Object o, long offset, int newValue);
public final long getAndSetLong(Object o, long offset, long newValue);
public final Object getAndSetObject(Object o, long offset, Object newValue);
```

### 线程调度相关方法

```
public native void unpark(Object thread);
public native void park(boolean isAbsolute, long time);
@Deprecated public native void monitorEnter(Object o);
@Deprecated public native void monitorExit(Object o);
@Deprecated public native boolean tryMonitorEnter(Object o);
```

> 被关键字volatile修饰的数据，有2点语义：
>
> 1. 如果一个变量被volatile修饰，读取这个变量时候，会强制从主内存中读取，然后将其复制到当前线程的工作内存中使用
> 2. 给volatile修饰的变量赋值的时候，会强制将赋值的结果从工作内存刷新到主内存
>
> 上面2点语义保证了被volatile修饰的数据在多线程中的可见性。

### 保证变量的可见性

```
public native void  putIntVolatile(Object o, long offset, int x);
public native int getIntVolatile(Object o, long offset);
```

### Class相关方法

```
//获取给定静态字段的内存地址偏移量，这个值对于给定的字段是唯一且固定不变的
public native long staticFieldOffset(Field f);
//获取一个静态类中给定字段的对象指针
public native Object staticFieldBase(Field f);
//判断是否需要初始化一个类，通常在获取一个类的静态属性的时候（因为一个类如果没初始化，它的静态属性也不会初始化）使用。 当且仅当ensureClassInitialized方法不生效时返回false。
public native boolean shouldBeInitialized(Class<?> c);
//检测给定的类是否已经初始化。通常在获取一个类的静态属性的时候（因为一个类如果没初始化，它的静态属性也不会初始化）使用。
public native void ensureClassInitialized(Class<?> c);
//定义一个类，此方法会跳过JVM的所有安全检查，默认情况下，ClassLoader（类加载器）和ProtectionDomain（保护域）实例来源于调用者
public native Class<?> defineClass(String name, byte[] b, int off, int len, ClassLoader loader, ProtectionDomain protectionDomain);
//定义一个匿名类
public native Class<?> defineAnonymousClass(Class<?> hostClass, byte[] data, Object[] cpPatches);
```

### 对象操作的其他方法

```
//返回对象成员属性在内存地址相对于此对象的内存地址的偏移量
public native long objectFieldOffset(Field f);
//获得给定对象的指定地址偏移量的值，与此类似操作还有：getInt，getDouble，getLong，getChar等
public native Object getObject(Object o, long offset);
//给定对象的指定地址偏移量设值，与此类似操作还有：putInt，putDouble，putLong，putChar等
public native void putObject(Object o, long offset, Object x);
//从对象的指定偏移量处获取变量的引用，使用volatile的加载语义
public native Object getObjectVolatile(Object o, long offset);
//存储变量的引用到对象的指定的偏移量处，使用volatile的存储语义
public native void putObjectVolatile(Object o, long offset, Object x);
//有序、延迟版本的putObjectVolatile方法，不保证值的改变被其他线程立即看到，只有在field被volatile修饰符修饰时有效
public native void putOrderedObject(Object o, long offset, Object x);
//绕过构造方法、初始化代码来创建对象
public native Object allocateInstance(Class<?> cls) throws InstantiationException;
```

### 数组相关的一些方法

```
//返回数组中第一个元素的偏移地址
public native int arrayBaseOffset(Class<?> arrayClass);
//返回数组中一个元素占用的大小
public native int arrayIndexScale(Class<?> arrayClass);
```

### 内存屏障相关操作

```
//内存屏障，禁止load操作重排序。屏障前的load操作不能被重排序到屏障后，屏障后的load操作不能被重排序到屏障前
public native void loadFence();
//内存屏障，禁止store操作重排序。屏障前的store操作不能被重排序到屏障后，屏障后的store操作不能被重排序到屏障前
public native void storeFence();
//内存屏障，禁止load、store操作重排序
public native void fullFence();
```

## 第23天：JUC中原子类，一篇就够了

### 基本类型原子类

- AtomicInteger
- AtomicLong
- AtomicBoolean

AtomicInteger 类常用方法：

```java
public final int get() //获取当前的值
public final int getAndSet(int newValue)//获取当前的值，并设置新的值
public final int getAndIncrement()//获取当前的值，并自增
public final int getAndDecrement() //获取当前的值，并自减
public final int getAndAdd(int delta) //获取当前的值，并加上预期的值
boolean compareAndSet(int expect, int update) //如果输入的数值等于预期值，则以原子方式将该值设置为输入值（update）
public final void lazySet(int newValue)//最终设置为newValue,使用 lazySet 设置之后可能导致其他线程在之后的一小段时间内还是可以读到旧的值。
```

### 数组类型原子类

- AtomicIntegerArray
- AtomicLongArray
- AtomicReferenceArray

AtomicIntegerArray 类常用方法：

```java
public final int get(int i) //获取 index=i 位置元素的值
public final int getAndSet(int i, int newValue)//返回 index=i 位置的当前的值，并将其设置为新值：newValue
public final int getAndIncrement(int i)//获取 index=i 位置元素的值，并让该位置的元素自增
public final int getAndDecrement(int i) //获取 index=i 位置元素的值，并让该位置的元素自减
public final int getAndAdd(int delta) //获取 index=i 位置元素的值，并加上预期的值
boolean compareAndSet(int expect, int update) //如果输入的数值等于预期值，则以原子方式将 index=i 位置的元素值设置为输入值（update）
public final void lazySet(int i, int newValue)//最终 将index=i 位置的元素设置为newValue,使用 lazySet 设置之后可能导致其他线程在之后的一小段时间内还是可以读到旧的值。
```

## 第24天：ThreadLocal、InheritableThreadLocal（通俗易懂）

略

## 第25天：掌握JUC中的阻塞队列

BlockingQueue常见的实现类：

- ArrayBlockingQueue
- LinkedBlockingQueue
- PriorityBlockingQueue
- SynchronousQueue
- DelayQueue
- LinkedTransferQueue

## 第26篇：学会使用JUC中常见的集合，常看看！

| 集合类                | 特性                                           |
| --------------------- | ---------------------------------------------- |
| ConcurrentHashMap     | 内部使用红黑树实现的                           |
| ConcurrentSkipListMap | 内部使用跳表实现的，放入的元素会进行排序       |
| ConcurrentSkipListSet | 有序的Set，内部基于ConcurrentSkipListMap实现的 |
| CopyOnWriteArrayList  | 元素不重复                                     |
| CopyOnWriteArraySet   | 内部使用CopyOnWriteArrayList实现的             |
| ConcurrentLinkedQueue |                                                |
| ConcurrentLinkedDeque |                                                |

### Deque接口

双向队列是指该队列两端的元素既能入队(offer)也能出队(poll)：

- 如果将Deque限制为只能从一端入队和出队，则可实现栈的数据结构。

- 在将双端队列用作队列时，将得到 FIFO（先进先出）行为。

下表总结了上述 12 种方法：

|          | 头部            | 头部            | 尾部           | 尾部           |
| -------- | --------------- | --------------- | -------------- | -------------- |
|          | *抛出异常*      | *特殊值*        | *抛出异常*     | *特殊值*       |
| **插入** | `addFirst(e)`   | `offerFirst(e)` | `addLast(e)`   | `offerLast(e)` |
| **移除** | `removeFirst()` | `pollFirst()`   | `removeLast()` | `pollLast()`   |
| **检查** | `getFirst()`    | `peekFirst()`   | `getLast()`    | `peekLast()`   |

## 第27天：实战篇，接口性能成倍提升，让同事刮目相看，现学现用

## 第28天：实战篇，微服务日志的伤痛，一并帮你解决掉

## 第29天：高并发中常见的限流方式

### 常见的限流算法

#### 通过控制最大并发数来进行限流

JUC中提供了这样的工具类：Semaphore

#### 使用漏桶算法来进行限流

漏桶算法思路很简单，水（请求）先进入到漏桶里，漏桶以一定的速度出水，当水流入速度过大会直接溢出。可以看出漏桶算法能强行限制数据的传输速率。

#### 使用令牌桶算法来进行限流

令牌桶算法的原理是系统以恒定的速率产生令牌，然后把令牌放到令牌桶中，令牌桶有一个容量，当令牌桶满了的时候，再向其中放令牌，那么多余的令牌会被丢弃；当想要处理一个请求的时候，需要从令牌桶中取出一个令牌，如果此时令牌桶中没有令牌，那么则拒绝该请求。从原理上看，令牌桶算法和漏桶算法是相反的，一个“进水”，一个是“漏水”。这种算法可以应对突发程度的请求，因此比漏桶算法好。

#### 限流工具类RateLimiter

Google开源工具包Guava提供了限流工具类RateLimiter，可以非常方便的控制系统每秒吞吐量。

## 第30天：JUC中工具类CompletableFuture，必备技能

### CompletionStage接口

CompletionStage代表异步计算过程中的某一个阶段，一个阶段完成以后可能会触发另外一个阶段。

### CompletableFuture类

CompletableFuture 提供了四个静态方法来创建一个异步操作：

```java
public static CompletableFuture<Void> runAsync(Runnable runnable);
public static CompletableFuture<Void> runAsync(Runnable runnable, Executor executor);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, Executor executor);
```

当CompletableFuture的计算结果完成，或者抛出异常的时候，可以执行特定的Action。主要是下面的方法：

```java
public CompletableFuture<T> whenComplete(BiConsumer<? super T,? super Throwable> action);
public CompletableFuture<T> whenCompleteAsync(BiConsumer<? super T,? super Throwable> action);
public CompletableFuture<T> whenCompleteAsync(BiConsumer<? super T,? super Throwable> action, Executor executor);
public CompletableFuture<T> exceptionally(Function<Throwable,? extends T> fn);
```

当一个线程依赖另一个线程时，可以使用 thenApply 方法来把这两个线程串行化：

```java
public <U> CompletableFuture<U> thenApply(Function<? super T,? extends U> fn);
public <U> CompletableFuture<U> thenApplyAsync(Function<? super T,? extends U> fn);
public <U> CompletableFuture<U> thenApplyAsync(Function<? super T,? extends U> fn, Executor executor);
```

handle 方法和 thenApply 方法处理方式基本一样。不同的是 handle 还可以处理异常的任务。thenApply 只可以执行正常的任务，任务出现异常则不执行 thenApply 方法：

```java
public <U> CompletionStage<U> handle(BiFunction<? super T, Throwable, ? extends U> fn);
public <U> CompletionStage<U> handleAsync(BiFunction<? super T, Throwable, ? extends U> fn);
public <U> CompletionStage<U> handleAsync(BiFunction<? super T, Throwable, ? extends U> fn,Executor executor);
```

接收任务的处理结果，并消费处理，无返回结果：

```java
public CompletionStage<Void> thenAccept(Consumer<? super T> action);
public CompletionStage<Void> thenAcceptAsync(Consumer<? super T> action);
public CompletionStage<Void> thenAcceptAsync(Consumer<? super T> action,Executor executor);
```

跟 thenAccept 方法不一样的是，不关心任务的处理结果。只要上面的任务执行完成，就开始执行 thenAccept ：

```java
public CompletionStage<Void> thenRun(Runnable action);
public CompletionStage<Void> thenRunAsync(Runnable action);
public CompletionStage<Void> thenRunAsync(Runnable action,Executor executor);
```

thenCombine 会把 两个 CompletionStage 的任务都执行完成后，把两个任务的结果一块交给 thenCombine 来处理：

```java
public <U,V> CompletionStage<V> thenCombine(CompletionStage<? extends U> other,BiFunction<? super T,? super U,? extends V> fn);
public <U,V> CompletionStage<V> thenCombineAsync(CompletionStage<? extends U> other,BiFunction<? super T,? super U,? extends V> fn);
public <U,V> CompletionStage<V> thenCombineAsync(CompletionStage<? extends U> other,BiFunction<? super T,? super U,? extends V> fn,Executor executor);
```

当两个CompletionStage都执行完成后，把结果一块交给thenAcceptBoth来进行消费：

```java
public <U> CompletionStage<Void> thenAcceptBoth(CompletionStage<? extends U> other,BiConsumer<? super T, ? super U> action);
public <U> CompletionStage<Void> thenAcceptBothAsync(CompletionStage<? extends U> other,BiConsumer<? super T, ? super U> action);
public <U> CompletionStage<Void> thenAcceptBothAsync(CompletionStage<? extends U> other,BiConsumer<? super T, ? super U> action, Executor executor);
```

两个CompletionStage，谁执行返回的结果快，我就用那个CompletionStage的结果进行下一步的转化操作：

```java
public <U> CompletionStage<U> applyToEither(CompletionStage<? extends T> other,Function<? super T, U> fn);
public <U> CompletionStage<U> applyToEitherAsync(CompletionStage<? extends T> other,Function<? super T, U> fn);
public <U> CompletionStage<U> applyToEitherAsync(CompletionStage<? extends T> other,Function<? super T, U> fn,Executor executor);
```

两个CompletionStage，谁执行返回的结果快，我就用那个CompletionStage的结果进行下一步的消耗操作：

```java
public CompletionStage<Void> acceptEither(CompletionStage<? extends T> other,Consumer<? super T> action);
public CompletionStage<Void> acceptEitherAsync(CompletionStage<? extends T> other,Consumer<? super T> action);
public CompletionStage<Void> acceptEitherAsync(CompletionStage<? extends T> other,Consumer<? super T> action,Executor executor);
```

两个CompletionStage，任何一个完成了都会执行下一步的操作（Runnable）：

```java
public CompletionStage<Void> runAfterEither(CompletionStage<?> other,Runnable action);
public CompletionStage<Void> runAfterEitherAsync(CompletionStage<?> other,Runnable action);
public CompletionStage<Void> runAfterEitherAsync(CompletionStage<?> other,Runnable action,Executor executor);
```

两个CompletionStage，都完成了才会执行下一步的操作（Runnable）：

```java
public CompletionStage<Void> runAfterBoth(CompletionStage<?> other,Runnable action);
public CompletionStage<Void> runAfterBothAsync(CompletionStage<?> other,Runnable action);
public CompletionStage<Void> runAfterBothAsync(CompletionStage<?> other,Runnable action,Executor executor);
```

thenCompose 方法允许你对两个 CompletionStage 进行流水线操作，第一个操作完成时，将其结果作为参数传递给第二个操作：

```java
public <U> CompletableFuture<U> thenCompose(Function<? super T, ? extends CompletionStage<U>> fn);
public <U> CompletableFuture<U> thenComposeAsync(Function<? super T, ? extends CompletionStage<U>> fn);
public <U> CompletableFuture<U> thenComposeAsync(Function<? super T, ? extends CompletionStage<U>> fn, Executor executor);
```

## 第31天：获取线程执行结果，这6种方法你都知道？

在一个线程中需要获取其他线程的执行结果，能想到几种方式？各有什么优缺点？

### 方式1：Thread的join()方法实现

join的方式，只能阻塞一个线程，如果其他线程中也需要获取thread线程的执行结果，join方法无能为力了。

### 方式2：CountDownLatch实现

使用CountDownLatch可以让一个或者多个线程等待一批线程完成之后，自己再继续；

### 方式3：ExecutorService.submit方法实现

使用`ExecutorService.submit`方法实现的，此方法返回一个`Future`，`future.get()`会让当前线程阻塞，直到Future关联的任务执行完毕。

### 方式4：FutureTask方式1

### 方式5：FutureTask方式2

### 方式6：CompletableFuture方式实现

## 第32天：高并发中计数器的实现方式有哪些？

### 方式1：synchronized方式实现

### 方式2：AtomicLong实现

### 方式3：LongAdder实现

LongAdder在并发量比较大的情况下，操作数据的时候，相当于把这个数字分成了很多份数字，然后交给多个人去管控，每个管控者负责保证部分数字在多线程情况下操作的正确性。当多线程访问的时，通过hash算法映射到具体管控者去操作数据，最后再汇总所有的管控者的数据，得到最终结果。相当于降低了并发情况下锁的粒度，所以效率比较高。

### 方式4：LongAccumulator实现

LongAccumulator是LongAdder的功能增强版。LongAdder的API只有对数值的加减，而LongAccumulator提供了自定义的函数操作。

## 参考

[
第1天:必须知道的几个概念](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933019&idx=1&sn=3455877c451de9c61f8391ffdc1eb01d&chksm=88621aa5bf1593b377e2f090bf37c87ba60081fb782b2371b5f875e4a6cadc3f92ff6d747e32&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第2天:并发级别](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933024&idx=1&sn=969bfa5e2c3708e04adaf6401503c187&chksm=88621a9ebf1593886dd3f0f5923b6f929eade0b43204b98a8d0622a5f542deff4f6a633a13c8&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第3天:有关并行的两个重要定律](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933041&idx=1&sn=82af7c702f737782118a9141858117d1&chksm=88621a8fbf159399be1d4834f6f845fa530b94a4ca7c0eaa61de508f725ad0fab74b074d73be&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第4天:JMM相关的一些概念](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933050&idx=1&sn=497c4de99086f95bed11a4317a51e6a6&chksm=88621a84bf159392c9e3e243355313c397e0658df6b88769cdd182cb5d39b6f25686c86beffc&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第5天:深入理解进程和线程](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933069&idx=1&sn=82105bb5b759ec8b1f3a69062a22dada&chksm=88621af3bf1593e5ece7c1da3df3b4be575271a2eaca31c784591ed0497252caa1f6a6ec0545&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第6天:线程的基本操作](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933082&idx=1&sn=e940c4f94a8c1527b6107930eefdcd00&chksm=88621ae4bf1593f270991e6f6bac5769ea850fa02f11552d1aa91725f4512d4f1ff8f18fcdf3&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第7天:volatile与Java内存模型](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933088&idx=1&sn=f1d666dd799664b1989c77441b9d12c5&chksm=88621adebf1593c83501ac33d6a0e0de075f2b2e30caf986cf276cbb1c8dff0eac2a0a648b1d&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第8天:线程组](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933095&idx=1&sn=d32242a5ec579f45d1e9becf44bff069&chksm=88621ad9bf1593cf00b574a8e0feeffbb2c241c30b01ebf5749ccd6b7b64dcd2febbd3000581&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第9天：用户线程和守护线程](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933102&idx=1&sn=5255e94dc2649003e01bf3d61762c593&chksm=88621ad0bf1593c6905e75a82aaf6e39a0af338362366ce2860ee88c1b800e52f5c6529c089c&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第10天:线程安全和synchronized关键字](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933107&idx=1&sn=6b9fbdfa180c2ca79703e0ca1b524b77&chksm=88621acdbf1593dba5fa5a0092d810004362e9f38484ffc85112a8c23ef48190c51d17e06223&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第11天:线程中断的几种方式](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933111&idx=1&sn=0a3592e41e59d0ded4a60f8c1b59e82e&chksm=88621ac9bf1593df5f8342514d6750cc8a833ba438aa208cf128493981ba666a06c4037d84fb&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第12天JUC:ReentrantLock重入锁](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933116&idx=1&sn=83ae2d1381e3b8a425e65a9fa7888d38&chksm=88621ac2bf1593d4de1c5f6905c31c7d88ac4b53c0c5c071022ba2e25803fc734078c1de589c&token=2041017112&lang=zh_CN&scene=21#wechat_redirect)

[第13天:JUC中的Condition对象](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933120&idx=1&sn=63ffe3ff64dcaf0418816febfd1e129a&chksm=88621b3ebf159228df5f5a501160fafa5d87412a4f03298867ec9325c0be57cd8e329f3b5ad1&token=476165288&lang=zh_CN&scene=21#wechat_redirect)

[第14天:JUC中的LockSupport工具类，必备技能](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933125&idx=1&sn=382528aeb341727bafb02bb784ff3d4f&chksm=88621b3bbf15922d93bfba11d700724f1e59ef8a74f44adb7e131a4c3d1465f0dc539297f7f3&token=1338873010&lang=zh_CN&scene=21#wechat_redirect)

[第15天：JUC中的Semaphore（信号量）](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933130&idx=1&sn=cecc6bd906e79a86510c1fbb0e66cd21&chksm=88621b34bf159222042da8ed4b633e94ca04a614d290d54a952a668459a339ebec0c754d562d&token=702505185&lang=zh_CN&scene=21#wechat_redirect)

[第16天：JUC中等待多线程完成的工具类CountDownLatch，必备技能](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933134&idx=1&sn=65c2b9982bb6935c54ff33082f9c111f&chksm=88621b30bf159226d41607292a1dc83186f8928744dbc44acfda381266fa2cdc006177b44095&token=773938509&lang=zh_CN&scene=21#wechat_redirect)

[第17天：JUC中的循环栅栏CyclicBarrier的6种使用场景](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933144&idx=1&sn=7f0cddc92ff39835ea6652ebb3186dbf&chksm=88621b26bf15923039933b127c19f39a76214fb1d5daa7ad0eee77f961e2e3ab5f5ca3f48740&token=773938509&lang=zh_CN&scene=21#wechat_redirect)

[第18天：JAVA线程池，这一篇就够了](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933151&idx=1&sn=2020066b974b5f4c0823abd419e8adae&chksm=88621b21bf159237bdacfb47bd1a344f7123aabc25e3607e78d936dd554412edce5dd825003d&token=995072421&lang=zh_CN&scene=21#wechat_redirect)

[第19天：JUC中的Executor框架详解1](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933156&idx=1&sn=30f7d67b44a952eae98e688bc6035fbd&chksm=88621b1abf15920c7a0705fbe34c4ce92b94b88e08f8ecbcad3827a0950cfe4d95814b61f538&token=995072421&lang=zh_CN&scene=21#wechat_redirect)

[第20天：JUC中的Executor框架详解2](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933160&idx=1&sn=62649485b065f68c0fc59bb502ed42df&chksm=88621b16bf159200d5e25d11ab7036c60e3f923da3212ae4dd148753d02593a45ce0e9b886c4&token=42900009&lang=zh_CN&scene=21#wechat_redirect)

[第21天：java中的CAS，你需要知道的东西](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933166&idx=1&sn=15e614500676170b76a329efd3255c12&chksm=88621b10bf1592064befc5c9f0d78c56cda25c6d003e1711b85e5bfeb56c9fd30d892178db87&token=1033016931&lang=zh_CN&scene=21#wechat_redirect)

[第22天：JUC底层工具类Unsafe，高手必须要了解](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933173&idx=1&sn=80eb550294677b0042fc030f90cce109&chksm=88621b0bbf15921d2274a7bf6afde912fec02a4c3ade9cfb50d03cdce73e07e33d08d35a3b27&token=1033016931&lang=zh_CN&scene=21#wechat_redirect)

[第23天：JUC中原子类，一篇就够了](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933181&idx=1&sn=a1e254365d405cdc2e3b8372ecda65ee&chksm=88621b03bf159215ca696c9f81e228d0544a7598b03fe30436babc95c6a95e848161f61b868c&token=743622661&lang=zh_CN&scene=21#wechat_redirect)

[第24天：ThreadLocal、InheritableThreadLocal（通俗易懂）](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933186&idx=1&sn=079567e8799e43cb734b833c44055c01&chksm=88621b7cbf15926aace88777445822314d6eed2c1f5559b36cb6a6e181f0e543ee14d832ebc2&token=1963100670&lang=zh_CN&scene=21#wechat_redirect)

[第25天：掌握JUC中的阻塞队列](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933190&idx=1&sn=916f539cb1e695948169a358549227d3&chksm=88621b78bf15926e0a94e50a43651dab0ceb14a1fb6b1d8b9b75e38c6d8ac908e31dd2131ded&token=1963100670&lang=zh_CN&scene=21#wechat_redirect)

[第26篇：学会使用JUC中常见的集合，常看看！](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933197&idx=1&sn=1ef33a6403680ee49b3acf22d4a4aa34&chksm=88621b73bf159265c8775bc7d80e44f68bc162b7301f5ac8dce9669d17643934404440b6560f&token=2027319240&lang=zh_CN&scene=21#wechat_redirect)

[第27天：实战篇，接口性能提升几倍原来这么简单](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933201&idx=1&sn=b21aeda79e6e6a825826f08fef14f09e&chksm=88621b6fbf159279a2d9e3f195e1be888a9e20cdf95a637385fbd69b5e4be1a99c193da5a611&token=2027319240&lang=zh_CN&scene=21#wechat_redirect)

[第28天：实战篇，微服务日志的伤痛，一并帮你解决掉](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933206&idx=1&sn=a3d66275306774977d95d1781a268f07&chksm=88621b68bf15927ee897c277fbccbef4bf347d31362d7425d09ee1ff3743c4d86a064accc2b1&token=2039914863&lang=zh_CN&scene=21#wechat_redirect)

[第29天：高并发中常见的限流方式](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933212&idx=1&sn=b1e8f65d4673bd3cf64c2d6a00645ba9&chksm=88621b62bf15927422958029a1d240198082104d6e50d15dd33c5d3cf5af2195050b772782ec&token=870491352&lang=zh_CN&scene=21#wechat_redirect)

[第30天：JUC中工具类CompletableFuture，必备技能](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648933221&idx=1&sn=1af60b8917df6494b7c6b05c9eaebfe7&chksm=88621b5bbf15924d403e66e6d442d6b5897757471368b8d3a28c5de6e264cef104338dba1811&token=2098378399&lang=zh_CN&scene=21#wechat_redirect)

