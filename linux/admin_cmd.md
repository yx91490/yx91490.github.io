# Linux系统管理命令

### uptime

参数：

```
current time, system running time, logged on users, system load averages for the past 1, 5, 15'.
    -s, --since
        system up since, in yyyy-mm-dd HH:MM:SS format
```

输出例子：

```
09:56:36 up 2 days, 15:18,  3 users,  load average: 0.49, 0.37, 0.41
```

### who

参数：

```
    -a, --all same as -b -d --login -p -r -t -T -u
    -b, --boot time of last system boot
    -d, --dead print dead processes
    -r, --runlevel
    -H, --heading
    -l, --login print system login processes
    -m (== who am i)     only hostname and user associated with stdin
    -q, --count
    -T,  add user's message status as +, - or ?
    -u, --users list users logged in
```

输出例子：

```
yx32     :0           2015-02-23 18:39 (:0)
yx32     pts/0        2015-02-26 09:33 (:0)
yx32     pts/1        2015-02-26 09:39 (:0)
yx32     pts/2        2015-02-26 10:55 (:0)

    pts - pseudoterminal master and slave
    相关文件：/var/run/utmp, /var/log/wtmp
```

### whoami

参数：

```
whoami:
    Print the user name associated with the current effective user ID. 
    who am i 显示的是实际用户(实际用户=uid)，即用户登陆的时候的用户ID。此命令相当于who -m。
    whoami   显示的是有效用户ID,即当前“操作用户”的用户名(有效用户=euid).
```

### free

参数：

```
-l, --lohi Show detailed low and high memory statistics.
-s, --seconds seconds
      Continuously  display  the  result  delay seconds apart.
-c, --count count
      Display the result count times.  Requires the -s option.
-m    Display the amount of memory in megabytes.
-h, --human
```

输出例子：

```
             total       used       free     shared    buffers     cached
Mem:       4020764    1459448    2561316     269940      45700     648488
-/+ buffers/cache:     765260    3255504
Swap:      7811068      28232    7782836
```

说明：

```
Mem               ：表示物理内存统计
-/+ buffers/cached：表示物理内存的缓存统计
Swap              ：表示硬盘上交换分区的使用情况
```

计算关系：

```
// 实际使用的buffers 与cache 总量
used2

//总物理内存 = 实际使用的内存  + 系统当前实际可用内存
//         = 总计分配给缓存的 + 未分配的内存
total1 = used2 + free2
       = used1 + free1

//表示总计分配给缓存 = 已被使用的buffers和cache + (未被使用的buffers + 未被使用的cache)
used1 = used2 + (buffers1 + cached1)

//系统当前实际可用内存 = (未被使用的buffers + 未被使用的cache) + 未被分配的内存
free2 = (buffers1 + cached1) + free1
```

### top

```
Tasks: 180 total,   1 running, 178 sleeping,   0 stopped,   1 zombie
%Cpu(s):  1.6 us,  1.0 sy,  0.0 ni, 96.8 id,  0.7 wa,  0.0 hi,  0.0 si,  0.0 st
```

说明：

```
us, user    : time running un-niced user processes
sy, system  : time running kernel processes
ni, nice    : time running niced user processes
wa, IO-wait : time waiting for I/O completion
hi : time spent servicing hardware interrupts
si : time spent servicing software interrupts
st : time stolen from this vm by the hypervisor
```

标志含义：

|序号    |     列名    |     含义|
| ---- | ---- | ---- |
|a    | PID |进程id|
|b    |    PPID    |     父进程id|
|c    |    RUSER    |    Real user name|
|d    | UID |进程所有者的用户id|
|e    |    USER    |     进程所有者的用户名|
|f    |    GROUP    |    进程所有者的组名|
|g    | TTY |启动进程的终端名。不是从终端启动的进程则显示为 ?|
|h    | PR |优先级|
|i    | NI |nice值。负值表示高优先级，正值表示低优先级|
|j    |    P    |    最后使用的CPU，仅在多CPU环境下有意义|
|k    |    %CPU    |     上次更新到现在的CPU时间占用百分比|
|l    |    TIME    |     进程使用的CPU时间总计，单位秒|
|m    |    TIME+    |    进程使用的CPU时间总计，单位1/100秒|
|n    |    %MEM    |     进程使用的物理内存百分比|
|o    |    VIRT    |     进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES|
|p    |    SWAP    |     进程使用的虚拟内存中，被换出的大小，单位kb。|
|q    | RES |进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA|
|r    |    CODE    |     可执行代码占用的物理内存大小，单位kb|
|s    |    DATA    |     可执行代码以外的部分(数据段+栈)占用的物理内存大小，单位kb|
|t    | SHR     |共享内存大小，单位kb|
|u    |    nFLT    |     页面错误次数|
|v    |    nDRT    |     最后一次写入到现在，被修改过的页面数。|
|w    |    S    | 进程状态：<br />D=不可中断的睡眠状态<br/>R=运行<br/>S=睡眠<br/>T=跟踪/停止<br/>Z=僵尸进程 |
|x    | COMMAND |命令名/命令行|
|y    |    WCHAN    |    若该进程在睡眠，则显示睡眠中的系统函数名|
|z    |    Flags    |    任务标志，参考 sched.h|

快捷键命令：


