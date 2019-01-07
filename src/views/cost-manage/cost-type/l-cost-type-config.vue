<template>
  <div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ (listQuery.page-1)*listQuery.rows + scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="configName" label="名称" width="120" align="left"></el-table-column>
      <!--<el-table-column prop="enabled" label="激活" width="90">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.enabled?'是':'否' }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="sortNo" label="排序" width="100"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
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
  import { api,BaseList } from '../a-import'
  export default {
    name: "l-cost-type-config",
    extends:BaseList,
    data(){
      return {
        api:{
          pageList:api.costTypeConfig.getPageList,
          delete:api.costTypeConfig.delete,
        }
      }
    },
  }
</script>

