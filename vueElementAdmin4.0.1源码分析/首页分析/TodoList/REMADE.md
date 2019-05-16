# TodoList

## 文件

> 引入了外链式的 scss 文件

```css
<style lang="scss">
  @import './index.scss';
</style>
```

> 引入了组件

```js
import Todo from "./Todo.vue"
```

## html

> 使用了`@keyup.enter`.
> `@keyup` : 是键盘弹起事件
> `.enter` : 是按键修饰符.代表的意思是当弹起`enter`键的时候才会触发
> `@keydown` : 是键盘按下事件和`@keyup`相对应

```html
<header class="header">
	<input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo" />
</header>
```

## 全选 && 反选

- 这个`input`控制的是`Todo`的全选和反选
- `:cheched="allChecked"` : 为 true 就是选中的状态 false 就是未选中的状态
- `@change="toggleAll({ done: !allChecked })"` : 至于为什么要写成`toggleAll({ done: !allChecked })`这种形式我也不懂
- `@change="toggleAll( done = !allChecked )"` : 这中形式也是一样可以的(方法也需要修改),可能是为了好看?🤭

```html
<input
	id="toggle-all"
	:checked="allChecked"
	class="toggle-all"
	type="checkbox"
	@change="toggleAll({ done: !allChecked })"
/>
```

- 计算属性得出`allChecked`
- `todo`中每一项的`done`属性都为`true`的时候`allChecked`的值就为`true`
- 反之 `todo`中如果其中任意一项的`done`属性为`false`的时候`allChecked`的值就为`false`
- 这是**高级函数**`every`的功劳(值都为`true`返回`true`,有一个是`false`就返回`false`)

```js
computed: {
  allChecked() {
    return this.todos.every(todo => todo.done)
  }
},
```

- methods 方法
- `触发方法`(@change="toggleAll({ done: !allChecked })")的时候传递的参数是对象,获取的时候`解构`出来方便
- 参数为`Boolean`类型值,用来遍历 todo 给每一项都设置为该值.这样就可以达到`全选和反选`
- `this.setLocalStorage()` 这个方法 emmmm 我就很迷了, 感觉很鸡肋啊,可能作者是想让我们提前预习下?
- `window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))` : 浏览器存储方式, key,val 的方式
- `JSON.stringify(this.todos)` : 把 this.todos 序列化成`json`

```js
toggleAll({ done }) {
  this.todos.forEach(todo => {
    todo.done = done
    this.setLocalStorage()
  })
}
setLocalStorage() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
}
```

## Todo 组件

- 每一个 Todo 都是一个组件
- TodoList 父组件中调用子组件
- `@toggleTodo="toggleTodo"` : 子组件向父组件暴漏触发方法
- `@editTodo="editTodo"` :子组件向父组件暴漏触发方法
- `@deleteTodo="deleteTodo"` : 子组件向父组件暴漏触发方法
- `v-for="(todo, index) in filteredTodos"` : 通过 computed 获取计算属性,通过 v-for 渲染子组件
- `:todo="todo"` : 传递`todo`数据给子组件,子组件通过`props`接受
- `:key="index"` : 把索引当作**key**值,key 值是为了复用

```html
<ul class="todo-list">
	<todo
		v-for="(todo, index) in filteredTodos"
		:key="index"
		:todo="todo"
		@toggleTodo="toggleTodo"
		@editTodo="editTodo"
		@deleteTodo="deleteTodo"
	/>
</ul>
```

```js
const filters = { all: todos => todos } // 变量
import Todo from "./Todo.vue" // 引入组件
this.visibility = "all" // 组件变量
this.todos = [ // 组件变量
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
computed: { // 计算属性
  filteredTodos() {
    return filters[this.visibility](this.todos)
  }
}
```

- `toggleTodo(val)` : 子组件传递过来的数据,{done: true,text: "fork this repository"}修改 done 属性并存储
- `editTodo({ todo, value })` : todo 是 编辑的当前项, value 是编辑好的内容
- `deleteTodo(todo)` : todo 是当前项, 通过`splice`截取掉当前项

