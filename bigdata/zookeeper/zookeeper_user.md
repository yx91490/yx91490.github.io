# ZooKeeper管理员指南

## 配置参数

### 最小化配置

必须在配置文件中定义的最小化配置项：

| 配置项     | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| clientPort | 监听客户端连接的端口，也就是客户端尝试连接的端口             |
| dataDir    | ZooKeeper存储内存数据库快照以及数据库更新的事务性日志（没有特别指定的话）的位置。<br />注意：谨慎选择事务日志的位置，一个专用设备是高性能的关键，把日志放到一个高负载的设备会影响性能。 |
| tickTime   | 单个tick长度，也是ZooKeeper使用的基本时间单元，按毫秒计时。也被用来规定心跳和超时。例如最小的会话超时时间是2个tick。 |

### 高级配置

| 配置项                    | 默认值          | java系统变量                       | 说明                                                         |
| ------------------------- | --------------- | ---------------------------------- | ------------------------------------------------------------ |
| dataLogDir                |                 | 无                                 | 此项使事务性日志写入dataLogDir目录而非dataDir目录。允许使用专用日志设备来避免写入日志和做快照之间的竞争。<br />注意：是否拥有一个专用设备对吞吐量和稳定性有很大影响。强烈建议使用专有日志设备并设置dataLogDir指到此设备的某个目录，并且保证使dataDir目录指到别的设备上。 |
| globalOutstandingLimit    | 1000            | zookeeper.globalOutstandingLimit   | 客户端提交请求能比ZooKeeper处理它们要快，尤其是当有很多客户端的时候。为了防止ZooKeeper队因为列请求耗尽内存，ZooKeeper会对客户端限流来保证系统中不会出现超出globalOutstandingLimit的未处理请求。 |
| preAllocSize              | 64\*1024\*1024  | zookeeper.preAllocSize             | 为避免寻址ZooKeeper在事务性日志文件中按`preAllocSize`字节块分配的空间。更改块大小的一个原因是当需要经常做快照时减小块大小（参考snapCount）。 |
| snapCount                 | 100,000         | zookeeper.snapCount                | ZooKeeper记录事务到事务日志中，在snapCount事务写入一个日志文件后会开始一个新的快照并且创建一个新的事务日志文件。 |
| maxClientCnxns            | 60              | 无                                 | 限制以IP地址标识的一个客户端可以对ZooKeeper集群的某个节点发起的（socket级别）并发连接数。这样可以防止某一类（包括文件描述符耗尽）的Dos攻击。设置为0会完全解除对并发连接数的限制。 |
| clientPortAddress         |                 |                                    | 3.3.0新增：监听客户端发起连接的地址（ipv4,ipv6或者host）。也就是客户端尝试连接的地址。这是可选项，默认从任何地址/interface/nic发起对服务器的clientPort的连接都会被接受。 |
| minSessionTimeout         | 2 * `tickTime`  | 无                                 | 3.3.0新增：服务端运行客户端协商的按毫秒计算的最小会话超时时间，默认为2倍的`tickTime`。 |
| maxSessionTimeout         | 20 * `tickTime` | 无                                 | 3.3.0新增：服务端运行客户端协商的按毫秒计算的最大会话超时时间，默认为20倍的`tickTime`。 |
| fsync.warningthresholdms  | 1000            | zookeeper.fsync.warningthresholdms | 当事务日志（WAL）中的某个个fsync超过此值时会打印waring日志。单位是毫秒，此项仅能通过系统属性设置。 |
| autopurge.snapRetainCount | 3               | 无                                 | ZooKeeper自动清理特性保留最近的`autopurge.snapRetainCount`个分别在dataDir和dataLogDir中的快照和对应的事务日志，最小值是3。 |
| autopurge.purgeInterval   | 0               | 无                                 | 按小时计算的清理任务触发的时间间隔，设置为正数会开启自动清理。 |
| syncEnabled               | true            | zookeeper.observer.syncEnabled     | observer现在默认会像participant记录事务日志并且写入快照到磁盘，设为false关闭这项特性。 |

### 集群选项

以下选项被设计用来部署集群时使用。

