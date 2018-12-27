<template>
    <div class="app-container">
      <div class="filter-container">
        <s-cost-record ref="search" @onSearch="handleSearch"></s-cost-record>
      </div>
      <div class="buttons-container">
        <el-button class="filter-item" type="primary" @click="handleAdd">新增</el-button>
        <el-button class="filter-item" type="primary" @click="handleAddMore">新增-批量</el-button>
        <el-button class="filter-item" type="primary" @click="handleAddPoi">批量插入</el-button>
      </div>
      <div class="list-container">
        <l-cost-record ref="list" @editRow="handleEditRow"></l-cost-record>
      </div>
      <!--<d-add-edit ref="dAddEdit" @visibleChange="hideAddEdit" @postSuccess="refreshList"></d-add-edit>-->
      <!--<d-add-more ref="dAddMore" @postSuccess="refreshList"></d-add-more>-->
      <!--<d-add-upload-poi ref="dUploadPoi"></d-add-upload-poi>-->
      <d-cost-record :ref="dCR.ref" :pDialog="dCR" @close="dCR.close()" @saveSuccess="dCR.yes"></d-cost-record>
    </div>
</template>

<script>
  import {  dAddEdit,dAddMore,dAddUploadPoi,lCostRecord,sCostRecord,dCostItem,dCostRecord } from './a-import'
  import { CostRecord,CostRecordSearch,Dialog } from "./a-import";

    export default {
      components: {
        dAddMore,dAddUploadPoi,lCostRecord,sCostRecord,dCostItem,dCostRecord
      },
      name: "index",
      data(){
        return {
          dCR: new Dialog({ref:'dCostRecord'})
        }
      },
      methods:{
        handleSearch(data){
          this.$refs.list.listQuery.params = data;
          this.$refs.list.fetchData();
        },
        handleFresh(){
          this.$refs.list.listQuery.params = new CostRecordSearch();
          this.$refs.list.fetchData();
        },
        handleAdd(){
          let searchParams = this.$refs.search.model;
          let costDate = new Date;
          if(searchParams){
            if(searchParams.costMonth){
              costDate = searchParams.costMonth;
            }
            if(searchParams.costYear){
              costDate = searchParams.costYear;
            }
            if(searchParams.costDateStart){
              costDate = searchParams.costDateStart;
            }
            if(searchParams.costDateEnd){
              costDate = searchParams.costDateEnd;
            }
          }


          this.dCR.open({
            title:'新增消费记录',
            status:'add',
            model: new CostRecord({costDate:costDate}),
            yes:(res)=>{
              this.$refs.list.getList()
              console.log(4321);
              this.dCR.close()
            }
          });
        },
        handleEditRow(row){
          this.dCR.open({
            title:'编辑消费项目',
            status:'edit',
            model: Object.assign({},row),
            yes:(res)=>{
              this.$refs.list.fetchData();
              this.dCR.close()
            }
          });
        },
        handleAddMore(){
          this.$refs.dAddMore.status = 'add-more';
          this.$refs.dAddMore.visible = true;
        },
        handleAddPoi(){
          this.$refs.dUploadPoi.visible=true;
        },
      }
    }
</script>

<style scoped>

</style>
