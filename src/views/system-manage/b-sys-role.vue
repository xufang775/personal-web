<template>
    <div class="app-container">
      <div class="buttons-container">
        <el-button class="filter-item" type="primary" @click="handleAdd">新增</el-button>
      </div>
      <div class="list-container">
        <!--<el-table :data="listData">-->
          <!--<el-table-column align="center" label="ID" width="95">-->
            <!--<template slot-scope="scope">-->
              <!--{{ (listQuery.page-1)*listQuery.rows + scope.$index+1 }}-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="roleCode" label="角色编码"></el-table-column>-->
          <!--<el-table-column prop="roleName" label="角色名称"></el-table-column>-->
        <!--</el-table>-->
      </div>
    </div>
</template>

<script>
  import { ListQuery } from './a-import'
    export default {
      name: "b-sys-role",
      data(){
          return {
            listData:[],
            listQuery:new ListQuery({}),
          }
      },
      methods:{
        handleAdd(){

        },
        fetchData(){

        }
      }
    }
</script>

<style scoped>

</style>
