# AbstractQueuedSynchronizer笔记

## 【译】AbstractQueuedSynchronizer JavaDoc注释

提供一个框架，用于实现依赖先进先出(FIFO)等待队列的阻塞锁和相关同步器(信号量、事件等)。这个类被设计为大多数依赖单个原子int值来表示状态的同步器的有用基础。子类必须定义protected法来改变状态，状态定义了获取或释放对象的意义。有了这些条件，该类中的其他方法将执行所有排队和阻塞机制。子类可以维护其他状态字段，但只有使用getState()、setState(int)和compareAndSetState(int, int)方法操作的原子更新的int值才会被同步跟踪。

子类应该定义为用于实现其外围类的同步属性的非公共内部helper类。类AbstractQueuedSynchronizer没有实现任何同步接口。相反，它定义了像acquireinterruptibly (int)这样的方法，具体的锁和相关的同步器可以适当地调用这些方法来实现它们的公共方法。

这个类支持默认独占模式和共享模式中的一个或两个。当以独占模式获取时，其他线程尝试获取的请求不能成功。共享模式由多个线程获得可能(但不需要)成功。这个类不能“理解”这些差异，除了在机器意义上，即当一个共享模式acquire成功时，下一个等待的线程(如果存在的话)也必须确定它是否可以acquire。在不同模式下等待的线程共享同一个FIFO队列。通常，子类实现只支持其中一种模式，但这两种模式都可以发挥作用，例如在ReadWriteLock中。只支持独占或共享模式的子类不需要定义未使用模式的方法。

该类定义了一个嵌套的AbstractQueuedSynchronizer.ConditionObject类,可以用作Condition由子类实现支持独占模式，方法isHeldExclusively()报告是否当前线程持有同步。release(int)方法调用当前getState()值完全释放该对象。给定这个保存的状态值，acquire(int)最终将该对象恢复到它以前获得的状态。除此之外没有AbstractQueuedSynchronizer方法创建这样的Condition，因此如果不能满足该约束，就不要使用它。当然AbstractQueuedSynchronizer.ConditionObject类的行为取决于它的同步器实现的语义。

这个类为内部队列提供了检查、检测和监视方法，也为条件对象提供了类似的方法。可以根据需要，使用AbstractQueuedSynchronizer作为同步机制将它们导出到类中。

该类的序列化只存储维持状态的底层原子整数，因此反序列化对象具有空线程队列。需要序列化的典型子类将定义一个readObject方法，该方法在反序列化时将其恢复到已知的初始状态。

### 用法

要使用这个类作为同步器的基础，如果适用的话，可以通过使用getState()， setState(int)和/或compareAndSetState(int, int)检查和/或修改同步状态来重新定义以下方法:

- tryAcquire (int)
- tryRelease (int)
- tryAcquireShared (int)
- tryReleaseShared (int)
- isHeldExclusively ()

默认情况下，这些方法都会抛出UnsupportedOperationException。这些方法的实现必须在内部是线程安全的，并且通常应该时间很短而不阻塞。定义这些方法是使用该类的唯一用意。所有其他方法都声明为final，因为它们不能独立变化。

您可能还会发现从AbstractOwnableSynchronizer继承的方法对于跟踪拥有独占同步器的线程非常有用。我们鼓励您使用它们——这使得监视和诊断工具能够帮助用户确定哪些线程持有锁。

即使这个类基于内部FIFO队列，它也不会自动执行FIFO获取策略。独占同步的核心采用如下形式:

```
 Acquire:
     while (!tryAcquire(arg)) {
        enqueue thread if it is not already queued;
        possibly block current thread;
     }

 Release:
     if (tryRelease(arg))
        unblock the first queued thread;
```

(共享模式类似，但可能涉及级联信号。)

因为在入队之前调用了acquire，所以一个新的获取线程可能会比其他被阻塞和排队的线程抢先。然而如果需要的话，您可以定义tryAcquire和/或tryAcquireShared，通过在内部调用一个或多个检查方法来禁用抢占，从而提供一个公平的FIFO获取顺序。特别是，大多数公平同步器都可以定义tryAcquire，如果hasqueuedaders()(一个专门为公平同步器设计的方法)返回true，则返回false。也可以有其他的变种。

