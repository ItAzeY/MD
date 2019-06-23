# 富文本

## 目录

> src/views/components-demo/tinymce.vue

## code 标签

> code 标签用于表示计算机源代码或者其他机器可以阅读的文本内容

## 引入组件

```js
import Tinymce from "@/components/Tinymce"
```

## v-html And 组件

```html
<!-- 把content变量里面的标签解析成html标签 -->
<!-- v-html: 解析文本里面的html标签 -->
<div class="editor-content" v-html="content" />
<!-- 绑定属性 -->
<tinymce v-model="content" :height="300" />
```

```js
content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
```

## Tinymce 组件

> src/components/Tinymce

```js
// 引入 csn 加载
const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js"
```

在`methods`中写了一个`init`方法,并在 `mounted` 钩子函数中触发它

```js
init() {
  // dynamic load tinymce from cdn
  load(tinymceCDN, (err) => {
    if (err) {
      this.$message.error(err.message)
      return
    }
    this.initTinymce()
  })
}
```

```js
// load 是引入的方法,
import load from "./dynamicLoadScript"
```

子组件定义一个 `props` , `width` 的类型为`Number` And `String`类型,那么我们就要判断宽度的类型,然后设置给子组件中的元素(ele)

```js
// props
width: {
  type: [Number, String],
  required: false,
  default: 'auto'
}
// 计算属性
computed: {
  containerWidth() {
    const width = this.width
    if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
      return `${width}px`
    }
    return width
  }
}
```

感觉别的都是再说这个 富文本插件 暂时不看插件,如果可以后面会单独讲
