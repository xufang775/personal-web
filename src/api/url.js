export const isUserZuul=true;
export const zuulApi={
  login:'api-login',
  cost:'api-cost',
  money:'api-money'
};

// const isUserZuulApi=true;
// const zuulApi={
//   login:'api-login',
//   cost:'api-cost'
// };
function haddleZuul(moduleName) {
  let res='';
  if(isUserZuul){
    res = zuulApi[moduleName];

    // switch (moduleName){
    //   case 'login':
    //     res = zuulApi.login;
    //     break;
    //   case 'cost':
    //     res = zuulApi.cost;
    //     break;
    // }
  }
  return res;
}
export class Zuul{
  constructor(isUseZuul=true,zuulFlag=''){
    this.isUseZuul=isUseZuul;
    this.zuulFlag=zuulFlag;
    this.zuulData={
      login:'login',
      cost:'cost',
      system:'system'
    };
  }
  static api(modelName){
    return this.zuulData[modelName];
  }
}

export default {
  login:{
    login:haddleZuul('login')+'/login',
    info:haddleZuul('login')+'/user/info',
    logout:haddleZuul('login')+'/logout'
  },
  costItem:{
    dic:haddleZuul('money')+'/costItem/dic',
    getPageList:haddleZuul('money')+ '/costItem/getPageList',
    save:haddleZuul('money')+ '/costItem/save',
    delete:haddleZuul('money')+'/costItem/delete'
  },
  costRecord:{
    getPageList:haddleZuul('money') + '/costRecord/pageListHasDic',
    pageListByDate:haddleZuul('money') + '/costRecord/getPageListByDate',
    getMonthRecordForTable:haddleZuul('money') + '/costRecord/getMonthRecordForTable',
    getListForMonth:haddleZuul('money') + '/costRecord/getListForMonth',
    getMonthCensus:haddleZuul('money') + '/costRecord/getMonthCensus',
    save:haddleZuul('money') + '/costRecord/save',
    saveList:haddleZuul('money') + '/costRecord/insertList',
    delete:haddleZuul('money') + '/costRecord/delete'
  }
}
