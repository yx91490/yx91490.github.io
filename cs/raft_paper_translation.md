# 【译】寻找一种易于理解的一致性算法





## 5. Raft 一致性算法

**状态：**

在所有服务器上持久存在的（在响 RPC 之前稳定存储的）：

| 属性        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| currentTerm | 服务器最后知道的任期号（从 0 开始递增）                      |
| votedFor    | 在当前任期内收到选票的candidateId（如果没有则为 null）       |
| log[]       | 日志条目；每个条目包含状态机的要执行命令和从leader处收到时的任期号 |

在所有服务器上不稳定存在的：

| 属性        | 说明                                                  |
| ----------- | ----------------------------------------------------- |
| commitIndex | 已知的将被提交的最大日志条目的索引值（从 0 开始递增） |
| lastApplied | 被状态机执行的最大日志条目的索引值（从 0 开始递增）   |

在leader服务器上不稳定存在的（选举之后重新初始化）：

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| nextIndex[]  | 对于每一个服务器，记录需要发给它的下一个日志条目的索引（初始化为leader上一条日志的索引值 +1） |
| matchIndex[] | 对于每一个服务器，记录已经复制到该服务器的日志的最高索引值（从 0 开始递增） |

**AppendEntries RPC（leader调用，用来复制日志（5.3 节）；也会用作心跳）：**

参数：

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| term         | leader的任期                                                 |
| leaderId     | 为了follower能重定向客户端的请求                             |
| prevLogIndex | 最新日志之前的日志的索引值                                   |
| prevLogTerm  | prevLogIndex的任期                                           |
| entries[]    | 将要存储的日志条目（表示心跳时为空，有时会为了效率发送超过一条） |
| leaderCommit | leader的commitIndex                                          |

返回值：

| 属性    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| term    | 当前的任期号，用于leader更新自己的任期号                     |
| success | 如果follower包含能够匹配上 prevLogIndex 和 prevLogTerm 的日志时为真 |

Receiver实现：

1. 如果 `term < currentTerm`返回 false（5.1 节）
2. 如果在`prevLogIndex`处的日志的任期号与`prevLogTerm`不匹配时，返回 false（5.3 节）
3. 如果一条已经存在的日志与新的冲突（index 相同但是任期号 term 不同），则删除已经存在的日志和它之后所有的日志（5.3 节）
4. 添加任何在已有的日志中不存在的新条目
5. 如果`leaderCommit > commitIndex`，将`commitIndex`设置为`leaderCommit`和最新日志条目索引号中较小的一个

**RequestVote RPC（由候选人发起用于收集选票）：**

参数：

| 属性         | 说明                              |
| ------------ | --------------------------------- |
| term         | candidate的任期号                 |
| candidateId  | 请求投票的candidate Id            |
| lastLogIndex | candidate最新日志条目的索引值     |
| lastLogTerm  | candidate最新日志条目对应的任期号 |

返回值：

| 属性        | 说明                                |
| ----------- | ----------------------------------- |
| term        | 目前的任期号，candidate用于更新自己 |
| voteGranted | 如果candidate收到选票为 true        |

Receiver实现：

1. 如果`term < currentTerm`返回 false（5.1 节）
2. 如果`votedFor`为null或者与`candidateId`相同，并且candidate的日志至少和receiver的日志一样新，则给candidate投票（5.2 节 和 5.4 节）

**服务器需要遵守的规则：**

所有服务器：

- 如果`commitIndex > lastApplied`，`lastApplied`自增?，将`log[lastApplied]`应用到状态机（5.3 节）
- 如果 RPC 的请求或者响应中包含一个 term T > `currentTerm`，则`currentTerm=T`，并切换状态为Follower（5.1 节）

Followers：

- 响应来自leader和candidate的 RPC
- 如果在选举超时之前没有收到来自当前leader的`AppendEntries RPC`或者没有收到candidate的投票请求，则自己转换状态为candidate

Candidates：

- 当变为candidate之后，开始选举：
  - `currentTerm`自增
  - 给自己投票
  - 重置选举计时器
  - 向其他服务器发送`RequestVote RPC`
- 如果收到了来自大多数服务器的投票：成为leader
- 如果收到了来自新leader的`AppendEntries RPC（heartbeat）`：转换状态为follower
- 如果选举超时：开始新一轮的选举

Leaders：

- 一旦当选：向每个服务器初始发送一个空的`AppendEntries RPC（heartbeat）`; 在空闲时间重复发送以防止选举超时（5.2 节）
- 如果收到来自客户端的请求：向本地日志增加条目，在该条目应用到状态机后响应客户端（5.3 节）  
- 对于一个follower来说，如果上一次收到的日志index> nextIndex：通过`AppendEntries RPC`将 nextIndex 之后的所有日志条目发送出去
  - 如果发送成功：将该follower的 `nextIndex`和`matchIndex`更新
  - 如果由于日志不一致导致`AppendEntries RPC`失败：`nextIndex`递减并且重新发送（5.3 节）
- 如果存在一个N满足`N > commitIndex`和大多数`matchIndex[i] >= N`并且`log[N].term == currentTerm`，则将`commitIndex`赋值为 N  