| 配置项                                 | 默认值 | Java系统属性           | 说明                                                         |
| -------------------------------------- | ------ | ---------------------- | ------------------------------------------------------------ |
| leaderServes                           | yes    | zookeeper.leaderServes | leader是否接受客户端的连接请求。leader机器负责协调更新。leader可以配置为不接受client请求专注于协调服务，从而以牺牲较少的读取的吞吐量来获得更高的更新吞吐量。注意：当集群超过3个节点时强烈建议开启？ |
| electionAlg                            | 3      | 无                     | 使用的选举实现方式。0对应于最开始基于UDP的版本，1对应于非认证的基于UDP的快速leader选举，2对应于认证的基于UDP的快速leader选举，3对应于认证的基于TCP的快速leader选举。<br />注意：当前leader选举的0，1，2实现是废弃的。打算在下一个版本中移除它们，只保留FastLeaderElection。 |
| initLimit                              |        | 无                     | 按tick（参见tickTime）计算的允许follower连接并同步到leader的时间。当ZooKeeper管理的数据很大时可以调大此值。 |
| syncLimit                              |        | 无                     | 按tick（参见tickTime）计算的允许follower和ZooKeeper同步的时间。如果follower远远落后于leader则会被丢弃。 |
| server.x=[hostname]:nnnnn[:nnnnn], etc |        | 无                     | 服务器组成了ZooKeeper集群。当server启动时根据data目录下的myid文件确认自己。那个文件包含了ASCII编码的服务器数字，那个数字应该和左边配置`server.x`中的`x`相匹配。<br />客户端使用的server端列表必须和每台ZooKeeper服务器的列表相匹配。<br />这里有两处端口号。第一个是follower用来连接leader的，第二个用来leader选举。只有当`electionAlg`是1，2，3时第二个端口号才是必要的。如果`electionAlg`是0，第二个端口号是不需要的。如果你想在一台机器上测试多个server，每个server可以设置不同的端口号。 |
| group.x=nnnnn[:nnnnn]                  |        | 无                     | 启用分层的仲裁集。`x`是组的标识。等号右边边是冒号分隔的服务器标识列表。注意组必须是不相交的，所有组的并集必须是整个ZooKeeper集群。 |
| weight.x=nnnnn                         |        | 无                     | 和group搭配使用。它指定了组成法定个数时server的权重。对应于投票时server的权重。ZooKeeper只有少数需要投票的情况，比如leader选举，以及原子性广播协议。server默认权重为1。如果配置了group而没有weight，所有server会赋值为1。 |
| cnxTimeout                             | 5      | zookeeper.cnxTimeout   | 连接leader选举通知的超时时间，仅当electionAlg使用3时有效。   |

### 认证鉴权选项

本章的选项可以控制服务的认证和鉴权。

| 配置项 | 系统属性                                           | 说明                                                         |
| ------ | -------------------------------------------------- | ------------------------------------------------------------ |
|        | zookeeper.DigestAuthenticationProvider.superDigest | 3.2新增：ZooKeeper仲裁管理员作为超级用户访问znode结构，尤其是对于超级用户没有ACL检查。<br />使用参数`super:<password>`调用`org.apache.zookeeper.server.auth.DigestAuthenticationProvider`可以生成`superDigest`，在集群中server启动的时候系统属性中提供了生成的`super:<data>`。当（ZooKeeper客户端）到ZooKeeper服务端认证时要传递scheme`digest`和认证数据`super:<password>`。注意digest认证通过明文传递给服务端，必须谨慎的只在localhost（而非通过网络）使用，或者通过加密连接传递。 |
| isro   |                                                    | 3.4.0新增：检测服务器是否运行于只读模式。服务端返回"ro"代表只读模式，返回"rw"代表非只读模式。 |
| gtmk   |                                                    | 以十进制格式获取当前64位有符号长整型的跟踪掩码。参考`stmk`获取可能的值。 |
| stmk   |                                                    | 设置当前的跟踪掩码。跟踪掩码是64位，每一bit位开启或禁用一类服务端的跟踪日志。LOG4J必须配置为开启TRACE级别日志从而能够看到跟踪日志信息。跟踪掩码的各个bit位对应了下面的跟踪日志目录。 |

