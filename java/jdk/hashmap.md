# JDK1.7 HashMap实现原理

### 概念

`HashMap` 采用的数据结构 = **数组（主） + 单链表（副）** 

| 结构     | 描述                        |
| -------- | --------------------------- |
| 数组下标 | 经过处理的Key的hash值       |
| 数组元素 | 1个键值对，即一个链表头结点 |
| 数组大小 | HashMap容量(capacity)       |
| 每个链表 | 哈希表的桶(bucket)          |
| 链表节点 | 1个键值对                   |
| 链表长度 | 桶的大小                    |

链表主要用于解决hash冲突，这种方法称为链地址法

发生冲突时新元素总是添加到数组中，旧元素移动到单链表中

`Entry` 对象本质 = 1个键 - 值对，属性包括：键（ `key` ）、值（ `value`） & 下一个节点的指针( `next` ) 

容量(capacity)

| 概念     | 描述                                 |
| -------- | ------------------------------------ |
| 初始容量 | 哈希表创建时的容量                   |
| 默认容量 | 16                                   |
| 最大容量 | 1 << 30                              |
| 容量范围 | 必须是2的幂 & <最大容量（2的30次方） |

加载因子(loadFactor)

- HashMap在其容量自动增加前可达到多满的一种尺度。

- 默认加载因子 = 0.75
- 加载因子越大->填满的元素越多->空间利用率高->但冲突的机会加大、查找效率变低
- 加载因子越小->填满的元素越少->空间利用率小->冲突的机会减小、查找效率高

扩容阈值（threshold）
- 当哈希表的大小 ≥ 扩容阈值时，就会扩容哈希表（即扩充HashMap的容量）
- 扩容 = 对哈希表进行resize操作（即重建内部数据结构），从而哈希表将具有大约两倍的桶数
- 扩容阈值 = 容量 x 加载因子


1. 构造函数仅用于接收初始容量大小（ `capacity` ）、加载因子( `Load factor` )，但仍无真正初始化哈希表，即初始化存储数组 `table`，真正初始化哈希表（初始化存储数组 `table` ）是在第1次添加键值对时，即第1次调用 `put()` 时

### put流程

1. 若哈希表未初始化，则使用构造函数时设置的阈值(即初始容量)初始化数组table
2. 若key == null，则将该键-值存放到数组table中的第1个位置，即table [0]
3. 根据hash值最终获得key对应存放的数组Table中位置，
   - 若该key已存在（即 key-value已存在 ），则用新value 替换 旧value
   - 若该key不存在，则将“key-value”添加到table中

**初始化哈希表**: 初始化数组（ `table` ）、扩容阈值（ `threshold` ）

1. 将传入的容量大小转化为大于该值的最小的2的次幂
2. 重新计算阈值 threshold = 容量 * 加载因子  
3. 使用计算后的初始容量（已经是2的次幂） 初始化数组table（作为数组长度）

**put key == null的键值对**

1. 遍历以table[0]为首的链表，寻找是否存在key==null 对应的键值对
2. 若有则用新value 替换 旧value；同时返回旧的value值
3. 若无key==null的键，那么调用addEntry（），将空键对应的值封装到Entry中，并放到table[0]中

- `HashMap` 的键 `key` 可为 `null` （区别于 `HashTable` 的 `key` 不可为 `null` ）
- `HashMap` 的键 `key` 可为 `null` 且只能为1个，但值 `value` 可为null且为多个

**计算hash值**

1. 扰动函数,即使得根据key生成的哈希码（hash值）分布更加均匀、更具备随机性，避免出现hash值冲突（即指不同key但生成同1个hash值）
2. JDK 1.7 做了9次扰动处理 = 4次位运算 + 5次异或运算
3. JDK 1.8 只做了2次扰动 = 1次位运算 + 1次异或运算

采用 哈希码 与运算(&) （数组长度-1） 计算数组下标原因：

1. 提高取余的运算效率

2. 保证hash码的均匀性：

   设数组长度为奇数（最后一位是1）

   => 数组长度-1为偶数（最后一位是0）

   => hash码 & ( 数组长度-1) 结果最后一位是0

   => 存储位置为偶数，浪费一半的空间

**将不存在的key对应的“key-value”添加到数组table的对应位置中**

1.  插入前，先判断容量是否足够：键值对数量大于阈值
   - 若不足够，则进行扩容（2倍）、重新计算Hash值、重新计算存储数组下标
   - 若容量足够，则创建1个新的数组元素（Entry） 并放入到数组中

**扩容**

1. 若旧容量已经是系统默认最大容量了，那么将阈值设置成整型的最大值，退出
2. 根据新容量（2倍容量）新建1个数组，即新table 
3.  将旧数组上的数据（键值对）转移到新table中
   - 取得旧数组的每个元素 
   - 遍历以该数组元素为首的链表
   - 重新计算每个元素的存储位置
   - 采用单链表的头插入方式将元素放在数组上（扩容后，可能出现逆序：按旧链表的正序遍历链表、在新链表的头部依次插入）
4. 重新设置阈值

### get流程

1. 当key == null时，则到 以哈希表数组中的第1个元素（即table[0]）为头结点的链表去寻找对应 key == null的键
2.  当key ≠ null时，
   - 根据key值，通过hash（）计算出对应的hash值
   - 根据hash值计算出对应的数组下标
   - 遍历以该数组下标的数组元素为头结点的链表所有节点，寻找该key对应的值

### 其他问题

1. 为什么hashmap线程不安全？(modcount作用)

   - 无同步锁

   - 并发put导致扩容导致环形链表

     > 由于 `JDK 1.8` 转移数据操作 = **按旧链表的正序遍历链表、在新链表的尾部依次插入**，所以不会出现链表 **逆序、倒置**的情况，故不容易出现环形链表的情况。

2. 作为key的object需要实现那些方法？

