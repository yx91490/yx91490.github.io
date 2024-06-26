(window.webpackJsonp=window.webpackJsonp||[]).push([[152],{562:function(s,e,r){"use strict";r.r(e);var v=r(10),_=Object(v.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"cms-gc日志格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cms-gc日志格式"}},[s._v("$")]),s._v(" CMS GC日志格式")]),s._v(" "),e("h3",{attrs:{id:"minor-gc"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#minor-gc"}},[s._v("$")]),s._v(" Minor GC")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:07.219-0200"),e("sup",[s._v("1")]),s._v(": 64.322"),e("sup",[s._v("2")]),s._v(":[GC"),e("sup",[s._v("3")]),s._v("(Allocation Failure"),e("sup",[s._v("4")]),s._v(") 64.322: [ParNew"),e("sup",[s._v("5")]),s._v(": 613404K->68068K"),e("sup",[s._v("6")]),s._v("(613440K) "),e("sup",[s._v("7")]),s._v(", 0.1020465 secs"),e("sup",[s._v("8")]),s._v("] 10885349K->10880154K "),e("sup",[s._v("9")]),s._v("(12514816K)"),e("sup",[s._v("10")]),s._v(", 0.1021309 secs"),e("sup",[s._v("11")]),s._v("][Times: user=0.78 sys=0.01, real=0.11 secs]"),e("sup",[s._v("12")])])]),s._v(" "),e("ol",[e("li",[s._v("2015-05-26T16:23:07.219-0200 gc事件开始的时间")]),s._v(" "),e("li",[s._v("64.322 gc事件距离JVM启动的时间，单位是秒")]),s._v(" "),e("li",[s._v("GC 表示是minor GC")]),s._v(" "),e("li",[s._v("Allocation Failure gc发生的原因")]),s._v(" "),e("li",[s._v("ParNew 收集器的名字")]),s._v(" "),e("li",[s._v("613404K->68068K 年轻代在gc发生前后的大小")]),s._v(" "),e("li",[s._v("(613440K) 年轻代总大小")]),s._v(" "),e("li",[s._v("0.1020465 secs gc持续时长")]),s._v(" "),e("li",[s._v("10885349K->10880154K 堆在gc发生前后的大小")]),s._v(" "),e("li",[s._v("(12514816K) 堆可用总大小")]),s._v(" "),e("li",[s._v("0.1021309 secs 年轻代垃圾收集器在标记和复制存活对象耗费的时间，包括和CMS收集器通信的时间，对象晋升到老年代的时间以及最后的清理工作")]),s._v(" "),e("li",[s._v("[Times: user=0.78 sys=0.01, real=0.11 secs] 从不同角度度量gc事件的耗时：\n"),e("ul",[e("li",[s._v("user gc线程消耗的总的CPU时长")]),s._v(" "),e("li",[s._v("sys 系统调用和等待系统事件的耗时")]),s._v(" "),e("li",[s._v("real 应用暂停的时钟时长，此数值应该和(user时长+sys时长)/gc线程数接近")])])])]),s._v(" "),e("h3",{attrs:{id:"full-gc"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#full-gc"}},[s._v("$")]),s._v(" Full GC")]),s._v(" "),e("p",[s._v("完整日志：")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("2015-05-26T16:23:07.321-0200: 64.425: [GC (CMS Initial Mark) [1 CMS-initial-mark: 10812086K(11901376K)] 10887844K(12514816K), 0.0001997 secs] [Times: user=0.00 sys=0.00, real=0.00 secs]\n2015-05-26T16:23:07.321-0200: 64.425: [CMS-concurrent-mark-start]\n2015-05-26T16:23:07.357-0200: 64.460: [CMS-concurrent-mark: 0.035/0.035 secs] [Times: user=0.07 sys=0.00, real=0.03 secs]\n2015-05-26T16:23:07.357-0200: 64.460: [CMS-concurrent-preclean-start]\n2015-05-26T16:23:07.373-0200: 64.476: [CMS-concurrent-preclean: 0.016/0.016 secs] [Times: user=0.02 sys=0.00, real=0.02 secs]\n2015-05-26T16:23:07.373-0200: 64.476: [CMS-concurrent-abortable-preclean-start]\n2015-05-26T16:23:08.446-0200: 65.550: [CMS-concurrent-abortable-preclean: 0.167/1.074 secs] [Times: user=0.20 sys=0.00, real=1.07 secs]\n2015-05-26T16:23:08.447-0200: 65.550: [GC (CMS Final Remark) [YG occupancy: 387920 K (613440 K)]65.550: [Rescan (parallel) , 0.0085125 secs]65.559: [weak refs processing, 0.0000243 secs]65.559: [class unloading, 0.0013120 secs]65.560: [scrub symbol table, 0.0008345 secs]65.561: [scrub string table, 0.0001759 secs][1 CMS-remark: 10812086K(11901376K)] 11200006K(12514816K), 0.0110730 secs] [Times: user=0.06 sys=0.00, real=0.01 secs]\n2015-05-26T16:23:08.458-0200: 65.561: [CMS-concurrent-sweep-start]\n2015-05-26T16:23:08.485-0200: 65.588: [CMS-concurrent-sweep: 0.027/0.027 secs] [Times: user=0.03 sys=0.00, real=0.03 secs]\n2015-05-26T16:23:08.485-0200: 65.589: [CMS-concurrent-reset-start]\n2015-05-26T16:23:08.497-0200: 65.601: [CMS-concurrent-reset: 0.012/0.012 secs] [Times: user=0.01 sys=0.00, real=0.01 secs]\n")])])]),e("h4",{attrs:{id:"阶段一-初始标记"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#阶段一-初始标记"}},[s._v("$")]),s._v(" 阶段一：初始标记")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:07.321-0200: 64.42"),e("sup",[s._v("1")]),s._v(": [GC (CMS Initial Mark"),e("sup",[s._v("2")]),s._v("[1 CMS-initial-mark: 10812086K"),e("sup",[s._v("3")]),s._v("(11901376K)"),e("sup",[s._v("4")]),s._v("] 10887844K"),e("sup",[s._v("5")]),s._v("(12514816K)"),e("sup",[s._v("6")]),s._v(", 0.0001997 secs][Times: user=0.00 sys=0.00, real=0.00 secs]"),e("sup",[s._v("7")])])]),s._v(" "),e("ol",[e("li",[s._v("2015-05-26T16:23:07.321-0200: 64.42 gc事件的时钟时间和相对于JVM的启动时间")]),s._v(" "),e("li",[s._v("CMS Initial Mark 初始标记阶段")]),s._v(" "),e("li",[s._v("10812086K 当前老年代大小")]),s._v(" "),e("li",[s._v("(11901376K) 老年代可用总大小")]),s._v(" "),e("li",[s._v("10887844K 当前堆大小")]),s._v(" "),e("li",[s._v("(12514816K) 堆可用总大小")]),s._v(" "),e("li",[s._v("0.0001997 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 此阶段耗时")])]),s._v(" "),e("h4",{attrs:{id:"阶段二-并发标记"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#阶段二-并发标记"}},[s._v("$")]),s._v(" 阶段二：并发标记")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:07.321-0200: 64.425: [CMS-concurrent-mark-start]")]),s._v(" "),e("p",[s._v("2015-05-26T16:23:07.357-0200: 64.460: [CMS-concurrent-mark"),e("sup",[s._v("1")]),s._v(": 0.035/0.035 secs"),e("sup",[s._v("2")]),s._v("][Times: user=0.07 sys=0.00, real=0.03 secs]"),e("sup",[s._v("3")])])]),s._v(" "),e("ol",[e("li",[s._v("CMS-concurrent-mark 并发标记阶段，会遍历老年代并且标记所有存活对象")]),s._v(" "),e("li",[s._v("0.035/0.035 secs 展示实耗时间和时钟时间")]),s._v(" "),e("li",[s._v("[Times: user=0.07 sys=0.00, real=0.03 secs] 无太多意义")])]),s._v(" "),e("h4",{attrs:{id:"阶段三-并发预清理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#阶段三-并发预清理"}},[s._v("$")]),s._v(" 阶段三：并发预清理")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:07.357-0200: 64.460: [CMS-concurrent-preclean-start]")]),s._v(" "),e("p",[s._v("2015-05-26T16:23:07.373-0200: 64.476: [CMS-concurrent-preclean"),e("sup",[s._v("1")]),s._v(": 0.016/0.016 secs"),e("sup",[s._v("2")]),s._v("][Times: user=0.02 sys=0.00, real=0.02 secs]"),e("sup",[s._v("3")])])]),s._v(" "),e("ol",[e("li",[s._v("CMS-concurrent-preclean 同上文")]),s._v(" "),e("li",[s._v("0.016/0.016 secs 同上文")]),s._v(" "),e("li",[s._v("[Times: user=0.02 sys=0.00, real=0.02 secs] 无太多意义")])]),s._v(" "),e("h4",{attrs:{id:"阶段四-并发可中断预清理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#阶段四-并发可中断预清理"}},[s._v("$")]),s._v(" 阶段四：并发可中断预清理")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:07.373-0200: 64.476: [CMS-concurrent-abortable-preclean-start]")]),s._v(" "),e("p",[s._v("2015-05-26T16:23:08.446-0200: 65.550: [CMS-concurrent-abortable-preclean"),e("sup",[s._v("1")]),s._v(": 0.167/1.074 secs"),e("sup",[s._v("2")]),s._v("][Times: user=0.20 sys=0.00, real=1.07 secs]"),e("sup",[s._v("3")])])]),s._v(" "),e("ol",[e("li",[s._v("CMS-concurrent-abortable-preclean 同上文\n"),e("ol",[e("li",[s._v("0.167/1.074 secs 只有0.167秒的CPU时间，gc线程做了大量等待工作，本质上是在STW暂停之前尽量延迟。默认最多等待5秒")])])])]),s._v(" "),e("h4",{attrs:{id:"阶段五-最终标记"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#阶段五-最终标记"}},[s._v("$")]),s._v(" 阶段五：最终标记")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:08.447-0200: 65.550"),e("sup",[s._v("1")]),s._v(": [GC (CMS Final Remark"),e("sup",[s._v("2")]),s._v(") [YG occupancy: 387920 K (613440 K)"),e("sup",[s._v("3")]),s._v("]65.550: [Rescan (parallel) , 0.0085125 secs]"),e("sup",[s._v("4")]),s._v("65.559: [weak refs processing, 0.0000243 secs]65.559"),e("sup",[s._v("5")]),s._v(": [class unloading, 0.0013120 secs]65.560"),e("sup",[s._v("6")]),s._v(": [scrub string table, 0.0001759 secs"),e("sup",[s._v("7")]),s._v("][1 CMS-remark: 10812086K(11901376K)"),e("sup",[s._v("8")]),s._v("] 11200006K(12514816K) "),e("sup",[s._v("9")]),s._v(", 0.0110730 secs"),e("sup",[s._v("10")]),s._v("][Times: user=0.06 sys=0.00, real=0.01 secs]"),e("sup",[s._v("11")])])]),s._v(" "),e("ol",[e("li",[s._v("2015-05-26T16:23:08.447-0200: 65.550 同上文")]),s._v(" "),e("li",[s._v("CMS Final Remark 同上文")]),s._v(" "),e("li",[s._v("YG occupancy: 387920 K (613440 K) 当前阶段之后年轻代占用大小和容量")]),s._v(" "),e("li",[s._v("[Rescan (parallel) , 0.0085125 secs] Rescan过程在应用暂停过程中完成对存活对象的标记。")]),s._v(" "),e("li",[s._v("weak refs processing, 0.0000243 secs]65.559 第一个子阶段，处理弱引用")]),s._v(" "),e("li",[s._v("class unloading, 0.0013120 secs]65.560 下一个子阶段，卸载无用的类")]),s._v(" "),e("li",[s._v("scrub string table, 0.0001759 secs 最后一个子阶段，清理符号和字符串表")]),s._v(" "),e("li",[s._v("10812086K(11901376K) 当前阶段之后老年代占用大小和容量")]),s._v(" "),e("li",[s._v("11200006K(12514816K) 当前阶段之后堆占用大小和容量")]),s._v(" "),e("li",[s._v("0.0110730 secs 此阶段耗时")]),s._v(" "),e("li",[s._v("[Times: user=0.06 sys=0.00, real=0.01 secs] 同上文")])]),s._v(" "),e("h4",{attrs:{id:"阶段六-并发清理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#阶段六-并发清理"}},[s._v("$")]),s._v(" 阶段六：并发清理")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:08.458-0200: 65.56"),e("sup",[s._v("1")]),s._v(": [CMS-concurrent-sweep-start]")]),s._v(" "),e("p",[s._v("2015-05-26T16:23:08.485-0200: 65.588: [CMS-concurrent-sweep1: 0.027/0.027 secs"),e("sup",[s._v("2")]),s._v("][Times: user=0.03 sys=0.00, real=0.03 secs] "),e("sup",[s._v("3")])])]),s._v(" "),e("ol",[e("li",[s._v("CMS-concurrent-sweep 同上文")]),s._v(" "),e("li",[s._v("0.027/0.027 secs 同上文")]),s._v(" "),e("li",[s._v("[Times: user=0.03 sys=0.00, real=0.03 secs] 同上文")])]),s._v(" "),e("h4",{attrs:{id:"阶段七-并发重置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#阶段七-并发重置"}},[s._v("$")]),s._v(" 阶段七：并发重置")]),s._v(" "),e("blockquote",[e("p",[s._v("2015-05-26T16:23:08.485-0200: 65.589: [CMS-concurrent-reset-start]")]),s._v(" "),e("p",[s._v("2015-05-26T16:23:08.497-0200: 65.601: [CMS-concurrent-reset"),e("sup",[s._v("1")]),s._v(": 0.012/0.012 secs"),e("sup",[s._v("2")]),s._v("][Times: user=0.01 sys=0.00, real=0.01 secs]"),e("sup",[s._v("3")])])]),s._v(" "),e("ol",[e("li",[s._v("CMS-concurrent-reset 同上文")]),s._v(" "),e("li",[s._v("0.012/0.012 secs 同上文")]),s._v(" "),e("li",[s._v("[Times: user=0.01 sys=0.00, real=0.01 secs] 同上文")])]),s._v(" "),e("h3",{attrs:{id:"参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[s._v("$")]),s._v(" 参考")]),s._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://plumbr.io/handbook/garbage-collection-algorithms-implementations",target:"_blank",rel:"noopener noreferrer"}},[s._v("garbage collection algorithms implementations"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=_.exports}}]);