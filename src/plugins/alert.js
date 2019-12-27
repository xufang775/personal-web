export default {
  install(Vue,options){

    Vue.prototype.$$alert = function () {
      console.log('测试alert')
    };

    // 弹出确定框
    Vue.prototype.$deleteConfirm = function (id,cb) {
      let deleteMsg = '确认要删除此记录吗？';
      let btnObj = {
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      };
      this.$confirm(deleteMsg,'提示',btnObj)
        .then(()=>{
          cb(id);
        })
        .catch(()=>{
          this.$message({
            type:'info',
            message:'操作取消'
          })
        });
    }


  }
}
