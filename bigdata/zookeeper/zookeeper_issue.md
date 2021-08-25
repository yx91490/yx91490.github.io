# Zookeeper Issue

### 1.集群扩容报错

```
下午1点43:29.414分  INFO    FastLeaderElection  
Notification time out: 60000
下午1点43:29.414分  INFO    FastLeaderElection  
Notification: 3 (n.leader), 0x1700007972 (n.zxid), 0x1 (n.round), LOOKING (n.state), 1 (n.sid), 0x17 (n.peerEPoch), LOOKING (my state)
下午1点43:29.414分  INFO    FastLeaderElection  
Notification: 3 (n.leader), 0x1700007972 (n.zxid), 0x1 (n.round), LOOKING (n.state), 3 (n.sid), 0x17 (n.peerEPoch), LOOKING (my state)
下午1点43:29.414分  INFO    QuorumCnxManager    
Have smaller server identifier, so dropping the connection: (2, 1)
下午1点43:29.415分  INFO    QuorumCnxManager    
Have smaller server identifier, so dropping the connection: (4, 1)
下午1点43:29.415分  INFO    QuorumCnxManager    
Have smaller server identifier, so dropping the connection: (5, 1)
```

原因：

新增节点的myId必须大于之前的myId。

