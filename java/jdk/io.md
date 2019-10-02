# Java IO模型

书中给出了5种IO模型：

[1] blocking IO - 阻塞IO
[2] nonblocking IO - 非阻塞IO
[3] IO multiplexing - IO多路复用
[4] signal driven IO - 信号驱动IO
[5] asynchronous IO - 异步IO

其中前面4种IO都可以归类为synchronous IO - 同步IO。

一般情况下，一次网络IO读操作会涉及两个系统对象：(1) 用户进程(线程)Process；(2)内核对象kernel，两个处理阶段：

```javascript
[1] Waiting for the data to be ready - 等待数据准备好
[2] Copying the data from the kernel to the process - 将数据从内核空间的buffer拷贝到用户空间进程的buffer
```

IO模型的异同点就是区分在这两个系统对象、两个处理阶段的不同上。

### 1.1 同步IO 之 Blocking IO

![img](./assets/1500016932293_3417_1500016932577.png)

如上图所示，用户进程process在Blocking IO读recvfrom操作的两个阶段都是等待的。在数据没准备好的时候，process原地等待kernel准备数据。kernel准备好数据后，process继续等待kernel将数据copy到自己的buffer。在kernel完成数据的copy后process才会从recvfrom系统调用中返回。

### 1.2 同步IO 之 NonBlocking IO

![img](./assets/1500017008242_1297_1500017008596.png)

从图中可以看出，process在NonBlocking IO读recvfrom操作的第一个阶段是不会block等待的，如果kernel数据还没准备好，那么recvfrom会立刻返回一个EWOULDBLOCK错误。当kernel准备好数据后，进入处理的第二阶段的时候，process会等待kernel将数据copy到自己的buffer，在kernel完成数据的copy后process才会从recvfrom系统调用中返回。

### 1.3 同步IO 之 IO multiplexing

![img](./assets/1500017024989_2800_1500017025229.png)

IO多路复用，就是我们熟知的select、poll、epoll模型。从图上可见，在IO多路复用的时候，process在两个处理阶段都是block住等待的。初看好像IO多路复用没什么用，其实select、poll、epoll的优势在于可以以较少的代价来同时监听处理多个IO。

### 1.4 异步IO

![img](./assets/1500017078734_6117_1500017078936.png)

从上图看出，异步IO要求process在recvfrom操作的两个处理阶段上都不能等待，也就是process调用recvfrom后立刻返回，kernel自行去准备好数据并将数据从kernel的buffer中copy到process的buffer在通知process读操作完成了，然后process在去处理。遗憾的是，linux的网络IO中是不存在异步IO的，linux的网络IO处理的第二阶段总是阻塞等待数据copy完成的。真正意义上的网络异步IO是Windows下的IOCP（IO完成端口）模型。

![img](./assets/1500017105443_4641_1500017105783.png)

很多时候，我们比较容易混淆non-blocking IO和asynchronous IO，认为是一样的。但是通过上图，几种IO模型的比较，会发现non-blocking IO和asynchronous IO的区别还是很明显的，non-blocking IO仅仅要求处理的第一阶段不block即可，而asynchronous IO要求两个阶段都不能block住。



> https://cloud.tencent.com/developer/article/1005481
