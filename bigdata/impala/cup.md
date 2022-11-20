# CUP学习笔记

## 简介

CUP是the  Java Based Constructor of Useful Parsers的简称。与YACC类似都是用来生成LALR Parser，用Java语言编写。

## 例子

举一个用来计算整数算数表达式的例子：从标准输入读取表达式（以分号结尾），求值并输出结果到标准输出。

CUP 规则：

```cup
// CUP specification for a simple expression evaluator (w/ actions)

import java_cup.runtime.*;

/* Preliminaries to set up and use the scanner.  */
init with {: scanner.init();              :};
scan with {: return scanner.next_token(); :};

/* Terminals (tokens returned by the scanner). */
terminal           SEMI, PLUS, MINUS, TIMES, DIVIDE, MOD;
terminal           UMINUS, LPAREN, RPAREN;
terminal Integer   NUMBER;

/* Non-terminals */
non terminal            expr_list, expr_part;
non terminal Integer    expr;

/* Precedences */
precedence left PLUS, MINUS;
precedence left TIMES, DIVIDE, MOD;
precedence left UMINUS;

/* The grammar */
expr_list ::= expr_list expr_part 
	      | 
              expr_part;

expr_part ::= expr:e 
	      {: System.out.println("= " + e); :} 
              SEMI              
	      ;

expr      ::= expr:e1 PLUS expr:e2    
	      {: RESULT = new Integer(e1.intValue() + e2.intValue()); :} 
	      | 
              expr:e1 MINUS expr:e2    
              {: RESULT = new Integer(e1.intValue() - e2.intValue()); :} 
	      | 
              expr:e1 TIMES expr:e2 
	      {: RESULT = new Integer(e1.intValue() * e2.intValue()); :} 
	      | 
              expr:e1 DIVIDE expr:e2 
	      {: RESULT = new Integer(e1.intValue() / e2.intValue()); :} 
	      | 
              expr:e1 MOD expr:e2 
	      {: RESULT = new Integer(e1.intValue() % e2.intValue()); :} 
	      | 
              NUMBER:n                 
	      {: RESULT = n; :} 
	      | 
              MINUS expr:e             
	      {: RESULT = new Integer(0 - e.intValue()); :} 
	      %prec UMINUS
	      | 
              LPAREN expr:e RPAREN     
	      {: RESULT = e; :} 
	      ;
```

主要包含了四个部分内容：

1. 第一部分引入了java_cup.runtime类，提供了一些初始化代码，以及一些用来调用scanner获取下一个输入token的代码。

2. 第二部分声明了terminal和 non-terminal，和他们相关的class。在本例子中，terminals要么声明为无类型的，要么是Integer类型。如果没有指定类型，terminal 和 non-terminal就没有值。

3. 第三部分声明了terminals的优先级和结合性。最后声明的terminal优先级最高。

4. 第四部分是语法。

尽管上面的规则能构建一个完整的parser，但不会执行任何语义动作，仅仅会指示解析的成功或者失败。为了计算表达式的值，必须将java代码内置到parser中去。在CUP中，代码的字符串被`{:` 和`:}`分隔符包围。

通过下面命令生成parser：

```
 java -jar java-cup-11b.jar parser.cup
```

默认会生成两个文件：`sym.java` 和 `parser.java`。其中sym类包含一系列常量声明，每个terminal符号一个。

production：

```
  expr:e1 PLUS expr:e2    
	{: RESULT = new Integer(e1.intValue() + e2.intValue()); :} 
```

每个符号运行时都被一个Symbol对象代表。e1，e2两个label都指向了Integer对象，RESULT也声明为Integer类型。

对于每个label，还有其他两个变量：`${label}left`和`${label}right`，分别代表了对应符号的左边和右边。

创建一个可行的parser的最后一步是创建scanner（或者称为*lexical analyzer* 或简称 *lexer*）。此过程负责读入每个字符，移除空白和注释等，识别每一组字符代表的terminal符号，然后给Parser返回代表这些符号的java_cup.runtime.Symbol对象。

## 语法

### 保留字

- action
- code
- import
- init
- left
- non
- nonassoc
- nonterminal
- package
- parser
- precedence
- right
- scan
- start
- terminal
- with

### package和import

可选的包声明（类似Java）：

```
package name;
```

可选的import声明：

```
import package_name.class_name;
import package_name.*;
```

默认生成的parser类名为`parser`，符号类名为`sym`。如果定义了parser类名：

```
 class name;
```

则符号类名变为`${parserName}Sym`。

### 用户代码

action代码声明：

```
action code {: ... :};
```

parser代码声明（用来定制parser）：

```
parser code {: ... :};
```

init声明（会在parser请求token之前执行，通常用来初始化scanner和其他语义动作需要的数据结构。）：

```
init with {: ... :};
```

scan with声明：

```
scan with {: ... :};
```