默认的抢占(也称为贪婪、放弃和护航避免)策略，吞吐量和可伸缩性通常最高。虽然这不能保证公平或无饥饿，但允许较早的队列线程在较晚的队列线程之前重新竞争，并且每次重新竞争都有在进入的线程中成功的无偏机会。另外，虽然acquire通常不会自旋，但在阻塞之前，可能会多次调用tryAcquire，并穿插其他计算。当独占同步只是短暂时，这就最大程度利用了自旋的优点，而在非独占同步进行时，则不需要承担大部分累赘。如果需要的话，您可以通过在 调用acquire之前通过“快速路径”检查来增强这一点，可能会预先检查hasContended()和/或hasQueuedThreads()，以便只在同步器可能不会被竞争时才这样做。

这个类通过将其使用范围专门化为可以依赖int状态、acquire和release参数以及内部FIFO等待队列的同步器，为同步提供了一个有效的、可伸缩的基础。当这还不够时，您可以使用原子类、您自己的自定义Queue类和LockSupport阻塞支持从较低级别构建同步器。

### 用法示例

这里有一个不可重入的互斥锁类，它使用值0表示未解锁状态，1表示锁定状态。虽然不可重入锁并不严格要求记录当前所有者线程，但这个类无论如何都要这样做，以使使用更容易监控。它还支持条件，并公开了一种测量方法:

```java
 class Mutex implements Lock, java.io.Serializable {

   // Our internal helper class
   private static class Sync extends AbstractQueuedSynchronizer {
     // Reports whether in locked state
     protected boolean isHeldExclusively() {
       return getState() == 1;
     }

     // Acquires the lock if state is zero
     public boolean tryAcquire(int acquires) {
       assert acquires == 1; // Otherwise unused
       if (compareAndSetState(0, 1)) {
         setExclusiveOwnerThread(Thread.currentThread());
         return true;
       }
       return false;
     }

     // Releases the lock by setting state to zero
     protected boolean tryRelease(int releases) {
       assert releases == 1; // Otherwise unused
       if (getState() == 0) throw new IllegalMonitorStateException();
       setExclusiveOwnerThread(null);
       setState(0);
       return true;
     }

     // Provides a Condition
     Condition newCondition() { return new ConditionObject(); }

     // Deserializes properly
     private void readObject(ObjectInputStream s)
         throws IOException, ClassNotFoundException {
       s.defaultReadObject();
       setState(0); // reset to unlocked state
     }
   }

   // The sync object does all the hard work. We just forward to it.
   private final Sync sync = new Sync();

   public void lock()                { sync.acquire(1); }
   public boolean tryLock()          { return sync.tryAcquire(1); }
   public void unlock()              { sync.release(1); }
   public Condition newCondition()   { return sync.newCondition(); }
   public boolean isLocked()         { return sync.isHeldExclusively(); }
   public boolean hasQueuedThreads() { return sync.hasQueuedThreads(); }
   public void lockInterruptibly() throws InterruptedException {
     sync.acquireInterruptibly(1);
   }
   public boolean tryLock(long timeout, TimeUnit unit)
       throws InterruptedException {
     return sync.tryAcquireNanos(1, unit.toNanos(timeout));
   }
 }
```

这里有一个latch类，它类似于CountDownLatch，只不过它只需要一个信号来触发。因为latch是非独占的，所以它使用共享的获取和释放方法。

```java
 class BooleanLatch {

   private static class Sync extends AbstractQueuedSynchronizer {
     boolean isSignalled() { return getState() != 0; }

     protected int tryAcquireShared(int ignore) {
       return isSignalled() ? 1 : -1;
     }

     protected boolean tryReleaseShared(int ignore) {
       setState(1);
       return true;
     }
   }

   private final Sync sync = new Sync();
   public boolean isSignalled() { return sync.isSignalled(); }
   public void signal()         { sync.releaseShared(1); }
   public void await() throws InterruptedException {
     sync.acquireSharedInterruptibly(1);
   }
 }
```

### 参考

[Class AbstractQueuedSynchronizer](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/AbstractQueuedSynchronizer.html)

## 【译】AbstractQueuedSynchronizer概览

等待队列是“CLH”(Craig, Landin, andHagersten)锁队列的一个变种。CLH锁通常用于自旋锁。我们用它来作为阻塞同步器，包括引入显式(“prev”和“next”)链接和一个“status”字段，允许节点在释放时向后继节点发出信号锁定，并处理由于中断和超时而导致的取消。状态字段包含跟踪线程是否需要信号(使用LockSupport.unpark)	的比特位。尽管有这些补充，我们保持大多数CLH局部属性。

要排队进入一个CLH锁，您可以原子地将其拼接为新锁tail。要退出队列，您需要设置头字段，以便下一个符合条件的等待者成为第一个。

```
  +------+  prev +-------+       +------+
  | head | <---- | first | <---- | tail |
  +------+       +-------+       +------+
```

