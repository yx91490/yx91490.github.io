# 一个Spring URL匹配问题

众所周知Spring MVC的url路径中可以使用变量，比如一个`/foo/{bar}`可以映射一个路径`/foo/abc`，并且可以取出变量bar的值为abc。但是项目中一个`/foo/{bar}`路径却没有从实际url中取出正确的值来，抽象出来了的例子如下：

```
Controller Path : /foo/{bar}
URL: /foo/abc1.1
```

得到变量bar=abc1，而当把实际请求的URL变换一下：

```
URL: /foo/abc1.1/
```

才能得到正确的变量bar=abc1.1。

产生这样的原因是，实际上Spring会把`/foo/{bar}`转为三个模式：`/foo/{bar}`， `/foo/{bar}/`， `/foo/{bar}.*`，而最终的URL匹配到了`/foo/{bar}.*`模式，bar变量的值就只取到了abc1。
