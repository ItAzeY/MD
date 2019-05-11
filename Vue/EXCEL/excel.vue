<template>
  <div>
    <el-table :data="data"
      border
      id="div">
      <el-table-column label="项目信息"></el-table-column>
    </el-table>
    <el-button @click="exportTable">导出</el-button>
  </div>
</template>
<script>
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  name: "excel",
  data() {
    return {
      data: []
    };
  },
  methods: {
    exportTable() {
      // 获取节点并克隆一个节点
      let table = document.querySelector("#div").cloneNode(true);
      // 调用xlsx的方法
      let wb = XLSX.utils.table_to_book(table, { raw: true });
      // 导出的 name type
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        // 下载的 name
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "项目前期工作计划表.xlsx" // 名称
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
};
</script>
