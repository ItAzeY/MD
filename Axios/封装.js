// # axios封装

// ```js
Vue.prototype.$http = (reqObj, successCallback, errorCallback) => {
	let LoadingObj
	// 判断是否传入了loading,如果传入了loading那就发送请求,就是需要loading的
	if (reqObj.showLoading) {
		LoadingObj = ElementUI.loading.service({
			target: reqObj.showLoadingTarget || document.body
		})
	}
	let reqData = {}
	// 判断请求方式,根据是否传入了data属性
	if (reqObj.data) {
		reqData.data = reqObj.data
		reqData.method = "post"
	} else {
		reqData.params = reqObj.params
		reqData.method = "get"
	}
	// 合并发送的请求方式
	reqData = Object.assign(reqData, reqObj)
	axios(reqData)
		.then(res => {
			// 关闭loading
			LoadingObj && LoadingObj.close()
			// 执行成功的回调
			if (parseInt(res.data.code) === 0) {
				successCallback && successCallback(res.data.data)
				return
			}
			// 这个时判断code值,如果是 -2 ,那就是登录过期了
			if (parseInt(res.data.code) === -2) {
				ElementUI.Message({
					message: "登录过期,即将返回登录界面",
					type: "warning",
					duration: 2000,
					onClose: () => {
						reuter.replace({ name: "Login" })
					}
				})
				return
			}
			// 判断是否传入 error函数
			if (errorCallback) {
				errorCallback && errorCallback(res.data)
			} else {
				ElementUI.Message.error(res.data.msg)
			}
		})
		.catch(err => {
			LoadingObj && LoadingObj.close()
			ElementUI.Message.warning("网络异常,请重试")
			throw err
		})
}
// ```

// ```调用
this.$http(
	{
		url: "/admin/modUser",
		params: {
			id: this.thisUser.id,
			role: roleArr
		},
		showLoading: true
	},
	res => {
		this.xxx()
		this.xxx()
		this.$message({
			type: "success",
			message: "成功"
		})
	},
	err => {
		// 会覆盖掉封装的方法
		this.$message.error("系统错误,请稍后")
	}
)
// ```
