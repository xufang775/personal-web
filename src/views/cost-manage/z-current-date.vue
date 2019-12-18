<template>
  <div class="s-month-container" style="display: inline-block;">
    <span @click="handleUp">&lt;&lt;{{typeData[type].btnText.up}}</span>
    <el-date-picker v-if="type=='month'" type="month" format="yyyy年MM月" v-model="currentDate" class="inputWidth" @change="dateChange"></el-date-picker>
    <el-date-picker v-if="type=='year'" type="year" format="yyyy年" v-model="currentDate" class="inputWidth" @change="dateChange"></el-date-picker>
    <span @click="handleDown">{{typeData[type].btnText.down}}&gt;&gt;</span>
  </div>
</template>

<script>
  import { month } from './a-import'
  export default {
    name: "z-current-date",
    props:["type"],
    data(){
        return {
          typeFlag:'',
          typeData:{
            'date':{ format:'',placeholder:'',btnText:{ up:'',down:''}},
            'month':{ format:'yyyy年MM月',placeholder:'月份',btnText:{ up:'上月',down:'下月'}},
            'year':{ format:'yyyy年',placeholder:'年份',btnText:{ up:'上年',down:'下年'}},
          },
          currentDate:new Date()
        }
    },
    watch:{
      type:function () {
        this.typeFlag = this.type;
      }
    },
    methods:{
      handleUp(){
        if(this.type=='year'){
          this.currentDate = month(this.currentDate).yearFirstDate.subtract(1, 'days');
        } else if(this.type=='month'){
          this.currentDate = month(this.currentDate).first.subtract(1, 'days');
        }
        this.$emit('dateChange',this.currentDate);
      },
      handleDown(){
        if(this.type=='year'){
          this.currentDate = month(this.currentDate).yearLastDate.add(1, 'days');
        } else if(this.type=='month'){
          this.currentDate = month(this.currentDate).last.add(1, 'days');
        }
        this.$emit('dateChange',this.currentDate);
      },
      dateChange(){
        console.log(this.currentDate);
        this.$emit('dateChange',this.currentDate);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-month-container{
    display: inline-block;
    span{ display: inline-block;margin: 3px; cursor: pointer; color: blue; }
    span:hover{ text-decoration: underline; }
    .inputWidth{ width: 130px; }
  }
</style>
