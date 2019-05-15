```
$ netstat -nap |grep 80
$ netstat -tunlp |grep 80
```

对于netstat命令，你习惯的用法是哪一个？这么多参数究竟是什么意思？且听我慢慢叙来。 
从直觉上讲，第一条用法可以少打2个字母，这也算程序员偷懒的一种方法吧☺，但是带来的后果是你可能要多看一大堆可能你并不关心的输出，下面是输出的一部分：

```
tcp        1      1 10.252.55.104:53912     180.149.131.247:80      LAST_ACK    -                                     
tcp        1      1 10.252.55.104:58306     180.149.132.165:80      LAST_ACK    -                   
tcp        0      0 10.252.55.104:58032     106.38.179.33:443       CLOSE_WAIT  14073/chrome-cache    
tcp        1      1 10.252.55.104:57906     115.239.211.92:80       LAST_ACK    -               
udp6       0      0 :::48016                :::*                                -                   
unix  2      [ ACC ]     流        LISTENING     27680    2281/pulseaudio      /run/user/1000/pulse/native
unix  3      [ ]         流        已连接     28064    1905/dbus-daemon     /run/user/1000/bus
unix  3      [ ]         流        已连接     28094    2486/gvfs-goa-volum  
unix  3      [ ]         流        已连接     234280   14073/chrome-cache   
unix  3      [ ]         流        已连接     28095    -                    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     28051    2201/ibus-daemon     @/tmp/ibus/dbus-LlVXmwkj
```

而第二种用法，在我的电脑上目前只有2条记录：

```
udp6       0      0 :::48016                :::*                                -                   
unix  2      [ ACC ]     流        LISTENING     27680    2281/pulseaudio      /run/user/1000/pulse/native
```

两种用法主要差在`-a`与`-l`两个参数，`-l`的意思是只列出监听的端口，而`-a`的意思是不管监听的还是没监听的端口都列出来。需要注意的是，如果这两个参数都不加，默认只显示不监听的端口。

常见的情景是我们要查看某个端口被哪个进程占用的，而`-p`参数的作用就是显示端口所属的进程id和名字。而`-t`和`-u`也很容易记，分别代表tcp和udp的意思。