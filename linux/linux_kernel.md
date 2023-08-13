# Linux内核学习笔记

## OOM Killer

overcommit



源码位于mm/oom_kill.c#out_of_memory()。

不同版本的内核对于打分的实现的方式略有所差别，3.10 [mm/oom_kill.c#oom_badness](https://github.com/torvalds/linux/blob/v3.10/mm/oom_kill.c#L141) 的代码实现：





### 参考

[oom_kill.c](https://github.com/torvalds/linux/blob/master/mm/oom_kill.c)

[linux OOM处理机制](https://cloud.tencent.com/developer/article/1654897)

[Linux OOM机制分析](https://cloud.tencent.com/developer/article/1157275)

[Linux Out-Of-Memory Killer](https://kangxiaoning.github.io/post/2021/08/linux-oom-killer/)

[linux内核的oom score是咋算出来的](https://blog.csdn.net/u010278923/article/details/105688107)

[How is kernel oom score calculated?](https://serverfault.com/questions/571319/how-is-kernel-oom-score-calculated)



## RSS & VSZ



## 内存管理

### 参考

[《深入理解Linux虚拟内存管理》](https://www.kernel.org/doc/gorman/)

[Linux Memory Management](https://www.javatpoint.com/linux-memory-management)

[如何展开Linux Memory Management学习？](https://www.cnblogs.com/arnoldlu/p/7977847.html)

[How can one really learn Linux Kernel Memory Management?](https://www.quora.com/How-can-one-really-learn-Linux-Kernel-Memory-Management)

