<template>
  <div class="app-container">
    <div class="buttons-container">
      <el-button class="filter-item" type="primary" @click="handleAdd">新增</el-button>
      <div style="float: right;">
        <el-form :inline="true">
          <el-form-item label="">
            <el-input v-model="params.itemName" placeholder="项目名称" @keyup.enter="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch"></el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="handleFresh"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="list-container">
      <l-cost-item ref="list" @editRow="handleEditRow"></l-cost-item>
    </div>
    <d-cost-item :ref="dAddEdit.ref" :pDialog="dAddEdit" @close="dAddEdit.close()" @saveSuccess="dAddEdit.yes"></d-cost-item>
  </div>
</template>

<script>
import { dCostItem,lCostItem ,Dialog,CostItem,BaseIndex } from './a-import'

export default {
  name: 'b-cost-item',
  components:{ dCostItem,lCostItem },
  extends:BaseIndex,
  data () {
    return {
      dAddEdit:new Dialog({ref:'dAddEdit'}),
      params:{ itemName:'' }
    }
  },
  methods: {
    handleAdd(){
      this.dAddEdit.open({
        title:'新增消费项目',
        status:'add',
        width:'500px',
        model: new CostItem(),
        yes:(res)=>{
          this.$refs.list.fetchData();
          this.dAddEdit.close()
        }
      });
    },
    handleEditRow(row){
      this.dAddEdit.open({
        title:'编辑消费项目',
        status:'edit',
        model: row,
        yes:(res)=>{
          this.$refs.list.fetchData();
          this.dAddEdit.close()
        }
      });
    },
    handleSearch(){
      this.$refs.list.listQuery.params = this.params;
      this.$refs.list.fetchData();
    },
    handleFresh(){
      this.params = { itemName:'' };
      this.$refs.list.listQuery.params = null;
      this.$refs.list.fetchData();
    }
  }
}
</script>

<style scoped>

</style>
