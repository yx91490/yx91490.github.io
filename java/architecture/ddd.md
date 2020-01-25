领域与有界上下文

模块对应package路径

类应该对应于有界上下文里面的领域模型名称

值对象和实体，有唯一标识的是实体，否则就是值对象



1. 领域设计= 边界 + 设计。
2. 有界上下文 = 用户 + 领域模型 + 功能。
3. 领域模型=实体+逻辑规则+逻辑流程

六边形架构的意图



一、领域和子域（Domain/Subdomain）
二、限界上下文（Bounded Context）
三、架构风格（Architecture）
四、 
五、行为饱满的领域对象
六、实体vs值对象（Entity vs Value Object）
七、聚合（Aggregate）
八、领域服务（Domain Service）
九、资源库（Repository）
十、领域事件（Domain Event）

- [领域驱动设计(DDD)](https://www.cnblogs.com/Leo_wl/p/3866629.html)



### 框架和设计模式的区别

有很多程序员往往把框架模式和设计模式混淆，认为MVC是一种设计模式。实际上它们完全是不同的概念。 [7] 

框架、设计模式这两个概念总容易被混淆，其实它们之间还是有区别的。框架通常是代码重用，而设计模式是设计重用，架构则介于两者之间，部分代码重用，部分设计重用，有时分析也可重用。在软件生产中有三种级别的重用：内部重用，即在同一应用中能公共使用的抽象块;代码重用，即将通用模块组合成库或工具集，以便在多个应用和领域都能使用；应用框架的重用，即为专用领域提供通用的或现成的基础结构，以获得最高级别的重用性。

框架与设计模式虽然相似，但却有着根本的不同。设计模式是对在某种环境中反复出现的问题以及解决该问题的方案的描述，它比框架更抽象；框架可以用代码表示，也能直接执行或复用，而对模式而言只有实例才能用代码表示;设计模式是比框架更小的元素，一个框架中往往含有一个或多个设计模式，框架总是针对某一特定应用领域，但同一模式却可适用于各种应用。可以说，框架是软件，而设计模式是软件的知识。

框架模式有哪些？

MVC、MTV、[MVP](https://baike.baidu.com/item/MVP/3714550)、CBD、[ORM](https://baike.baidu.com/item/ORM)等等；

MVC指MVC模式的某种框架，它强制性的使应用程序的输入、处理和[输出](https://baike.baidu.com/item/输出)分开。使用MVC应用程序被分成三个核心部件：模型、[视图](https://baike.baidu.com/item/视图)、控制器。它们各自处理自己的任务。最典型的MVC就是JSP + [servlet](https://baike.baidu.com/item/servlet) + [javabean](https://baike.baidu.com/item/javabean)的模式。

框架有哪些？

[C++](https://baike.baidu.com/item/C%2B%2B)语言的QT、MFC、gtk，Java语言的[SSH](https://baike.baidu.com/item/SSH) 、[**SSI**](https://baike.baidu.com/item/SSI)，[php](https://baike.baidu.com/item/php)语言的 smarty(MVC模式)，[python](https://baike.baidu.com/item/python)语言的django(MTV模式)等等

设计模式有哪些？

[工厂模式](https://baike.baidu.com/item/工厂模式)、适配器模式、策略模式等等

简而言之：框架是大智慧，用来对软件设计进行分工；设计模式是小技巧，对具体问题提出解决方案，以提高代码复用率，降低耦合度。

#### 参考

- [MVC框架](https://baike.baidu.com/item/MVC%E6%A1%86%E6%9E%B6/9241230)

# 从头来

## 是什么

分层架构，端口适配器模式

实体 VS 值对象

po vo dto

repository



## 为什么





## 怎么做