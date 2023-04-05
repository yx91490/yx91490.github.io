(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{574:function(s,t,a){"use strict";a.r(t);var e=a(10),r=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"redis实现分布式锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#redis实现分布式锁"}},[s._v("$")]),s._v(" Redis实现分布式锁")]),s._v(" "),t("h3",{attrs:{id:"加锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#加锁"}},[s._v("$")]),s._v(" 加锁")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v(" SET resource_name my_random_value NX PX "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("30000")]),s._v("\n")])])]),t("p",[s._v("这个命令仅在不存在key的时候才能被执行成功（NX选项），并且这个key有一个30秒的自动失效时间（PX属性）。这个key的值是“my_random_value”(一个随机值），这个值在所有的客户端必须是唯一的，所有同一key的获取者（竞争者）这个值都不能一样。")]),s._v(" "),t("h3",{attrs:{id:"解锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解锁"}},[s._v("$")]),s._v(" 解锁")]),s._v(" "),t("p",[s._v("value的值必须是随机数主要是为了更安全的释放锁，释放锁的时候使用脚本告诉Redis:只有key存在并且存储的值和我指定的值一样才能告诉我删除成功。可以通过以下Lua脚本实现：")]),s._v(" "),t("div",{staticClass:"language-lua extra-class"},[t("pre",{pre:!0,attrs:{class:"language-lua"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" redis"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("call")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"get"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("KEYS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" ARGV"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" redis"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("call")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"del"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("KEYS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("end")]),s._v("\n")])])]),t("p",[s._v("使用这种方式释放锁可以避免删除别的客户端获取成功的锁。举个例子：客户端A取得资源锁，但是紧接着被一个其他操作阻塞了，当客户端A运行完毕其他操作后要释放锁时，原来的锁早已超时并且被Redis自动释放，并且在这期间资源锁又被客户端B再次获取到。如果仅使用DEL命令将key删除，那么这种情况就会把客户端B的锁给删除掉。使用Lua脚本就不会存在这种情况，因为脚本仅会删除value等于客户端A的value的key（value相当于客户端的一个签名）。")]),s._v(" "),t("p",[s._v("key的失效时间，被称作“锁定有效期”。它不仅是key自动失效时间，而且还是一个客户端持有锁多长时间后可以被另外一个客户端重新获得。")]),s._v(" "),t("h3",{attrs:{id:"redlock"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#redlock"}},[s._v("$")]),s._v(" Redlock")]),s._v(" "),t("p",[s._v("在Redis的分布式环境中，我们假设有N个Redis master。这些节点完全互相独立，不存在主从复制或者其他集群协调机制。之前我们已经描述了在Redis单实例下怎么安全地获取和释放锁。我们确保将在每（N)个实例上使用此方法获取和释放锁。在这个样例中，我们假设有5个Redis master节点，这是一个比较合理的设置，所以我们需要在5台机器上面或者5台虚拟机上面运行这些实例，这样保证他们不会同时都宕掉。")]),s._v(" "),t("p",[s._v("为了取到锁，客户端应该执行以下操作:")]),s._v(" "),t("ol",[t("li",[s._v("获取当前Unix时间，以毫秒为单位。")]),s._v(" "),t("li",[s._v("依次尝试从N个实例，使用相同的key和随机值获取锁。在步骤2，当向Redis设置锁时,客户端应该设置一个网络连接和响应超时时间，这个超时时间应该小于锁的失效时间。例如你的锁自动失效时间为10秒，则超时时间应该在5-50毫秒之间。这样可以避免服务器端Redis已经挂掉的情况下，客户端还在死死地等待响应结果。如果服务器端没有在规定时间内响应，客户端应该尽快尝试另外一个Redis实例。")]),s._v(" "),t("li",[s._v("客户端使用当前时间减去开始获取锁时间（步骤1记录的时间）就得到获取锁使用的时间。当且仅当从大多数（这里是3个节点）的Redis节点都取到锁，并且使用的时间小于锁失效时间时，锁才算获取成功。")]),s._v(" "),t("li",[s._v("如果取到了锁，key的真正有效时间等于有效时间减去获取锁所使用的时间（步骤3计算的结果）。")]),s._v(" "),t("li",[s._v("如果因为某些原因，获取锁失败（"),t("em",[s._v("没有")]),s._v("在至少N/2+1个Redis实例取到锁或者取锁时间已经超过了有效时间），客户端应该在所有的Redis实例上进行解锁（即便某些Redis实例根本就没有加锁成功）。")])]),s._v(" "),t("h3",{attrs:{id:"失败时重试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#失败时重试"}},[s._v("$")]),s._v(" 失败时重试")]),s._v(" "),t("p",[s._v("当客户端无法取到锁时，应该在一个"),t("em",[s._v("随机")]),s._v("延迟后重试,防止多个客户端在"),t("em",[s._v("同时")]),s._v("抢夺同一资源的锁（这样会导致脑裂，没有人会取到锁）。同样，客户端取得大部分Redis实例锁所花费的时间越短，脑裂出现的概率就会越低（必要的重试），所以，理想情况一下，客户端应该同时（并发地）向所有Redis发送SET命令。")]),s._v(" "),t("p",[s._v("需要强调，当客户端从大多数Redis实例获取锁失败时，应该尽快地释放（部分）已经成功取到的锁，这样其他的客户端就不必非得等到锁过完“有效时间”才能取到（然而，如果已经存在网络分裂，客户端已经无法和Redis实例通信，此时就只能等待key的自动释放了，等于被惩罚了）。")]),s._v(" "),t("h3",{attrs:{id:"释放锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#释放锁"}},[s._v("$")]),s._v(" 释放锁")]),s._v(" "),t("p",[s._v("释放锁比较简单，向所有的Redis实例发送释放锁命令即可，不用关心之前有没有从Redis实例成功获取到锁.")])])}),[],!1,null,null,null);t.default=r.exports}}]);