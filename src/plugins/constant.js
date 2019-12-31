export const DateType = {
  date:'date',
  time:'time',
  week:'week',
  weekFirst:'weekFirst',
  weekLast:'weekLast',
  month:'month',
  monthFirst:'monthFirst',
  monthLast:'monthLast',
  year:'year',
  yearFirst:'yearFirst',
  yearLast:'yearLast',
};

// 定义常量
export default {
  install(Vue,options){

    Vue.prototype.$HttpCode = {
      c20000: 20000,
      c50000: 50014,
      c50008: 50008,
      c50012: 50012,
      c50014: 50014
    };

    Vue.prototype.$datetype = DateType;

  }
}
