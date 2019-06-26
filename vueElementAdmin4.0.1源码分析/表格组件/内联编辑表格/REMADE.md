# 内联编辑表格

也就是可以在表格中进行编辑,并进行`保存`和`取消`操作

## 位置

> src/views/table/inline-edit-table.vue

里面的东西没什么要说的,感觉和 TODOLIST 没什么太大的区别.

只是用 v-if 做的控制

唯一值得说的是[深入响应式原理](https://vuejs.org/v2/guide/reactivity.html)

```js
// 发送请求 list 是获取的数据.给每一个对象添加一个对象.用 `this.$set()`方法
this.list = items.map(v => {
	this.$set(v, "edit", false) //
	// v.edit = false
	v.originalTitle = v.title //  will be used when user click the cancel botton
	return v
})
```
