<template>
    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-add" size="mini" @click="handleAdd">新增</el-button>
      </div>
      <div class=""></div>
      {{addEditVisible}}
      <d-add-edit :pVisible="addEditVisible" :pStatus="'create'" @visibleChange="hideAddEdit"></d-add-edit>
    </div>
</template>

<script>
    import DAddEdit from "./d-add-edit";

    export default {
      components: {DAddEdit},
      name: "index",
      data(){
        return {
          addEditVisible:false
        }
      },
      methods:{
        handleAdd(){
          this.addEditVisible = true;
        },
        hideAddEdit(data){
          this.addEditVisible = data;
        }
      }
    }
</script>

<style scoped>

</style>
