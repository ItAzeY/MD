# markdown 插件

位置 >>> @/views/components-demo

引入组件

```js
import MarkdownEditor from "@/components/MarkdownEditor"
```

md 插件使用的是[tui.editor](https://github.com/nhnent/tui.editor)

本组件中的[富文本文档](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/rich-editor.html)

```js
// 绑定随机 id
id: {
  type: String,
  required: false,
  default() {
    return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
  }
}
```
