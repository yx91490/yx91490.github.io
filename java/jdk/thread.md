# 线程状态

`java.lang.Thread.State`描述了6种状态：

- NEW                    线程还没有开启

- RUNNABLE         线程在java虚拟机中正在执行，但是可能在操作系统中等待其他资源（比如处理器）

- BLOCKED            线程阻塞，正在等待一个监视器锁从而进入`synchronized`代码块/方法，或者在调用`Object.wait()`之后重新进入`synchronized`代码块/方法。

- WAITING              线程处于等待状态，可能是调用了3个方法：

  - 不带超时的`Object.wait()`
  - 不带超时的`Thread.join()`
  - `LockSupport.park`

  处于等待状态的线程是等待另一个线程的一个特定动作，线程调用了 `Object.wait()`是在等待另一个线程调用同一对象的 `Object.notify()` 或 `Object.notifyAll()`。线程调用了`Thread.join()`是在等待那个线程结束。

- TIMED_WAITING 线程等待另一个线程的一个特定动作，且等待不超过特定的时间期限。可能是调用了下面的方法和一个正值的超时参数：

  - `Thread.sleep`
  - 带超时的`Object.wait`
  - 带超时的`Thread.join`
  - `LockSupport.parkNanos`
  - `LockSupport.parkUntil`

- TERMINATED       线程已退出

在某一时间点线程只能有一种状态，这里的状态是虚拟机的状态，并不对应任何操作系统的线程状态。

## 参考

- [Java Thread Life Cycle and Thread States](https://howtodoinjava.com/java/multi-threading/java-thread-life-cycle-and-thread-states/)