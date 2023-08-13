# CMake学习笔记

以下内容基于 CMake 3.21。

## 语法

cmake的内置命令是不区分大小写的

cmake的所有变量都是区分大小写的

### 变量

Normal Variable，普通变量，相当于一个局部变量。在同一个CMake工程中使用，会有作用域限制或区分。

Cache Variable，缓存变量，相当于一个全局变量。在同一个CMake工程中任何地方都可以使用。

### 命令

#### cmake_minimum_required

```
cmake_minimum_required(VERSION <min>[...<policy_max>] [FATAL_ERROR])
```

#### project

设置项目名：

```cmake
project(<PROJECT-NAME> [<language-name>...])
project(<PROJECT-NAME>
        [VERSION <major>[.<minor>[.<patch>[.<tweak>]]]]
        [DESCRIPTION <project-description-string>]
        [HOMEPAGE_URL <url-string>]
        [LANGUAGES <language-name>...])
```

同时设置变量：

| 变量名称                                       | 描述                         |
| ---------------------------------------------- | ---------------------------- |
| CMAKE_PROJECT_NAME                             | 顶层项目名                   |
| PROJECT_NAME                                   | 当前项目名                   |
| PROJECT_SOURCE_DIR, \<PROJECT-NAME>_SOURCE_DIR | 当前项目源码的绝对路径       |
| PROJECT_BINARY_DIR, \<PROJECT-NAME>_BINARY_DIR | 当前项目 build目录的绝对路径 |

#### set

设置Normal变量，Cache变量或者环境变量。

```cmake
# Set Normal Variable
set(<variable> <value>... [PARENT_SCOPE])
# Set Cache Entry
set(<variable> <value>... CACHE <type> <docstring> [FORCE])
# Set Environment Variable
set(ENV{<variable>} [<value>])
```

#### set_property

在指定 scope 中设置命名属性：

```
set_property(<GLOBAL                      |
              DIRECTORY [<dir>]           |
              TARGET    [<target1> ...]   |
              SOURCE    [<src1> ...]
                        [DIRECTORY <dirs> ...] |
                        [TARGET_DIRECTORY <targets> ...]
              INSTALL   [<file1> ...]     |
              TEST      [<test1> ...]     |
              CACHE     [<entry1> ...]    >
             [APPEND] [APPEND_STRING]
             PROPERTY <name> [<value1> ...])
```

#### include

从文件或者 module加载 cmake 代码：

```cmake
include(<file|module> [OPTIONAL] [RESULT_VARIABLE <var>]
                      [NO_POLICY_SCOPE])
```

#### include_directories

添加 include 目录：

```cmake
include_directories([AFTER|BEFORE] [SYSTEM] dir1 [dir2 ...])
```

设置变量：`INCLUDE_DIRECTORIES`。

#### add_library

使用指定的源文件为项目添加 library：

```
# Normal Libraries
add_library(<name> [STATIC | SHARED | MODULE]
            [EXCLUDE_FROM_ALL]
            [source1] [source2 ...])
# Imported Libraries
add_library(<name> <SHARED|STATIC|MODULE|OBJECT|UNKNOWN> IMPORTED
            [GLOBAL])
# Object Libraries
add_library(<name> OBJECT <src>...)
# Alias Libraries
add_library(<name> ALIAS <target>)
# Interface Libraries
add_library(<name> INTERFACE [IMPORTED [GLOBAL]])
```

#### find_library

```
find_library (<VAR> name1 [path1 path2 ...])
```

#### find_package

查找外部项目，并加载配置：

```cmake
# Basic Signature and Module Mode
find_package(<PackageName> [version] [EXACT] [QUIET] [MODULE]
             [REQUIRED] [[COMPONENTS] [components...]]
             [OPTIONAL_COMPONENTS components...]
             [NO_POLICY_SCOPE])
# Full Signature and Config Mode¶
find_package(<PackageName> [version] [EXACT] [QUIET]
             [REQUIRED] [[COMPONENTS] [components...]]
             [OPTIONAL_COMPONENTS components...]
             [CONFIG|NO_MODULE]
             [NO_POLICY_SCOPE]
             [NAMES name1 [name2 ...]]
             [CONFIGS config1 [config2 ...]]
             [HINTS path1 [path2 ... ]]
             [PATHS path1 [path2 ... ]]
             [PATH_SUFFIXES suffix1 [suffix2 ...]]
             [NO_DEFAULT_PATH]
             [NO_PACKAGE_ROOT_PATH]
             [NO_CMAKE_PATH]
             [NO_CMAKE_ENVIRONMENT_PATH]
             [NO_SYSTEM_ENVIRONMENT_PATH]
             [NO_CMAKE_PACKAGE_REGISTRY]
             [NO_CMAKE_BUILDS_PATH] # Deprecated; does nothing.
             [NO_CMAKE_SYSTEM_PATH]
             [NO_CMAKE_SYSTEM_PACKAGE_REGISTRY]
             [CMAKE_FIND_ROOT_PATH_BOTH |
              ONLY_CMAKE_FIND_ROOT_PATH |
              NO_CMAKE_FIND_ROOT_PATH])
```

#### if, elseif, else, endif

条件语法：

```cmake
if(<condition>)
  <commands>
elseif(<condition>) # optional block, can be repeated
  <commands>
else()              # optional block
  <commands>
endif()
```

#### enable_testing

