# Impala官方文档

## 【译】Impala分析函数

分析函数（也称为窗口函数）是一类特殊的内置函数。与聚合函数一样，它们检查多个输入行的内容以计算每个输出值。它们并不限于每个`GROUP BY`分组只有一个结果值，而是在由`Over()`子句对输入行进行排序和灵活分组的窗口上进行操作。

**加入：** Impala 2.0.0

某些函数（例如`LAG()`和`RANK()`）只能在此分析上下文中使用。一些聚合函数执行双重任务：当您使用 `OVER()`子句调用聚合函数（例如 `MAX()`、`SUM()`、`AVG()`等）时，它们会根据窗口中其他行的计算为每一行生成一个输出值。

尽管分析函数通常计算出与`GROUP BY`查询中的聚合函数相同的值 ，但分析函数会为结果集中的每一行生成一个值，而不是为每个组生成一个值。这种灵活性使您可以在`SELECT`列表中包含其他列，从而为组织和过滤结果集提供更多机会。

只允许在`SELECT`列表和最外层`ORDER BY`查询的子句中调用分析函数。在查询过程中，分析函数在其他查询阶段（如join、`WHERE`、 和 `GROUP BY`）之后进行求值，分区的每一行通过在有序或无序行集上的计算进行分析。例如，`COUNT()`and`SUM()`可能应用于分区中的所有行，在这种情况下，分析顺序无关紧要。`ORDER BY`子句可以在`OVER()`子句内部使用，以定义适用于`LAG()`和`FIRST_VALUE()`等函数的顺序。

分析函数经常用于金融和科学等领域，为大型数据集提供趋势、异常值和分桶分析。您可能还会在数据库文献中看到术语“窗口函数”，指的是函数调用所适用的行序列（“窗口”），特别是当`OVER`子句包含`ROWS`or`RANGE` 关键字时。

以下部分描述了 Impala 提供的分析查询语句和纯解析函数。有关在分析上下文中聚合函数的使用信息，请参阅 [Impala 聚合函数](https://impala.apache.org/docs/build/html/topics/impala_aggregate_functions.html#aggregate_functions)。

### OVER 子句

`OVER`子句对于如 `LEAD()`，`RANK()`，和`FIRST_VALUE()`这样的纯分析函数是必须的。当你调用`MAX()`， `COUNT()`或者`SUM()`这样的聚合函数并引入 `OVER`子句时，他们的操作与分析函数一样。

**语法：**

```sql
function(args) OVER([partition_by_clause] [order_by_clause [window_clause]])

partition_by_clause ::= PARTITION BY expr [, expr ...]
order_by_clause ::= ORDER BY expr  [ASC | DESC] [NULLS FIRST | NULLS LAST] [, expr [ASC | DESC] [NULLS FIRST | NULLS LAST] ...]
window_clause: See Window Clause
```

**PARTITION BY 子句：**

`PARTITION BY`子句的作用与查询最外层块中的`GROUP BY`子句非常相似。它将行按一列或多列中的相同值进行分组。这些逻辑分组称为分区。在分析函数的整个讨论中，“分区”是指由`PARTITION BY`子句生成的组，而不是分区表。但是，请注意以下特别适用于涉及分区表的分析函数调用的限制。

在涉及分析函数和分区表的查询中，分区修剪仅发生于在分析函数调用的`PARTITION BY`子句中命名的列上。例如，如果一个解析函数查询有一个诸如 的子句 `WHERE year=2016`，则使查询修剪所有其他 `YEAR`分区的方法是包含`PARTITION BY year`在解析函数调用中；例如，。 `OVER (PARTITION BY year,other_columns other_analytic_clauses)`

分析函数为结果集中的每个新分区“重置”结果序列。也就是说，分析函数所考虑的前一行或后一行的集合总是来自单个分区。任何`MAX()`、`SUM()`、`ROW_NUMBER()`等等独立地应用于每个分区。省略`PARTITION BY`子句会将分析操作应用于表中的所有行。

**ORDER BY 子句：**

该`ORDER BY`子句的工作方式与`ORDER BY`查询最外层块中的子句非常相似。它定义了为整个输入集或为`PARTITION BY`子句生成的每个组评估行的顺序。您可以按一个或多个表达式排序，并且可以为每个表达式选择升序或降序，以及空值是排在第一位还是最后一位。因为这个`ORDER BY`子句只定义了行被求值的顺序，如果你想按照特定的顺序输出结果，还要`ORDER BY`在查询的外层块中包含一个子句。

当`ORDER BY`子句被省略时，分析函数适用于该`PARTITION BY`子句产生的组中的所有项目。当`ORDER BY`包含子句时，分析可以应用于组中的所有项目或部分项目，具体取决于可选的窗口子句。

分析行的顺序仅针对`ORDER BY`子句中指定的那些列定义。

所述的分析和外用途之间的一个区别`ORDER BY`子句：内部 `OVER`子句，`ORDER BY 1`或其它整数值被解释为一个恒定值的排序（有效无操作），而不是指塔1。













## 参考

[Apache - Impala Analytic Functions](https://impala.apache.org/docs/build/html/topics/impala_analytic_functions.html)

[Cloudera - Impala Analytic Functions](https://docs.cloudera.com/documentation/enterprise/5-16-x/topics/impala_analytic_functions.html)

