# 《领域驱动设计》笔记

## 目录

### 第一部分 让领域模型发挥作用

#### 第1章 消化知识

1.1 有效建模的要素

1.2 知识消化

1.3 持续学习

1.4 知识丰富的设计

1.5 深层模型

#### 第2章 语言的交流和使用

2.1 模式：Ubiquitous Language

2.2 “大声地”建模

2.3 一个团队，一种语言

2.4 文档和图

2.5 解释性模型

#### 第3章 绑定模型和实现

3.1 模式：Model-Driven-Design

3.2 建模范式和工具支持

3.3 揭示主旨：为什么模型对用户至关重要？

3.4 模式：hands-on modeler

#### 第4章 分离领域

4.1 模式：Layered Architecture

4.2 模型属于领域层

4.3 模式：smart UI反模式

4.4 其他分离方式

#### 第5章 软件中所表示的模型

5.1关联

5.2模式：ENTITY

  5.2.1 Entity建模

  5.2.2 设计标识操作

5.3 模式：Value Object

  5.3.1 设计Value Object

  5.3.2 设计包含Value Object的关联

5.4 模式：Service

  5.4.1 Service与孤立的领域层

  5.4.2 粒度

  5.4.3 对Service的访问

5.5 模式：Module（也被称为package）

  5.5.1 敏捷的Module

  5.5.2 基础设施驱动的打包存在的隐患

5.6 建模范式

  5.6.1 对象范式流行的原因

  5.6.2 对象世界中的非对象

  5.6.3 在混合范式中坚持使用Model-Driven-Design

#### 第6章 领域对象的生命周期

6.1 模式：Aggregate

6.2 模式：Factory

  6.2.1 选择factory及其应用位置

  6.2.2 有些情况下只需使用构造函数

  6.2.3 接口的设计

  6.2.4 固定规则的逻辑应放置在哪里？

  6.2.5 Entity factory与value object factory

  6.2.6 重建已存储的对象

6.3 模式：Repository

  6.3.1 Repository的查询

  6.3.2 客户代码可以忽略Repository的实现，但开发人员不能忽略

  6.3.3 Repository的实现

  6.3.4 在框架内工作

  6.3.5 Repository与Factory的关系

6.4 模式：为关系数据库设计对象



## 第一部分

本书有两个前提：

1. 在大多数软件项目中，主要的焦点应该是领域和领域逻辑，

2. 复杂的领域设计应该基于模型，

领域驱动设计是一种思维方式，也是一组优先任务，它旨在加速那些必须处理复杂软件项目的开发，为了实现这个目标，本书给出了一整套完整的设计实践、技术和原则。

### 设计过程与开发过程

虽然本书并不局限于某一种特定的方法，但主要还是**面向敏捷开发过程**这一新体系。特别的本书假定项目必须遵循两个开发实践，想要应用书中所讲的方法，必须先了解这两个实践：

1. **迭代开发**。人们倡导和实践迭代开发已经有几十年时间了，而且它是敏捷开发方法的基础。
2. **开发人员与领域专家具有密切的关系**。**领域驱动设计的实质就是消化吸收大量知识，产生一个反应深层次领域知识并聚焦于关键概念的模型**。这是领域专家与开发人员的协作过程，领域专家精通领域知识，而开发人员知道如何构建软件。由于开发过程是迭代式的，因此这个过程必须贯穿整个项目的生命周期。

### 1.1 有效建模的要素

以下几方面因素是上述案例得以成功，

1. 模型和实现的绑定，最初的原型虽然简陋，但他在模型与实现之间建立了早期链接，而且在所有后续的迭代中，我们一直在维护该原型。

2. 获得了一种基于模型的语言。随着项目的进展，双方都能够直接使用模型中的术语，并将它们组织为符合模型结构的语句，而且无需翻译即可理解互相表达的意思。

3. 开发一个蕴含丰富知识的模型。对象具有行为和强制性规则，模型并不仅仅是一种数据模式，它还是解决复杂问题不可或缺的部分，模型包含各种类型的知识。

4. 提炼模型。在模型日趋完整的过程中，重要的概念不断被添加到模型中，不再使用或不重要的概念则从模型中删除。当一个不需要的概念与一个需要的概念关联时，则把重要的概念提取到一个新模型中，其他那些不要的概念就可以删去了。



## 第二章

将模型作为语言的中心，确保团队在所有交流活动中和代码中坚持使用这种语言，在画图写东西，特别是讲话时也要使用这种语言。

通过尝试不同的表示方法（他们反映了不同模型）来消除难点。然后重构代码，并对类、方法和模块重新命名，以便与新模型相一致。解决交谈中的术语混淆问题，就像我们对普通词汇形成一个公认的理解一样。

要认识到“通用语言”中的更改，就是对模型的更改。

领域专家应该避免使用拗口或无法表达领域理解的术语或结构，开发人员应该密切监视那些将会妨碍设计的有歧义和不一致的地方。

---

在面向对象的程序中，常常会在业务对象中直接写入用户界面，数据库访问等支持代码，而一些额外的业务逻辑则会被嵌入到用户界面组件和数据库脚本的行为中。这么做是为了以最简单的方式在短期内完成开发工作。

如果与领域有关的代码分散在大量的其他代码之中，那么查看和分析领域代码就会变得非常困难，**对用户界面的简单修改，实际上很可能会改变业务逻辑**，**而要想调整业务规则，也很有可能需要对用户界面代码，数据库操作代码或者其他的程序元素进行仔细的筛查。**这样就不太可能实现一致的、模型驱动的对象了，同时也会给自动化测试带来困难。程序中每一个活动都有其自身的逻辑和适用的技术，因此程序本身必须简单明了，否则就会让人无法理解。

要想创建出能够处理复杂任务的程序，需要把不同的关注点分开考虑，使设计中的每一个部分都能得到单独的关注。在分离的同时也需要维持系统内部复杂的交互关系。

分割软件系统有各种各样的方法，但是根据软件行业的经验和惯例，普遍采用分层架构，特别是有几个层基本上已成了标准层。分层这种隐喻被广泛采用。大多数开发人员都对其有着直观的认识。许多文献对分层架构也进行了充分的讨论，有些是以模式的形式给出的。**分层架构的基本原则是层中的任何元素都仅依赖于本层的其他元素，或者其下层的元素。**向上的通信必须通过间接的传递机制进行，这些将在后面讨论。

分层的价值在于每一层都只代表程序中的某一特定方面。这种限制使每个方面的设计都更具内聚性，更容易解释。当然要分离出内聚设计中最重要的方面，选择恰当的分层方式是至关重要的。在这里经验和惯例又一次为我们指明了方向，尽管分层架构的种类繁多，但是大多数成功的架构使用的都是包括下面这4个概念层的某个版本：