返回`java_cup.runtime.Symbol`类型的对象。

action code, parser code, init code, 和 scan with部分可以任意顺序，但是必须在symbol 列表之前。

### Symbol列表

必选的symbol列表声明：

```
terminal classname name1, name2, ...;
non terminal classname name1, name2, ...;

terminal name1, name2, ...;
non terminal name1, name2, ...;
```

`classname`表示`terminal`或`non-terminal`值的类型。

如果没有指定`classname`，则`terminal`或`non-terminal`不存储值，对应的label的值为`null`。

`nonterminal`等价于`non terminal`。

### 优先级和结合性声明

有三种类型的优先级和结合性声明：

```
precedence left     terminal[, terminal...];
precedence right    terminal[, terminal...];
precedence nonassoc terminal[, terminal...];
```

按照声明的从上到下顺序，优先级从低到高。

没有声明的terminal优先级最低。

production的优先级等同于production中最后一个terminal的优先级。如果没有terminal，则是最低优先级。

优先级用来解决移动（shift）和消除（reduce）冲突的问题。例如表达式：`3 + 4 * 8`，是先消除`3+4`,还是移动`*`到栈上。

如果terminal优先级高，则将它移动到栈上。如果productoin优先级高，则消除它。如果他们优先级一样，由terminal的结合性决定决定下一步的动作。

如果可被shift的terminal结合性声明为left，则会执行reduce。如果结合性声明为right，则它会被shift到栈上。如果结合性声明为nonassoc，连续的同样优先级的非结合的terminal会产生报错。

### Grammar

可选的start with声明，指明了解析的入口：

```
start with non-terminal;
```

如果没有显式声明，则会使用第一个production的non-terminal作为入口。

grammar中的每个production左边是是non-terminal，接着是`::=`，一系列的action，terminal，或者non-terminal符号，上下文相关的优先级赋值，最终是一个`；`。

### Label和Location

terminal和non-terminal中右侧的符号可以赋一个label，label名在符号名的后面以`:`分隔。

label名在production中是唯一的，可以用在action code中用来引用符号的值。

一个non-terminal 可以由多个production组成，中间按`|`分隔。

### User Actions

在`{:` 和 `:}`中的java代码。

### Contextual precedence

可以给production重新赋优先级。例如：

```
precedence left PLUS, MINUS;
precedence left TIMES, DIVIDE, MOD;
precedence left UMINUS;

expr ::=  MINUS expr:e             
        {: RESULT = new Integer(0 - e.intValue()); :} 
        %prec UMINUS
```

production的优先级默认是其中最后一个terminal的优先级，而这里则声明为UMINUS的优先级。

## 运行CUP

### 命令行接口

从命令行执行cup，输入规则文件，输出parser和symbol类的源码：

```
java -jar java-cup-11b.jar options  inputfile
```

options：

| option                                                       | 默认值 | 功能                                                         |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| `-package` *name*                                            | 空     | 生成的源码类的包名                                           |
| `-parser` *name*                                             | parser | parser和action code的源码文件名                              |
| `-symbols` *name*                                            | sym    | 生成的符号常量类名                                           |
| -interface                                                   |        | 生成符号常量为一个接口而不是类                               |
| -nonterms                                                    |        | 把non-terminals的常量也放入符号常量类中。parser不需要这些常量，但是调试一个parser的时候很有帮助。 |
| `-expect` *number*                                           |        | 为了自动解决shift/reduce或reduce/reduce冲突，由参数指定期望的冲突个数。 |
| -compact_red                                                 |        | 启用关于reduction的table压缩优化                             |
| -nowarn                                                      |        | 禁止所有警告信息                                             |
| -nosummary                                                   |        | 禁止运行后打印关于terminals, non-terminals数量，解析状态的摘要信息 |
| -progress                                                    |        | 在parser生成过程中打印简短的信息                             |
| -dump_grammar<br />-dump_states<br />-dump_tables<br />-dump |        | 导出可读的dump信息。                                         |
| -time                                                        |        | 在summary中增加详细的时间统计。                              |
| -debug                                                       |        | 在运行的时候生成冗长的中间调试信息                           |
| -nopositions                                                 |        | 如果parser没有使用到left和right的值，则省略掉运行时的计算    |
| -locations                                                   |        | 生成xleft/xright的方法，可用于访问符号开始结束位置。         |
| -xmlactions                                                  |        | 为所有symbol生成XMLElement-objects                           |
| -genericlabels                                               |        | 生成完整parse tree作为XMLElement-tree                        |
| -noscanner                                                   |        | 0.10j引入了一个新接口：  `java_cup.runtime.Scanner`，此选型抑制该引用并兼容旧runtime。 |
| -version                                                     |        | 打印版本信息                                                 |


## 参考

[CUP User's Manual v0.11b](http://www2.cs.tum.edu/projects/cup/docs.php)
