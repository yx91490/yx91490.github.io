# Kill命令与信号

kill命令其实有两个版本，一个是bash内嵌的版本，也是我们通常用到的；另一个是Linux版。

## Kill命令

### Bash内嵌版

命令提示：

```
$ kill
kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]
```

列出所有信号名：

```
$ kill -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
```

例如，在信号数字和信号名之间转换：

```
$ kill -l 15
TERM
$ kill -l TERM
15
```

向进程发送信号：

```
kill -9      12200
kill -n 9    12200
kill -s 9    12200
kill -s KILL 12200
```

### Linux版

而在bash里面Linux版需要指定全路径`/bin/kill`才能执行到，参数与bash版大同小异。

命令提示：

```
$ kill
Usage:
 kill [options] <pid> [...]

Options:
 <pid> [...]            send signal to every <pid> listed
 -<signal>, -s, --signal <signal>
                        specify the <signal> to be sent
 -l, --list=[<signal>]  list all signal names, or convert one to a name
 -L, --table            list all signal names in a nice table

 -h, --help     display this help and exit
 -V, --version  output version information and exit

For more details see kill(1).
```

列出所有信号名：

```
$ /bin/kill -L
 1 HUP      2 INT      3 QUIT     4 ILL      5 TRAP     6 ABRT     7 BUS
 8 FPE      9 KILL    10 USR1    11 SEGV    12 USR2    13 PIPE    14 ALRM
15 TERM    16 STKFLT  17 CHLD    18 CONT    19 STOP    20 TSTP    21 TTIN
22 TTOU    23 URG     24 XCPU    25 XFSZ    26 VTALRM  27 PROF    28 WINCH
29 POLL    30 PWR     31 SYS
```

和bash版的前31种信号对比了一下，发现第29种的名字有所不同。

## 信号

`man 7 signal`可以查看信号的详细描述：

> ### 标注说明
>
> - 这里的 - 指信号不存在
>
> - 可能给出 三个值：第一个值一般用于 alpha 和 sparc, 中间的值用于 i386, ppc 和 sh,最后一个是 mips 的.
>
> - 信号29 在 alpha机上 是 SIGINFO / SIGPWR , 而在 sparc机上 是 SIGLOST
>
> "动作(Action)"栏 的 字母 有 下列含义(译注:  这里  "结束"  指进程终止并释放资源, "停止" 指进程停止运行, 但是资源没有释放, 有可能继续运行)：
>
> - A  (Term)    缺省动作是结束进程
>
> - B  (Ign)       缺省动作是忽略这个信号.
>- C  (Core)    缺省动作是结束进程, 并且核心转储.
> - D  (Stop)    缺省动作是停止进程.
>- E                 信号不能被捕获.
> - F                 信号不能被忽略.
>

### POSIX.1的定义

首先, POSIX.1 描述了下列信号：

| 信号    | 值       | 动作 | 说明                                     |
| :------ | -------- | ---- | ---------------------------------------- |
| SIGHUP  | 1        | A    | 在控制终端上是挂起信号, 或者控制进程结束 |
| SIGINT  | 2        | A    | 从键盘输入的中断                         |
| SIGQUIT | 3        | C    | 从键盘输入的退出                         |
| SIGILL  | 4        | C    | 无效硬件指令                             |
| SIGABRT | 6        | C    | 非正常终止, 可能来自 abort(3)            |
| SIGFPE  | 8        | C    | 浮点运算例外                             |
| SIGKILL | 9        | AEF  | 杀死进程信号                             |
| SIGSEGV | 11       | C    | 无效的内存引用                           |
| SIGPIPE | 13       | A    | 管道中止: 写入无人读取的管道             |
| SIGALRM | 14       | A    | 来自 alarm(2) 的超时信号                 |
| SIGTERM | 15       | A    | 终止信号                                 |
| SIGUSR1 | 30,10,16 | A    | 用户定义的信号 1                         |
| SIGUSR2 | 31,12,17 | A    | 用户定义的信号 2                         |
| SIGCHLD | 20,17,18 | B    | 子进程结束或停止                         |
| SIGCONT | 19,18,25 |      | 继续停止的进程                           |
| SIGSTOP | 17,19,23 | DEF  | 停止进程                                 |
| SIGTSTP | 18,20,24 | D    | 终端上发出的停止信号                     |
| SIGTTIN | 21,21,26 | D    | 后台进程试图从控制终端(tty)输入          |
| SIGTTOU | 22,22,27 | D    | 后台进程试图在控制终端(tty)输出          |

### SUSv2的定义

下面的信号定义在 SUSv2 中, 而 POSIX.1 没有定义：

| 信号      | 值         | 动作 | 说明                                |
| :-------- | ---------- | ---- | ----------------------------------- |
| SIGBUS    | 10,7,10    | C    | 总线错误 (不正确的内存访问)         |
| SIGPOLL   |            | A    | I/O就绪事件 (Sys V). 等同于SIGIO    |
| SIGPROF   | 27,27,29   | A    | 系统资源定时器(Profiling timer)超时 |
| SIGSYS    | 12, -  ,12 | C    | 用错误参数调用系统例程 (SVID)       |
| SIGTRAP   | 5          | C    | 跟踪/断点自陷                       |
| SIGURG    | 16,23,21   | B    | 套接口上出现 urgent 情况 (4.2 BSD)  |
| SIGVTALRM | 26,26,28   | A    | 虚拟超时时钟 (4.2 BSD)              |
| SIGXCPU   | 24,24,30   | C    | 超过了CPU时间限制 (4.2 BSD)         |
| SIGXFSZ   | 25,25,31   | C    | 超过了文件大小限制 (4.2 BSD)        |

> 这里的  SIGSYS,  SIGXCPU, SIGXFSZ, 以及某些系统上的 SIGBUS, Linux 的缺省动作 (到2.3.27版) 是 A(结束), 而 SUSv2 声明是 C(结束且核心转储)

下面是其他几个信号：

| 信号      | 值           | 动作 | 说明                            |
| :-------- | ------------ | ---- | ------------------------------- |
| SIGIOT    | 6            | C    | IOT 自陷. 等同于 SIGABRT        |
| SIGEMT    | 7,    -  , 7 |      |                                 |
| SIGSTKFLT | - , 16,  -   | A    | 协处理器堆栈错误                |
| SIGIO     | 23, 29, 22   | A    | I/O 有效信号 (4.2 BSD)          |
| SIGCLD    | - ,  -  , 18 |      | 等同于 SIGCHLD                  |
| SIGPWR    | 29, 30, 19   | A    | 电源无效 (System V)             |
| SIGINFO   | 29,  -  ,  - |      | 等同于 SIGPWR                   |
| SIGLOST   | - ,  -  ,  - | A    | 文件锁丢失                      |
| SIGWINCH  | 28, 28,  20  | B    | 窗口大小调整信号 (4.3 BSD, Sun) |
| SIGUNUSED | - , 31 , -   | A    | 未使用的信号 (将成为 SIGSYS)    |

## 参考

- [java多线程的几种状态](https://blog.csdn.net/u014636245/article/details/92596602)
