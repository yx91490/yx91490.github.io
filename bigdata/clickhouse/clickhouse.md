# ClickHouse学习笔记

## 架构原理

列式存储除了降低IO和存储的压力外，还为向量化执行创造了条件。

ClickHouse目前使用SSE4.2指令集实现向量化执行

## 使用指南

ClickHouse SQL是大小写敏感的。

### Table TTL

表TTL的语法：

```
TTL expr
    [DELETE|TO DISK 'xxx'|TO VOLUME 'xxx'][, DELETE|TO DISK 'aaa'|TO VOLUME 'bbb'] ...
    [WHERE conditions]
    [GROUP BY key_expr [SET v1 = aggr_func(v1) [, v2 = aggr_func(v2) ...]] ]
```

当TTL表达式的结果小于当前时间的时候，意味着此行数据已经过期，则执行对应的操作。

TTL规则类型包括：

| 规则            | 动作                                              |
| --------------- | ------------------------------------------------- |
| DELETE          | 删除过期的行                                      |
| TO DISK 'aaa'   | 将part移动到磁盘'aaa'，需要part的所有行都满足条件 |
| TO VOLUME 'bbb' | 将part移动到磁盘'bbb'，需要part的所有行都满足条件 |
| GROUP BY        | 聚合过期的行                                      |

WHERE语句指定过期的行中删除或者聚合哪些行（没法应用于移动）。

GROUP BY表达式必须是表主键的前缀。

例子：

设置表的过期策略的时候，一般都是保留最近连续一段时间的数据。比如这样定义表结构是根据dt保留最近一周的数据：

```
CREATE TABLE ttl_demo
(
    `id` Int32,
    `dt` String COMMENT 'dt分区字段',
    `hour` String COMMENT '小时字段'
)
ENGINE = MergeTree()
ORDER BY id
TTL parseDateTimeBestEffort(dt) + toIntervalWeek(1);
```

有个业务方的需求有点奇怪，有一张表他希望保留最近一个月的数据，以及历史每天23点的数据。

一开始以为用TTL做不了，需要写任务每天定时删数据，后来仔细想了一下其实ClickHouse的数据过期策略的粒度不是分区，而是细分到了每一行，将这种特定的过期策略转化为对应的TTL表达式就可以达到目的了：

```
ALTER TABLE ttl_demo MODIFY TTL if(hour = '23', toDate('2105-01-01'), parseDateTimeBestEffort(dt) + toIntervalWeek(1));
```

表达式的意思是如果hour值等于23则返回一个不会过期的日期，否则返回dt加1周的日期。

我们来验证一下：

```
insert into ttl_demo values(2021080101, '20210801', '01'), (2021080123, '20210801', '23'), (2021090101, '20210901', '01');
select * from ttl_demo;
┌─────────id─┬─dt───────┬─hour─┐
│ 2021080101 │ 20210801 │ 01   │
│ 2021080123 │ 20210801 │ 23   │
│ 2021090101 │ 20210901 │ 01   │
└────────────┴──────────┴──────┘

-- 强制回收掉过期数据
OPTIMIZE TABLE ttl_demo FINAL;

select * from ttl_demo;
┌─────────id─┬─dt───────┬─hour─┐
│ 2021080123 │ 20210801 │ 23   │
│ 2021090101 │ 20210901 │ 01   │
└────────────┴──────────┴──────┘
```

后来看了官方文档上的TTL表达式语法发现后面还可以指定一个WHERE语句，于是试了试表达式这样写也是OK的：

```
ALTER TABLE ttl_demo MODIFY TTL parseDateTimeBestEffort(dt) + toIntervalWeek(1)
where hour != '23';
```

从这里也可以看出ClickHouse这个手动挡的枪是有多么的“灵活”：虽然不是最简便的，但确实是可以最大程度发挥你主观能动性的一把武器。

#### 参考

[Table TTL](https://clickhouse.tech/docs/en/engines/table-engines/mergetree-family/mergetree/#mergetree-table-ttl)

[Manipulations with Table TTL](https://clickhouse.tech/docs/en/sql-reference/statements/alter/ttl/)

[OPTIMIZE Statement](https://clickhouse.tech/docs/en/sql-reference/statements/optimize/)