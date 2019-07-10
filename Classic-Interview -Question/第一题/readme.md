# ['1', '2', '3'].map(parseInt)

先说下 map 函数 和 parseInt 函数

## map

map 函数的的参数是一个 callback 函数
这个 callback 函数一共有三个参数

- 第一个参数,item 当前项
- 第二个参数 index 索引
-  第三个参数 this 指向

## parseInt

parseInt 函数有两个参数

- 第一个参数 str 字符串,如果不是字符串,会先转成字符串
- 第二个参数 radix 基数, 基数为 2-36 之间的整数

**有三个注意点**

- 基数 不是 2-36 之间的整数,会返回 NAN
- 如果第一个参数为 9,基数为 8,那么会返回 NAN
- 如果基数为 0 或者不填写,默认就以 10 为基数

```js
parseInt(9, 8) // NAN
parseInt(10, 1) // NAN
```

## 解析

你可能看不懂,我们没有给 parseInt 传入 radix 基数呀,为什么会返回 NAN 呢?

其实是 `['1', '2', '3'].map(parseInt)` 中的 1,2,3 则会作为 item 项,map 函数的 index 索引,就会作为 parseInt 函数的 基数(radix)

那么就是以下的样子

parseInt('1',0) // 上面说了 基数 0 会转成默认值 10,结果为 1
parseInt('2',1) // 基数为 1, 不再 `2 - 36` 之间,结果为 NAN
parseInt('3',2) // 基数为 2,没有问题,但是 str 为 3 超过了 基数,结果为 NAN
