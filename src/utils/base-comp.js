export const BaseList = {
  data(){
    return {
      list:[]
    }
  },
  methods: {
    loadList(){
      this.list = [
        {id:1, name:'xufang'},
        {id:2, name:'xufang2'},
      ];
    }
  }
};

export const BaseSearch = {
  data(){
    return {
      params: { name: '455'}
    }
  },
  methods:{
    search(){

    }
  }
}
