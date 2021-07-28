# Shell笔记

## 最佳实践

### 适用场景

什么时候不应该使用bash脚本：

- 你的脚本太长，多达几百行
- 你需要比数组更复杂的数据结构
- 出现了复杂的转义问题
- 有太多的字符串操作
- 不太需要调用其它程序和跟其它程序管道交互
- 担心性能

### 执行

```shell
用bash -n对脚本进行语法检查：
bash -n myscript.sh

用bash -v跟踪脚本里的每个命令的执行：
bash -v myscript.sh

用bash -x跟踪脚本里的每个命令的执行，并附加扩充信息：
bash -x myscript.sh
```

### 设置

| 短参数 | 长参数         | 说明                                                         |
| ------ | -------------- | ------------------------------------------------------------ |
| -a     | -o allexport   | 创建或修改的每个变量或函数都具有导出属性，并标记为导出到后续命令的环境。 |
| -B     | -o braceexpand | 立即报告停止的后台任务状态，而不是在下一次主要交互时打印     |
|        | -o emacs       |                                                              |
| -e     | -o errexit     | 当pipeline返回非零状态时立即退出                             |
| -E     | -o errtrace    |                                                              |
| -T     | -o functrace   |                                                              |
| -h     | -o hashall     |                                                              |
| -H     | -o histexpand  |                                                              |
|        | -o history     |                                                              |
|        | -o ignoreeof   |                                                              |
| -k     | -o keyword     |                                                              |
| -m     | -o monitor     |                                                              |
| -C     | -o noclobber   |                                                              |
| -n     | -o noexec      |                                                              |
| -f     | -o noglob      | 禁止globbing(文件名扩展)                                     |
|        | -o nolog       |                                                              |
| -b     | -o notify      | 导致立即报告终止的后台作业的状态，而不是在打印下一个主要提示之前。 |
| -u     | -o nounset     | 遇到不存在的变量就会报错并停止执行。                         |
| -t     | -o onecmd      |                                                              |
| -P     | -o physical    |                                                              |
|        | -o pipefail    |                                                              |
|        | -o posix       |                                                              |
| -p     | -o privileged  |                                                              |
| -v     | -o verbose     |                                                              |
|        | -o vi          |                                                              |
| -x     | -o xtrace      | 用来在运行结果之前，先输出执行的那一行命令                   |

如果要根据命令的退出状态码做如下的分支操作，当状态码不为0且设置`set -o errexit`时会直接退出：

```shell
grep -q something /path/to/somefile
retval=$?
if [ $retval -eq 0 ]; then
  do_something  # found
else
  do_something_else  # not found
fi
```

可以改写成：

```shell
if grep -q something /path/to/somefile; then
  do_something  # found
else
  do_something_else  # not found
fi
```

