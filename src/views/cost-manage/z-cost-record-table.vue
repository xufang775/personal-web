<template>
  <table class="my-table">
    <thead>
    <th>{{headerOne.label}}</th>
    <th v-for="col in columns">{{col.label}}</th>
    <!--<th v-if="isShowHeaderSum">{{headerSum.label}}</th>-->
    </thead>
    <tr v-for="(row,rowKey) in rows">
      <td>{{row[headerOne.field]}}</td>
      <template v-for="(col,colKey) in columns" >
        <td @click.right.prevent="cellRClick(col,colKey,row,rowKey)">
          <!--{{row[col.field]}}-->
          <slot :row="row" :rowKey="rowKey" :col="col" :colKey="colKey"></slot>
        </td>
      </template>
      <!--<td v-if="isShowHeaderSum">{{row[headerSum.field]}}</td>-->
    </tr>
  </table>
</template>

<script>
  import { month } from './a-import'
  import moment from "moment";
  import { FieldLabel } from '@/utils/tools';
  import { api,reqPost } from '@/api/common'
    export default {
      name: "z-cost-record-table",
      props:{
        searchType:{
         type:String,
         default:'month'
        },
        headerOne:{
          type:FieldLabel,
          default: ()=> new FieldLabel({ field:'date',label:'日期' })
        },
        isShowHeaderSum:{
          type:Boolean,
          default:true
        },
        headerSum:{
          type:FieldLabel,
          default: ()=> new FieldLabel({ field:'sum',label:'合计' })
        },
        headerfield:[],
      },
      data(){
        return{
          total:{sumAll:''},
          columns:[{ field:'item1',label:'日期' },{ field:'item2',label:'日期2' }],
          rows:[{date:'1',item1:'111',item2:'222'},{date:'2',item1:'111',item2:'222'},]
        }
      },
      created(){
        this.fetchData();
      },
      methods:{
        cellRClick(col,colKey,row,rowKey){

        },
        fetchData(){
          let costMonthObj = month(this.currentDate);
          let params = {};
          switch (this.searchType){
            case 'month':
              params = {costMonthStr: costMonthObj.monthStr,searchType:this.searchType};
              break;
            case 'year':
              params = {costYearStr: costMonthObj.yearStr,searchType:this.searchType};
              break;
          }
          reqPost(api.costRecord.getRecordTableData, params)
            .then(res=>{
              if(res.success) {
                this.columns = this.isShowHeaderSum ? [...res.data.cols, this.headerSum] : res.data.cols;
                console.log(this.columns);
                let data = res.data.list;
                this.rows = [];
                this.handleRow(data,costMonthObj,params.searchType);
              }
            })
        },
        handleRow(data,costMonthObj,searchType){
          if(searchType == 'month'){
            //================计算其他行======================
            let first = costMonthObj.firstNum;
            let last = costMonthObj.lastNum;

            for(let i= first; i<= last; i++){
              let dateStr = ( i<10 ? '0' + i : i);
              let iMonthObj = month(costMonthObj.monthStr + '-' + dateStr);
              //处理列
              let row = this.handleColMonth(data,iMonthObj);
              this.rows.push(row);
            }

            //================处理合计行================
            let rowSum = this.handleRowSumMonth(data);
            this.rows.push(rowSum);
            this.$emit('totalChange',this.total);

          } else if(searchType == 'year'){
            //================计算其他行======================
            let first = 1;
            let last = 12;

            for(let i= first; i<= last; i++){
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
            this.$emit('totalChange',this.total);
          }
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
            let itemDatas =  data.filter(m=>  m.costTypeCode!=null && m.costTypeCode.indexOf(iCol.key)==0  );
            if(itemDatas.length>0){
              itemDatas.forEach(item=> sumRow +=item.costPrice*100);
              rowOne[iCol.field] =sumRow/100;
            }
          });

          // 计算吃食合计
          let sumFood = 0;
          let filterValue=['早餐','中餐','晚餐','水果蔬菜','其他食物',];
          let colFoods = this.columns.filter(m=>filterValue.indexOf(m.value)>=0);
          colFoods.forEach(col=>{
            sumFood += rowOne[col.field]*100;
          });
          this.total.foodAll = sumFood/100;

          return rowOne;
        },
        handleCol(data,monthStr){
          let row = {
            isCurrMonth: moment().format('YYYY-MM') === monthStr,
          };
          row[this.headerOne.field] = monthStr;

          this.columns.forEach(iCol=>{
            if(iCol.field === 'sum') { // 列合计
              let sumCol =0;
              let itemDatas =  data.filter(m=> m.costMonth == monthStr  );
              if(itemDatas.length>0){
                itemDatas.forEach(item=> sumCol +=item.costPrice*100);
                row[iCol.field] ='￥'+ sumCol/100;
              }
            } else {
              let itemData = data.find(m=> m.costMonth == monthStr && m.costTypeCode!=null && m.costTypeCode.indexOf(iCol.key)==0);
              if(itemData){
                // if(){
                //
                // }
                row[iCol.field] = itemData.costPrice;
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
                row['details-'+iCol.field]=details;
              }
            }
          });
          return row;
        },
        handleRowSumMonth(data){
          // ==================计算行合计========================
          let sumAll=0;
          data.forEach(item=>{
            sumAll +=item.costPrice*100;
          });
          this.total.sumAll = sumAll/100;
          let rowOne = {
            date: '合计',
            dateStr:'sum',
            sum:sumAll/100
          };

          this.columns.forEach(iCol=>{
            let sumRow =0;
            let itemDatas =  data.filter(m=> m.costTypeCode!=null && m.costTypeCode.indexOf(iCol.key)==0 );
            if(itemDatas.length>0){
              itemDatas.forEach(item=> sumRow +=item.costPrice*100);
              rowOne[iCol.field] = sumRow/100;
            }
          });

          // 计算吃食合计
          let sumFood = 0;
          let filterValue=['早餐','中餐','晚餐','水果蔬菜','其他食物',];
          let colFoods = this.columns.filter(m=>filterValue.indexOf(m.value)>=0);
          colFoods.forEach(col=>{
            sumFood += rowOne[col.field]*100;
          });
          this.total.foodAll = sumFood/100;

          return rowOne;
        },
        handleColMonth(data,iMonthObj){
          let row = {
            // date: iMonthObj.todayDate,
            dateStr: iMonthObj.todayStr,
            isToday: iMonthObj.isToday,
            isWeekend: iMonthObj.isWeekend,
          };
          row[this.headerOne.field]=iMonthObj.todayDate;
          this.columns.forEach(iCol=>{
            if(iCol.field === 'sum') { // 列合计
              let sumCol =0;

              let itemDatas =  data.filter(m=> moment(m.costDate).format('YYYY-MM-DD') == iMonthObj.todayStr  );
              if(itemDatas.length>0){
                itemDatas.forEach(item=> sumCol +=item.costPrice*100);
                row[iCol.field] = sumCol/100;
              }
            } else {
              let itemData = data.find(m=> moment(m.costDate).format('YYYY-MM-DD') == iMonthObj.todayStr  && m.costTypeCode!=null && m.costTypeCode.indexOf(iCol.key)==0 );
              if(itemData){
                row[iCol.field] = itemData.costPrice;
                // 处理详情信息
                let costPriceAll=(itemData.costPriceAll).split('||');
                let remarkAll=itemData.remarkAll?itemData.remarkAll.split('||'):[];
                let details =[];
                costPriceAll.forEach((m,k)=>{
                  details.push({
                    costPrice:m,
                    remark:remarkAll.length-1>=k? remarkAll[k]:''
                  })
                });
                row['details-'+iCol.field]=details;
              }
            }
          });
          return row;
        },
      }
    }
