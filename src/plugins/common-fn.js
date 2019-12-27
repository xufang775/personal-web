export default {
  install(Vue,options){


    Vue.prototype.convartIntToBoolean=function (value) {
      return value == '1' ? true : false;
    }

  }
}
