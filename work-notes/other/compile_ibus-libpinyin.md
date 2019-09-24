# 在debianstretch上编译安装ibus-libpinyin_V1.7

ibus-libpinyin 的主页: https://github.com/libpinyin/ibus-libpinyin.

编译软件一般的流程是:

    ./configure
    make
    suudo make install

但是源码目录没找到 configure 文件,只有一个 `autogen.sh` 文件是可执行的,于是就试着运行了(建议在这里指定安装路径为 `/usr/share` ,没尝试,原因见后文),发现这个脚本就是用来生成 configure 文件的,同时检测一些依赖关系.不久遇到了第一个依赖:

    checking for IBUS... no
    configure: error: Package requirements (
        ibus-1.0 >= 1.4.0
    ) were not met:
    
    No package 'ibus-1.0' found
    
    Consider adjusting the PKG_CONFIG_PATH environment variable if you
    installed software in a non-standard prefix.


但是ibus的包我是装了,最后发现这是linux解决库依赖的一种配置,将相关的库的依赖写进一个 .pc 文件中,那这个 .pc 文件到哪里找呢?最后发现源里有个 `libibus-1.0-dev` 的包提供了这个文件,那么同理找一个名为 `name` 的依赖就是找 `libname-dev` 的包,按这个思路顺利解决了 sqlite3 的依赖.然后发现 libpinyin 的版本低了,于是还要编译libpinyin的最新版:(

源码地址在这: https://github.com/libpinyin/libpinyin

同理运行 `autogen.sh` 生成配置文件(建议在这里指定安装路径为 `/usr/share` ,没尝试,原因见后文),配置这个的时候又遇到一个问题, 

    `cannot found Berkeley DB Version 4` 

google了一大圈发现是一个叫 `libdb4.8-dev` 的包,但是源里没有,还是从oldstable源里找到的.最后libpinyin配置完了,执行

    $make
    $sudo make install

顺利完成.

继续 ibus-libpinyin 的配置.这时候它需要`gdk-3.0`的依赖,顺着之前的思路发现源里没有,于是又请教了google,发现是 `libgtk-3-dev` 提供了这个依赖(有种莫名的悲伤-_-||),不得不说还是google亲啊!
  配置完后继续make,sudo make install顺利安装上了.默认的位置安装在`/usr/local/share/ibus-libpinyin`下,这就有问题了.因为ibus装在`/usr/share/ibus`下面,ibus并没有找到`ibus-libpinyin`的引擎,所以装上了但是用不了-_-||.
找了半天发现了 `/usr/local/libexec/ibus-engine-libpinyin`,这似乎是ibus-libpinyin的引擎(engine),这个有个选项是-i,似乎没啥作用,于是跟源里的ibus-libpinyin安装的文件对比下发现有个`/usr/share/ibus/component/xxx.xml`好像是用来指定engine的,发现上一步 `ibus-engine-libpinyin -i` 好像生成了 `/usr/local/share/ibus/component/xxx.xml` ,copy到 `/usr/share/ibus/component/` 下,重启,发现能切换输入法的引擎了.

总结:
1. 库的依赖要找libxxx-dev包
2. 运行autogen.sh时最好指定prefix为 `/usr/share` ,不过没试,有兴趣的可以试试.
3. google是你的朋友.