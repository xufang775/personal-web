<template>
  <div class="app-container">
    <div class="buttons-container"></div>
    <div class="">
      <el-table :data="rows">
        <el-table-column></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "b-cost-record-more",
    data(){
        return {
          cols:[
            {field:'costDate',label:'消费日期',formElement:'date'},
            {field:'costTypeCode',label:'消费项目',formElement:'cascader'},
            {field:'costPrice',label:'消费金额',formElement:'input'},
            {field:'remark',label:'描述',formElement:'input'},
          ],
          rows:[]
        }
    }
  }
</script>

<style scoped>

</style>
