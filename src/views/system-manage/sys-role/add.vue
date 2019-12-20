<template>
      <el-dialog title="添加角色" :visible.sync="show" :before-close="handleClose" @open="handleOpen" width="500px">
        <el-form ref="roleForm" :model="model" :rules="rules" :label-width="labelWidth">
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="model.roleCode" />
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="model.roleName" />
          </el-form-item>
          <el-form-item label="是否启用">
              <el-switch v-model="model.enabled"></el-switch>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="model.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button @click="resetForm('roleForm')">重 置</el-button>
          <el-button type="primary" @click="submitForm('roleForm')">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>
  import api from '@/api/sys-role';
    export default {
       props:['show','record'],
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
           },
           rules:{
             roleCode:[
               { required: true, message:'请输入角色编码', trigger: 'blur'},
               { min:4, message: '长度最小 4 个字符', trigger: 'blue'}
             ],
             roleName:[
               { required: true, message:'请输入角色编码', trigger: 'blur'},
             ],
             remark: [
               { max:100, message: '长度最大 100 个字符', trigger: 'blur'}
             ]
           }
         }
       },
       methods:{
         async submitForm(formName){
           console.log(this.model);
           this.$refs[formName].validate(valid =>{
              if(valid){
                  api.save(this.model).then(res=>{
                      if(res){
                        this.$message({
                          message: res.message,
                          type: 'success'
                        });
                        // this.$emit('hide',{flag:'form-hide-refresh'});
                        this.$parent.load();
                        this.handleClose();
                      }
                  });
              } else {
                  return false;
              }
           });
         },
         resetForm(formName = 'roleForm'){
           this.$refs[formName].resetFields();
         },

         handleOpen(){
           debugger;
           if(this.record){
             this.model.roleCode = this.record.roleCode;
             this.model.roleName = this.record.roleName;
             this.model.remark = this.record.remark;
             this.model.enabled = this.record.enabled;
           }
         },
         handleClose(){
           this.$emit('hide');
           this.resetForm();
         },
       }
    }
</script>

<style scoped>
  /*.el-input,.el-select{*/
    /*width: 300px;*/
  /*}*/
</style>
