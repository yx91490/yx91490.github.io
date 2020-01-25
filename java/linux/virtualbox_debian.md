# Debian中VirtualBox增强功能的相关配置

## 提示没有找到VBoxGuestAdditions_4.3.18.iso

下载速度很慢，于是手动下载然后重命名为`VBoxGuestAdditions.iso`放到`/usr/share/virtualbox`目录下即可。

> 注：5.0版是放在$HOME/.config/VirtualBox下，不用重命名。

## 提示“Starting VirtualBox kernel modules…No suitable module for running kernel found … failed!”

宿主机需要安装`virtualbox-qt , virtualbox-dkms`等包。

```
$ sudo apt-get install virtualbox-qt virtualbox-dkms
```

## VBoxGuestAdditions.iso安装失败

虚拟机内需要安装`gcc, make, kernel-source, linux-kernel-headers`等软件包。

```
$ sudo apt-get install gcc make kernel-source linux-kernel-headers
```

## 设置共享文件夹

宿主机设置共享文件夹路径为 `/.../<sharedir>`. 
虚拟机内命令：

```
$ mount -t vboxsf <sharedir> /<mount_point>
```

## Makefile:185: *** Error: unable to find the sources of your current Linux kernel. Specify KERN_DIR= and run Make again。 停止。

```
# apt-get install linux-sourc
# cd /usr/src
# tar xvf linux-source.tar.xz
# export KERN_DIR=/usr/src/<kern_dir>
# /etc/init.d/vboxdrv setup 
```

## 升级内核后打不开

```
1. 安装内核头文件
2. # modprobe vboxdrv (5.0)或者 
   # /etc/init.d/vboxdrv setup(5.0以下)
```