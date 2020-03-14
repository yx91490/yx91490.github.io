# Git

## Git命令

#### clone单个分支

    git clone --single-branch -b "jdk/jdk" git@github.com:yx91490/openjdk.git openjdk2

#### 修改已push的user信息

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

#### 参考

- [changing author info](https://help.github.com/en/articles/changing-author-info)



## Git工作流

### Git flow

#### 图示

<img src="git.assets/git-model@2x.png" alt="img" style="zoom: 40%;" />

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

<img src="git.assets/gitlab_flow_github_flow.png" alt="github_flow" style="zoom: 67%;" />

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

<img src="git.assets/gitlab_flow_release_branches.png" alt="版本发布" style="zoom: 67%;" />

总结：

- 发布的时候创建新的release分支，通常使用带有次要版本号的命名方式，如2-3-stable
- bug修复先合并到master分支，再cherry-pick到相应的release分支（上游优先原则）
- 引入bug修复后的release分支打上新版本号（修订号+1）的标签
- 稳定发布版的分支维护在*-stable分支上

#### 持续发布

图示：

<img src="git.assets/gitlab_flow_environment_branches.png" alt="持续发布" style="zoom:67%;" />

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