(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{515:function(e,t,r){"use strict";r.r(t);var a=r(10),n=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("领域与有界上下文")]),e._v(" "),t("p",[e._v("模块对应package路径")]),e._v(" "),t("p",[e._v("类应该对应于有界上下文里面的领域模型名称")]),e._v(" "),t("p",[e._v("值对象和实体，有唯一标识的是实体，否则就是值对象")]),e._v(" "),t("ol",[t("li",[e._v("领域设计= 边界 + 设计。")]),e._v(" "),t("li",[e._v("有界上下文 = 用户 + 领域模型 + 功能。")]),e._v(" "),t("li",[e._v("领域模型=实体+逻辑规则+逻辑流程")])]),e._v(" "),t("p",[e._v("六边形架构的意图")]),e._v(" "),t("p",[e._v("一、领域和子域（Domain/Subdomain）\n二、限界上下文（Bounded Context）\n三、架构风格（Architecture）\n四、\n五、行为饱满的领域对象\n六、实体vs值对象（Entity vs Value Object）\n七、聚合（Aggregate）\n八、领域服务（Domain Service）\n九、资源库（Repository）\n十、领域事件（Domain Event）")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://www.cnblogs.com/Leo_wl/p/3866629.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("领域驱动设计(DDD)"),t("OutboundLink")],1)])]),e._v(" "),t("h3",{attrs:{id:"框架和设计模式的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#框架和设计模式的区别"}},[e._v("$")]),e._v(" 框架和设计模式的区别")]),e._v(" "),t("p",[e._v("有很多程序员往往把框架模式和设计模式混淆，认为MVC是一种设计模式。实际上它们完全是不同的概念。 [7]")]),e._v(" "),t("p",[e._v("框架、设计模式这两个概念总容易被混淆，其实它们之间还是有区别的。框架通常是代码重用，而设计模式是设计重用，架构则介于两者之间，部分代码重用，部分设计重用，有时分析也可重用。在软件生产中有三种级别的重用：内部重用，即在同一应用中能公共使用的抽象块;代码重用，即将通用模块组合成库或工具集，以便在多个应用和领域都能使用；应用框架的重用，即为专用领域提供通用的或现成的基础结构，以获得最高级别的重用性。")]),e._v(" "),t("p",[e._v("框架与设计模式虽然相似，但却有着根本的不同。设计模式是对在某种环境中反复出现的问题以及解决该问题的方案的描述，它比框架更抽象；框架可以用代码表示，也能直接执行或复用，而对模式而言只有实例才能用代码表示;设计模式是比框架更小的元素，一个框架中往往含有一个或多个设计模式，框架总是针对某一特定应用领域，但同一模式却可适用于各种应用。可以说，框架是软件，而设计模式是软件的知识。")]),e._v(" "),t("p",[e._v("框架模式有哪些？")]),e._v(" "),t("p",[e._v("MVC、MTV、"),t("a",{attrs:{href:"https://baike.baidu.com/item/MVP/3714550",target:"_blank",rel:"noopener noreferrer"}},[e._v("MVP"),t("OutboundLink")],1),e._v("、CBD、"),t("a",{attrs:{href:"https://baike.baidu.com/item/ORM",target:"_blank",rel:"noopener noreferrer"}},[e._v("ORM"),t("OutboundLink")],1),e._v("等等；")]),e._v(" "),t("p",[e._v("MVC指MVC模式的某种框架，它强制性的使应用程序的输入、处理和"),t("a",{attrs:{href:"https://baike.baidu.com/item/%E8%BE%93%E5%87%BA",target:"_blank",rel:"noopener noreferrer"}},[e._v("输出"),t("OutboundLink")],1),e._v("分开。使用MVC应用程序被分成三个核心部件：模型、"),t("a",{attrs:{href:"https://baike.baidu.com/item/%E8%A7%86%E5%9B%BE",target:"_blank",rel:"noopener noreferrer"}},[e._v("视图"),t("OutboundLink")],1),e._v("、控制器。它们各自处理自己的任务。最典型的MVC就是JSP + "),t("a",{attrs:{href:"https://baike.baidu.com/item/servlet",target:"_blank",rel:"noopener noreferrer"}},[e._v("servlet"),t("OutboundLink")],1),e._v(" + "),t("a",{attrs:{href:"https://baike.baidu.com/item/javabean",target:"_blank",rel:"noopener noreferrer"}},[e._v("javabean"),t("OutboundLink")],1),e._v("的模式。")]),e._v(" "),t("p",[e._v("框架有哪些？")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://baike.baidu.com/item/C%2B%2B",target:"_blank",rel:"noopener noreferrer"}},[e._v("C++"),t("OutboundLink")],1),e._v("语言的QT、MFC、gtk，Java语言的"),t("a",{attrs:{href:"https://baike.baidu.com/item/SSH",target:"_blank",rel:"noopener noreferrer"}},[e._v("SSH"),t("OutboundLink")],1),e._v(" 、"),t("a",{attrs:{href:"https://baike.baidu.com/item/SSI",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("SSI")]),t("OutboundLink")],1),e._v("，"),t("a",{attrs:{href:"https://baike.baidu.com/item/php",target:"_blank",rel:"noopener noreferrer"}},[e._v("php"),t("OutboundLink")],1),e._v("语言的 smarty(MVC模式)，"),t("a",{attrs:{href:"https://baike.baidu.com/item/python",target:"_blank",rel:"noopener noreferrer"}},[e._v("python"),t("OutboundLink")],1),e._v("语言的django(MTV模式)等等")]),e._v(" "),t("p",[e._v("设计模式有哪些？")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://baike.baidu.com/item/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"}},[e._v("工厂模式"),t("OutboundLink")],1),e._v("、适配器模式、策略模式等等")]),e._v(" "),t("p",[e._v("简而言之：框架是大智慧，用来对软件设计进行分工；设计模式是小技巧，对具体问题提出解决方案，以提高代码复用率，降低耦合度。")]),e._v(" "),t("h4",{attrs:{id:"参考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[e._v("$")]),e._v(" 参考")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://baike.baidu.com/item/MVC%E6%A1%86%E6%9E%B6/9241230",target:"_blank",rel:"noopener noreferrer"}},[e._v("MVC框架"),t("OutboundLink")],1)])]),e._v(" "),t("h1",{attrs:{id:"从头来"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#从头来"}},[e._v("$")]),e._v(" 从头来")]),e._v(" "),t("h2",{attrs:{id:"是什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#是什么"}},[e._v("$")]),e._v(" 是什么")]),e._v(" "),t("p",[e._v("分层架构，端口适配器模式")]),e._v(" "),t("p",[e._v("实体 VS 值对象")]),e._v(" "),t("p",[e._v("po vo dto")]),e._v(" "),t("p",[e._v("repository")]),e._v(" "),t("p",[e._v("概念\nBounded context：边界上下文\nEntity：领域实体\nValue Object：领域值对象\nAggregate：聚合\nDomain Event：领域事件\nDomain Service：领域服务\nfactory")]),e._v(" "),t("p",[e._v("Repository：仓库")]),e._v(" "),t("h2",{attrs:{id:"为什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么"}},[e._v("$")]),e._v(" 为什么")]),e._v(" "),t("h2",{attrs:{id:"怎么做"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#怎么做"}},[e._v("$")]),e._v(" 怎么做")]),e._v(" "),t("p",[e._v("重要的是实践过程")]),e._v(" "),t("p",[e._v("软件核心复杂性应对之道")]),e._v(" "),t("p",[e._v("参考：")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.cnblogs.com/daoqidelv/p/7492322.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("【DDD】使用领域驱动设计思想实现业务系统"),t("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);