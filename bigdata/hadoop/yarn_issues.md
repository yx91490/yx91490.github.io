# Yarn问题记录

## 一个Yarn资源分配失败的问题

同事在一个三台节点的集群上运行Flink任务失败，报错日志：

```
org.apache.flink.client.program.ProgramInvocationException: The main method caused an error: Could not deploy Yarn job cluster.
```

排查后发现集群的vcore和memory全都为0，也没有可用节点：

![yarn_no_resource](./yarn_issues.assets/yarn_no_resource.png)

YarnUI `http://rmhost:8088/cluster/nodes/unhealthy`上的日志显示：

```
1/1 local-dirs are bad: /yarn/nm; 1/1 log-dirs are bad: /yarn/container-logs
```

后来发现是磁盘的使用率达到90%以上，超过了参数`yarn.nodemanager.disk-health-checker.max-disk-utilization-per-disk-percentage`的设置，没有可用的nodemanager导致的。

清理了下磁盘日志文件后恢复正常了。

### 参考

[1/1 local-dirs are bad: /yarn/nm; 1/1 log-dirs are bad: /yarn/container-logs](https://community.cloudera.com/t5/Support-Questions/1-1-local-dirs-are-bad-yarn-nm-1-1-log-dirs-are-bad-yarn/td-p/145718)