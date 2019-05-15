# Zeppelin v0.8分片方案

### 目标

尽量将paragraph的执行均衡分布到多台机器执行，对运行超过一定时间的任务及时释放解释器资源。

### 方案

1. 一个note只对应唯一的用户,同一个note不为多用户保留各自的状态
2. interpreter都配置为peruser,pernote,保证一个note和一个interpreter关联,interpreter资源释放不影响其他note
3. 因为一个note同一种类型的paragraph会有上下文关联，所以要代理到同一个zeppelin server上执行；不同类型的paragraph可以代理到不同的zeppelin server
4. note仓库配置为mongodb存储
5. 文本类操作执行后刷新全部server的note仓库，保证所有server的note仓库是同步的
6. 对于运行类操作（运行，停止，运行全部，停止全部，清空所有结果）会记录最后运行时间和当前sever
7. 一个note的某个类型的paragraph超过2小时没有运行过则重新分配到负载低的server
8. 为了保证重新分配server后还能获取到上次的运行结果，获取结果的API要代理到上次运行的server上

### 测试方案

1. 代理在一台server上时，文本类操作和运行类操作是否正常
2. 2小时过期后是否能切换到负载低的server上
3. server切换后能否获取到上次运行的结果
4. server切换后，文本类操作和运行类操作是否正常
5. 一个note包含多种类型的paragraph是否正常代理到不同的server
6. server扩容缩容是否正常
7. 有大量并发任务的时候是否正常

### 实现

1. 路由表记录`note:type`指向的server
2. 运行类操作（运行，停止，运行全部，停止全部，清空所有结果）每次会记录last server和最后运行时间
3. result和status请求直接从last server代理
4. 运行时发现当前server过期或宕机则重新分配代理server；如果server宕机则记录机器不可用
5. 使用默认的LifeCycleManager管理解释器的生命周期（超过2小时自动释放）
6. note仓库配置为mongodb存储
7. 文本类操作执行后刷新全部server的note仓库，保证所有server的note仓库是同步的
