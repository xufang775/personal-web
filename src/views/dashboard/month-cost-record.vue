<template>
    <div class="app-container">
      <div class="header">{{currentMonth}}</div>
      <el-table :data="list" show-summary fit border
                :row-class-name="tableRowClassName"
                :summary-method="getSummaries">
        <el-table-column prop="date" label="日期" width="70px" algin="center"></el-table-column>
        <!--<el-table-column prop="weekIndex" label="星期"></el-table-column>-->
        <!--<el-table-column prop="currentDate" label="星期"></el-table-column>-->
        <!--<el-table-column prop="isToday" label="星期"></el-table-column>-->
        <!--<el-table-column v-for="col in columns" :prop="col.prop" :label="col.label"></el-table-column>-->
        <template v-for="(col,index) in columns">
          <el-table-column :prop="col.prop" :label="col.label"></el-table-column>
        </template>
      </el-table>
    </div>
</template>

<script>
  import moment from "moment";
    export default {
      name: "month-cost-record",
      data(){
        return {
          dateFormat:'YYYY-MM-DD',
          currentDate:moment(),
          currentDay:moment().day(),
          currentMonth:moment().format('YYYY年MM月'),
          columns:[
            { prop:'date3', label:'日期' },
            { prop:'date6', label:'日期' },
            { prop:'date7', label:'日期' },
            { prop:'date3', label:'日期' },
            { prop:'date4', label:'日期' },
            { prop:'date5', label:'日期' },
            { prop:'date8', label:'日期' },
            { prop:'date9', label:'日期' },
            { prop:'date10', label:'日期' },
            { prop:'date11', label:'日期' },
            { prop:'date12', label:'日期' },
            { prop:'date13', label:'日期' },
            { prop:'date14', label:'日期' },
            { prop:'date15', label:'日期' },
            { prop:'date16', label:'日期' },
            { prop:'date17', label:'日期' },
          ],
          list:[]
        }
      },
      created(){
        this.getList();
      },
      methods:{
        getMonthInfo(){
          const dateFormat = 'YYYY-MM-DD';
          const firstDate =moment(moment().format('YYYY-MM-01'));
          const lastDate = moment(moment().add(1,'M').format('YYYY-MM-01')).subtract(1,'d');
          const firstDateStr = firstDate.format(dateFormat);
          const lastDateStr = lastDate.format(dateFormat);
          const firstDateNum = firstDate.date();
          const lastDateNum = lastDate.date();
          return {firstDate,lastDate,firstDateStr,lastDateStr,firstDateNum,lastDateNum}
        },
        getList(){
          const monthInfo = this.getMonthInfo();
          const firstDate = monthInfo.firstDateNum;
          const lastDate = monthInfo.lastDateNum;
          for(let i=firstDate; i<= lastDate; i++){
            const date1 = moment().format('YYYY-MM-'+i);
            const currentDay = moment(date1).day();
            const isToday = i === moment().date();
            this.list.push({
              date: i,
              weekIndex: currentDay,
              isWeekend: currentDay === 6 || currentDay ===0 ? true: false,
              isToday:isToday,
              currentDate:date1,
            })
          }
        },
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '合计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = 'N/A';
            }
          });

          return sums;
        },
        tableRowClassName({row, rowIndex}) {
          if(row.isToday){
            return 'success-row';
          }
          if(row.isWeekend){
            return 'warning-row';
          }
          return '';
          // if (rowIndex === 1) {
          //   return 'warning-row';
          // } else if (rowIndex === 3) {
          //   return 'success-row';
          // }
          // return '';
        }
      }
    }
</script>

<style>
  .header{ text-align: center;padding-bottom: 5px; }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<!--<style scoped>-->
<!--.header{ text-align: center;padding-bottom: 5px; }-->
<!--.warning-row {-->
  <!--background: oldlace;-->
<!--}-->

<!--.success-row {-->
  <!--background: #f0f9eb;-->
<!--}-->
<!--</style>-->
