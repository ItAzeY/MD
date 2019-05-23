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
