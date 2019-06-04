### 代码调试

1. sqoop命令参数加上`--verbose`，将sqoop日志调整为debug级别
2. sqoop命令参数加上`-Dmapreduce.map.log.level=DEBUG -Dmapreduce.reduce.log.level=DEBUG -Dyarn.app.mapreduce.am.log.level=DEBUG`，将MR日志调整为debug级别

> https://community.hortonworks.com/articles/41065/changing-the-log4j-debug-with-hadoop-jar-in-mapred.html

### sqoop常见场景

1. 分库分表
2. 有无分区
3. 字段选择
4. 查询条件
5. 存储类型
6. null值处理
7. 数据校验？？？
8. 增量导入？？？

```shell
sqoop import  --connect 'jdbc:mysql://' --username '' --password ''  -m 1 --table multi_type_db  --hive-drop-import-delims --target-dir /tmp --append  --fields-terminated-by "\001"
```
	abc^Aa^A2019-02-21 11:33:44.0^A2018-03-04^A1^A123^A345^A45.66^A67.89^A9
	null^Anull^Anull^Anull^Anull^Anull^Anull^Anull^Anull^Anull
```sql
select * from tmp.multi_type 
	where col_varchar is null 
	and col_char is null 
	and col_timestamp is null 
	and col_date is null 
	and col_bool is null 
	and id_int is null 
	and id_bigint is null 
	and col_float is null 
	and col_decimal is null 
	and col_smallint is null;
```
### sqoop原理

### sqoop类型映射

参考资料：

>  [Sqoop User Guide (v1.4.6)](https://sqoop.apache.org/docs/1.4.6/SqoopUserGuide.html)
>
>  [Sqoop 使用指南](https://zhuanlan.zhihu.com/p/39113492)
>
>  [Sqoop 1.4.6 导入实战 (RDB含MySQL和Oracle)](https://ask.hellobi.com/blog/marsj/4114)
>
>  [重要 | mr使用hcatalog读写hive](https://zhuanlan.zhihu.com/p/42239286)
>
>  [mapreduce job所需要的各种参数在Sqoop中的实现 原](https://my.oschina.net/crxy/blog/417890)
>
>  [源码剖析-sqoop与datax的对比](https://my.oschina.net/osenlin/blog/1600141)

