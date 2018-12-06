<template>
    <div class="app-container">
      <div class="filter-container">
        <s-cost-record-date @onSearch="onSearch"></s-cost-record-date>
      </div>
      <div class="buttons-container">
        <el-button class="filter-item" type="primary" size="mini" @click="handleAdd">新增</el-button>
        <el-button class="filter-item" type="primary" size="mini" @click="handleAddMore">新增-批量</el-button>
      </div>
      <div class="">
        <l-cost-record-date ref="list" @editRow="handleEditRow"></l-cost-record-date>
      </div>
      <d-add-edit ref="dAddEdit" @visibleChange="hideAddEdit" @isRefreshList="refreshList"></d-add-edit>
      <d-add-more ref="dAddEditMore" @postSuccess="refreshList"></d-add-more>
    </div>
</template>

<script>
  import { dAddEdit,dAddMore,lCostRecordDate,sCostRecordDate  } from './a-import'


    export default {
      components: { dAddEdit,dAddMore,lCostRecordDate,sCostRecordDate  },
      name: "index",
      data(){
        return {
          addEditVisible:false,
          addEditStatus:'create'
        }
      },
      methods:{
        onSearch(data){
          this.$refs.list.listQuery.params = data;
          console.log(this.$refs.list.listQuery);
          this.$refs.list.getList()

        },
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
