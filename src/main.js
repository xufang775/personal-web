// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang il8n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import * as Tools from './utils/tools'

import i18n from './lang' // Internationalization
import '@/icons' // icon
import '@/permission' // permission control
import base from '@/components/base/base'
import moment from "moment";


Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.BASE = base;


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
