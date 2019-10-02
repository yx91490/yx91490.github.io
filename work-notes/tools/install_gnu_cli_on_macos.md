# 在macOS上安装GNU命令行工具

```
brew install binutils
brew install diffutils
brew install ed
brew install findutils
brew install gawk
brew install gnu-indent
brew install gnu-sed
brew install gnu-tar
brew install gnu-which
brew install gnutls
brew install grep
brew install gzip
brew install screen
brew install watch
brew install wdiff --with-gettext
brew install wget
```

默认安装的GNU的命令都会加个“g”的前缀，比如  sed会变成gsed。 之前版本的brew的install命令中可能会有`--with-default-names`选项 ，可以直接替换默认的命令名。新版本的brew去掉了这个选项，在安装完成后会提示以配置环境变量的方式替换默认命令名。







### 参考

- [Install and Use GNU Command Line Tools on macOS/OS X](https://www.topbug.net/blog/2013/04/14/install-and-use-gnu-command-line-tools-in-mac-os-x/)