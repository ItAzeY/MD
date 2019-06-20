# grid 布局

## 基本概念

### 容器和项目

> 其中`container`就是容器.`item`就是项目.`grid`布局只对项目生效,对`p`标签是不会生效的,我理解的就是容器的直接子集才可以

```html
<div class="container">
	<div class="item item-1"></div>
	<div class="item item-2"></div>
	<div class="item item-3"></div>
	<div class="item item-4"><p>pppppp</p></div>
</div>
```

### 行和列

> 行 `row` 水平, 列 `column` 垂直

### 单元格

> 行和列的交叉区域,称之为单元格(cell)

- 正常情况下,`n`行 和 `m`列会产生`n * m`个单元格,例如: 3 \* 3 会产生 9 个单元格

### 网格线

> 划分网格的线,称为"网格线"(grid line). `n`行有`n + 1`根水平网格线, `m`列有`m + 1`列垂直网格线

## 容器属性

> 容器属性(也就是父元素的属性),

### display 属性

> `display: grid`指定一个容器采用网格布局

[点击这里查看](./html/grid1.html)
![index1](./img/index1.png)

```txt
上图是`display:grid;`属性
```

默认情况下 **容器**是`块级元素`, 当然也可以设置为`行内元素`

[点击这里查看](./html/grid2.html)
![index2](./img/index2.png)

```txt
上图是`display:inline-grid;`属性的效果
```

```txt
注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。
```

### grid-template-columns 属性和 grid-template-rows 属性

> 容器指定了是网格布局以后,就要划分行和列.

- `grid-template-columns` : 属性是用来定义每一列的列宽
- `grid-template-rows` : 属性是用来定义每一行的行高

```css
.container {
	display: grid;
	grid-template-columns: 50px 50px;
	grid-template-rows: 50px 50px;
}
```

[上面代码](./html/grid3.html)指定了一个两行两列的网格,网格的列宽和行高都是`50px`
![index3](./img/index3.png)

> 上面的单位用的是`绝对单位(px)`,也可以用`相对单位(%,em,vw,vh...)`

[百分比](./html/grid4.html)
![index4](./img/index4.png)
**注意**: 上面的行高我设置的是`50%`,但是展示的时候是按照元素内容的行高展示的.`控制台`信息`[Deprecation] Percentages row tracks and gutters for indefinite height grid containers will be resolved against the intrinsic height instead of being treated as auto and zero`(意思是说: 已经弃用的元素,不定高度的网格布局或者是百分比布局将根据固有的高度进行解析,而不是自动视为 auto 和 0)

#### repeat()

> 有时候重复写同样的值非常麻烦.这时,我们可以使用`repeat()`函数,简化重复的值

```css
.container {
	display: grid;
	grid-template-columns: repeat(2, 50%);
	grid-template-rows: repeat(2, 50%);
}
```

`repeat()`接受两个参数,第一个参数是重复的次数(上面是 2),第二个参数是所要重复的值.
`repeat()` 的第二个参数也可以是一种模式

```css
/* 重复两次,每次的第一列是 100px 第二列是50px */
grid-template-columns: repeat(2, 100px 50px);
```

[重复模式](./html/grid5.html)
![index5](./img/index5.png)

**注意**: `绝对单位(px)`是没问题.但是如果是`相对单位(%)`那可能还是有点问题的

[百分比问题](./html/grid6.html)
![index6](./img/index6.png)

```txt
设置的是百分比,百分比是根据父元素来设置的.
```

#### auto-fill 关键字

> 有时候,单元格的大小是固定的,但是容器的大小不确定.如果希望每一行(或每一列)容纳尽可能多的单元格,这时候可以用`auto-fill`关键字表示自动填充

```css
.container {
	display: grid;
	grid-template-columns: repeat(auto-fill, 100px);
}
```

[上面代码](./html/grid7.html)表示每列宽度 100px,然后自动填充,直到容器不能放置更多的列
![index7](./img/index7-1.png)
上面的图片是容器的宽度比较大的时候
![index7-2](./img/index7-2.png)
上面的图片是容器的宽度不够大的时候,`项目`会换行展示

```css
/* 这样的写法是错误的. */
grid-template-columns: repeat(auto-fill, 1fr);
```

#### fr 关键字

> 为了更方便的表示比例关系,网格布局提供了`fr`关键字,如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍。

```css
.container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}
```

[上面代码](./html/grid8.html)表示 3 个相同宽度的列
![index8](./img/index8.png)

- `fr` 可以与绝对长度的单位结合使用,这时会非常方便

```css
.container {
	display: grid;
	grid-template-columns: 150px 1fr 2fr;
}
```

