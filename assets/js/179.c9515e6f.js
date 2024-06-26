(window.webpackJsonp=window.webpackJsonp||[]).push([[179],{597:function(t,a,e){"use strict";e.r(a);var s=e(10),l=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vim的那些事"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vim的那些事"}},[t._v("$")]),t._v(" Vim的那些事")]),t._v(" "),a("h3",{attrs:{id:"三种操作模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三种操作模式"}},[t._v("$")]),t._v(" 三种操作模式")]),t._v(" "),a("p",[t._v("Vim编辑程序有三种操作模式，分别称为 "),a("strong",[t._v("编辑模式")]),t._v("、"),a("strong",[t._v("插入模式")]),t._v(" 和 "),a("strong",[t._v("命令模式")]),t._v("。")]),t._v(" "),a("h3",{attrs:{id:"编辑模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编辑模式"}},[t._v("$")]),t._v(" 编辑模式")]),t._v(" "),a("p",[t._v("当运行Vim时，首先进入编辑模式：")]),t._v(" "),a("h4",{attrs:{id:"移动光标"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#移动光标"}},[t._v("$")]),t._v(" 移动光标")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<ctrl-o>, <ctrl-i>          将光标移动到上次位置\nk                           上移\nj                           下移\nh                           左移\nl                           右移\n\ngg                          将光标定位到文件第一行起始位置\nG                           将光标定位到文件最后一行起始位置\nNG或Ngg                     将光标定位到第 N 行的起始位置\n\nH                           将光标移动到屏幕的顶部\nM                           将光标移动到屏幕的中部\nL                           将光标移动到屏幕的底部\nzt                          将光标所在行移动窗口的顶端\nzz                          将光标所在行移动窗口的中间\nzb                          将光标所在行移动窗口的底端\nnzt                         将第n行滚至屏幕顶部\nnzb                         将第n行滚至屏幕底部\nnzz                         将第n行滚至屏幕中部\n\nw                           右移光标到下一个字的开头\ne                           右移光标到下一个字的末尾\nb                           左移光标到前一个字的开头\n0                           数字０，左移光标到本行的开始\n$                           右移光标，到本行的末尾\n^                           移动光标，到本行的第一个非空字符。\n\n(                           按句子向前移动光标\n)                           按句子向后移动光标\n{                           按段落向前移动光标\n}                           按段落向后移动光标\n")])])]),a("h4",{attrs:{id:"删除文本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#删除文本"}},[t._v("$")]),t._v(" 删除文本")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("命令")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("功能")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d0")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从行首删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d^")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从该行第1个字符（不包括前导空格和制表符）开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dw")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到字的末尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d3w")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到第3个字的末尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dW")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到空白分隔符的末尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("db")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从字的首字符开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dB")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从空白分隔符的末尾开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d3B")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从前面的第3个空白分隔字的首字符开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除至句子的结尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d4)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到第4个句子的结尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d(")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从句首开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d}")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到段落末尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d{")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从段首开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d7{")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从前面第7段开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d/text")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("一直删除到text单词的下一次出现处")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dfc")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("在当前行删除到c的下一次出现处（包括c）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dtc")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("在删除到当前行c的下一次出现处")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("D")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到行尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d$")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到行尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("5dd")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除从当前行开始的5行")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dL")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到屏幕的最后一行")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dH")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从屏幕的第1行开始删除")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dG")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除到工作缓冲区的末尾")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d1G")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从工作缓冲区的起始处开始删除")])])])]),t._v(" "),a("h4",{attrs:{id:"搜索"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搜索"}},[t._v("$")]),t._v(" 搜索")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/str1                       正向搜索字符串 str1\nn                           继续搜索，找出 str1 字符串下次出现的位置\nN                           继续搜索，找出 str1 字符串上一次出现的位置\n?str2                       反向搜索字符串 str2\n")])])]),a("h4",{attrs:{id:"复制粘贴"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#复制粘贴"}},[t._v("$")]),t._v(" 复制粘贴")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("yy                          复制当前行到内存缓冲区\nnyy                         复制 n 行内容到内存缓冲区\np                           小写字母 p，将缓冲区的内容粘贴到光标的后面\nP                           大写字母 P，将缓冲区的内容粘贴到光标的前面\n")])])]),a("h4",{attrs:{id:"撤销"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#撤销"}},[t._v("$")]),t._v(" 撤销")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("u                           撤消前一条命令的结果\nctrl+r                      重做\n")])])]),a("h3",{attrs:{id:"插入模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#插入模式"}},[t._v("$")]),t._v(" 插入模式")]),t._v(" "),a("p",[t._v("在编辑模式下正确定位光标之后，可用以下命令切换到插入模式：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("i                           在光标左侧插入正文\na                           在光标右侧插入正文\no                           在光标所在行的下一行增添新行\nO                           在光标所在行的上一行增添新行\n")])])]),a("p",[t._v("按 "),a("code",[t._v("ESC")]),t._v(" 键退出插入模式，进入编辑模式。")]),t._v(" "),a("h3",{attrs:{id:"命令模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命令模式"}},[t._v("$")]),t._v(" 命令模式")]),t._v(" "),a("p",[t._v("在编辑模式下键入 "),a("code",[t._v(":")]),t._v(" 进入命令模式：")]),t._v(" "),a("h4",{attrs:{id:"保存退出"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#保存退出"}},[t._v("$")]),t._v(" 保存退出")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(":w                          保存\n:w {new_file}               另存为\n:<start>,<end> w {file}     把一段内容另存\n:x                          保存并退出,或者:wq\n")])])]),a("h4",{attrs:{id:"查找替换"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查找替换"}},[t._v("$")]),t._v(" 查找替换")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("%")]),t._v(" 表示替换范围是所有行，即全文")]),t._v(" "),a("li",[t._v("命令末尾加"),a("code",[t._v("g")]),t._v(" 表示对每行中的每一次匹配都替换")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(":%s/str1/str2/              用字符串 str2 替换行中首次出现的字符串 str1\n:s/str1/str2/g              用字符串 str2 替换行中所有出现的字符串 str1\n:.,$ s/str1/str2/g          用字符串 str2 替换正文当前行到末尾所有出现的字符串 str1\n:1,$ s/str1/str2/g          用字符串 str2 替换正文中所有出现的字符串 str1\n:m,ns/str1/str2/g           将从m行到n行的str1替换成str2\n")])])]),a("h4",{attrs:{id:"shell切换"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#shell切换"}},[t._v("$")]),t._v(" shell切换")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(":!shell_command             执行完 shell_command 后回到Vim\n")])])]),a("h4",{attrs:{id:"文件编码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件编码"}},[t._v("$")]),t._v(" 文件编码")]),t._v(" "),a("p",[t._v("查看文件编码：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(":set fileencoding\n")])])]),a("p",[t._v("文件编码转换：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(":set fileencoding=utf-8\n")])])]),a("p",[a("a",{attrs:{href:"http://yongzhi.wang/vim-digraph",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vim 查找/替换/输入非可见字符"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=l.exports}}]);