<template>
    <div>
      <table class="my-table">
        <thead>
        <th>日期</th>
        <th v-for="col in columns">{{col.value}}</th>
        </thead>
        <tbody>
        <tr v-for="(row,rowKey) in rows">
          <td>{{row.rowTitle}}</td>
          <template v-for="(col,colKey) in columns" >
            <td @click.right.prevent="cellRClick(col,colKey,row,rowKey)"

                :style="{background:row.isWeekend ?weekendBg:''}">
              <!--{{row[col.other]}}-->


              <input v-if="col.other !='sum' && row.dateStr !='sum'"
                     ref="objCostPrice"
                     :id="rowKey+'-'+colKey"
                     @keyup.enter.prevent="cellSave(col,colKey,row,rowKey)"
                     @keyup.alt.83="cellSave(col,colKey,row,rowKey)"
                     @click.ctrl="doSomething"
                     @keyup.alt.65="doSomething"
                     @keyup.left="cellFocus(col,colKey,row,rowKey,'left')"
                     @keyup.right="cellFocus(col,colKey,row,rowKey,'right')"
                     @keyup.up="cellFocus(col,colKey,row,rowKey,'up')"
                     @keyup.down="cellFocus(col,colKey,row,rowKey,'down')"
                     :style="{background:row.isWeekend?weekendBg:''}"
                     :value="row[col.other]" >
              <span v-else>{{row[col.other]}}</span>
              <el-popover v-if="col.other !='sum' && row.dateStr !='sum' && row[col.other] && row['details-'+col.other]"  trigger="hover" placement="right"  width="450">
                <div v-if="row['details-'+col.other].length==1">
                  <p>消费日期：{{row['details-'+col.other][0].costDate}}</p>
                  <p>消费金额：￥{{row['details-'+col.other][0].costPrice}}</p>
                  <p>消费描述：{{row['details-'+col.other][0].remark}}</p>
                </div>
                <div v-if="row['details-'+col.other].length>1">
                  <el-table size="mini" :data="row['details-'+col.other]" border>
                    <el-table-column align="center" label="ID" width="40">
                      <template slot-scope="scope">
                        {{ scope.$index+1 }}
                      </template>
                    </el-table-column>
                    <el-table-column width="90" property="costDate" label="消费描述"></el-table-column>
                    <el-table-column width="80" property="costPrice" label="消费金额">
                      <template slot-scope="scope">
                        ￥{{ scope.row.costPrice }}
                      </template>
                    </el-table-column>
                    <el-table-column property="remark" label="消费描述"></el-table-column>
                  </el-table>
                </div>
                <div slot="reference" class="name-wrapper">
                  <span :class="{'detail-ico':true}"></span>
                </div>
              </el-popover>

            </td>
          </template>

        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  import {dAddEdit, getListForMonth,dicCostItem, month,zCostRecordPopover,CostRecord,saveCostRecord } from './a-import'
  import moment from "moment";
    export default {
      name: "l-cost-record-year",
      props:['pCostTime'],
      data(){
          return {
            total:{sumAll:''},
            costTime:moment(),
            columns:[],
            rows:[]
          }
      },
      watch:{
        pCostTime:function () {
          this.getData();
        },
        costTime:function (newValue,oldValue) {
          this.getData();
        }
      },
      created(){
        // this.getCols();
        this.getData();
      },
      methods:{
        getCols(){
          dicCostItem()
            .then(res=>{
              if(res.success){
                this.columns = res.data;
              }
            })
        },
        getData(){
          let costMonthObj = month(this.costTime);
          let params = {costYearStr:costMonthObj.yearStr,searchType:'year'};
          getListForMonth(params)
            .then(res=>{
              if(res.success){
                console.log(res.data);

                this.columns = [...res.data.cols,{key:'sum',value:'合计',other:'sum'}];
                let data = res.data.list;
                this.rows = [];
                //================计算其他行======================
                let first = costMonthObj.firstNum;
                let last = costMonthObj.lastNum;

                for(let i= 1; i<= 12; i++){
                  let dateStr = ( i<10 ? '0' + i : i);
                  let iMonthObj = month(costMonthObj.monthStr + '-' + dateStr);
                  let monthStr = costMonthObj.yearStr + '-' + dateStr;
                  //处理列
                  let row = this.handleCol(data,monthStr);
                  this.rows.push(row);
                }

                //================处理合计行================
                let rowSum = this.handleRowSum(data);
                this.rows.push(rowSum);
                console.log(this.rows);

                this.$emit('totalChange',this.total);
              }
            })
        },
        handleRowSum(data){
          // ==================计算行合计========================
          let sumAll=0;
          data.forEach(item=>{
            sumAll +=item.costPrice*100;
          });
          this.total.sumAll = sumAll/100;
          let rowOne = {
            rowTitle: '合计',
            dateStr:'sum',
            sum:sumAll/100
          };

          this.columns.forEach(iCol=>{
            let sumRow =0;
            let itemDatas =  data.filter(m=> m.itemCode == iCol.other  );
            if(itemDatas.length>0){
              itemDatas.forEach(item=> sumRow +=item.costPrice*100);
              rowOne[iCol.other] =sumRow/100;
            }
          });

          // 计算吃食合计
          let sumFood = 0;
          let filterValue=['早餐','中餐','晚餐','水果蔬菜','其他食物',];
          let colFoods = this.columns.filter(m=>filterValue.indexOf(m.value)>=0);
          colFoods.forEach(col=>{
            sumFood += rowOne[col.other]*100;
          });
          this.total.foodAll = sumFood/100;

          return rowOne;
        },
        handleCol(data,monthStr){
          let row = {
            rowTitle: monthStr,
            isCurrMonth: moment().format('YYYY-MM') === monthStr,
          };
          this.columns.forEach(iCol=>{
            if(iCol.other === 'sum') { // 列合计
              let sumCol =0;
              let itemDatas =  data.filter(m=> m.costMonth == monthStr  );
              if(itemDatas.length>0){
                itemDatas.forEach(item=> sumCol +=item.costPrice*100);
                row[iCol.other] ='￥'+ sumCol/100;
              }
            } else {
              let itemData = data.find(m=> m.costMonth == monthStr && m.itemCode == iCol.other );
              if(itemData){
                row[iCol.other] = itemData.costPrice;
                // 处理详情信息
                let costPriceAll=(itemData.costPriceAll).split('||');
                let remarkAll=itemData.remarkAll?itemData.remarkAll.split('||'):[];
                let costDateAll=itemData.costDateAll?itemData.costDateAll.split('||'):[];
                let details =[];
                costPriceAll.forEach((m,k)=>{
                  details.push({
                    costPrice:m,
                    costDate:costDateAll.length-1>=k? costDateAll[k]:'',
                    remark:remarkAll.length-1>=k? remarkAll[k]:''
                  })
                });
                row['details-'+iCol.other]=details;
              }
            }
          });
          return row;
        },
      }
    }
</script>

<style lang="scss" scoped>
  .s-month-container{
    display: inline-block;
    span{ display: inline-block;margin: 3px; cursor: pointer; color: blue; }
    span:hover{ text-decoration: underline; }
  }
.my-table{
  td{ height: 35px; }
  tr>td:not(:first-child){ font-size: 14px; }
}
</style>
