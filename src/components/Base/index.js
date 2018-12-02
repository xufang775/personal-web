import Vue from 'vue'
import { ListQuery } from '@/utils/tools'
var BaseList = Vue.component('base-list',{
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
      console.log('I am created,base');
    }
  },
  template:'<div>{{title}}</div>'
});
