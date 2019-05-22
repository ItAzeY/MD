export const fullscreenEnable = () => {
	var isFullscreen =
		document.fullscreenEnabled ||
		document.mozFullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.msFullscreenEnabled ||
		false
	return isFullscreen
}
// document.fullscreenEnabled 表示浏览器是否支持全屏模式
// document.mozFullscreenEnabled 判断火狐是否支持全屏模式
// document.webkitFullscreenEnabled 判断chrome是否支持全屏模式(edg浏览器也支持)
// document.msFullscreenEnabled 判断IE浏览器是否支持全屏默认

export const launchFullscreen = (element = document.documentElement) => {
	if (element.requestFullscreen) {
		element.requestFullscreen()
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen()
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen()
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen()
	}
}
// 给函数默认参数,如果没有需要全屏的DOM元素,就用默认参数
// 下面是浏览器的兼容方法(edg用的webkit方法)

export const exitFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen()
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen()
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen()
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen()
	}
}

// 退出全屏的方法,不管传入的是DOM还是document,退出全屏都是用document来调用.

/**
 * 这个是进入全屏和退出全屏模式下执行的函数(目前只有chrome有效)(可以给document || Element 使用)
 */
document.onfullscreenchange = function(event) {
	console.log("FULL SCREEN CHANGE")
}
document.documentElement.onclick = function() {
	// requestFullscreen() must be in an event handler or it will fail
	document.documentElement.requestFullscreen()
}

/**
 * 进入全屏失败的方法,还没有测试兼容性(可以给document || Element 使用)
 */
document.addEventListener("fullscreenerror", event => {
	console.log("Browser cannot switch to fullscreen mode.")
})


export const toggleFullScreen = () => { // 切换全屏的方法
  console.warn(document.fullscreenElement)
  if (!document.fullscreenElement) {
    launchFullscreen()
  } else {
    exitFullscreen()
  }
}
