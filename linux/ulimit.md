# 操作系统ulimit

有时候程序会报错“too many files open”：

```
Caused by: java.io.IOException: 打开的文件过多
	at sun.nio.ch.IOUtil.makePipe(Native Method)
	at sun.nio.ch.EPollSelectorImpl.<init>(EPollSelectorImpl.java:65)
	at sun.nio.ch.EPollSelectorProvider.openSelector(EPollSelectorProvider.java:36)
	at io.netty.channel.nio.NioEventLoop.openSelector(NioEventLoop.java:166)
	... 29 more
```

## 查看限制

从Linux内核的角度获取当前打开文件的数量：

```shell
cat /proc/sys/fs/file-nr
```

查看系统的最大打开文件数： 

```shell
cat /proc/sys/fs/file-max
```

查看每个进程的最大打开文件数：

```shell
ulimit -n
```

运行中进程的limits的查看:

```shell
cat /proc/<pid>/limits
```

## 更改限制

更改每个进程的最大打开文件数：`ulimit -n 4096`

更改每每个系统的最大打开文件数：`echo 800000 > /proc/sys/fs/file-max`

```shell
硬限制是实际的限制，而软限制，是warnning限制，只会做出warning
其实ulimit命令本身就有分软硬设置，加-H就是硬，加-S就是软
默认显示的是软限制，如果修改的时候没有加上的话，就是两个一起改
```

修改`/etc/security/limits.conf`：

```shell
soft nofile 2048
hard nofile 32768
```

## 查看进程文件打开数

查看进程文件打开数方式一：

```shell
ls /proc/<pid>/fd |wc -l
```

查看进程文件打开数方式二：

```shell
lsof -p <pid> |wc -l
```

进程按打开句柄数倒序排序（第一列是打开的文件句柄数量，第二列是进程号）：

```shell
lsof -n |awk '{print $2}'|sort|uniq -c |sort -nr|more
```

## 参考

[为什么在Linux中限制打开文件的数量？](https://qastack.cn/unix/36841/why-is-number-of-open-files-limited-in-linux)

[Linux下查看进程打开的文件句柄数和如何修改](https://yq.aliyun.com/articles/243784)

[如何诊断 'TOO MANY OPEN FILES' 问题](https://www.ibm.com/support/pages/%E5%A6%82%E4%BD%95%E8%AF%8A%E6%96%AD-too-many-open-files-%E9%97%AE%E9%A2%98%EF%BC%9F)

[第3期：Too many open files以及ulimit的探讨](https://juejin.im/post/5d4cf32f6fb9a06b1d21312c)

https://stackoverflow.com/questions/16789288/java-lang-outofmemoryerror-unable-to-create-new-native-thread