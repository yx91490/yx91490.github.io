# HiveQL

## Hive的变量

Hive的变量前面有一个命名空间：

| 命名空间 | 可省略 | 使用权限 | 详细描述                                                  |
| -------- | ------ | -------- | --------------------------------------------------------- |
| hivevar  | 是     | rw       | 用户自定义变量，通过--define k=v或者是--hivevar k=v来声明 |
| hiveconf | 否     | rw       | hive-site.xml下面的配置变量值                             |
| system   | 否     | rw       | 系统变量，包括JVM的运行环境                               |
| env      | 否     | r        | 环境变量，包括Shell环境下的变量信息                       |

## DQL

利用正则表达式过滤列名：

```sql
--其中col_name* 是指不要查询的列名。
select table.`(col_name1|col_name2|col_name3)?+.+`  from table;
```

支持的算术运算符：

```
A+B,A-B,A*B,A/B,A%B,A|B,A^B,~A
```

### 数学函数

```
round(d),floor(d),log10(d),abs(d),sin(d)...
```

### 聚合函数

| 函数                              | 备注                        |
| --------------------------------- | --------------------------- |
| count(*)                          | 含有null的总行数            |
| count(expr)                       | 提供expr表达式的非null行数  |
| count(distinct expr[,expr])       |                             |
| sum(distinct col)                 |                             |
| avg(distinct col)                 |                             |
| variance(col)                     | 方差                        |
| var_sampl(col)                    | 样本方差                    |
| stddev_pop(col)                   | 标准差                      |
| stddev_samp(col)                  | 标准样本方差                |
| covar_pop(col)                    | 协方差                      |
| covar_samp(col)                   | 样本协方差                  |
| corr(col1, col2)                  | 相关系数                    |
| percentile(bigint expr, double p) |                             |
| histogram_numeric(col, NB)        |                             |
| collect_set(col)                  | 返回集合col元素排重后的数组 |

### JOIN

Hive中除了支持和传统数据库中一样的内关联、左关联、右关联、全关联，还支持LEFT SEMI JOIN和CROSS JOIN，但这两种JOIN类型也可以用前面的代替：

- JOIN
- LEFT JOIN
- RIGTH JOIN
- FULL OUTER JOIN
- Hive LEFT SEMI JOIN
- Hive Cross Join

**注意**：

- Hive中Join的关联键必须在ON ()中指定，不能在Where中指定，否则就会先做笛卡尔积，再过滤。
- FULL JOIN时候，Hive不会使用MapJoin来优化。

## DML

### 装载数据

```sql
LOAD DATA LOCAL INPATH ''
OVERWRITE INTO TABLE emploees
PARTITION(country='us')
```

#### 参考

[LanguageManualDML-Syntax.1](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DML#LanguageManualDML-Syntax.1)

### 动态分区

在`PARTITION()`语句中必须列出所有分区字段。

在`INSERT ... SELECT ...`语句中，动态分区字段必须按照`PARTITION()`语句中的顺序排列在`SELECT`字段的最后。

所有分区字段都是动态分区字段（nonstrict模式生效）：

```sql
SET hive.exec.dynamic.partition=true;
SET hive.exec.dynamic.partition.mode=nonstrict;

INSERT OVERWRITE TABLE T PARTITION (ds, hr)
SELECT key, value, ds, hr FROM srcpart WHERE ds is not null and hr > 10;
```

混合动态分区字段和静态分区字段（如果静态分区字段是动态分区字段的子分区将会抛出异常）：

```sql
INSERT OVERWRITE TABLE T PARTITION (ds='2010-03-03', hr)
SELECT key, value, /*ds,*/ hr FROM srcpart WHERE ds is not null and hr>10;
```

多表插入：

```sql
FROM S
INSERT OVERWRITE TABLE T PARTITION (ds='2010-03-03', hr)
SELECT key, value, ds, hr FROM srcpart WHERE ds is not null and hr>10
INSERT OVERWRITE TABLE R PARTITION (ds='2010-03-03, hr=12)
SELECT key, value, ds, hr from srcpart where ds is not null and hr = 12;
```

`CreateTableAS`语句需要指定所有分区字段：

```sql
CREATE TABLE T (key int, value string) PARTITIONED BY (ds string, hr int) AS
  SELECT key, value, ds, hr+1 hr1 FROM srcpart WHERE ds is not null and hr>10;
```

#### 参考

[DynamicPartitions](https://cwiki.apache.org/confluence/display/Hive/DynamicPartitions)

