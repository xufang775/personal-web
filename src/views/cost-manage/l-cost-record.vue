<template>
  <div>
    <el-table :data="list" border style="width:100%" :row-class-name="tableRowClassName">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ (listQuery.page-1)*listQuery.rows + scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="costDate" label="消费日期" width="180">
        <template slot-scope="scope">
          {{scope.row.costDate | parseTime('{y}-{m}-{d}')}}
          <span style="color:red;font-size: 5px;">{{weekenStr(scope.row.costDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="costTypeName" label="消费项目" width="180"></el-table-column>
      <el-table-column prop="costPrice" label="消费金额" width="180">
        <template slot-scope="scope">
          <span style="font-weight: bold;">￥</span>
          <span>{{scope.row.costPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <!--<el-table-column prop="costTypeCode" label="编码"></el-table-column>-->
      <!--<el-table-column prop="costTypeName" label="名称"></el-table-column>-->
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="float:right;">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.page"
                     :page-sizes="[15,20,30,50]"
                     :page-size="listQuery.rows"
                     layout="total,prev, pager, next,sizes"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import { BaseList, api } from './a-import';

  export default {
    name: "l-cost-record",
    extends:BaseList,
    data(){
        return {
          api:{
            pageList:api.costRecord.getPageList,
            delete:api.costRecord.delete,
          }
        }
    },
    methods:{
      // 根据日期，为周六日打个标记
      weekenStr(date){
        const weekNum = moment(date).day();
        if(weekNum == 6){
          return '[六]';
        }
        if(weekNum == 0){
          return '[日]';
        }
      },
      tableRowClassName({row, rowIndex}) {
        if(row.costDate){
          const costDateStr = moment(row.costDate).format('YYYY-MM-DD');
          const currDateStr = moment().format('YYYY-MM-DD');
          const isToday = costDateStr == currDateStr;
          // console.log(costDateStr)
          const weekNum = moment(row.costDate).day();
          const isWeekend =  weekNum == 6 || weekNum == 0 ? true: false;
          if(isToday){
            return 'success-row';
          }
          if(isWeekend){
            return 'warning-row';
          }
        }
        return '';
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
