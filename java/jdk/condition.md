# Condition笔记

## Condition JavaDoc

### 类注释

Condition将对象监视方法(wait、notify和notifyAll)分解为不同的对象，通过将它们与任意Lock实现结合使用，从而产生每个对象具有多个等待集的效果。锁代替了同步方法和语句的使用，Condition代替了对象监视器方法的使用。

Condition(也称为条件队列或条件变量)提供了一种方法，让一个线程暂停执行(“等待”)，直到另一个线程通知某个状态条件现在可能为真。因为对这个共享状态信息的访问发生在不同的线程中，所以必须保护它，因此将某种形式的锁与条件相关联。等待条件提供的关键属性是，它原子地释放关联的锁并挂起当前线程，就像Object.wait。

Condition实例本质上是绑定到锁的。要获取特定Lock实例的Condition实例，请使用它的newCondition()方法。

例如，假设我们有一个支持put和take方法的有界缓冲区。如果在空缓冲区上尝试执行take操作，则线程将阻塞，直到有元素可以获取；如果试图在一个已满的缓冲区上执行put操作，那么线程将会阻塞，直到空间可用为止。我们希望在单独的等待集中保持等待put线程和take线程，这样我们就可以在缓冲区中元素或空间可用时一次只通知一个个线程。这可以使用两个Condition实例来实现。

```java
 class BoundedBuffer {
   final Lock lock = new ReentrantLock();
   final Condition notFull  = lock.newCondition(); 
   final Condition notEmpty = lock.newCondition(); 

   final Object[] items = new Object[100];
   int putptr, takeptr, count;

   public void put(Object x) throws InterruptedException {
     lock.lock();
     try {
       while (count == items.length)
         notFull.await();
       items[putptr] = x;
       if (++putptr == items.length) putptr = 0;
       ++count;
       notEmpty.signal();
     } finally {
       lock.unlock();
     }
   }

   public Object take() throws InterruptedException {
     lock.lock();
     try {
       while (count == 0)
         notEmpty.await();
       Object x = items[takeptr];
       if (++takeptr == items.length) takeptr = 0;
       --count;
       notFull.signal();
       return x;
     } finally {
       lock.unlock();
     }
   }
 }
```

(ArrayBlockingQueue类提供了这个功能，所以不必实现这个用法示例类。)

Condition实现可以提供与Object监视器方法不同的行为和语义，比如保证通知的顺序，或者在执行通知时不需要持有锁。如果实现提供了这样专门的语义，那么实现必须标明这些语义。

注意，Condition实例只是普通对象，它们本身可以用作synchronized 语句中的目标对象，并且可以调用它们自己的wait和notify监视方法。获取Condition实例的监视器锁，或使用它的监视器方法，与获取与Condition关联的锁或使用它的wait和signal方法没有指定的关系。为了避免混淆，建议您永远不要以这种方式使用Condition实例，除非在它们自己的实现中。

除非注明，否则为任何参数传递空值将导致抛出NullPointerException。

#### 实现注意事项

当等待Condition时，通常允许发生“虚假唤醒”，这是对底层平台语义的让步。这对大多数应用程序几乎没有实际影响，因为Condition应该始终在循环中wait，测试正在等待的状态谓词。实现类有假设不会发生虚假唤醒的自由，但建议应用程序开发者始终假设它们可以发生，因此始终在循环种wait。

条件等待的三种形式(可中断、不可中断和定时)在某些平台上实现的容易程度和性能特征上可能有所不同。特别是，提供这些特性并维护特定的语义(如排序保证)可能很困难。此外，中断线程的实际挂起的能力在所有平台上不一定都是可行的。

因此，实现不需要为所有三种等待形式定义完全相同的保证或语义，也不需要支持线程的实际挂起的中断。

一个实现需要清楚地记录每个wait方法所提供的语义和保证，当一个实现确实支持线程挂起的中断时，它必须遵守在这个接口中定义的中断语义。

