<template>
  <div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ (listQuery.page-1)*listQuery.rows + scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="消费项目名称" width="110" align="center"></el-table-column>
      <el-table-column prop="enabled" label="激活" width="90">
        <template slot-scope="scope">
          <!--{{ scope.row.type==1?'通常消费':'固定消费' }}-->
          <span v-if="scope.row.type==1">通常消费</span>
          <span v-if="scope.row.type==2">固定消费</span>
        </template>
      </el-table-column>
      <el-table-column prop="enabled" label="激活" width="90">
        <template slot-scope="scope">
          {{ scope.row.enabled?'是':'否' }}
        </template>
      </el-table-column>
      <el-table-column prop="sortNo" label="排序" width="100"></el-table-column>
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
  import { api,BaseList } from '../a-import'
  export default {
    name: "l-cost-item",
    extends:BaseList,
    data(){
      return {
        api:{
          pageList:api.costItem.getPageList,
          delete:api.costItem.delete,
        }
      }
    },
  }
</script>

