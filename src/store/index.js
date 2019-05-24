import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import moduleA from './modules/moduleA'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 1,
    name: '小明',
    todos: [
      {id: 1, text: '今天', done: true},
      {id: 1, text: '天气', done: false}
    ]
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    },
    increment2 (state, n) {
      state.count += n
    },
    increment3 (state, payload) {
      state.count += payload.amount
    },
    gotData () {},
    gotOtherData () {}
  },
  actions: {
    increment4 (context) {
      context.commit('increment')
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      })
    },
    actionB ({ dispatch, commit }) {
      return dispatch('actionA').then(() => {
        commit('someOtherMutation')
      })
    },
    async actionC ({ commit }) {
      // commit('gotData', await getData())
    },
    async actionD ({ dispatch, commit }) {
      // await dispatch('actionC') // 等待 actionC 完成
      // commit()
    }
  },
  modules: {
    moduleA,
    app,
    user
  },
  getters
});
export default store
