# 项目中 v-if 的使用

### 父组件获取数据传递给子组件

> 刚进入页面的时候,所有数据都是空的,但是仍然会把`projectSectionOptions`传递给子组件,但是这样就会报错,我们时需要等到发送请求以后再传递给子组件,就用到了`v-if="flag"`

```js
<form-com
    ref="form"
    :LandSupplyModelOptions="LandSupplyModelOptions"
    :projectSectionOptions="projectSectionOptions"
    :InvestmentModelOptions="InvestmentModelOptions"
    :itemCategoryOptions="itemCategoryOptions"
    :projectSubmissionLevelOptions="projectSubmissionLevelOptions"
    :bool="true"
    :item="item"
/>
```

> 三个请求完成,变量挂载数据以后才让`flag`为`true`,但是`flag=true`较请求先执行,这样肯定不行的,所以就用到了`Promise.all`方法,等三个请求都结束的时候统一调用`then()`方法

```js
querydropDownBoxContenMethod() {
    querydropDownBoxContent().then(res => {
        //土地供应方式
        this.LandSupplyModelOptions = res.data.data.cicLandSupplyModel;
        //项目板块
        this.projectSectionOptions = res.data.data.dicProjectBlock;
        //投资模式
        this.InvestmentModelOptions = res.data.data.investmentMode;
    });
    queryProCategory().then(res => {
        this.itemCategoryOptions = res.data.data;
    });
    projectSubmissionLevelApi().then(res => {
        this.projectSubmissionLevelOptions = res.data.data;
    });
    this.flag = true; // flag默认是false, 等上面三个请求都完成之后flag变成true
},
```

```js
querydropDownBoxContenMethod() {
    Promise.all([
    queryProCategory(),// api方法,封装的axios请求
    querydropDownBoxContent(),
    projectSubmissionLevelApi()
    ]).then(res => {
    console.log(res);
    //土地供应方式
    this.LandSupplyModelOptions = res[1].data.data.cicLandSupplyModel;
    //项目板块
    this.projectSectionOptions = res[1].data.data.dicProjectBlock;
    //投资模式
    this.InvestmentModelOptions = res[1].data.data.investmentMode;
    this.itemCategoryOptions = res[0].data.data;
    this.projectSubmissionLevelOptions = res[2].data.data;
    this.flag = true; // 等所有的异步请求都执行完以后,把flag变成true
    });
}
```
