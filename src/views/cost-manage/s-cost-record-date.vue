<template>
  <el-form :inline="true" :model="model" class="demo-form-inline">
    <el-form-item label="消费时间" required>
      <el-col :span="11">
        <el-form-item prop="costPriceStart">
          <el-date-picker type="date" placeholder="选择日期" v-model="model.costDateStart" style="width: 140px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="11">
        <el-form-item prop="costPriceEnd">
          <el-date-picker type="date" placeholder="选择日期" v-model="model.costDateEnd" style="width: 150px;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="消费月份">
      <el-date-picker type="month" placeholder="月份" v-model="model.costMonth" style="width: 120px;"></el-date-picker>
    </el-form-item>
    <el-form-item label="消费年份">
      <el-date-picker type="year" placeholder="年份" v-model="model.costYear" style="width: 100px;"></el-date-picker>
    </el-form-item>
    <el-form-item label="消费金额" required>
      <el-col :span="11">
        <el-form-item prop="costPriceStart">
          <el-input v-model.number="model.costPriceStart" @keyup.enter="onSubmit" style="width: 100px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="11">
        <el-form-item prop="costPriceEnd">
          <el-input v-model.number="model.costPriceEnd" style="width: 100px;"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="消费项目">
      <el-select v-model="model.costItemId" placeholder="消费项目">
        <el-option v-for="item in dics.costItemId" :key="item.key" :label="item.value" :value="item.key"></el-option>
      </el-select>
    </el-form-item>
    <!--<el-form-item label="备注">-->
      <!--<el-input v-model="model.remark" placeholder="备注"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="onRefresh">刷新</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import { BaseSearch,CostRecordSearch, dicCostItem, saveCostRecord, } from './a-import';
    export default {
      name: "s-cost-record-date",
      extends: BaseSearch,
      data(){
        return {
          model: new CostRecordSearch({}),
          dics:{
            costItemId:[]
          }
        }
      },
      methods: {
        onCreated(){
          dicCostItem().then(res=>{
            this.dics.costItemId = res.data;
          })
        }
      }
    }
</script>

<style scoped>
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{ margin-bottom: 5px; }
</style>
