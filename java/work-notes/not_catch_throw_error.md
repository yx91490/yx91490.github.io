# 代码throw Error导致的问题

最近组里的同学遇到一个诡异的问题：一个storm项目跑着跑着就停了，但是看日志没有任何异常。还是组长有经验，说遇到过一个类似的问题，是commons-lang抛出错误（throw error ），但是代码里只catch了exception，让那位同学catch throwable果然问题现出原形。原因是多个版本冲突导致的，不得不感叹姜还是老的辣！
