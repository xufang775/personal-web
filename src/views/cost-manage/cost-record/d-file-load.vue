<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :before-close="close" @open="open">

  </el-dialog>
</template>

<script>
  import { BaseDialog } from './a-import';
    export default {
        name: "d-file-load",
        extends:BaseDialog
    }
</script>

<style scoped>

</style>
