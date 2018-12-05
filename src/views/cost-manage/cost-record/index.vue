<template>
    <div class="app-container">
      <div class="filter-container">
        <search @onSearch="onSearch"></search>
      </div>
      <div class="buttons-container">
        <el-button class="filter-item" type="primary" size="mini" @click="handleAdd">新增</el-button>
        <el-button class="filter-item" type="primary" size="mini" @click="handleAddMore">新增-批量</el-button>
        <el-button class="filter-item" type="primary" size="mini" @click="handleAddPoi">批量插入</el-button>
      </div>
      <div class="">
        <list ref="list" @editRow="handleEditRow"></list>
      </div>
      <d-add-edit ref="dAddEdit" @visibleChange="hideAddEdit" @isRefreshList="refreshList"></d-add-edit>
      <d-add-edit-more ref="dAddEditMore" @postSuccess="refreshList"></d-add-edit-more>
      <d-add-upload-poi ref="dUploadPoi"></d-add-upload-poi>
    </div>
</template>

<script>
  import { dAddEdit,dAddEditMore,dAddUploadPoi,list,search  } from './a-import'

    export default {
      components: {
        dAddEdit,dAddEditMore,dAddUploadPoi,list,search
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
          this.$refs.dAddEditMore.status = 'add-more';
          this.$refs.dAddEditMore.visible = true;
        }
      }
    }
</script>

<style scoped>

</style>
