(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{352:function(_,v,t){_.exports=t.p+"assets/img/image-20210821232241541.a02472eb.png"},466:function(_,v,t){"use strict";t.r(v);var a=t(10),r=Object(a.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"doris笔记"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#doris笔记"}},[_._v("$")]),_._v(" Doris笔记")]),_._v(" "),v("h2",{attrs:{id:"核心特性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#核心特性"}},[_._v("$")]),_._v(" 核心特性")]),_._v(" "),v("h3",{attrs:{id:"极致性能"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#极致性能"}},[_._v("$")]),_._v(" 极致性能")]),_._v(" "),v("p",[_._v("高效列式存储引擎")]),_._v(" "),v("p",[_._v("现代化MPP架构")]),_._v(" "),v("p",[_._v("向量化执行引擎")]),_._v(" "),v("p",[_._v("智能物化视图")]),_._v(" "),v("p",[_._v("优秀的Join表现")]),_._v(" "),v("p",[_._v("高并发")]),_._v(" "),v("h3",{attrs:{id:"简单易用"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#简单易用"}},[_._v("$")]),_._v(" 简单易用")]),_._v(" "),v("p",[_._v("支持 ANSI SQL")]),_._v(" "),v("p",[_._v("兼容MySQL协议")]),_._v(" "),v("p",[_._v("灵活的数据模型")]),_._v(" "),v("p",[_._v("在线表结构变更？")]),_._v(" "),v("p",[_._v("Bitmap索引精确去重")]),_._v(" "),v("h3",{attrs:{id:"流批一体"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#流批一体"}},[_._v("$")]),_._v(" 流批一体")]),_._v(" "),v("p",[_._v("批量和实时流式数据导入")]),_._v(" "),v("p",[_._v("行级数据更新/删除")]),_._v(" "),v("p",[_._v("MVCC机制解决读写冲突")]),_._v(" "),v("p",[_._v("导入支持事务，保证ACID")]),_._v(" "),v("p",[_._v("实现Exactly-Once语义")]),_._v(" "),v("h3",{attrs:{id:"极简运维"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#极简运维"}},[_._v("$")]),_._v(" 极简运维")]),_._v(" "),v("p",[_._v("无外部依赖")]),_._v(" "),v("p",[_._v("集群规模弹性伸缩")]),_._v(" "),v("p",[_._v("任何节点可线性扩展")]),_._v(" "),v("p",[_._v("无代码即可完成运维")]),_._v(" "),v("h3",{attrs:{id:"可用性高"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#可用性高"}},[_._v("$")]),_._v(" 可用性高")]),_._v(" "),v("p",[_._v("主节点高可用")]),_._v(" "),v("p",[_._v("数据多副本存储")]),_._v(" "),v("p",[_._v("节点故障自动迁移")]),_._v(" "),v("p",[_._v("自动请求路由")]),_._v(" "),v("p",[_._v("数据分片自动均衡")]),_._v(" "),v("h3",{attrs:{id:"生态丰富"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#生态丰富"}},[_._v("$")]),_._v(" 生态丰富")]),_._v(" "),v("p",[_._v("BOS/HDFS/Kafka等数据无缝导入")]),_._v(" "),v("p",[_._v("Spark联邦数据分析")]),_._v(" "),v("p",[_._v("为ES提供分布式SQL查询")]),_._v(" "),v("p",[_._v("主流工具适配")]),_._v(" "),v("h2",{attrs:{id:"架构"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#架构"}},[_._v("$")]),_._v(" 架构")]),_._v(" "),v("p",[_._v("主从架构，不依赖其他组件。")]),_._v(" "),v("p",[_._v("FE负责解析、生成、调度执行计划，存储元数据")]),_._v(" "),v("p",[_._v("BE负责执行查询计划、数据存储")]),_._v(" "),v("p",[_._v("任何节点可线性扩展")]),_._v(" "),v("h2",{attrs:{id:"数据模型与物化视图"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#数据模型与物化视图"}},[_._v("$")]),_._v(" 数据模型与物化视图")]),_._v(" "),v("h2",{attrs:{id:"join"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#join"}},[_._v("$")]),_._v(" Join")]),_._v(" "),v("h3",{attrs:{id:"物理算子"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#物理算子"}},[_._v("$")]),_._v(" 物理算子")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",[_._v("物理算子")]),_._v(" "),v("th",[_._v("性能")]),_._v(" "),v("th",[_._v("场景")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("Hash Join")]),_._v(" "),v("td",[_._v("快")]),_._v(" "),v("td",[_._v("等值Join")])]),_._v(" "),v("tr",[v("td",[_._v("Nest Loop Join")]),_._v(" "),v("td",[_._v("慢")]),_._v(" "),v("td",[_._v("不等值Join或笛卡尔积")])])])]),_._v(" "),v("h3",{attrs:{id:"shuffle方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#shuffle方式"}},[_._v("$")]),_._v(" shuffle方式")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("存在S与R join操作")])]),_._v(" "),v("li",[v("p",[_._v("N表示参与join计算的instance数")])]),_._v(" "),v("li",[v("p",[_._v("T表示关系的tuple数目")])])]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",[_._v("Shuffle方式")]),_._v(" "),v("th",[_._v("网络开销")]),_._v(" "),v("th",[_._v("物理算子")]),_._v(" "),v("th",[_._v("适用场景")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("BroadCast Join")]),_._v(" "),v("td",[_._v("N * T(R)")]),_._v(" "),v("td",[_._v("Hash Join/Nest Loop Join")]),_._v(" "),v("td",[_._v("通用")])]),_._v(" "),v("tr",[v("td",[_._v("Shuffle Join")]),_._v(" "),v("td",[_._v("T(S) + T(R)")]),_._v(" "),v("td",[_._v("Hash Join")]),_._v(" "),v("td",[_._v("通用")])]),_._v(" "),v("tr",[v("td",[_._v("Bucket Shuffle Join")]),_._v(" "),v("td",[_._v("T(R)")]),_._v(" "),v("td",[_._v("Hash Join")]),_._v(" "),v("td",[_._v("Join条件中存在左表的分布式列，且左表执行时为单分区")])]),_._v(" "),v("tr",[v("td",[_._v("Colocate Join")]),_._v(" "),v("td",[_._v("0")]),_._v(" "),v("td",[_._v("Hash Join")]),_._v(" "),v("td",[_._v("Join条件中存在左表的分布式列，且左右表同属于一个Colocate Group")])])])]),_._v(" "),v("h3",{attrs:{id:"动态分区裁剪"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#动态分区裁剪"}},[_._v("$")]),_._v(" 动态分区裁剪")]),_._v(" "),v("p",[_._v("Hash Join右表构建Hash表时生成过滤条件，下推到左表。支持三种类型：IN，Bloom Filter，MinMax。")]),_._v(" "),v("p",[_._v("MinMax/BloomFilter在shuffle join的时候需要合并")]),_._v(" "),v("p",[_._v("Key列的过滤条件会下推到存储引擎，提升延迟物化效果")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",[_._v("Runtime Filter")]),_._v(" "),v("th",[_._v("优点")]),_._v(" "),v("th",[_._v("缺点")]),_._v(" "),v("th",[_._v("适用场景")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("IN")]),_._v(" "),v("td",[_._v("开销小，效果显著")]),_._v(" "),v("td",[_._v("右表超过一定数据量后失效")]),_._v(" "),v("td",[_._v("Broadcast Join")])]),_._v(" "),v("tr",[v("td",[_._v("MinMax")]),_._v(" "),v("td",[_._v("开销相对较小")]),_._v(" "),v("td",[_._v("仅对数值类型有较好效果")]),_._v(" "),v("td",[_._v("通用")])]),_._v(" "),v("tr",[v("td",[_._v("BloomFilter")]),_._v(" "),v("td",[_._v("适用各种类型，效果好")]),_._v(" "),v("td",[_._v("配置复杂，代价高")]),_._v(" "),v("td",[_._v("通用")])])])]),_._v(" "),v("img",{staticStyle:{zoom:"50%"},attrs:{src:t(352),alt:"image-20210821232241541"}}),_._v(" "),v("h3",{attrs:{id:"join-reorder"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#join-reorder"}},[_._v("$")]),_._v(" Join Reorder")]),_._v(" "),v("p",[_._v("多表join的时候join顺序对性能影响比较大：")]),_._v(" "),v("ol",[v("li",[_._v("优先大表与小表做join")]),_._v(" "),v("li",[_._v("尽量前置有条件列的表")]),_._v(" "),v("li",[_._v("Hash Join优先级高于Nest Loop Join")])]),_._v(" "),v("h3",{attrs:{id:"调优实践"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#调优实践"}},[_._v("$")]),_._v(" 调优实践")]),_._v(" "),v("p",[_._v("Join调优方法论：")]),_._v(" "),v("ol",[v("li",[_._v("根据Doris执行的Profile信息进行瓶颈定位")]),_._v(" "),v("li",[_._v("通过Doris的join机制，分析可能的优化方式")]),_._v(" "),v("li",[_._v("利用Session变量改变Join行为，进行调优")]),_._v(" "),v("li",[_._v("分析Query Plan验证调优是否生效")]),_._v(" "),v("li",[_._v("如果不奏效，需要改写Join语句/调整数据分布")])]),_._v(" "),v("p",[_._v("Join调优案例：")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",[_._v("案例")]),_._v(" "),v("th",[_._v("问题定位")]),_._v(" "),v("th",[_._v("调整")]),_._v(" "),v("th",[_._v("效果")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("右表为大表，左表为小表")]),_._v(" "),v("td",[_._v("查看Profile")]),_._v(" "),v("td",[_._v("开启Join reorder")]),_._v(" "),v("td",[_._v("14s -> 3.5s")])]),_._v(" "),v("tr",[v("td",[_._v("RuntimeFilter没有生效")]),_._v(" "),v("td",[_._v("查看Profile过滤效果比较好，查看Query Plan发现IN filter没有生效")]),_._v(" "),v("td",[_._v("改为BloomFilter")]),_._v(" "),v("td",[_._v("44s -> 13s")])]),_._v(" "),v("tr",[v("td",[_._v("右表大表，过滤后变小表")]),_._v(" "),v("td",[_._v("查看Profile发现右表为大表，却选择了Broadcast Join")]),_._v(" "),v("td",[_._v("使用Hint改为Shuffle Join")]),_._v(" "),v("td",[_._v("4min -> 9s")])])])]),_._v(" "),v("p",[_._v("最佳实践原则：")]),_._v(" "),v("ul",[v("li",[_._v("Join列尽量使用相同类型/简单类型/Key列：减少Cast，尽可能谓词下推")]),_._v(" "),v("li",[_._v("大表之间Join尽量使用Colocate Join")]),_._v(" "),v("li",[_._v("合理使用RuntimeFilter：过滤高的场景显著，某些场景有副作用，建议以SQL为粒度开启")]),_._v(" "),v("li",[_._v("判断Join顺序合理性：尽量确保左表为大表，右表为小表，必要时候使用Hint调整")])]),_._v(" "),v("h3",{attrs:{id:"参考"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[_._v("$")]),_._v(" 参考")]),_._v(" "),v("p",[v("a",{attrs:{href:"https://www.slidestalk.com/Baiyulan/ApacheDorisJoin70066?video",target:"_blank",rel:"noopener noreferrer"}},[_._v("Apache Doris 的Join实现与调优技巧实践"),v("OutboundLink")],1)]),_._v(" "),v("p",[v("a",{attrs:{href:"https://doris.apache.org/master/zh-CN/administrator-guide/colocation-join.html",target:"_blank",rel:"noopener noreferrer"}},[_._v("Colocation Join"),v("OutboundLink")],1)]),_._v(" "),v("p",[v("a",{attrs:{href:"https://doris.apache.org/master/zh-CN/administrator-guide/bucket-shuffle-join.html",target:"_blank",rel:"noopener noreferrer"}},[_._v("Bucket Shuffle Join"),v("OutboundLink")],1)]),_._v(" "),v("p",[v("a",{attrs:{href:"https://doris.apache.org/master/zh-CN/administrator-guide/runtime-filter.html",target:"_blank",rel:"noopener noreferrer"}},[_._v("Runtime Filter"),v("OutboundLink")],1)]),_._v(" "),v("h2",{attrs:{id:"导入机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#导入机制"}},[_._v("$")]),_._v(" 导入机制")]),_._v(" "),v("h3",{attrs:{id:"一致性语义"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#一致性语义"}},[_._v("$")]),_._v(" 一致性语义")]),_._v(" "),v("h3",{attrs:{id:"事务和两阶段提交"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#事务和两阶段提交"}},[_._v("$")]),_._v(" 事务和两阶段提交")]),_._v(" "),v("ol",[v("li",[_._v("FE充当协调者")]),_._v(" "),v("li",[_._v("Prepare阶段下发任务和写入数据")]),_._v(" "),v("li",[_._v("Submit阶段\n"),v("ol",[v("li",[_._v("数据状态改为Committed")]),_._v(" "),v("li",[_._v("publish版本")]),_._v(" "),v("li",[_._v("状态改为visiable")])])])]),_._v(" "),v("h3",{attrs:{id:"doris实现"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#doris实现"}},[_._v("$")]),_._v(" Doris实现")]),_._v(" "),v("p",[_._v("Phase1 FE Leader：")]),_._v(" "),v("ol",[v("li",[_._v("创建事务")]),_._v(" "),v("li",[_._v("规划导入执行计划")]),_._v(" "),v("li",[_._v("分发子任务")])]),_._v(" "),v("p",[_._v("Phase1 BE：")]),_._v(" "),v("ol",[v("li",[_._v("接受查询计划")]),_._v(" "),v("li",[_._v("初始化ScanNode")]),_._v(" "),v("li",[_._v("初始化TableSink和Table writer")]),_._v(" "),v("li",[_._v("ETL")]),_._v(" "),v("li",[_._v("汇报导入结果")])]),_._v(" "),v("p",[_._v("Phase 2 Publish：")]),_._v(" "),v("ol",[v("li",[_._v("收集导入任务汇报结果")]),_._v(" "),v("li",[_._v("发送Publish消息")]),_._v(" "),v("li",[_._v("事务状态改为Committed")]),_._v(" "),v("li",[_._v("等待BE返回")]),_._v(" "),v("li",[_._v("修改BE元数据，版本加1")]),_._v(" "),v("li",[_._v("修改FE元数据，版本加1")]),_._v(" "),v("li",[_._v("事务状态改为Visible")])]),_._v(" "),v("p",[_._v("Rollback：")]),_._v(" "),v("ol",[v("li",[_._v("事务状态改为Abort")]),_._v(" "),v("li",[_._v("BE等待回收任务删除已写入数据")])]),_._v(" "),v("h3",{attrs:{id:"总结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[_._v("$")]),_._v(" 总结")]),_._v(" "),v("p",[_._v("多版本机制解决读写冲突")]),_._v(" "),v("p",[_._v("两阶段导入保证多表原子生效")]),_._v(" "),v("h3",{attrs:{id:"参考-2"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考-2"}},[_._v("$")]),_._v(" 参考")]),_._v(" "),v("p",[v("a",{attrs:{href:"https://www.slidestalk.com/AICUG/Doris59081?video",target:"_blank",rel:"noopener noreferrer"}},[_._v("Doris的数据导入机制以及原子性保证"),v("OutboundLink")],1)]),_._v(" "),v("h2",{attrs:{id:"索引"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#索引"}},[_._v("$")]),_._v(" 索引")]),_._v(" "),v("p",[_._v('查询时, 如果指定了维度列的等值条件或者范围条件, 并且这些条件中维度列可构成表维度列的前缀, 则可以利用数据的有序性, 使用range-scan快速锁定目标行. 例如: 对于表table1: (event_day, siteid, citycode, username)➜(pv); 当查询条件为event_day > 2020-09-18 and siteid = 2, 则可以使用范围查找; 如果指定条件为citycode = 4 and username in ["Andy", "Boby", "Christian", "DorisDB"], 则无法使用范围查找.')]),_._v(" "),v("p",[_._v("表中数据组织有主要由三部分构成:")]),_._v(" "),v("ol",[v("li",[_._v("shortkey index表:  表中数据每1024行, 构成一个逻辑block. 每个逻辑block在shortkey index表中存储一项索引, 内容为表的维度列的前缀, 并且不超过36字节.  shortkey index为稀疏索引, 用数据行的维度列的前缀查找索引表, 可以确定该行数据所在逻辑块的起始行号.")]),_._v(" "),v("li",[_._v("Per-column data block: 表中每一列数据按64KB分块存储,  数据块作为一个单位单独编码压缩, 也作为IO单位, 整体写回设备或者读出.")]),_._v(" "),v("li",[_._v("Per-column cardinal index:  表中的每列数据有各自的行号索引表,  列的数据块和行号索引项一一对应, 索引项由数据块的起始行号和数据块的位置和长度信息构成, 用数据行的行号查找行号索引表, 可以获取包含该行号的数据块所在位置, 读取目标数据块后, 可以进一步查找数据.")])]),_._v(" "),v("p",[_._v("由此可见, 查找维度列的前缀的查找过程为:  先查找shortkey index, 获得逻辑块的起始行号, 查找维度列的行号索引, 获得目标列的数据块, 读取数据块, 然后解压解码, 从数据块中找到维度列前缀对应的数据项.")]),_._v(" "),v("p",[_._v("列级别的索引技术:  Bloomfilter可快速判断数据块中不含所查找值, ZoneMap通过数据范围快速过滤待查找值, Bitmap索引可快速计算出枚举类型的列满足一定条件的行.")]),_._v(" "),v("p",[_._v("聚合模型能够join吗？聚合模型怎么回溯数据？")]),_._v(" "),v("p",[_._v("Bitmap索引：")]),_._v(" "),v("ol",[v("li",[_._v("对于明细模型，所有列都可以建Bitmap 索引；对于聚合模型，只有Key列可以建Bitmap 索引。")]),_._v(" "),v("li",[_._v("Bitmap索引, 应该在取值为枚举型, 取值大量重复, 较低基数, 并且用作等值条件查询或者可转化为等值条件查询的列上创建.")]),_._v(" "),v("li",[_._v("不支持对Float、Double、Decimal 类型的列建Bitmap 索引。")]),_._v(" "),v("li",[_._v("如果要查看某个查询是否命中了Bitmap索引，可以通过查询的Profile信息查看（TODO：加上查看Profile的链接）。")])]),_._v(" "),v("p",[_._v("Bloom filter索引：")]),_._v(" "),v("ul",[v("li",[_._v("不支持对Tinyint、Float、Double 类型的列建Bloom Filter索引。")]),_._v(" "),v("li",[_._v("Bloom Filter索引只对in和=过滤查询有加速效果。")]),_._v(" "),v("li",[_._v("如果要查看某个查询是否命中了Bloom Filter索引，可以通过查询的Profile信息查看（TODO：加上查看Profile的链接）。")])]),_._v(" "),v("p",[_._v("一个导入作业通常会分布在多个BE上执行，内存参数限制的是一个导入作业在单个BE上的内存使用，而不是在整个集群的内存使用。")]),_._v(" "),v("p",[_._v("索引类型：")]),_._v(" "),v("ul",[v("li",[_._v("OrdinalIndex：存放列的稀疏索引meta信息。")]),_._v(" "),v("li",[_._v("ZoneMapIndex：存放ZoneMap索引的meta信息，内容包括了最大值、最小值、是否有空值、是否没有非空值。SegmentZoneMap存放了全局的ZoneMap信息，PageZoneMaps则存放了每个页面的统计信息。")]),_._v(" "),v("li",[_._v("BitMapIndex：存放BitMap索引的meta信息，内容包括了BitMap类型，字典数据BitMap数据。")]),_._v(" "),v("li",[_._v("BloomFilterIndex：存放了BloomFilter索引信息。")])]),_._v(" "),v("h3",{attrs:{id:"bitmap"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#bitmap"}},[_._v("$")]),_._v(" Bitmap")])])}),[],!1,null,null,null);v.default=r.exports}}]);