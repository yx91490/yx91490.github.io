(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{558:function(e,t,r){"use strict";r.r(t);var _=r(10),v=Object(_.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"url编码笔记"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#url编码笔记"}},[e._v("$")]),e._v(" URL编码笔记")]),e._v(" "),t("p",[e._v("当前的URI规范是RFC3986。")]),e._v(" "),t("h2",{attrs:{id:"rfc-3986"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rfc-3986"}},[e._v("$")]),e._v(" RFC 3986")]),e._v(" "),t("p",[e._v("URI所允许的字符分作"),t("strong",[e._v("保留")]),e._v("与"),t("strong",[e._v("非保留")]),e._v("。保留字符是URI中用于分隔组件和子组件的字符。非保留字符是URI中允许出现的除了保留字符之外的那些字符。")]),e._v(" "),t("p",[e._v("RFC 3986 规定的保留字符以及对应的百分号编码：")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[t("code",[e._v("!")])]),e._v(" "),t("th",[t("code",[e._v("#")])]),e._v(" "),t("th",[t("code",[e._v("$")])]),e._v(" "),t("th",[t("code",[e._v("&")])]),e._v(" "),t("th",[t("code",[e._v("'")])]),e._v(" "),t("th",[t("code",[e._v("(")])]),e._v(" "),t("th",[t("code",[e._v(")")])]),e._v(" "),t("th",[t("code",[e._v("*")])]),e._v(" "),t("th",[t("code",[e._v("+")])]),e._v(" "),t("th",[t("code",[e._v(",")])]),e._v(" "),t("th",[t("code",[e._v("/")])]),e._v(" "),t("th",[t("code",[e._v(":")])]),e._v(" "),t("th",[t("code",[e._v(";")])]),e._v(" "),t("th",[t("code",[e._v("=")])]),e._v(" "),t("th",[t("code",[e._v("?")])]),e._v(" "),t("th",[t("code",[e._v("@")])]),e._v(" "),t("th",[t("code",[e._v("[")])]),e._v(" "),t("th",[t("code",[e._v("]")])])])]),e._v(" "),t("tbody",[t("tr",[t("td",[t("code",[e._v("%21")])]),e._v(" "),t("td",[t("code",[e._v("%23")])]),e._v(" "),t("td",[t("code",[e._v("%24")])]),e._v(" "),t("td",[t("code",[e._v("%26")])]),e._v(" "),t("td",[t("code",[e._v("%27")])]),e._v(" "),t("td",[t("code",[e._v("%28")])]),e._v(" "),t("td",[t("code",[e._v("%29")])]),e._v(" "),t("td",[t("code",[e._v("%2A")])]),e._v(" "),t("td",[t("code",[e._v("%2B")])]),e._v(" "),t("td",[t("code",[e._v("%2C")])]),e._v(" "),t("td",[t("code",[e._v("%2F")])]),e._v(" "),t("td",[t("code",[e._v("%3A")])]),e._v(" "),t("td",[t("code",[e._v("%3B")])]),e._v(" "),t("td",[t("code",[e._v("%3D")])]),e._v(" "),t("td",[t("code",[e._v("%3F")])]),e._v(" "),t("td",[t("code",[e._v("%40")])]),e._v(" "),t("td",[t("code",[e._v("%5B")])]),e._v(" "),t("td",[t("code",[e._v("%5D")])])])])]),e._v(" "),t("p",[e._v("RFC3986 规定的非保留字符（包括字母、数字和 "),t("code",[e._v("-")]),e._v(" "),t("code",[e._v("_")]),e._v(" "),t("code",[e._v(".")]),e._v(" "),t("code",[e._v("~")]),e._v("） 。")]),e._v(" "),t("p",[e._v("RFC3986 建议所有新的URI必须对非保留字符不加以百分号编码；其它字符建议先转换为UTF-8字节序列, 然后对其字节值使用百分号编码。")]),e._v(" "),t("h2",{attrs:{id:"空格的编码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#空格的编码"}},[e._v("$")]),e._v(" 空格的编码")]),e._v(" "),t("p",[e._v("空格应该被编码为加号还是%20?")]),e._v(" "),t("p",[e._v("在HTML4.0.1中，基于RFC-1738标准，在URL编码以后为 ‘+’。基于RFC-2396标准，在URL编码以后为‘%20’。")]),e._v(" "),t("h2",{attrs:{id:"java-net-urlencoder实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#java-net-urlencoder实现"}},[e._v("$")]),e._v(" java.net.URLEncoder实现")]),e._v(" "),t("p",[e._v("该类把字符串转换成 "),t("code",[e._v("application/x-www-form-urlencoded")]),e._v("的MIME格式，想了解HTML表单编码请参考规范：http://www.w3.org/TR/html4。")]),e._v(" "),t("h4",{attrs:{id:"编码规则"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#编码规则"}},[e._v("$")]),e._v(" 编码规则")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("字母数字保持原样，字符"),t("code",[e._v(".")]),e._v(", "),t("code",[e._v("-")]),e._v(", "),t("code",[e._v("*")]),e._v(",  "),t("code",[e._v("_")]),e._v("保持原样")])]),e._v(" "),t("li",[t("p",[e._v("空格符转换为加号"),t("code",[e._v("+")])])]),e._v(" "),t("li",[t("p",[e._v("其他字符是不安全的，首先会按照一些编码方案转换为一个或多个字节，然后每个字节用3字符"),t("code",[e._v("%xy")]),e._v("表示，"),t("code",[e._v("xy")]),e._v("是该字节十六进制的两位数。")])]),e._v(" "),t("li",[t("p",[e._v("推荐的编码方案是UTF-8，如果没有指定编码，为了兼容性会使用平台特定的默认编码。")])])]),e._v(" "),t("h4",{attrs:{id:"关于非保留字符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关于非保留字符"}},[e._v("$")]),e._v(" 关于非保留字符")]),e._v(" "),t("p",[e._v("还有一段注释（说的比较绕@_@）：")]),e._v(" "),t("blockquote",[t("p",[e._v("RFC2396声明：")]),e._v(" "),t("p",[e._v("URI中允许的没有保留用途的数据字符称为非保留字符，包括大写和小写字母，十进制数字以及一组有限的标点符号和符号：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('"-"  "_"  "."  "!"  "~"  "*"  "\'"  "("  ")"\n')])])]),t("p",[e._v("可以在不更改URI的语义的情况下转义非保留字符，但是除非在不允许出现未转义的字符的上下文中使用URI，否则不应该转义非保留字符。")])]),e._v(" "),t("blockquote",[t("p",[e._v("Netscape和Internet Explorer都转义了该列表中除“-”，“ _”，“.”，“ *”外所有特殊字符。也许在某些情况下如果不转义其他字符是不安全的，这与O'Reilly的“ HTML：权威指南”（第164页）一致。\n最后Intenet Explorer不会对“@”字符进行编码，根据RFC“ @”字符是保留字符。在这方面，我们与RFC保持一致，Netscape也是如此。")])]),e._v(" "),t("p",[e._v("总结下来就是：")]),e._v(" "),t("ol",[t("li",[e._v("遵循RFC2396规范")]),e._v(" "),t("li",[e._v("只允许四个非保留字符：“-”，“ _”，“.”，“ *”")]),e._v(" "),t("li",[e._v('"@"需要编码')])]),e._v(" "),t("h4",{attrs:{id:"encode-方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#encode-方法"}},[e._v("$")]),e._v(" encode()方法")]),e._v(" "),t("p",[e._v("万维网联盟声明应该使用UTF8编码，否则会带来兼容性问题。")]),e._v(" "),t("p",[e._v("关于保留字符等的编码验证：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.*!~'() @\nabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.*%21%7E%27%28%29+%40\n")])])]),t("h2",{attrs:{id:"org-springframework-web-util-uriutils实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#org-springframework-web-util-uriutils实现"}},[e._v("$")]),e._v(" org.springframework.web.util.UriUtils实现")]),e._v(" "),t("p",[e._v("UriUtils的实现遵循最新的RFC3986规范，代码写的也很漂亮。")]),e._v(" "),t("p",[e._v("关于保留字符等的编码验证：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.*!~'() @\nabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.%2A%21~%27%28%29%20%40\n")])])]),t("h2",{attrs:{id:"参考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[e._v("$")]),e._v(" 参考")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E7%99%BE%E5%88%86%E5%8F%B7%E7%BC%96%E7%A0%81",target:"_blank",rel:"noopener noreferrer"}},[e._v("百分号编码"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://www.jianshu.com/p/9fd9bd197fd1",target:"_blank",rel:"noopener noreferrer"}},[e._v("关于url编码标准的说明"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1132075",target:"_blank",rel:"noopener noreferrer"}},[e._v("URL编码中的空格(编码以后变为+)"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc3986",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC3986.2005-01: Uniform Resource Identifier (URI): Generic Syntax(当前的通用URI语法规范)"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc2396",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC2396.1998-08: Uniform Resource Identifiers (URI): Generic Syntax（已过时）"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc2732",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC2732.1999-12: Format for Literal IPv6 Addresses in URL's（已过时）"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc1738",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC1738.1994-12: Uniform Resource Locators (URL)（大多数已过时）"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc1808",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC1808.1995-06: Relative Uniform Resource Locators（大多数已过时）"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc1630",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC1630.1994-06: Universal Resource Identifiers in WWW（已过时）"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=v.exports}}]);