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

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

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
