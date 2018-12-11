<template>
  <el-dialog :visible.sync="pDialog.visible" :title="dialog.title" :before-close="handleClose" @open="handleOpen">
    eeeee
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" >取消</el-button>
      <el-button type="primary" @click="handleSave" >确认</el-button>
      <!--<el-button v-else type="primary" @click="updateData" size="mini">确认</el-button>-->
    </div>
  </el-dialog>
</template>

<script>
  import {Dialog} from '@/utils/tools'
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
          dialog:{}
        }
      },
      watch:{
        pDialog(val){
          this.dialog = this.pDialog;
        }
      },
      methods:{
        handleSave(){
          this.dialog.result = {bb:'3333'};
          this.$emit('save',this.dialog.result);
        },
        handleClose(){
          this.visible = false;
          this.$emit('close',this.visible);
        },
        handleOpen(){
          this.dialog = this.pDialog;
        }
      }
    }
</script>

<style scoped>

</style>
