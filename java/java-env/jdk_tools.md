# JDK命令工具

### 查看JVM进程的PID

```
$ jcmd -l
```

查看进程24684的JVM参数

```
//默认值
java -XX:+PrintFlagsFinal
jcmd 24684 VM.flags
jinfo -flag UseXMMForArrayCopy 24500
```

### jmap

| 选项   | 功能                                                         |
| ------ | ------------------------------------------------------------ |
| -dump  | 生成java堆转储快照                                           |
| -heap  | 显示Java堆详细信息 ，包括使用的GC算法、堆配置信息和各内存区域内存使用信息 |
| -histo | 显示堆中对象的统计信息,包括类、实例数量、合计容量            |

##### JMap分析堆转储文件

1. 生成堆转储文件

```shell
jmap -dump:format=b,file=<dumpfile> <pid>
```

1. 分析堆转储文件

   启动 Memory Analyzer tool , 然后选择菜单项 File- Open Heap Dump 来加载需要分析的堆转储文件。点击工具栏上的 Leak Suspects 菜单项来生成内存泄露分析报告.

### 查看gc情况

```
jstat -gc pid
jstat -gccapacity pid
jstat -gcnew pid
jstat -gcold pid
...
```

结果如下：

```
java -Xms128m -Xmx128m -Xmn32m -XX:SurvivorRatio=6 -jar /opt/jd-gui/jd-gui.jar
```

| 项    | 值(KB)  | 描述                                           |
| ----- | ------- | ---------------------------------------------- |
| S0C   | 4096    | 年轻代中第一个survivor（幸存区）的容量         |
| S1C   | 4096    | 年轻代中第二个survivor（幸存区）的容量         |
| S0U   | 0       | 年轻代中第一个survivor（幸存区）目前已使用空间 |
| S1U   | 4065.3  | 年轻代中第二个survivor（幸存区）目前已使用空间 |
| EC    | 24576   | 年轻代中Eden（伊甸园）的容量                   |
| EU    | 9111.4  | 年轻代中Eden（伊甸园）目前已使用空间           |
| OC    | 98304   | Old代的容量                                    |
| OU    | 56517.2 | Old代目前已使用空间                            |
| PC    | 32768.0 | Perm(持久代)的容量                             |
| PU    | 32492.0 | Perm(持久代)目前已使用空间                     |
| YGC   | 7       | 从应用程序启动到采样时年轻代中gc次数           |
| YGCT  | 0.159   | 从应用程序启动到采样时年轻代中gc所用时间(s)    |
| FGC   | 0       | 从应用程序启动到采样时old代(全gc)gc次数        |
| FGCT  | 0       | 从应用程序启动到采样时old代(全gc)gc所用时间(s) |
| GCT   | 0.159   | 从应用程序启动到采样时gc用的总时间(s)          |
| NGCMN | 32768.0 | 年轻代(young)中初始化(最小)的大小              |
| NGCMX | 32768.0 | 年轻代(young)的最大容量                        |
| NGC   | 32768.0 | 年轻代(young)中当前的容量                      |
| OGCMN | 98304.0 | old代中初始化(最小)的大小                      |
| OGCMX | 98304.0 | old代的最大容量                                |
| PGCMN | 21504.0 | perm代中初始化(最小)的大小                     |
| PGCMX | 83968.0 | perm代的最大容量                               |
| PGC   | 32768.0 | perm代当前新生成的容量                         |

**使用Java监控工具出现 Can't attach to the process**
这是因为新版的Linux系统加入了 ptrace-scope 机制. 这种机制为了防止用户访问当前正在运行的进程的内存和状态, 而一些调试软件本身就是利用 ptrace 来进行获取某进程的内存状态的(包括GDB),所以在新版本的Linux系统, 默认情况下不允许再访问了. 可以临时开启. 如:

```
echo 0 > /proc/sys/kernel/yama/ptrace_scope
```

或者永久开启：
    //vim /etc/sysctl.d/10-ptrace.conf
    kernel.yama.ptrace_scope = 0