由于中断通常意味着取消，而且对中断的检查通常不频繁，因此实现类更倾向于响应中断而不是正常的方法返回。即使可以证明中断发生在另一个可能解除线程阻塞的操作之后，也是如此。实现类应该记录这种表现。

### await方法注释

让当前线程等待，直到收到信号或被中断。

与此Condition关联的锁被原子性地释放，同时当前线程被禁止进行线程调度，并且处于休眠状态，直到发生以下四种情况之一：

- 其他线程调用此Condition的signal()方法，当前线程恰好被选为要被唤醒的线程;或

- 其他线程调用这个Condition的signalAll()方法;或

- 其他线程中断当前线程，支持中断挂起的线程;或

- 一个“虚假的唤醒”发生了。

在所有情况下，当前线程在方法返回之前必须重新获得与此Condition相关联的锁。当线程返回时，会保证它持有这个锁。

如果当前线程:

- 在进入该方法时中断状态已被设置;或

- 在等待时被中断，并且支持挂起线程的中断，

然后会抛出InterruptedException，并清除当前线程的中断状态。在第一种情况下，没有指定是否在释放锁之前进行中断测试。

#### 实现注意事项

当调用此方法时，假定当前线程持有与此Condition关联的锁。确定是否是这种情况，以及如果不是该如何响应取决于具体实现。通常，会抛出一个异常(例如IllegalMonitorStateException)，并且实现必须标明这个事实。

一个实现可以更倾向于响应一个中断，而不是响应一个signal的正常方法返回。这种情况下，实现类必须确保将signal重定向到另一个等待线程(如果有的话)。

### awaitUninterruptibly方法注释

使当前线程等待，直到收到信号。

与此Condition关联的锁被原子性地释放，同时当前线程被禁止进行线程调度，并且处于休眠状态，直到发生以下三种情况之一：

- 其他线程调用此Condition的signal()方法，当前线程恰好被选为要被唤醒的线程;或

- 其他线程调用这个Condition的signalAll()方法;或

- 一个“虚假的唤醒”发生了。

在所有情况下，当前线程在方法返回之前必须重新获得与此Condition相关联的锁。当线程返回时，会保证它持有这个锁。

如果当前线程的中断状态是在它进入这个方法时设置的，或者它在等待时被中断，它将继续等待直到收到信号。当它最终从这个方法返回时，它的中断状态仍将被设置。

#### 实现注意事项

当调用此方法时，假定当前线程持有与此Condition关联的锁。确定是否是这种情况，以及如果不是该如何响应取决于具体实现。通常，会抛出一个异常(例如IllegalMonitorStateException)，并且实现必须标明这个事实。

### awaitNanos方法注释

使当前线程等待，直到收到信号或被中断，或到了指定的等待时间。

与此Condition关联的锁被原子性地释放，同时当前线程被禁止进行线程调度，并且处于休眠状态，直到发生以下五种情况之一：

- 其他线程调用此Condition的signal()方法，当前线程恰好被选为要被唤醒的线程;或

- 其他线程调用这个Condition的signalAll()方法;或

- 其他线程中断当前线程，同时支持中断挂起线程;或

- 过了指定的等待时间;或

- 一个“虚假的唤醒”发生了。

在所有情况下，当前线程在方法返回之前必须重新获得与此Condition相关联的锁。当线程返回时，会保证它持有这个锁。

如果当前线程:

- 在进入该方法时中断状态已被设置;或

- 在等待时被中断，并且支持挂起线程的中断，

然后会抛出InterruptedException，并清除当前线程的中断状态。在第一种情况下，没有指定是否在释放锁之前进行中断测试。

该方法根据提供的nanosTimeout值返回待估算的等待纳秒数，如果超时则返回一个小于或等于零的值。当wait已经返回但等待的条件仍然不成立时，此值可用于确定是否重新等待以及重新等待多长时间。这种方法的典型用法如下：

