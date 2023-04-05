(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{610:function(v,_,e){"use strict";e.r(_);var t=e(10),d=Object(t.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"【译】寻找一种易于理解的一致性算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#【译】寻找一种易于理解的一致性算法"}},[v._v("$")]),v._v(" 【译】寻找一种易于理解的一致性算法")]),v._v(" "),_("h2",{attrs:{id:"_5-raft-一致性算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-raft-一致性算法"}},[v._v("$")]),v._v(" 5. Raft 一致性算法")]),v._v(" "),_("p",[_("strong",[v._v("状态：")])]),v._v(" "),_("p",[v._v("在所有服务器上持久存在的（在响 RPC 之前稳定存储的）：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("属性")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("currentTerm")]),v._v(" "),_("td",[v._v("服务器最后知道的任期号（从 0 开始递增）")])]),v._v(" "),_("tr",[_("td",[v._v("votedFor")]),v._v(" "),_("td",[v._v("在当前任期内收到选票的candidateId（如果没有则为 null）")])]),v._v(" "),_("tr",[_("td",[v._v("log[]")]),v._v(" "),_("td",[v._v("日志条目；每个条目包含状态机的要执行命令和从leader处收到时的任期号")])])])]),v._v(" "),_("p",[v._v("在所有服务器上不稳定存在的：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("属性")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("commitIndex")]),v._v(" "),_("td",[v._v("已知的将被提交的最大日志条目的索引值（从 0 开始递增）")])]),v._v(" "),_("tr",[_("td",[v._v("lastApplied")]),v._v(" "),_("td",[v._v("被状态机执行的最大日志条目的索引值（从 0 开始递增）")])])])]),v._v(" "),_("p",[v._v("在leader服务器上不稳定存在的（选举之后重新初始化）：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("属性")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("nextIndex[]")]),v._v(" "),_("td",[v._v("对于每一个服务器，记录需要发给它的下一个日志条目的索引（初始化为leader上一条日志的索引值 +1）")])]),v._v(" "),_("tr",[_("td",[v._v("matchIndex[]")]),v._v(" "),_("td",[v._v("对于每一个服务器，记录已经复制到该服务器的日志的最高索引值（从 0 开始递增）")])])])]),v._v(" "),_("p",[_("strong",[v._v("AppendEntries RPC（leader调用，用来复制日志（5.3 节）；也会用作心跳）：")])]),v._v(" "),_("p",[v._v("参数：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("属性")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("term")]),v._v(" "),_("td",[v._v("leader的任期")])]),v._v(" "),_("tr",[_("td",[v._v("leaderId")]),v._v(" "),_("td",[v._v("为了follower能重定向客户端的请求")])]),v._v(" "),_("tr",[_("td",[v._v("prevLogIndex")]),v._v(" "),_("td",[v._v("最新日志之前的日志的索引值")])]),v._v(" "),_("tr",[_("td",[v._v("prevLogTerm")]),v._v(" "),_("td",[v._v("prevLogIndex的任期")])]),v._v(" "),_("tr",[_("td",[v._v("entries[]")]),v._v(" "),_("td",[v._v("将要存储的日志条目（表示心跳时为空，有时会为了效率发送超过一条）")])]),v._v(" "),_("tr",[_("td",[v._v("leaderCommit")]),v._v(" "),_("td",[v._v("leader的commitIndex")])])])]),v._v(" "),_("p",[v._v("返回值：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("属性")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("term")]),v._v(" "),_("td",[v._v("当前的任期号，用于leader更新自己的任期号")])]),v._v(" "),_("tr",[_("td",[v._v("success")]),v._v(" "),_("td",[v._v("如果follower包含能够匹配上 prevLogIndex 和 prevLogTerm 的日志时为真")])])])]),v._v(" "),_("p",[v._v("Receiver实现：")]),v._v(" "),_("ol",[_("li",[v._v("如果 "),_("code",[v._v("term < currentTerm")]),v._v("返回 false（5.1 节）")]),v._v(" "),_("li",[v._v("如果在"),_("code",[v._v("prevLogIndex")]),v._v("处的日志的任期号与"),_("code",[v._v("prevLogTerm")]),v._v("不匹配时，返回 false（5.3 节）")]),v._v(" "),_("li",[v._v("如果一条已经存在的日志与新的冲突（index 相同但是任期号 term 不同），则删除已经存在的日志和它之后所有的日志（5.3 节）")]),v._v(" "),_("li",[v._v("添加任何在已有的日志中不存在的新条目")]),v._v(" "),_("li",[v._v("如果"),_("code",[v._v("leaderCommit > commitIndex")]),v._v("，将"),_("code",[v._v("commitIndex")]),v._v("设置为"),_("code",[v._v("leaderCommit")]),v._v("和最新日志条目索引号中较小的一个")])]),v._v(" "),_("p",[_("strong",[v._v("RequestVote RPC（由候选人发起用于收集选票）：")])]),v._v(" "),_("p",[v._v("参数：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("属性")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("term")]),v._v(" "),_("td",[v._v("candidate的任期号")])]),v._v(" "),_("tr",[_("td",[v._v("candidateId")]),v._v(" "),_("td",[v._v("请求投票的candidate Id")])]),v._v(" "),_("tr",[_("td",[v._v("lastLogIndex")]),v._v(" "),_("td",[v._v("candidate最新日志条目的索引值")])]),v._v(" "),_("tr",[_("td",[v._v("lastLogTerm")]),v._v(" "),_("td",[v._v("candidate最新日志条目对应的任期号")])])])]),v._v(" "),_("p",[v._v("返回值：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("属性")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("term")]),v._v(" "),_("td",[v._v("目前的任期号，candidate用于更新自己")])]),v._v(" "),_("tr",[_("td",[v._v("voteGranted")]),v._v(" "),_("td",[v._v("如果candidate收到选票为 true")])])])]),v._v(" "),_("p",[v._v("Receiver实现：")]),v._v(" "),_("ol",[_("li",[v._v("如果"),_("code",[v._v("term < currentTerm")]),v._v("返回 false（5.1 节）")]),v._v(" "),_("li",[v._v("如果"),_("code",[v._v("votedFor")]),v._v("为null或者与"),_("code",[v._v("candidateId")]),v._v("相同，并且candidate的日志至少和receiver的日志一样新，则给candidate投票（5.2 节 和 5.4 节）")])]),v._v(" "),_("p",[_("strong",[v._v("服务器需要遵守的规则：")])]),v._v(" "),_("p",[v._v("所有服务器：")]),v._v(" "),_("ul",[_("li",[v._v("如果"),_("code",[v._v("commitIndex > lastApplied")]),v._v("，"),_("code",[v._v("lastApplied")]),v._v("自增?，将"),_("code",[v._v("log[lastApplied]")]),v._v("应用到状态机（5.3 节）")]),v._v(" "),_("li",[v._v("如果 RPC 的请求或者响应中包含一个 term T > "),_("code",[v._v("currentTerm")]),v._v("，则"),_("code",[v._v("currentTerm=T")]),v._v("，并切换状态为Follower（5.1 节）")])]),v._v(" "),_("p",[v._v("Followers：")]),v._v(" "),_("ul",[_("li",[v._v("响应来自leader和candidate的 RPC")]),v._v(" "),_("li",[v._v("如果在选举超时之前没有收到来自当前leader的"),_("code",[v._v("AppendEntries RPC")]),v._v("或者没有收到candidate的投票请求，则自己转换状态为candidate")])]),v._v(" "),_("p",[v._v("Candidates：")]),v._v(" "),_("ul",[_("li",[v._v("当变为candidate之后，开始选举：\n"),_("ul",[_("li",[_("code",[v._v("currentTerm")]),v._v("自增")]),v._v(" "),_("li",[v._v("给自己投票")]),v._v(" "),_("li",[v._v("重置选举计时器")]),v._v(" "),_("li",[v._v("向其他服务器发送"),_("code",[v._v("RequestVote RPC")])])])]),v._v(" "),_("li",[v._v("如果收到了来自大多数服务器的投票：成为leader")]),v._v(" "),_("li",[v._v("如果收到了来自新leader的"),_("code",[v._v("AppendEntries RPC（heartbeat）")]),v._v("：转换状态为follower")]),v._v(" "),_("li",[v._v("如果选举超时：开始新一轮的选举")])]),v._v(" "),_("p",[v._v("Leaders：")]),v._v(" "),_("ul",[_("li",[v._v("一旦当选：向每个服务器初始发送一个空的"),_("code",[v._v("AppendEntries RPC（heartbeat）")]),v._v("; 在空闲时间重复发送以防止选举超时（5.2 节）")]),v._v(" "),_("li",[v._v("如果收到来自客户端的请求：向本地日志增加条目，在该条目应用到状态机后响应客户端（5.3 节）")]),v._v(" "),_("li",[v._v("对于一个follower来说，如果上一次收到的日志index> nextIndex：通过"),_("code",[v._v("AppendEntries RPC")]),v._v("将 nextIndex 之后的所有日志条目发送出去\n"),_("ul",[_("li",[v._v("如果发送成功：将该follower的 "),_("code",[v._v("nextIndex")]),v._v("和"),_("code",[v._v("matchIndex")]),v._v("更新")]),v._v(" "),_("li",[v._v("如果由于日志不一致导致"),_("code",[v._v("AppendEntries RPC")]),v._v("失败："),_("code",[v._v("nextIndex")]),v._v("递减并且重新发送（5.3 节）")])])]),v._v(" "),_("li",[v._v("如果存在一个N满足"),_("code",[v._v("N > commitIndex")]),v._v("和大多数"),_("code",[v._v("matchIndex[i] >= N")]),v._v("并且"),_("code",[v._v("log[N].term == currentTerm")]),v._v("，则将"),_("code",[v._v("commitIndex")]),v._v("赋值为 N")])])])}),[],!1,null,null,null);_.default=d.exports}}]);