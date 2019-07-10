var count = 1
var container = document.getElementById("container")

function getUserAction() {
	container.innerHTML = count++
}

// 第一版
// function debounce (func, await = 200) {
//   var timer = null
//   return function (...args){
//     clearTimeout(timer)
//     timer = setTimeout(func,await)
//   }
// }

// 第二版
// function debounce (func, await = 200) {
//   var timer = null
//   return function (args){
//     var context = this
//     clearTimeout(timer)
//     timer = setTimeout(function(){
//       func.apply(context,args)
//     },await)
//   }
// }

// 最终版(立即执行)
function debounce(func, wait = 100, immediate = true) {
	let timer, context, args

	// 延迟执行函数
	const later = () =>
		setTimeout(() => {
			// 延迟函数执行完毕，清空缓存的定时器序号
			timer = null
			// 延迟执行的情况下，函数会在延迟函数中执行
			// 使用到之前缓存的参数和上下文
			if (!immediate) {
				func.apply(context, args)
				context = args = null
			}
		}, wait)

	// 这里返回的函数是每次实际调用的函数
	return function(...params) {
		// 如果没有创建延迟执行函数（later），就创建一个
		if (!timer) {
			timer = later()
			// 如果是立即执行，调用函数
			// 否则缓存参数和调用上下文
			if (immediate) {
				func.apply(this, params)
			} else {
				context = this
				args = params
			}
			// 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
			// 这样做延迟函数会重新计时
		} else {
			clearTimeout(timer)
			timer = later()
		}
	}
}

container.onmousemove = debounce(getUserAction)
