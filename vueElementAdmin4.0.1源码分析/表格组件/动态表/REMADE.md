# table 组件

> src/views/table/dynamic-table/index.vue

## 固定标题，按标题顺序排序

### 位置

> src/views/table/dynamic-table/components/fixedThead.vue

### html

通过 `el-checkbox-group` 来控制多选组件

```html
<el-checkbox-group v-model="checkboxVal">
	<el-checkbox label="apple">apple</el-checkbox>
	<el-checkbox label="banana">banana</el-checkbox>
	<el-checkbox label="orange">orange</el-checkbox>
</el-checkbox-group>
```

用 `el-table`来控制表格

```html
<el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
	<el-table-column prop="name" label="fruitName" width="180" />
	<el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
		<template slot-scope="scope">
			<!-- 小技巧.可以用 row[属性] 这样在模板中很方便 -->
			{{ scope.row[fruit] }}
		</template>
	</el-table-column>
</el-table>
```

如何做到`多选组件` 和 `表格组件` 关联的呢?

是通过 `watch` 来监听 `多选组件` 绑定的数据,当数据修改,就能监听到来修改 `表格组件` 的数据,这样就可以达到切换`多选组件` `表格组件`跟着变动

```js
watch: {
  checkboxVal(valArr) {
    this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
    this.key = this.key + 1 // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
  }
}
```

## 未修复标题，按点击顺序排序

### 位置

> src/views/table/dynamic-table/components/UnfixedThead.vue

直接看代码吧 更容易理解

```html
<template>
	<div class="app-container">
		<div class="filter-container">
			<el-checkbox-group v-model="formThead">
				<el-checkbox label="apple">
					apple
				</el-checkbox>
				<el-checkbox label="banana">
					banana
				</el-checkbox>
				<el-checkbox label="orange">
					orange
				</el-checkbox>
			</el-checkbox-group>
		</div>

		<el-table :data="tableData" border fit highlight-current-row style="width: 100%">
			<el-table-column prop="name" label="fruitName" width="180" />
			<el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
				<template slot-scope="scope">
					{{ scope.row[fruit] }}
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [
					{
						name: "fruit-1",
						apple: "apple-10",
						banana: "banana-10",
						orange: "orange-10"
					},
					{
						name: "fruit-2",
						apple: "apple-20",
						banana: "banana-20",
						orange: "orange-20"
					}
				],
				formThead: ["apple", "banana"]
			}
		}
	}
</script>
```
