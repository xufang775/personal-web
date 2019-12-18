<template>
    <div class="app-container">
      <div class="header">
        <el-date-picker type="month" placeholder="消费月份" v-model="currentDate" style="width: 140px;" @change="getList"></el-date-picker>
        <!--{{currentMonth}}-->
      </div>
      <table class="gridtable">
        <thead>
          <th>日期</th>
          <th v-for="col in columns">{{col.value}}</th>
        </thead>
        <tr v-for="(row,index) in list">
          <td>{{row['date']}}</td>
          <template v-for="(col,colKey) in columns" >
            <!--<td v-if="colKey === 0">{{row[col.other]}}</td>-->
            <!--<td v-if="colKey !== 0" :style="{background:colKey>0 && row.isWeekend ?'#d0e69c':''}">-->
              <!--<input :style="{background:row.isWeekend?'#d0e69c':''}" />-->
            <!--</td>-->
            <td @click.right.prevent="cellClick(col,colKey,row,index)"
                @keyup.enter="cellSave(col,colKey,row,index)"
                @keyup.tab="cellSave(col,colKey,row,index)"
                :style="{background:row.isWeekend ?'#d0e69c':''}">
              <input :style="{background:row.isWeekend?'#d0e69c':''}" :value="row[col.other]" >
            </td>
          </template>

        </tr>
      </table>

      <el-dialog title="新增记录" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px" style="width:400px; margin-left: 50px;">
          <el-form-item label="消费日期" label-width="" prop="itemName">
            <el-input v-model="temp.costTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目名称" label-width="" prop="itemName">
            <el-input v-model="temp.costItemName" disabled></el-input>
          </el-form-item>
          <el-form-item label="消费金额" label-width="" prop="itemName">
            <el-input v-model="temp.costMoney"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :autosize="{ minRows:2,maxRows:4 }" v-model="temp.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
          <el-button v-else type="primary" @click="updateData">确认</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import moment from "moment";
  import {getMonthRecordForTable } from '@/api/cost-record'
  import {init } from '@/api/month-cost-record'
    export default {
      name: "month-cost-record-new",
      data(){
        return {
          dateFormat:'YYYY-MM-DD',
          currentDate:moment(),
          currentDay:moment().day(),
          currentMonth:moment().format('YYYY年MM月'),
          columns:[],
          list:[],
          dialogFormVisible:false,
          dialogStatus:'',
          temp:{
            costItemName:'',
            costTime:'',
            costMoney:undefined,
            remark:''
          },
          rules: {
            costMoney: [{required:true,message:'金额是必填的', trigger:'change'}],
          },
        }
      },
      created(){
        this.getCols();
        this.getList();
      },
      methods:{
        cellClick(col,colIndex,row,rowIndex){
          this.dialogFormVisible = true;
          this.temp.costItemName = col.value;
          this.temp.costTime = this.currentMonth+row.date+'日';
        },
        cellSave(col,colIndex,row,rowIndex){
          console.log(col);
        },
        createData(){},
        updateData(){},
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
        getCols(){
          init().then(res=>{
            this.columns = res.data.cols
            console.log(this.columns);
          })
        },
        getList(){
          const monthInfo = this.getMonthInfo();
          const firstDate = monthInfo.firstDateNum;
          const lastDate = monthInfo.lastDateNum;
          // this.list = [];
          getMonthRecordForTable({costMonthStr:moment(this.currentDate).format("YYYY-MM")})
            .then(res=>{
              if(res.success){
                this.list = [];



                console.log(res.data);
                let data = res.data;
                // debugger;
                for(let i=firstDate; i<= lastDate; i++){
                  // debugger;
                  console.log(this.currentDate);
                  const date1 =moment(this.currentDate).format('YYYY-MM-'+ ( i<10 ? '0' + i : i));
                  const currentDay = moment(date1).day();
                  const isToday = i === moment().date();
                  let rowData = {
                    date: i,
                    weekIndex: currentDay,
                    isWeekend: currentDay === 6 || currentDay ===0 ? true: false,
                    isToday:isToday,
                    currentDate:date1,
                  };
                  // console.log(date1);
                  this.columns.forEach(col=>{

                    let itemData = data.find(m=>moment(m.costDate).format('YYYY-MM-DD')==date1 && m.itemCode == col.other );

                    // let itemData = data.find(m=>{
                    //   // debugger
                    //   console.log(moment(m.costDate).format('YYYY-MM-DD')+','+date1);
                    //   // console.log(m.costDate==moment(date1));
                    //   if(moment(m.costDate).format('YYYY-MM-DD')=='2018-12-05' && date1 =='2018-12-05' ){
                    //     debugger
                    //   }
                    //   if(moment(m.costDate).format('YYYY-MM-DD')==date1 && m.itemCode == col.other ) {
                    //     return true
                    //   } else {
                    //     return false
                    //   }
                    // });
                    if(itemData){
                      rowData[col.other] = itemData.costPrice;
                    }
                  });
                  this.list.push(rowData)
                  // console.log(this.list)
                }
                console.log(this.list)
              }
            });


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

<style scoped>
  .header{ text-align: center;padding-bottom: 5px; }
/* gridtable */
  table.gridtable {
     font-family: verdana,arial,sans-serif;
     font-size:11px;
     color:#333333;
     border-width: 1px;
     border-color: #666666;
     border-collapse: collapse;
     width: 100%;
  }
  table.gridtable th {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #666666;
     background-color: #dedede;
  }
  table.gridtable td {
     border-width: 1px;
     padding: 1px;
     border-style: solid;
     border-color: #666666;
     background-color: #ffffff;
    text-align: center;
  }
  table.gridtable td:hover,table.gridtable td>input:hover{
    background: yellow!important;
  }
  table.gridtable td>input{
    width: 100%;height: 100%;border: 0px; padding: 2px;
  }

  /*表格的每行的第一格*/
  table.gridtable tr>td:first-child{
    background-color: #dedede;
  }

  /* /gridtable */

/* altrowstable */
 table.altrowstable {
     font-family: verdana,arial,sans-serif;
     font-size:11px;
     color:#333333;
     border-width: 1px;
     border-color: #a9c6c9;
     border-collapse: collapse;
 }
 table.altrowstable th {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #a9c6c9;
 }
 table.altrowstable td {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #a9c6c9;
 }
 .oddrowcolor{
     background-color:#d4e3e5;
 }
 .evenrowcolor{
     background-color:#c3dde0;
 }
 /* /altrowstable */

 /* hovertable */
 table.hovertable {
     font-family: verdana,arial,sans-serif;
     font-size:11px;
     color:#333333;
     border-width: 1px;
     border-color: #999999;
     border-collapse: collapse;
 }
 table.hovertable th {
     background-color:#c3dde0;
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #a9c6c9;
 }
 table.hovertable tr {
     background-color:#d4e3e5;
 }
 table.hovertable td {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #a9c6c9;
 }
 /* /hovertable */


</style>
