在java中生成Excel文件最常用的库是Apache POI，这也是目前为止生成Excel特别是2007以后的xlsx格式的Excel最好的工具。由于内部的实现原理大体是用对象映射单元格，当导出的Excel数据量非常大的时候，会导致JVM内存吃紧从而进行Full GC。解决的办法一是调整JVM参数，另一个可以参考官方的代码给出的解决方案: 
[https://svn.apache.org/repos/asf/poi/trunk/src/examples/src/org/apache/poi/xssf/usermodel/examples/BigGridDemo.java](https://svn.apache.org/repos/asf/poi/trunk/src/examples/src/org/apache/poi/xssf/usermodel/examples/BigGridDemo.java)

这个方案大体思路是：xlsx格式的Excel本质上是一个由一些xml等文件压缩成的zip文件，每一个sheet作为一个单独的xml文件放在压缩文件的xl/worksheets目录下，当我们要导出固定格式的Excel时，只需要首先生成sheet对应的xml文件，然后将压缩包内的xml文件替换即可。自己实现的时候需要注意的地方有：

**1.** 我用的stringbuilder拼字符来生成xml文件，数据量大的时候也会导致内存溢出的问题，可以设定每多少行往文件中写入来解决。 
**2.** 填充值的时候要注意对其中的`<`和`＆`等xml文件中非法的字符进行转义，可以使用`StringEscapeUtils.escapeXml10(final String input)`进行处理。