参考：[If errexit is on, how do I run a command that might fail and get its exit code?](https://stackoverflow.com/questions/44080974/if-errexit-is-on-how-do-i-run-a-command-that-might-fail-and-get-its-exit-code)

### 封装

封装提高复用性和可读性：

```shell
log() {
    local prefix="[$(date +%Y/%m/%d\ %H:%M:%S)]: "
    echo "${prefix} $@" >&2
}
log "INFO" "a info level message"


ExtractBashComments() {
    egrep "^#"
}
cat example.sh | ExtractBashComments |wc -l
comments=$(ExtractBashComments < rules.sh)
```

### 变量安全性

使用readonly和local修饰变量提高安全：

```shell
# DEFAULT_VAL可以被环境变量中的值覆盖
readonly DEFAULT_VAL=${DEFAULT_VAL:-234}
myfunc() {
    local var=${DEFAULT_VAL}
    echo var:$var
}
```

### 使用替代品

用$()代替反单引号"`"的好处：

- $()能够支持内嵌

- $()不用转义

- $()不容易与单引号混淆

```shell
echo "A-`echo B-\`echo C-\\\`echo D\\\`\``"
echo "A-$(echo B-$(echo C-$(echo D)))"
```

用[[]]替代[]的好处：
-  避免转义问题
-  支持新功能

| 对比项                   | []   | [[]] |
| ------------------------ | ---- | ---- |
| 逻辑或                   |      | \|\| |
| 逻辑与                   |      | &&   |
| 字符串比较（不需要转义） |      | <    |
| 通配符(glob)字符串比较   |      | ==   |
| 正则表达式字符串比较     |      | =~   |

```bash
name=b
[ "${name}" \> "a" -o ${name} \< "m" ]
[[ "${name}" > "a" && "${name}" < "m"  ]]
```

### 正则表达式/Globbing

注意正则表达式和globbing表达式都不能用引号包裹：

```bash
t="abc123"
[[ "$t" == abc* ]]         # true (globbing比较)
[[ "$t" =~ [abc]+[123]+ ]] # true (正则表达式比较)
[[ "$t" == "abc*" ]]       # false (字面比较)
[[ "$t" =~ "abc*" ]]       # false (字面比较)
```

如果表达式里有空格，可以把它存储到一个变量里：

```bash
r="a b+"
[[ "a bbb" =~ $r ]]        # true
```

按Globbing方式的字符串比较也可以用到case语句中：

```bash
case $t in
abc*)  echo "matched abc*" ;;
esac
```

### 使用<()

使用<()避免使用临时文件：

```bash
#   下载并比较两个网页
diff <(wget -O - https://baidu.com) <(wget -O - https://sogou.com)
```

### 使用"here documents"

使用"here documents"在标准输入上输入多行字符串：

```bash
#   任何字词都可以当作分界符
command  << MARKER
...
${var}
$(cmd)
...
MARKER
```

如果文本里没有内嵌变量替换操作，你可以把第一个MARKER用单引号包起来：

```bash
command << 'MARKER'
...
no substitution is happening here.
$ (dollar sign) is passed through verbatim.
...
MARKER
```

## 登录shell

交互式 shell 和非交互式 shell：

- 交互式 shell 指的是在终端有交互的模式，比如 ssh 登录

- 非交互式 shell 指的是 bash shell 以命令脚本的形式执行

**登录shell**：登录shell是用户使用自己的 user ID 登录交互式 shell 的第一个进程。登录shell一定是**交互式**的。

- shell首先执行/etc/profile中的命令，为系统内的所有bash用户建立默认特征。然后依次查找`~/.bash_profile`，`~/.bash_login`，`~/.profile`并执行它找到的第1个相关文件中的命令。

- 退出执行`.bash_logout`文件中的命令。

**交互式非登录shell**：当你在已经存在的终端 session 中开启一个 shell 会得到一个交互式非登录 shell。

- 交互式非登录shell执行`~/.bashrc`文件中的命令。

**非交互式非登录shell**：

- 非交互式shell并不执行前面描述的启动文件中的命令(如那些运行shell脚本的shell)，然而这些shell从登录shell继承了由这些启动文件设置的shell变量。

| 交互类型 | 登录类型    | Bash启动                                                     | bash退出     |
| -------- | ----------- | ------------------------------------------------------------ | ------------ |
| 交互式   | 登录shell   | /etc/profile<br />~/.bash_profile \| ~/.bash_login \| ~/.profile | .bash_logout |
| 交互式   | 非登录shell | ~/.bashrc                                                    |              |
| 非交互式 | 非登录shell | 继承环境变量                                                 |              |

参考：[登录式 shell 和非登录式 shell 区别](http://einverne.github.io/post/2019/01/login-shell-vs-non-login-shell.html)

## 变量

### 变量类型

运行shell时，会同时存在三种变量：

1. 局部变量：局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
2. 环境变量：所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
3. shell变量：shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行。

子进程从它的父进程继承环境。由于进程的局部性，一旦子进程被产生，父进程就无法感知对环境的修改，子进程也无法感知父进程对环境变量的修改。

当运行export 变量时，shell将这些变量的名称放入环境中。如果没有参数，export将列出所有环境变量。

### 定义变量

Shell 变量的命名规范和大部分编程语言都一样：

- 变量名由数字、字母、下划线组成
- 必须以字母或者下划线开头
- 不能使用 Shell 里的关键字（通过 help 命令可以查看保留关键字）

Shell 支持以下定义变量的方式：

```bash
variable=value             # 赋值号的周围不能有空格
variable='value'           # 如果 value 包含了空白符，那么就必须使用引号包围起来。
variable="value"
readonly variable="value"  # 使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变
```

Shell 也支持将命令的执行结果赋值给变量，常见的有以下两种方式：

```bash
variable=`command`
variable=$(command)
```

### 使用变量

使用一个定义过的变量，只要在变量名前面加美元符号$即可，如：

```bash
variable="value"
echo $variable
echo ${variable}       # 加花括号是为了帮助解释器识别变量的边界，推荐给所有变量加上花括号{}
```

### 删除变量

使用 unset 命令可以删除变量，unset 命令不能删除只读变量，变量被删除后不能再次使用：

```bash
unset variable_name
```

### 内置变量

// TODO

### 参数替换

两种形式的区别是：

- 一般形式下区分未声明变量和值为空字符串的变量

- 非空形式下不区分未声明变量和值为空字符串的变量，即当变量值为空字符串时视为变量未声明。

| 一般形式                       | 非空形式                | 说明（括号内非空形式）                                       |
| ------------------------------ | ----------------------- | ------------------------------------------------------------ |
| ${parameter}                   |                         | 即变量parameter的值                                          |
| ${parameter-default}           | ${parameter:-default}   | 如果parameter未声明（或值为空）返回default值                 |
| ${parameter=default}           | ${parameter:=default}   | 如果parameter未声明（或值为空）则parameter值设置为default并返回 |
| ${parameter+alt_value}         | ${parameter:+alt_value} | 如果parameter未声明（或值为空）则返回空字符串；否则修改为alt_value并返回 |
| ${parameter?err_msg}           | ${parameter:?err_msg}   | 如果parameter未声明（或值为空）则打印err_msg并返回退出码1    |
| ${#var}                        |                         | 变量var字符串长度；如果var为数组则返回数组中第一个元素的长度 |
| ${#array[*]} and ${#array[@]}  |                         | 返回数组长度                                                 |
| ${var#Pattern}                 |                         | 从变量var的最前端（左端）去掉最短匹配Pattern的部分           |
| ${var##Pattern}                |                         | 从变量var的最前端（左端）去掉最长匹配Pattern的部分           |
| ${var%Pattern}                 |                         | 从变量var的最后端（右端）去掉最短匹配Pattern的部分           |
| ${var%%Pattern}                |                         | 从变量var的最后端（右端）去掉最长匹配Pattern的部分           |
| ${var:pos}                     |                         | 从pos位置处截取到结尾                                        |
| ${var:pos:len}                 |                         | 从pos位置处截取len长度的子串                                 |
| ${var/Pattern/Replacement}     |                         | 将var中第一次匹配Pattern的部分替换成Replacement，如果Replacement为空，则相当于删除 |
| ${var//Pattern/Replacement}    |                         | 将var中所有匹配Pattern的部分替换成Replacement，如果Replacement为空，则相当于删除 |
| ${var/#Pattern/Replacement}    |                         | 如果var的前缀匹配Pattern则替换为Replacement                  |
| ${var/%Pattern/Replacement}    |                         | 如果var的后缀匹配Pattern则替换为Replacement                  |
| ${!varprefix*}, ${!varprefix@} |                         | 匹配所有以varprefix开头的已声明变量                          |

参考：https://tldp.org/LDP/abs/html/parameter-substitution.html

## 字符串

单引号字符串的限制：

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

双引号的优点：

- 双引号里可以有变量
- 双引号里可以出现转义字符

```shell
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1

# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3

#获取字符串长度
string="abcd"
echo ${#string} #输出 4

#提取子字符串
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo

#查找子字符串
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
#判断字符串为空的正确方法,注意双引号
if [ -z "$STRING" ]; then
    echo "STRING is empty"
fi
#或
if [ -n "$STRING" ]; then
    echo "STRING is not empty"
fi
```

> 注意：判断字符串为空的正确方法需要加双引号。

## 数组

### 定义数组

bash只支持一维数组，但参数个数没有限制。定义数组有以下方式：

1. 使用`declare -a`定义数组：

   ```bash
   declare -a array
   ```

2. 使用[]操作符：

   ```bash
   array[0]='foo'
   array[1]='bar'
   ```

3. 使用()直接赋值：

   ```bash
   array=('foo' 'bar')
   # 或
   array=([0]='bar' [1]='bar')
   ```

4. 连接两个数组：

   ```bash
   array3=(${array[@]} ${array2[@]})
   echo ${#array3[@]}
   ```

5. 从文件中读取数组：

   ```bash
   # 将每一行读取为数组的一个元素
   array=(`cat 'array.txt'`) 
   ```

### 读取数组

使用[]操作符和基于0的下标来取值：

```bash
array=('foo' 'bar')
${array[n]}                     # 数组第n个元素
${array[*]} 或${array[@]}       # 数组所有成员，使用“@”这个特殊的下标，可以将数组扩展成列表
${!array[*]} 或${!array[@]}     # 数组所有下标
${#array[*]} 或${#array[@]}     # 数组元素个数，没有定义的数组下标不会占用数组中元素的个数
${#array[0]}                    # 数组第一个成员的长度
```

### 遍历数组元素

```bash
# 使用for in循环读取数组：
for item in ${array[@]};do
 echo $item
done
# 使用for循环读取数组：
len=${#adobe[@]}
for ((i=0;i<$len;i++));do
 echo ${adobe[$i]}
do
```

### 修改数组

替换数组元素：

```bash
array=('foo' 'bar')
# 使用模式操作符替换数组中的元素
echo ${array[@]/foo/foo2}
```

删除数组元素：

```bash
array=('foo1' 'bar2' 'foo3' 'bar4' 'foo5')
# 使用命令替换并重新赋值的方式删除数组元素
array=(${array[@]:0:2} ${array	[@]:3})
# 使用模式操作符删除数组元素
array=(${array[@]/foo3/})
```

### 数组与循环示例

从标准输入读入n次字符串，每次输入的字符串保存在数组array里：

```shell
i=0
n=5
while [ "$i" -lt $n ] ; do
  echo "Please input strings ... `expr $i + 1`"
  read array[$i]
  echo "${array[$i]}"
  i=`expr $i + 1`
done
```

将字符串里的字母逐个放入数组，并输出到标准输出：

```shell
chars='abcdefghijklmnopqrstuvwxyz'
for (( i=0; i<26; i++ )) ; do
    array[$i]=${chars:$i:1}
    echo ${array[$i]}
done
```

将文件中内容给数组赋值：(碰到第一个回车符之前的内容)，然后查看数组赋值情况：

```shell
read -a Words < /tmp/tmp.file
set | grep "Words"
```

### 关联数组

由于shell的的数组只支持一维数组,并且并没有map这种数据结构也。我们使用关联数组来模拟map的效果：

定义一个map：

```shell
declare -A map=（）
declare -A map=(["100"]="1" ["200"]="2")
```

输出所有key：

```bash
echo ${!map[@]}
```

输出所有value：

```bash
echo ${map[@]}
```

添加值：

```go
map["300"]="3"
```

输出key对应的值：

```ruby
echo ${map["100"]}
```

遍历map：

```bash
for key in ${!map[@]}
do
    echo ${map[$key]}
done
```

### 参考

- [Bash中数组的操作教程](https://www.jb51.net/article/101241.htm)
- [bash数组定义](https://blog.csdn.net/ilovemilk/article/details/4959747)
- [30分钟玩转Shell脚本编程](http://c.biancheng.net/cpp/shell/)
- [BASH数组用法小结及循环用法](https://blog.csdn.net/samxx8/article/details/8025548)
- [shell中map的使用和遍历](https://blog.csdn.net/xzw_123/article/details/42920371)
- [shell 数组(含"map")操作总结](https://blog.csdn.net/uestcyms/article/details/97511768)

## 注释

多行注释还可以使用以下格式：

```shell
:<<EOF
注释内容...
注释内容...
注释内容...
EOF
```

EOF 也可以使用其他符号:

```shell
:<<'
注释内容...
注释内容...
注释内容...
'
```

## 传递参数

| 参数处理 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| $0       | 脚本名称                                                     |
| $n       | 传给脚本/函数的第n个参数(第10+个参数要使用花括号：${10})     |
| $*       | 以一个单字符串显示所有向脚本传递的参数。 如"\$*"用用双引号括起来的情况、以"$1 $2 … $n"的形式输出所有参数（传递了一个参数）。 |
| $@       | 与\$*相同，但是使用时加引号，并在引号中返回每个参数。 如"\$@"用双引号括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数（传递了N个参数）。 |
| $#       | 传递到脚本的参数个数                                         |
| $-       | 显示Shell使用的当前选项，与set命令功能相同。                 |
| $!       | 后台运行的最后一个进程的ID号                                 |
| $?       | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |
| $$       | 脚本运行的当前进程ID号                                       |

## 运算符

Shell 和其他编程语言一样，支持多种运算符，包括：

- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

### 算术运算符

| 运算符 | 举例                          | 说明                                          |
| ------ | ----------------------------- | --------------------------------------------- |
| +      | `expr $a + $b` 结果为 30。    | 加法                                          |
| -      | `expr $a - $b` 结果为 -10。   | 减法                                          |
| *      | `expr $a \* $b` 结果为  200。 | 乘法                                          |
| /      | `expr $b / $a` 结果为 2。     | 除法                                          |
| %      | `expr $b % $a` 结果为 0。     | 取余                                          |
| =      | a=$b 将把变量 b 的值赋给 a。  | 赋值                                          |
| ==     | [ \$a == $b ] 返回 false。    | 相等。用于比较两个数字，相同则返回 true。     |
| !=     | [ \$a != $b ] 返回 true。     | 不相等。用于比较两个数字，不相同则返回 true。 |

- 乘号(*)前边必须加反斜杠(\)才能实现乘法运算；
- 条件表达式要放在方括号之间，并且要有空格，例如: **[\$a==$b]** 是错误的，必须写成 **[ \$a == $b ]**。

### 关系运算符

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。  

下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 举例                         | 说明                                                  |
| ------ | ---------------------------- | ----------------------------------------------------- |
| -eq    | [ \$a -eq $b ] 返回 false | 检测两个数是否相等，相等返回 true。                   |
| -ne    | [ \$a -ne $b ] 返回 true   | 检测两个数是否不相等，不相等返回 true。               |
| -gt    | [ \$a -gt $b ] 返回 false  | 检测左边的数是否大于右边的，如果是，则返回 true。     |
| -lt    | [ \$a -lt $b ] 返回 true   | 检测左边的数是否小于右边的，如果是，则返回 true。     |
| -ge    | [ \$a -ge $b ] 返回 false | 检测左边的数是否大于等于右边的，如果是，则返回 true。 |
| -le    | [ \$a -le $b ] 返回 true   | 检测左边的数是否小于等于右边的，如果是，则返回 true。 |

### 布尔运算符

下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 举例                                      | 说明                                                |
| ------ | ----------------------------------------- | --------------------------------------------------- |
| !      | [ ! false ] 返回 true。                   | 非运算，表达式为 true 则返回 false，否则返回 true。 |
| -o     | [ \$a -lt 20 -o $b -gt 100 ] 返回 true。  | 或运算，有一个表达式为 true 则返回 true。           |
| -a     | [ \$a -lt 20 -a $b -gt 100 ] 返回 false。 | 与运算，两个表达式都为 true 才返回 true。           |

### 逻辑运算符

| 运算符 | 说明       | 举例                                        |
| ------ | ---------- | ------------------------------------------- |
| &&     | 逻辑的 AND | [[ \$a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\|   | 逻辑的 OR  | [[ \$a -lt 100 \|\| $b -gt 100 ]] 返回 true |

### 字符串运算符

| 运算符 | 举例                      | 说明                                      |
| ------ | ------------------------- | ----------------------------------------- |
| =      | [ \$a = $b ] 返回 false。 | 检测两个字符串是否相等，相等返回 true。   |
| !=     | [ \$a != $b ] 返回 true。 | 检测两个字符串是否相等，不相等返回 true。 |
| -z     | [ -z "$a" ] 返回 false。  | 检测字符串长度是否为0，为0返回 true。     |
| -n     | [ -n "$a" ] 返回 true。   | 检测字符串长度是否为0，不为0返回 true。   |
| str    | [ $a ] 返回 true。        | 检测字符串是否为空，不为空返回 true。     |

### 文件测试运算符

| 操作符  | 举例                      | 说明                                                         |
| ------- | ------------------------- | ------------------------------------------------------------ |
| -b file | [ -b $file ] 返回 false   | 检测文件是否是块设备文件，如果是，则返回 true。              |
| -c file | [ -c $file ] 返回 false。 | 检测文件是否是字符设备文件，如果是，则返回 true。            |
| -d file | [ -d $file ] 返回 false。 | 检测文件是否是目录，如果是，则返回 true。                    |
| -f file | [ -f $file ] 返回 true。  | 检测文件是否是普通文件（既不是目录，也不是设备文件），<br />如果是，则返回 true。 |
| -g file | [ -g $file ] 返回 false。 | 检测文件是否设置了 SGID 位，如果是，则返回 true。            |
| -k file | [ -k $file ] 返回 false。 | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  |
| -p file | [ -p $file ] 返回 false。 | 检测文件是否是有名管道，如果是，则返回 true。                |
| -u file | [ -u $file ] 返回 false。 | 检测文件是否设置了 SUID 位，如果是，则返回 true。            |
| -r file | [ -r $file ] 返回 true。  | 检测文件是否可读，如果是，则返回 true。                      |
| -w file | [ -w $file ] 返回 true。  | 检测文件是否可写，如果是，则返回 true。                      |
| -x file | [ -x $file ] 返回 true。  | 检测文件是否可执行，如果是，则返回 true。                    |
| -s file | [ -s $file ] 返回 true。  | 检测文件是否为空（文件大小是否大于0），不为空返回 true。     |
| -e file | [ -e $file ] 返回 true。  | 检测文件（包括目录）是否存在，如果是，则返回 true。          |

`test` 和 `[` 属于 Shell 的内建命令，所以需要跟它的参数使用空格隔开，然后 ] 作为最后一个参数表示条件结束，`[[` 属于 Shell 的保留关键字:

```shell
$ type "test" "[" "[["
test is a shell builtin
[ is a shell builtin
[[ is a reserved word
```

> [shell 中各种括号的作用](http://www.runoob.com/w3cnote/linux-shell-brackets-features.html)

## 符号命令

| 符号  | 命令                                                        |
| ----- | ----------------------------------------------------------- |
| ()    | 子shell                                                     |
| $()   | 替换命令                                                    |
| $(()) | 算术扩展式                                                  |
| (())  | 计算算术表达式，let的同义词(当被括起来的值中包含等号时使用) |
| []    | test命令                                                    |
| [[]]  | 条件表达式，类似于[]，但添加了字符串比较                    |

参考：

[shell脚本中整数型变量自增（加1）的实现方式](https://blog.csdn.net/yumushui/article/details/53469845)

[What is /bin/sh -c?](https://stackoverflow.com/questions/3985193/what-is-bin-sh-c)

## 退出状态码

对于非管道命令使用 $? 能够检查前一个命令的退出状态；对于管道命令也有 PIPESTATUS 变量允许检查从管道所有部分返回的代码。

对于管道：

```shell
cmd1 | cmd2 | cmd3
```

cmd1 退出代码在 `${PIPESTATUS[0]}` 中，cmd3 退出代码在 `${PIPESTATUS[2]}` 中，因此 `$?` 总是与 `${PIPESTATUS: -1}` 相同。

参考：[bash shell 获取管道前的退出状态码](https://www.qiansw.com/bash-shell-gets-the-exit-status-code-before-the-pipe.html)

## TODO

```
Shell替换：Shell变量替换，命令替换，转义字符
数据类型
流程控制
if
switch
while
for
函数
操作符
模式操作符
read和数组
```