```
z:          top显示颜色
P:          按CPU占用高低顺序列出程序
M:          按内存占用高低顺序列出程序
x:          类似高亮显示，在z显示模式下效果才会更明显
d:          top默认的刷新时间是3s，使用d键可以自定义刷新时间
c:          显示进程命令的全路径与参数
f:          可以指定top显示的内容，如ppid、swap等都可以选择显示
k:          输入k之后可以kill掉指定的进程
A:          分类显示各种系统资源高的进程。可用于快速识别系统上的性能要求极高的任务，推荐使用
h:          获取top的命令帮助
H:          显示线程，默认只显示进程
W:          将当前设置写入~/.toprc文件中。这是写top配置文件的推荐方法
V:          show process tree
l, t, m:    切换负载、任务、内存信息的显示
R:          反向排序
k:          结束任务
```

help：

```
h:help

      Z,B,E,e   Global: 'Z' colors; 'B' bold; 'E'/'e' summary/task memory scale
      l,t,m     Toggle Summary: 'l' load avg; 't' task/cpu stats; 'm' memory info
      0,1,2,3,I Toggle: '0' zeros; '1/2/3' cpus or numa node views; 'I' Irix mode
      f,F,X     Fields: 'f'/'F' add/remove/order/sort; 'X' increase fixed-width

##find!##      L,&,<,> . Locate: 'L'/'&' find/again; Move sort column: '<'/'>' left/right
      R,H,V,J . Toggle: 'R' Sort; 'H' Threads; 'V' Forest view; 'J' Num justify
      c,i,S,j . Toggle: 'c' Cmd name/line; 'i' Idle; 'S' Time; 'j' Str justify
      x,y     . Toggle highlights: 'x' sort field; 'y' running tasks
      z,b     . Toggle: 'z' color/mono; 'b' bold/reverse (only if 'x' or 'y')
      u,U,o,O . Filter by: 'u'/'U' effective/any user; 'o'/'O' other criteria
      n,#,^O  . Set: 'n'/'#' max tasks displayed; Show: Ctrl+'O' other filter(s)
      C,...   . Toggle scroll coordinates msg for: up,down,left,right,home,end

      k,r       Manipulate tasks: 'k' kill; 'r' renice
      d or s    Set update interval
      W,Y       Write configuration file 'W'; Inspect other output 'Y'
      q         Quit
              ( commands shown with '.' require a visible task display window ) 
    Press 'h' or '?' for help with Windows,
```

### tcpdump

### ethtool

### sudo

默认sudo不会传递当前用户的PATH环境变量，而是使用系统默认的，查看sudo使用的PATH：

```shell
sudo env | grep PATH
# PATH=/sbin:/bin:/usr/sbin:/usr/bin
```

参考：[Command not found with sudo, but works without sudo](https://stackoverflow.com/questions/54026213/)

### ss



### sysctl

sysctl is used to modify kernel parameters at runtime. The parameters available are those listed under `/proc/sys/`.

Usage：

```
Usage:
 sysctl [options] [variable[=value] ...]

Options:
  -a, --all            display all variables
  -A                   alias of -a
  -X                   alias of -a
      --deprecated     include deprecated parameters to listing
  -b, --binary         print value without new line
  -e, --ignore         ignore unknown variables errors
  -N, --names          print variable names without values
  -n, --values         print only values of a variables
  -p, --load[=<file>]  read values from file
  -f                   alias of -p
      --system         read values from all system directories
  -r, --pattern <expression>
                       select setting that match expression
  -q, --quiet          do not echo variable set
  -w, --write          enable writing a value to variable
  -o                   does nothing
  -x                   does nothing
  -d                   alias of -h

 -h, --help     display this help and exit
 -V, --version  output version information and exit
```

列出所有变量：

```
sysctl -a
```

读取单个变量：

```
sysctl net.ipv4.ip_local_reserved_ports
```

临时写入单个变量：

```
sysctl -w net.ipv4.ip_local_reserved_ports=21000
```

加载配置文件（默认/etc/sysctl.conf）：

```
sysctl -p
```

### 文件权限

用户分为三类：

1. 文件的 owner
2. 文件 group 的其他 user
3. 其他人

普通权限：

| 权限 | 符号 | 数字 | 应用于文件     | 应用于目录                 |
| ---- | ---- | ---- | -------------- | -------------------------- |
| 读   | r    | 4    | 读取文件的权限 | 列出目录内容的权限         |
| 写   | w    | 2    | 写入文件的权限 | 创建和删除目录内文件的权限 |
| 执行 | x    | 1    | 执行文件的权限 | 访问目录内文件的权限       |

特殊权限：

| 权限     | 符号 | 数字 | 应用于可执行文件                           | 应用于目录                                                   |
| -------- | ---- | ---- | ------------------------------------------ | ------------------------------------------------------------ |
| setuid位 | s    | 4    | 执行时，设置进程的 user id 为文件的 owner  | 目录中创建的文件赋予跟目录相同的 owner，设置子目录的setuid位 |
| setgid位 | s    | 2    | 执行时，设置进程的 group id 为文件的 group | 目录中创建的文件赋予跟目录相同的 group，设置子目录的setgid位 |
| sticky位 | t    | 1    |                                            | 只有对应 owner 才能删除或重命名目录中的文件。                |

#### 符号模式

设置权限格式：

```
users operation permissions
users ::= [ugoa]
operation ::= [+-=]
permissions ::= [rwxXst]
```

例子：

```
// 所有用户均只赋予读写权限
a=rw
// 取消除了 owner 之外的人的所有权限
go-rwx
// 所有用户有权限搜索目录，
// setuid
u+s
// setgid
g+s
set sticky
+t
```

#### 参考

[27 File permissions](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)
