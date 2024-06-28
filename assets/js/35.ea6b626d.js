(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{326:function(t,v,_){t.exports=_.p+"assets/img/image-20210905201219266.4c96c32b.png"},471:function(t,v,_){"use strict";_.r(v);var a=_(10),e=Object(a.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"olap笔记"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#olap笔记"}},[t._v("$")]),t._v(" OLAP笔记")]),t._v(" "),v("h2",{attrs:{id:"olap引擎对比"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#olap引擎对比"}},[t._v("$")]),t._v(" OLAP引擎对比")]),t._v(" "),v("p",[t._v("大数据技术发展到2021年，底层的存储、计算、调度引擎似乎都已经形成了事实上的标准，但是OLAP领域却一直百花齐放，没有出现一种统一的OLAP引擎，究其原因是没有一种引擎都能适用于各种场景，或多或少都存在这样那样的不足。现就工作中接触到的OLAP引擎做一个总结对比。")]),t._v(" "),v("h3",{attrs:{id:"kudu-impala"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#kudu-impala"}},[t._v("$")]),t._v(" Kudu+Impala")]),t._v(" "),v("p",[t._v("Kudu+Impala在我司是最主要的OLAP引擎，因为我司的业务大量场景的数据是实时更新的业务数据，业务方对数据时效性要求较高（分钟级），Kudu支持实时的upsert操作，在没有引入数据湖技术之前Kudu是为数不多的解决方案。")]),t._v(" "),v("p",[t._v("当然在实际的项目使用中还是做了一些妥协，比如impala本身没有缓存，为了避免高并发对impala资源的消耗，将impala聚合后的数据导出到MySQL，应用连接MySQL进行查询。另一方面我们有的SQL比较重，涉及到多张大表join之后做聚合计算，执行时间长，运行不是很稳定，这样也能提供一定的缓冲。这种用法会导致数据的时效性在10min这个量级，但是大部分的业务是可以接受的。")]),t._v(" "),v("p",[t._v("这个组合还有一些缺陷比如Kudu启动时间过长，Impala查询经常遇到单节点内存不足的报错，遇到节点挂掉查询直接失败，依赖组件太多等等。")]),t._v(" "),v("h3",{attrs:{id:"clickhouse"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#clickhouse"}},[t._v("$")]),t._v(" ClickHouse")]),t._v(" "),v("p",[t._v("ClickHouse主要用来做多维数据分析，依赖于超高的查询性能，很多业务要求查询响应必须是秒级以内。配合chproxy代理，能够做到查询的缓存，而且批量写入性能能够媲美HBase，甚至可以当作时序数据库来用。据说京东的ClickHouse大表数据量可以达到百亿级别。而ClickHouse的问题是不支持数据更新，join支持的不好，运维成本比较高。")]),t._v(" "),v("h3",{attrs:{id:"kylin"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#kylin"}},[t._v("$")]),t._v(" Kylin")]),t._v(" "),v("p",[t._v("Kylin支持了一些固定维度查询的报表业务，它在响应速度，查询并发，SQL能力，精确去重等方面令人印象深刻，但是预计算的思想导致数据变更的成本很高，同时依赖的组件也很多。")]),t._v(" "),v("h3",{attrs:{id:"doris"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#doris"}},[t._v("$")]),t._v(" Doris")]),t._v(" "),v("p",[t._v("由于数据模型比较丰富，Doris是相对来说适用场景最广的一个引擎，我司也打算用Doris来统一Kudu，ClickHouse，Kylin各种引擎。在满足功能和性能需求的前提下，可以预见的优点是运维成本极低。Doris目前存在的一个短板就是资源隔离能力不够，如果想要保证重要业务稳定性，Doris核心开发者建议还是做集群层面的物理资源隔离。")]),t._v(" "),v("p",[t._v("Doris使用上需要注意的一点是写入的频率最好控制在分钟级，单表数据量控制在10亿以内。")]),t._v(" "),v("h3",{attrs:{id:"总结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("$")]),t._v(" 总结")]),t._v(" "),v("p",[t._v("各个引擎详细对比如下：")]),t._v(" "),v("table",[v("tr",[v("td",{attrs:{rowspan:"2"}},[t._v("引擎")]),t._v(" "),v("td",{attrs:{colspan:"3"}},[t._v("写入")]),t._v(" "),v("td",{attrs:{colspan:"5"}},[t._v("查询")]),t._v(" "),v("td",{attrs:{colspan:"2"}},[t._v("运维")]),t._v(" "),v("td",{attrs:{rowspan:"2"}},[t._v("适用场景")])]),t._v(" "),v("tr",[v("td",[t._v("点更新")]),t._v(" "),v("td",[t._v("时效性")]),t._v(" "),v("td",[t._v("预聚合")]),t._v(" "),v("td",[t._v("权限")]),t._v(" "),v("td",[t._v("Join")]),t._v(" "),v("td",[t._v("精确去重")]),t._v(" "),v("td",[t._v("视图")]),t._v(" "),v("td",[t._v("并发")]),t._v(" "),v("td",[t._v("运维难度")]),t._v(" "),v("td",[t._v("复杂度")])]),t._v(" "),v("tr",[v("td",[t._v("Kudu+Impala")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("秒级")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("列级")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("中")]),t._v(" "),v("td",[t._v("中")]),t._v(" "),v("td",[t._v("高（依赖Hive,Sentry,zk...）")]),t._v(" "),v("td",[t._v("实时olap")])]),t._v(" "),v("tr",[v("td",[t._v("ClickHouse")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("秒级")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("无")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("✔（bitmap）")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("低")]),t._v(" "),v("td",[t._v("高")]),t._v(" "),v("td",[t._v("高（依赖zk）")]),t._v(" "),v("td",[t._v("单表，日志分析")])]),t._v(" "),v("tr",[v("td",[t._v("Kylin")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("小时级")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("库级")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("✔（bitmap）")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("高")]),t._v(" "),v("td",[t._v("中")]),t._v(" "),v("td",[t._v("高（依赖HBase，Hive, HDFS）")]),t._v(" "),v("td",[t._v("固定维度预计算")])]),t._v(" "),v("tr",[v("td",[t._v("Doris")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("分钟级")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("表级")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("✔（bitmap）")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("高")]),t._v(" "),v("td",[t._v("低")]),t._v(" "),v("td",[t._v("低")]),t._v(" "),v("td",[t._v("实时olap")])]),t._v(" "),v("tr",[v("td",[t._v("Presto")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("小时级")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("无")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("✔")]),t._v(" "),v("td",[t._v("✖")]),t._v(" "),v("td",[t._v("中")]),t._v(" "),v("td",[t._v("低")]),t._v(" "),v("td",[t._v("低")]),t._v(" "),v("td",[t._v("Hive查询加速，多数据源")])])]),t._v(" "),v("h2",{attrs:{id:"olap选型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#olap选型"}},[t._v("$")]),t._v(" OLAP选型")]),t._v(" "),v("p",[t._v("结合OLAP引擎各自的优缺点，在我司应用的时候选型方案如下：")]),t._v(" "),v("ol",[v("li",[t._v("数据量在百万以下的时候用MySQL能扛得住，而且稳定性更高，简单易用")]),t._v(" "),v("li",[t._v("数据量比较大，并发低，时效性在小时级，查询明细的场景适合用ClickHouse，这种场景即时数据有更新也能应对")]),t._v(" "),v("li",[t._v("数据量比较大，天级或者小时级更新，只有聚合查询的场景适合用Kylin")]),t._v(" "),v("li",[t._v("数据量比较大，并发低，时效性要求分钟级，数据只有追加，适合用ClickHouse")]),t._v(" "),v("li",[t._v("数据量比较大，时效性要求分钟级，数据有更新，这种场景只能用kudu或者doris了")])]),t._v(" "),v("p",[t._v("需要说明的是，往下的场景也能覆盖往上的场景。")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"left"}},[t._v("数据量")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("时效性")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("查询类型")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("更新类型")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("并发")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("引擎")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("百万及以下")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("MySQL")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("千万及以上")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("天级、小时级")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("明细")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("?")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("ClickHouse")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("千万及以上")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("天级、小时级")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("聚合")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("Kylin")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("千万及以上")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("分钟级")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("追加")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("?")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("ClickHouse")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("千万及以上")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("分钟级")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("更新")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("Kudu|doris")])])])]),t._v(" "),v("h2",{attrs:{id:"olap引擎使用规范"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#olap引擎使用规范"}},[t._v("$")]),t._v(" OLAP引擎使用规范")]),t._v(" "),v("ul",[v("li",[v("p",[t._v("实时性不高的场景尽量使用Hive或者Spark")])]),t._v(" "),v("li",[v("p",[t._v("数据批量写入而不是单条写入")])]),t._v(" "),v("li",[v("p",[t._v("控制写入频率")])]),t._v(" "),v("li",[v("p",[t._v("禁止大批量数据导出到离线数仓，容易影响集群稳定性")])]),t._v(" "),v("li",[v("p",[t._v("OLAP引擎里做ETL任务要慎重，容易影响集群稳定性")])]),t._v(" "),v("li",[v("p",[t._v("禁止本地直连生产环境进行调试")])])]),t._v(" "),v("h2",{attrs:{id:"olap计算模型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#olap计算模型"}},[t._v("$")]),t._v(" OLAP计算模型")]),t._v(" "),v("img",{staticStyle:{zoom:"67%"},attrs:{src:_(326),alt:"image-20210905201219266"}}),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("计算模型")]),t._v(" "),v("th",[t._v("说明")]),t._v(" "),v("th",[t._v("优点")]),t._v(" "),v("th",[t._v("缺点")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("Scatter-Gather")]),t._v(" "),v("td",[t._v("相当于MapReduce中的一趟Map和Reduce，中间计算结果往往存储在内存中，通过网络直接交换。没有shuffle过程")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("无法完成大表Join，高基数聚合")])]),t._v(" "),v("tr",[v("td",[t._v("MapReduce")]),t._v(" "),v("td",[t._v("任务之间需要等待，中间数据落盘，多轮迭代")]),t._v(" "),v("td",[t._v("失败任务可以重试，适合大数据量ETL操作")]),t._v(" "),v("td",[t._v("慢")])]),t._v(" "),v("tr",[v("td",[t._v("MPP")]),t._v(" "),v("td",[t._v("流水线执行，数据内存传输")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("失败任务不可以重试")])])])]),t._v(" "),v("h3",{attrs:{id:"参考"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("$")]),t._v(" 参考")]),t._v(" "),v("p",[v("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/266402829",target:"_blank",rel:"noopener noreferrer"}},[t._v("第1章04节 | 常见开源OLAP技术架构对比"),v("OutboundLink")],1)]),t._v(" "),v("h2",{attrs:{id:"案例实践"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#案例实践"}},[t._v("$")]),t._v(" 案例实践")]),t._v(" "),v("h3",{attrs:{id:"有序漏斗-留存分析"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#有序漏斗-留存分析"}},[t._v("$")]),t._v(" 有序漏斗/留存分析")]),t._v(" "),v("p",[t._v("Apache Kylin中使用"),v("code",[t._v("intersect_count()")]),t._v("进行计算，参考：")]),t._v(" "),v("p",[v("a",{attrs:{href:"https://issues.apache.org/jira/browse/KYLIN-2088",target:"_blank",rel:"noopener noreferrer"}},[t._v("KYLIN-2088"),v("OutboundLink")],1)]),t._v(" "),v("p",[v("a",{attrs:{href:"http://kylin.apache.org/blog/2016/11/28/intersect-count/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Retention Or Conversion Rate Analyze in Apache Kylin"),v("OutboundLink")],1)]),t._v(" "),v("p",[v("a",{attrs:{href:"https://uzshare.com/view/790704",target:"_blank",rel:"noopener noreferrer"}},[t._v("用 Apache Kylin 做精准留存分析，对刷量 say『 No』！"),v("OutboundLink")],1)])])}),[],!1,null,null,null);v.default=e.exports}}]);