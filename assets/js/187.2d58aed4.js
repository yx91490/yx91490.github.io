(window.webpackJsonp=window.webpackJsonp||[]).push([[187],{482:function(t,v,_){"use strict";_.r(v);var r=_(10),a=Object(r.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h3",{attrs:{id:"rpm命令"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#rpm命令"}},[t._v("$")]),t._v(" RPM命令")]),t._v(" "),v("h4",{attrs:{id:"安装"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("$")]),t._v(" 安装")]),t._v(" "),v("p",[t._v("RPM 包的默认安装路径是可以通过命令查询的。")]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("$ sudo rpm -ivh 包路径 [包2路径]...\n")])])]),v("p",[t._v("此命令中各选项参数的含义为：")]),t._v(" "),v("ul",[v("li",[t._v("-i（install）：安装;")]),t._v(" "),v("li",[t._v("-v（verbose）：显示更详细的信息;")]),t._v(" "),v("li",[t._v("-h（hash）：显示安装进度;")])]),t._v(" "),v("p",[t._v("其他选项：")]),t._v(" "),v("ul",[v("li",[t._v("-nodeps：不检测依赖性安装，所以不建议这样做。")]),t._v(" "),v("li",[t._v('-replacefiles：替换文件安装。如果要安装软件包，但是包中的部分文件已经存在，那么在正常安装时会报"某个文件已经存在"的错误，从而导致软件无法安装。使用这个选项可以忽略这个报错而覆盖安装。')]),t._v(" "),v("li",[t._v("-replacepkgs：替换软件包安装。如果软件包已经安装，那么此选项可以把软件包重复安装一遍。")]),t._v(" "),v("li",[t._v("-force：强制安装。不管是否已经安装，都重新安装。也就是 -replacefiles 和 -replacepkgs 的综合。")]),t._v(" "),v("li",[t._v("-test：测试安装。不会实际安装，只是检测一下依赖性。")]),t._v(" "),v("li",[t._v("-prefix：指定安装路径。为安装软件指定安装路径，而不使用默认安装路径。")])]),t._v(" "),v("h4",{attrs:{id:"卸载"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#卸载"}},[t._v("$")]),t._v(" 卸载")]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("$ sudo rpm -e 包名\n")])])]),v("p",[t._v("支持使用“-nocteps”选项，即可以不检测依赖性直接卸载，但此方式不推荐大家使用")]),t._v(" "),v("h4",{attrs:{id:"查询"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#查询"}},[t._v("$")]),t._v(" 查询")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("项")]),t._v(" "),v("th",[t._v("已安装")]),t._v(" "),v("th",[t._v("未安装")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("查询软件包是否安装")]),t._v(" "),v("td",[t._v("rpm -q 包名")]),t._v(" "),v("td",[t._v("相同")])]),t._v(" "),v("tr",[v("td",[t._v("查询系统中所有安装的软件包")]),t._v(" "),v("td",[t._v("rpm -qa")]),t._v(" "),v("td",[t._v("相同")])]),t._v(" "),v("tr",[v("td",[t._v("查询软件包的详细信息")]),t._v(" "),v("td",[t._v("rpm -qi 包名")]),t._v(" "),v("td",[t._v("rpm -qip 包路径")])]),t._v(" "),v("tr",[v("td",[t._v("查询软件包的文件列表")]),t._v(" "),v("td",[t._v("rpm -ql 包名")]),t._v(" "),v("td",[t._v("rpm -qlp 包路径")])]),t._v(" "),v("tr",[v("td",[t._v("查询系统文件属于哪个RPM包")]),t._v(" "),v("td",[t._v("rpm -qf 系统文件名")]),t._v(" "),v("td",[t._v("略")])]),t._v(" "),v("tr",[v("td",[t._v("查询软件包的依赖关系")]),t._v(" "),v("td",[t._v("rpm -qR 包名")]),t._v(" "),v("td",[t._v("rpm -qRp 包路径")])])])]),t._v(" "),v("h3",{attrs:{id:"yum命令"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#yum命令"}},[t._v("$")]),t._v(" YUM命令")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("操作")]),t._v(" "),v("th",[t._v("命令")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("清除缓存数据")]),t._v(" "),v("td",[t._v("yum clean all")])]),t._v(" "),v("tr",[v("td",[t._v("生成元数据缓存")]),t._v(" "),v("td",[t._v("yum makecache")])]),t._v(" "),v("tr",[v("td",[t._v("更新包列表")]),t._v(" "),v("td",[t._v("yum check-update")])]),t._v(" "),v("tr",[v("td",[t._v("更新已安装的包")]),t._v(" "),v("td",[t._v("yum update")])]),t._v(" "),v("tr",[v("td",[t._v("搜索某个包")]),t._v(" "),v("td",[t._v("yum search $search_string")])]),t._v(" "),v("tr",[v("td",[t._v("查看某个软件包的信息")]),t._v(" "),v("td",[t._v("yum info     $package")])]),t._v(" "),v("tr",[v("td",[t._v("在线安装软件包")]),t._v(" "),v("td",[t._v("yum install $package")])]),t._v(" "),v("tr",[v("td",[t._v("离线安装软件包")]),t._v(" "),v("td",[t._v("yum install $package.rpm")])]),t._v(" "),v("tr",[v("td",[t._v("删除一个或多个已安装的包")]),t._v(" "),v("td",[t._v("yum remove $package")])]),t._v(" "),v("tr",[v("td",[t._v("卸载软件及其依赖")]),t._v(" "),v("td",[t._v("yum history list <Name / ID>"),v("br"),t._v("yum history undo <ID>")])]),t._v(" "),v("tr",[v("td",[t._v("列出已安装软件包")]),t._v(" "),v("td",[t._v("yum list installed")])])])]),t._v(" "),v("h3",{attrs:{id:"参考"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("$")]),t._v(" 参考")]),t._v(" "),v("p",[v("a",{attrs:{href:"https://linux.cn/article-8782-1.html?pr",target:"_blank",rel:"noopener noreferrer"}},[t._v("Linux 包管理基础：apt、yum、dnf 和 pkg"),v("OutboundLink")],1)]),t._v(" "),v("p",[v("a",{attrs:{href:"https://linux.cn/article-5718-1.html?pr",target:"_blank",rel:"noopener noreferrer"}},[t._v("27 个 Linux 下软件包管理工具 DNF 命令例子"),v("OutboundLink")],1)])])}),[],!1,null,null,null);v.default=a.exports}}]);