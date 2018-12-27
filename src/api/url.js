export const isUserZuul=true;
export const zuulApi={
  login:'api-login',
  cost:'api-cost'
};

// const isUserZuulApi=true;
// const zuulApi={
//   login:'api-login',
//   cost:'api-cost'
// };
function haddleZuul() {
  if(isUserZuul){
    return zuulApi.login;
  } else {
    return '';
  }
}

export default {
  login:{
    login:haddleZuul()+'/login',
    info:haddleZuul()+'/user/info',
    logout:haddleZuul()+'/logout'
  },
  costItem:{
    dic:'costItem/dic',
    getPageList: '/costItem/getPageList',
    save: '/costItem/save',
    delete:'/costItem/delete'
  },
  costRecord:{
    getPageList: '/costRecord/pageListHasDic',
    pageListByDate:'/costRecord/getPageListByDate',
    getMonthRecordForTable:'/costRecord/getMonthRecordForTable',
    getListForMonth:'/costRecord/getListForMonth',
    getMonthCensus:'/costRecord/getMonthCensus',
    save: '/costRecord/save',
    saveList:'/costRecord/insertList',
    delete:'/costRecord/delete'
  }
}
