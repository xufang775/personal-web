<template>
    <div class="app-container">
      <el-row>
        <el-col :span="12">
          <el-table :data="yearList" border>
            <el-table-column prop="costMonth" label="消费月份"></el-table-column>
            <el-table-column prop="costPrice" label="消费金额"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </div>
</template>

<script>
  import { getMonthCensus } from './a-import'
    export default {
      name: "b-cost-record-census",
      data(){
        return {
          yearList:[]
        }
      },
      created(){
        this.getMonthCensus();
      },
      methods:{
        getMonthCensus(){
          getMonthCensus({})
            .then(res=>{
              if(res.success){
                let data = res.data;
                let sumAll=0;
                data.forEach(item=>{
                  sumAll += item.costPrice * 100;
                });

                this.yearList = [{costMonth:'合计',costPrice:sumAll/100},...res.data];
                // this.yearList = res.data;
              }
            })
        }
      }

    }
</script>

<style scoped>

</style>
