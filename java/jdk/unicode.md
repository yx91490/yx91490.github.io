# Unicode学习笔记

Unicode 将编码空间分成 17 个平面，以 0 到 16 编号：

|        平面         |     始末字符值      |         中文名称          |                   英文名称                   |
| :-----------------: | :-----------------: | :-----------------------: | :------------------------------------------: |
|       0号平面       |   U+0000 - U+FFFF   |      基本多文种平面       |      Basic Multilingual Plane，简称BMP       |
|       1号平面       |  U+10000 - U+1FFFF  |      多文种补充平面       |  Supplementary Multilingual Plane，简称SMP   |
|       2号平面       |  U+20000 - U+2FFFF  |     表意文字补充平面      |   Supplementary Ideographic Plane，简称SIP   |
|       3号平面       |  U+30000 - U+3FFFF  |     表意文字第三平面      |     Tertiary Ideographic Plane，简称TIP      |
| 4号平面 至 13号平面 |  U+40000 - U+DFFFF  |       （尚未使用）        |                                              |
|      14号平面       |  U+E0000 - U+EFFFF  |     特别用途补充平面      | Supplementary Special-purpose Plane，简称SSP |
|      15号平面       |  U+F0000 - U+FFFFF  | 保留作为私人使用区（A区） |        Private Use Area-A，简称PUA-A         |
|      16号平面       | U+100000 - U+10FFFF | 保留作为私人使用区（B区） |        Private Use Area-B，简称PUA-B         |

其中0号平面习惯上称作基本多文种平面，剩余的称作辅助平面。

Unicode包含1,114,112个码位（code point），基本多语言平面内从U+D800到U+DFFF之间的码位区段是永久保留不映射到Unicode字符，所以有效码位为1,112,064个。

### UTF-32

UTF-32是一种用于编码Unicode的协定，该协定使用32位比特对每个Unicode码位进行编码。

### UTF-16

UTF-16 用二个字节来表示基本平面，用四个字节来表示辅助平面：

|     16进制编码范围     |           UTF-16表示方法（二进制）            | 10进制码范围  | 字节数量 |
| :--------------------: | :-------------------------------------------: | :-----------: | :------: |
|  `U+0000` - `U+FFFF`   | `xxxx xxxx xxxx xxxx` - `yyyy yyyy yyyy yyyy` |    0-65535    |    2     |
| `U+10000` - `U+10FFFF` | `1101 10yy yyyy yyyy` - `1101 11xx xxxx xxxx` | 65536-1114111 |    4     |

辅助平面（`0x10000` - `0x10FFFF`）中的码位在UTF-16中被编码为一对16比特长的码元（即32位，4字节），称作代理对（Surrogate Pair），具体方法是：

1. 码位减去 0x10000，得到的值的范围为20比特长的 0...0xFFFFF。
2. 高位的10比特的值（值的范围为 0...0x3FF）被加上 0xD800 得到第一个码元或称作高位代理（high surrogate），值的范围是 0xD800...0xDBFF。
3. 低位的10比特的值（值的范围也是 0...0x3FF）被加上 0xDC00 得到第二个码元或称作低位代理（low surrogate），值的范围是 0xDC00...0xDFFF。

|                  | 十六进制表示范围       | 二进制表示范围                                         |
| ---------------- | ---------------------- | ------------------------------------------------------ |
| Unicode码值      | `0x10000` - `0x10FFFF` | 1 0000 0000 0000 0000 - 1 0000 1111 1111 1111 1111     |
| 减去 0x10000     | 0...0xFFFFF            | 0 -    1111 1111 1111 1111 1111                        |
| 高位的10比特的值 | 0...0x3FF              | 0 -                            11 1111 1111            |
| 低位的10比特的值 | 0...0x3FF              | 0 -                            11 1111 1111            |
| 高位代理         | 0xD800...0xDBFF        | 1101 1000 0000 0000 -              1101 1011 1111 1111 |
| 低位代理         | 0xDC00...0xDFFF        | 1101 1100 0000 0000 -              1101 1111 1111 1111 |

### UTF-8

| Code Point Segment                       | Encoding                         | 有效二进制位数 | count   |
| ---------------------------------------- | -------------------------------- | -------------- | ------- |
| 0x000000 - 0x00007F                      | 0xxxxxxx                         | 7              | 128     |
| 0x000080 - 0x0007FF                      | 110xxxxx10xxxxxx                 | 11             | 1920    |
| 0x000800 - 0x00D7FF, 0x00E000 - 0x00FFFF | 1110xxxx10xxxxxx10xxxxxx         | 16             | 61440   |
| 0x010000 - 0x10FFFF                      | 11110xxx10xxxxxx10xxxxxx10xxxxxx | 21             | 1048576 |

### 字节顺序标记（BOM）

将一个多位数的低位放在较小的地址处高位放在较大的地址处则称小端序（Little-Endian）；反之则称大端序（Big-Endian）。

字符U+FEFF用来标识该字节流的字节序是高位在前还是低位在前：

| UTF编码  | BOM         |
| -------- | ----------- |
| UTF-8    | EF BB BF    |
| UTF-16LE | FF FE       |
| UTF-16BE | FE FF       |
| UTF-32LE | FF FE 00 00 |
| UTF-32BE | 00 00 FE FF |

## 参考

[UTF-8](https://zh.wikipedia.org/wiki/UTF-8)

[UTF-16](https://zh.wikipedia.org/wiki/UTF-16)

[UTF-32](https://zh.wikipedia.org/wiki/UTF-32)

[Unicode字符平面映射](https://zh.wikipedia.org/zh-cn/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84)

[Unicode 与 utf8 utf16 utf32的关系](https://cloud.tencent.com/developer/article/1137611)

[Unicode 编码及 UTF-32, UTF-16 和 UTF-8](https://zhuanlan.zhihu.com/p/51202412)

