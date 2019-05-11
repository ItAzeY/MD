# 样式冲突

## 还原

> B页面的样式影响 A 页面的样式
> 就算你加了 scope 也同样是会影响
> 解决方案: class名称尽量不要一,不然就会出现样式冲突

### A页面

```html
<el-button class="button">A页面</el-button>
```

### B页面

```html
<el-button class="button">B页面</el-button>
```

```css
.button{
    width:100px;
}
```
