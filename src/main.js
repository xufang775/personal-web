// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI,{ Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import * as Tools from './utils/tools'
import MyPlugin from './plugins/plugins'
Vue.use(MyPlugin)

import i18n from './lang' // Internationalization
import '@/icons' // icon
import '@/permission' // permission control
import base from '@/components/base/base'
import moment from "moment";
import '@/components/global'


// Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

import * as filters from './filters' // global filters

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size:medium,mini
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.BASE = base;
Vue.prototype.$msg = Message;

Vue.prototype.BaseList = {
  data(){
    name:'123123'
  }
};

Vue.component('aa',{
  template:`<div>123123</div>`
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: function () {
    return {
      myname: '222'
    }
  },
  computed: {
    name: function () {
      return store.state.name
    }
  },
  router,
  store,
  // template: '<div>{{ name }}</div>'
  render: h => h(App)
})
