## 数据类型

**数值型**

| 类型             | 字节数 | 取值范围                                                | 备注                                       |
| ---------------- | ------ | ------------------------------------------------------- | ------------------------------------------ |
| TINYINT          | 1      | -128 to 127                                             |                                            |
| SMALLINT         | 2      | -32,768 to 32,767                                       |                                            |
| INT/INTEGER      | 4      | -2,147,483,648 to 2,147,483,647                         |                                            |
| BIGINT           | 8      | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |                                            |
| FLOAT            | 4      | 单精度浮点数                                            |                                            |
| DOUBLE           | 8      | 双精度浮点数                                            |                                            |
| DOUBLE PRECISION | 8      | 双精度浮点数                                            | DOUBLE别名，开始版本2.2.0                  |
| DECIMAL          | 38位数 |                                                         | 0.11.0开始，0.13.0引入用户自定义精度和等级 |
| NUMERIC          | 38位数 |                                                         | 同DECIMAL                                  |

**日期时间类型**

| 类型      | 开始版本 |
| --------- | -------- |
| TIMESTAMP | 0.8.0    |
| DATE      | 0.12.0   |
| INTERVAL  | 1.2.0    |

**字符串类型**

| 类型    | 开始版本 |
| ------- | -------- |
| STRING  |          |
| VARCHAR | 0.12.0   |
| CHAR    | 0.13.0   |

**其他类型**

| 类型    | 开始版本 |
| ------- | -------- |
| BOOLEAN |          |
| BINARY  | 0..8.0   |

TextFile数据在HDFS上的存储格式：

	hive> desc tmp.multi_type;
	col_varchar         	varchar(12)
	col_char            	char(12)
	col_timestamp       	timestamp
	col_date            	date
	col_bool            	boolean
	id_int              	int
	id_bigint           	bigint
	col_float           	float
	col_decimal         	decimal(18,2)
	col_smallint        	smallint
	
	$ less 000000_0
	abc^Aabc         ^A2018-01-01 00:00:01^A2018-03-04^Atrue^A123^A345^A45.66^A67.89^A9
	你好吗^A我很好         ^A2019-12-23 11:22:33^A2010-12-12^Afalse^A-123^A2147483647^A0.1314^A2323.46^A123

结论：

1. timestamp的日期格式是`YY-MM-dd HH:mm:ss`
2. date的日期格式是`YY-MM-dd`
3. boolean存储的是文本`true`或`false`
4. decimal存储的也是toString()后的字符串

## 数据类型转换

同Java语言一样，Hive也包括 隐式转换（implicit conversions）和显式转换（explicitly conversions）。

#### 隐式转换

- 任何整数类型都可以隐式地转换成一个范围更大的类型。
- TINYINT,SMALLINT,INT,BIGINT,FLOAT和**STRING**都可以隐式 地转换成DOUBLE
- BOOLEAN类型不能转换为其他任何数据类型

#### 显式转换

我们可以用CAST来显式的将一个类型的数据转换成另一个数据类型。CAST的语法为`cast(value AS TYPE)`

- 如果将浮点型的数据转换成int类型的，内部操作是通过round()或者floor()函数来实现的
- 对于BINARY类型的数据，只能将BINARY类型的数据转换成STRING类型。如果你确信BINARY类型数据是一个数字类型(a number)，这时候你可以利用嵌套的cast操作
- 我们也可以将一个String类型的数据转换成BINARY类型。
- 对于Date类型的数据，只能在Date、Timestamp以及String之间进行转换。

| 有效的转换              | 结果                                                         |
| ----------------------- | ------------------------------------------------------------ |
| cast(date as date)      | 返回date类型                                                 |
| cast(timestamp as date) | timestamp中的年/月/日的值是依赖与当地的时区，结果返回date类型 |
| cast(string as date)    | 如果string是YYYY-MM-DD格式的，则相应的年/月/日的date类型的数据将会返回；但如果string不是YYYY-MM-DD格式的，结果则会返回NULL。 |
| cast(date as timestamp) | 基于当地的时区，生成一个对应date的年/月/日的时间戳值         |
| cast(date as string)    | date所代表的年/月/日时间将会转换成YYYY-MM-DD的字符串。       |

> [LanguageManual Types](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+Types)
>
>  [LanguageManualTypes-AllowedImplicitConversions](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+Types#LanguageManualTypes-AllowedImplicitConversions)

