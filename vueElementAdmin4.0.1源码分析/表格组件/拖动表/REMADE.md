# 拖动表

## 位置

> src/views/table/drag-table.vue

## 插件

```js
import Sortable from "sortablejs"
```

这里用到了这个插件[Sortable 地址](https://github.com/SortableJS/Sortable)JavaScript 库，用于在现代浏览器和触摸设备上重新排序拖放列表。不需要 jQuery。支持 Meteor，AngularJS，React，Polymer，Vue，Knockout 和任何 CSS 库，例如 Bootstrap。

至于拖动颜色的是因为 给当前拖动的元素加上了一个`类名`,并设置`css`

```css
.sortable-ghost {
	opacity: 0.8;
	color: #fff !important;
	background: #42b983 !important;
}
```
