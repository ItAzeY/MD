# Tree 命令

> 原本用`tree`是想着可以忽略文件夹的,可惜忽略命令只能`Linux`中用
> 以下是能在`Windows`中生效的命令

## 安装

```Bash
npm install tree
```

## 使用

### 生成文件

```bash
# 把文件目录生成再当前文件夹下面tree.txt文件中
# > tree.txt 是生成指定的文件
tree > tree.txt
```

### tree

```bash
# 只显示文件夹目录
tree
```

### tree /f

```bash
# 显示文件夹内的每个文件名
tree /f
```

### tree /a

```bash
# 指定使用文本字符显示(默认是图形字符)
tree /a
```

### 指定盘符

```bash
# 把e盘下面的所有文件生成结构(当然没什么用,我们肯定要指定文件夹)
tree e:
```

### 指定文件夹

```bash
# 将 E 盘下面的 demo 文件夹生成目录树(注意看/)
tree e:/demo
```

### 指定文件夹生成文件

```bash
# 将 E 盘下面的 demo 文件夹生成目录树 然后存储到 text.md 文件中
tree e:/demo > text.md
```

### 指定文件夹输出格式并保存文件

```bash
# 将e:/demo/vue-element-admin-4.0.1目录下面的所有文件生成目录结构并保存到当前目录下的list.md文件中
tree e:/demo/vue-element-admin-4.0.1 /f >list.md
```

### 指定文件夹输出格式并保存到指定的文件夹的文件中

```bash
# 将e:/demo/vue-element-admin-4.0.1目录下的所有文件以文本字符生成结构并保存到e:/list.md文件中
tree e:/demo/vue-element-admin-4.0.1 /f /a > e:/list.md
```

### 自己制作 bat 文件

> 在桌面或者任意地方,新建一个`.txt`文件,把下面代码放进去保存,然后把这个.txt 文件转成.bat 文件,双击运行即可

```bat
:: 这是注释 tree d:\ 下面的所有文件目录写到当前目录下的 d.txt 和 f.txt 文件中
@echo off

echo 正在建立目录文件, 请稍后...

tree d:\ >d.txt

tree f:\ >f.txt

echo 建立目录文件完成！定定制作，(*^__^*) 嘻嘻……

echo. & pause
```
