<template>
  <div>
    <!--<div class="header">-->
      <!--<div class="total-container">-->
        <!--<span>总消费：￥{{total.sumAll}}</span>-->
      <!--</div>-->
      <!--<div class="s-month-container" style="display: inline-block;">-->
        <!--<span @click="handleUpMonth">&lt;&lt;上月</span>-->
        <!--<el-date-picker size="mini" type="month" format="yyyy年MM月" placeholder="消费月份" v-model="costMonth"  style="width: 130px;" ></el-date-picker>-->
        <!--<span @click="handleNextMonth">下月&gt;&gt;</span>-->
      <!--</div>-->
      <!--<el-button size="mini" type="primary" icon="el-icon-refresh" @click="getData" style="float:right">刷新</el-button>-->
    <!--</div>-->
    <table class="my-table">
      <thead>
        <th>日期</th>
        <th v-for="col in columns">{{col.value}}</th>
      </thead>
      <tr v-for="(row,rowKey) in rows">
        <td>{{row.date}}</td>
        <template v-for="(col,colKey) in columns" >
          <td @click.right.prevent="cellRClick(col,colKey,row,rowKey)"

              :style="{background:row.isWeekend ?weekendBg:''}">
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
            <el-popover v-if="col.other !='sum' && row.dateStr !='sum' && row[col.other] && row['details-'+col.other]"  trigger="hover" placement="right"  width="400">
              <div v-if="row['details-'+col.other].length==1">
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
    </table>
    <d-add-edit ref="dAddEdit" @postSuccess="getData"></d-add-edit>
  </div>
</template>

<script>
  import {dAddEdit, getListForMonth, month,zCostRecordPopover,CostRecord,saveCostRecord } from './a-import'
  import moment from "moment";
  export default {
    name: "b-cost-record-month2",
    components:{dAddEdit,zCostRecordPopover},
    props:['pCostMonth'],
    data(){
      return {
        weekendBg:'#d0e69c',
        total:{sumAll:'',foodAll:''},
        columns:[],
        rows:[],
        costMonth:moment(),
      }
    },
    created(){
      this.getData();
    },
    watch:{
      pCostMonth:function () {
        this.getData();
      },
      costMonth:function (newValue,oldValue) {
        this.getData();
      }
    },
    methods:{
      getData(){
        let costMonthObj = month(this.costMonth);
        let params = {costMonthStr: costMonthObj.monthStr,searchType:'month'};

        getListForMonth(params)
          .then(res=>{
            if(res.success){
              this.columns = [...res.data.cols,{key:'sum',value:'合计',other:'sum'}];
              let data = res.data.list;
              this.rows = [];
              //================计算其他行======================
              let first = costMonthObj.firstNum;
              let last = costMonthObj.lastNum;

              // for(let i= last; i>= first; i--){
              //   let dateStr = ( i<10 ? '0' + i : i);
              //   let iMonthObj = month(costMonthObj.monthStr + '-' + dateStr);
              //   //处理列
              //   let row = this.handleCol(data,iMonthObj);
              //   this.rows.push(row);
              // }

              for(let i= first; i<= last; i++){
                let dateStr = ( i<10 ? '0' + i : i);
                let iMonthObj = month(costMonthObj.monthStr + '-' + dateStr);
                //处理列
                let row = this.handleCol(data,iMonthObj);
                this.rows.push(row);
              }

              // for(let i= first; i<= last; i++){
              //   let dateStr = ( i<10 ? '0' + i : i);
              //   let iMonthObj = month(costMonthObj.monthStr + '-' + dateStr);
              //   //处理列
              //   let row = this.handleCol(data,iMonthObj);
              //   this.rows.push(row);
              // }
              //================处理合计行================
              let rowSum = this.handleRowSum(data);
              this.rows.push(rowSum);
              console.log(this.rows);
              this.$emit('totalChange',this.total);
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
          costItemId:col.key,
          costDate:moment(row.dateStr)
        })};
      },
      handleRowSum(data){
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
          let itemDatas =  data.filter(m=> m.itemCode == iCol.other  );
          if(itemDatas.length>0){
            itemDatas.forEach(item=> sumRow +=item.costPrice*100);
            rowOne[iCol.other] = sumRow/100;
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
      handleCol(data,iMonthObj){
        let row = {
          date: iMonthObj.todayDate,
          dateStr: iMonthObj.todayStr,
          isToday: iMonthObj.isToday,
          isWeekend: iMonthObj.isWeekend,
        };
        this.columns.forEach(iCol=>{
          if(iCol.other === 'sum') { // 列合计
            let sumCol =0;

            let itemDatas =  data.filter(m=> moment(m.costDate).format('YYYY-MM-DD') == iMonthObj.todayStr  );
            if(itemDatas.length>0){
              itemDatas.forEach(item=> sumCol +=item.costPrice*100);
              row[iCol.other] = sumCol/100;
            }
          } else {
            let itemData = data.find(m=> moment(m.costDate).format('YYYY-MM-DD') == iMonthObj.todayStr && m.itemCode == iCol.other );
            if(itemData){
              row[iCol.other] = itemData.costPrice;
              // 处理详情信息
              let costPriceAll=(itemData.costPriceAll).split('||');
              let remarkAll=itemData.remarkAll?itemData.remarkAll.split('||'):[];
              let details =[];
              costPriceAll.forEach((m,k)=>{
                details.push({
                  costPrice:m,
                  remark:remarkAll.length-1>=k? remarkAll[k]:''
                })
              })
              row['details-'+iCol.other]=details;
            }
          }
        });
        return row;
      },
      handleUpMonth(){
        this.costMonth = month(this.costMonth).first.subtract(1, 'days');
      },
      handleNextMonth(){
        this.costMonth = month(this.costMonth).last.add(1, 'days');
      },
      cellSave(col,colKey,row,rowKey){
        let obj = this.$refs.objCostPrice.find(m=>m.id==rowKey+'-'+colKey);
        let data = new CostRecord({
          costDate:moment(row.dateStr),
          costItemId:col.key,
          deleteFlag:false,
          costPrice:obj.value
        });
        saveCostRecord(data)
          .then(res=>{
            if(res.success){
              this.$notify({
                title:'成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }
          });
        console.log(data);

        console.log(11);
      },
      doSomething(){
        console.log('doSomething')
      },
      cellFocus(col,colKey,row,rowKey,flag){
        let obj;
        switch (flag){
          case 'right':
            obj = this.$refs.objCostPrice.find(m=>m.id==rowKey+'-'+(colKey+1));
            break;
          case 'left':
            obj = this.$refs.objCostPrice.find(m=>m.id==rowKey+'-'+(colKey-1));
            break;
          case 'up':
            obj = this.$refs.objCostPrice.find(m=>m.id==(rowKey-1)+'-'+(colKey));
            break;
          case 'down':
            obj = this.$refs.objCostPrice.find(m=>m.id==(rowKey+1)+'-'+(colKey));
            break;
        }
        if(obj){
          obj.focus();
        }
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
