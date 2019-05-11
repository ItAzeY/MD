# 表头颜色

## 整行表头颜色

### 支持多种颜色色值

> 只想到了这么色值都是可以用得

* rgb
* rgba
* English
* 16进制
* hsla

### 使用方法

```html
<el-table
    :data="tableData"
    style="width: 100%"
    border
    :span-method="objectSpanMethod"
    :header-cell-style="getRowClass">
    <!--
        :header-cell-style="getRowClass": 设置表头颜色得方法
        :span-method="objectSpanMethod": 合并单元格得方法
     -->
<el-table>
```

```js
// 表头颜色
getRowClass({ row, column, rowIndex, columnIndex }) {
    if (rowIndex == 0) {
        return "background: hsla(120,100%,50%,1)";
    } else {
        return "";
    }
},
```
