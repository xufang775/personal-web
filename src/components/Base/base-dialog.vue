<template>

</template>

<script>
  export default {
    name: "base-dialog",
    props:['pVisible','pStatus'],
    data(){
        return {
          title:'',
          visible:this.pVisible,
          status:this.pStatus,
          titleMap: {
            'edit': '编辑',
            'add': '新增',
            'add-more':'新增-批量'
          },
          model:{},
          rules:{},
        }
    },
    created(){
      this.handleCreated();
    },
    methods:{
      handleCreated(){
        console.log('I am created,base');
      },
      close(){ // 弹框关闭前事件
        this.visible = false;
        this.$emit('visibleChange',this.visible);
      },
      open(){   // 弹框打开事件

      },
      addData(){},
      editData(){}
    }
  }
</script>

<style scoped>

</style>
