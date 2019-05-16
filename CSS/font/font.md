# font

## CSS3 属性-webkit-font-smoothing 字体抗锯齿渲染

> font-smoothing 是非标准的 CSS 定义.
> 它被列入标准规范的草案中，后由于某些原因从 web 标准中被移除了。

但是我们可以通过`浏览器私有前缀`达到这一效果

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

## 文字超出隐藏

> 单行文本

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

> 多行文本

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
