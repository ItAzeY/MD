// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function (dom,title) {
      var title = title
      var c = document.createElement("canvas")
      var opts = {
        scale: 2,
        canvas: c,
        logging: true,
        width: document.querySelector(dom).width,
        height: document.querySelector(dom).height
      };
      c.width = document.querySelector(dom).width * 2
      c.height = document.querySelector(dom).height * 2
      c.getContext("2d").scale(2, 2);
      html2Canvas(document.querySelector(dom), opts).then(function (canvas) {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89;
          //未生成pdf的html页面高度
          let leftHeight = contentHeight;
          //pdf页面偏移
          let position = 0
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight;
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              //避免添加空白页
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
        }
      )
    }
  }
}
