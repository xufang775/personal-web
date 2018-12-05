<template>
  <div>
    <el-table size="mini" :data="list" border :row-class-name="tableRowClassName" fit>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.details" border>
            <el-table-column prop="costItemName" label="消费项目"></el-table-column>
            <el-table-column prop="costPrice" label="消费金额"></el-table-column>
            <el-table-column prop="remark" label="描述"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ (listQuery.page-1)*listQuery.rows + scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="costDate" label="消费日期">
        <template slot-scope="scope">
          {{scope.row.costDate | dateString('YYYY-MM-DD')}}
          <span style="color:red;font-size: 5px;">{{weekenStr(scope.row.costDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="costItemName" label="消费项目"></el-table-column>
      <el-table-column prop="costPrice" label="消费金额"></el-table-column>
      <!--<el-table-column prop="remark" label="备注"></el-table-column>-->
      <!--<el-table-column fixed="right" label="操作" width="100">-->
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>&ndash;&gt;-->
          <!--<el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>-->
          <!--<el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
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
  import { BaseList, pageListByDate, delCostRecord } from './a-import';

  export default {
    name: "list",
    extends:BaseList,
    data(){
        return {

        }
    },
    methods:{
      handleCreated(){
        this.getList();
      },
      getList(){
        this.listLoading = true;
        pageListByDate(this.listQuery)
          .then(res=>{
            this.list = res.data.list;
            this.total = res.data.total;
            this.listLoading = false
          })
      },
      handleSizeChange(val){
        this.listQuery.rows = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getList();
      },
      handleDelete(row){
        let ids = [row.id];
        this.$confirm('确认要删除此记录吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          delCostRecord(ids).then(res=>{
            if(res.success){
              this.getList();
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              });
            }
          })
        })
      },
      handleUpdate(row){
        this.$emit('editRow',row);
      },
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
