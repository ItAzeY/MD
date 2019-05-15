# vue-count-to

> 无依赖,轻量级,简单好用的数字滚动 vue 组件

## 安装

```bash
npm install vue-count-to
# 或
yarn add vue-count-to
```

## 引入

```js
// 再需要用到这个组件的时候引入该组件
import CountTo from "vue-count-to"
```

## 介绍

Attributes

| 参数      | 描述                   | type     | 默认值 |
| :-------- | :--------------------- | :------- | ------ |
| startVal  | 开始值                 | Number   | 0      |
| endVal    | 结束值                 | Number   | 2017   |
| duration  | 持续时间，以毫秒为单位 | Number   | 3000   |
| autoplay  | 自动播放               | Boolean  | true   |
| decimals  | 要显示的小数位数       | Number   | 0      |
| decimal   | 十进制分割             | String   | .      |
| separator | 分隔符                 | String   | ,      |
| prefix    | 前缀                   | String   | "      |
| suffix    | 后缀                   | String   | "      |
| useEasing | 使用缓和功能           | Boolean  | true   |
| easingFn  | 缓和回调               | Function | 空     |

**注意：当 autoplay：true 时，它将在 startVal 或 endVal 更改时自动启动**

Methods

| 函数            | 描述             |
| :-------------- | :--------------- |
| mountedCallback | 挂载以后返回回调 |
| start           | 开始计数         |
| pause           | 暂停计数         |
| reset           | 重置 countTo     |

上面的属性和方法看起来可能比较迷
可以点击下面的`例子`

[例子](http://panjiachen.github.io/countTo/demo/)

## HTML

- `:xs="12"` <768px 的屏幕,占比为 12 格(一行分为 24 格)
- `:sm="12"` >=768px 的屏幕, 占比为 12 格
- `:md` >=992px 的屏幕
- `:lg="6"` >= 1200px 的屏幕, 占比为 6 格
- `:xl` >= 1920px 的屏幕

> `<count-to>` 数字滚动组件

```html
<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	<div class="card-panel" @click="handleSetLineChartData('newVisitis')">
		<div class="card-panel-icon-wrapper icon-people">
			<svg-icon icon-class="peoples" class-name="card-panel-icon" />
		</div>
		<div class="card-panel-description">
			<div class="card-panel-text">New Visits</div>
			<count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
		</div>
	</div>
</el-col>
```

## 子组件向父组件传递数据

> 点击触发方法

### 子组件

- 点击触发方法向父组件传递数据
- 点击触发子组件的`handleSetLineChartData`方法,通过`this.$emit()`触发父组件`handleSetLineChartData`并传递参数

```html
<div class="card-panel" @click="handleSetLineChartData('purchases')"></div>
```

```js
handleSetLineChartData(type) {
  this.$emit('handleSetLineChartData', type)
}
```

### 父组件

> 触发父组件的`handleSetLineChartData`方法,`type`形参对应的实参是子组件触发时传递的数据

```html
<panel-group @handleSetLineChartData="handleSetLineChartData" />
```

```js
handleSetLineChartData(type) {
  this.lineChartData = lineChartData[type]
}
```

## 效果图

最后贴上效果图

![Image text](./img/数组滚动插件效果.gif)