<template>
    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-add" size="mini" @click="handleAdd">新增</el-button>
      </div>
      <div class="">
        <list ref="list"></list>
      </div>
      <d-add-edit :pVisible="addEditVisible"
                  :pStatus="'create'"
                  @visibleChange="hideAddEdit"
                  @isRefreshList="refreshList"
      ></d-add-edit>
    </div>
</template>

<script>
    import DAddEdit from "./d-add-edit";
    import List from "./list";

    export default {
      components: {DAddEdit,List},
      name: "index",
      data(){
        return {
          addEditVisible:false
        }
      },
      methods:{
        handleAdd(){
          this.addEditVisible = true;

          // this.dialogStatus = 'create';
          // this.dialogFormVisible = true;
          // this.$nextTick(()=>{
          //   this.$refs['dataForm'].clearValidate()
          // })
        },
        hideAddEdit(data){
          this.addEditVisible = data;
        },
        refreshList(data){
          this.$refs.list.getList();
        }
      }
    }
</script>

<style scoped>

</style>
