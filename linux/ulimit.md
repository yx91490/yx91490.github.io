# 操作系统ulimit

## ulimit -a

执行`ulimit -a`查看所有值：

```shell
core file size          (blocks, -c) unlimited
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 514562
max locked memory       (kbytes, -l) unlimited
max memory size         (kbytes, -m) unlimited
open files                      (-n) 65536
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 10240
cpu time               (seconds, -t) unlimited
max user processes              (-u) 10240
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

## ulimit -u (max user processes)

```shell
# 内核可以分配的最大进程描述符
cat /proc/sys/kernel/pid_max
sysctl kernel.pid_max
# 内核task_struct 中包含的最大元素数
cat /proc/sys/kernel/threads-max

# 单个用户可用的最大进程数
ulimit -u
cat  /etc/security/limits.conf
cat /etc/security/limits.d/20-nproc.conf
```

## ulimit -n (open files)

有时候程序会报错“too many files open”：

```
Caused by: java.io.IOException: 打开的文件过多
	at sun.nio.ch.IOUtil.makePipe(Native Method)
	at sun.nio.ch.EPollSelectorImpl.<init>(EPollSelectorImpl.java:65)
	at sun.nio.ch.EPollSelectorProvider.openSelector(EPollSelectorProvider.java:36)
	at io.netty.channel.nio.NioEventLoop.openSelector(NioEventLoop.java:166)
	... 29 more
```

### 查看限制

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

### 更改限制

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

### 查看进程文件打开数

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

### 查看进程的线程数

```shell
cat /proc/<pid>/status | grep Threads
ls /proc/<pid>/task |wc -l
```

### 参考

[为什么在Linux中限制打开文件的数量？](https://qastack.cn/unix/36841/why-is-number-of-open-files-limited-in-linux)

[Linux下查看进程打开的文件句柄数和如何修改](https://yq.aliyun.com/articles/243784)

[如何诊断 'TOO MANY OPEN FILES' 问题](https://www.ibm.com/support/pages/%E5%A6%82%E4%BD%95%E8%AF%8A%E6%96%AD-too-many-open-files-%E9%97%AE%E9%A2%98%EF%BC%9F)

[第3期：Too many open files以及ulimit的探讨](https://juejin.im/post/5d4cf32f6fb9a06b1d21312c)

