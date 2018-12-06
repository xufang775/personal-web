<template>
    <div class="app-container">
      <div class="filter-container">
        <s-cost-record @onSearch="onSearch"></s-cost-record>
      </div>
      <div class="buttons-container">
        <el-button class="filter-item" type="primary" size="mini" @click="handleAdd">新增</el-button>
        <el-button class="filter-item" type="primary" size="mini" @click="handleAddMore">新增-批量</el-button>
        <el-button class="filter-item" type="primary" size="mini" @click="handleAddPoi">批量插入</el-button>
      </div>
      <div class="">
        <l-cost-record ref="list" @editRow="handleEditRow"></l-cost-record>
      </div>
      <d-add-edit ref="dAddEdit" @visibleChange="hideAddEdit" @isRefreshList="refreshList"></d-add-edit>
      <d-add-more ref="dAddMore" @postSuccess="refreshList"></d-add-more>
      <d-add-upload-poi ref="dUploadPoi"></d-add-upload-poi>
    </div>
</template>

<script>
  import { dAddEdit,dAddMore,dAddUploadPoi,lCostRecord,sCostRecord  } from './a-import'

    export default {
      components: {
        dAddEdit,dAddMore,dAddUploadPoi,lCostRecord,sCostRecord
      },
      name: "index",
      data(){
        return {
          addEditVisible:false,
          addEditStatus:'add'
        }
      },
      methods:{
        onSearch(data){
          this.$refs.list.listQuery.params = data;
          console.log(this.$refs.list.listQuery);
          this.$refs.list.getList()

        },
        handleAdd(){
          this.$refs.dAddEdit.status='add';
          this.$refs.dAddEdit.visible=true;
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
