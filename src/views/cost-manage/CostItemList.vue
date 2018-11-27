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
    </el-table>
  </div>
</template>

<script>
import {getList} from '@/api/cost-item'
export default {
  name: 'cost-item-list',
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
        .then((res) => {
          this.list = res.data
          this.listLoading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
