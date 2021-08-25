# Hive配置参数详解

## 内存

`mapreduce.map.memory.mb`

`mapred.map.child.java.opts`



| 配置项                               | 说明                                  |
| ------------------------------------ | ------------------------------------- |
| mapreduce.map.java.opts              | map JVM参数                           |
| mapreduce.reduce.java.opts           | reduce JVM参数                        |
| mapreduce.map.memory.mb              | map task总内存，包括堆、栈、类定义    |
| mapreduce.reduce.memory.mb           | reduce task总内存，包括堆、栈、类定义 |
| mapreduce.reduce.memory.totalbytes   |                                       |
| yarn.scheduler.maximum-allocation-mb | yarn集群侧内存限制                    |
| yarn.app.mapreduce.am.command-opts   | ApplicationMaster                     |
| yarn.app.mapreduce.am.resource.mb    | ApplicationMaster                     |

> 经验值：
>
> 将JVM参数`-Xmx`设置为相应`memory.mb`的75%

### 参考：

- [What is the relation between 'mapreduce.map.memory.mb' and 'mapred.map.child.java.opts' in Apache Hadoop YARN?](https://stackoverflow.com/questions/24070557/what-is-the-relation-between-mapreduce-map-memory-mb-and-mapred-map-child-jav)
- JobConf.java
- MRJobConfig.java

## MapJoin

### hive.auto.convert.join

说明：是否自动转换为mapjoin

默认值：true

### hive.mapjoin.smalltable.filesize

说明：小表的最大文件大小，默认为25M

默认值：2500000

| 配置项                                               | 默认值  | 说明                                                         |
| ---------------------------------------------------- | ------- | ------------------------------------------------------------ |
| hive.auto.convert.join                               | True    |                                                              |
| hive.mapjoin.smalltable.filesize                     | 2500000 | 小表的最大文件大小，默认为25M                                |
| hive.auto.convert.join.noconditionaltask             |         | 是否将多个mapjoin合并为一个                                  |
| hive.auto.convert.join.noconditionaltask.size        |         | 多个mapjoin转换为1个时，所有小表的文件大小总和的最大值       |
| hive.mapjoin.localtask.max.memory.usage              | 0.9     | 将小表转成hashtable的本地任务的最大内存使用率                |
| hive.mapjoin.followby.gby.localtask.max.memory.usage | 0.55    | 如果mapjoin后面紧跟着一个group by任务，这种情况下 本地任务的最大内存使用率 |
| hive.mapjoin.check.memory.rows                       | 100000  | localtask每处理完多少行，就执行内存检查。如果我们的localtask的内存使用超过阀值，任务会直接失败。 |

mapjoin还有一个很大的好处是能够进行不等连接的join操作，如果将不等条件写在where中，那么mapreduce过程中会进行笛卡尔积，运行效率特别低，如果使用mapjoin操作，在map的过程中就完成了不等值的join操作，效率会高很多。

简单总结一下，mapjoin的使用场景：

1. 关联操作中有一张表非常小
2. 不等值的链接操作

使用mapjoin时，会先执行一个本地任务(mapreduce local task)将小表转成hashtable并序列化为文件再压缩，随后这些hashtable文件会被上传到hadoop缓存，提供给各个mapjoin使用。这里有三个参数我们需要注意：

### 参考

- [Hive SQL中的mapjoin参数优化说明](https://blog.csdn.net/maenlai0086/article/details/90763593)
- [HIVE MapJoin异常问题处理总结](https://blog.csdn.net/nysyxxg/article/details/73872245)

## 磁盘空间相关



## 权限认证

Sentry仅在group上发挥作用。

组管理通常有两种方式：基于shell，或者基于LDAP，参考Hadoop的"Hadoop User Group Mapping Implementation"配置项。

参考：

[Cloudera Community Role based authorization](https://community.cloudera.com/t5/Support-Questions/Role-based-authorization/td-p/23357)

[Hive SQL Syntax for Use with Sentry](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/sg_hive_sql.html)

[SQL Standard Based Hive Authorization](https://cwiki.apache.org/confluence/display/Hive/SQL%20Standard%20Based%20Hive%20Authorization)

[Authorization With Apache Sentry](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/sg_sentry_overview.html#sentry_overview)

## 参考

官方文档：

[LanguageManual](https://cwiki.apache.org/confluence/display/Hive/LanguageManual)

[UserDocumentation](https://cwiki.apache.org/confluence/display/Hive/Home#Home-UserDocumentation)

[Configuration Properties](https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties)

其他：

[hive 配置参数说明](https://blog.csdn.net/mingming20547/article/details/99949397)

[Hive 设置map 和 reduce 的个数](https://www.cnblogs.com/1130136248wlxk/articles/5352154.html)

[Hive的性能优化以及数据倾斜](https://www.jianshu.com/p/daa4e7c86925)

hive reduce hive.exec.reducers.bytes.per.reducer