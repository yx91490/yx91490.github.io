# avro格式规范1.8.1翻译

## Schema声明

schema有以下几种json格式：

- 一个已定义类型名的json字符串

- json对象：

  ```
  {"type": "typeName" ...attributes...}
  ```

  typeName是一个基本类型名或者派生类型名，本文档没有定义允许的属性。

- 一个json数组，表示一个内置类型的组合。

### 基本类型

基本类型名包括：

- null: 没有值
- boolean: 一个二进制的值
- int: 32位有符号整型
- long: 64位有符号整型
- 单精度IEEE754浮点型数字
- 双精度IEEE754浮点型数字
- bytes: 8位无符号字节序列
- string: unicode字符序列

基本类型没有特定的属性，基本类型名也是已定义的类型名。因此"string"也等同于：

```
{"type": "string"}
```

### 复杂类型

avro支持六种复杂类型：records, enums, arrays, maps, unions 以及 fixed.

#### records

records使用类型名"record"，支持下面几种属性：

- name:一个json字符串定义了记录的名字（必要）

- *namespace*,一个json字符串，限定了name的命名空间

- doc: 一个json字符串，为用户提供文档信息（可选）

- aliases: 一个json数组，提供此记录的别名（可选）

- 一个包含field列表的json数组（必需的），每个field是有下面属性的json对象：

  - name:一个json字符串定义了field的名字（必要）

  - doc: 一个json字符串，为用户描述了此field（可选）

  - type: 一个定义schema的json对象，或者一个已定义record的json字符串（必要）。

  - default:

     此field的默认值（可选），根据schema类型的不同允许的值也不同。union类型field的默认值与union中第一个schema相对应。bytes和fixed类型field的默认值是json字符串，Unicode 0-255代码点映射成无符号8位字节。

    | avro type    | json type | example  |
    | ------------ | --------- | -------- |
    | null         | null      | null     |
    | boolean      | boolean   | true     |
    | int,long     | integer   | 1        |
    | float,double | number    | 1.1      |
    | bytes        | string    | "\u00FF" |
    | string       | string    | "foo"    |
    | record       | object    | {"a": 1} |
    | enum         | string    | "FOO"    |
    | array        | array     | [1]      |
    | map          | object    | {"a": 1} |
    | fixed        | string    | "\u00ff" |

  - order: 指定此字段如何影响record的排序，有效的值包括"ascending" (默认), "descending", or "ignore".

  - aliases: 一个json数组，提供此记录的别名（可选）

例如一个64位的链表可以这样定义：

```
{
  "type": "record",
  "name": "LongList",
  "aliases": ["LinkedLongs"],                      // old name for this
  "fields" : [
    {"name": "value", "type": "long"},             // each element has a long
    {"name": "next", "type": ["null", "LongList"]} // optional next element
  ]
}
```

#### 枚举

枚举的类型名是"enum"，支持下面的属性：

- name:一个json字符串定义了枚举的名字（必要）
- *namespace*,一个json字符串，限定了name的命名空间
- aliases: 一个json数组，提供此枚举的别名（可选）
- doc: 一个json字符串，为用户提供文档信息（可选）
- symbols: a JSON array, listing symbols, as JSON strings (required). All symbols in an enum must be unique; duplicates are prohibited. Every symbol must match the regular expression ` [A-Za-z_][A-Za-z0-9_]*` (the same requirement as for [names](https://avro.apache.org/docs/1.8.1/spec.html#names)).一个json数组，以json字符串形式列出所有的symbols（必要）。同一个枚举中的symbol必须唯一，每个symbol必须匹配正则表达式` [A-Za-z_][A-Za-z0-9_]*`。

例如扑克牌可以这样定义：

```
{ "type": "enum",
  "name": "Suit",
  "symbols" : ["SPADES", "HEARTS", "DIAMONDS", "CLUBS"]
}
```

#### 数组

数组的类型名是"array"，只支持一个属性：

- items: 元素的schema

例如字符串数组声明如下：

```
{"type": "array", "items": "string"}
```

#### Maps

数组的类型名是"map"，只支持一个属性：

- values: 值的schema

map的key类型指定为字符串

例如，字符串到long的map：

```
{"type": "map", "values": "long"}
```

#### Unions

union使用json数组来表示。例如["null", "string"]的类型要么是null，要么是string。

union类型field的默认值与union中第一个schema相对应。因此对于包含null的union通常是第一个，因为这样union的默认值通常是null。

除了record，fixed和enum，union类型只能包含一个同一种类型的schema。例如，不允许union里包含两个数组类型或者两个map类型，但是不同名字的可以。union不能包含其他union。

#### Fixed

Fixed的类型名是"fixed"，支持两个属性：

- name: fixed的名称（必要）
- *namespace*,一个json字符串，限定了name的命名空间
- aliases: 一个json数组，提供此枚举的别名（可选）
- size:一个整型，指定了每个值的字节数（必要）

例如，16位fixed这样定义：

```
{"type": "fixed", "size": 16, "name": "md5"}
```