[上面代码](./html/grid9.html)表示第一个元素为`100px`的宽度,剩下的宽度分为 3 分,第二个元素占一份,第三个元素占两份.
![index9](./img/index9.png)

#### minmax()

> `minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
.container {
	display: grid;
	grid-template-columns: 1fr 1fr minmax(100px, 1fr);
}
```

上面代码中，minmax(100px, 1fr)表示列宽不小于 100px，不大于 1fr。
[上面代码](./html/grid10.html)表示第一个元素为`100px`的宽度,第二个元素为`1fr`,第三个为`最小单位是100 px,最大单位是1 fr,相当于最大宽最小宽`
![index10](./img/index10.png)

#### auto 关键字

> auto 关键字表示由浏览器自己决定长度。

```css
.container {
	display: grid;
	grid-template-columns: 100px auto 100px;
}
```

[上面代码](./html/grid11.html)第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了 min-width，且这个值大于最大宽度.(我理解的就是自适应)

**请注意**会被`min-width 和 max-width`影响.
![index11](./img/index11.png)

#### 网格线的名称

> `grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container {
	display: grid;
	grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
	grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

上面的代码,有四个网格线,因为我们是`3 * 3`的网格布局,是需要有四个网格线的.

网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

#### 12 网格布局

```css
.container {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
}
```

### grid-row-gap 属性， grid-column-gap 属性，grid-gap 属性

> `grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）。

```css
.container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
}
```

[上面代码](./html/grid12.html)`grid-row-gap`用于设置行间距，`grid-column-gap`用于设置列间距。

**注意**只有网格中间是有间距,是没有`padding-top`和`padding-bottom`的
![index12](./img/index12.png)

> `grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式，语法如下。

```css
grid-gap: <grid-row-gap> <grid-column-gap>;
```

因此，上面一段 CSS 代码等同于下面的代码。

```css
.container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 20px 20px;
}
```

> 如果`grid-gap`省略了第二个值，浏览器认为第二个值等于第一个值。

```md
根据最新标准，上面三个属性名的`grid-`前缀已经删除，`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`，`grid-gap`写成`gap`。
```

### grid-template-areas 属性

> 网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas` 属性用于定义区域。

```css
.container {
	display: grid;
	grid-template-columns: 100px 100px 100px;
	grid-template-rows: 100px 100px 100px;
	grid-template-areas:
		"a b c"
		"d e f"
		"g h i";
}
```

> 上面代码先划分出 9 个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

> 多个单元格合并成一个区域的写法如下。

```css
.container {
	display: grid;
	grid-template-columns: 100px 100px 100px;
	grid-template-rows: 100px 100px 100px 100px;
	grid-template-areas:
		"葡萄 葡萄 葡萄"
		"龙虾 养鱼 养鱼"
		"龙虾 养鱼 养鱼"
		"西瓜 西瓜 西瓜";
}
.putao {
	grid-area: 葡萄;
	background: yellow;
}
.longxia {
	grid-area: 龙虾;
	background: red;
}
.yangyu {
	grid-area: 养鱼;
	background: blue;
}
.xigua {
	grid-area: 西瓜;
	background: yellow;
}
```

```html
<div class="container">
	<div class="putao">葡萄</div>
	<div class="longxia">龙虾</div>
	<div class="yangyu">养鱼</div>
	<div class="xigua">西瓜</div>
</div>
```

> 上面代码将 9 个单元格分成 a、b、c、d 四个区域。
> a 是头部, b 和 c 是中间内容, d 是底部
> 虽说我们分成了 9 个单元格,但是我们只用了 4 个盒子(区域)

[上面代码](./html/grid13.html)
![index13](./img/index13.png)

**注意:**如果我们给网格区域命了名，但是没有给网格线命名，则会自动根据网格区域名称生成网格线名称，规则是区域名称后面加-start 和-end。例如，某网格区域名称是“葡萄”，则左侧 column 线名称就是“葡萄-start”，左侧 column 线名称就是“葡萄-end”。

以及，我们的网格区域一定要形成规整的矩形区域，什么 L 形，凹的或凸的形状都是不支持的，会认为是无效的属性值。

### grid-template 属性

> `grid-template` 是 `grid-template-rows` 和 `grid-template-columns` 和 `grid-template-areas`属性的缩写。

语法如下

```css
.container {
	grid-template: <grid-template-rows> / <grid-template-columns>;
}
```

举个例子,上图的区域划分.用`grid-template`缩写表示就是:

