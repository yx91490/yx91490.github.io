(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{537:function(v,_,o){"use strict";o.r(_);var r=o(10),t=Object(r.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"throw-error没有捕获的问题排查"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#throw-error没有捕获的问题排查"}},[v._v("$")]),v._v(" throw Error没有捕获的问题排查")]),v._v(" "),_("blockquote",[_("p",[v._v("发布日期：2020-01-05")])]),v._v(" "),_("p",[v._v("最近发现一个监控服务一直没有采集到监控数据，最新的监控数据还是在项目切换为"),_("code",[v._v("Spring Boot")]),v._v("框架之前产生的。初步查看了一下日志竟然也没有发现任何异常信息，翻了翻代码发现数据收集的接口不论抛不抛出异常应该都会忠实的记录数据才对，问题很可能跟切换框架有关系，但是这个范围有点广啊导致排查陷入了停滞，程序员感受到了被程序支配的恐惧，但是问题还是得解决啊。")]),v._v(" "),_("p",[v._v("程序员遇到这种自相矛盾的问题一般有两种情况：")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("一种是我X不对啊，应该执行这块代码怎么没执行？")])]),v._v(" "),_("li",[_("p",[v._v("一种是我X不对啊，不应该执行这块代码怎么执行了？")])])]),v._v(" "),_("p",[v._v("第一种比第二种好解决一点，幸运的是这次遇到的是第一种情况。但是程序员在一边心想着手上开发的代码另一边哪TMD有心思查各种稀奇古怪的问题啊？关键还是TMD前人留下的代码！这时候可能思维就有些混乱像无头苍蝇一样寄希望于各种瞎猜战术，但是可想而知对于长这么大买饮料都是“谢谢惠顾”的我来说，这不太可能解决问题。")]),v._v(" "),_("p",[v._v("其实回过头想想排查问题最重要的手段还是日志（所以在写代码的时候写好日志比写好注释重要的多了），日志没有打印出来异常信息仔细想想有两种可能（排除掉太空辐射导致的幽灵情况），一种是确实没有执行，另一种是执行了但是由于种种原因日志框架没有输出出来。这时候猛然想起来一个细节：切换到"),_("code",[v._v("Spring Boot")]),v._v("之后"),_("code",[v._v("System.out")]),v._v("标准输出的日志没有打印出来，由于这种方式打印的日志通常无关紧要所以一直没有解决这个问题，那会不会异常信息产生到标准输出或标准错误中去了呢？程序是以"),_("code",[v._v("nohup java -cp * >/dev/null 2>&1 &")]),v._v("这种方式启动的，标准输出和标准错误直接丢弃了，于是改成"),_("code",[v._v("nohup java -cp * >./sys.out 2>&1 &")]),v._v("这种方式并查看"),_("code",[v._v("sys.out")]),v._v("内容终于发现了猫腻：程序抛出了Error！")]),v._v(" "),_("p",[v._v("到这里大家大概已经看出来问题了，程序仅仅捕获了"),_("code",[v._v("Exception")]),v._v("但是却抛出了"),_("code",[v._v("Error")]),v._v("，错误信息最终会输出到标准错误中去，而恰恰程序的启动方式把标准错误的信息丢弃了！")]),v._v(" "),_("p",[v._v("找到问题后解决方法就很简单了：")]),v._v(" "),_("ul",[_("li",[v._v("一方面代码里catch住"),_("code",[v._v("Error")])]),v._v(" "),_("li",[v._v("另一方面添加"),_("code",[v._v("jul-over-slf4j")]),v._v("依赖把标准输出和标准错误输出重定向到日志中去")])]),v._v(" "),_("p",[v._v("复盘总结一下，两个因素交织在一起导致没能很快定位问题，这再次提示我打印日志很重要，日志问题要提早解决；同时遇到类似问题加个条件反射首先往"),_("code",[v._v("Error")]),v._v("这块想。然而更重要的是，遇到了自相矛盾的问题怎样能更快的梳理清楚思路，恐怕自己还需要更多的摸索。")])])}),[],!1,null,null,null);_.default=t.exports}}]);