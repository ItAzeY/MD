# git

## 获取 ssh

> 需要和 github 上面的邮箱关联在一起

```bash
ssh-keygen -t rsa -C "953463876@qq.com"
```

## 关联 github

> github 上面 settings 创建一个新的 ssh
> 把刚刚新创建的 ssh 填入到 `key` 中

### init

> 在本地的文件夹中 git init

### 添加远程仓库

> 如果有了远程仓库请先删除掉

```bash
git remote add origin git@github.com:ItAzeY/md.git
```

### pull 代码

> 先把仓库的代码拉取到本地

```git
git pull --rebase origin master
```

### 提交

> add . 只能对已经受 git 管理的文件进行提交

```git
git add <文件名>
git add .
```

### commit

> -m 应该就是 master 分支的意思

```git
git commit -m "提交的信息名称"
```

### push 代码

> 第一次提交的时候需要加上`-u`,以后就不需要哦

```git
git push -u origin master
```

### 查看远程仓库

> 有的时候我们想查看,当前远程仓库的地址

```Bash
# 列出已经存在的远程分支
git remote
# 列出详细信息,在每一个名称后面有远程仓库的url
git remote -v | --verbose
```

### 删除远程仓库

> git 管理得文件夹已经关联了 github 远程仓库,
> 此时我想要把这个文件夹关联到别的 github 远程仓库

```Bash
git remote rm origin
```

## 分支

### 创建分支

```Bash
# 创建 dev 分支
git branch dev
```

### 切换分支

```Bash
# 切换到 dev 分支
git checkout dev
```

### 创建并切换分支

```Bash
# 创建 dev 分支,并切换到 dev 分支
git checkout -b dev
```

### 查看分支

```Bash
# 查看分支
# 前面带(*)号的就是当前分支
git branch
# 查看远程分支
git branch -r
```

### 删除远程分支

```Bash
# 删除远程的 dev 分支
git push origin :heads/dev
```

### 删除本地分支

```Bash
# 删除本地的 dev 分支
# -d选项只能删除已经参与了合并的分支
# -D强行删除一个分支
git branch -d dev
git branch -D dev
```

### 合并分支

```Bash
# 将 dev 分支与当前分支进行合并
git merge dev
```

### 创建远程分支

```Bash
# 在远程创建 dev 分支
git push origin dev
```

### 忽略文件

> 在`git`管理仓库的根目录下创建一个`.gitignore`文件,在里面写上需要忽略的文件

```txt
# Xcode
.DS_Store
*/build/*
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
profile
*.moved-aside
DerivedData
.idea/
*.hmap
*.xccheckout
*.xcworkspace
!default.xcworkspace
.look

#CocoaPods
Pods
!Podfile
!Podfile.lock
```

### 分支提交

> 当你在分支里面修改了代码,需要先 `add` 再 `commit`,不然你是切换不了分支的

## git 三大区

1. 工作区
2. 暂存区
3. 版本区

### 添加到暂存区

```Bash
# 将所有被追踪的文件添加到暂存区
git add .
```

### 删除暂存区的文件

```Bash
# 撤销所有
git reset HEAD -- .
# 撤销单独的文件
git reset HEAD -- <test.txt> 撤销特定目标
```

### 删除版本区的文件

```js
//仅仅只是撤销已提交的版本库，不会修改暂存区和工作区
git reset --soft 版本库ID
//仅仅只是撤销已提交的版本库和暂存区，不会修改工作区
git reset --mixed 版本库ID
//彻底将工作区、暂存区和版本库记录恢复到指定的版本库
git reset --hard 版本库ID
```

### 删除暂存区和工作区的文件

```js
// 工作区的文件也会被删除
git rm -f 文件名
```
