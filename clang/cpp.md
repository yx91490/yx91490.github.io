# C++学习笔记

## 语言特性

- 虚函数（virtual function）
- 运算符重载（operator overloading）
- 多继承（multiple inheritance）
- 标准模板库（standard template library, STL）
- 异常处理（exception）
- 运行时类型信息（runtime type information）
- 名字空间（namespace）

变量声明vs变量定义

冒号作用：

1. 结构体内位域
2. 构造函数后面的冒号起分割作用，是类给成员变量赋值的方法，初始化列表
3. public:和private:后面的冒号，表示后面定义的所有成员都是公有或私有的
4. 类名冒号后面的是用来定义类的继承。
5. 语句标签，通常跟goto配合使用
6. switch语句中case后。
7. 汇编指令模板

双冒号（::）用法：

1. 表示“域操作符”
2. 表示是全局函数
3. 表示引用成员函数及变量，作用域成员运算符

## 国际标准

参考维基百科：[C++](https://zh.wikipedia.org/wiki/C%2B%2B)。

| 发布时间 |                             文档                             |                             通称                             |            备注            |
| :------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------------------------: |
|   2020   | ISO/IEC 14882:2020[[5\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-cpp20-5) |       [C++20](https://zh.wikipedia.org/wiki/C%2B%2B20)       |                            |
|   2018   | ISO/IEC TS 21544:2018[[6\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-6) |                          modules TS                          |            模块            |
|   2018   | ISO/IEC TS 19570:2018[[7\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-7) |                        parallelism TS                        |          并行扩展          |
|   2018   | ISO/IEC TS 19216:2018[[8\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-8) |                        networking TS                         |           网络库           |
|   2017   | ISO/IEC 14882:2017[[9\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-9) |       [C++17](https://zh.wikipedia.org/wiki/C%2B%2B17)       |       第五个C++标准        |
|   2017   | ISO/IEC TS 22277:2017[[10\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-10) |                        coroutines TS                         |         协程库扩展         |
|   2017   | ISO/IEC TS 21425:2017[[11\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-11) |                          ranges TS                           |        提供范围机制        |
|   2017   | ISO/IEC TS 19568:2017[[12\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-12) |                   library fundamentals TS                    |         标准库扩展         |
|   2016   | ISO/IEC TS 19571:2016[[13\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-13) |                        concurrency TS                        |     用于并发计算的扩展     |
|   2015   | ISO/IEC TS 19217:2015[[14\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-14) |                         concepts TS                          | 概念库，用于优化编译期信息 |
|   2015   | ISO/IEC TS 19841:2015[[15\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-15) |                            TM TS                             |       事务性内存操作       |
|   2015   | ISO/IEC TS 19570:2015[[16\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-16) |                        parallelism TS                        |     用于并行计算的扩展     |
|   2015   | ISO/IEC TS 18822:2015[[17\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-17) |                        filesystem TS                         |          文件系统          |
|   2014   | ISO/IEC 14882:2014[[18\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-18) |       [C++14](https://zh.wikipedia.org/wiki/C%2B%2B14)       |       第四个C++标准        |
|   2011   | ISO/IEC TR 24733:2011[[19\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-19) |                              -                               |      十进制浮点数扩展      |
|   2011   | ISO/IEC 14882:2011[[20\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-20) |       [C++11](https://zh.wikipedia.org/wiki/C%2B%2B11)       |       第三个C++标准        |
|   2010   | ISO/IEC TR 29124:2010[[21\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-21) |                              -                               |        数学函数扩展        |
|   2007   | ISO/IEC TR 19768:2007[[22\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-22) | [C++TR1](https://zh.wikipedia.org/wiki/C%2B%2B_Technical_Report_1) |    C++技术报告：库扩展     |
|   2006   | ISO/IEC TR 18015:2006[[23\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-23) |                              -                               |      C++性能技术报告       |
|   2003   | ISO/IEC 14882:2003[[24\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-24) |                            C++03                             |       第二个C++标准        |
|   1998   | ISO/IEC 14882:1998[[25\]](https://zh.wikipedia.org/wiki/C%2B%2B#cite_note-25) |                            C++98                             |       第一个C++标准        |

前置声明

内联函数

symbols

避免多重包含

那么Java中的“引用”倒是和C/C++的指针更像一些，和C++的“引用”很不一样。

C++的引用就语义上说是“别名”【本质是个const指针，又叫指针常量】，



https://blog.csdn.net/WaitForFree/article/details/51030013







================

## 语法

### const

用于定义常量。

默认状态下，const对象仅在文件内有效，

在一个文件中定义const，在其他多个文件中声明并使用：对应const变量的声明和定义都添加extern关键字：

```cpp
// file.cc
extern const int buffSize = 10;
// file.h
extern const int buffSize;
```

#### const的引用

对常量的引用：

```cpp
const int cnt = 1000;
const int &ref = cnt;
```

允许用任意表达式初始化常量引用（允许一个常量引用绑定非常量的对象、字面量）：

```cpp
int i = 10;
const int &r1 = i * 2;
```

常量引用仅限定对引用可参与的操作。

```cpp
int i = 10;
int &r1 = i;
const int &r2 = i;
r1 = 0;
// 不能通过r2修改i的值
// r2 = 0;
```

#### 指针和const

指向常量的指针（pointer to const）：

```cpp
const double pi = 3.14;
const double *cptr1 = & pi;
```

允许指向常量的指针指向非常量：

```cpp
double dval = 3.14;
const double *cptr2 = &dval;
```

常量指针（const pointer）：指针本身是常量：

```cpp
int errNum = 0;
// 常量指针必须初始化
int *const curErr = &errNum;
// 可以通过常量指针修改所指对象的值
*curErr = 1;
```

### 模板

Java泛型和C++模板还有如下很多不同点;

1. C++模板可以使用int等基本数据类型。Java则不行，必须转而使用Integer

2. Java中，可以将模板的类型参数限定为某种特定类型。例如，你可能会使用泛型实现CardDeck，并规定参数必须扩展自CardGame。

3. C++中，类型参数可以实例化，Java不可以实例化

4. Java中，类型参数（即MyClass<Foo>中的Foo）不能用于静态方法和变量，因为他们会被MyClass<Foo>和MyClass<Bar>共享。但在C++中，这些类是不同的，类型参数可以用于静态方法和静态变量。

5. 在Java中，不管类型参数是什么，MyClass的所有实例都是同一类型。类型参数会在运行时被抹去。而C++中，参数类型不同，实例类型也不同

参考：[C++“模板”和Java“泛型”](https://blog.csdn.net/qq1623803207/article/details/79128928)

### RAII

https://www.apiref.com/cpp-zh/cpp/language/raii.html

### Cast

