# Git

## clone一个分支

    git clone --single-branch -b "jdk/jdk" git@github.com:yx91490/openjdk.git openjdk2

### 修改已提交commit的user信息

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
