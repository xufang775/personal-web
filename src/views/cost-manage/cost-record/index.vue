<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <!--<el-table-column label="消费项目编码">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.itemCode }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="消费项目名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.itemName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"/>-->
          <!--<span>{{ scope.row.display_time }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { getList } from '@/api/cost-item'
export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: null,
      listLoading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.list = response.data
          this.listLoading = false
        })
    }
  }
}
</script>
