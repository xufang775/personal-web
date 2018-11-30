<template>
    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-add" size="mini" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="list" style="width:100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      {{supTile}}
    </div>
</template>

<script>
  import BaseList from '@/components/base/BaseList'
  import { getPageList } from '@/api/cost-record'
  import { ListQuery } from '@/utils/tools'
  export default {
    extends:BaseList,
    // name: "cost-record-list",
    data(){
        return {
          title:'我是子组件的标题',
        }
    },
    computed:{
      supTile:function () {
        return this.$parent.title;
      }
    },
    methods:{
      handleCreated(){
        this.listLoading = true;
        getPageList(this.listQuery)
          .then(res=>{
            this.list = res.data.list;
            this.total = res.data.total;
            this.listLoading = false
          });

        // this.list = [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // },{
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }]
      },
      handleAdd(){

      }
    }
  }
</script>

<style scoped>

</style>
