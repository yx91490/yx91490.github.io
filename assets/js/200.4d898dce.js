(window.webpackJsonp=window.webpackJsonp||[]).push([[200],{432:function(t,e,a){"use strict";a.r(e);var _=a(10),v=Object(_.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"oracle数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#oracle数据类型"}},[t._v("$")]),t._v(" Oracle数据类型")]),t._v(" "),e("h2",{attrs:{id:"oracle数据类型简介"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#oracle数据类型简介"}},[t._v("$")]),t._v(" Oracle数据类型简介")]),t._v(" "),e("p",[t._v("SQL语句中的每个列值和常量都有一个"),e("strong",[t._v("数据类型")]),t._v("，该"),e("strong",[t._v("数据类型")]),t._v("与特定的存储格式，约束和值的有效范围相关联。创建表时，必须为其表的每个列指定数据类型。")]),t._v(" "),e("p",[t._v("Oracle提供以下类别的内置数据类型：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3253",target:"_blank",rel:"noopener noreferrer"}},[t._v("字符数据类型概述"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i16209",target:"_blank",rel:"noopener noreferrer"}},[t._v("数值数据类型概述"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i1847",target:"_blank",rel:"noopener noreferrer"}},[t._v("DATE数据类型概述"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3237",target:"_blank",rel:"noopener noreferrer"}},[t._v("LOB数据类型概述"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i4146",target:"_blank",rel:"noopener noreferrer"}},[t._v("RAW和LONG RAW数据类型概述"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i6732",target:"_blank",rel:"noopener noreferrer"}},[t._v("ROWID和UROWID数据类型概述"),e("OutboundLink")],1)])]),t._v(" "),e("h2",{attrs:{id:"字符数据类型概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#字符数据类型概述"}},[t._v("$")]),t._v(" 字符数据类型概述")]),t._v(" "),e("p",[t._v("字符数据类型以字符串形式存储字符（字母数字）数据，其字节值对应于字符编码方案，通常称为字符集或代码页。")]),t._v(" "),e("p",[t._v("创建数据库时，将建立数据库的字符集。字符集的示例是7位ASCII（美国信息交换标准代码），EBCDIC（扩展二进制编码的十进制交换代码），代码页500，日本扩展UNIX和Unicode UTF-8。Oracle支持单字节和多字节编码方案。")]),t._v(" "),e("p",[t._v("本节包括以下主题：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i1960",target:"_blank",rel:"noopener noreferrer"}},[t._v("CHAR数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i1835",target:"_blank",rel:"noopener noreferrer"}},[t._v("VARCHAR2和VARCHAR数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEFDGFE",target:"_blank",rel:"noopener noreferrer"}},[t._v("字符数据类型的长度语义"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i14946",target:"_blank",rel:"noopener noreferrer"}},[t._v("NCHAR和NVARCHAR2数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i14967",target:"_blank",rel:"noopener noreferrer"}},[t._v("在Oracle数据库中使用Unicode数据"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEIFGCI",target:"_blank",rel:"noopener noreferrer"}},[t._v("LOB字符数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3056",target:"_blank",rel:"noopener noreferrer"}},[t._v("LONG数据类型"),e("OutboundLink")],1)])]),t._v(" "),e("h3",{attrs:{id:"char数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#char数据类型"}},[t._v("$")]),t._v(" CHAR数据类型")]),t._v(" "),e("p",[t._v("该"),e("code",[t._v("CHAR")]),t._v("数据类型存储固定长度的字符串。当创建带有"),e("code",[t._v("CHAR")]),t._v("列的表时，必须为"),e("code",[t._v("CHAR")]),t._v("列宽指定1到2000个字节之间的字符串长度（以字节或字符为单位）。默认值为1个字节。然后，Oracle保证：")]),t._v(" "),e("ul",[e("li",[t._v("当您在表中插入或更新一行时，该列的值"),e("code",[t._v("CHAR")]),t._v("具有固定的长度。")]),t._v(" "),e("li",[t._v("如果提供较短的值，则该值将空白填充为固定长度。")]),t._v(" "),e("li",[t._v("如果值太大，Oracle数据库将返回错误。")])]),t._v(" "),e("p",[t._v("Oracle数据库"),e("code",[t._v("CHAR")]),t._v("使用空白填充的比较语义比较值。")]),t._v(" "),e("h3",{attrs:{id:"varchar2和varchar数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#varchar2和varchar数据类型"}},[t._v("$")]),t._v(" VARCHAR2和VARCHAR数据类型")]),t._v(" "),e("p",[t._v("该"),e("code",[t._v("VARCHAR2")]),t._v("数据类型存储可变长度的字符串。当创建带有"),e("code",[t._v("VARCHAR2")]),t._v("列的表时，请为该"),e("code",[t._v("VARCHAR2")]),t._v("列指定1到4000字节之间的最大字符串长度（以字节或字符为单位）。对于每一行，除非值超过列的最大长度，否则Oracle数据库会将列中的每个值存储为一个可变长度字段，在这种情况下，Oracle数据库将返回错误。使用"),e("code",[t._v("VARCHAR2")]),t._v("并"),e("code",[t._v("VARCHAR")]),t._v("节省表使用的空间。")]),t._v(" "),e("p",[t._v("例如，假设您声明一列"),e("code",[t._v("VARCHAR2")]),t._v("，最大长度为50个字符。在单字节字符集中，如果只为"),e("code",[t._v("VARCHAR2")]),t._v("特定行中的列值提供10个字符，则该行的行段中的列仅存储10个字符（10个字节），而不存储50个字符。")]),t._v(" "),e("p",[t._v("Oracle数据库"),e("code",[t._v("VARCHAR2")]),t._v("使用非填充的比较语义比较值。")]),t._v(" "),e("h4",{attrs:{id:"varchar数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#varchar数据类型"}},[t._v("$")]),t._v(" VARCHAR数据类型")]),t._v(" "),e("p",[e("code",[t._v("VARCHAR")]),t._v("数据类型是与"),e("code",[t._v("VARCHAR2")]),t._v("同义的数据类型。为避免行为上的可能变化，请始终使用"),e("code",[t._v("VARCHAR2")]),t._v("数据类型存储长度可变的字符串。")]),t._v(" "),e("h3",{attrs:{id:"字符数据类型的长度语义"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#字符数据类型的长度语义"}},[t._v("$")]),t._v(" 字符数据类型的长度语义")]),t._v(" "),e("p",[t._v("全球化支持允许将各种字符集用于字符数据类型。全球化支持使您可以处理单字节和多字节字符数据并在字符集之间进行转换。客户端会话可以使用与数据库字符集不同的客户端字符集。")]),t._v(" "),e("p",[t._v("在为字符数据类型指定列长时，请考虑字符的大小。在估计带有包含字符数据的列的表的空间时，必须考虑此问题。")]),t._v(" "),e("p",[t._v("字符数据类型的长度语义可以字节或字符为单位。")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("字节语义")]),t._v("将字符串视为字节序列。这是字符数据类型的默认设置。")]),t._v(" "),e("li",[e("strong",[t._v("字符语义")]),t._v("将字符串视为字符序列。从技术上讲，字符是数据库字符集的代码点。")])]),t._v(" "),e("p",[t._v("对于单字节字符集，在字符语义中定义的列与在字节语义中定义的列基本相同。字符语义对于定义宽度可变的多字节字符串很有用。在定义数据存储的实际长度要求时，它降低了复杂性。例如，在在Unicode数据库（"),e("code",[t._v("UTF8")]),t._v("）中，您必须定义一"),e("code",[t._v("VARCHAR2")]),t._v("列，该列最多可以存储五个中文字符和五个英文字符。在字节语义上，这将需要（5 * 3字节）+（1 * 5字节）= 20字节；在字符语义上，该列将需要10个字符。")]),t._v(" "),e("p",[e("code",[t._v("VARCHAR2(20 BYTE)")]),t._v("和"),e("code",[t._v("SUBSTRB(")]),e("em",[t._v("<字符串>")]),t._v("，"),e("code",[t._v("1")]),t._v("，"),e("code",[t._v("20")]),t._v("）使用字节语义。"),e("code",[t._v("VARCHAR2(10 CHAR)")]),t._v("和"),e("code",[t._v("SUBSTR(")]),e("em",[t._v("<字符串>")]),t._v("，"),e("code",[t._v("1")]),t._v("，"),e("code",[t._v("10")]),t._v("）使用字符语义。")]),t._v(" "),e("p",[t._v("该参数"),e("code",[t._v("NLS_LENGTH_SEMANTICS")]),t._v("确定字符数据类型的新列是使用字节语义还是字符语义。默认的长度语义是字节。如果数据库中的所有字符数据类型列都使用字节语义（或全部使用字符语义），则用户不必担心哪些列使用哪种语义。如果可能，应避免使用前面显示的"),e("code",[t._v("BYTE")]),t._v("和"),e("code",[t._v("CHAR")]),t._v("限定符，因为它们会导致混合语义数据库。而是"),e("code",[t._v("NLS_LENGTH_SEMANTICS")]),t._v("应在服务器参数文件（SPFILE）或初始化参数文件中适当设置初始化参数，并且列应使用默认语义。")]),t._v(" "),e("h3",{attrs:{id:"nchar和nvarchar2数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nchar和nvarchar2数据类型"}},[t._v("$")]),t._v(" NCHAR和NVARCHAR2数据类型")]),t._v(" "),e("p",[e("code",[t._v("NCHAR")]),t._v("和"),e("code",[t._v("NVARCHAR2")]),t._v("是存储Unicode字符数据的Unicode数据类型。"),e("code",[t._v("NCHAR")]),t._v("和"),e("code",[t._v("NVARCHAR2")]),t._v("数据类型的字符集只能是"),e("code",[t._v("AL16UTF16")]),t._v("或，"),e("code",[t._v("UTF8")]),t._v("并且在数据库创建时被指定为国家字符集。"),e("code",[t._v("AL16UTF16")]),t._v("和"),e("code",[t._v("UTF8")]),t._v("都是Unicode编码。")]),t._v(" "),e("ul",[e("li",[t._v("该"),e("code",[t._v("NCHAR")]),t._v("数据类型存储了对应于国家字符集固定长度的字符串。")]),t._v(" "),e("li",[t._v("该"),e("code",[t._v("NVARCHAR2")]),t._v("数据类型存储可变长度字符串。")])]),t._v(" "),e("p",[t._v("当创建带有"),e("code",[t._v("NCHAR")]),t._v("或"),e("code",[t._v("NVARCHAR2")]),t._v("列的表时，指定的最大大小始终是字符长度语义。字符长度语义是缺省的，只有长度语义"),e("code",[t._v("NCHAR")]),t._v("或"),e("code",[t._v("NVARCHAR2")]),t._v("。")]),t._v(" "),e("p",[t._v("例如，如果某个国家字符集为"),e("code",[t._v("UTF8")]),t._v("，则以下语句定义最大字节长度为90个字节：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("创建表tab1（col1 NCHAR（30））;\n")])])]),e("p",[t._v("该语句创建一个最大字符长度为30的列。最大字节长度是每个字符中最大字符长度和最大字节数的倍数。")]),t._v(" "),e("p",[t._v("本节包括以下主题：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEFGFFI",target:"_blank",rel:"noopener noreferrer"}},[t._v("NCHAR"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEIGBGB",target:"_blank",rel:"noopener noreferrer"}},[t._v("NVARCHAR2"),e("OutboundLink")],1)])]),t._v(" "),e("h4",{attrs:{id:"nchar"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nchar"}},[t._v("$")]),t._v(" NCHAR")]),t._v(" "),e("p",[e("code",[t._v("NCHAR")]),t._v("列的最大长度为2000个字节。最多可容纳2000个字符。实际数据的最大字节数限制为2000。必须在运行时同时满足两个大小限制。")]),t._v(" "),e("h4",{attrs:{id:"nvarchar2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nvarchar2"}},[t._v("$")]),t._v(" NVARCHAR2")]),t._v(" "),e("p",[e("code",[t._v("NVARCHAR2")]),t._v("列的最大长度为4000字节。最多可容纳4000个字符。实际数据的最大字节数限制为4000。必须在运行时同时满足两个大小限制。")]),t._v(" "),e("h3",{attrs:{id:"在oracle数据库中使用unicode数据"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#在oracle数据库中使用unicode数据"}},[t._v("$")]),t._v(" 在Oracle数据库中使用Unicode数据")]),t._v(" "),e("p",[t._v("Unicode是一种对人类已知的每种语言中的每个字符进行统一编码的一种尝试。它还提供了一种表示私有定义字符的方法。存储Unicode的数据库列可以存储以任何语言编写的文本。")]),t._v(" "),e("p",[t._v("部署全球化应用程序的Oracle数据库用户强烈需要在Unicode数据库中存储Unicode数据。无论数据库字符集如何，他们都需要一个保证为Unicode的数据类型。")]),t._v(" "),e("p",[t._v("Oracle数据库支持通过一个可靠的Unicode数据类型"),e("code",[t._v("NCHAR")]),t._v("，"),e("code",[t._v("NVARCHAR2")]),t._v("以及"),e("code",[t._v("NCLOB")]),t._v("。这些数据类型保证为Unicode编码，并且始终使用字符长度语义。所使用的字符集"),e("code",[t._v("NCHAR/NVARCHAR2")]),t._v("可以是"),e("code",[t._v("UTF8")]),t._v("或"),e("code",[t._v("AL16UTF16")]),t._v("，具体取决于创建数据库时国家字符集的设置。这些数据类型允许将Unicode中的字符数据存储在数据库中，该数据库可以使用也可以不使用Unicode作为数据库字符集。")]),t._v(" "),e("h4",{attrs:{id:"隐式类型转换"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#隐式类型转换"}},[t._v("$")]),t._v(" 隐式类型转换")]),t._v(" "),e("p",[t._v("除了的所有隐式转换"),e("code",[t._v("CHAR/VARCHAR2")]),t._v("，Oracle数据库还支持的隐式转换"),e("code",[t._v("NCHAR/NVARCHAR2")]),t._v("。还支持"),e("code",[t._v("CHAR/VARCHAR2")]),t._v("和"),e("code",[t._v("NCHAR/NVARCHAR2")]),t._v("之间的隐式转换。")]),t._v(" "),e("h3",{attrs:{id:"lob字符数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#lob字符数据类型"}},[t._v("$")]),t._v(" LOB字符数据类型")]),t._v(" "),e("p",[t._v("字符数据的LOB数据类型为"),e("code",[t._v("CLOB")]),t._v("和"),e("code",[t._v("NCLOB")]),t._v("。它们最多可以存储8 TB的字符数据（"),e("code",[t._v("CLOB")]),t._v("）或国家字符集数据（"),e("code",[t._v("NCLOB")]),t._v("）。")]),t._v(" "),e("h3",{attrs:{id:"long数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#long数据类型"}},[t._v("$")]),t._v(" LONG数据类型")]),t._v(" "),e("blockquote",[e("p",[e("strong",[t._v("注意：")])]),t._v(" "),e("p",[t._v("不要创建带有"),e("code",[t._v("LONG")]),t._v("列的表。请改用LOB列（"),e("code",[t._v("CLOB")]),t._v("，"),e("code",[t._v("NCLOB")]),t._v("）。"),e("code",[t._v("LONG")]),t._v("仅支持向后列的列。")]),t._v(" "),e("p",[t._v("Oracle还建议您将现有"),e("code",[t._v("LONG")]),t._v("列转换为LOB列。LOB列受到的限制比"),e("code",[t._v("LONG")]),t._v("列少得多。此外，LOB功能在每个发行版中都得到了增强，而"),e("code",[t._v("LONG")]),t._v("功能在多个发行版中都是静态的。")])]),t._v(" "),e("p",[t._v("定义为的列"),e("code",[t._v("LONG")]),t._v("可以存储可变长度的字符数据，其中包含多达2 GB的信息。"),e("code",[t._v("LONG")]),t._v("data是在不同系统之间移动时要适当转换的文本数据。")]),t._v(" "),e("p",[e("code",[t._v("LONG")]),t._v("数据字典中使用datatype列来存储视图定义的文本。您可以使用列表"),e("code",[t._v("LONG")]),t._v("中的"),e("code",[t._v("SELECT")]),t._v("列，"),e("code",[t._v("SET")]),t._v("语句子句和"),e("code",[t._v("UPDATE")]),t._v("语句"),e("code",[t._v("VALUES")]),t._v("子句"),e("code",[t._v("INSERT")]),t._v("。")]),t._v(" "),e("h2",{attrs:{id:"数值数据类型概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数值数据类型概述"}},[t._v("$")]),t._v(" 数值数据类型概述")]),t._v(" "),e("p",[t._v("数字数据类型存储正负定点和浮点数，零，无穷大以及作为操作未定义结果的值（即“不是数字”或NAN）。")]),t._v(" "),e("p",[t._v("本节包括以下主题：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i22289",target:"_blank",rel:"noopener noreferrer"}},[t._v("NUMBER个数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i22294",target:"_blank",rel:"noopener noreferrer"}},[t._v("浮点数字"),e("OutboundLink")],1)])]),t._v(" "),e("h3",{attrs:{id:"number个数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#number个数据类型"}},[t._v("$")]),t._v(" NUMBER个数据类型")]),t._v(" "),e("p",[t._v("该"),e("code",[t._v("NUMBER")]),t._v("数据类型存储固定和浮点数。几乎可以存储任何数量的数值，并保证这些数值可移植到运行Oracle数据库的不同系统之间，精度最高可达38位。")]),t._v(" "),e("p",[t._v("以下数字可以存储在"),e("code",[t._v("NUMBER")]),t._v("列中：")]),t._v(" "),e("ul",[e("li",[t._v("正数范围为1 x 10^ -130到9.99 ... 9 x 10^125，最多38个有效数字")]),t._v(" "),e("li",[t._v("负数从-1 x 10^ -130到9.99 ... 99 x 10^125，最多38个有效数字")]),t._v(" "),e("li",[t._v("零")]),t._v(" "),e("li",[t._v("正负无穷大（仅通过从Oracle数据库版本5导入而生成）")])]),t._v(" "),e("p",[t._v("对于数字列，可以将列指定为：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("column_name NUMBER \n")])])]),e("p",[t._v("另外，您还可以指定"),e("strong",[t._v("精度")]),t._v("（总位数）和"),e("strong",[t._v("规模")]),t._v("（数字小数点右边数）：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("column_name NUMBER（精度，小数位数） \n")])])]),e("p",[t._v("如果未指定精度，则该列将存储给定的值。如果未指定比例，则比例为零。")]),t._v(" "),e("p",[t._v("Oracle保证数字的可移植性，其精度等于或小于38位。您可以指定比例，但不能指定精度：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("column_name NUMBER（*，小数位数） \n")])])]),e("p",[t._v("在这种情况下，精度为38，并保持指定的比例。")]),t._v(" "),e("p",[t._v("指定数字字段时，最好指定精度和小数位数。这样可以对输入进行额外的完整性检查。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#g23242",target:"_blank",rel:"noopener noreferrer"}},[t._v("表26-1"),e("OutboundLink")],1),t._v("显示了如何使用不同的比例因子存储数据的示例。")]),t._v(" "),e("p",[t._v("表26-1比例因子如何影响数值数据存储")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("输入数据")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("指定为")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("存储为")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("7,456,123.89")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("NUMBER")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7456123.89")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("7,456,123.89")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("NUMBER(*,1)")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7456123.9")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("7,456,123.89")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("NUMBER(9)")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7456124")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("7,456,123.89")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("NUMBER(9,2)")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7456123.89")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("7,456,123.89")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("NUMBER(9,1)")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7456123.9")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("7,456,123.89")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("NUMBER(6)")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("（不接受，超出精度）")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("7,456,123.89")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("NUMBER(7,-2)")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7456100")])])])]),t._v(" "),e("p",[t._v("如果指定负比例，则Oracle数据库会将实际数据四舍五入到小数点左边的指定位数。例如，指定（7，-2）表示Oracle数据库四舍五入到最接近的百分之一，如"),e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#g23242",target:"_blank",rel:"noopener noreferrer"}},[t._v("表26-1"),e("OutboundLink")],1),t._v("所示。")]),t._v(" "),e("p",[t._v("对于数字的输入和输出，标准的Oracle数据库默认十进制字符是一个句点，如数字1234.56。十进制是分隔数字的整数和小数部分的字符。您可以使用初始化参数更改默认的十进制字符"),e("code",[t._v("NLS_NUMERIC_CHARACTERS")]),t._v("。您也可以在使用该"),e("code",[t._v("ALTER SESSION")]),t._v("语句的会话期间更改它。要输入不使用当前默认十进制字符的数字，请使用此"),e("code",[t._v("TO_NUMBER")]),t._v("功能。")]),t._v(" "),e("h4",{attrs:{id:"内部数字格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#内部数字格式"}},[t._v("$")]),t._v(" 内部数字格式")]),t._v(" "),e("p",[t._v("Oracle数据库以可变长度格式存储数字数据。每个值都以科学计数法存储，其中1个字节用于存储指数，最多20个字节用于存储尾数。结果值限制为38位精度。Oracle数据库不存储前导零和尾随零。例如，数字412以类似于4.12 x 10 2的格式存储，其中1个字节用于存储exponent（"),e("code",[t._v("2")]),t._v("），而2个字节用于存储mantissa（"),e("code",[t._v("4,1,2")]),t._v("）的三个有效数字。负数包括其长度中的符号。")]),t._v(" "),e("p",[t._v("考虑到这一点，可以使用以下公式计算特定数值数据值的列大小（以字节为单位）"),e("code",[t._v("NUMBER(``p``)")]),t._v("，其中"),e("code",[t._v("p")]),t._v("是给定值的精度。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("ROUND（（长度（p）+ s / 2））+ 1\n")])])]),e("p",[t._v("其中，"),e("code",[t._v("s")]),t._v("如果数字为正，则等于零；如果数字为负，则"),e("code",[t._v("s")]),t._v("等于1。")]),t._v(" "),e("p",[t._v("零和正负无穷大（仅在从Oracle数据库版本5导入时生成）使用唯一表示存储。零和负无穷大各自需要1个字节；正无穷大需要2个字节。")]),t._v(" "),e("h3",{attrs:{id:"浮点数字"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浮点数字"}},[t._v("$")]),t._v(" 浮点数字")]),t._v(" "),e("p",[t._v("Oracle数据库专门为floati提供了两种数字数据类型ng点数："),e("code",[t._v("BINARY_FLOAT")]),t._v("和"),e("code",[t._v("BINARY_DOUBLE")]),t._v("。它们支持"),e("code",[t._v("NUMBER")]),t._v("数据类型提供的所有基本功能。然而，尽管"),e("code",[t._v("NUMBER")]),t._v("使用小数精度，"),e("code",[t._v("BINARY_FLOAT")]),t._v("并"),e("code",[t._v("BINARY_DOUBLE")]),t._v("采用二进制精度。这样可以加快算术运算的速度，通常可以减少存储需求。")]),t._v(" "),e("p",[e("code",[t._v("BINARY_FLOAT")]),t._v("和"),e("code",[t._v("BINARY_DOUBLE")]),t._v("是近似数值数据类型。它们存储十进制值的近似表示，而不是精确表示。例如，值0.1不能由"),e("code",[t._v("BINARY_DOUBLE")]),t._v("或精确表示"),e("code",[t._v("BINARY_FLOAT")]),t._v("。它们经常用于科学计算。它们的行为类似于数据类型"),e("code",[t._v("FLOAT")]),t._v("以及"),e("code",[t._v("DOUBLE")]),t._v("Java和XMLSchema。")]),t._v(" "),e("p",[t._v("本节包括以下主题：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEEEHFJ",target:"_blank",rel:"noopener noreferrer"}},[t._v("BINARY_FLOAT数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEJECIH",target:"_blank",rel:"noopener noreferrer"}},[t._v("BINARY_DOUBLE数据类型"),e("OutboundLink")],1)])]),t._v(" "),e("h4",{attrs:{id:"binary-float数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#binary-float数据类型"}},[t._v("$")]),t._v(" BINARY_FLOAT数据类型")]),t._v(" "),e("p",[e("code",[t._v("BINARY_FLOAT")]),t._v("是32位单精度浮点数数据类型。每个"),e("code",[t._v("BINARY_FLOAT")]),t._v("值需要5个字节，包括一个长度字节。")]),t._v(" "),e("h4",{attrs:{id:"binary-double数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#binary-double数据类型"}},[t._v("$")]),t._v(" BINARY_DOUBLE数据类型")]),t._v(" "),e("p",[e("code",[t._v("BINARY_DOUBLE")]),t._v("是64位双精度浮点数数据类型。每个"),e("code",[t._v("BINARY_DOUBLE")]),t._v("值需要9个字节，包括一个长度字节。")]),t._v(" "),e("h2",{attrs:{id:"date数据类型概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#date数据类型概述"}},[t._v("$")]),t._v(" DATE数据类型概述")]),t._v(" "),e("p",[t._v("该"),e("code",[t._v("DATE")]),t._v("数据类型存储指向即时值（日期和时间），在表中。该"),e("code",[t._v("DATE")]),t._v("数据类型存储年（包括世纪），月，日，小时，分钟和秒（午夜后）。")]),t._v(" "),e("p",[t._v("Oracle数据库可以存储Julian时代的日期，范围是从公元前4712年1月1日到9999年12月31日（通用时代或“ AD”）。除非专门使用BCE（格式掩码中的“ BC”），否则CE日期条目为默认设置。")]),t._v(" "),e("p",[t._v("Oracle数据库使用其自己的内部格式来存储日期。日期数据存储在每个长度为七个字节的固定长度字段中，分别对应于世纪，年，月，日，时，分和秒。")]),t._v(" "),e("p",[t._v("对于日期的输入和输出，标准的Oracle日期格式为"),e("code",[t._v("DD-MON-YY")]),t._v("，如下所示：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("'13 -NOV-92' \n")])])]),e("p",[t._v("您可以使用参数更改实例的默认日期格式"),e("code",[t._v("NLS_DATE_FORMAT")]),t._v("。您也可以在用户会话期间使用该"),e("code",[t._v("ALTER SESSION")]),t._v("语句更改它。要输入非标准Oracle日期格式的日期，请将该"),e("code",[t._v("TO_DATE")]),t._v("函数与格式掩码一起使用：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("TO_DATE（'1992年11月13日'，'MONTH DD，YYYY'） \n")])])]),e("p",[t._v("Oracle数据库以24小时格式存储时间"),e("code",[t._v("HH:MI:SS")]),t._v("。默认情况下，日期字段中的时间为"),e("code",[t._v("00:00:00 A.M")]),t._v("。（午夜）（如果未输入时间部分）。在仅时间条目中，日期部分默认为当前月份的第一天。要输入日期的时间部分，请使用"),e("code",[t._v("TO_DATE")]),t._v("带有指示时间部分的格式掩码的功能，如下所示：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("INSERT INTO birthdays (bname, bday) VALUES \n    ('ANDY',TO_DATE('13-AUG-66 12:56 A.M.','DD-MON-YY HH:MI A.M.')); \n")])])]),e("p",[t._v("本节包括以下主题：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEFDCJH",target:"_blank",rel:"noopener noreferrer"}},[t._v("Julian日期的使用"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEGHIFG",target:"_blank",rel:"noopener noreferrer"}},[t._v("日期算术"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEJJBFH",target:"_blank",rel:"noopener noreferrer"}},[t._v("世纪和2000年"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEJCGHC",target:"_blank",rel:"noopener noreferrer"}},[t._v("夏令时支持"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEGDFFE",target:"_blank",rel:"noopener noreferrer"}},[t._v("时区"),e("OutboundLink")],1)])]),t._v(" "),e("h3",{attrs:{id:"朱利安日期的使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#朱利安日期的使用"}},[t._v("$")]),t._v(" 朱利安日期的使用")]),t._v(" "),e("p",[t._v("朱利安日期允许根据从共同参考处获得的天数进行连续约会。（参考日期是公元前01-01-4712年，因此当前日期在240万范围内。）儒略日期名义上不是整数，小数部分是一天的一部分。Oracle数据库使用一种简化的方法来生成整数值。朱利安日期可以被不同地计算和解释。Oracle数据库使用的计算方法将得出一个七位数的数字（用于最常用的日期），例如08-APR-93的2449086。")]),t._v(" "),e("blockquote",[e("p",[t._v("注意：")]),t._v(" "),e("p",[t._v("Oracle朱利安日期可能与其他日期算法生成的朱利安日期不兼容。")])]),t._v(" "),e("p",[t._v("格式掩码"),e("code",[t._v("'J'")]),t._v("可以与日期函数（"),e("code",[t._v("TO_DATE")]),t._v("或"),e("code",[t._v("TO_CHAR")]),t._v("）一起使用，以将日期数据转换为儒略日期。例如，以下查询以儒略日期格式返回所有日期：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("SELECT TO_CHAR (hire_date, 'J') FROM employees; \n")])])]),e("p",[e("code",[t._v("TO_NUMBER")]),t._v("如果要在计算中使用儒略日期，则必须使用该函数。您可以使用该"),e("code",[t._v("TO_DATE")]),t._v("功能输入儒略日期：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("INSERT INTO employees (hire_date) VALUES (TO_DATE(2448921, 'J')); \n")])])]),e("h3",{attrs:{id:"日期算术"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#日期算术"}},[t._v("$")]),t._v(" 日期算术")]),t._v(" "),e("p",[t._v("Oracle日期算术考虑了整个历史记录中使用的日历异常。例如，从儒略历改为公历15-10-1582消除了前10天（05-10-1582至14-10-1582）。年份0不存在。")]),t._v(" "),e("p",[t._v("您可以将丢失的日期输入数据库，但是在日期算术中将忽略它们，并将其视为下一个“实际”日期。例如，04-10-1582之后的第二天是15-10-1582，05-10-1582之后的第二天也是15-10-1582。")]),t._v(" "),e("blockquote",[e("p",[t._v("注意：")]),t._v(" "),e("p",[t._v("有关日期算术的讨论可能不适用于所有国家的日期标准（例如亚洲的日期标准）。")])]),t._v(" "),e("h3",{attrs:{id:"世纪和2000年"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#世纪和2000年"}},[t._v("$")]),t._v(" 世纪和2000年")]),t._v(" "),e("p",[t._v("Oracle数据库存储带有世纪信息的年份数据。例如，Oracle数据库存储1996或2001，而不仅仅是96或01。"),e("code",[t._v("DATE")]),t._v("数据类型始终在内部存储四位数的年份，而在数据库内部存储的所有其他日期都具有四位数的年份。Oracle数据库实用程序（例如导入，导出和恢复）也需要四位数的年数。")]),t._v(" "),e("h3",{attrs:{id:"夏令时支持"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#夏令时支持"}},[t._v("$")]),t._v(" 夏令时支持")]),t._v(" "),e("p",[t._v("Oracle数据库为"),e("code",[t._v("DATETIME")]),t._v("服务器中的数据类型提供了夏令时支持。您可以"),e("code",[t._v("DATETIME")]),t._v("基于特定区域中的本地时间插入和查询值。该"),e("code",[t._v("DATETIME")]),t._v("数据类型"),e("code",[t._v("TIMESTAMP WITH TIME ZONE")]),t._v("和"),e("code",[t._v("TIMESTAMP WITH LOCAL TIME ZONE")]),t._v("是时区感知。")]),t._v(" "),e("h3",{attrs:{id:"时区"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#时区"}},[t._v("$")]),t._v(" 时区")]),t._v(" "),e("p",[t._v("您可以在您的日期/时间数据中包括时区，以及小数秒。添加了三个新的数据类型"),e("code",[t._v("DATE")]),t._v("，"),e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CDEIGIFB",target:"_blank",rel:"noopener noreferrer"}},[t._v("表26-2中"),e("OutboundLink")],1),t._v("列出了它们的区别。")]),t._v(" "),e("p",[t._v("表26-2时区数据类型")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("数据类型")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("时区")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("分数秒")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("DATE")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("没有")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("没有")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("TIMESTAMP")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("没有")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("是")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("TIMESTAMP")]),t._v(" "),e("code",[t._v("WITH TIME ZONE")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("明确的")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("是")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("TIMESTAMP")]),t._v(" "),e("code",[t._v("WITH LOCAL TIME ZONE")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("相对的")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("是")])])])]),t._v(" "),e("p",[e("code",[t._v("TIMESTAMP WITH LOCAL TIME ZONE")]),t._v("存储在数据库时区中。当用户选择数据时，该值将调整为用户的会话时区。")]),t._v(" "),e("p",[t._v("例如，旧金山数据库的系统时区= -8：00。当纽约客户（会话时区= -5：00）插入到旧金山数据库中或从中进行选择时，"),e("code",[t._v("TIMESTAMP WITH LOCAL TIME ZONE")]),t._v("数据将进行如下调整：")]),t._v(" "),e("ul",[e("li",[t._v("纽约客户将插入旧金山数据库中"),e("code",[t._v("TIMESTAMP'1998-1-23 6:00:00-5:00'")]),t._v("的"),e("code",[t._v("TIMESTAMP WITH LOCAL TIME ZONE")]),t._v("列。插入的数据作为二进制值存储在San Francisco "),e("code",[t._v("1998-1-23 3:00:00")]),t._v("。")]),t._v(" "),e("li",[t._v("当纽约客户从旧金山数据库中选择插入的数据时，纽约显示的值为"),e("code",[t._v("'1998-1-23 6:00:00'")]),t._v("。")]),t._v(" "),e("li",[t._v("一个旧金山客户，选择相同的数据，请参见值"),e("code",[t._v("'1998-1-23 3:00:00'")]),t._v("。")])]),t._v(" "),e("blockquote",[e("p",[t._v("注意：")]),t._v(" "),e("p",[t._v("为了避免DML对数据时间数据的操作产生意外结果，您可以通过查询内置的SQL函数"),e("code",[t._v("DBTIMEZONE")]),t._v("和来验证数据库和会话时区"),e("code",[t._v("SESSIONTIMEZONE")]),t._v("。如果尚未手动设置数据库时区或会话时区，则Oracle数据库默认使用操作系统时区。如果操作系统时区不是有效的Oracle时区，则Oracle数据库使用UTC作为默认值。")])]),t._v(" "),e("h2",{attrs:{id:"lob数据类型概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#lob数据类型概述"}},[t._v("$")]),t._v(" LOB数据类型概述")]),t._v(" "),e("p",[t._v("将LOB数据类型"),e("code",[t._v("BLOB")]),t._v("，"),e("code",[t._v("CLOB")]),t._v("，"),e("code",[t._v("NCLOB")]),t._v("，并且"),e("code",[t._v("BFILE")]),t._v("使您能够存储和处理非结构化数据（如文本，图像，视频片段和声音波形）以二进制或字符格式的大块。它们提供了对数据的高效，随机，分段访问。Oracle建议您始终对"),e("code",[t._v("LONG")]),t._v("数据类型使用LOB数据类型。您可以在LOB列上执行并行查询（但不能并行DML或DDL）。")]),t._v(" "),e("p",[t._v("LOB数据类型在多种方面不同于"),e("code",[t._v("LONG")]),t._v("和"),e("code",[t._v("LONG")]),t._v(" "),e("code",[t._v("RAW")]),t._v("数据类型。例如：")]),t._v(" "),e("ul",[e("li",[t._v("一个表可以包含多个LOB列，但只能包含一个"),e("code",[t._v("LONG")]),t._v("列。")]),t._v(" "),e("li",[t._v("包含一个或多个LOB列的表可以被分区，但是包含"),e("code",[t._v("LONG")]),t._v("列的表不能被分区。")]),t._v(" "),e("li",[t._v("根据数据库块的大小，LOB的最大大小为128 TB，而a的最大大小"),e("code",[t._v("LONG")]),t._v("仅为2 GB。")]),t._v(" "),e("li",[t._v("LOB支持对数据的随机访问，但"),e("code",[t._v("LONG")]),t._v("仅支持顺序访问。")]),t._v(" "),e("li",[t._v("LOB数据类型（除外"),e("code",[t._v("NCLOB")]),t._v("）可以是用户定义的对象类型的属性，但是"),e("code",[t._v("LONG")]),t._v("数据类型则不能。")]),t._v(" "),e("li",[t._v("充当局部变量的临时LOB可用于对LOB数据执行转换。临时内部LOB（"),e("code",[t._v("BLOBs")]),t._v("，"),e("code",[t._v("CLOBs")]),t._v("和"),e("code",[t._v("NCLOB")]),t._v("）在临时表空间中创建，并且独立于表。"),e("code",[t._v("LONG")]),t._v("但是，对于数据类型，没有临时结构可用。")]),t._v(" "),e("li",[t._v("带有LOB列的表可以被复制，但是带有"),e("code",[t._v("LONG")]),t._v("列的表不能被复制。")])]),t._v(" "),e("p",[t._v("SQL语句在表中定义LOB列，并在用户定义的对象类型中定义LOB属性。在表中定义LOB时，可以显式指定每个LOB的表空间和存储特征。")]),t._v(" "),e("p",[t._v("LOB数据类型可以内联（表内），脱机（在表空间内，使用LOB定位器）或外部文件（"),e("code",[t._v("BFILE")]),t._v("数据类型）中存储。将兼容性设置为Oracle9 "),e("em",[t._v("i")]),t._v("或更高版本时，可以将LOB与SQL "),e("code",[t._v("VARCHAR")]),t._v("运算符和函数一起使用。")]),t._v(" "),e("p",[t._v("本节包括以下主题：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3262",target:"_blank",rel:"noopener noreferrer"}},[t._v("BLOB数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3266",target:"_blank",rel:"noopener noreferrer"}},[t._v("CLOB和NCLOB数据类型"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#i3270",target:"_blank",rel:"noopener noreferrer"}},[t._v("BFILE数据类型"),e("OutboundLink")],1)])]),t._v(" "),e("h3",{attrs:{id:"blob数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#blob数据类型"}},[t._v("$")]),t._v(" BLOB数据类型")]),t._v(" "),e("p",[t._v("该"),e("code",[t._v("BLOB")]),t._v("数据库中的数据类型存储非结构化二进制数据。"),e("code",[t._v("BLOB")]),t._v("最多可以存储128 TB的二进制数据。")]),t._v(" "),e("p",[e("code",[t._v("BLOB")]),t._v("充分参与交易。包，PL / SQL或OCI 对"),e("code",[t._v("BLOB")]),t._v("值所做的更改"),e("code",[t._v("DBMS_LOB")]),t._v("可以被提交或回滚。但是，"),e("code",[t._v("BLOB")]),t._v("定位器不能跨越事务或会话。")]),t._v(" "),e("h3",{attrs:{id:"clob和nclob数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#clob和nclob数据类型"}},[t._v("$")]),t._v(" CLOB和NCLOB数据类型")]),t._v(" "),e("p",[t._v("该"),e("code",[t._v("CLOB")]),t._v("和"),e("code",[t._v("NCLOB")]),t._v("数据类型最多存储到数据库中的128兆兆字节的字符数据。"),e("code",[t._v("CLOB")]),t._v("s存储数据库字符集数据和"),e("code",[t._v("NCLOB")]),t._v("s storeUnicode国家字符集数据。通过在内部以固定宽度Unicode字符集存储宽度可变的LOB数据，Oracle数据库可以在CLOB和NCLOB上提供基于字符的有效随机访问。")]),t._v(" "),e("p",[e("code",[t._v("CLOB")]),t._v("s和"),e("code",[t._v("NCLOB")]),t._v("s完全参与交易。包，PL / SQL或OCI 对a "),e("code",[t._v("CLOB")]),t._v("或"),e("code",[t._v("NCLOB")]),t._v("value 所做的更改"),e("code",[t._v("DBMS_LOB")]),t._v("可以被提交或回滚。然而，"),e("code",[t._v("CLOB")]),t._v("和"),e("code",[t._v("NCLOB")]),t._v("定位器不能跨事务或会话。您不能使用"),e("code",[t._v("NCLOB")]),t._v("属性创建对象类型，但是可以"),e("code",[t._v("NCLOB")]),t._v("在对象类型的方法中指定参数。")]),t._v(" "),e("h2",{attrs:{id:"实践"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实践"}},[t._v("$")]),t._v(" 实践")]),t._v(" "),e("div",{staticClass:"language-sql extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sql"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("create")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("table")]),t._v(" MULTI_DATA_TYPE\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  id    VARCHAR2"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("bdb")]),t._v("   BINARY_DOUBLE"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  bft   BINARY_FLOAT"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  blb   "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("BLOB")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  clb   CLOB"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  chr   "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("CHAR")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  dt    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DATE")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  ids   "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTERVAL")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DAY")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TO")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SECOND")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  iym   "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTERVAL")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("YEAR")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TO")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("MONTH")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  lng   LONG"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  nclb  NCLOB"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  num   NUMBER"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  nvchr NVARCHAR2"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  rw    RAW"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  ts    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TIMESTAMP")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  tslz  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TIMESTAMP")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WITH")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("LOCAL")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TIME")]),t._v(" ZONE"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  tsz   "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TIMESTAMP")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WITH")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TIME")]),t._v(" ZONE\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("create")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("table")]),t._v(" DATE_DEMO\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  name       NUMBER"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("not")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  comm       NUMBER"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  lngr       LONG RAW\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h2",{attrs:{id:"参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("$")]),t._v(" 参考")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CNCPT113",target:"_blank",rel:"noopener noreferrer"}},[t._v("Oracle数据类型"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://docs.oracle.com/cd/F49540_01/DOC/java.815/a64685/basic3.htm",target:"_blank",rel:"noopener noreferrer"}},[t._v("Datatype Mappings"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B28359_01/server.111/b28320/statviews_1036.htm#REFRN20040",target:"_blank",rel:"noopener noreferrer"}},[t._v("ALL_COL_COMMENTS"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://docs.oracle.com/cd/B19306_01/server.102/b14237/statviews_2094.htm",target:"_blank",rel:"noopener noreferrer"}},[t._v("ALL_TAB_COLUMNS"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://www.experts-exchange.com/questions/22049278/Difference-between-ALL-TAB-COLUMNS-DATA-LENGTH-and-CHAR-LENGTH.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Difference between ALL_TAB_COLUMNS: DATA_LENGTH and CHAR_LENGTH"),e("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=v.exports}}]);