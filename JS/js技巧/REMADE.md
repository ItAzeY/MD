# 时间

## 格式化金钱

```js
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
const money = ThousandNum(19941112)
// money => "19,941,112"
```

## 生成随机 ID

```js
const RandomId = len =>
	Math.random()
		.toString(36)
		.substr(3, len)
const id = RandomId(10)
// id => "jg7zpgiqva"
```

## 生成随机 HEX 色值

```js
const RandomColor = () =>
	"#" +
	Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padEnd(6, "0")
const color = RandomColor()
// color => "#f03665"
```

## 生成星级评分

```js
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)
const start = StartScore(3)
// start => "★★★"
```

## 字符串不足补零

```js
const FillZero = (num, len) => num.toString().padStart(len, "0")
const num = FillZero(169, 5)
// num => "00169"
```

## 取最小值最大值

```js
const arr = [0, 1, 2]
const min = Math.min(...arr)
const max = Math.max(...arr)
// min max => 0 2
```

## 生成范围随机数

```js
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const num = RandomNum(1, 10)
```

## 是否为空数组

```js
const arr = []
const flag = Array.isArray(arr) && !arr.length
// flag => true
```

## 是否为空对象

```js
const obj = {}
const flag = DataType(obj, "object") && !Object.keys(obj).length
// flag => true
```

## 满足条件时执行

```js
const flagA = true // 条件A
const flagB = false // 条件B
;(flagA || flagB) && Func() // 满足A或B时执行
;(flagA || !flagB) && Func() // 满足A或不满足B时执行
flagA && flagB && Func() // 同时满足A和B时执行
flagA && !flagB && Func() // 满足A且不满足B时执行
```

## 为非假值时执行

```js
const flag = false // undefined、null、""、0、false、NaN
!flag && Func()
```

## 数组不为空时执行

```js
const arr = [0, 1, 2]
arr.length && Func()
```

## 对象不为空时执行

```js
const obj = { a: 0, b: 1, c: 2 }
Object.keys(obj).length && Func()
```

## 混淆数组

```js
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - 0.5)
// arr => [3, 4, 0, 5, 1, 2]
```

## 清空数组

```js
const arr = [0, 1, 2]
arr.length = 0
// arr => []
```

## 截断数组

```js
const arr = [0, 1, 2]
arr.length = 2
// arr => [0, 1]
```

## 交换赋值

```js
let a = 0
let b = 1
;[a, b] = [b, a]
// a b => 1 0
```

## 过滤空值：undefined、null、""、0、false、NaN

```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean)
// arr => [1, 2]
```

## 数组首部插入成员

```js
let arr = [1, 2] // 以下方法任选一种
arr.unshift(0)
arr = [0].concat(arr)
arr = [0, ...arr]
// arr => [0, 1, 2]
```

## 数组尾部插入成员

```js
let arr = [0, 1] // 以下方法任选一种
arr.push(2)
arr.concat(2)
arr[arr.length] = 2
arr = [...arr, 2]
// arr => [0, 1, 2]
```

## 解构数组成员嵌套

```js
const arr = [0, 1, [2, 3, [4, 5]]]
const [a, b, [c, d, [e, f]]] = arr
// a b c d e f => 0 1 2 3 4 5
```
