# MySQL字段的显示宽度

MySQL建表时常常要指定一个长度，这个长度并不是该数据类型占用的存储空间，而是所谓的显示宽度。对于如下的一张表，

```mysql
CREATE TABLE `test` (
  `id` INT(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` CHAR(2) NOT NULL,
  PRIMARY KEY (`id`)
);
```

对于varchar(2)这样的数据类型，不能插入’123’或者’你好吗’这样的字符串，但是可以插入’12’,’你好’这样的字符串，我们知道在utf8字符集下两个汉字占用6个字节的大小。 
对于int(2)这样的数据 类型，是可以插入数字123的，但是最大不能超过int存储范围的最大值，而当该字段打开unsinged zerofill属性时，不足的位数是用0补齐的，也就是说数字9显示为09。

参考: 
[http://www.netingcn.com/mysql-int-display-width.html](http://www.netingcn.com/mysql-int-display-width.html)

[https://dev.mysql.com/doc/refman/5.7/en/numeric-type-attributes.html](https://dev.mysql.com/doc/refman/5.7/en/numeric-type-attributes.html)