# Make学习笔记

## Makefile文件格式

### 规则（rule）

Makefile文件由一系列规则（`rules`）构成。每条规则的形式如下：

 ```bash
 <target> : <prerequisites> 
 [tab]  <commands>
 ```

"目标"（`target`）是必需的，不可省略；

"前置条件"（`prerequisites`）和"命令"（`commands`）都是可选的，但是两者之中必须至少存在一个。

每条规则就明确两件事：构建目标的前置条件是什么，以及如何构建。下面就详细讲解，每条规则的这三个组成部分。

#### 目标（target）

目标可以是一个文件名，也可以是空格分隔的多个文件名，还可以是某个操作的名字，这称为"伪目标"（`phony target`）。

为了避免操作名和文件名冲突，可以明确声明clean是"伪目标"：

```makefile
.PHONY: clean
clean:
        rm *.o temp
```

#### 前置条件（prerequisites）

前置条件通常是空格分隔的多个文件名。

只要有一个前置文件不存在，或者有过更新（前置文件的last-modification时间戳比目标的时间戳新），`target` 就需要重新构建。

#### 命令（commands）

命令（`commands`）表示如何更新目标文件，由一行或多行的Shell命令组成。

需要注意的是，每行命令在一个单独的shell中执行，这些Shell之间没有依赖关系。如果想要实现命令直接的依赖，可以采用下面的方式：

```makefile
# 用分号分隔，写在一行
t1:
    export foo=bar; echo "foo=[$$foo]"

# 在换行符前加反斜杠转义
t2:
    export foo=bar; \
    echo "foo=[$$foo]"

# 加 ONESHELL 命令
.ONESHELL:
t3:
    export foo=bar; 
    echo "foo=[$$foo]"
```

### 注释

井号在Makefile中表示注释。

### 回声

正常情况下，make会打印每条命令，然后再执行。在命令的前面加上@，就可以关闭回声。

### 通配符

通配符（wildcard）用来指定一组符合条件的文件名。Makefile 的通配符与 Bash 一致，主要有星号（*）、问号（？）和 [...] 。

参考：[命令行通配符教程](https://www.ruanyifeng.com/blog/2018/09/bash-wildcards.html)。

### 模式匹配

```
%.o: %.c
```

等同于下面的写法：

```
f1.o: f1.c
f2.o: f2.c
```

### 变量

#### 内置变量

```makefile
output:
    $(CC) -o output input.c
```

清单：[10.3 Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html)。

#### 自动变量

| 自动变量 | 说明                                           |
| -------- | ---------------------------------------------- |
| $@       | 指代当前目标                                   |
| $<       | 指代第一个前置条件                             |
| $?       | 指代比目标更新的所有前置条件，之间以空格分隔。 |
| $^       | 指代所有前置条件，之间以空格分隔。             |
| $*       | 指代匹配符 % 匹配的部分                        |
| $(@D)    | $@ 的目录名                                    |
| $(@F)    | $@ 的文件名                                    |
| $(<D)    | $< 的目录名                                    |
| $(<F)    | $< 的文件名                                    |

清单：[10.5.3 Automatic Variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)

#### 自定义变量

```makefile
# 在执行时扩展，允许递归扩展。
VARIABLE = value

# 在定义时扩展。
VARIABLE := value

# 只有在该变量为空时才设置值。
VARIABLE ?= value

# 将值追加到变量的尾端。
VARIABLE += value

txt = Hello World
test:
    @echo $(txt)
```

`$`需要转义：

```makefile
test:
    @echo $$HOME
```

### 条件

条件的语法：

```makefile
conditional-directive
  text
else conditional-directive
  text
else
  text
endif
```

指令行的开头允许有多余的空格，但不允许有多余的制表符。

指令行的行尾可以有多余的空格和制表符，以及`#`开头的注释。

在指令中不能使用自动变量。

`ifeq`/`ifneq`条件指令会展开arg1和arg2中的所有变量引用并比较它们是否相等/不等，有如下几种形式：

```makefile
ifeq (arg1, arg2)
ifeq 'arg1' 'arg2'
ifeq "arg1" "arg2"
ifeq "arg1" 'arg2'
ifeq 'arg1' "arg2"

ifneq (arg1, arg2)
ifneq 'arg1' 'arg2'
ifneq "arg1" "arg2"
ifneq "arg1" 'arg2'
ifneq 'arg1' "arg2"
```

可以使用`strip`函数避免空白符号被认为非空：

```makefile
ifeq ($(strip $(foo)),)
text-if-empty
endif
```

`ifdef`/`ifndef`条件指令检验变量值是否非空（未定义）/为空（已定义）：

```makefile
ifdef variable-name
ifndef variable-name
```

`variable-name`可以扩展为一个变量或者函数，但不会检验扩展后的变量是否非空/为空。

### 函数

格式如下：

```makefile
$(function argument1,argument2,argument3...)
# 或者
${function argument1,argument2,argument3...}
```

#### 文本函数

```
$(subst from,to,text)
$(var:pattern=replacement)
$(patsubst pattern,replacement,text)
$(strip string)
$(findstring find,in)
$(filter pattern…,text)
$(filter-out pattern…,text)
$(sort list)
$(word n,text)
$(wordlist s,e,text)
$(words text)
$(firstword names…)
$(lastword names…)
```

#### 文件名函数

```
$(dir names…)
$(notdir names…)
$(suffix names…)
$(basename names…)
$(addsuffix suffix,names…)
$(addprefix prefix,names…)
$(join list1,list2)
$(wildcard pattern)
$(realpath names…)
$(abspath names…)
```

#### 条件函数

```
$(if condition,then-part[,else-part])
$(or condition1[,condition2[,condition3…]])
$(and condition1[,condition2[,condition3…]])
```

#### foreach函数

```
$(foreach var,list,text)
```

#### 文件函数

```
$(file op filename[,text])
```

#### call函数

```
$(call variable,param,param,…)
```

#### value函数

```
$(value variable)
```

#### eval函数

#### origin函数

```
$(origin variable)
```

#### flaver函数

```
$(flavor variable)
```

#### 控制函数

```
$(error text…)
$(warning text…)
$(info text…)
```

#### shell函数

```
$(shell arg1 arg2...)
```

#### guile函数

## 参考

[GNU make](https://www.gnu.org/software/make/manual/make.html)

[Make 命令教程](https://www.ruanyifeng.com/blog/2015/02/make.html)

[GNU make/Makefile 简明实用教程](https://literaryno4.github.io/makefile_tutorial.html/)