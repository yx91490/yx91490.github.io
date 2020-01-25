# arguments和parameter的区别

转自：[HTTP://WWW.BLOGJAVA.NET/FLYSKY19/ARTICLES/89963.HTML](http://www.blogjava.net/FLYSKY19/ARTICLES/89963.HTML)

看《TIJ》时老看到“引数”这个词，觉得怪别扭的，但一直没去查引数和参数有何区别，先查资料终于明白了： 
一般说来，两个是可以互换的。但是 C 程序员的习惯是：parameter 是参数，而 argument 是参数的值。也就是说，函数原型的参数列表，是 parameter list，比如

```
int sum(int a, int b);
```

而当使用的时候10 和 20 则是 argument：

```
int sum;
sum = sum(10, 20);
```

这个习惯也影响了很多其他语言的程序员。如果要混合两者的意义，一般用 argument，而 parameter 则比较少用。 
argument 有的时候也被称作 actual parameter。对应的中文术语是

```
parameter = 形参 (估计是「形式参数」简称)
argument = 实参 (估计是「实际参数」简称) 
```

argument和parameter是有区别的，过去的资料中统一翻译为参数是不准确的，前者翻译成引数，后者翻译成参数，这样的翻译才是精确的翻译，两者的区别如下文：

```
What is the difference between an argument and a parameter?
While defining method, variables passed in the method are called parameters. 
While using those methods, values passed to those variables are called arguments. 
```

引数和参数有何区别？ 
当定义方法时，传递到方法中的变量称为参数. 
当使用方法时，传给变量的值称为引数.