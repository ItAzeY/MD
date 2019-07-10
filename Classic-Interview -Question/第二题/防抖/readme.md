# 防抖

> 防抖函数 :

袖珍版的防抖函数

```js
function debounce (func, await = 200) {
  var timer = null
  return function (...args){
    clearTimeout(timer)
    timer = setTimeout(func,await)
  }
}
```

普通版的防抖函数
