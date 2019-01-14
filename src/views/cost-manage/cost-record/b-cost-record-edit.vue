<template>
  <div class="app-container">
    <div class="buttons-container" style="float: right;">
      <el-button type="button" class="">提交</el-button>
    </div>
    <div class="">
      <edit-table :cols="cols" :rows="rows" :rowBtns="rowBtns" :dics="dics" :apiUrl="api.getCascader"></edit-table>
    </div>
  </div>

</template>

<script>
  import { api,reqGet,reqPost, BaseDialogNew } from '../a-import'
  export default {
    name: "b-cost-record-edit",
    data(){
      return {
        api:{ save:api.costRecord.save,getCascader:api.costType.getCascader },
        cols:[
          {field:'costDate',label:'消费日期',formElement:'date'},
          {field:'costTypeCode',label:'消费项目',formElement:'cascader'},
          {field:'costPrice',label:'消费金额',formElement:'input'},
          {field:'remark',label:'描述',formElement:'input'},
        ],
        rows:[
          {id:1,costDate:'2019-01-10',costTypeCode:'1010',costPrice:'12',remark:'33',isSet:true },
          {id:2,costDate:'2019-01-11',costTypeCode:'1111',costPrice:'13',remark:'44',isSet:true },
        ],
        rowBtns:[
          { code:'edit',label:'编辑' },
          { code:'canel',label:'取消' }
          ],
        dics:{}
      }
    },
    created(){
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
