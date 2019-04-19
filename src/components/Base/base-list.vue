<template>
    <div>
      333333
    </div>
</template>

<script>
  import { ListQuery } from '@/utils/tools'
  import { reqPost } from '@/api/common'
  export default {
    name: "base-list",
    data(){
      return {
        title:'我是BaseList的标题',
        list:[],
        listLoading:false,
        listQuery:new ListQuery({}),
        total:null,
        api:{
          pageList:'',
          delete:''
        }
      }
    },
    created(){
      this.handleCreated();
    },
    methods:{
      handleCreated(){
        // console.log('I am created,base');
        this.fetchData();
      },
      fetchData(){
        debugger;
        this.listLoading = true;
        reqPost(this.api.pageList,this.listQuery)
          .then(res=>{
            if(res.success){
              this.list = res.data.list;
              this.total = res.data.total;
            }
            this.listLoading = false
          })
      },
      handleSizeChange(val){
        this.listQuery.rows = val;
        this.fetchData();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.fetchData();
      },
      handleUpdate(row){
        this.$emit('editRow',row);
      },
      handleDelete(row){
        let ids = [row.id];
        this.$confirm('确认要删除此记录吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          reqPost(this.api.delete,ids).then(res=>{
            if(res.success){
              this.fetchData();
              this.msgDelSuccess();
            }
          })
        })
      },
      msgDelSuccess(){
        this.$notify({
          title: '成功',
          message: '删除成功！',
          type: 'success'
        });
      }
    }
  }
</script>

<style scoped>

</style>
