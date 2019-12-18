<template>
  <div class="app-container">
    <div class="header">
      <div class="total-container">
        <span>总消费：￥{{total.sumAll}}</span>
        <span>吃食：￥{{total.foodAll}}</span>
      </div>
      <div class="s-month-container" style="display: inline-block;">
        <span @click="handleUpYear">&lt;&lt;上年</span>
        <el-date-picker type="year" format="yyyy年" placeholder="年份" v-model="costTime"  style="width: 100px;" ></el-date-picker>
        <span @click="handleNextYear">下年&gt;&gt;</span>
      </div>
      <div class="s-buttons-container">
      <el-button size="mini" type="primary" icon="el-icon-refresh" @click="getData">刷新</el-button>
      <el-button size="mini" type="primary" icon="el-icon-refresh" @click="handleComponentTypeChange">行变列</el-button>
      </div>
    </div>
    <div>
      <l-cost-record-year ref="year" v-if="componentType=='year'" :pCostTime="costTime" @totalChange="totalChange"></l-cost-record-year>
    </div>
  </div>
</template>

<script>
  import {getListForMonth, month, lCostRecordYear } from './a-import'
  import moment from "moment";
  export default {
    name: "b-cost-record-month",
    components:{ lCostRecordYear },

    data(){
      return {
        total:{sumAll:'',foodAll:''},
        costTime:moment(),
        componentType:'year',
        // componentStatus:{
        //   'month1':''
        // }
      }
    },
    created(){

    },
    watch:{
      costTime:function (newValue,oldValue) {
        this.$refs[this.componentType].costTime=newValue;
      }
    },
    methods:{
      getData(){},
      handleChangeMonth(){

      },
      handleUpYear(){
        this.costTime = month(this.costTime).yearFirstDate.subtract(1, 'days');
      },
      handleNextYear(){
        this.costTime = month(this.costTime).yearLastDate.add(1, 'days');
      },
      handleComponentTypeChange(){
        this.componentType = this.componentType === 'month1'? 'month2':'month1';
      },
      totalChange(data){
        this.total=data;
      }
    }
  }
</script>


<style lang="scss" scoped>
  .header{
    text-align: center;padding-bottom: 5px;
    .total-container{ color: red; display: inline-block; float: left; font-size: 16px;margin: 0px 0 0 10px;
      span{ display: inline-block;margin-right: 20px;margin-top: 10px; }
    }
  }
  .s-month-container{
    display: inline-block;
    span{ display: inline-block;margin: 3px; cursor: pointer; color: blue; }
    span:hover{ text-decoration: underline; }
  }
  .s-buttons-container{float: right;}
</style>
