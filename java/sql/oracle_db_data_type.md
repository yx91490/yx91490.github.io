# Oracle数据类型

## Oracle数据类型简介

SQL语句中的每个列值和常量都有一个**数据类型**，该**数据类型**与特定的存储格式，约束和值的有效范围相关联。创建表时，必须为其表的每个列指定数据类型。

Oracle提供以下类别的内置数据类型：

- [字符数据类型概述](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3253)
- [数值数据类型概述](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i16209)
- [DATE数据类型概述](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i1847)
- [LOB数据类型概述](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3237)
- [RAW和LONG RAW数据类型概述](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i4146)
- [ROWID和UROWID数据类型概述](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i6732)

## 字符数据类型概述

字符数据类型以字符串形式存储字符（字母数字）数据，其字节值对应于字符编码方案，通常称为字符集或代码页。

创建数据库时，将建立数据库的字符集。字符集的示例是7位ASCII（美国信息交换标准代码），EBCDIC（扩展二进制编码的十进制交换代码），代码页500，日本扩展UNIX和Unicode UTF-8。Oracle支持单字节和多字节编码方案。

本节包括以下主题：

- [CHAR数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i1960)
- [VARCHAR2和VARCHAR数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i1835)
- [字符数据类型的长度语义](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEFDGFE)
- [NCHAR和NVARCHAR2数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i14946)
- [在Oracle数据库中使用Unicode数据](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i14967)
- [LOB字符数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEIFGCI)
- [LONG数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3056)

### CHAR数据类型

该`CHAR`数据类型存储固定长度的字符串。当创建带有`CHAR`列的表时，必须为`CHAR`列宽指定1到2000个字节之间的字符串长度（以字节或字符为单位）。默认值为1个字节。然后，Oracle保证：

- 当您在表中插入或更新一行时，该列的值`CHAR`具有固定的长度。
- 如果提供较短的值，则该值将空白填充为固定长度。
- 如果值太大，Oracle数据库将返回错误。

Oracle数据库`CHAR`使用空白填充的比较语义比较值。

### VARCHAR2和VARCHAR数据类型

该`VARCHAR2`数据类型存储可变长度的字符串。当创建带有`VARCHAR2`列的表时，请为该`VARCHAR2`列指定1到4000字节之间的最大字符串长度（以字节或字符为单位）。对于每一行，除非值超过列的最大长度，否则Oracle数据库会将列中的每个值存储为一个可变长度字段，在这种情况下，Oracle数据库将返回错误。使用`VARCHAR2`并`VARCHAR`节省表使用的空间。

例如，假设您声明一列`VARCHAR2`，最大长度为50个字符。在单字节字符集中，如果只为`VARCHAR2`特定行中的列值提供10个字符，则该行的行段中的列仅存储10个字符（10个字节），而不存储50个字符。

Oracle数据库`VARCHAR2`使用非填充的比较语义比较值。

#### VARCHAR数据类型

`VARCHAR`数据类型是与`VARCHAR2`同义的数据类型。为避免行为上的可能变化，请始终使用`VARCHAR2`数据类型存储长度可变的字符串。

### 字符数据类型的长度语义

全球化支持允许将各种字符集用于字符数据类型。全球化支持使您可以处理单字节和多字节字符数据并在字符集之间进行转换。客户端会话可以使用与数据库字符集不同的客户端字符集。

在为字符数据类型指定列长时，请考虑字符的大小。在估计带有包含字符数据的列的表的空间时，必须考虑此问题。

字符数据类型的长度语义可以字节或字符为单位。

- **字节语义**将字符串视为字节序列。这是字符数据类型的默认设置。
- **字符语义**将字符串视为字符序列。从技术上讲，字符是数据库字符集的代码点。

对于单字节字符集，在字符语义中定义的列与在字节语义中定义的列基本相同。字符语义对于定义宽度可变的多字节字符串很有用。在定义数据存储的实际长度要求时，它降低了复杂性。例如，在在Unicode数据库（`UTF8`）中，您必须定义一`VARCHAR2`列，该列最多可以存储五个中文字符和五个英文字符。在字节语义上，这将需要（5 * 3字节）+（1 * 5字节）= 20字节；在字符语义上，该列将需要10个字符。

