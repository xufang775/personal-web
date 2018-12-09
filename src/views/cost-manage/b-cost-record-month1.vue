<template>
  <div class="app-container">
    <div class="header">
      <el-date-picker type="month" placeholder="消费月份" v-model="costMonth" style="width: 140px;" ></el-date-picker>
    </div>
    <table class="my-table">
      <thead>
      <th>项目</th>
      <th v-for="col in columns">
        {{col.title}}
        <!--<span v-if="col.weekNum===6">[六]</span>-->
        <!--<span v-if="col.weekNum===0">[日]</span>-->
      </th>
      </thead>
      <tr v-for="(row,rowKey) in rows">
        <td>{{row['costItemName']}}</td>
        <template v-for="(col,colKey) in columns" >
          <td @click.right.prevent="cellRClick(col,colKey,row,rowKey)"

              :style="{background:col.isWeekend && rowKey>0 ?weekendBg:''}">
            <input v-if="col.field !='sum' && rowKey != 0"
                   @keyup.enter.prevent="logo"
                   @keyup="logo"
                   @keyup.alt.83="doSomething"
                   @click.ctrl="doSomething"
                   @keyup.alt.65="doSomething"
                   :style="{background:col.isWeekend?weekendBg:''}"
                   :value="row[col.field]" >
            <span v-else>{{row[col.field]}}</span>
            <el-popover v-if="rowKey!=0 && colKey!=0 && row[col.field] && row['details-'+col.field]"  trigger="hover" placement="right"  width="400">
              <div v-if="row['details-'+col.field].length==1">
                <!--<el-form :model="row['details-'+col.field][0]" :rules="rules" class="demo-ruleForm">-->
                  <!--<el-form-item label="消费金额" prop="costPrice">-->
                    <!--{{row['details-'+col.field][0].costPrice}}-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="消费描述" prop="remark">-->
                    <!--{{row['details-'+col.field][0].remark}}-->
                  <!--</el-form-item>-->
                <!--</el-form>-->

                <p>消费金额：{{row['details-'+col.field][0].costPrice}}</p>
                <p>消费描述：{{row['details-'+col.field][0].remark}}</p>
              </div>
              <div v-if="row['details-'+col.field].length>1">
                <el-table size="mini" :data="row['details-'+col.field]" border>
                  <el-table-column width="80" property="costPrice" label="消费金额"></el-table-column>
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
    </table>
    <el-popover
      placement="right"

      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>

    <d-add-edit ref="dAddEdit" ></d-add-edit>
  </div>
</template>

