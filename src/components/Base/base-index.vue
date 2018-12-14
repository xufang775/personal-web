<template>

</template>

<script>
  import { Dialog } from '@/utils/tools';
  export default {
    name: "base-index",
    data(){
        return {
          dAddEdit:{
            ref:'dAddEdit',
            title:'新增',
            width:'',
            model:{},
            dialog:new Dialog({ref:'dAddEdit'})
          },
        }
    },
    methods:{
      handleAdd(){
        this.dAddEdit.dialog.open({
          title:this.dAddEdit.title,
          status:'add',
          width:this.dAddEdit.width,
          model: this.dAddEdit.model,
          yes:(res)=>{
            this.$refs.list.getList();
            this.dAddEdit.dialog.close()
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
