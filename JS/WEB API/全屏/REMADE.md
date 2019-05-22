# 全屏

## 判断浏览器时候可以全屏

```js
export const fullscreenEnable = () => {
	var isFullscreen =
		document.fullscreenEnabled ||
		window.fullScreen ||
		document.mozFullscreenEnabled ||
		document.webkitIsFullScreen
	return isFullscreen
}
```
