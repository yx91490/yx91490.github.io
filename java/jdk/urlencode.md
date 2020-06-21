# URL编码

当前的URI规范是RFC3986。

## RFC 3986

URI所允许的字符分作**保留**与**非保留**。保留字符是URI中用于分隔组件和子组件的字符。非保留字符是URI中允许出现的除了保留字符之外的那些字符。

RFC 3986 规定的保留字符以及对应的百分号编码：

| `!`   | `#`   | `$`   | `&`   | `'`   | `(`   | `)`   | `*`   | `+`   | `,`   | `/`   | `:`   | `;`   | `=`   | `?`   | `@`   | `[`   | `]`   |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| `%21` | `%23` | `%24` | `%26` | `%27` | `%28` | `%29` | `%2A` | `%2B` | `%2C` | `%2F` | `%3A` | `%3B` | `%3D` | `%3F` | `%40` | `%5B` | `%5D` |

RFC3986 规定的非保留字符（包括字母、数字和 `-`    `_`   `.`  `~`） 。

RFC3986 建议所有新的URI必须对非保留字符不加以百分号编码；其它字符建议先转换为UTF-8字节序列, 然后对其字节值使用百分号编码。

## 空格的编码

空格应该被编码为加号还是%20?

在HTML4.0.1中，基于RFC-1738标准，在URL编码以后为 ‘+’。基于RFC-2396标准，在URL编码以后为‘%20’。

## java.net.URLEncoder实现

该类把字符串转换成 `application/x-www-form-urlencoded`的MIME格式，想了解HTML表单编码请参考规范：http://www.w3.org/TR/html4。

#### 编码规则

- 字母数字保持原样，字符`.`, `-`, `*`,  `_`保持原样

- 空格符转换为加号`+`

- 其他字符是不安全的，首先会按照一些编码方案转换为一个或多个字节，然后每个字节用3字符`%xy`表示，`xy`是该字节十六进制的两位数。
- 推荐的编码方案是UTF-8，如果没有指定编码，为了兼容性会使用平台特定的默认编码。

#### 关于非保留字符

还有一段注释（说的比较绕@_@）：

> RFC2396声明：
>
> URI中允许的没有保留用途的数据字符称为非保留字符，包括大写和小写字母，十进制数字以及一组有限的标点符号和符号：
>
> ```
> "-"  "_"  "."  "!"  "~"  "*"  "'"  "("  ")"
> ```
>
> 可以在不更改URI的语义的情况下转义非保留字符，但是除非在不允许出现未转义的字符的上下文中使用URI，否则不应该转义非保留字符。

> Netscape和Internet Explorer都转义了该列表中除“-”，“ _”，“.”，“ *”外所有特殊字符。也许在某些情况下如果不转义其他字符是不安全的，这与O'Reilly的“ HTML：权威指南”（第164页）一致。
> 最后Intenet Explorer不会对“@”字符进行编码，根据RFC“ @”字符是保留字符。在这方面，我们与RFC保持一致，Netscape也是如此。

总结下来就是：

1. 遵循RFC2396规范
2. 只允许四个非保留字符：“-”，“ _”，“.”，“ *”
3. "@"需要编码

#### encode()方法

万维网联盟声明应该使用UTF8编码，否则会带来兼容性问题。

关于保留字符等的编码验证：

```
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.*!~'() @
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.*%21%7E%27%28%29+%40
```

## org.springframework.web.util.UriUtils实现

UriUtils的实现遵循最新的RFC3986规范，代码写的也很漂亮。

关于保留字符等的编码验证：

```
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.*!~'() @
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.%2A%21~%27%28%29%20%40
```



## 参考

- [百分号编码](https://zh.wikipedia.org/wiki/百分号编码)
- [关于url编码标准的说明](https://www.jianshu.com/p/9fd9bd197fd1)
- [URL编码中的空格(编码以后变为+)](https://cloud.tencent.com/developer/article/1132075)
- [RFC3986.2005-01: Uniform Resource Identifier (URI): Generic Syntax(当前的通用URI语法规范)](https://tools.ietf.org/html/rfc3986)
- [RFC2396.1998-08: Uniform Resource Identifiers (URI): Generic Syntax（已过时）](https://tools.ietf.org/html/rfc2396)
- [RFC2732.1999-12: Format for Literal IPv6 Addresses in URL's（已过时）](https://tools.ietf.org/html/rfc2732)
- [RFC1738.1994-12: Uniform Resource Locators (URL)（大多数已过时）](https://tools.ietf.org/html/rfc1738)
- [RFC1808.1995-06: Relative Uniform Resource Locators（大多数已过时）](https://tools.ietf.org/html/rfc1808)
- [RFC1630.1994-06: Universal Resource Identifiers in WWW（已过时）](https://tools.ietf.org/html/rfc1630)



