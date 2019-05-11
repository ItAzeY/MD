# 生命周期

### Created

* 再`Created`钩子中 `this` 为 `undefined` 问题

```js
created: () => {
  let prjNoList = window.localStorage.getItem("prjNoList").split(",");
  console.log(this); // undefined
  this.$http
    .post(`/bpm/projectinfo/queryManyProjectInfo`, prjNoList)
    .then(res => {
      console.log(res.data.data);
    });
}
```

* 这样就生效了

```js
created() {
  let prjNoList = window.localStorage.getItem("prjNoList").split(",");
  console.log(this); // vm
  this.$http
    .post(`/bpm/projectinfo/queryManyProjectInfo`, prjNoList)
    .then(res => {
      console.log(res.data.data);
    });
}
```
