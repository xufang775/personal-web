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
        <el-table-column type="index" width="50" />
        <el-table-column prop="roleCode" label="编码" width="180"/>
        <el-table-column prop="roleName" label="角色名称" width="180"/>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column prop="remark" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click.native.prevent="editRow(scope)">编辑</el-button>
              <el-button type="text" @click.native.prevent="deleteRow(scope)">删除</el-button>
              <el-button type="text" >设置权限</el-button>
            </template>
        </el-table-column>
      </el-table>
      <dialog-add :show="dialogAddShow" :record="editModel" @hide="dialogHide"></dialog-add>
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
            editModel:null,
          }
        },
     async created(){
          this.load();
      },
      methods:{
          async load(){
            let pdata = {...this.params};
            const { code,data } = await api.all(pdata);
            if(code === 20000){
              this.list = data.list;
            }
          },
          add(){
            this.dialogAddShow = true;
          },
          editRow(scope){
            let index = scope.$index;
            let row = scope.row;
            this.editModel = row;
            this.dialogAddShow = true;
            // console.log(row);
          },
          async deleteRow(scope){
              let index = scope.$index;
              let row = scope.row;
              await this.$confirm('您确定要删除此记录吗？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
              });
              let res = await api.delete({ id : row.id});
              if(res){
                this.load();
                this.$message({
                  type:'success',
                  message:'删除成功！'
                });
                // this.list.splice(index,1)
              }
          },
          search(){
            this.load()
          },
          dialogHide(flag){
            this.dialogAddShow = false;
          }
      }
    }
</script>

<style scoped>

</style>
