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
          textMap: {
            update: '修改',
            create: '创建'
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
      }
    }
  }
</script>

<style scoped>

</style>
