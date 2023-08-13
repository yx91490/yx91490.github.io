# NPM学习笔记

## NPM命令

查看npm版本：

```shell
npm -v
```

查看镜像地址：

```shell
npm config get registry
```

配置镜像地址：

```shell
npm config set registry https://registry.npm.taobao.org
```

重置镜像地址：

```shell
npm config set registry https://registry.npmjs.org
```

更新npm：

```shell
npm install -g npm
```


删除 node_modules 目录下面的包：

```shell
npm uninstall <package>
```

从 package.json 文件中删除依赖：

```shell
npm uninstall --save <package>
```

从 package.json 文件中删除dev依赖：

```shell
npm uninstall --save-dev <package>
```

更新局部模块：

```shell
npm update <package>
```

更新全局模块：

```shell
npm update -g <package>
```

更新全局模块到某个版本：

```shell
npm update -g <package>@<version>
```


查看包在npm所有版本：
```shell
npm view <package> versions
```
