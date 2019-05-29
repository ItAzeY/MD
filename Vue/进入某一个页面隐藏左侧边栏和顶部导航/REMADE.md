# 进入某一个页面隐藏左侧边栏和顶部导航

## 原理是,进入这个页面,隐藏该隐藏的东西

> 通过 v-if 给需要隐藏的页面或者组件绑定 vuex 中的属性,动态绑定 class 来修改样式

```html
<!-- 判断是否需要隐藏 -->
<div class="avue-header" v-if="show">
	<!-- 顶部导航栏 -->
	<top />
</div>
<!-- 动态绑定class -->
<div class="avue-main" :class="{ 'avue-main-important': !show }">
	<!-- 顶部标签卡 -->
	<tags />
	<!-- 主体视图层 -->
	<!--  -->
	<el-scrollbar style="height:calc(100% - 52px)" :class="{ 'el-scrollbar-important': !show }">
		<keep-alive>
			<router-view class="avue-view" v-if="$route.meta.$keepAlive" />
		</keep-alive>
		<router-view class="avue-view" v-if="!$route.meta.$keepAlive" />
	</el-scrollbar>
</div>
```

```js
// 从vuex解构出来我们需要用的属性
computed: {
    ...mapState({
      show: state => state.common.show
    })
  },
```

## 通过路由全局守卫来判断进入的是不是需要隐藏的页面

> 如果是需要隐藏的页面,那我们就触发 vuex 中的方法,达到修改样式和隐藏组件

- 这里有个坑,我们在路由的页面是没办法触发`$store`的,因为还没有绑定 vm 实例,所以就放到了`main.js`文件中(而且是 vm 实例后面才可以)

```js
var vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app")

router.beforeEach((to, from, next) => {
	next()
	if (to.path == "/bpm/mapPanorama") {
		vm.$store.commit("SET_SHOW", true)
	} else {
		vm.$store.commit("SET_SHOW", false)
	}
})
```