```css
.container {
	display: grid;
	grid-template:
		"葡萄 葡萄 葡萄" 100px
		"龙虾 养鱼 养鱼" 100px
		"龙虾 养鱼 养鱼" 100px
		"西瓜 西瓜 西瓜" 100px
		/100px 100px 100px;
}
```

[上面代码](./html/grid14.html)
![index13](./img/index13.png)

由于 `grid-template` 不会重置一些隐式的 `grid` 属性（如 `grid-auto-columns`，`grid-auto-rows` 和 `grid-auto-flow`），因此，大多数时候，还是推荐使用 `grid` 代替 `grid-template`。

> 理解的就是说 不要用这种东西,还是老老实实用`grid`,现在还没介绍到,后面介绍 TODO

### grid-auto-flow 属性

> 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。

![index14](./img/index14.png)

这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。

```css
grid-auto-flow: column;
```

[上面代码](./html/grid15.html)设置了 column 以后，放置顺序就变成了下图
![index15](./img/index15.png)

> `grid-auto-flow`属性除了设置成`row`和`column`，还可以设成`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

[下面代码](./html/grid16.html)让 1 号项目和 2 号项目各占据两个单元格.然后在默认的 `grid-auto-flow: row` 情况下，会产生下面这样的布局。
![index16](./img/index16.png)

上图中，1 号项目后面的位置是空的，这是因为 3 号项目默认跟着 2 号项目，所以会排在 2 号项目后面。

现在修改设置，设为 `row dense`，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。

```css
grid-auto-flow: row dense;
```

[上面代码](./html/grid17.html)的效果如下:
![index17](./img/index17.png)

上图会先填满第一行，再填满第二行，所以 3 号项目就会紧跟在 1 号项目的后面。8 号项目和 9 号项目就会排到第四行.

如果将设置改为`column dense`，表示"先列后行"，并且尽量填满空格。

```css
grid-auto-flow: column dense;
```

[上面代码](./html/grid18.html)的效果如下:
![index18](./img/index18.png)

上图会先填满第一列，再填满第 2 列，所以 3 号项目在第一列，4 号项目在第二列。8 号项目和 9 号项目被挤到了第四列。

### justify-items 属性

> `justify-items`属性设置单元格内容的水平开始位置（左中右），`align-items`属性设置单元格内容的垂直开始位置（上中下）。

**注意:** 设置的是单元格内容的`开始`位置`开始`位置`开始`位置

语法如下:

```css
.container {
	justify-items: start | end | center | stretch;
}
```

这两个属性的写法完全相同，都可以取下面这些值。

```md
stretch:默认值，拉伸。表现为水平填充

start:表现为网格水平尺寸收缩为内容大小，同时沿着网格线左侧对齐显示（假设文档流方向没有变）。

end:表现为网格水平尺寸收缩为内容大小，同时沿着网格线右侧对齐显示（假设文档流方向没有变）。

center:表现为网格水平尺寸收缩为内容大小，同时在当前网格区域内部水平居中对齐显示（假设文档流方向没有变）。
。
```

```css
.container {
	display: grid;
	grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
	justify-items: start;
}
.item {
	font-size: 4em;
	text-align: center;
}
```

[上面代码](./html/grid19.html)的效果如下:
![index19](./img/index19.png)

**注意:**如果设置`justify-items`不为默认值的情况下,`item`项目的宽度就会收缩成盒子本身的宽度`4em`.其实项目的宽度是正常的`1fr`.

[下面代码](./html/grid20.html)是设置了盒子的宽度,就会撑满了

```css
.container {
	display: grid;
	grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
	justify-items: start;
}
.item {
	font-size: 4em;
	text-align: center;
	width: 100%;
}
```

![index20](./img/index20.png)

上面的例子都是设置水平方向的对齐

### align-items 属性

语法如下:

```css
.container {
	align-items: start | end | center | stretch;
}
```

下面的例子就看看垂直方向的对齐

```css
.container {
	display: grid;
	grid-template: 100px 100px 100px / 100px 100px 100px;
	align-items: start;
}
.item {
	font-size: 2em;
	text-align: center;
}
```

[上面代码](./html/grid21.html)是把垂直方向设置为顶部对齐.

![index21](./img/index21.png)

**注意:**如果设置`align-items`不为默认值的情况下,`item`项目的高度就会收缩成盒子本身的宽度`2em`.其实项目的宽度是正常的`100px`.

### place-items 属性

> 上面讲解了`justify-items` 和 `align-items`,还剩下 `place-items`

我们现在来讲下`place-items`属性

> `place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

语法如下:

```css
place-items: <align-items> <justify-items>;
place-items: end start;
```

