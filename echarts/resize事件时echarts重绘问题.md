# resize 事件时 echarts 重绘问题

## 项目中用了切换全屏

> 本项目中用到了浏览器切换全屏,布局是用 vw 和 vh 来做.echarts 做的是一个甘特图(代码从网上找的 demo)

**问题** : 进入页面时,渲染 echarts 图表,但是切换全屏的时候并不会重新渲染图表.

**解决** : 调用 window.resize 方法绘制图表

```js
// 此项目是vue项目,需要再最顶层获取`echarts`容器
// 为什么要用id而不用class请继续看下去
var myChart = document.querySelector('block__center')
// 再methods中定义方法,这个就是我写的方法.id是`echarts`容器的id,data是数据
ganttChart(id, data) {
  if (!data.length) return
  var _this = this
  if (myChart != null && myChart != '' && myChart != undefined) {
    // There is a chart instance already initialized on the dom.echarts.js报错
    myChart.dispose() // 销毁之前的echarts,不然会报错的
  }
  let seriesData = []
  let yAxisData_plant = [] //工厂名
  data.forEach((t, index) => {
    yAxisData_plant.push(t.item)
    let bgColor
    bgColor = 'rgba(0,187,255,0.4)'
    let startTime = new Date(t.startTime).getTime()
    let endTime = new Date(t.endTime).getTime()
    seriesData.push({
      name: t.item,
      // value: [index, startTime, endTime, listItem.quantity],
      value: [index, startTime, endTime],
      itemStyle: {
        normal: {
          color: bgColor
        }
      }
    })
  })
  var option = {
    backgroundColor: '#26263C',
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        var icon, name, dataStart, dataEnd, link
        icon = params[0].marker
        name = params[0].name + ':'
        if (
          params[0].value[1] != 'Invalid Date' &&
          new Date(params[0].value[2]) != 'Invalid Date'
        ) {
          link = '----'
          dataStart = new Date(params[0].value[1]).toLocaleDateString()
          dataEnd = new Date(params[0].value[2]).toLocaleDateString()
          return icon + name + dataStart + link + dataEnd
        }
        return icon + name
      }
    },
    grid: {
      // top: 48,
      left: 200,
      right: 50
      // bottom: 50,
      // height: 300
    },
    dataZoom: [
      {
        show: true,
        type: 'slider',
        filterMode: 'none',
        xAxisIndex: [0],
        realtime: true,
        height: 10,
        // top: 370,
        start: 0,
        end: 10,
        minValueSpan: 3600 * 24 * 1000 * 7,
        handleIcon:
          'path://path://M100, 100m -75, 0a75,75 0 1,0 150,0a75,75 0 1,0 -150,0',
        handleSize: '120%',
        handleStyle: {
          color: '#fff',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 4
        },
        textStyle: {
          color: 'transparent'
        },
        borderColor: 'transparent',
        backgroundColor: '#D7F4FF',
        dataBackground: {
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'transparent'
          }
        },
        fillerColor: '#00EBFF'
      },
      {
        type: 'inside',
        show: true,
        zoomOnMouseWheel: false,
        moveOnMouseWheel: true,
        moveOnMouseMove: true,
        preventDefaultMouseMove: true,
        xAxisIndex: [0]
      },
      {
        show: true,
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'none',
        realtime: true,
        handleIcon:
          'path://path://M100, 100m -75, 0a75,75 0 1,0 150,0a75,75 0 1,0 -150,0',
        handleSize: '120%',
        width: 10,
        start: 0,
        end: 10,
        handleStyle: {
          color: '#fff',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 1
        },
        textStyle: {
          color: 'transparent'
        },
        borderColor: 'transparent',
        backgroundColor: '#D7F4FF',
        fillerColor: '#00EBFF'
      }
    ],
    xAxis: {
      type: 'time',
      // min: new Date(start_).getTime(),
      // min: "dataMin",
      // max: new Date(end_).getTime(),
      // max: 86400000,
      // scale: true,
      tickPixelInterval: 10,
      interval: 3600 * 24 * 1000,
      maxInterval: 3600 * 24 * 1000,
      minInterval: 1,
      position: 'top',
      // splitNumber: 20,
      axisLabel: {
        show: true,
        textStyle: { color: '#ffffff' },
        interval: 0,
        margin: 15,
        fontSize: 14,
        formatter: function(value, index) {
          var date = new Date(value)
          var texts = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ].join('-')
          return texts
        }
      },
      axisLine: { show: false },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(233,233,233,0.1)' }
      },
      axisTick: {
        lineStyle: {
          color: '#fff'
        },
        length: 10,
        alignWithLabel: true
      }
    },
    yAxis: {
      axisLine: {
        onZero: false,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: { color: '#ffffff' },
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(233,233,233,0.1)' }
      },
      inverse: true,
      data: yAxisData_plant
    },
    series: [
      {
        type: 'custom',
        renderItem: function(params, api) {
          var categoryIndex = api.value(0)
          var start = api.coord([api.value(1), categoryIndex])
          var end = api.coord([api.value(2), categoryIndex])
          var height = api.size([0, 1])[1] * 0.6
          var rectShape = _this.$echarts.graphic.clipRectByRect(
            {
              x: start[0],
              y: start[1] - 5,
              width: end[0] - start[0],
              height: 10
            },
            {
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height
            }
          )
          return (
            rectShape && {
              type: 'rect',
              shape: rectShape,
              style: api.style()
            }
          )
        },
        encode: {
          x: [1, 2],
          y: 0
        },
        data: seriesData
      }
    ]
  }
  // 获取到传递的`echarts`容器
  var chats = document.getElementById(id)
  // 初始化echarts容器
  myChart = this.$echarts.init(chats)
  // 初始化echarts
  myChart.setOption(option)
}
```

```js
// 再合适的位置发送请求
queryProjectGantt({
	prjNo: row.prjNo
}).then(res => {
	let data = [
		{
			startTime: "2018-06-05 8:00:00",
			endTime: "",
			item: "1"
		},
		{
			startTime: "2018-08-03 12:00:00",
			endTime: "2018-08-04 12:00:00",
			item: "2"
		},
		{
			startTime: "2018-08-04 12:00:00",
			endTime: "2018-08-06 00:00:00",
			item: "3"
		},
		{
			startTime: "2018-08-02 20:00:00",
			endTime: "2018-09-30 12:00:00",
			item: "4"
		}
	]
	// this.echartsDate = res.data.data
	this.echartsDate = data
	// 赋值给data中的变量,确保可以再mounted中调用
	this.ganttChart("block__center", data)
})
```

```js
// 再mounted函数里面监听resize事件,并传参
window.onresize = () => {
	this.ganttChart("block__center", this.echartsDate)
}
```
