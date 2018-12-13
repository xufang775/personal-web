<template>
    <div class="app-container">
      <div class="filter-container">
        <s-cost-record ref="search" @onSearch="onSearch"></s-cost-record>
      </div>
      <div class="buttons-container">
        <el-button class="filter-item" type="primary" @click="handleAdd">新增</el-button>
        <el-button class="filter-item" type="primary" @click="handleAddMore">新增-批量</el-button>
        <el-button class="filter-item" type="primary" @click="handleAddPoi">批量插入</el-button>
        <el-button class="filter-item" type="primary" @click="handleAdd1">新增11</el-button>
      </div>
      <div class="">
        <l-cost-record ref="list" @editRow="handleEditRow"></l-cost-record>
      </div>
      <d-add-edit ref="dAddEdit" @visibleChange="hideAddEdit" @postSuccess="refreshList"></d-add-edit>
      <d-add-more ref="dAddMore" @postSuccess="refreshList"></d-add-more>
      <d-add-upload-poi ref="dUploadPoi"></d-add-upload-poi>
      <d-cost-item :ref="aa.ref" :pDialog="aa" @close="aa.close()" @save="aa.yes"></d-cost-item>
      <d-cost-record :ref="dCR.ref" :pDialog="dCR" @close="dCR.close()" @saveSuccess="dCR.yes"></d-cost-record>
    </div>
</template>

<script>
  import { CostRecord, dAddEdit,dAddMore,dAddUploadPoi,lCostRecord,sCostRecord,Dialog,dCostItem,dCostRecord } from './a-import'

    export default {
      components: {
        dAddEdit,dAddMore,dAddUploadPoi,lCostRecord,sCostRecord,dCostItem,dCostRecord
      },
      name: "index",
      data(){
        return {
          addEditVisible:false,
          addEditStatus:'add',
          aa:new Dialog({ref:'dCostItem'}),
          dCR: new Dialog({ref:'dCostRecord'})
        }
      },
      methods:{
        handleAdd1(){
          let self=this;
          this.aa.open({
            title:'34343',
            yes:(data)=>{
              console.log('123');
              console.log(data);
              this.aa.close();
            }
          })
        },
        onSearch(data){
          this.$refs.list.listQuery.params = data;
          console.log(this.$refs.list.listQuery);
          this.$refs.list.getList()

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

          // this.$refs.dAddEdit.status='add';
          // this.$refs.dAddEdit.visible=true;
        },
        handleAddPoi(){
          this.$refs.dUploadPoi.visible=true;
        },
        handleEditRow(row){
          this.$refs.dAddEdit.model = Object.assign({},row);
          this.$refs.dAddEdit.status='edit';
          this.$refs.dAddEdit.visible=true;
        },
        hideAddEdit(data){
          this.addEditVisible = data;
        },
        refreshList(data){
          this.$refs.list.getList();
        },
        handleAddMore(){
          this.$refs.dAddMore.status = 'add-more';
          this.$refs.dAddMore.visible = true;
        }
      }
    }
</script>

<style scoped>

</style>
