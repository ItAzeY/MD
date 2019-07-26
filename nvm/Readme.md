# nvm

## mac 卸载 node

如果已经安装了`node`需先卸载

```bash
npm ls -g --depth=0 # 查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
sudo rm -rf /usr/local/lib/node_modules # 删除全局 node_modules 目录
sudo rm /usr/local/bin/node # 删除 node
cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm # 删除全局 node 模块注册的软链
```

## mac 安装 nvm

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

此时你还没有成功

在 .bash_profile 文件中键入如下代码，配置环境变量。编辑完成后直接保存文件，关闭.bash_profile 文件

```text
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

如果没有这个文件，可以创建一个

1. 启动终端
2. 进入当前用户的 home 目录：输入 cd ~
3. 创建.bash_profile：输入“touch .bash_profile”
4. 编辑.bash_profile 文件：输入“open .bash_profile”
5. 在弹出的.bash_profile 文件内进行编辑

检查安装成功没有

```bash
nvm --version
```

## 安装 node 版本

```bash
# 安装最新版 node
nvm install stable
# 安装指定版本的node
nvm install [node版本号]
# 切换到指定版本的node
nvm use [node版本号]
# 查看版本
nvm ls
```

## 设置默认版本

这样就不用每次都切换版本

```bash
nvm alias default v10.16.0
```
