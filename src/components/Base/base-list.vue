<template>
    <div>
      333333
    </div>
</template>

<script>
  import { ListQuery } from '@/utils/tools'
  export default {
    name: "base-list",
    data(){
      return {
        title:'我是BaseList的标题',
        list:[],
        listLoading:false,
        listQuery:new ListQuery({}),
        total:null
      }
    },
    created(){
      this.handleCreated();
    },
    methods:{
      handleCreated(){
        // console.log('I am created,base');
      }
    }
  }
</script>

<style scoped>

</style>
