# Icon 页面分析

## 页面位置

> src/views/svg-icons/index.vue

```html
<!-- el-tabs组件 -->
<el-tabs type="border-card">
	<!-- el-tab-pane 组件 -->
	<el-tab-pane label="Icons">
		<!-- 根据 iconsMap 循环代码 -->
		<div
			v-for="item of iconsMap"
			:key="item"
			@click="handleClipboard(generateIconCode(item), $event)"
		>
			<!-- el-tooltip文字提醒组件 -->
			<el-tooltip placement="top">
				<!-- 这个是el-ttoltip自定义插槽 -->
				<div slot="content">
					<!-- tooltip弹出的内容. -->
					{{ generateIconCode(item) }}
				</div>
				<div class="icon-item">
					<!-- 已经注册成全局组件可以使用 -->
					<svg-icon :icon-class="item" class-name="disabled" />
					<!-- v-for 循环数组的是 item的值就是下标的值,index就是索引 -->
					<span>{{ item }}</span>
				</div>
			</el-tooltip>
		</div>
	</el-tab-pane>
	<!-- 第二个tabs -->
	<el-tab-pane label="Element-UI Icons">
		<!-- 循环 -->
		<div
			v-for="item of elementIcons"
			:key="item"
			@click="handleClipboard(generateElementIconCode(item), $event)"
		>
			<el-tooltip placement="top">
				<div slot="content">
					{{ generateElementIconCode(item) }}
				</div>
				<div class="icon-item">
					<i :class="'el-icon-' + item" />
					<span>{{ item }}</span>
				</div>
			</el-tooltip>
		</div>
	</el-tab-pane>
</el-tabs>
```

```js
// 复制的方法.这个文件里面进行了封装
import clipboard from "@/utils/clipboard"
// 这个是自己定义的icons,然后通过函数转换,把名称给截取出来并放到数组中
import icons from "./requireIcons"
// 这个icons是ele的icons名称(clss)
import elementIcons from "./element-icon.json"

export default {
	name: "Icons",
	data() {
		return {
			iconsMap: icons, //赋值
			elementIcons: elementIcons //赋值
		}
	},
	methods: {
		generateIconCode(symbol) {
			console.log(symbol)
			return `<svg-icon icon-class="${symbol}" />`
		},
		generateElementIconCode(symbol) {
			console.log(symbol)
			return `<i class="el-icon-${symbol}" />`
		},
		handleClipboard(text, event) {
			clipboard(text, event)
		}
	}
}
```

## svg-icon 子组件

```js
<template>
// v-on="$listeners"触发这个组件上所有的监听器
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
			type: String,
			// 必须传
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>
```
