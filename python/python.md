# Python学习笔记

## Pip

### 安装与卸载

适用于python2的安装命令：

```shell
wget https://mirrors.ustc.edu.cn/pypi/web/packages/36/fa/51ca4d57392e2f69397cd6e5af23da2a8d37884a605f9e3f2d3bfdc48397/pip-19.0.3.tar.gz
sha256sum -c - <<< '6e6f197a1abfb45118dbb878b5c859a0edbdd33fd250100bc015b67fded4b9f2  pip-19.0.3.tar.gz'
tar xvf pip-19.0.3.tar.gz
cd pip-19.0.3
sudo python2 setup.py install
```

查看版本以验证是否安装成功：

```shell
pip -V
```

适用于python2的卸载命令：

```
sudo python2 -m pip uninstall pip
```

### 配置

配置镜像源：

```shell
pip config set global.index-url https://mirrors.ustc.edu.cn/pypi/web/simple
```

### 使用

| 子命令     | 功能                             |
| ---------- | -------------------------------- |
| install    | 安装包                           |
| download   | 下载包                           |
| uninstall  | 卸载包                           |
| freeze     | 以requirements格式输出已安装的包 |
| list       | 列出已安装的包                   |
| show       | 展示已安装包的信息               |
| check      | 验证已安装包的依赖是兼容的       |
| config     | 管理本地和全局的配置             |
| search     | 从PyPI查找包，官方已停用此命令   |
| cache      | 检查和管理pip的wheel缓存         |
| wheel      | 从requirements构建wheels         |
| hash       | 计算包存档的hash                 |
| completion | 一个辅助命令用来做命令补全       |
| debug      | 展示有用的调试信息               |
| help       | 展示命令的帮助                   |

#### pip show

`pip show impala-shell`输出：

```
Name: impala-shell
Version: 4.1.1
Summary: Impala Shell
Home-page: https://impala.apache.org/
Author: Impala Dev
Author-email: dev@impala.apache.org
License: Apache Software License
Location: /Users/me/Library/Python/2.7/lib/python/site-packages
Requires: bitarray, six, sqlparse, sasl, setuptools, thrift, configparser, prettytable, thrift-sasl
Required-by: 
```

Location是包的安装路径。

### 常见问题

#### 模块安装路径

Python Cli里查看模块安装路径：

```python
print(itertools.__file__)
# /home/python/env-gcc7.5.0/lib/python2.7/lib-dynload/itertools.so
```

#### incompatible architecture

M1芯片 的Mac上的报错：

```
(mach-o file, but is an incompatible architecture (have 'arm64', need 'x86_64')), '/usr/lib/_bitarray.so' (no such file)
```

解决办法：

```
pip2 uninstall bitarray
ARCHFLAGS="-arch arm64" pip2 install bitarray --compile --no-cache-dir
```

## Python2语法

### 类

## 调试

## Python3语法

### 判断版本

```python
# Python 3.5.1 (v3.5.1:37a07cee5969, Dec  5 2015, 21:12:44)
# [GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
# Type "help", "copyright", "credits" or "license" for more information.
import sys
sys.version_info
# sys.version_info(major=3, minor=5, micro=1, releaselevel='final', serial=0)
```

### PYTHONPATH

module文件的查找路径，在python中打印：

```python
import sys
print(sys.path)
```

参考：

[PYTHONPATH](https://docs.python.org/2/using/cmdline.html#envvar-PYTHONPATH)

[sys.path](https://docs.python.org/2/library/sys.html#sys.path)

### pdb

使用`pdb`：

```shell
python -m pdb foo.py
```

| 命令 | 说明     |
| ---- | -------- |
| n    | 单步执行 |
| p    | 查看变量 |
| q    | 结束调试 |

### IDE

在VsCode中可以通过`Run and Debug`进行打断点调试。

### 参考

[调试](https://www.liaoxuefeng.com/wiki/1016959663602400/1017602696742912)