`VARCHAR2(20 BYTE)`和`SUBSTRB(`*<字符串>*，`1`，`20`）使用字节语义。`VARCHAR2(10 CHAR)`和`SUBSTR(`*<字符串>*，`1`，`10`）使用字符语义。

该参数`NLS_LENGTH_SEMANTICS`确定字符数据类型的新列是使用字节语义还是字符语义。默认的长度语义是字节。如果数据库中的所有字符数据类型列都使用字节语义（或全部使用字符语义），则用户不必担心哪些列使用哪种语义。如果可能，应避免使用前面显示的`BYTE`和`CHAR`限定符，因为它们会导致混合语义数据库。而是`NLS_LENGTH_SEMANTICS`应在服务器参数文件（SPFILE）或初始化参数文件中适当设置初始化参数，并且列应使用默认语义。

### NCHAR和NVARCHAR2数据类型

`NCHAR`和`NVARCHAR2`是存储Unicode字符数据的Unicode数据类型。`NCHAR`和`NVARCHAR2`数据类型的字符集只能是`AL16UTF16`或，`UTF8`并且在数据库创建时被指定为国家字符集。`AL16UTF16`和`UTF8`都是Unicode编码。

- 该`NCHAR`数据类型存储了对应于国家字符集固定长度的字符串。
- 该`NVARCHAR2`数据类型存储可变长度字符串。

当创建带有`NCHAR`或`NVARCHAR2`列的表时，指定的最大大小始终是字符长度语义。字符长度语义是缺省的，只有长度语义`NCHAR`或`NVARCHAR2`。

例如，如果某个国家字符集为`UTF8`，则以下语句定义最大字节长度为90个字节：

```
创建表tab1（col1 NCHAR（30））;
```

该语句创建一个最大字符长度为30的列。最大字节长度是每个字符中最大字符长度和最大字节数的倍数。

本节包括以下主题：

- [NCHAR](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEFGFFI)
- [NVARCHAR2](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEIGBGB)

#### NCHAR

`NCHAR`列的最大长度为2000个字节。最多可容纳2000个字符。实际数据的最大字节数限制为2000。必须在运行时同时满足两个大小限制。

#### NVARCHAR2

`NVARCHAR2`列的最大长度为4000字节。最多可容纳4000个字符。实际数据的最大字节数限制为4000。必须在运行时同时满足两个大小限制。

### 在Oracle数据库中使用Unicode数据

Unicode是一种对人类已知的每种语言中的每个字符进行统一编码的一种尝试。它还提供了一种表示私有定义字符的方法。存储Unicode的数据库列可以存储以任何语言编写的文本。

部署全球化应用程序的Oracle数据库用户强烈需要在Unicode数据库中存储Unicode数据。无论数据库字符集如何，他们都需要一个保证为Unicode的数据类型。

Oracle数据库支持通过一个可靠的Unicode数据类型`NCHAR`，`NVARCHAR2`以及`NCLOB`。这些数据类型保证为Unicode编码，并且始终使用字符长度语义。所使用的字符集`NCHAR/NVARCHAR2`可以是`UTF8`或`AL16UTF16`，具体取决于创建数据库时国家字符集的设置。这些数据类型允许将Unicode中的字符数据存储在数据库中，该数据库可以使用也可以不使用Unicode作为数据库字符集。

#### 隐式类型转换

除了的所有隐式转换`CHAR/VARCHAR2`，Oracle数据库还支持的隐式转换`NCHAR/NVARCHAR2`。还支持`CHAR/VARCHAR2`和`NCHAR/NVARCHAR2`之间的隐式转换。

### LOB字符数据类型

字符数据的LOB数据类型为`CLOB`和`NCLOB`。它们最多可以存储8 TB的字符数据（`CLOB`）或国家字符集数据（`NCLOB`）。

### LONG数据类型

> **注意：**
>
> 不要创建带有`LONG`列的表。请改用LOB列（`CLOB`，`NCLOB`）。`LONG`仅支持向后列的列。
>
> Oracle还建议您将现有`LONG`列转换为LOB列。LOB列受到的限制比`LONG`列少得多。此外，LOB功能在每个发行版中都得到了增强，而`LONG`功能在多个发行版中都是静态的。

