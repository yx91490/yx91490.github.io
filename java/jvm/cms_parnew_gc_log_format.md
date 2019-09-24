# CMSGC日志格式

### Minor GC

> 2015-05-26T16:23:07.219-0200<sup>1</sup>: 64.322<sup>2</sup>:\[GC<sup>3</sup>(Allocation Failure<sup>4</sup>) 64.322: \[ParNew<sup>5</sup>: 613404K->68068K<sup>6</sup>(613440K) <sup>7</sup>, 0.1020465 secs<sup>8</sup>] 10885349K->10880154K <sup>9</sup>(12514816K)<sup>10</sup>, 0.1021309 secs<sup>11</sup>][Times: user=0.78 sys=0.01, real=0.11 secs]<sup>12</sup>

1. 2015-05-26T16:23:07.219-0200 gc事件开始的时间
2. 64.322 gc事件距离JVM启动的时间，单位是秒
3. GC 表示是minor GC
4. Allocation Failure gc发生的原因
5. ParNew 收集器的名字
6. 613404K->68068K 年轻代在gc发生前后的大小
7. (613440K) 年轻代总大小
8. 0.1020465 secs gc持续时长
9. 10885349K->10880154K 堆在gc发生前后的大小
10. (12514816K) 堆可用总大小
11. 0.1021309 secs 年轻代垃圾收集器在标记和复制存活对象耗费的时间，包括和CMS收集器通信的时间，对象晋升到老年代的时间以及最后的清理工作
12. [Times: user=0.78 sys=0.01, real=0.11 secs] 从不同角度度量gc事件的耗时：
    - user gc线程消耗的总的CPU时长
    - sys 系统调用和等待系统事件的耗时
    - real 应用暂停的时钟时长，此数值应该和(user时长+sys时长)/gc线程数接近

### Full GC

完整日志：

```
2015-05-26T16:23:07.321-0200: 64.425: [GC (CMS Initial Mark) [1 CMS-initial-mark: 10812086K(11901376K)] 10887844K(12514816K), 0.0001997 secs] [Times: user=0.00 sys=0.00, real=0.00 secs]
2015-05-26T16:23:07.321-0200: 64.425: [CMS-concurrent-mark-start]
2015-05-26T16:23:07.357-0200: 64.460: [CMS-concurrent-mark: 0.035/0.035 secs] [Times: user=0.07 sys=0.00, real=0.03 secs]
2015-05-26T16:23:07.357-0200: 64.460: [CMS-concurrent-preclean-start]
2015-05-26T16:23:07.373-0200: 64.476: [CMS-concurrent-preclean: 0.016/0.016 secs] [Times: user=0.02 sys=0.00, real=0.02 secs]
2015-05-26T16:23:07.373-0200: 64.476: [CMS-concurrent-abortable-preclean-start]
2015-05-26T16:23:08.446-0200: 65.550: [CMS-concurrent-abortable-preclean: 0.167/1.074 secs] [Times: user=0.20 sys=0.00, real=1.07 secs]
2015-05-26T16:23:08.447-0200: 65.550: [GC (CMS Final Remark) [YG occupancy: 387920 K (613440 K)]65.550: [Rescan (parallel) , 0.0085125 secs]65.559: [weak refs processing, 0.0000243 secs]65.559: [class unloading, 0.0013120 secs]65.560: [scrub symbol table, 0.0008345 secs]65.561: [scrub string table, 0.0001759 secs][1 CMS-remark: 10812086K(11901376K)] 11200006K(12514816K), 0.0110730 secs] [Times: user=0.06 sys=0.00, real=0.01 secs]
2015-05-26T16:23:08.458-0200: 65.561: [CMS-concurrent-sweep-start]
2015-05-26T16:23:08.485-0200: 65.588: [CMS-concurrent-sweep: 0.027/0.027 secs] [Times: user=0.03 sys=0.00, real=0.03 secs]
2015-05-26T16:23:08.485-0200: 65.589: [CMS-concurrent-reset-start]
2015-05-26T16:23:08.497-0200: 65.601: [CMS-concurrent-reset: 0.012/0.012 secs] [Times: user=0.01 sys=0.00, real=0.01 secs]
```

#### 阶段一：初始标记

