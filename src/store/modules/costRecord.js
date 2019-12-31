import apiCR from '@/api/cost-record-new'
import apiCTC from '@/api/cost-type-config'

const CostRecord = {
  state:{
    searchDateType:'',
    currentDate:'',
    costTypeList:[],
    costRecordList:[],
  },
  mutations:{
    setSearchType:(state, param)=>{
      state.searchDateType = param
    },
    setCurrentDate:(state, param)=>{
      state.currentDate = param
    },
    setCostTypeList:(state, param)=>{
      state.costTypeList = param
    },
    setCostRecordList:(state, param)=>{
      state.costRecordList = param
    },
  },
  actions:{
    async loadTableRows({ commit, state }, {currDate}={}){
      if(currDate){
        commit('setCurrentDate',currDate)
      }
      let params = {
        searchType:state.searchDateType,
        searchDate:state.currentDate.format(state.searchDateType)
      };
      let result = await apiCR.queryTable(params);
      if(result.code == '20000'){
        commit('setCostRecordList',result.data);
        // this.costRecordList = result.data;
      } else {
        commit('setCostRecordList',[]);
      }
    },
    async loadTableColumns({ commit, state }){
      let result =await apiCTC.queryTableColumns();
      if(result.code == '20000'){
        // this.costTypeList = result.data;
        commit('setCostTypeList',result.data);
      } else {
        commit('setCostTypeList',[]);
      }
    }
  }
};
export default CostRecord;
