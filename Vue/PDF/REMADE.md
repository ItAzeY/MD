# PDF

## vue 导出 pdf

### 插件

> html2canvas And jspdf
> 这两个插件用在`htmlToPdf.js`文件中

### 挂载到vue上

> 再`main.js`中

```js
import htmlToPdf from "@/util/htmlToPdf";

vue.use(htmlToPdf);
```

### 页面中导出pdf

```js
// methods 的方法
printPdf() {
      this.getPdf("#pdfId", this.htmlTitle);
    }
```
