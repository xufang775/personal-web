<template>
  <!--<bae-dialog-new :pDialog="pDialog">-->

  <!--</bae-dialog-new>-->

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
  import { BaseDialogNew } from './a-import'
    export default {
      name: "d-cost-item",
      extends: BaseDialogNew ,
    }
</script>

<style scoped>

</style>
