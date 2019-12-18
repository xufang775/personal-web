<template>
    <div class="app-container">
      <div class="filter-container">
          <div class="filter-item">
            <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
          </div>
          <div style="float:right;">
              <div class="filter-item">
                <el-input v-model="params.roleName" placeholder="角色名称" />
              </div>
              <div class="filter-item">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              </div>
              <div class="filter-item">
                <el-button type="primary" icon="el-icon-refresh">重置</el-button>
              </div>
          </div>
        </div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="roleCode" label="编码" width="180"/>
        <el-table-column prop="roleName" label="角色名称" width="180"/>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column prop="remark" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button type="primary" icon="el-icon-delete">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <dialog-add :show="dialogAddShow" @hide="dialogHide"></dialog-add>
    </div>
</template>

<script>
    import api from '@/api/sys-role';
    import Add from './add';
    export default {
        components:{
          'dialog-add':Add
        },
        data(){
          return {
            params:{
              roleName:''
            },
            list:[],
            dialogAddShow:false,

          }
        },
     async created(){
          this.load();
      },
      methods:{
          async load(){
            let pdata = {...this.params};
            const { code,data } = await api.page(pdata);
            if(code === 20000){
              this.list = data.list;
            }
          },
          add(){
            this.dialogAddShow = true;
          },
          search(){
            this.load()
          },
          dialogHide(){
            this.dialogAddShow = false;
          }
      }
    }
</script>

<style scoped>

</style>
