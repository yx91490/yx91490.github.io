# ZooKeeper笔记

## API

### WatchedEvent

- keeperState
- eventType
- path

### KeeperState

- Disconnected
- SyncConnected             客户端连接到其中一台Server
- ConnectedReadOnly    客户端连接到一台只读的Server
- AuthFailed
- SaslAuthenticated
- Expired                           需要创建新的ZooKeeper实例

### EventType

- None
- NodeCreated
- NodeDeleted
- NodeDataChanged
- NodeChildrenChanged

### create(String path, byte data[], List\<ACL\> acl, CreateMode mode)

异步版本：create(String path, byte data[], List\<ACL\> acl, CreateMode mode,  StringCallback cb, Object ctx)

异常：

- KeeperException.NodeExists 节点已存在
- KeeperException.NoNode 父节点不存在
- KeeperException.NoChildrenForEphemerals 临时节点不能创建子节点

临时节点会在会话过期后自动删除

有序节点实际路径名是给定的路径前缀加上一个数字，数字始终是0填充的10位数。

操作成功后会触发该路径上由`exists()`和`getData()`方法产生的监视点，以及父节点由`getChildren()`方法产生的监视点

节点创建成功后，服务端会触发该路径上由`exists()`方法产生的监视点，以及父节点由`getChildren()`方法产生的监视点

数据最大为1MB

### delete(String path, int version)

异步版本：delete(final String path, int version, VoidCallback cb, Object ctx)

异常：

- KeeperException.NoNode
- KeeperException.BadVersion
- KeeperException.NotEmpty 子节点不为空

如果version为-1则匹配所有节点版本。

操作成功后会触发该路径上由`exists()`方法产生的监视点，以及父节点由`getChildren()`方法产生的监视点

### Exists(String path, boolean watch)

异步版本：exists(String path, boolean watch, StatCallback cb, Object ctx)

节点不存在返回null

如果`watch`为true并且成功返回则会创建一个监视点，当节点创建、删除或者设置节点数据的时候会被触发。

### getChildren(String path, boolean watch)

异步版本：getChildren(String path, boolean watch, ChildrenCallback cb, Object ctx)

异常：

- KeeperException.NoNode

如果`watch`为true并且成功返回则会创建一个监视点，当节点删除或者子节点创建、删除的时候会被触发。

返回列表顺序没有保证

### getData(String path, boolean watch, Stat stat)

异步版本：getData(String path, boolean watch, DataCallback cb, Object ctx)

异常：

- KeeperException.NoNode

如果`watch`为true并且成功返回则会创建一个监视点，当 设置节点数据或节点被删除的时候会被触发。

### setData(String path, byte data[], int version)

异常：

- KeeperException.NoNode
- KeeperException.BadVersion

如果version为-1则匹配所有节点版本。

数据最大为1MB

### 回调函数处理

为了保持顺序，异步调用会在单独的一个线程中按照响应的接收顺序处理响应包。因此一般不要在回调函数中集中操作或阻塞操作。

## 管理

ZooKeeper有两种管理接口：JMX和四字母组成的命令。

```
$ telnet 127.0.0.1 2181
telnet> stat
telnet> dump
```

## ACL

总体来说，ZK的节点有5种操作权限：

| 权限   | 名称 | 简写 | 生效范围 | 权限值 |
| ------ | ---- | ---- | -------- | ------ |
| READ   | 查   | r    | 节点自身 | 1      |
| WRITE  | 改   | w    | 节点自身 | 2      |
| CREATE | 增   | c    | 子节点?  | 4      |
| DELETE | 删   | d    | 子节点   | 8      |
| ADMIN  | 管理 | a    | 节点自身 | 16     |

身份的认证有4种方式：

| 方式              | 备注                                            |
| ----------------- | ----------------------------------------------- |
| world（默认方式） | 全世界都能访问                                  |
| auth              | 代表已经认证通过的用户                          |
| digest            | 用户名密码认证：Base64(sha1(username:password)) |
| host              |                                                 |
| ip                | 使用Ip地址认证                                  |

授权

```
setAcl /newznode world:anyone:crdwa

addauth /<node-name> digest <username>:<password>
setAcl /newznode auth:username:password:crdwa #(同一节点不同用户可多次执行)

setAcl /<node-name> ip:<IPv4-address>:<permission-set>	
```

参考

- `org.apache.zookeeper.server.auth.DigestAuthenticationProvider`
- [ZooKeeper access control using ACLs](https://zookeeper.apache.org/doc/r3.1.2/zookeeperProgrammers.html#sc_ZooKeeperAccessControl)