```java
 boolean aMethod(long timeout, TimeUnit unit) {
   long nanos = unit.toNanos(timeout);
   lock.lock();
   try {
     while (!conditionBeingWaitedFor()) {
       if (nanos <= 0L)
         return false;
       nanos = theCondition.awaitNanos(nanos);
     }
     // ...
   } finally {
     lock.unlock();
   }
 }
```

设计注意:此方法需要纳秒参数，以避免在报告剩余时间时出现截断错误。这种精度损失将使程序员难以确保总等待时间在系统上不会比重新等待发生时指定的时间短。

#### 实现注意事项

当调用此方法时，假定当前线程持有与此Condition关联的锁。这取决于实现来确定是否为这种情况，如果不是，则如何响应。通常，会抛出一个异常(例如IllegalMonitorStateException)，并且实现必须记录这个事实。

实现可以更倾向于响应中断，而不是响应信号的正常方法返回，或超过指示指定等待时间的流逝。在这两种情况下，实现都必须确保信号被重定向到另一个等待线程(如果有的话)。

### await方法注释

使当前线程等待，直到收到信号或被中断，或指定的等待时间过去。这种方法在行为上相当于：

```
awaitNanos(unit.toNanos(time)) > 0
```

### awaitUntil方法注释

使当前线程等待，直到收到信号或被中断，或到了指定的等待时间。

与此Condition关联的锁被原子性地释放，同时当前线程被禁止进行线程调度，并且处于休眠状态，直到发生以下五种情况之一：

- 其他线程调用此Condition的signal()方法，当前线程恰好被选为要被唤醒的线程;或

- 其他线程调用这个Condition的signalAll()方法;或

- 其他线程中断当前线程，同时支持中断挂起线程;或

- 过了指定的等待时间;或

- 一个“虚假的唤醒”发生了。

如果当前线程:

- 在进入该方法时中断状态已被设置;或

- 在等待时被中断，并且支持挂起线程的中断，

然后会抛出InterruptedException，并清除当前线程的中断状态。在第一种情况下，没有指定是否在释放锁之前进行中断测试。

返回值指示是否已经过了截止时间，可以这样用：

```java
 boolean aMethod(Date deadline) {
   boolean stillWaiting = true;
   lock.lock();
   try {
     while (!conditionBeingWaitedFor()) {
       if (!stillWaiting)
         return false;
       stillWaiting = theCondition.awaitUntil(deadline);
     }
     // ...
   } finally {
     lock.unlock();
   }
 }
```

#### 实现注意事项

当调用此方法时，假定当前线程持有与此Condition关联的锁。这取决于实现来确定是否为这种情况，如果不是，则如何响应。通常，会抛出一个异常(例如IllegalMonitorStateException)，并且实现必须记录这个事实。

实现可以更倾向于响应中断，而不是响应signal的正常方法返回，或超过指示指定等待时间。在这两种情况下，实现都必须确保signal被重定向到另一个等待线程(如果有的话)。

### signal方法注释

唤醒一个等待的线程。

如果有任何线程正在等待这个Condition，那么就选择一个线程来唤醒它。然后，该线程在从await返回之前必须重新获取锁。

#### 实现注意事项

当调用此方法时，实现可能(通常也确实)要求当前线程持有与此Condition关联的锁。实现必须记录这个前提条件以及在未持有锁时所采取的任何操作。通常，会抛出一个异常，如IllegalMonitorStateException。

### signalAll方法注释

唤醒所有等待的线程。

如果任何线程正在等待这个Condition，那么它们都将被唤醒。每个线程在从await返回之前必须重新获取锁。

#### 实现注意事项

当调用此方法时，实现可能(通常也确实)要求当前线程持有与此Condition关联的锁。实现必须记录这个前提条件以及在未持有锁时所采取的任何操作。通常，会抛出一个异常，如IllegalMonitorStateException。