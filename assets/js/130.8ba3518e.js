(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{556:function(v,_,t){"use strict";t.r(_);var l=t(10),a=Object(l.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"jdk1-7-hashmap实现原理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#jdk1-7-hashmap实现原理"}},[v._v("$")]),v._v(" JDK1.7 HashMap实现原理")]),v._v(" "),_("h3",{attrs:{id:"概念"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[v._v("$")]),v._v(" 概念")]),v._v(" "),_("p",[_("code",[v._v("HashMap")]),v._v(" 采用的数据结构 = "),_("strong",[v._v("数组（主） + 单链表（副）")])]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("结构")]),v._v(" "),_("th",[v._v("描述")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("数组下标")]),v._v(" "),_("td",[v._v("经过处理的Key的hash值")])]),v._v(" "),_("tr",[_("td",[v._v("数组元素")]),v._v(" "),_("td",[v._v("1个键值对，即一个链表头结点")])]),v._v(" "),_("tr",[_("td",[v._v("数组大小")]),v._v(" "),_("td",[v._v("HashMap容量(capacity)")])]),v._v(" "),_("tr",[_("td",[v._v("每个链表")]),v._v(" "),_("td",[v._v("哈希表的桶(bucket)")])]),v._v(" "),_("tr",[_("td",[v._v("链表节点")]),v._v(" "),_("td",[v._v("1个键值对")])]),v._v(" "),_("tr",[_("td",[v._v("链表长度")]),v._v(" "),_("td",[v._v("桶的大小")])])])]),v._v(" "),_("p",[v._v("链表主要用于解决hash冲突，这种方法称为链地址法")]),v._v(" "),_("p",[v._v("发生冲突时新元素总是添加到数组中，旧元素移动到单链表中")]),v._v(" "),_("p",[_("code",[v._v("Entry")]),v._v(" 对象本质 = 1个键 - 值对，属性包括：键（ "),_("code",[v._v("key")]),v._v(" ）、值（ "),_("code",[v._v("value")]),v._v("） & 下一个节点的指针( "),_("code",[v._v("next")]),v._v(" )")]),v._v(" "),_("p",[v._v("容量(capacity)")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("概念")]),v._v(" "),_("th",[v._v("描述")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("初始容量")]),v._v(" "),_("td",[v._v("哈希表创建时的容量")])]),v._v(" "),_("tr",[_("td",[v._v("默认容量")]),v._v(" "),_("td",[v._v("16")])]),v._v(" "),_("tr",[_("td",[v._v("最大容量")]),v._v(" "),_("td",[v._v("1 << 30")])]),v._v(" "),_("tr",[_("td",[v._v("容量范围")]),v._v(" "),_("td",[v._v("必须是2的幂 & <最大容量（2的30次方）")])])])]),v._v(" "),_("p",[v._v("加载因子(loadFactor)")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("HashMap在其容量自动增加前可达到多满的一种尺度。")])]),v._v(" "),_("li",[_("p",[v._v("默认加载因子 = 0.75")])]),v._v(" "),_("li",[_("p",[v._v("加载因子越大->填满的元素越多->空间利用率高->但冲突的机会加大、查找效率变低")])]),v._v(" "),_("li",[_("p",[v._v("加载因子越小->填满的元素越少->空间利用率小->冲突的机会减小、查找效率高")])])]),v._v(" "),_("p",[v._v("扩容阈值（threshold）")]),v._v(" "),_("ul",[_("li",[v._v("当哈希表的大小 ≥ 扩容阈值时，就会扩容哈希表（即扩充HashMap的容量）")]),v._v(" "),_("li",[v._v("扩容 = 对哈希表进行resize操作（即重建内部数据结构），从而哈希表将具有大约两倍的桶数")]),v._v(" "),_("li",[v._v("扩容阈值 = 容量 x 加载因子")])]),v._v(" "),_("ol",[_("li",[v._v("构造函数仅用于接收初始容量大小（ "),_("code",[v._v("capacity")]),v._v(" ）、加载因子( "),_("code",[v._v("Load factor")]),v._v(" )，但仍无真正初始化哈希表，即初始化存储数组 "),_("code",[v._v("table")]),v._v("，真正初始化哈希表（初始化存储数组 "),_("code",[v._v("table")]),v._v(" ）是在第1次添加键值对时，即第1次调用 "),_("code",[v._v("put()")]),v._v(" 时")])]),v._v(" "),_("h3",{attrs:{id:"put流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#put流程"}},[v._v("$")]),v._v(" put流程")]),v._v(" "),_("ol",[_("li",[v._v("若哈希表未初始化，则使用构造函数时设置的阈值(即初始容量)初始化数组table")]),v._v(" "),_("li",[v._v("若key == null，则将该键-值存放到数组table中的第1个位置，即table [0]")]),v._v(" "),_("li",[v._v("根据hash值最终获得key对应存放的数组Table中位置，\n"),_("ul",[_("li",[v._v("若该key已存在（即 key-value已存在 ），则用新value 替换 旧value")]),v._v(" "),_("li",[v._v("若该key不存在，则将“key-value”添加到table中")])])])]),v._v(" "),_("p",[_("strong",[v._v("初始化哈希表")]),v._v(": 初始化数组（ "),_("code",[v._v("table")]),v._v(" ）、扩容阈值（ "),_("code",[v._v("threshold")]),v._v(" ）")]),v._v(" "),_("ol",[_("li",[v._v("将传入的容量大小转化为大于该值的最小的2的次幂")]),v._v(" "),_("li",[v._v("重新计算阈值 threshold = 容量 * 加载因子")]),v._v(" "),_("li",[v._v("使用计算后的初始容量（已经是2的次幂） 初始化数组table（作为数组长度）")])]),v._v(" "),_("p",[_("strong",[v._v("put key == null的键值对")])]),v._v(" "),_("ol",[_("li",[v._v("遍历以table[0]为首的链表，寻找是否存在key==null 对应的键值对")]),v._v(" "),_("li",[v._v("若有则用新value 替换 旧value；同时返回旧的value值")]),v._v(" "),_("li",[v._v("若无key==null的键，那么调用addEntry（），将空键对应的值封装到Entry中，并放到table[0]中")])]),v._v(" "),_("ul",[_("li",[_("code",[v._v("HashMap")]),v._v(" 的键 "),_("code",[v._v("key")]),v._v(" 可为 "),_("code",[v._v("null")]),v._v(" （区别于 "),_("code",[v._v("HashTable")]),v._v(" 的 "),_("code",[v._v("key")]),v._v(" 不可为 "),_("code",[v._v("null")]),v._v(" ）")]),v._v(" "),_("li",[_("code",[v._v("HashMap")]),v._v(" 的键 "),_("code",[v._v("key")]),v._v(" 可为 "),_("code",[v._v("null")]),v._v(" 且只能为1个，但值 "),_("code",[v._v("value")]),v._v(" 可为null且为多个")])]),v._v(" "),_("p",[_("strong",[v._v("计算hash值")])]),v._v(" "),_("ol",[_("li",[v._v("扰动函数,即使得根据key生成的哈希码（hash值）分布更加均匀、更具备随机性，避免出现hash值冲突（即指不同key但生成同1个hash值）")]),v._v(" "),_("li",[v._v("JDK 1.7 做了9次扰动处理 = 4次位运算 + 5次异或运算")]),v._v(" "),_("li",[v._v("JDK 1.8 只做了2次扰动 = 1次位运算 + 1次异或运算")])]),v._v(" "),_("p",[v._v("采用 哈希码 与运算(&) （数组长度-1） 计算数组下标原因：")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("提高取余的运算效率")])]),v._v(" "),_("li",[_("p",[v._v("保证hash码的均匀性：")]),v._v(" "),_("p",[v._v("设数组长度为奇数（最后一位是1）")]),v._v(" "),_("p",[v._v("=> 数组长度-1为偶数（最后一位是0）")]),v._v(" "),_("p",[v._v("=> hash码 & ( 数组长度-1) 结果最后一位是0")]),v._v(" "),_("p",[v._v("=> 存储位置为偶数，浪费一半的空间")])])]),v._v(" "),_("p",[_("strong",[v._v("将不存在的key对应的“key-value”添加到数组table的对应位置中")])]),v._v(" "),_("ol",[_("li",[v._v("插入前，先判断容量是否足够：键值对数量大于阈值")])]),v._v(" "),_("ul",[_("li",[v._v("若不足够，则进行扩容（2倍）、重新计算Hash值、重新计算存储数组下标")]),v._v(" "),_("li",[v._v("若容量足够，则创建1个新的数组元素（Entry） 并放入到数组中")])]),v._v(" "),_("p",[_("strong",[v._v("扩容")])]),v._v(" "),_("ol",[_("li",[v._v("若旧容量已经是系统默认最大容量了，那么将阈值设置成整型的最大值，退出")]),v._v(" "),_("li",[v._v("根据新容量（2倍容量）新建1个数组，即新table")]),v._v(" "),_("li",[v._v("将旧数组上的数据（键值对）转移到新table中")])]),v._v(" "),_("ul",[_("li",[v._v("取得旧数组的每个元素")]),v._v(" "),_("li",[v._v("遍历以该数组元素为首的链表")]),v._v(" "),_("li",[v._v("重新计算每个元素的存储位置")]),v._v(" "),_("li",[v._v("采用单链表的头插入方式将元素放在数组上（扩容后，可能出现逆序：按旧链表的正序遍历链表、在新链表的头部依次插入）")])]),v._v(" "),_("ol",{attrs:{start:"4"}},[_("li",[v._v("重新设置阈值")])]),v._v(" "),_("h3",{attrs:{id:"get流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#get流程"}},[v._v("$")]),v._v(" get流程")]),v._v(" "),_("ol",[_("li",[v._v("当key == null时，则到 以哈希表数组中的第1个元素（即table[0]）为头结点的链表去寻找对应 key == null的键")]),v._v(" "),_("li",[v._v("当key ≠ null时，")])]),v._v(" "),_("ul",[_("li",[v._v("根据key值，通过hash（）计算出对应的hash值")]),v._v(" "),_("li",[v._v("根据hash值计算出对应的数组下标")]),v._v(" "),_("li",[v._v("遍历以该数组下标的数组元素为头结点的链表所有节点，寻找该key对应的值")])]),v._v(" "),_("h3",{attrs:{id:"其他问题"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#其他问题"}},[v._v("$")]),v._v(" 其他问题")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("为什么hashmap线程不安全？(modcount作用)")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("无同步锁")])]),v._v(" "),_("li",[_("p",[v._v("并发put导致扩容导致环形链表")]),v._v(" "),_("blockquote",[_("p",[v._v("由于 "),_("code",[v._v("JDK 1.8")]),v._v(" 转移数据操作 = "),_("strong",[v._v("按旧链表的正序遍历链表、在新链表的尾部依次插入")]),v._v("，所以不会出现链表 "),_("strong",[v._v("逆序、倒置")]),v._v("的情况，故不容易出现环形链表的情况。")])])])])]),v._v(" "),_("li",[_("p",[v._v("作为key的object需要实现那些方法？")])])])])}),[],!1,null,null,null);_.default=a.exports}}]);