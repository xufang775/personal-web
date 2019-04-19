<template>
  <div class="app-container">
    <div style="display: flex; flex-direction: row;">
      <div style="flex: 1;">
        消费配置项目：
        <el-select v-model="typeConfigId" placeholder="" style="width: 150px;">
          <el-option v-for="item in typeConfigDic" :key="item.key" :label="item.label" :value="item.key"></el-option>
        </el-select>
      </div>
      <div style="flex: 2;text-align: center;">
        <z-current-date ref="cCurrentDate" :type="dateSearchType" @dateChange="handleDateChange"></z-current-date>
      </div>
      <div style="flex: 1;text-align: right;">
        <el-radio-group v-model="dateSearchType">
          <el-radio-button label="month">月</el-radio-button>
          <el-radio-button label="year">年</el-radio-button>
        </el-radio-group>
        <el-button type="primary" icon="el-icon-refresh"></el-button>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div><z-cost-record-table ref="recordTable"
      :isShowHeaderSum="true"
      :search-type="tableConfig[dateSearchType].type"
      :headerOne="tableConfig[dateSearchType].headerOne">
      <template slot-scope="scope">
        <el-popover v-if="scope.col.field !='sum' && scope.row.dateStr !='sum' && scope.row[scope.col.field] && scope.row['details-'+scope.col.field]"  trigger="hover" placement="right"  width="400">
          <div v-if="scope.row['details-'+scope.col.field].length==1">
            <p>消费金额：￥{{scope.row['details-'+scope.col.field][0].costPrice}}</p>
            <p>消费描述：{{scope.row['details-'+scope.col.field][0].remark}}</p>
          </div>
          <div v-if="scope.row['details-'+scope.col.field].length>1">
            <el-table size="mini" :data="scope.row['details-'+scope.col.field]" border>
              <el-table-column align="center" label="ID" width="40">
                <template slot-scope="detail">
                  {{ detail.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column width="80" property="costPrice" label="消费金额">
                <template slot-scope="detail">
                  ￥{{ detail.row.costPrice }}
                </template>
              </el-table-column>
              <el-table-column property="remark" label="消费描述"></el-table-column>
            </el-table>
          </div>
          <div slot="reference" class="name-wrapper">
            <span :class="{'detail-ico':true}"></span>
          </div>
        </el-popover>
        <input v-if="scope.col.field !='sum' && scope.row.dateStr !='sum'"
               :ref="'input'+scope.rowKey+'-'+scope.colKey"
               @click.right.prevent="cellRClick(scope.col,scope.colKey,scope.row,scope.rowKey)"
               @keyup.enter.prevent="cellSave(scope.col,scope.colKey,scope.row,scope.rowKey)"
               @keyup.alt.83="cellSave(scope.col,scope.colKey,scope.row,scope.rowKey)"
               @click.ctrl="doSomething"
               @keyup.alt.65="doSomething"
               @keyup.left="cellFocus(scope.col,scope.colKey,scope.row,scope.rowKey,'left')"
               @keyup.right="cellFocus(scope.col,scope.colKey,scope.row,scope.rowKey,'right')"
               @keyup.up="cellFocus(scope.col,scope.colKey,scope.row,scope.rowKey,'up')"
               @keyup.down="cellFocus(scope.col,scope.colKey,scope.row,scope.rowKey,'down')"
               :style="{background:scope.row.isWeekend?weekendBg:''}"
               :value="scope.row[scope.col.field]" >
        <span v-else>{{ scope.row[scope.col.field] }}</span>

      </template>
    </z-cost-record-table>
    </div>
    <d-cost-record :ref="dCR.ref" :pDialog="dCR" @close="dCR.close()" @saveSuccess="dCR.yes"></d-cost-record>
  </div>
</template>

<script>
  import { api, reqPost } from "../../../api/common";
  import ZCurrentDate from "../z-current-date";
  import ZCostRecordTable from "../z-cost-record-table";
  import { FieldLabel } from "../../../utils/tools";
  import { Dialog,CostRecord,dCostRecord,saveCostRecord } from "../a-import";
  import moment from 'moment';
  export default {
    components: {
      ZCostRecordTable,
      ZCurrentDate,
      dCostRecord
    },
    name: "b-cost-record-table",
    data(){
      return {
        weekendBg:'#d0e69c',
        dateSearchType:'month',
        typeConfigId:'',
        currentDate: new Date,
        typeConfigDic:[],
        dCR: new Dialog({ref:'dCostRecord'}),
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
      this.loadDics();
    },
    methods:{
      loadDics(){
        reqPost(api.costTypeConfig.getKeyLabelList,{})
          .then(res=>{
            if(res.success){
              this.typeConfigDic = res.data;
              if(this.typeConfigDic.length>0){
                this.typeConfigId = this.typeConfigDic[0].key;
              }

            }
          });
      },
      handleDateChange(date){
        this.$refs.recordTable.fetchData(date);
      },
      cellFocus(col,colKey,row,rowKey,flag){
        let obj;
        switch (flag){
          case 'right':
            obj = this.$refs['input'+rowKey+'-'+(colKey+1)];
            break;
          case 'left':
            obj = this.$refs['input'+rowKey+'-'+(colKey-1)];
            break;
          case 'up':
            obj = this.$refs['input'+(rowKey-1)+'-'+(colKey)];
            break;
          case 'down':
            obj = this.$refs['input'+(rowKey+1)+'-'+(colKey)];
            break;
        }
        if(obj){
          obj.focus();
        }
      },
      cellSave(col,colKey,row,rowKey){
        let obj =this.$refs['input'+rowKey+'-'+(colKey)];
        let data = new CostRecord({
          costDate:moment(row.dateStr),
          costTypeCodeArr:this.handleTypeCode(col.key),
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
      },
      cellRClick(col,colIndex,row,rowIndex){
        this.dCR.open({
          title:'新增消费记录',
          status:'add',
          model: new CostRecord({costTypeCodeArr:this.handleTypeCode(col.key),costDate:moment(row.dateStr)}),
          yes:(res)=>{
            this.dCR.close();
            let currDate= this.$refs.cCurrentDate.currentDate;
            this.$refs.recordTable.fetchData(currDate);
          }
        });
      },
      handleTypeCode(typeCode){
        let typeCodeArr = [];
        if(typeCode){
          for(let i=2;i<=typeCode.length;i=i+2){
            typeCodeArr.push(typeCode.substring(0,i));
          }
        }
        return typeCodeArr;
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
    border-width: 4px;
    border-style: solid;
    border-color: red red transparent transparent;
    position: absolute;
    top:0px;
    right:0px;
    z-index: 99;
  }

</style>
