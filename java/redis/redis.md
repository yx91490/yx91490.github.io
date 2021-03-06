# Redis数据结构

### List

应谨慎使用的List相关命令：

**LINDEX**：返回指定List指定index上的元素，如果index越界，返回nil。index数值是回环的，即-1代表List最后一个位置，-2代表List倒数第二个位置。时间复杂度O(N)
**LSET**：将指定List指定index上的元素设置为value，如果index越界则返回错误，时间复杂度O(N)，如果操作的是头/尾部的元素，则时间复杂度为O(1)
**LINSERT**：向指定List中指定元素之前/之后插入一个新元素，并返回操作后的List长度。如果指定的元素不存在，返回-1。如果指定key不存在，不会进行任何操作，时间复杂度O(N)
由于Redis的List是链表结构的，上述的三个命令的算法效率较低，需要对List进行遍历，命令的耗时无法预估，在List长度大的情况下耗时会明显增加，应谨慎使用。

### Hash

应谨慎使用的Hash相关命令：

- **HGETALL**：返回指定Hash中所有的field-value对。返回结果为数组，数组中field和value交替出现。时间复杂度O(N)
- **HKEYS/HVALS**：返回指定Hash中所有的field/value，时间复杂度O(N)

上述三个命令都会对Hash进行完整遍历，Hash中的field数量与命令的耗时线性相关，对于尺寸不可预知的Hash，应严格避免使用上面三个命令，而改为使用HSCAN命令进行游标式的遍历，具体请见 https://redis.io/commands/scan

### set

慎用的Set相关命令：

**SMEMBERS**：返回指定Hash中所有的member，时间复杂度O(N)
**SUNION/SUNIONSTORE**：计算多个Set的并集并返回/存储至另一个Set中，时间复杂度O(N)，N为参与计算的所有集合的总member数
**SINTER/SINTERSTORE**：计算多个Set的交集并返回/存储至另一个Set中，时间复杂度O(N)，N为参与计算的所有集合的总member数
**SDIFF/SDIFFSTORE**：计算1个Set与1或多个Set的差集并返回/存储至另一个Set中，时间复杂度O(N)，N为参与计算的所有集合的总member数
上述几个命令涉及的计算量大，应谨慎使用，特别是在参与计算的Set尺寸不可知的情况下，应严格避免使用。可以考虑通过SSCAN命令遍历获取相关Set的全部member（具体请见 https://redis.io/commands/scan ），如果需要做并集/交集/差集计算，可以在客户端进行，或在不服务实时查询请求的Slave上进行。

### zset

慎用的Sorted Set相关命令：

**ZRANGE/ZREVRANGE**：返回指定Sorted Set中指定排名范围内的所有member，ZRANGE为按score升序排序，ZREVRANGE为按score降序排序，时间复杂度O(log(N)+M)，M为本次返回的member数
**ZRANGEBYSCORE/ZREVRANGEBYSCORE**：返回指定Sorted Set中指定score范围内的所有member，返回结果以升序/降序排序，min和max可以指定为-inf和+inf，代表返回所有的member。时间复杂度O(log(N)+M)
**ZREMRANGEBYRANK/ZREMRANGEBYSCORE**：移除Sorted Set中指定排名范围/指定score范围内的所有member。时间复杂度O(log(N)+M)
上述几个命令，应尽量避免传递[0 -1]或[-inf +inf]这样的参数，来对Sorted Set做一次性的完整遍历，特别是在Sorted Set的尺寸不可预知的情况下。可以通过ZSCAN命令来进行游标式的遍历（具体请见 https://redis.io/commands/scan ），或通过LIMIT参数来限制返回member的数量（适用于ZRANGEBYSCORE和ZREVRANGEBYSCORE命令），以实现游标式的遍历。
