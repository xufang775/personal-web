<template>
  <el-dialog :title="textMap[status]" :visible.sync="pVisible" :before-close="hide">
    <el-form :rules="rules" ref="dataForm" :model="model" label-position="right" label-width="100px" style="width:400px; margin-left: 50px;">
      <!--<el-form-item label="项目名称" label-width="" prop="itemName">-->
        <!--<el-input v-model="temp.itemName"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="备注" prop="remark">-->
        <!--<el-input type="textarea" :autosize="{ minRows:2,maxRows:4 }" v-model="temp.remark"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="" prop="type">-->
        <!--<el-checkbox v-model="temp.enabled">激活</el-checkbox>-->
      <!--</el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取消</el-button>
      <el-button v-if="status=='create'" type="primary" @click="createData">确认</el-button>
      <el-button v-else type="primary" @click="updateData">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import BaseDialog from '@/components/base/base-dialog'
    export default {
      name: "d-add-edit",
      extends: BaseDialog,
      props:['pVisible','pStatus'],
      data(){
        return {
          visible:this.pVisible,
          status:this.pStatus,
        }
      },
      methods:{
        createData(){

        },
        updateData(){

        },
        hide(){
          this.visible = false;
          this.$emit('visibleChange',this.visible);
        }
      }
    }
</script>

<style scoped>

</style>