| 跟踪掩码bit位 | 说明                                   |
| ------------- | -------------------------------------- |
| 0b0000000000  | 无效，留给将来使用                     |
| 0b0000000010  | 记录客户端请求，ping请求除外           |
| 0b0000000100  | 无效，留给将来使用                     |
| 0b0000001000  | 记录客户端ping请求                     |
| 0b0000010000  | 记录从当前leader收到的包，ping请求除外 |
| 0b0000100000  | 记录客户端会话的添加，删除以及验证     |
| 0b0001000000  | 记录客户端会话监听事件的投递           |
| 0b0010000000  | 记录当前leader的ping请求包             |
| 0b0100000000  | 无效，留给将来使用                     |
| 0b1000000000  | 无效，留给将来使用                     |

64位值中的其他bit位都是保留供将来使用的。通过计算OR值来指定多种跟踪日志类型。默认跟踪掩码是`0b0100110010`，也就是默认跟踪日志包括客户端请求，从leader和会话接收的包。

发送四字符`stmk`紧接着64位掩码值来设置不同的的跟踪掩码。下面例子使用Perl`pack`函数来构造一个跟踪掩码：开启上面描述的所有跟踪日志类型，转为大端序的64位有符号长整型值。结果追加到`stmk`后面并使用netcat发送给服务端。服务端返回新的十进制格式的跟踪掩码：

```
$ perl -e "print 'stmk', pack('q>', 0b0011111010)" | nc localhost 2181
250
```

### 实验性的选项/特性

目前是实验性的新特性。

| 配置项   | Java系统属性         | 说明                                                         |
| -------- | -------------------- | ------------------------------------------------------------ |
| 只读模式 | readonlymode.enabled | 3.4.0新增：设置此值为true来开启只读模式（默认禁用）。制度模式允许客户端会话连接到那些甚至从仲裁集中分区的服务端。客户端依然可以读取数据，但是不能写入数据和从其他客户端看到变更。更多详情参考ZOOKEEPER-784。 |

### Unsafe选项

下面的选项可能很有用，但是谨慎使用。在阐明变量的作用的同时也阐明了每一项的风险。

| 配置项               | 系统属性            | 默认值  | 说明                                                         |
| -------------------- | ------------------- | ------- | ------------------------------------------------------------ |
| forceSync            | zookeeper.forceSync |         | 在完成变更之前要求变更同步到媒介。如果此项设为no，ZooKeeper将不会要求变更同步到媒介。 |
| jute.maxbuffer       | jute.maxbuffer      | 0xfffff | 此项仅能通过系统属性设置。没有`zookeeper`前缀。它指定了单个znode可以存储的最大数据大小。默认值是`0xfffff`也就是小于1M。如果此项变更了，所有客户端以及服务端都要设置系统属性否则会出问题。这是明智的检查。ZooKeeper被设计用来存储近似KB级的数据。 |
| skipACL              | zookeeper.skipACL   |         | 跳过ACL检查。这将提高吞吐量，但将会开放数据树的访问权限给所有人。 |
| quorumListenOnAllIPs |                     | false   | 当设置为true的时候，ZooKeeper服务端将会监听所有IP的请求，而不仅是配置文件中配置的地址。它会影响处理ZAB协议的连接以及leader选举协议。 |

### 使用netty框架通信

3.4新增：Netty是基于NIO的客户端/服务端通信框架，它为java应用简化了许多的网络层通信的复杂度。此外Netty框架也内置了对加密（SSL）和认证（证书）的支持。这些是可选的特性可以被单独的启用或禁用。<br />3.4之前ZooKeeper总是直接使用NIO，在3.4之后的版本支持Netty作为NIO的一个替代。NIO依然作为默认选项，然而基于Netty的通信可以通过设置环境变量`zookeeper.serverCnxnFactory`为`org.apache.zookeeper.server.NettyServerCnxnFactory`替换NIO。在客户端和服务端都可以设置此项。通常你想要都设置，但是你有量裁的自由。

## 参考

- [Configuration Parameters](https://zookeeper.apache.org/doc/r3.4.9/zookeeperAdmin.html#sc_configuration)