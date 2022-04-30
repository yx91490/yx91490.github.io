# Locale笔记

## locale

在Linux中使用locale命令来设置和显示程序运行的语言环境。locale会根据计算机用户所使用的语言，所在国家或者地区，以及当地的文化传统定义一个软件运行时的语言环境。

locale设置规则：

```
# <语言>_<地区>.<字符集编码><@修正值>
#
# de：表示德语
# DE：表示德国
# Utf-8：表示字符集
# euro：表示按照欧洲习惯加以修正
de_DE.utf-8@euro
```

C是系统默认的locale，POSIX是C的别名。

设置locale的根本就是设置一组总共12个LC开头的变量（不包括LANG和LC_ALL）：

| 变量              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| LC_ADDRESS        | 地址书写方式                                                 |
| LC_COLLATE        | 用于比较和排序                                               |
| LC_CTYPE          | 用于字符分类和字符串处理，控制所有字符的处理方式，包括字符编码，字符是单字节还是多字节，如何打印等，非常重要的一个变量。 |
| LC_IDENTIFICATION | locale对自身包含信息的概述                                   |
| LC_MEASUREMENT    | 度量衡表达方式                                               |
| LC_MESSAGES       | 用于控制程序输出时所使用的语言，主要是提示信息，错误信息，状态信息，标题，标签，按钮和菜单等 |
| LC_MONETARY       | 用于格式化货币单位                                           |
| LC_PAPER          | 默认纸张尺寸大小                                             |
| LC_TELEPHONE      | 电话号码书写方式                                             |
| LC_TIME           | 用于格式化时间和日期                                         |
| LC_NAME           | 姓名书写方式                                                 |
| LC_NUMERIC        | 用于格式化非货币的数字显示                                   |

优先级：

1. `LANGUAGE`
2. `LC_ALL`
3. `LC_xxx`
4. `LANG`

相关命令：

```shell
# 显示正在使用的 Locale 和相关的环境变量：
locale

# 查看当前系统所有可用locale
locale -a

# 查看已经生成的区域设置：
localedef --list-archive
# 或：
localectl list-locales
```

设置整个系统使用的区域设置，需要在 /etc/locale.conf 中写入 LANG 变量。

## localedef

localedef 是用来生成 locale 的工具。localedef 能够读取 locale 定义文件（一般位于`/usr/share/i18n`，可通过 `localedef --help` 命令查看），以及 charmap 文件（一般位于`/usr/share/i18n/charmaps`，可通过`localedef --help`命令查看），然后编译并将编译好的二进制的 locale 数据库放在 `/usr/lib/locale` 目录里，这样Linux 系统中使用到 locale 的程序就能够找到并使用这些 locale。

## 参考

[linux下设置locale](https://cloud.tencent.com/developer/article/1671446)

[Linux 下的 locale 机制](https://steemit.com/linux/@cifer/linux-locale)

[2.3.2 Locale Environment Variables](https://www.gnu.org/software/gettext/manual/html_node/Locale-Environment-Variables.html)

[How to change system locale on RHEL7?](https://access.redhat.com/solutions/974273)