<script>
  import {dAddEdit, getListForMonth, month } from './a-import'
  import moment from "moment";
  import {CostRecord} from "../../model/cost-record";
  export default {
    name: "b-cost-record-month",
    components:{dAddEdit},
    data(){
      return {
        weekendBg:'#d0e69c',
        columns:[],
        rows:[],
        costMonth:moment(),
      }
    },
    created(){
      this.getCols();
      this.getData();
    },
    watch:{
      costMonth:function (newValue,oldVaue) {
        this.getCols();
        this.getData();
      }
    },
    methods:{

      getCols(){
        // 设置列头
        let cols = [
          // {field:'costItemName',title:'消费项目'},
          {field:'sum',title:'合计'},
        ];
        let costMonthObj = month(this.costMonth);
        let lastDateNum = moment().format('YYYY-MM') === costMonthObj.monthStr ? moment().date() : costMonthObj.lastNum;
        for(let i= lastDateNum; i>=  costMonthObj.firstNum; i--){
          let dateStr = ( i<10 ? '0' + i : i);
          let iMonthObj = month(costMonthObj.monthStr + '-' + dateStr);
          cols.push({
            field:'date'+i,
            title:i,
            dateStr:iMonthObj.todayStr,
            weekNum:iMonthObj.weekNum,
            isToday: iMonthObj.isToday,
            isWeekend: iMonthObj.isWeekend,
          });
        }
        this.columns = cols;
      },

      getData(){
        let costMonthObj = month(this.costMonth);
        let params = {costMonthStr: costMonthObj.monthStr};
        getListForMonth(params)
          .then(res=>{
            if(res.success){

              let costItems = res.data.cols;
              let data = res.data.list;
              this.rows = [];

              // ==================计算行合计========================
              let sumAll=0;
              data.forEach(item=>{
               sumAll +=item.costPrice*100;
              });
              let rowOne = {
                costItemName: '合计',
                sum:sumAll/100
              };
              this.columns.forEach(iCol=>{
                let sumRow =0;
                let itemDatas =  data.filter(m=> moment(m.costDate).format('YYYY-MM-DD') == iCol.dateStr );
                if(itemDatas.length>0){
                  itemDatas.forEach(item=> sumRow +=item.costPrice*100);
                  rowOne[iCol.field] = sumRow/100;
                }
              });
              this.rows.push(rowOne);

              // ==================计算其他行========================
              costItems.forEach(iRow=>{
                let row = {
                  costItemId: iRow.key,
                  costItemName: iRow.value
                };
                this.columns.forEach((iCol,index)=>{
                  // ==================计算列合计========================
                  if(iCol.field === 'sum'){ // 列合计
                    let sumCol =0;
                    let itemDatas =  data.filter(m=> m.itemCode == iRow.other );
                    if(itemDatas.length>0){
                      itemDatas.forEach(item=> sumCol +=item.costPrice*100);
                      row[iCol.field] = sumCol/100;
                    }

                  } else {  // 其他列
                    let itemData = data.find(m=> moment(m.costDate).format('YYYY-MM-DD') == iCol.dateStr && m.itemCode == iRow.other );
                    if(itemData){
                      row[iCol.field] = itemData.costPrice;

                      let costPriceAll=itemData.costPriceAll.split('||');
                      let remarkAll=itemData.remarkAll?itemData.remarkAll.split('||'):[];
                      let details =[];
                      costPriceAll.forEach((m,k)=>{
                        details.push({
                          costPrice:m,
                          remark:remarkAll.length-1>=k? remarkAll[k]:''
                        })
                      })
                      row['details-'+iCol.field]=details;
                    }
                  }
                })
                this.rows.push(row);
              });
              console.log(this.rows);
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
      },
      cellRClick(col,colIndex,row,rowIndex){
        this.$refs.dAddEdit.status='add-month';
        this.$refs.dAddEdit.visible=true;
        this.$refs.dAddEdit.model={...this.$refs.dAddEdit.model,...new CostRecord({
          costItemId:row.costItemId,
          costDate:col.dateStr
        })};
      },
      cellSave(){
        console.log(11);
      },
      doSomething(){
        console.log('doSomething')
      },
      logo(e,msg){
        if(msg){
          console.log(msg);
        } else {
          console.log(e.keyCode);
        }

      }
    }
  }
</script>


<style lang="scss" scoped>
$borderColor:#999;
$tdHeaderbgColor:yellowgreen;  // 行头表头的背景颜色
$tdSumbgColor:yellowgreen;   // “合计”行，列的背景颜色
$headFontSize:14px;
  .header{ text-align: center;padding-bottom: 5px; }
  .my-table{
    border:1px $borderColor;
    font-size: 10px;
    border-collapse: collapse;
    margin: 5px auto;
    th{background-color: $tdHeaderbgColor;padding: 8px;border: 1px solid $borderColor;max-width: 120px;font-size: $headFontSize}
    td{border: 1px solid $borderColor;height: 30px;text-align: center;max-width: 120px;position: relative;}
    td>input{width: 100%;height: 30px;border: 0px;padding-left: 2px; }
    td:hover,td>input:hover{background: yellow!important;}
    //表格列头样式
    tr>td:first-child{background-color: $tdHeaderbgColor;min-width: 100px;font-size: $headFontSize;font-weight: bold;}
    //表头“合计”
    thead>th:nth-child(2){background-color: $tdSumbgColor;min-width: 80px;}/* 设置表头“合计”的背景颜色 */
    //合计列
    tr>td:nth-child(2){background-color: $tdSumbgColor;}/* 设置合计列背景颜色 */
    //合计行
    tr:nth-child(2)>td{background-color: $tdSumbgColor;}/* 设置合计行背景颜色 */
  }

.detail-ico{
  width:0;
  height:0;
  overflow:hidden;  /*清除ie6下默认的宽高*/
  font-size: 0;     /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
  line-height: 0;  /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
  border-width: 5px;
  border-style: solid;
  border-color: red red transparent transparent;
  position: absolute;
  top:0px;
  right:0px;
  z-index: 99;
}
/*.detail-ico-weekend{*/
  /*border-color: red red #d0e69c #d0e69c;*/
/*}*/
  /*.detail-ico{*/
    /*width: 8px;*/
    /*height: 8px;*/
    /*background: red;*/
    /*display: inline-block;*/
    /*position: absolute;*/
    /*top:0px;*/
    /*right:0px;*/
    /*z-index: 99;*/
  /*}*/
</style>
