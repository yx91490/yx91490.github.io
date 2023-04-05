(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{582:function(a,t,s){"use strict";s.r(t);var e=s(10),r=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h3",{attrs:{id:"代码调试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#代码调试"}},[a._v("$")]),a._v(" 代码调试")]),a._v(" "),t("ol",[t("li",[a._v("sqoop命令参数加上"),t("code",[a._v("--verbose")]),a._v("，将sqoop日志调整为debug级别")]),a._v(" "),t("li",[a._v("sqoop命令参数加上"),t("code",[a._v("-Dmapreduce.map.log.level=DEBUG -Dmapreduce.reduce.log.level=DEBUG -Dyarn.app.mapreduce.am.log.level=DEBUG")]),a._v("，将MR日志调整为debug级别")])]),a._v(" "),t("blockquote",[t("p",[a._v("https://community.hortonworks.com/articles/41065/changing-the-log4j-debug-with-hadoop-jar-in-mapred.html")])]),a._v(" "),t("h3",{attrs:{id:"sqoop常见场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sqoop常见场景"}},[a._v("$")]),a._v(" sqoop常见场景")]),a._v(" "),t("ol",[t("li",[a._v("分库分表")]),a._v(" "),t("li",[a._v("有无分区")]),a._v(" "),t("li",[a._v("字段选择")]),a._v(" "),t("li",[a._v("查询条件")]),a._v(" "),t("li",[a._v("存储类型")]),a._v(" "),t("li",[a._v("null值处理")]),a._v(" "),t("li",[a._v("数据校验？？？")]),a._v(" "),t("li",[a._v("增量导入？？？")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("sqoop "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("import")]),a._v("  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--connect")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'jdbc:mysql://'")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--username")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("''")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--password")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("''")]),a._v("  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-m")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--table")]),a._v(" multi_type_db  --hive-drop-import-delims --target-dir /tmp "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--append")]),a._v("  --fields-terminated-by "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),t("span",{pre:!0,attrs:{class:"token entity",title:"\\001"}},[a._v("\\001")]),a._v('"')]),a._v("\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[a._v("abc^Aa^A2019-02-21 11:33:44.0^A2018-03-04^A1^A123^A345^A45.66^A67.89^A9\nnull^Anull^Anull^Anull^Anull^Anull^Anull^Anull^Anull^Anull\n")])])]),t("div",{staticClass:"language-sql extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("select")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("from")]),a._v(" tmp"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("multi_type \n\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("where")]),a._v(" col_varchar "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" col_char "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" col_timestamp "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" col_date "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" col_bool "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" id_int "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" id_bigint "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" col_float "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" col_decimal "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),a._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("and")]),a._v(" col_smallint "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("is")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),t("h3",{attrs:{id:"sqoop原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sqoop原理"}},[a._v("$")]),a._v(" sqoop原理")]),a._v(" "),t("h3",{attrs:{id:"sqoop类型映射"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sqoop类型映射"}},[a._v("$")]),a._v(" sqoop类型映射")]),a._v(" "),t("p",[a._v("参考资料：")]),a._v(" "),t("blockquote",[t("p",[t("a",{attrs:{href:"https://sqoop.apache.org/docs/1.4.6/SqoopUserGuide.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("Sqoop User Guide (v1.4.6)"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/39113492",target:"_blank",rel:"noopener noreferrer"}},[a._v("Sqoop 使用指南"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("a",{attrs:{href:"https://ask.hellobi.com/blog/marsj/4114",target:"_blank",rel:"noopener noreferrer"}},[a._v("Sqoop 1.4.6 导入实战 (RDB含MySQL和Oracle)"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/42239286",target:"_blank",rel:"noopener noreferrer"}},[a._v("重要 | mr使用hcatalog读写hive"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("a",{attrs:{href:"https://my.oschina.net/crxy/blog/417890",target:"_blank",rel:"noopener noreferrer"}},[a._v("mapreduce job所需要的各种参数在Sqoop中的实现 原"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("a",{attrs:{href:"https://my.oschina.net/osenlin/blog/1600141",target:"_blank",rel:"noopener noreferrer"}},[a._v("源码剖析-sqoop与datax的对比"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);