**注意**:如果省略第二个值，则浏览器认为与第一个值相等。

```css
.container {
	display: grid;
	grid-template: 100px 100px 100px / 100px 100px 100px;
	place-items: end start;
}
.item {
	font-size: 2em;
	text-align: center;
}
```

[上面代码](./html/grid22.html)是把水平方向设置为左边对齐,垂直方向设置为底部对齐.
![index22](./img/index22.png)
**注意:**如果设置`place-items`不为默认值的情况下,同样会收缩`item`为内容的大小

**注意**`place-items`先设置的是`垂直`方向,其次设置的才是`水平`方向

### justify-content 属性 和 align-content 属性 还有 place-content 属性

> justify-content 属性是整个内容区域在容器里面的水平位置（左中右）,align-content 属性是整个内容区域的垂直位置（上中下）。

**注意:** 设置的是`内容区域` 在 `容器区域` 的位置

```css
.container {
	justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
	align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

这两个属性的写法完全相同，都可以取上面这些值。（下面的图都以 justify-content 属性为例，align-content 属性的图完全一样，只是将水平方向改成垂直方向。）

#### justify-content 属性

- start - 对齐容器的起始边框。
  ![index23](./img/index23.png)

- end - 对齐容器的结束边框
  ![index24](./img/index24.png)

- center - 容器内部居中
  ![index25](./img/index25.png)

- stretch - 项目大小没有指定时，拉伸占据整个网格容器。

- space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
  ![index26](./img/index26.png)

- space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
  ![index27](./img/index27.png)

- space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。
  ![index28](./img/index28.png)

#### align-content 属性

垂直方向的对齐方式

> 需要设置`容器`的高度.例子的容器都是 `500px`

- start - 对齐容器的顶部边框。
  ![index29](./img/index29.png)

- end - 对齐容器的底部边框。
  ![index30](./img/index30.png)

- center - 容器内部居中
  ![index31](./img/index31.png)

- stretch - 默认值。

- space-around - 每个项目垂直的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
  ![index32](./img/index32.png)

- space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
  ![index33](./img/index33.png)

- space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。
  ![index34](./img/index34.png)

#### place-content 属性

> `place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

语法如下:

```css
place-content: <align-content> <justify-content>;
```

**注意:** 第一个属性是先设置`垂直`方向对齐方式,第二个属性设置`水平`方向对齐方式

```css
.container {
	display: grid;
	grid-template: 100px 100px 100px / 100px 100px 100px;
	place-content: space-evenly space-between;
	height: 500px;
}
```

[上面代码](./html/grid35.html)垂直方向设置的是`space-evenly`(项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。), 水平方向设置的是`space-between`(项目与项目的间隔相等，项目与容器边框之间没有间隔)
![index35](./img/index35.png)

### grid-auto-columns 属性 grid-auto-rows 属性

> 有时候，一些项目的指定位置，在现有网格的外部。比如网格只有 3 列，但是某一个项目指定在第 5 行。这时，浏览器会自动生成多余的网格，以便放置项目。

`grid-auto-columns` 属性和 `grid-auto-rows` 属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与 `grid-template-columns` 和 `grid-template-rows` 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

#### grid-auto-columns 属性

[下面例子](./html/grid36.html)里面，划分好的网格是 3 行 x 3 列，但是，8 号项目指定在第 4 行，9 号项目指定在第 5 行。

```css
.container {
	display: grid;
	grid-template: 100px 100px 100px / 100px 100px 100px;
	grid-auto-rows: 100px;
}
```

上面代码指定新增的行高统一为 50px（原始的行高为 100px）。
![index36](./img/index36.png)

### grid-template 属性 grid 属性

> `grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。

> `grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。

> 从易读易写的角度考虑，还是建议不要合并属性，所以这里就不详细介绍这两个属性了。

### grid-column-start 属性 grid-column-end 属性 grid-row-start 属性 grid-row-end 属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线

```css
.item-1 {
	grid-column-start: 2;
	grid-column-end: 4;
}
```

[上面例子](./thml/index37.html)的例子是: 1 号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。至于多出来的两项我用了上一节刚刚讲过的属性
![index37](./img/index37.png)

> 上面我们只是设置了`grid-column-start` 和 `grid-cloumn-end`,下面我们来介绍一下另外两个属性,分别是`grid-row-start` 和 `grid-row-end`

```css
.item-1 {
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 4;
}
```

[上面例子](./thml/index38.html)是四个属性都有的情况,是不是很好,可以任意指定项目的位置
![index38](./img/index38.png)

