const moduleA = {
  state: { count: 0, moduleName: 'moduleA' },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    },
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    },
    aa (state) {
      return '1111'
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
export default moduleA
