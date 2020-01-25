# MySQL笔记

## 数据类型

### 日期时间类型

日期和时间类型包括 [`DATE`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html), [`TIME`](https://dev.mysql.com/doc/refman/5.7/en/time.html), [`DATETIME`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html), [`TIMESTAMP`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html), 以及 [`YEAR`](https://dev.mysql.com/doc/refman/5.7/en/year.html)，每种类型都有一系列有效值，以及当指定了无效值时可以使用的“ 零 ”值。[`TIMESTAMP`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html)类型具有特殊的自动更新行为。

使用日期和时间类型时，请记住以下一般注意事项：

- MySQL以标准输出格式检索给定日期或时间类型的值，但它会尝试解释您提供的输入值的各种格式。
- 虽然MySQL试图解释几种格式的值，但日期部分必须始终以年 - 月 - 日的顺序（例如`'98-09-04'`）给出。
- 包含两位数年份值的日期是不明确的，MySQL使用以下规则解释两位数的年份值：
  - 范围`70-99`中的年份值将转换为`1970-1999`。
  - 范围`00-69`中的年份值将转换为`2000-2069`。

- MySQL允许将零值存储`'0000-00-00'`为“ 虚拟日期”。某些情况下零值比NULL更方便，并且占用更少的数据和索引空间。要禁用零值请设置`NO_ZERO_DATE`。

- 默认情况下遇到超出范围的值或者无效值时，MySQL会将该值转换为该类型的零值。例外情况是超出范围的TIME值。

- 在DATE和DATETIME类型中允许存储月份和天数为0的日期，如`'2009-00-00'` 和 `'2009-01-00'`。要禁用此特性请启用NO_ZERO_IN_DATE模式。
-  ODBC零值会自动转换为`NULL`,因为ODBC无法处理此类值。

关于取值：

| 数据类型                                                     | 取值范围 | 零值                    |
| ------------------------------------------------------------ | -------- | ----------------------- |
| [`DATE`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html) |          | `'0000-00-00'`          |
| [`TIME`](https://dev.mysql.com/doc/refman/5.7/en/time.html)  |          | `'00:00:00'`            |
| [`DATETIME`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html) |          | `'0000-00-00 00:00:00'` |
| [`TIMESTAMP`](https://dev.mysql.com/doc/refman/5.7/en/datetime.html) |          | `'0000-00-00 00:00:00'` |
| [`YEAR`](https://dev.mysql.com/doc/refman/5.7/en/year.html)  |          | `0000`                  |


#### 参考

- [MySQL IS NULL / IS NOT NULL Misbehaving?](https://dba.stackexchange.com/questions/13175/mysql-is-null-is-not-null-misbehaving)
- [zero date is both null and not null in where clause](https://bugs.mysql.com/bug.php?id=940)
- [Date and Time Types](https://dev.mysql.com/doc/refman/5.6/en/date-and-time-types.html)

## SQL Mode

| 项                                                           | 备注                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`ALLOW_INVALID_DATES`](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_allow_invalid_dates) | 允许存储错误值，如`'2009-11-31'`                             |
| [`NO_ZERO_IN_DATE`](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_no_zero_in_date) | 不允许日期类型中的`0月`和`0天`, 如`'2009-00-00'` 以及 `'2009-01-00'`。<br>不允许零值'0000-00-00' |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |

## JDBC



## 最佳实践



## 常见问题

### 时区问题

查看当前时区:

```
mysql> show variables like "%time_zone%";
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | CST    |
| time_zone        | SYSTEM |
+------------------+--------+
```

time_zone说明mysql使用system的时区，system_time_zone说明system使用CST时区。

修改时区:

```
mysql> set global time_zone = '+8:00';
mysql> set time_zone = '+8:00';
mysql> flush privileges;
```

查看修改后时区:

```
mysql> show variables like "%time_zone%";
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | CST    |
| time_zone        | +08:00 |
+------------------+--------+
```

或者修改MySQL配置文件(/etc/my.cnf):

```
[mysqld]
default-time_zone = '+8:00'
```

#### 参考

- [mybatis查询mysql的datetime类型数据时间差了14小时](https://www.jianshu.com/p/ea7ef2d29940)
- [MySQL修改时区的方法小结](https://www.cnblogs.com/mracale/p/6064447.html)
- [MySQL术语表](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_schema)





