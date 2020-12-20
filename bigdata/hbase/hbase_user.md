# HBase使用

### 1.负载均衡

没有启用负载均衡的提示：

```
The Load Balancer is not enabled which will eventually cause performance degradation in HBase as Regions will not be distributed across all RegionServers. The balancer is only expected to be disabled during rolling upgrade scenarios.
```

启用负载均衡：

```
balance_switch true
```


### 2.资源隔离

通过rsgroup可以把指定表的所有region限定在指定的region server上：

```shell
# 创建rsgroup
add_rsgroup 'my_group'
# 把rsgroup限定在指定的region server上
move_servers_rsgroup 'my_group',['server1:port','server2:port']
# 把表划归到rsgroup中
move_tables_rsgroup 'dest',['table1','table2']
```
也可以创建namespace时指定rsgroup：

```shell
create_namespace 'my_namespace', {'hbase.rsgroup.name' => 'my_group'}
```
