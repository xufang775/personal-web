<template>
  <el-dialog :visible.sync="pDialog.visible" :title="title" :before-close="handleClose" @open="handleOpen">
    eeeee
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" >取消</el-button>
      <el-button type="primary" @click="handleSave" >确认</el-button>
    </div>
  </el-dialog>
  <!--<el-dialog :visible.sync="pDialog.visible" :title="dialog.title" :before-close="handleClose" @open="handleOpen">-->
    <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button @click="handleClose" >取消</el-button>-->
      <!--<el-button type="primary" @click="handleSave" >确认</el-button>-->
    <!--</div>-->
  <!--</el-dialog>-->
</template>

<script>
  import { Dialog } from '@/utils/tools'
  import { reqPost } from '@/api/common'
    export default {
      name: "bae-dialog-new",
      props:{
        pDialog:{
          type: Dialog,
          required:true,
          default:{}
        }
      },
      data(){
        return {
          api:{
            save:''
          },
          dics:{},
          ...this.pDialog
        }
      },
      watch: {
        pDialog: {
          handler: function (val, oldVal) {
            Object.assign(this.$data,val)
          },
          deep: true
        },
      },
      methods:{
        handleSave(){
          let self = this;
          this.$refs.form.validate((valid)=>{
            if(valid){
              reqPost(this.api.save, self.model)
                .then(res=>{
                  if(res.success){
                    let result = {success: true,data:self.model};
                    this.$emit('saveSuccess',result);
                    this.$refs.form.resetFields();
                    this.msgSuccess();
                  }
                })
            }
          });
        },
        handleClose(){
          this.visible = false;
          this.$emit('close',this.visible);
        },
        handleOpen(){
          // this.dialog = this.pDialog;
        },
        msgSuccess(){
          this.$notify({
            title:'成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      }
    }
</script>

<style scoped>

</style>
