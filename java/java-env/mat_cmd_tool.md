# 命令行分析HeapDump文件

在java程序遇到一些问题时，我们常常会把堆内存dump出来利用诸如Eclipse Memory Analyzer（MAT）这样的工具去分析。通常情况下dump文件可以在笔记本上运行MAT，但是遇到一些大内存的应用可能笔记本就分析不了了，这时候可以在服务器上用JDK自带的jhat命令，但是效率和效果都值得商榷；另一个办法就是使用MAT自带的`ParseHeapDump.sh`脚本来分析。

### 使用方法

1. 下载MAT：https://www.eclipse.org/mat/
2. 解压到服务器上
3. 调整MemoryAnalyzer.ini配置文件中Xmx为合适大小（比如dump文件两倍）
4. 执行脚本：`./ParseHeapDump.sh {heap.dump.hprof} {分析项...} `
5. 将dump文件的整个目录拷贝到本地，使用本地的MAT打开

其中分析项包括：

- org.eclipse.mat.api:suspects 内存泄露报告
- org.eclipse.mat.api:overview 概述报告
- org.eclipse.mat.api:top_components 大对象报告

### 参考

- [MemoryAnalyzer/FAQ](https://wiki.eclipse.org/MemoryAnalyzer/FAQ)
- [Tool for analyzing large Java heap dumps](https://stackoverflow.com/questions/7254017/tool-for-analyzing-large-java-heap-dumps)
- [在命令行中使用Eclipse MAT工具](https://colobu.com/2015/08/12/using-Eclipse-Memory-Analyzer-by-the-command-line/)