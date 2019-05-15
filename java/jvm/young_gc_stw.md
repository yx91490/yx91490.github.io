同事在测试HBase的时候发现RegionServer无响应，查看进程发现不断的在进行young GC，GC日志中出现大量的Allocation Failure信息：

```
[GC (Allocation Failure) [ParNew: 367523K->1293K(410432K), 0.0023988 secs] 522739K->156516K(1322496K), 0.0025301 secs] [Times: user=0.04 sys=0.00, real=0.01 secs]
```

可以看出来这里使用了CMS+ParNew的垃圾收集器方案，查看资料Allocation Failure发生的原因是年轻代空间不足。查看了下jvm的参数，堆内存设置为了30g，而年轻代却只有2g，在将年轻代调大后RegionServer进程恢复正常。

但是这里面有个细节是为什么java进程会无响应，年轻代发生GC会导致stop-the-world吗？查看资料原来ParNew也会在GC的时候stop-the-world，频繁的minor GC从而导致java进程几乎无法响应。