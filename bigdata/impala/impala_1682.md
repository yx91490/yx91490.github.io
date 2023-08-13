# IMPALA-1682开发笔记

## 背景

大家都知道mysql client有一个很实用的功能：以`\G`结尾的SQL能够垂直显示一行的值，这样在字段数比较多的情况下能够清晰的展示少数几行的信息。

## MySQL Client行为

`\G`是一种[command](https://github.com/mysql/mysql-server/blob/0cd98bdf981583a1cf4cb526581fc16e23bb839b/client/mysql.cc#L352)：

```
static COMMANDS commands[] = {
  { "?",      '?', com_help,   1, "Synonym for `help'." },
  { "clear",  'c', com_clear,  0, "Clear the current input statement."},
  { "connect",'r', com_connect,1,
    "Reconnect to the server. Optional arguments are db and host." },
  { "delimiter", 'd', com_delimiter,    1,
    "Set statement delimiter." },
#ifdef USE_POPEN
  { "edit",   'e', com_edit,   0, "Edit command with $EDITOR."},
#endif
  { "ego",    'G', com_ego,    0,
    "Send command to mysql server, display result vertically."},
}
```

[解析](https://github.com/mysql/mysql-server/blob/582b7283472a43af5d7fb51386df055ea9d44a96/client/mysql.cc#L2085)SQL中的command：

```c
if (!*ml_comment && inchar == '\\' &&
    !(*in_string && 
      (mysql.server_status & SERVER_STATUS_NO_BACKSLASH_ESCAPES)))
{
  // Found possbile one character command like \c

  if (!(inchar = (uchar) *++pos))
break;              // readline adds one '\'
  if (*in_string || inchar == 'N')  // \N is short for NULL
  {                 // Don't allow commands in string
*out++='\\';
*out++= (char) inchar;
continue;
  }
  if ((com=find_command(NullS,(char) inchar))){...}
```

## Impala-Shell行为

### 源码分析

两种选项：

- shell选项(默认impala_shell_config_defaults.py)
- 查询选项（没有默认值）

3个默认配置文件：

- /etc/impalarc
- ~/.impalarc
- `--config_file`指定配置文件

模式：

- 交互式 | 非交互式
- 忽略报错 | 不忽略报错
- 从标准输入读取SQL | 从文件读取SQL | 从`-q`参数读取SQL
- 

流程：

```
Impala_shell.py#impala_shell_main()



```



### Impala_shell.py#impala_shell_main()

读取global_config文件

读取user_config文件

加载配置文件：def get_config_from_file()

初始化parser：get_option_parser

初始化delim

kerberos，ldap，ssl检查

ldap连接测试

open输出文件

解析并替换变量

非交互模式：execute_queries_non_interactive_mode

- 读取query_text
- 解析parse_query_text()
  - 按分号分割为query_list：sqlparse.split
  - 去掉结尾的注释strip_comments
- ImpalaShell.execute_query_list()
  - 对于单条SQL去掉结尾分号：sanitise_input
    - _check_for_command_completion()
      - 判断_cmd_ends_with_delim
        - 去掉结尾注释：strip_comments
        - shlex.split()
        - 如果以分号结尾：
          - 拼接好完整cmd
          - _shlex_split
          - 返回true
      - 如果没有发现分隔符：
        - 输入从history中移出
        - 输入append到partial_cmd
      - 如果发现分隔符：
        - partial_cmd放入history
        - 命令执行
        - partial_cmd清空
    - _remove_comments_before_set()
  - Onecmd()
    - replace_variables()
    - parseline()
    - 分发do_<command>()

交互模式：ImpalaShell.cmdloop()













