<template>
  <div>
    <el-table :data="list" border style="width:100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ (listQuery.page-1)*listQuery.rows + scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="costDate" label="消费日期" width="180">
        <template slot-scope="scope">
          {{scope.row.costDate | dateString('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column prop="costItemName" label="消费项目" width="180"></el-table-column>
      <el-table-column prop="costPrice" label="消费金额" width="180"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
  import BaseList from '@/components/base/base-list'
  import { pageList,del } from '@/api/cost-record'

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
        pageList(this.listQuery)
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
          del(ids).then(res=>{
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
      }
    }
  }
</script>

<style scoped>

</style>
