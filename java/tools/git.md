# Git笔记

## Git协议种类

git支持四种协议：Local, HTTP, Secure Shell (SSH) 和 Git。

### Local协议

比如克隆一个本地仓库：

```shell
git clone /path/to/repo.git
# 或者
git clone file:///path/to/repo.git
```

基于文件的存储库的优点在于它们很简单，并且使用现有的文件权限和网络访问权限。

### HTTP协议

比如克隆github的[`apache/hadoop`仓库](https://github.com/apache/hadoop)：

```shell
git clone https://github.com/apache/hadoop.git
```

与SSH相比，能够使用用户名和密码进行身份验证也是一个很大的优势，因为用户不必在本地生成SSH密钥并将其公共密钥上载到服务器即可与之交互。

另一个好处是，HTTPS是常用的协议，因此公司防火墙通常被设置为允许通过这些端口的通信。

记住密码配置：

```shell
git config --global credential.helper store
```

### SSH协议

格式：

```shell
# 类似scp命令的形式：
[user@]host:path_to_repo.git
# 或者URL格式的形式：
ssh://[user@]host[:port]/path_to_repo.git
```

其中user默认为当前登录用户，port默认为22。

比如克隆github的[`apache/hadoop`仓库](https://github.com/apache/hadoop)：

```shell
git clone git@github.com:apache/hadoop.git
git clone ssh://git@github.com/apache/hadoop.git
```

SSH是经过身份验证的网络协议，并且由于它无处不在，因此通常易于设置和使用。

像HTTPS，Git和本地协议一样，SSH高效，在传输数据之前使数据尽可能紧凑。

### Git协议

Git协议的缺点是缺少身份验证。它还需要防火墙访问端口9418，这通常不是公司防火墙允许的标准端口。

### 参考

- [4.1 Git on the Server - The Protocols](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols)
- [Github-Which remote URL should I use?](https://help.github.com/en/github/using-git/which-remote-url-should-i-use)

## Git命令

### clone单个分支

    git clone --single-branch -b "jdk/jdk" git@github.com:yx91490/openjdk.git openjdk2

### 修改历史commit的author信息

按如下输入进入一个类似vim编辑器的交互页：

```
git rebase -i HEAD~3
```

将要修改的`commit 1`开头的`pick`改成`edit`：

```
edit aaaa commit 1
pick bbbb commit 2
pick cccc commit 3
```

然后保存退出，即`:wq`。接着输入下面的命令来修改提交者信息：

```
$git commit --amend --author="Foo <foo@bar.com>"
```

最后输入保存命令：

```
git commit --continue
```

参考：[Git修改历史commit的author信息](https://juejin.cn/post/6993513552199811102)

### 修改已push的所有user信息

执行脚本：

```
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

强制提交：

```
git push --force --tags origin 'refs/heads/*'
```

强制拉取：

```
git merge --allow-unrelated-histories
```

参考：[changing author info](https://help.github.com/en/articles/changing-author-info)

### 修改已push commit的提交日期

1. 修改日期格式：

   ```shell
   git config log.date iso-local
   ```

2. 执行命令：

   ```shell
   git filter-branch --env-filter \
       'if [ $GIT_COMMIT = b0e3533c1e25ef19bd68ad54c987fd9aac7b8372 ]
        then
            export GIT_AUTHOR_DATE="2020-01-9 18:01:49 +0800"
            export GIT_COMMITTER_DATE="2020-01-9 18:01:49 +0800"
        fi'
   ```

### 从远程仓库同步tags

```bash
git fetch --all --tags
```

参考：[How To Checkout Git Tags](https://devconnected.com/how-to-checkout-git-tags/)

### 删除远程分支

```
git push origin --delete <branch_name>
```

参考：[git删除远程分支和本地分支](https://www.cnblogs.com/luosongchao/p/3408365.html)

### 同步上游仓库

1.配置上游remote：

```
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

2.Fetch上游变更（如果有必要的话）：

```
git fetch upstream
```

3.Checkout到本地分支：

```
git checkout main
```

4.Merge对应的上游分支：

```
git merge upstream/main
```

参考：

[Configuring a remote for a fork](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork)

[Syncing a fork](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)

### 合并

```shell
# “仅快进”的合并
git merge --ff-only origin/master
```

### Git pull不能快进问题

```
git pull --rebase
```

参考：[Fatal: Not possible to fast-forward, aborting](https://stackoverflow.com/questions/13106179/fatal-not-possible-to-fast-forward-aborting/43460847)

### 生成及合入patch

生成patch 的方法：

```shell
git format-patch <commitId>
```

打入patch 的方法：

```shell
git am <file1>, <file2>...
```

参考

[Git 打补丁-- patch 和 diff 的使用（详细）](https://juejin.cn/post/6844903646384095245)

### 子模块

克隆并自动初始化并更新仓库中的每一个子模块：

```shell
git clone --recurse-submodules https://github.com/<account>/<repo>
```

或者克隆之后再进行子模块的初始化：

```shell
# 克隆不包含子模块
git clone https://github.com/<account>/<repo>

# 初始化本地配置文件
git submodule init

# 从该项目中抓取所有数据并检出父项目中列出的合适的提交
git submodule update
```

参考：

[7.11 Git 工具 - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)

### 根据变更内容查找commit

查看某行的内容在哪个commit被新增或删除：

```
git log -S <SearchString> [[--] <path>...]
```

## Git工作流

### Git flow

#### 图示

<img src="./git.assets/git-model@2x.png" alt="img" style="zoom: 40%;" />

#### 特点

- 项目存在两个长期分支：
  - `master`分支用于存放稳定的发布版
  - `develop`分支用于存放最新的开发版

- 项目存在三种短期分支（一旦完成开发，它们就会被合并进`develop`或`master`，然后被删除）：
  - feature-*分支（功能分支）
  - hotfix-*分支（补丁分支）
  - release-*分支（预发分支，分配新版本号）

#### 来源和去向

- develop分支：
- 来源于master分支（首次）、release分支（以及feature分支、hotfix分支）
  - 合并到release分支（最终合并到master分支）
- release分支：
  - 来源于develop分支
    - 合并到master分支以及develop分支
- feature分支（通常仅存在于开发者本地仓库）：
  - 来源于develop分支
  - 合并到develop分支
- hotfix分支：
  - 来源于master分支
  - 合并到master分支以及develop分支（以及release分支如果存在的话）

#### 总结

- 需要长期维护两个分支，维护复杂
- 适合较长版本发布周期的项目
- 稳定发布版的分支维护在master分支

### Github flow

#### 图示

<img src="./git.assets/gitlab_flow_github_flow.png" alt="github_flow" style="zoom: 67%;" />

#### 特点

- master 分支中包含稳定的代码。该分支已经或即将被部署到生产环境。
- 对代码的任何修改，包括 bug 修复、hotfix、新功能开发等都在单独的分支中进行。
- 当新分支中的代码全部完成之后：
  - 通过 GitHub 提交一个新的 pull request。
  - 团队中的其他人员会对代码进行审查，提出相关的修改意见。
  - 由持续集成服务器（如 Jenkins）对新分支进行自动化测试。
  - 当代码通过自动化测试和代码审查之后，该分支的代码被合并到 master 分支。
- 要求项目有完善的自动化测试、持续集成和部署等相关的基础设施。每个新分支都需要测试和部署。
- 要求团队有代码审查的相应流程。

#### 总结

- 单一主分支，维护简单
- 适合持续发布
- 稳定发布版的分支维护在master分支上

### Gitlab flow

包括两种模式：

- 版本发布
- 持续发布

#### 版本发布

<img src="./git.assets/gitlab_flow_release_branches.png" alt="版本发布" style="zoom: 67%;" />

总结：

- 发布的时候创建新的release分支，通常使用带有次要版本号的命名方式，如2-3-stable
- bug修复先合并到master分支，再cherry-pick到相应的release分支（上游优先原则）
- 引入bug修复后的release分支打上新版本号（修订号+1）的标签
- 稳定发布版的分支维护在*-stable分支上

#### 持续发布

图示：

<img src="./git.assets/gitlab_flow_environment_branches.png" alt="持续发布" style="zoom:67%;" />

总结：

- master、pre-production、production分支分别对应暂存环境，预生产环境，生产环境
- commit信息仅从上游流到下游，确保任何更改都在所有环境测试通过
- bug修复通常新建feature分支然后合并到master，测试通过后继续向下游合并
- 稳定发布版的分支维护在production分支

### 参考

- [Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)
- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
- [Introduction to GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