> 2015-05-26T16:23:07.321-0200: 64.42<sup>1</sup>: \[GC (CMS Initial Mark<sup>2</sup>\[1 CMS-initial-mark: 10812086K<sup>3</sup>(11901376K)<sup>4</sup>] 10887844K<sup>5</sup>(12514816K)<sup>6</sup>, 0.0001997 secs][Times: user=0.00 sys=0.00, real=0.00 secs]<sup>7</sup>

1. 2015-05-26T16:23:07.321-0200: 64.42 gc事件的时钟时间和相对于JVM的启动时间
2. CMS Initial Mark 初始标记阶段
3. 10812086K 当前老年代大小
4. (11901376K) 老年代可用总大小
5. 10887844K 当前堆大小
6. (12514816K) 堆可用总大小
7. 0.0001997 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 此阶段耗时

#### 阶段二：并发标记

> 2015-05-26T16:23:07.321-0200: 64.425: [CMS-concurrent-mark-start]
>
> 2015-05-26T16:23:07.357-0200: 64.460: \[CMS-concurrent-mark<sup>1</sup>: 0.035/0.035 secs<sup>2</sup>]\[Times: user=0.07 sys=0.00, real=0.03 secs]<sup>3</sup>

1. CMS-concurrent-mark 并发标记阶段，会遍历老年代并且标记所有存活对象
2. 0.035/0.035 secs 展示实耗时间和时钟时间
3. [Times: user=0.07 sys=0.00, real=0.03 secs] 无太多意义

#### 阶段三：并发预清理

> 2015-05-26T16:23:07.357-0200: 64.460: [CMS-concurrent-preclean-start]
>
> 2015-05-26T16:23:07.373-0200: 64.476: \[CMS-concurrent-preclean<sup>1</sup>: 0.016/0.016 secs<sup>2</sup>]\[Times: user=0.02 sys=0.00, real=0.02 secs]<sup>3</sup>

1. CMS-concurrent-preclean 同上文
2. 0.016/0.016 secs 同上文
3. [Times: user=0.02 sys=0.00, real=0.02 secs] 无太多意义

#### 阶段四：并发可中断预清理

> 2015-05-26T16:23:07.373-0200: 64.476: [CMS-concurrent-abortable-preclean-start]
>
> 2015-05-26T16:23:08.446-0200: 65.550: \[CMS-concurrent-abortable-preclean<sup>1</sup>: 0.167/1.074 secs<sup>2</sup>]\[Times: user=0.20 sys=0.00, real=1.07 secs]<sup>3</sup>

1. CMS-concurrent-abortable-preclean 同上文
   1. 0.167/1.074 secs 只有0.167秒的CPU时间，gc线程做了大量等待工作，本质上是在STW暂停之前尽量延迟。默认最多等待5秒

#### 阶段五：最终标记

> 2015-05-26T16:23:08.447-0200: 65.550<sup>1</sup>: \[GC (CMS Final Remark<sup>2</sup>) \[YG occupancy: 387920 K (613440 K)<sup>3</sup>]65.550: \[Rescan (parallel) , 0.0085125 secs]<sup>4</sup>65.559: \[weak refs processing, 0.0000243 secs]65.559<sup>5</sup>: \[class unloading, 0.0013120 secs]65.560<sup>6</sup>: \[scrub string table, 0.0001759 secs<sup>7</sup>]\[1 CMS-remark: 10812086K(11901376K)<sup>8</sup>] 11200006K(12514816K) <sup>9</sup>, 0.0110730 secs<sup>10</sup>]\[Times: user=0.06 sys=0.00, real=0.01 secs]<sup>11</sup>

1. 2015-05-26T16:23:08.447-0200: 65.550 同上文
2. CMS Final Remark 同上文 
3. YG occupancy: 387920 K (613440 K) 当前阶段之后年轻代占用大小和容量
4. [Rescan (parallel) , 0.0085125 secs] Rescan过程在应用暂停过程中完成对存活对象的标记。
5. weak refs processing, 0.0000243 secs]65.559 第一个子阶段，处理弱引用
6. class unloading, 0.0013120 secs]65.560 下一个子阶段，卸载无用的类
7. scrub string table, 0.0001759 secs 最后一个子阶段，清理符号和字符串表
8. 10812086K(11901376K) 当前阶段之后老年代占用大小和容量
9. 11200006K(12514816K) 当前阶段之后堆占用大小和容量
10. 0.0110730 secs 此阶段耗时
11. [Times: user=0.06 sys=0.00, real=0.01 secs] 同上文

#### 阶段六：并发清理

> 2015-05-26T16:23:08.458-0200: 65.56<sup>1</sup>: \[CMS-concurrent-sweep-start]
>
> 2015-05-26T16:23:08.485-0200: 65.588: \[CMS-concurrent-sweep1: 0.027/0.027 secs<sup>2</sup>]\[Times: user=0.03 sys=0.00, real=0.03 secs] <sup>3</sup>

1. CMS-concurrent-sweep 同上文
2. 0.027/0.027 secs 同上文
3. [Times: user=0.03 sys=0.00, real=0.03 secs] 同上文

#### 阶段七：并发重置

> 2015-05-26T16:23:08.485-0200: 65.589: \[CMS-concurrent-reset-start]
>
> 2015-05-26T16:23:08.497-0200: 65.601: \[CMS-concurrent-reset<sup>1</sup>: 0.012/0.012 secs<sup>2</sup>][Times: user=0.01 sys=0.00, real=0.01 secs]<sup>3</sup>

1. CMS-concurrent-reset 同上文
2. 0.012/0.012 secs 同上文
3. [Times: user=0.01 sys=0.00, real=0.01 secs] 同上文

### 参考

- [garbage collection algorithms implementations](https://plumbr.io/handbook/garbage-collection-algorithms-implementations)