定义为的列`LONG`可以存储可变长度的字符数据，其中包含多达2 GB的信息。`LONG`data是在不同系统之间移动时要适当转换的文本数据。

`LONG`数据字典中使用datatype列来存储视图定义的文本。您可以使用列表`LONG`中的`SELECT`列，`SET`语句子句和`UPDATE`语句`VALUES`子句`INSERT`。

## 数值数据类型概述

数字数据类型存储正负定点和浮点数，零，无穷大以及作为操作未定义结果的值（即“不是数字”或NAN）。

本节包括以下主题：

- [NUMBER个数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i22289)
- [浮点数字](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i22294)

### NUMBER个数据类型

该`NUMBER`数据类型存储固定和浮点数。几乎可以存储任何数量的数值，并保证这些数值可移植到运行Oracle数据库的不同系统之间，精度最高可达38位。

以下数字可以存储在`NUMBER`列中：

- 正数范围为1 x 10^ -130到9.99 ... 9 x 10^125，最多38个有效数字
- 负数从-1 x 10^ -130到9.99 ... 99 x 10^125，最多38个有效数字
- 零
- 正负无穷大（仅通过从Oracle数据库版本5导入而生成）

对于数字列，可以将列指定为：

```
column_name NUMBER 
```

另外，您还可以指定**精度**（总位数）和**规模**（数字小数点右边数）：

```
column_name NUMBER（精度，小数位数） 
```

如果未指定精度，则该列将存储给定的值。如果未指定比例，则比例为零。

Oracle保证数字的可移植性，其精度等于或小于38位。您可以指定比例，但不能指定精度：

```
column_name NUMBER（*，小数位数） 
```

在这种情况下，精度为38，并保持指定的比例。

指定数字字段时，最好指定精度和小数位数。这样可以对输入进行额外的完整性检查。

