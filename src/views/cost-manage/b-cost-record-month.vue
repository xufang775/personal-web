<template>
  <div class="app-container">
    <div class="header">
      <el-date-picker type="month" placeholder="消费月份" v-model="costMonth" style="width: 140px;" @change="getData"></el-date-picker>
      <table class="gridtable">
        <thead>
        <th>日期</th>
        <th v-for="col in columns">{{col.value}}</th>
        </thead>
        <tr v-for="(row,index) in rows">
          <td>{{row['date']}}</td>
          <template v-for="(col,colKey) in columns" >
            <td @click.right.prevent="cellClick(col,colKey,row,index)"
                @keyup.enter="cellSave(col,colKey,row,index)"
                @keyup.tab="cellSave(col,colKey,row,index)"
                :style="{background:row.isWeekend ?'#d0e69c':''}">
              <input :style="{background:row.isWeekend?'#d0e69c':''}" :value="row[col.other]" >
            </td>
          </template>

        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import {getListForMonth, month } from './a-import'
  import moment from "moment";
  export default {
    name: "b-cost-record-month",
    data(){
      return {
        columns:[],
        rows:[],
        costMonth:moment(),
      }
    },
    created(){
      this.getData();
    },

    methods:{
      getData(){
        let costMonthObj = month(this.costMonth);
        let params = {costMonthStr: costMonthObj.monthStr};
        getListForMonth(params)
          .then(res=>{
            if(res.success){
              this.columns = res.data.cols;
              let data = res.data.list;
              this.rows = [];
              let first = month(this.costMonth).firstNum;
              let last = month(this.costMonth).lastNum;
              for(let i= first; i<= last; i++){
                let dateStr = ( i<10 ? '0' + i : i);
                let iMonthObj = month(costMonthObj.monthStr + '-' + dateStr);
                let row = {
                  date: iMonthObj.todayDate,
                  isToday: iMonthObj.isToday,
                  isWeekend: iMonthObj.isWeekend,
                }
                this.columns.forEach(col=>{
                  let itemData = data.find(m=> moment(m.costDate).format('YYYY-MM-DD') == iMonthObj.todayStr && m.itemCode == col.other );
                  if(itemData){
                    row[col.other] = itemData.costPrice;
                  }
                });
                this.rows.push(row);
              }
            }
          });
      },

      tableRowClassName({row, rowIndex}) {
        if(row.isToday){
          return 'success-row';
        }
        if(row.isWeekend){
          return 'warning-row';
        }
        return '';
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
