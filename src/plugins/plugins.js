import Alert from './alert'
import Constant from './constant'
import Fn from './common-fn'
import DateHelper from './date-helper'

export default {
  install(Vue,options){
    Vue.$myName="xufang";

    // 1. 全局组件
    Vue.component('test',{
      template:`<div>我是测试组件</div>`
    });
    // 2. 全局方法或属性
    Vue.myGlobalMethod = function () {
      console.log('测试全局方法或属性')
    }

    // 3. mixin混入
    Vue.mixin({
      created: function () {
        // console.log('全局 success')
      },
      methods:{
        sayHello(){
          console.log('测试数据')
        }
      }
    });

    // 5. 添加实例方法
    Vue.prototype.$myMethod = function () {
      console.log('实例方法')
    }

    Vue.prototype.$toUpperCase = function (str) {
      return str.replace(str[0],str[0].toUpperCase());
    }

    Vue.use(Alert);
    Vue.use(Constant);
    Vue.use(Fn);
    Vue.use(DateHelper);

  }
}
