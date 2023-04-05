(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{517:function(a,e,t){"use strict";t.r(e);var v=t(10),s=Object(v.a)({},(function(){var a=this,e=a._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"avro格式规范1-8-1翻译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#avro格式规范1-8-1翻译"}},[a._v("$")]),a._v(" avro格式规范1.8.1翻译")]),a._v(" "),e("h2",{attrs:{id:"schema声明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#schema声明"}},[a._v("$")]),a._v(" Schema声明")]),a._v(" "),e("p",[a._v("schema有以下几种json格式：")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("一个已定义类型名的json字符串")])]),a._v(" "),e("li",[e("p",[a._v("json对象：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{"type": "typeName" ...attributes...}\n')])])]),e("p",[a._v("typeName是一个基本类型名或者派生类型名，本文档没有定义允许的属性。")])]),a._v(" "),e("li",[e("p",[a._v("一个json数组，表示一个内置类型的组合。")])])]),a._v(" "),e("h3",{attrs:{id:"基本类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基本类型"}},[a._v("$")]),a._v(" 基本类型")]),a._v(" "),e("p",[a._v("基本类型名包括：")]),a._v(" "),e("ul",[e("li",[a._v("null: 没有值")]),a._v(" "),e("li",[a._v("boolean: 一个二进制的值")]),a._v(" "),e("li",[a._v("int: 32位有符号整型")]),a._v(" "),e("li",[a._v("long: 64位有符号整型")]),a._v(" "),e("li",[a._v("单精度IEEE754浮点型数字")]),a._v(" "),e("li",[a._v("双精度IEEE754浮点型数字")]),a._v(" "),e("li",[a._v("bytes: 8位无符号字节序列")]),a._v(" "),e("li",[a._v("string: unicode字符序列")])]),a._v(" "),e("p",[a._v('基本类型没有特定的属性，基本类型名也是已定义的类型名。因此"string"也等同于：')]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{"type": "string"}\n')])])]),e("h3",{attrs:{id:"复杂类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#复杂类型"}},[a._v("$")]),a._v(" 复杂类型")]),a._v(" "),e("p",[a._v("avro支持六种复杂类型：records, enums, arrays, maps, unions 以及 fixed.")]),a._v(" "),e("h4",{attrs:{id:"records"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#records"}},[a._v("$")]),a._v(" records")]),a._v(" "),e("p",[a._v('records使用类型名"record"，支持下面几种属性：')]),a._v(" "),e("ul",[e("li",[e("p",[a._v("name:一个json字符串定义了记录的名字（必要）")])]),a._v(" "),e("li",[e("p",[e("em",[a._v("namespace")]),a._v(",一个json字符串，限定了name的命名空间")])]),a._v(" "),e("li",[e("p",[a._v("doc: 一个json字符串，为用户提供文档信息（可选）")])]),a._v(" "),e("li",[e("p",[a._v("aliases: 一个json数组，提供此记录的别名（可选）")])]),a._v(" "),e("li",[e("p",[a._v("一个包含field列表的json数组（必需的），每个field是有下面属性的json对象：")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("name:一个json字符串定义了field的名字（必要）")])]),a._v(" "),e("li",[e("p",[a._v("doc: 一个json字符串，为用户描述了此field（可选）")])]),a._v(" "),e("li",[e("p",[a._v("type: 一个定义schema的json对象，或者一个已定义record的json字符串（必要）。")])]),a._v(" "),e("li",[e("p",[a._v("default:")]),a._v(" "),e("p",[a._v("此field的默认值（可选），根据schema类型的不同允许的值也不同。union类型field的默认值与union中第一个schema相对应。bytes和fixed类型field的默认值是json字符串，Unicode 0-255代码点映射成无符号8位字节。")]),a._v(" "),e("table",[e("thead",[e("tr",[e("th",[a._v("avro type")]),a._v(" "),e("th",[a._v("json type")]),a._v(" "),e("th",[a._v("example")])])]),a._v(" "),e("tbody",[e("tr",[e("td",[a._v("null")]),a._v(" "),e("td",[a._v("null")]),a._v(" "),e("td",[a._v("null")])]),a._v(" "),e("tr",[e("td",[a._v("boolean")]),a._v(" "),e("td",[a._v("boolean")]),a._v(" "),e("td",[a._v("true")])]),a._v(" "),e("tr",[e("td",[a._v("int,long")]),a._v(" "),e("td",[a._v("integer")]),a._v(" "),e("td",[a._v("1")])]),a._v(" "),e("tr",[e("td",[a._v("float,double")]),a._v(" "),e("td",[a._v("number")]),a._v(" "),e("td",[a._v("1.1")])]),a._v(" "),e("tr",[e("td",[a._v("bytes")]),a._v(" "),e("td",[a._v("string")]),a._v(" "),e("td",[a._v('"\\u00FF"')])]),a._v(" "),e("tr",[e("td",[a._v("string")]),a._v(" "),e("td",[a._v("string")]),a._v(" "),e("td",[a._v('"foo"')])]),a._v(" "),e("tr",[e("td",[a._v("record")]),a._v(" "),e("td",[a._v("object")]),a._v(" "),e("td",[a._v('{"a": 1}')])]),a._v(" "),e("tr",[e("td",[a._v("enum")]),a._v(" "),e("td",[a._v("string")]),a._v(" "),e("td",[a._v('"FOO"')])]),a._v(" "),e("tr",[e("td",[a._v("array")]),a._v(" "),e("td",[a._v("array")]),a._v(" "),e("td",[a._v("[1]")])]),a._v(" "),e("tr",[e("td",[a._v("map")]),a._v(" "),e("td",[a._v("object")]),a._v(" "),e("td",[a._v('{"a": 1}')])]),a._v(" "),e("tr",[e("td",[a._v("fixed")]),a._v(" "),e("td",[a._v("string")]),a._v(" "),e("td",[a._v('"\\u00ff"')])])])])]),a._v(" "),e("li",[e("p",[a._v('order: 指定此字段如何影响record的排序，有效的值包括"ascending" (默认), "descending", or "ignore".')])]),a._v(" "),e("li",[e("p",[a._v("aliases: 一个json数组，提供此记录的别名（可选）")])])])])]),a._v(" "),e("p",[a._v("例如一个64位的链表可以这样定义：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{\n  "type": "record",\n  "name": "LongList",\n  "aliases": ["LinkedLongs"],                      // old name for this\n  "fields" : [\n    {"name": "value", "type": "long"},             // each element has a long\n    {"name": "next", "type": ["null", "LongList"]} // optional next element\n  ]\n}\n')])])]),e("h4",{attrs:{id:"枚举"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#枚举"}},[a._v("$")]),a._v(" 枚举")]),a._v(" "),e("p",[a._v('枚举的类型名是"enum"，支持下面的属性：')]),a._v(" "),e("ul",[e("li",[a._v("name:一个json字符串定义了枚举的名字（必要）")]),a._v(" "),e("li",[e("em",[a._v("namespace")]),a._v(",一个json字符串，限定了name的命名空间")]),a._v(" "),e("li",[a._v("aliases: 一个json数组，提供此枚举的别名（可选）")]),a._v(" "),e("li",[a._v("doc: 一个json字符串，为用户提供文档信息（可选）")]),a._v(" "),e("li",[a._v("symbols: a JSON array, listing symbols, as JSON strings (required). All symbols in an enum must be unique; duplicates are prohibited. Every symbol must match the regular expression "),e("code",[a._v("[A-Za-z_][A-Za-z0-9_]*")]),a._v(" (the same requirement as for "),e("a",{attrs:{href:"https://avro.apache.org/docs/1.8.1/spec.html#names",target:"_blank",rel:"noopener noreferrer"}},[a._v("names"),e("OutboundLink")],1),a._v(").一个json数组，以json字符串形式列出所有的symbols（必要）。同一个枚举中的symbol必须唯一，每个symbol必须匹配正则表达式"),e("code",[a._v("[A-Za-z_][A-Za-z0-9_]*")]),a._v("。")])]),a._v(" "),e("p",[a._v("例如扑克牌可以这样定义：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{ "type": "enum",\n  "name": "Suit",\n  "symbols" : ["SPADES", "HEARTS", "DIAMONDS", "CLUBS"]\n}\n')])])]),e("h4",{attrs:{id:"数组"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数组"}},[a._v("$")]),a._v(" 数组")]),a._v(" "),e("p",[a._v('数组的类型名是"array"，只支持一个属性：')]),a._v(" "),e("ul",[e("li",[a._v("items: 元素的schema")])]),a._v(" "),e("p",[a._v("例如字符串数组声明如下：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{"type": "array", "items": "string"}\n')])])]),e("h4",{attrs:{id:"maps"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#maps"}},[a._v("$")]),a._v(" Maps")]),a._v(" "),e("p",[a._v('数组的类型名是"map"，只支持一个属性：')]),a._v(" "),e("ul",[e("li",[a._v("values: 值的schema")])]),a._v(" "),e("p",[a._v("map的key类型指定为字符串")]),a._v(" "),e("p",[a._v("例如，字符串到long的map：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{"type": "map", "values": "long"}\n')])])]),e("h4",{attrs:{id:"unions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#unions"}},[a._v("$")]),a._v(" Unions")]),a._v(" "),e("p",[a._v('union使用json数组来表示。例如["null", "string"]的类型要么是null，要么是string。')]),a._v(" "),e("p",[a._v("union类型field的默认值与union中第一个schema相对应。因此对于包含null的union通常是第一个，因为这样union的默认值通常是null。")]),a._v(" "),e("p",[a._v("除了record，fixed和enum，union类型只能包含一个同一种类型的schema。例如，不允许union里包含两个数组类型或者两个map类型，但是不同名字的可以。union不能包含其他union。")]),a._v(" "),e("h4",{attrs:{id:"fixed"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#fixed"}},[a._v("$")]),a._v(" Fixed")]),a._v(" "),e("p",[a._v('Fixed的类型名是"fixed"，支持两个属性：')]),a._v(" "),e("ul",[e("li",[a._v("name: fixed的名称（必要）")]),a._v(" "),e("li",[e("em",[a._v("namespace")]),a._v(",一个json字符串，限定了name的命名空间")]),a._v(" "),e("li",[a._v("aliases: 一个json数组，提供此枚举的别名（可选）")]),a._v(" "),e("li",[a._v("size:一个整型，指定了每个值的字节数（必要）")])]),a._v(" "),e("p",[a._v("例如，16位fixed这样定义：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{"type": "fixed", "size": 16, "name": "md5"}\n')])])])])}),[],!1,null,null,null);e.default=s.exports}}]);