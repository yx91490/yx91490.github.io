# Debian和Ubuntu桌面使用总结

### Debian发布周期和各库的作用

[原文地址：http://my.oschina.net/u/1382972/blog/335983](http://my.oschina.net/u/1382972/blog/335983) 
官方参考：[https://wiki.debian.org/StableUpdates](https://wiki.debian.org/StableUpdates) 
[https://wiki.debian.org/Backports](https://wiki.debian.org/Backports) 
[https://www.debian.org/releases/proposed-updates.html](https://www.debian.org/releases/proposed-updates.html) 
[https://release.debian.org/proposed-updates/stable.html](https://release.debian.org/proposed-updates/stable.html)

#### Experimental 试验区

试验区存放需要试验的包，主要供开发者用。

#### Unstable 不稳定版

存放最新版本的包，供开发和使用者测试

#### Testing 测试版

包在不稳定版经过一段时间的评估测试后，慢慢成熟稳定，可以进入测试版。

由一个自动运行的程序根据一些质量标准自动添加到测试版：

1、没有bug，或比现在测试版中的版本少

2、在unstable中10天以上

3、可以成功在所有平台编译

4、依赖关系和测试版现有内容不冲突。

#### stable 稳定版

测试版经过一定时间后，在正式发布前逐渐由管理员冻结更改，形成一个新的稳定版。之前的稳定版被成为old-stable。

稳定版里的包通常不再增加功能，只提供安全更新和bug修复。

debian发布循环：不稳定版=>测试版=>稳定版

不稳定版的代号一直为sid

当前稳定版代号为wheezy

当前测试版代号为jessie

参考：

[http://debian-handbook.info/browse/stable/sect.release-lifecycle.html](http://debian-handbook.info/browse/stable/sect.release-lifecycle.html)

[https://wiki.debian.org/zh_CN/DebianReleases](https://wiki.debian.org/zh_CN/DebianReleases)

#### Point Releases 点发布

稳定版通常隔段时间推出点发布，提供安全更新和bug修复。

点发布包括了截止到发布时间的安全更新和一些重要的bug修正。

2009年开始通常每2个月更新一次。

最初，稳定版发布在版本号后加r0，之后的“点发布”递增r后数字。比如Debian Etch，从4.0r0开始。

到Debian Lenny时，规则改变，“点发布”使用“小版本号”表示，比如5.0.1中的1。

从Wheezy，规则又改变，“点发布”使用“次版本号”表示，比如7.1中的1。

参考： [https://wiki.debian.org/DebianReleases/PointReleases](https://wiki.debian.org/DebianReleases/PointReleases)

#### stable-proposed-updates

该apt库包括了正在为下一次“点发布”做准备的更新包文件。

该库不是正式稳定版(stable)的一部分，还需要被管理员和用户评估。

不过通常应该认为稳定性高于Testing, Backports。个人用户可以测试，但不推荐用在“正式服务器”上。

参考： 

[https://wiki.debian.org/StableProposedUpdates](https://wiki.debian.org/StableProposedUpdates)

[https://www.debian.org/doc/manuals/debian-faq/ch-getting.en.html](https://www.debian.org/doc/manuals/debian-faq/ch-getting.en.html)

#### stable-updates

stable-proposed-updates库中的一些包被提供在这个库中。这些包通常是用户希望在下一次“点发布”之前就能更新的包。比如病毒库，时区表数据等。这些包最后都会包括在下次“点发布”中。

参考： [https://wiki.debian.org/StableUpdates](https://wiki.debian.org/StableUpdates)

#### Security Updates

该库中包含了最新的安全更新包。

为了使安全更新能更快的应用到系统中。安全更新没有通常的mirror，而是使用DNS aliaes等效名(DNS aliaes)的方式提供了官方mirror。所以安全更新的源在source.list文件中的url部分通常都是固定的，即[http://security.debian.org/](http://security.debian.org/)，如下：

deb [http://security.debian.org/](http://security.debian.org/) stable/updates main contrib non-free

参考： [https://www.debian.org/security/faq#mirror](https://www.debian.org/security/faq#mirror)

#### stable-backports

这个库中存放了一些为稳定版重新编译的新版本包。因为当稳定版发布时间比较长时，很多软件有了新版本。使用Testing 和Unstable中的新版本包风险又比较大，所以包维护人有时会将新版本包针对稳定版重新编译，提供给用户使用。

但安装该库中的包时需要特别指出：

sudo apt-get install -t wheezy-backports package

### Ubuntu源各个库的发布周期

http://forum.ubuntu.org.cn/viewtopic.php?t=253103

简单的解释：

基础：由于ubuntu是每6个月发行一个新版，当发行后，所有软件包的版本在这六个月内将保持不变，即使是有新版都不更新。除开重要的安全补丁外，所有新功能和非安全性补丁将不会提供给用户更新。

security：仅修复漏洞，并且尽可能少的改变软件包的行为。低风险。

backports：backports 的团队则认为最好的更新策略是 security 策略加上新版本的软件（包括候选版本的）。但不会由Ubuntu security team审查和更新。

update：修复严重但不影响系统安全运行的漏洞，这类补丁在经过QA人员记录和验证后才提供，和security那类一样低风险。

proposed：update类的测试部分，仅建议提供测试和反馈的人进行安装。

个人认为：

1.重要的服务器：用发行版默认的、security 

2.当有要较新软件包才行能运作的服务器：用发行版默认的、 security、（backports 还是不适合） 

3.一般个人桌面：用发行版默认的、 security、backports、update

4.追求最新、能提供建议和反馈大虾：发行版默认的、 security、backports、update、proposed 全部用上！

摘自ubuntu中文论坛