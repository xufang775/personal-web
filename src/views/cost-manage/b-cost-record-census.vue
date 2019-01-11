<template>
    <div class="app-container">
      <el-row>
        <!--<el-col :span="12">-->
          <!--<el-table :data="yearList" border>-->
            <!--<el-table-column prop="costMonth" label="消费月份"></el-table-column>-->
            <!--<el-table-column prop="costPrice" label="消费金额"></el-table-column>-->
          <!--</el-table>-->
        <!--</el-col>-->
        <el-col :span="24">
          <z-current-date type="month"></z-current-date>
          <z-cost-record-table
            :isShowHeaderSum="true"
            :search-type="tableConfig[searchType].type"
            :headerOne="tableConfig[searchType].headerOne"
          >
            <template slot-scope="scope">
              {{ scope.row[scope.col.field] }}
            </template>
          </z-cost-record-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { getMonthCensus,zCurrentDate,zCostRecordTable,FieldLabel } from './a-import'
  import ZCurrentDate from "./z-current-date";
  import ZCostRecordTable from "./z-cost-record-table";
    export default {
      components: {
        ZCostRecordTable,
        ZCurrentDate},
      name: "b-cost-record-census",
      component:{zCurrentDate},
      data(){
        return {
          yearList:[],
          // headerOne:new FieldLabel({ field:'costMonth',label:'月份' })
          // headerOne:new FieldLabel({ field:'date',label:'日期' })
          searchType:'month',
          tableConfig:{
            month:{
              type:'month',
              headerOne:new FieldLabel({ field:'date',label:'日期' })
            },
            year:{
              type:'year',
              headerOne:new FieldLabel({ field:'costMonth',label:'月份' })
            },
          }
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
