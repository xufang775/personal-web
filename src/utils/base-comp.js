import { codeHandle } from '@/utils/btn-code'

export const BaseList = {
  data(){
    return {
      list:[],
      pager:{
        pageIndex:0,
        pageSize:10,
        pageSizes:[10,15,20,30]
      },
      params: {
      },
      paramsDefault:{
      },
      total:0,
    }
  },
  created(){
    console.log('base loadList');
    this.loadList();
  },
  methods: {
    async loadList(){
      let params = {
        pageIndex: this.pager.pageIndex,
        pageSize: this.pager.pageSize,
        ...this.params
      };
      let { code, data } = await this.api.page(params);
      if(code === 20000){
        this.list = data.list;
        this.total = data.total;
      }
    },
    handleSizeChange(val){
      this.pager.pageSize = val;
      this.loadList();
    },
    handleCurrentChange(val){
      this.pager.pageIndex = val;
      this.loadList();
    },
    handle(event,data){
      let code = event.currentTarget.dataset.code;
      if(code){
        this['handle'+ codeHandle(code)](data);
      }
    },
    handleSearch(){
      this.loadList();
    },
    handleRefresh(){
      this.params = { ... this.paramsDefault };
      this.loadList();
    },
    handleAdd(){
      this.show = true;
    },
    handleDelete({$index,column,row}){
      console.log('delete')
      this.$alert();
      // console.log(data)
    },
    handleDeleteOne({$index,column,row}){
      let id = row.id;
      this.$deleteConfirm(id,()=>{
         this.api.delete({id:id}).then(res=>{
           if(res.code === this.$HttpCode.c20000){
             this.loadList();
             this.$message({
               message:'操作成功！',
               type:'success'
             });
           } else {
             this.$message.error('操作失败！');
           }
           // console.log(res)
         });
      });
    },
    handleEdit(data){
      console.log('edit')
      console.log(data)
    },
  }
};

export const BaseSearch = {
  data(){
    return {
      params: { name: '455'},
      api:{ search:'22222' },
    }
  },
  methods:{
    search(){

    }
  }
};

export const BaseDForm = {
  props: {
    show:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      labelWidth: '120px',
      model:{},
      rules:[]
    }
  },
  methods:{
    showForm(){
    },
    hideForm(){
      this.$emit('onHide');
    },
    submitForm(){

    }
  }
};

export const BaseForm = {
  data(){
    return {
      show: false,
      labelWidth: '180px',
      model: {},
      formName:'',
      api:{}
    }
  },
  methods:{
    showForm(){
      this.show = true;
    },
    hideForm(){
      this.show = false;
    },
    resetForm(formName = 'form'){
      this.$refs[this.formName].resetFields();
    },
    async submitForm(formName){
      console.log(this.$refs[formName]);
      let valid = await this.$refs[formName].validate();
      if(valid){
        let postFn = this.model.id ? this.api.update : this.api.insert;
        let result =await postFn(this.model);
        if(result.code === this.$HttpCode.c20000){
          this.resetForm();
          this.hideForm();
          this.loadList();
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
        } else {
          this.$message.error('操作失败！');
        }
      }
      console.log(this.model)
    }
  }
};