</script>

<style lang="scss" scoped>
  $borderColor:#999;
  $tdHeaderbgColor:yellowgreen;  // 行头表头的背景颜色
  $tdSumbgColor:yellowgreen;   // “合计”行，列的背景颜色
  $headFontSize:14px;
  .header{
    text-align: center;padding-bottom: 5px;
    .total-container{ color: red; display: inline-block; float: left; font-size: 16px;margin: 15px 0 0 10px;display: flex;
      span{ display: inline-block; flex: 1; }
    }
  }
  .my-table{
    border:1px $borderColor;
    font-size: 10px;
    border-collapse: collapse;
    margin: 5px auto;
    th{background-color: $tdHeaderbgColor;padding: 8px;border: 1px solid $borderColor;font-size: $headFontSize}
    th:first-child{width: 100px;}
    td{border: 1px solid $borderColor;text-align: center;height: 20px;position: relative; width: 120px;}
    td>input{width: 100%;height: 20px;border: 0px;padding-left: 2px; text-align: center; }
    td:hover,td>input:hover{background: yellow!important;}
    //表格列头样式
    tr>td:first-child{background-color: $tdHeaderbgColor;font-size: $headFontSize;font-weight: bold;}
    //表头“合计”
    thead>th:nth-child(2){background-color: $tdSumbgColor;min-width: 80px;}/* 设置表头“合计”的背景颜色 */
    //合计列
    tr>td:last-child{background-color: $tdSumbgColor; width: 100px;font-size: 14px;font-weight: bold;}/* 设置合计列背景颜色 */
    //合计行
    tr:last-child>td{background-color: $tdSumbgColor;height: 30px;font-size: 14px;font-weight: bold;}/* 设置合计行背景颜色 */
  }
  .s-month-container{
    display: inline-block;
    span{ display: inline-block;margin: 3px; cursor: pointer; color: blue; }
    span:hover{ text-decoration: underline; }
  }

  .detail-ico{
    width:0;
    height:0;
    overflow:hidden;  /*清除ie6下默认的宽高*/
    font-size: 0;     /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
    line-height: 0;  /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
    border-width: 3px;
    border-style: solid;
    border-color: red red transparent transparent;
    position: absolute;
    top:0px;
    right:0px;
    z-index: 99;
  }

</style>
