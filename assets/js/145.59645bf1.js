(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{554:function(e,v,t){"use strict";t.r(v);var _=t(10),a=Object(_.a)({},(function(){var e=this,v=e._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"线程状态"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#线程状态"}},[e._v("$")]),e._v(" 线程状态")]),e._v(" "),v("p",[v("code",[e._v("java.lang.Thread.State")]),e._v("描述了6种状态：")]),e._v(" "),v("ul",[v("li",[v("p",[e._v("NEW                    线程还没有开启")])]),e._v(" "),v("li",[v("p",[e._v("RUNNABLE         线程在java虚拟机中正在执行，但是可能在操作系统中等待其他资源（比如处理器）")])]),e._v(" "),v("li",[v("p",[e._v("BLOCKED            线程阻塞，正在等待一个监视器锁从而进入"),v("code",[e._v("synchronized")]),e._v("代码块/方法，或者在调用"),v("code",[e._v("Object.wait()")]),e._v("之后重新进入"),v("code",[e._v("synchronized")]),e._v("代码块/方法。")])]),e._v(" "),v("li",[v("p",[e._v("WAITING              线程处于等待状态，可能是调用了3个方法：")]),e._v(" "),v("ul",[v("li",[e._v("不带超时的"),v("code",[e._v("Object.wait()")])]),e._v(" "),v("li",[e._v("不带超时的"),v("code",[e._v("Thread.join()")])]),e._v(" "),v("li",[v("code",[e._v("LockSupport.park")])])]),e._v(" "),v("p",[e._v("处于等待状态的线程是等待另一个线程的一个特定动作，线程调用了 "),v("code",[e._v("Object.wait()")]),e._v("是在等待另一个线程调用同一对象的 "),v("code",[e._v("Object.notify()")]),e._v(" 或 "),v("code",[e._v("Object.notifyAll()")]),e._v("。线程调用了"),v("code",[e._v("Thread.join()")]),e._v("是在等待那个线程结束。")])]),e._v(" "),v("li",[v("p",[e._v("TIMED_WAITING 线程等待另一个线程的一个特定动作，且等待不超过特定的时间期限。可能是调用了下面的方法和一个正值的超时参数：")]),e._v(" "),v("ul",[v("li",[v("code",[e._v("Thread.sleep")])]),e._v(" "),v("li",[e._v("带超时的"),v("code",[e._v("Object.wait")])]),e._v(" "),v("li",[e._v("带超时的"),v("code",[e._v("Thread.join")])]),e._v(" "),v("li",[v("code",[e._v("LockSupport.parkNanos")])]),e._v(" "),v("li",[v("code",[e._v("LockSupport.parkUntil")])])])]),e._v(" "),v("li",[v("p",[e._v("TERMINATED       线程已退出")])])]),e._v(" "),v("p",[e._v("在某一时间点线程只能有一种状态，这里的状态是虚拟机的状态，并不对应任何操作系统的线程状态。")]),e._v(" "),v("h2",{attrs:{id:"参考"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[e._v("$")]),e._v(" 参考")]),e._v(" "),v("ul",[v("li",[v("a",{attrs:{href:"https://howtodoinjava.com/java/multi-threading/java-thread-life-cycle-and-thread-states/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Java Thread Life Cycle and Thread States"),v("OutboundLink")],1)])])])}),[],!1,null,null,null);v.default=a.exports}}]);