# HiveQL

#### Hive下变量的使用

Hive的变量前面有一个命名空间，包括hiveconf、system、env，还有一个hivevar

**1.**hiveconf的命名空间指的是hive-site.xml下面的配置变量值。

**2.**system的命名空间是系统的变量，包括JVM的运行环境。

**3.**env的命名空间，是指环境变量，包括Shell环境下的变量信息，如HIVE_HOME之类的。

 **在Linux终端声明变量可以使用**

--define key=value或者是**--hivevar key=value**来声明，这都代表是hivevar的变量。

```
$ hive --define a='love' --define b='you'
//对于使用hivevar定义的变量前缀可有可无
hive> create table toss1(i int, ${hivevar:foo} string); 
//等价于：
hive> create table toss2(i2 int, ${foo} string);
//对于使用命名空间如hiveconf、system、env的，前缀则不可少。
```

> HiveServer2 源码分析

### DML

**装载数据**

LOAD DATA LOCAL INPATH ''

OVERWRITE INTO TABLE emploees

PARTITION(country='us')

**insert ...select的优化**

```
from ...
insert into table 
select
insert overwrite table ...
select
```

使用正则指定列

```
select symbol, price.* from stocks;
```

支持的算术运算符

A+B,A-B,A*B,A/B,A%B,A|B,A^B,~A

数学函数

round(d),floor(d),log10(d),abs(d),sin(d)...

聚合函数

|      |                                   |                             |
| ---- | --------------------------------- | --------------------------- |
|      | count(*)                          | 含有null的总行数            |
|      | count(expr)                       | 提供expr表达式的非null行数  |
|      | count(distinct expr[,expr])       |                             |
|      | sum(distinct col)                 |                             |
|      | avg(distinct col)                 |                             |
|      | variance(col)                     | 方差                        |
|      | var_sampl(col)                    | 样本方差                    |
|      | stddev_pop(col)                   | 标准差                      |
|      | stddev_samp(col)                  | 标准样本方差                |
|      | covar_pop(col)                    | 协方差                      |
|      | covar_samp(col)                   | 样本协方差                  |
|      | corr(col1, col2)                  | 相关系数                    |
|      | percentile(bigint expr, double p) |                             |
|      | histogram_numeric(col, NB)        |                             |
|      | collect_set(col)                  | 返回集合col元素排重后的数组 |

表生成函数:可以将单列扩展成多列或者多行



### sql insert语法

> [LanguageManualDML-Syntax.1](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DML#LanguageManualDML-Syntax.1)



## JOIN

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

