## Hive解析json数组

### sql

```mysql
SELECT id, get_json_object(input_path_json_col, '$.path') AS input_path
FROM (
	SELECT id, input_path_json_col
	FROM (
		SELECT id
			, split(
				regexp_replace(
				regexp_extract(input_path, '^\\[(.+)\\]$', 1)
				, '\\}\\,\\{'
				, '\\}\\|\\|\\{')
			, '\\|\\|') 
			AS input_path_json
		FROM ods.o_t_job_spark_bigdata_test
	) tmp
		LATERAL VIEW explode(tmp.input_path_json) spark_job AS input_path_json_col
) exp
```
### 函数

regexp_extract(string subject, string pattern, string index)

​	抽取字符串subject中符合正则表达式pattern的第index部分的子字符串

regexp_replace(string s, string regex, string replacement)

​	根据java正则表达式regex将字符串s中符合条件的部分替换成replacement

split(string s, string patter)

​	按照正则表达式pattern分割字符串s，并以数组的形式返回

get_json_object(string json, string path)

​	从给定json字符串中抽取json对象

```mysql
select get_json_object(‘${hivevar:msg}’,’$.server’) from test;
```
### lateralView

1. 简介

   Lateral View一般与用户自定义表生成函数（如explode()）结合使用。 如内置表生成函数中所述，UDTF为每个输入行生成零个或多个输出行。 Lateral View 首先将UDTF应用于基表的每一行，然后将结果输出行连接到输入行，以形成具有提供的表别名的虚拟表。

2. 语法

```mysql
fromClause: FROM baseTable (lateralView)*
lateralView: LATERAL VIEW udtf(expression) tableAlias AS columnAlias (',' columnAlias)*
```
3. 例子：

```mysql
SELECT adid, count(1)
    FROM tmp_laterview LATERAL VIEW explode(adid_list) adTable AS adid
    GROUP BY adid;
```
FROM子句可以有多个LATERAL VIEW子句。 后面的LATERAL VIEWS子句可以引用出现在LATERAL VIEWS左侧表的任何列

```mysql
SELECT * FROM exampleTable
	LATERAL VIEW explode(col1) myTable1 AS myCol1
	LATERAL VIEW explode(col2) myTable2 AS myCol2;
```
4. OUTER

   用户可以指定可选的OUTER关键字来生成行，即使LATERAL VIEW通常不会生成行。当所使用的UDTF不产生任何行时（使用explode()函数时，explode的列为空时，很容易发生上述这种情况）。 在这种情况下，源数据行不会出现在结果中。如果想让源数据行继续出现在结果中，可以使用 OUTER可以用来阻止关键字，并且来自UDTF的列使用NULL值代替。

   例如，以下查询返回空结果：

   ```mysql
   SELECT * FROM tmp_laterview LATERAL VIEW explode(array()) C AS a;
   //空
   ```
   ```mysql
   SELECT * FROM tmp_laterview LATERAL VIEW OUTER explode(array()) C AS a;
   [1,2,3]	["a","b","c"]	NULL
   [4,5]	["c","d"]	NULL
   ```