插入到CLH队列只需要尾部的一个原子操作，所以从未排队到排队有一个简单的分界点。predecessor的“next”链接是在CAS成功后由排队线程设置。尽管非原子性，这足以确保当符合条件时由predecessor向任何阻塞线程发出信号(尽管在取消这种情况下，在方法cleanQueue中可能存在帮助信号)。信号传输部分是基于类似dekker的方案，其中将要等待的线程表明WAITING状态，然后重试获取，然后在阻塞前重新检查状态。当unparking的时候信号器原子地清除等待状态。

acquire时的出队操作包括分离节点的“prev”节点，然后更新head节点。其他线程通过检查prev来判断节点是否被出队。我们通过强制置空，然后通过自旋等待（如果有必要的话）排序。因此，锁算法自身不是严格的“无锁”，因为加锁线程可能需要前一次加锁。当与排他锁一起使用时，无论如何都需要这样的过程。然而共享模式在设置head前前可能(不常见)需要自旋等待，确保正确的传播。(注意:与这个类以前的版本相比有了些简化和效率提升)

一个节点的predecessor可能会因为取消等待而改变，直到节点排在队列的第一个，此时它不能改变。acquire方法通过在等待前重新检查prev来处理这个问题。仅能通过方法cleanQueue以CAS方式取消节点的时候修改prev和next字段。这个策略让人联想到Michael-Scott队列，在和prev字段成功CAS后，其他线程会提供帮助修复next字段。因为取消通常是成批发生的，这使得每一个必要的信号的决定变得复杂，cleanQueue的每次调用将遍历队列，直到清除干净。节点重新成为头节点，会被无条件的unpark(有时是不必要的，但这些情况不值得避免)。

线程可能会尝试acquire，如果它在队列最前面。成为第一名并不能保证成功;它只给了你竞争的权利。我们通过允许传入线程，以及在处理入队的过程中获得同步器（在这种情况下，第一个被唤醒的线程可能需要rewait），来实现吞吐量、开销和公平性的平衡。为了抵消可能重复的不幸等待，我们每次获得的重试次数呈指数增长(最多256次)线程被取消。除了这种情况，AQS锁不会自旋;相反，他们交错尝试获得记账的步骤？。(想要自旋锁的用户可以使用tryAcquire)。

为了提高垃圾收集能力，没在列表上的节点的属性是null。(创建然后扔掉一个Node却不使用它的情况并不罕见)。从列表中退出的节点的字段会尽快取消。这加剧了从外部确定第一个等待线程的挑战(如方法getFirstQueuedThread)。当字段显示为空时，有时需要回退到，从原子更新tail的语句向后遍历。(然而在信号传递的过程不需要)

CLH队列需要一个虚拟头节点来启动。但我们不会在构造时创建它，因为如果没有竞争会浪费努力。相反，在第一次竞争时，构造该节点，并设置头和尾指针。

共享模式操作与独占模式操作的区别在于一个acquire会通知下一个waiter让他尝试acquire。tryacquirered API允许用户指示传播的程度，但在大多数应用中，忽略这一点并且在任何情况下获得让后继者去尝试acquire会更高效。

等待Condition的线程使用附加的节点链接以维护(FIFO)Condition列表。Condition只需要在简单(非并发)链接队列中链接节点，因为它们只在独占持有时被访问。在Await时，节点被插入到条件队列中。在signal时,节点被放入主队列。一个特殊的状态字段值用于跟踪并原子触发此操作。

对字段head、tail和state的访问完全使用Volatile模式，以及CAS。节点字段status, prev和next也如此，当线程是可通知的，否则有时使用更弱的模式。访问字段“waiter”(要访问的线程)有信号的)总是夹在其他原子访问之间，因此在Plain模式下使用。我们使用jdk.internal Unsafe版本中的原子访问方法，而不是VarHandles，以避免潜在的虚拟机引导问题。

以上大部分都是由主要的内部方法acquire执行的，它被所有导出的Acquire()方法以某种方式调用方法。(当大量使用时，编译器通常很容易优化调用的特殊化)

关于何时和如何检查中断阻塞，在acquire和await之前和/或之后有几个武断的决定。但是却很少更新具体的实现，因为一些用户似乎依赖原始行为，总体上(很少)是错误的，但很难为改变。

感谢Dave Dice, Mark Moir, Victor Luchangco, BillScherer和Michael Scott，以及JSR-166的成员专家小组，提供有益的想法，讨论和批评关于这个类的设计。

## 参考

[AbstractQueuedSynchronizer.java](https://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/util/concurrent/locks/AbstractQueuedSynchronizer.java)