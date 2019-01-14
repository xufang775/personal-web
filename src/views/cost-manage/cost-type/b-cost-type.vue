<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="14">
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
          <l-cost-type ref="list" @editRow="handleEditRow"></l-cost-type>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="buttons-container">
          <el-button class="filter-item" type="primary" @click="handleTypeConfigAdd">新增</el-button>
          <div style="float: right;">
            <el-form :inline="true">
              <el-form-item label="">
                <el-input v-model="params.itemName" placeholder="项目名称" @keyup.enter="handleTypeConfigSearch"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="handleTypeConfigSearch"></el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="handleTypeConfigFresh"></el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="list-container">
          <l-cost-type-config ref="listConfig" @editRow="handleTypeConfigEditRow"></l-cost-type-config>
        </div>
      </el-col>
    </el-row>
    <!--<el-row :gutter="20">-->
      <!--<el-col :span="12">-->
        <!--<div class="buttons-container">-->
          <!--<el-button class="filter-item" type="primary" @click="handleAdd">新增</el-button>-->
          <!--<div style="float: right;">-->
            <!--<el-form :inline="true">-->
              <!--<el-form-item label="">-->
                <!--<el-input v-model="params.itemName" placeholder="项目名称" @keyup.enter="handleSearch"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item>-->
                <!--<el-button type="primary" icon="el-icon-search" @click="handleSearch"></el-button>-->
                <!--<el-button type="primary" icon="el-icon-refresh" @click="handleFresh"></el-button>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="list-container">-->
          <!--<l-cost-type-config ref="listConfig" @editRow="handleEditRow"></l-cost-type-config>-->
        <!--</div>-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<div class="buttons-container">-->
          <!--<el-button class="filter-item" type="primary" @click="handleAdd">新增</el-button>-->
          <!--<div style="float: right;">-->
            <!--<el-form :inline="true">-->
              <!--<el-form-item label="">-->
                <!--<el-input v-model="params.itemName" placeholder="项目名称" @keyup.enter="handleSearch"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item>-->
                <!--<el-button type="primary" icon="el-icon-search" @click="handleSearch"></el-button>-->
                <!--<el-button type="primary" icon="el-icon-refresh" @click="handleFresh"></el-button>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="list-container">-->
          <!--<l-cost-type-config ref="listConfig" @editRow="handleEditRow"></l-cost-type-config>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->

    <d-cost-type :ref="dAddEdit.ref" :pDialog="dAddEdit" @close="dAddEdit.close()" @saveSuccess="dAddEdit.yes"></d-cost-type>
    <d-cost-type-config :ref="dAddEditTypeConfig.ref" :pDialog="dAddEditTypeConfig" @close="dAddEditTypeConfig.close()" @saveSuccess="dAddEditTypeConfig.yes"></d-cost-type-config>
  </div>
</template>

<script>
import { dCostType,dCostTypeConfig,lCostType,lCostTypeConfig ,Dialog,CostType,CostTypeConfig,BaseIndex } from '../a-import'

export default {
  name: 'b-cost-type',
  components:{ dCostType,dCostTypeConfig,lCostType,lCostTypeConfig },
  extends:BaseIndex,
  data () {
    return {
      dAddEdit:new Dialog({ref:'dAddEdit'}),
      dAddEditTypeConfig:new Dialog({ref:'dAddEditTypeConfig'}),
      params:{ itemName:'' }
    }
  },
  methods: {
    handleAdd(){
      this.dAddEdit.open({
        title:'新增消费项目',
        status:'add',
        width:'500px',
        model: new CostType(),
        yes:(res)=>{
          this.$refs.list.fetchData();
          this.dAddEdit.close()
        }
      });
    },
    handleTypeConfigAdd(){
      this.dAddEditTypeConfig.open({
        title:'新增消费类型配置',
        status:'add',
        width:'700px',
        model: new CostTypeConfig(),
        yes:(res)=>{
          this.$refs.listConfig.fetchData();
          this.dAddEditTypeConfig.close()
        }
      });
    },
    handleEditRow(row){
      let temp = Object.assign({}, row); // copy obj
      // 处理上级项目编码
      if(temp.code){
        let parentCode = [];
        for(let i=2;i<temp.code.length;i=i+2){
          parentCode.push(temp.code.substring(0,i));
        }
        temp.parentCode = parentCode;
      }

      this.dAddEdit.open({
        title:'编辑消费项目',
        status:'edit',
        model: temp,
        yes:(res)=>{
          this.$refs.list.fetchData();
          this.dAddEdit.close()
        }
      });
    },
    handleTypeConfigEditRow(row){
      let temp = Object.assign({}, row); // copy obj
      this.dAddEditTypeConfig.open({
        title:'编辑消费项目',
        status:'edit',
        model: row,
        yes:(res)=>{
          this.$refs.listConfig.fetchData();
          this.dAddEditTypeConfig.close()
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
    },
    handleTypeConfigSearch(){
      this.$refs.listConfig.listQuery.params = this.params;
      this.$refs.listConfig.fetchData();
    },
    handleTypeConfigFresh(){
      this.params = { itemName:'' };
      this.$refs.listConfig.listQuery.params = null;
      this.$refs.listConfig.fetchData();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