[表26-1](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#g23242)显示了如何使用不同的比例因子存储数据的示例。

表26-1比例因子如何影响数值数据存储

| 输入数据     | 指定为         | 存储为               |
| :----------- | :------------- | :------------------- |
| 7,456,123.89 | `NUMBER`       | 7456123.89           |
| 7,456,123.89 | `NUMBER(*,1)`  | 7456123.9            |
| 7,456,123.89 | `NUMBER(9)`    | 7456124              |
| 7,456,123.89 | `NUMBER(9,2)`  | 7456123.89           |
| 7,456,123.89 | `NUMBER(9,1)`  | 7456123.9            |
| 7,456,123.89 | `NUMBER(6)`    | （不接受，超出精度） |
| 7,456,123.89 | `NUMBER(7,-2)` | 7456100              |



如果指定负比例，则Oracle数据库会将实际数据四舍五入到小数点左边的指定位数。例如，指定（7，-2）表示Oracle数据库四舍五入到最接近的百分之一，如[表26-1](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#g23242)所示。

对于数字的输入和输出，标准的Oracle数据库默认十进制字符是一个句点，如数字1234.56。十进制是分隔数字的整数和小数部分的字符。您可以使用初始化参数更改默认的十进制字符`NLS_NUMERIC_CHARACTERS`。您也可以在使用该`ALTER SESSION`语句的会话期间更改它。要输入不使用当前默认十进制字符的数字，请使用此`TO_NUMBER`功能。

#### 内部数字格式

Oracle数据库以可变长度格式存储数字数据。每个值都以科学计数法存储，其中1个字节用于存储指数，最多20个字节用于存储尾数。结果值限制为38位精度。Oracle数据库不存储前导零和尾随零。例如，数字412以类似于4.12 x 10 2的格式存储，其中1个字节用于存储exponent（`2`），而2个字节用于存储mantissa（`4,1,2`）的三个有效数字。负数包括其长度中的符号。

考虑到这一点，可以使用以下公式计算特定数值数据值的列大小（以字节为单位）`NUMBER(``p``)`，其中`p`是给定值的精度。

```
ROUND（（长度（p）+ s / 2））+ 1
```

其中，`s`如果数字为正，则等于零；如果数字为负，则`s`等于1。

零和正负无穷大（仅在从Oracle数据库版本5导入时生成）使用唯一表示存储。零和负无穷大各自需要1个字节；正无穷大需要2个字节。

### 浮点数字

Oracle数据库专门为floati提供了两种数字数据类型ng点数：`BINARY_FLOAT`和`BINARY_DOUBLE`。它们支持`NUMBER`数据类型提供的所有基本功能。然而，尽管`NUMBER`使用小数精度，`BINARY_FLOAT`并`BINARY_DOUBLE`采用二进制精度。这样可以加快算术运算的速度，通常可以减少存储需求。

`BINARY_FLOAT`和`BINARY_DOUBLE`是近似数值数据类型。它们存储十进制值的近似表示，而不是精确表示。例如，值0.1不能由`BINARY_DOUBLE`或精确表示`BINARY_FLOAT`。它们经常用于科学计算。它们的行为类似于数据类型`FLOAT`以及`DOUBLE`Java和XMLSchema。

本节包括以下主题：

- [BINARY_FLOAT数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEEEHFJ)
- [BINARY_DOUBLE数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEJECIH)

#### BINARY_FLOAT数据类型

`BINARY_FLOAT`是32位单精度浮点数数据类型。每个`BINARY_FLOAT`值需要5个字节，包括一个长度字节。

#### BINARY_DOUBLE数据类型

`BINARY_DOUBLE`是64位双精度浮点数数据类型。每个`BINARY_DOUBLE`值需要9个字节，包括一个长度字节。

## DATE数据类型概述

该`DATE`数据类型存储指向即时值（日期和时间），在表中。该`DATE`数据类型存储年（包括世纪），月，日，小时，分钟和秒（午夜后）。

Oracle数据库可以存储Julian时代的日期，范围是从公元前4712年1月1日到9999年12月31日（通用时代或“ AD”）。除非专门使用BCE（格式掩码中的“ BC”），否则CE日期条目为默认设置。

Oracle数据库使用其自己的内部格式来存储日期。日期数据存储在每个长度为七个字节的固定长度字段中，分别对应于世纪，年，月，日，时，分和秒。

对于日期的输入和输出，标准的Oracle日期格式为`DD-MON-YY`，如下所示：

```
'13 -NOV-92' 
```

您可以使用参数更改实例的默认日期格式`NLS_DATE_FORMAT`。您也可以在用户会话期间使用该`ALTER SESSION`语句更改它。要输入非标准Oracle日期格式的日期，请将该`TO_DATE`函数与格式掩码一起使用：

```
TO_DATE（'1992年11月13日'，'MONTH DD，YYYY'） 
```

Oracle数据库以24小时格式存储时间`HH:MI:SS`。默认情况下，日期字段中的时间为`00:00:00 A.M`。（午夜）（如果未输入时间部分）。在仅时间条目中，日期部分默认为当前月份的第一天。要输入日期的时间部分，请使用`TO_DATE`带有指示时间部分的格式掩码的功能，如下所示：

```
INSERT INTO birthdays (bname, bday) VALUES 
    ('ANDY',TO_DATE('13-AUG-66 12:56 A.M.','DD-MON-YY HH:MI A.M.')); 
```

本节包括以下主题：

- [Julian日期的使用](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEFDCJH)
- [日期算术](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEGHIFG)
- [世纪和2000年](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEJJBFH)
- [夏令时支持](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEJCGHC)
- [时区](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEGDFFE)

### 朱利安日期的使用

朱利安日期允许根据从共同参考处获得的天数进行连续约会。（参考日期是公元前01-01-4712年，因此当前日期在240万范围内。）儒略日期名义上不是整数，小数部分是一天的一部分。Oracle数据库使用一种简化的方法来生成整数值。朱利安日期可以被不同地计算和解释。Oracle数据库使用的计算方法将得出一个七位数的数字（用于最常用的日期），例如08-APR-93的2449086。

> 注意：
>
> Oracle朱利安日期可能与其他日期算法生成的朱利安日期不兼容。

格式掩码`'J'`可以与日期函数（`TO_DATE`或`TO_CHAR`）一起使用，以将日期数据转换为儒略日期。例如，以下查询以儒略日期格式返回所有日期：

```
SELECT TO_CHAR (hire_date, 'J') FROM employees; 
```

`TO_NUMBER`如果要在计算中使用儒略日期，则必须使用该函数。您可以使用该`TO_DATE`功能输入儒略日期：

```
INSERT INTO employees (hire_date) VALUES (TO_DATE(2448921, 'J')); 
```

### 日期算术

Oracle日期算术考虑了整个历史记录中使用的日历异常。例如，从儒略历改为公历15-10-1582消除了前10天（05-10-1582至14-10-1582）。年份0不存在。

您可以将丢失的日期输入数据库，但是在日期算术中将忽略它们，并将其视为下一个“实际”日期。例如，04-10-1582之后的第二天是15-10-1582，05-10-1582之后的第二天也是15-10-1582。

> 注意：
>
> 有关日期算术的讨论可能不适用于所有国家的日期标准（例如亚洲的日期标准）。

### 世纪和2000年

Oracle数据库存储带有世纪信息的年份数据。例如，Oracle数据库存储1996或2001，而不仅仅是96或01。`DATE`数据类型始终在内部存储四位数的年份，而在数据库内部存储的所有其他日期都具有四位数的年份。Oracle数据库实用程序（例如导入，导出和恢复）也需要四位数的年数。

### 夏令时支持

Oracle数据库为`DATETIME`服务器中的数据类型提供了夏令时支持。您可以`DATETIME`基于特定区域中的本地时间插入和查询值。该`DATETIME`数据类型`TIMESTAMP WITH TIME ZONE`和`TIMESTAMP WITH LOCAL TIME ZONE`是时区感知。

### 时区

您可以在您的日期/时间数据中包括时区，以及小数秒。添加了三个新的数据类型`DATE`，[表26-2中](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEIGIFB)列出了它们的区别。

表26-2时区数据类型

| 数据类型                           | 时区   | 分数秒 |
| :--------------------------------- | :----- | :----- |
| `DATE`                             | 没有   | 没有   |
| `TIMESTAMP`                        | 没有   | 是     |
| `TIMESTAMP` `WITH TIME ZONE`       | 明确的 | 是     |
| `TIMESTAMP` `WITH LOCAL TIME ZONE` | 相对的 | 是     |

`TIMESTAMP WITH LOCAL TIME ZONE`存储在数据库时区中。当用户选择数据时，该值将调整为用户的会话时区。

例如，旧金山数据库的系统时区= -8：00。当纽约客户（会话时区= -5：00）插入到旧金山数据库中或从中进行选择时，`TIMESTAMP WITH LOCAL TIME ZONE`数据将进行如下调整：

- 纽约客户将插入旧金山数据库中`TIMESTAMP'1998-1-23 6:00:00-5:00'`的`TIMESTAMP WITH LOCAL TIME ZONE`列。插入的数据作为二进制值存储在San Francisco `1998-1-23 3:00:00`。
- 当纽约客户从旧金山数据库中选择插入的数据时，纽约显示的值为`'1998-1-23 6:00:00'`。
- 一个旧金山客户，选择相同的数据，请参见值`'1998-1-23 3:00:00'`。

>注意：
>
>为了避免DML对数据时间数据的操作产生意外结果，您可以通过查询内置的SQL函数`DBTIMEZONE`和来验证数据库和会话时区`SESSIONTIMEZONE`。如果尚未手动设置数据库时区或会话时区，则Oracle数据库默认使用操作系统时区。如果操作系统时区不是有效的Oracle时区，则Oracle数据库使用UTC作为默认值。

## LOB数据类型概述

将LOB数据类型`BLOB`，`CLOB`，`NCLOB`，并且`BFILE`使您能够存储和处理非结构化数据（如文本，图像，视频片段和声音波形）以二进制或字符格式的大块。它们提供了对数据的高效，随机，分段访问。Oracle建议您始终对`LONG`数据类型使用LOB数据类型。您可以在LOB列上执行并行查询（但不能并行DML或DDL）。

LOB数据类型在多种方面不同于`LONG`和`LONG` `RAW`数据类型。例如：

- 一个表可以包含多个LOB列，但只能包含一个`LONG`列。
- 包含一个或多个LOB列的表可以被分区，但是包含`LONG`列的表不能被分区。
- 根据数据库块的大小，LOB的最大大小为128 TB，而a的最大大小`LONG`仅为2 GB。
- LOB支持对数据的随机访问，但`LONG`仅支持顺序访问。
- LOB数据类型（除外`NCLOB`）可以是用户定义的对象类型的属性，但是`LONG`数据类型则不能。
- 充当局部变量的临时LOB可用于对LOB数据执行转换。临时内部LOB（`BLOBs`，`CLOBs`和`NCLOB`）在临时表空间中创建，并且独立于表。`LONG`但是，对于数据类型，没有临时结构可用。
- 带有LOB列的表可以被复制，但是带有`LONG`列的表不能被复制。

SQL语句在表中定义LOB列，并在用户定义的对象类型中定义LOB属性。在表中定义LOB时，可以显式指定每个LOB的表空间和存储特征。

LOB数据类型可以内联（表内），脱机（在表空间内，使用LOB定位器）或外部文件（`BFILE`数据类型）中存储。将兼容性设置为Oracle9 *i*或更高版本时，可以将LOB与SQL `VARCHAR`运算符和函数一起使用。

本节包括以下主题：

- [BLOB数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3262)
- [CLOB和NCLOB数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3266)
- [BFILE数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3270)

### BLOB数据类型

该`BLOB`数据库中的数据类型存储非结构化二进制数据。`BLOB`最多可以存储128 TB的二进制数据。

`BLOB`充分参与交易。包，PL / SQL或OCI 对`BLOB`值所做的更改`DBMS_LOB`可以被提交或回滚。但是，`BLOB`定位器不能跨越事务或会话。

### CLOB和NCLOB数据类型

该`CLOB`和`NCLOB`数据类型最多存储到数据库中的128兆兆字节的字符数据。`CLOB`s存储数据库字符集数据和`NCLOB`s storeUnicode国家字符集数据。通过在内部以固定宽度Unicode字符集存储宽度可变的LOB数据，Oracle数据库可以在CLOB和NCLOB上提供基于字符的有效随机访问。

`CLOB`s和`NCLOB`s完全参与交易。包，PL / SQL或OCI 对a `CLOB`或`NCLOB`value 所做的更改`DBMS_LOB`可以被提交或回滚。然而，`CLOB`和`NCLOB`定位器不能跨事务或会话。您不能使用`NCLOB`属性创建对象类型，但是可以`NCLOB`在对象类型的方法中指定参数。

## 实践

```sql
create table MULTI_DATA_TYPE
(
  id    VARCHAR2(10),
  bdb   BINARY_DOUBLE,
  bft   BINARY_FLOAT,
  blb   BLOB,
  clb   CLOB,
  chr   CHAR(18),
  dt    DATE,
  ids   INTERVAL DAY(2) TO SECOND(6),
  iym   INTERVAL YEAR(2) TO MONTH,
  lng   LONG,
  nclb  NCLOB,
  num   NUMBER,
  nvchr NVARCHAR2(4),
  rw    RAW(12),
  ts    TIMESTAMP(6),
  tslz  TIMESTAMP(6) WITH LOCAL TIME ZONE,
  tsz   TIMESTAMP(6) WITH TIME ZONE
)

create table DATE_DEMO
(
  name       NUMBER(5) not null,
  comm       NUMBER(10,2),
  lngr       LONG RAW
)
```

## 参考

[Oracle数据类型](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CNCPT113)

[Datatype Mappings](https://docs.oracle.com/cd/F49540_01/DOC/java.815/a64685/basic3.htm)

[ALL_COL_COMMENTS](https://docs.oracle.com/cd/B28359_01/server.111/b28320/statviews_1036.htm#REFRN20040)

[ALL_TAB_COLUMNS](https://docs.oracle.com/cd/B19306_01/server.102/b14237/statviews_2094.htm)

[Difference between ALL_TAB_COLUMNS: DATA_LENGTH and CHAR_LENGTH](https://www.experts-exchange.com/questions/22049278/Difference-between-ALL-TAB-COLUMNS-DATA-LENGTH-and-CHAR-LENGTH.html)

