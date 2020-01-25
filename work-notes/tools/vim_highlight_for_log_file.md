# vim高亮显示*.log日志文件

### 方式一：内置messages高亮

配置：

在命令模式输入：

```
:set filetype=messages
```

截图：

![meesages](./vim_highlight_for_log_file.assets/meesages.png)

### 方式二：使用codelibra/log4jhighlighter插件

配置：

拷贝`log4j_syntax_detect.vim`到`~/.vim/ftdetect`目录下面

拷贝`log4j_syntax_highlighter.vim`到`~/.vim/syntax`目录下面

截图：

![log4jhighlighter](./vim_highlight_for_log_file.assets/log4jhighlighter.png)

### 方式三：使用MTDL9/vim-log-highlighting插件

配置：

拷贝`ftdetect`和`syntax`文件夹到`~/.vim/`目录下面

截图：

![vim-log-highlighting](./vim_highlight_for_log_file.assets/vim-log-highlighting.png)

### 参考

- [MTDL9 / vim-log-highlighting](https://github.com/MTDL9/vim-log-highlighting)

- [codelibra/log4jhighlighter](https://github.com/codelibra/log4jhighlighter)

- [How to make vim apply /var/log/messages syntax highlighting to any file called “messages” or “messages-*”?](https://unix.stackexchange.com/questions/41803/how-to-make-vim-apply-var-log-messages-syntax-highlighting-to-any-file-called)