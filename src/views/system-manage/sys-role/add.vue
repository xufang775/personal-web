<template>
      <el-dialog title="添加角色" :visible.sync="show">
        <el-form ref="form" :model="model" :label-width="labelWidth">
          <el-form-item label="角色编码">
            <el-input v-model="model.roleCode" />
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="model.roleName" />
          </el-form-item>
          <el-form-item label="是否启用">
              <el-switch v-model="model.enabled"></el-switch>
          </el-form-item>
          <el-form-item label="备注">
              <el-input type="textarea" v-model="model.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hide">取 消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>
  import api from '@/api/sys-role';
    export default {
       props:['show'],
       data(){
         return {
           labelWidth: '120px',
           model:{
             roleCode:'',
             roleName:'',
             enabled:true,
             deleteFlag:false,
             remark:'',
             sortNo:null
           }
         }
       },
       methods:{
         hide(){
           this.$emit('hide');
         },
        async submit(){
          this.$emit('hide');
        }
       }
    }
</script>

<style scoped>
  /*.el-input,.el-select{*/
    /*width: 300px;*/
  /*}*/
</style>