为当前目录以及子目录启用测试。

#### string

```
Search and Replace
  string(FIND <string> <substring> <out-var> [...])
  string(REPLACE <match-string> <replace-string> <out-var> <input>...)
  string(REGEX MATCH <match-regex> <out-var> <input>...)
  string(REGEX MATCHALL <match-regex> <out-var> <input>...)
  string(REGEX REPLACE <match-regex> <replace-expr> <out-var> <input>...)

Manipulation
  string(APPEND <string-var> [<input>...])
  string(PREPEND <string-var> [<input>...])
  string(CONCAT <out-var> [<input>...])
  string(JOIN <glue> <out-var> [<input>...])
  string(TOLOWER <string> <out-var>)
  string(TOUPPER <string> <out-var>)
  string(LENGTH <string> <out-var>)
  string(SUBSTRING <string> <begin> <length> <out-var>)
  string(STRIP <string> <out-var>)
  string(GENEX_STRIP <string> <out-var>)
  string(REPEAT <string> <count> <out-var>)

Comparison
  string(COMPARE <op> <string1> <string2> <out-var>)
```

#### message

打印消息：

```
General messages
  message([<mode>] "message text" ...)

Reporting checks
  message(<checkState> "message text" ...)
```

mode:

| mode名称       | 描述                                          | 输出   |
| -------------- | --------------------------------------------- | ------ |
| FATAL_ERROR    | 停止process, generation                       | stderr |
| SEND_ERROR     | 继续process，跳过generation                   | stderr |
| WARNING        | 继续process                                   | stderr |
| AUTHOR_WARNING | 继续process                                   | stderr |
| DEPRECATION    | CMAKE_ERROR_DEPRECATED，CMAKE_WARN_DEPRECATED | stderr |
| NOTICE（none） | 重要信息                                      | stderr |
| STATUS         | 有趣信息                                      | stdout |
| VERBOSE        | 详细信息                                      | stdout |
| DEBUG          | 详细信息                                      | stdout |
| TRACE          | 详细信息                                      | stdout |

#### file

```
Reading
  file(READ <filename> <out-var> [...])
  file(STRINGS <filename> <out-var> [...])
  file(<HASH> <filename> <out-var>)
  file(TIMESTAMP <filename> <out-var> [...])
  file(GET_RUNTIME_DEPENDENCIES [...])

Writing
  file({WRITE | APPEND} <filename> <content>...)
  file({TOUCH | TOUCH_NOCREATE} [<file>...])
  file(GENERATE OUTPUT <output-file> [...])
  file(CONFIGURE OUTPUT <output-file> CONTENT <content> [...])

Filesystem
  file({GLOB | GLOB_RECURSE} <out-var> [...] [<globbing-expr>...])
  file(MAKE_DIRECTORY [<dir>...])
  file({REMOVE | REMOVE_RECURSE } [<files>...])
  file(RENAME <oldname> <newname> [...])
  file(COPY_FILE <oldname> <newname> [...])
  file({COPY | INSTALL} <file>... DESTINATION <dir> [...])
  file(SIZE <filename> <out-var>)
  file(READ_SYMLINK <linkname> <out-var>)
  file(CREATE_LINK <original> <linkname> [...])
  file(CHMOD <files>... <directories>... PERMISSIONS <permissions>... [...])
  file(CHMOD_RECURSE <files>... <directories>... PERMISSIONS <permissions>... [...])

Path Conversion
  file(REAL_PATH <path> <out-var> [BASE_DIRECTORY <dir>] [EXPAND_TILDE])
  file(RELATIVE_PATH <out-var> <directory> <file>)
  file({TO_CMAKE_PATH | TO_NATIVE_PATH} <path> <out-var>)

Transfer
  file(DOWNLOAD <url> [<file>] [...])
  file(UPLOAD <file> <url> [...])

Locking
  file(LOCK <path> [...])

Archiving
  file(ARCHIVE_CREATE OUTPUT <archive> PATHS <paths>... [...])
  file(ARCHIVE_EXTRACT INPUT <archive> [...])
```

#### function

```
function(<name> [<arg1> ...])
  <commands>
endfunction()
```

#### return

从 file, directory，或 function返回。

#### cmake_parse_arguments

解析 function 或者 macro 的参数，并定义一些对应的变量：

```
cmake_parse_arguments(<prefix> <options> <one_value_keywords>
                      <multi_value_keywords> <args>...)

cmake_parse_arguments(PARSE_ARGV <N> <prefix> <options>
                      <one_value_keywords> <multi_value_keywords>)
```

其中：

- option：不跟value
- one_value_keywords：后跟一个 value
- multi_value_keywords：可以后跟多个 value
- 剩余参数：\<prefix>_UNPARSED_ARGUMENTS

#### set_target_properties

设置 target 的属性：

```
set_target_properties(target1 target2 ...
                      PROPERTIES prop1 value1
                      prop2 value2 ...)
```

#### target_link_libraries

在链接 target 和他的的依赖时指定 library 和 flag：

```
target_link_libraries(<target> ... <item>... ...)
```

## Makefile

cmake生成的 makefile 可以直接列出所有 target：

```makefile
make help
```

## 参考

[cmake-variables](https://cmake.org/cmake/help/v3.21/index.html)

[cmake-commands](https://cmake.org/cmake/help/v3.21/manual/cmake-commands.7.html)

