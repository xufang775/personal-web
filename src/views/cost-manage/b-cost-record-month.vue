<template>
  <div class="app-container">
    <div class="header">
      <div class="total-container">
        <span>总消费：￥{{total.sumAll}}</span>
        <span>吃食：￥{{total.foodAll}}</span>
      </div>
      <div class="s-month-container" style="display: inline-block;">
        <span @click="handleUpMonth">&lt;&lt;上月</span>
        <el-date-picker size="mini" type="month" format="yyyy年MM月" placeholder="消费月份" v-model="costMonth"  style="width: 130px;" ></el-date-picker>
        <span @click="handleNextMonth">下月&gt;&gt;</span>
      </div>
      <div class="s-buttons-container">
      <el-button size="mini" type="primary" icon="el-icon-refresh" @click="getData">刷新</el-button>
      <el-button size="mini" type="primary" icon="el-icon-refresh" @click="handleComponentTypeChange">行变列</el-button>
      </div>
    </div>
    <div>
      <b-cost-record-month2 ref="month2" :pCostMonth="costMonth" @totalChange="totalChange"></b-cost-record-month2>
      <b-cost-record-month1 ref="month1" v-if="componentType=='month1'"></b-cost-record-month1>
    </div>
  </div>
</template>

<script>
  import {getListForMonth, month, bCostRecordMonth1,bCostRecordMonth2 } from './a-import'
  import moment from "moment";
  export default {
    name: "b-cost-record-month",
    components:{ bCostRecordMonth1,bCostRecordMonth2 },
    data(){
      return {
        total:{sumAll:'',foodAll:''},
        costMonth:moment(),
        componentType:'month2',
        // componentStatus:{
        //   'month1':''
        // }
      }
    },
    created(){

    },
    watch:{
      costMonth:function (newValue,oldValue) {
        this.$refs[this.componentType].costMonth=newValue;
      }
    },
    methods:{
      getData(){},
      handleChangeMonth(){

      },
      handleUpMonth(){
        this.costMonth = month(this.costMonth).first.subtract(1, 'days');
      },
      handleNextMonth(){
        this.costMonth = month(this.costMonth).last.add(1, 'days');
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
