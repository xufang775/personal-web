<template>
  <table class="my-table">
    <thead>
    <th>{{headerOne.name}}</th>
    <th v-for="col in columns">{{col.name}}</th>
    <!--<th v-if="isShowHeaderSum">{{headerSum.label}}</th>-->
    </thead>
    <tr v-for="(row,rowKey) in rows">
      <td>{{row[headerOne.field]}}</td>
      <template v-for="(col,colKey) in columns" >
        <td @click.right.prevent="cellRClick(col,colKey,row,rowKey)" :style="{background:row.isWeekend ? weekendCellBg:''}">
          {{row[col.field]}}
          <!--<slot :row="row" :rowKey="rowKey" :col="col" :colKey="colKey"></slot>-->
        </td>
      </template>
      <!--<td v-if="isShowHeaderSum">{{row[headerSum.field]}}</td>-->
    </tr>
  </table>
</template>

<script>
  import { FieldLabel } from '@/utils/tools';
  import api from '@/api/cost-record-new';
  import apiCTC from '@/api/cost-type-config';
  import TableRender from '../mixins/TableRender'
  import { mapState } from 'vuex'
    export default {
      mixins:[TableRender],
      name: "record-table",
      props:{
        // searchType:{
        //   type:String,
        //   default:'month'
        // },
        showColumnSum:{
          type:Boolean,
          default:true
        },
        headerOne:{
          type:FieldLabel,
          default: ()=> new FieldLabel({ field:'date',name:'日期' })
        },
      },
      data(){
          return {
            api: api,
            apiCTC:apiCTC,
            // costTypeList: [],
            // costRecordList: [],
            // currentDate: new Date
          }
      },
      computed:mapState({
        searchType: state => state.costRecord.searchDateType,
        currentDate: state => state.costRecord.currentDate,
        costTypeList: state => state.costRecord.costTypeList,
        costRecordList: state => state.costRecord.costRecordList,
      }),
      created(){
        // this.currentDate = this.$dateHelper('2019-03-31'); // this.$now;
        // console.log(this.currentDate.format())
        // this.loadRows();
        // this.loadColumns();

        this.$store.dispatch('loadTableRows')
        this.$store.dispatch('loadTableColumns')

        console.log(this.costTypeList)
        console.log(this.costRecordList)
      },
      methods:{
        async loadRows(){
          let params = {
            searchType:this.searchType,
            searchDate:this.currentDate.format(this.$datetype.month)
          };
          let result =await this.api.queryTable(params);
          if(result.code == this.$HttpCode.c20000){
            this.costRecordList = result.data;
          }
        },
        async loadColumns(){
          let result =await this.apiCTC.queryTableColumns();
          if(result.code == this.$HttpCode.c20000){
            this.costTypeList = result.data;
          }
        },
        cellRClick(){

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
    td{border: 1px solid $borderColor;text-align: center;height: 20px;position: relative; width: 120px; height: 24px;}
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
