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