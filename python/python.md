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

## Python2语法

### 类

## 调试

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
