之前用的linux发行版是debian，但是考虑这个笔记本硬件太新，testing源不稳定，就准备安装个ubuntu。 

1. 首先在win10中使用磁盘管理的压缩卷分出一部分空闲分区来供ubuntu使用。来供ubuntu 
2. 在BIOS中把硬盘模式从RAID调成AHCI，否则ubuntu15.10识别不了硬盘。 

然后正常安装ubuntu,但是开机后发现wifi用不了,原因是没有驱动,可以按照下面的教程来做: 
[https://github.com/awesomebytes/ubuntu14_dell_xps13_9350](https://github.com/awesomebytes/ubuntu14_dell_xps13_9350)

但是之后出现了问题, 开机之后进不了图形界面,说缺少”intel_guc_ucode_init skl_guc_ver4.bin”.google了以下发现这是intel的固件,可以从以下地方下载到: 
[http://www.fishprogs.info/puppy/firmware/i915/skl_guc_ver4.bin](http://www.fishprogs.info/puppy/firmware/i915/skl_guc_ver4.bin)

至于怎样找到ubuntu发布的最新的内核可以看下面的教程: 
[http://sourcedigit.com/17921-how-to-install-linux-kernel-4-4-rc2-on-ubuntu/](http://sourcedigit.com/17921-how-to-install-linux-kernel-4-4-rc2-on-ubuntu/)