```js
toggleTodo(val) { // 切换状态方法
  val.done = !val.done
  this.setLocalStorage()
},
editTodo({ todo, value }) { // 编辑方法
  todo.text = value
  this.setLocalStorage()
}
deleteTodo(todo) { // 删除方法
  this.todos.splice(this.todos.indexOf(todo), 1)
  this.setLocalStorage()
}
```

## todo 组件分析

- 点击 input 按钮触发`toggleTodo`方法,向父组件传递方法(toggleTodo)数据(todo)**编辑和删除同理**

```html
<input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo( todo )" />
toggleTodo(todo) {this.$emit('toggleTodo', todo)}
```

- `props` : 解构父组件传递过来的数据. 例如:`todo`
- `type` : 当前数据的`type`类型
- `default` : 如果是`值`可以不用写函数形式,如果是`址`就必须要改成函数的形式
- 如果里面还有对象那就需要再包一层

```js
// 正常一层
props: {
  todo: {
    type: Object,
    default: function() {
      return {}
    }
  }
}
// 二层及以上
props: {
  todo: {
    type: Object,
    default: function() {
      return {
        list['a','b','c'],
        time:{
          start: '',
          end: ''
        },
        ...
      }
    }
  }
}
```

- `:class` : 动态绑定 class,`todo.done`存在,`completed`class 存在,反之.editing 同理

```HTML
<li :class="{ completed: todo.done, editing: editing }" class="todo"></li>
```

- `@dblclick="editing = true"` : 绑定双击事件,把`editing`值设置为`true`

```html
<label @dblclick="editing = true" v-text="todo.text" />
```

> 自定义指令

- `directives` 自定义指令
- el : 自定义指令挂载的元素
- value : 是从`binding`解构出来`value`属性,里面还有(name,value,oldValue,expression,arg,modifiers,vnode,oldVnode)
- context : 是从`vnode`解构出来`context`属性,具体里面的东西`emmmm`不清楚
- `@keyup.enter="doneEdit"` : 之前已经说出了,触发`doneEdit`方法.`.esc`是监听用户按下`esc`键时触发的方法`cancelEdit`
- `@blur="doneEdit"` : 失去焦点时的事件触发`doneEdit`方法
- `v-focus="editing"` : value 就是 editing 的值
- `v-show="editing"` : 如果值为`true`当前标签就隐藏(display:none),为`false`就显示,初始化的时候会多消耗一点性能,通过 display 来控制显示隐藏
- 与`v-show`相同的功能还有`v-if` : 值为`true`显示,为`false`隐藏(删除 DOM),初始化的时候不会显示,删除 dom,新建 dom 来做显示隐藏
- 如果少量操作推荐用`v-if` 如果频繁操作推荐用`v-show`

```html
<input
	v-show="editing"
	v-focus="editing"
	:value="todo.text"
	class="edit"
	@keyup.enter="doneEdit"
	@keyup.esc="cancelEdit"
	@blur="doneEdit"
/>
```

```js
directives: { // 自定义指令
  focus(el, { value }, { context }) {
    if (value) {
      context.$nextTick(() => {
        el.focus()
      })
    }
  }
}
this.editing = false  // data数据
deleteTodo(todo) { // methods 方法
  this.$emit('deleteTodo', todo)
}
editTodo({ todo, value }) { // methods 方法
  this.$emit('editTodo', { todo, value })
}
/**
 * e : 参数, 默认有一个`$event`取到当前事件的`value`属性,并去除头尾空格
 * const { todo } = this : 从当前vue实例中把`todo`解构出来
*/
doneEdit(e) {// methods 方法
  const value = e.target.value.trim()
  const { todo } = this
  if (!value) {
    this.deleteTodo({
      todo
    })
  } else if (this.editing) {
    this.editTodo({
      todo,
      value
    })
    this.editing = false
  }
},
cancelEdit(e) {
  e.target.value = this.todo.text // 按下esc键 重新把原来的值赋给当前值
  this.editing = false
}
```