**注意:** 除了可以指定网格线的位置,还可以指定为网格线的名字.

```css
.item-1 {
	grid-column-start: header-start;
	grid-column-end: header-end;
}
```

上面代码中，左边框和右边框的位置，都指定为网格线的名字

这四个属性的值还可以使用 span 关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

```css
.item-1 {
	background-color: aliceblue;
	grid-column-start: span 2;
	grid-row-start: 2;
	grid-row-end: 4;
}
```

[上面例子](./thml/index39.html)是 1 号项目的左边框距离右边框跨越 2 个网格。
![index39](./img/index39.png)

> 使用`span`关键字,就不要再指定`grid-column-end`来标记结束了

### grid-column 属性 grid-row 属性

> `grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式

```css
.item {
	grid-column: <start>/<end>;
	grid-row: <start>/<end>;
}
```

举个梨子:

```css
.item-1 {
	grid-column: 1/3;
	grid-row: 1/2;
}
/* 等同于 */
.item-1 {
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
}
```

[上面代码](./thml/index40.html)项目`item-1`占据第一行到第二行，从第一根列线到第三根列线。
![index40](./img/index40.png)

> 这两个属性之中，也可以使用`span`关键字，表示跨越多少个网格。

下面的代码和上面的代码展示的都是一样的,只不过换了一种表达形式而已

```css
.item-1 {
	background: #b03532;
	grid-column: 1 / 3;
	grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
	background: #b03532;
	grid-column: 1 / span 2;
	grid-row: 1 / span 2;
}
```

![index41](./img/index41.png)

> 斜杠以及后面的部分可以省略，默认跨越一个网格。

```css
.item-1 {
	grid-column: 1;
	grid-row: 1;
}
```

上面代码中，项目 item-1 占据左上角第一个网格。

### grid-area 属性

> `grid-area`属性指定项目放在哪一个区域

```css
.container {
	display: grid;
	grid-template: 100px 100px 100px / 100px 100px 100px;
	grid-template-areas:
		"a b c"
		"d e f"
		"g h i";
}
.item-1 {
	grid-area: e;
}
```

[上面代码](./thml/index42.html)中，1 号项目位于 `e` 区域，效果如下图。
![index42](./img/index42.png)

> `grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

语法如下:

```css
.item {
	grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

举个[例子](./thml/index43.html):

```css
.item-1 {
	grid-area: 1 / 1 / 4 / 4;
}
```

![index43](./img/index43.png)

### justify-self 属性 align-self 属性 place-self 属性

> `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

> `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

```css
.item {
	justify-self: start | end | center | stretch;
	align-self: start | end | center | stretch;
}
```

这两个属性都可以取下面四个值。

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

[下面](./html/index44.html)是 `justify-self: start` 的例子。

```css
.item-1 {
	justify-self: start;
}
```

![index44](./img/index44.png)

**注意:** 上面的除了默认值以外,都会是内容的大小决定盒子的大小.默认值是撑满盒子

> `place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

如法如下:

```css
place-self: <align-self> <justify-self>;
```

[下面](./html/index45.html)是一个例子。

```css
.item-1 {
	place-self: center center;
}
```

![index45](./img/index45.png)

**注意:** 如果省略第二个值，place-self 属性会认为这两个值相等

到此为止 `容器`和`项目`中的属性已经介绍完毕

## 其他知识点

- 在`Grid`布局中，`float`，`display:inline-block`，`display:table-cell`，`vertical-align`以及`column-*`这些属性和声明对`grid子`项是没有任何作用的。这个可以说是 Grid 布局中的常识，面试经常会问的，一定要记得。
- `Grid`布局则适用于更大规模的布局（二维布局），而`Flexbox`布局最适合应用程序的组件和小规模布局（一维布局）
- 命名虽然支持中文，但由于 CSS 文件中文存在乱码的风险，所以……创新还是保守就看大家自己的抉择了。

- `IE10-IE15`虽然名义上支持`Grid`布局，但支持的是老版本语法（本文是介绍的全是 2.0 全新语法），还需要加`-ms-`私有前缀，精力原因，IE 下的使用并未深究，以后有机会再补充。

本文是参考`阮一峰`老师的[博客](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)和`张鑫旭`大神的[博客](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/)下完成的.如果有些看的不清白,可以直接看两位老师的博客.

写在最后,一共花了两周的业余时间.从端午节到今天.可能写的不好,完全参照两位大神写的,但是也没有错啊,他们已经总结的很好了,我也没有必要鸡蛋里面挑石头,模仿两位大神是因为项目中没有用到,只是写个 demo 加深记忆.ok,就酱~~~
