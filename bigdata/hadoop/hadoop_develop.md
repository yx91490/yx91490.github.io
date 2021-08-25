# Hadoop开发

## 源码编译

编译cdh5.15.1：

```
./cloudera/build.sh
```

```
[exec] CMake Error at CMakeLists.txt:162 (MESSAGE):
[exec]   Required snappy library could not be found.
[exec]   SNAPPY_LIBRARY=SNAPPY_LIBRARY-NOTFO-- Configuring incomplete, errors occurred!
```

```
brew install snappy
```

```
[exec] CMake Error at main/native/fuse-dfs/CMakeLists.txt:93 (MESSAGE):
[exec]   Required component fuse_dfs could not be built.
```


