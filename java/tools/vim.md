# Vim的那些事

### 三种操作模式

Vim编辑程序有三种操作模式，分别称为 **编辑模式**、**插入模式** 和 **命令模式**。

### 编辑模式

当运行Vim时，首先进入编辑模式：

#### 移动光标

```
<ctrl-o>, <ctrl-i>          将光标移动到上次位置
k                           上移
j                           下移
h                           左移
l                           右移

gg                          将光标定位到文件第一行起始位置
G                           将光标定位到文件最后一行起始位置
NG或Ngg                     将光标定位到第 N 行的起始位置

H                           将光标移动到屏幕的顶部
M                           将光标移动到屏幕的中部
L                           将光标移动到屏幕的底部
zt                          将光标所在行移动窗口的顶端
zz                          将光标所在行移动窗口的中间
zb                          将光标所在行移动窗口的底端
nzt                         将第n行滚至屏幕顶部
nzb                         将第n行滚至屏幕底部
nzz                         将第n行滚至屏幕中部

w                           右移光标到下一个字的开头
e                           右移光标到下一个字的末尾
b                           左移光标到前一个字的开头
0                           数字０，左移光标到本行的开始
$                           右移光标，到本行的末尾
^                           移动光标，到本行的第一个非空字符。

(                           按句子向前移动光标
)                           按句子向后移动光标
{                           按段落向前移动光标
}                           按段落向后移动光标
```

#### 删除文本

| 命令   | 功能                                              |
| :----- | :------------------------------------------------ |
| d0     | 从行首删除                                        |
| d^     | 从该行第1个字符（不包括前导空格和制表符）开始删除 |
| dw     | 删除到字的末尾                                    |
| d3w    | 删除到第3个字的末尾                               |
| dW     | 删除到空白分隔符的末尾                            |
| db     | 从字的首字符开始删除                              |
| dB     | 从空白分隔符的末尾开始删除                        |
| d3B    | 从前面的第3个空白分隔字的首字符开始删除           |
| d)     | 删除至句子的结尾                                  |
| d4)    | 删除到第4个句子的结尾                             |
| d(     | 从句首开始删除                                    |
| d}     | 删除到段落末尾                                    |
| d{     | 从段首开始删除                                    |
| d7{    | 从前面第7段开始删除                               |
| d/text | 一直删除到text单词的下一次出现处                  |
| dfc    | 在当前行删除到c的下一次出现处（包括c）            |
| dtc    | 在删除到当前行c的下一次出现处                     |
| D      | 删除到行尾                                        |
| d$     | 删除到行尾                                        |
| 5dd    | 删除从当前行开始的5行                             |
| dL     | 删除到屏幕的最后一行                              |
| dH     | 从屏幕的第1行开始删除                             |
| dG     | 删除到工作缓冲区的末尾                            |
| d1G    | 从工作缓冲区的起始处开始删除                      |

#### 搜索

```
/str1                       正向搜索字符串 str1
n                           继续搜索，找出 str1 字符串下次出现的位置
N                           继续搜索，找出 str1 字符串上一次出现的位置
?str2                       反向搜索字符串 str2
```

#### 复制粘贴

```
yy                          复制当前行到内存缓冲区
nyy                         复制 n 行内容到内存缓冲区
p                           小写字母 p，将缓冲区的内容粘贴到光标的后面
P                           大写字母 P，将缓冲区的内容粘贴到光标的前面
```

#### 撤销

```
u                           撤消前一条命令的结果
ctrl+r                      重做
```

### 插入模式

在编辑模式下正确定位光标之后，可用以下命令切换到插入模式：

```
i                           在光标左侧插入正文
a                           在光标右侧插入正文
o                           在光标所在行的下一行增添新行
O                           在光标所在行的上一行增添新行
```

按 `ESC` 键退出插入模式，进入编辑模式。

### 命令模式

在编辑模式下键入 `:` 进入命令模式：

#### 保存退出

```
:w                          保存
:w {new_file}               另存为
:<start>,<end> w {file}     把一段内容另存
:x                          保存并退出,或者:wq
```

#### 查找替换

- `%` 表示替换范围是所有行，即全文
- 命令末尾加`g` 表示对每行中的每一次匹配都替换

```
:%s/str1/str2/              用字符串 str2 替换行中首次出现的字符串 str1
:s/str1/str2/g              用字符串 str2 替换行中所有出现的字符串 str1
:.,$ s/str1/str2/g          用字符串 str2 替换正文当前行到末尾所有出现的字符串 str1
:1,$ s/str1/str2/g          用字符串 str2 替换正文中所有出现的字符串 str1
:m,ns/str1/str2/g           将从m行到n行的str1替换成str2
```

#### shell切换

```
:!shell_command             执行完 shell_command 后回到Vim
```

#### 文件编码

查看文件编码：

```
:set fileencoding
```

文件编码转换：

```
:set fileencoding=utf-8
```
