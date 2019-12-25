<template>
    <el-dialog :visible.sync="pShow">
      <span>3333</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="hideForm">取 消</el-button>
      </div>
    </el-dialog>
</template>

<script>
  import { BaseForm } from '@/utils/base-comp';
  export default {
    extends: BaseForm,
    name:'cost-record-detail',
    data(){
      return {
        isUsePShow:true
      }
    }
  }
</script>

<style scoped>

</style>
