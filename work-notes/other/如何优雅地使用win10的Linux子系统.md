[http://www.rehack.cn/techshare/devtools/842.html](http://www.rehack.cn/techshare/devtools/842.html) 
首先你要升级到win10周年更新版，然后安装linux子系统。 
win10的linux子系统给了我们一个将linux的强大的shell命令和windows的流畅界面结合的体验，让我们可以不用在windows上纠结虚拟机运行linux的卡顿，和在linux下缺少win下对应软件的尴尬。但是win10的cmd命令提示符和powershell都不能满足我对字体的一些要求，这让我去寻找更适合的bash客户端。

几经周折发现了一款不错的bash客户端软件 [cmder](http://cmder.net/)，它有两个版本，一个是自带模拟一些bash命令的版本，一个是简单的mini版本，我们只是用它来连接bash，当然选择mini版的。 
![ ](http://cmder.net/img/main.jpg)
![下载页面](http://img.blog.csdn.net/20160911224011107)

在cmder中复制和粘贴文字非常方便，选中文字按下回车键就是复制，鼠标右键就把文字粘贴上去。 
cmder的设置复杂到爆。默认设置有些不合我口味的地方。

通过ssh连接服务器的时候，会出现中文字体相互重叠的情况，这时去`设置>Main` 取消选择 `Compress long strings to fit space`。 
![取消字体重叠](http://img.blog.csdn.net/20160915161916780)

进入vim的时候会发现编辑模式左右箭头不好用了，会提示`d`,官方文档说要在启动时配置一下，进入 `设置>Startup>Startup options` 选择`Command line`,写上`bash -cur_console:p`, 这样问题解决，同时启动cmder时会直接进入bash。 
![vim](http://img.blog.csdn.net/20160915162513476)

默认cmder会在启动的时候检查更新并弹出烦人的提示框，我们可以去`设置>update>update settings` 取消startup前面的勾。 
![startup](http://img.blog.csdn.net/20160915162413219)