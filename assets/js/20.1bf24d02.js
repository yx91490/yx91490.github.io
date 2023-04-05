(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{341:function(t,a,r){t.exports=r.p+"assets/img/1_20191114134052_994.84c48909.png"},342:function(t,a,r){t.exports=r.p+"assets/img/2Ir6NrB.76f6a4df.png"},343:function(t,a,r){t.exports=r.p+"assets/img/b6zMj2Q.c1d07125.png"},483:function(t,a,r){"use strict";r.r(a);var s=r(10),e=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"计算机网络笔记"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#计算机网络笔记"}},[t._v("$")]),t._v(" 计算机网络笔记")]),t._v(" "),a("h2",{attrs:{id:"tcp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp"}},[t._v("$")]),t._v(" TCP")]),t._v(" "),a("img",{staticStyle:{zoom:"67%"},attrs:{src:r(341),alt:"1.png"}}),t._v(" "),a("h3",{attrs:{id:"tcp三次握手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp三次握手"}},[t._v("$")]),t._v(" TCP三次握手")]),t._v(" "),a("p",[a("img",{attrs:{src:r(342),alt:"img"}})]),t._v(" "),a("h4",{attrs:{id:"为什么是三次握手-而不是两次或四次"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么是三次握手-而不是两次或四次"}},[t._v("$")]),t._v(" 为什么是三次握手，而不是两次或四次？")]),t._v(" "),a("p",[t._v("如果只有两次握手，那么服务端向客户端发送 SYN/ACK 报文后，就会认为连接建立。但是如果客户端没有收到报文，那么客户端是没有建立连接的，这就导致服务端会浪费资源。")]),t._v(" "),a("h3",{attrs:{id:"tcp-数据传输"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-数据传输"}},[t._v("$")]),t._v(" TCP 数据传输")]),t._v(" "),a("p",[t._v("「重传」和「去重」")]),t._v(" "),a("h3",{attrs:{id:"tcp四次挥手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp四次挥手"}},[t._v("$")]),t._v(" TCP四次挥手")]),t._v(" "),a("p",[a("img",{attrs:{src:r(343),alt:"img"}})]),t._v(" "),a("h4",{attrs:{id:"大量的-time-wait-状态-tcp-连接-对业务有什么影响-怎么处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#大量的-time-wait-状态-tcp-连接-对业务有什么影响-怎么处理"}},[t._v("$")]),t._v(" 大量的 TIME_WAIT 状态 TCP 连接，对业务有什么影响？怎么处理？")]),t._v(" "),a("p",[t._v("在高并发的场景下，TIME_WAIT 连接存在，属于正常现象。本质原因是大量的短连接存在。")]),t._v(" "),a("p",[t._v("大量的 TIME_WAIT 状态 TCP 连接对业务的影响：")]),t._v(" "),a("p",[t._v("每一个 time_wait 状态，都会占用一个「本地端口」，上限为 65535(16 bit，2 Byte)；\n当大量的连接处于 time_wait 时，新建立 TCP 连接会出错"),a("code",[t._v("address already in use : connect")]),t._v(" 异常")]),t._v(" "),a("p",[t._v("一般解决办法：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("客户端，HTTP 请求的头部，connection 设置为 keep-alive")])]),t._v(" "),a("li",[a("p",[t._v("服务器端：允许 time_wait 状态的 socket 被重用；缩减 time_wait 时间")])])]),t._v(" "),a("h4",{attrs:{id:"为什么需要四次挥手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要四次挥手"}},[t._v("$")]),t._v(" 为什么需要四次挥手？")]),t._v(" "),a("p",[t._v("TCP 是 全双工 。一方关闭连接后，另一方还可以继续发送数据。所以四次挥手，将断开连接分成两个独立的过程。")]),t._v(" "),a("h4",{attrs:{id:"客户端-time-wait-为什么要等待-2msl-才进入-closed-状态"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#客户端-time-wait-为什么要等待-2msl-才进入-closed-状态"}},[t._v("$")]),t._v(" 客户端 TIME-WAIT ，为什么要等待 2MSL 才进入 CLOSED 状态？")]),t._v(" "),a("p",[t._v("MSL 是报文段在网络上最大存活时间。确保 ACK 报文能够到达服务端，从而使服务端正常关闭连接。客户端在发送完最后一个 ACK 报文段后，再经过 2MSL，就可以保证本连接持续的时间内产生的所有报文段都从网络中消失。这样就可以使下一个连接中不会出现这种旧的连接请求报文段。")]),t._v(" "),a("h3",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("$")]),t._v(" 参考")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.tuicool.com/articles/imaiQfm?from=timeline",target:"_blank",rel:"noopener noreferrer"}},[t._v("跟着动画来学习TCP三次握手和四次挥手"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.tuicool.com/articles/MfUF3yM",target:"_blank",rel:"noopener noreferrer"}},[t._v("TCP网络那点破事！三次握手、四次挥手、TIME-WAIT、HTTP 2.0 ...."),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://mp.weixin.qq.com/s/Ubs_R05d15Rb0OBEpPXlXw",target:"_blank",rel:"noopener noreferrer"}},[t._v("大量的 TIME_WAIT 状态 TCP 连接，对业务有什么影响？怎么处理？"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);