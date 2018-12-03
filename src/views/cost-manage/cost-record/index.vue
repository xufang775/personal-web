<template>
    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" size="mini" @click="handleAdd">新增</el-button>
        <el-button class="filter-item" type="primary" size="mini" @click="handleAddMore">新增-批量</el-button>
      </div>
      <div class="">
        <list ref="list" @editRow="handleEditRow"></list>
      </div>
      <d-add-edit ref="dAddEdit" :pVisible="addEditVisible"
                  :pStatus="addEditStatus"
                  @visibleChange="hideAddEdit"
                  @isRefreshList="refreshList"
      ></d-add-edit>
      <d-add-edit-more ref="dAddEditMore" @postSuccess="refreshList"></d-add-edit-more>
    </div>
</template>

<script>
    import DAddEdit from "./d-add-edit";
    import List from "./list";
    import DAddEditMore from "./d-add-edit-more";

    export default {
      components: {
        DAddEditMore,
        DAddEdit,List },
      name: "index",
      data(){
        return {
          addEditVisible:false,
          addEditStatus:'create'
        }
      },
      methods:{
        handleAdd(){
          this.$refs.dAddEdit.status='create';
          this.$refs.dAddEdit.visible=true;
        },
        handleEditRow(row){
          this.$refs.dAddEdit.model = Object.assign({},row);
          this.$refs.dAddEdit.status='update';
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
