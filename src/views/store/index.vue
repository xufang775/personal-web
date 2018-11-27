<template>
  <div class="root">
    <div>
    <h2>{{ myName }}</h2>
    <p>姓名：{{ name }}</p>
    </div>
    <div>
      <p>count: {{ count }}</p>
      <p>count: {{ countAlias }}</p>
      <p>{{ countPlusLocalState }}</p>
    </div>
    <div>
      <dl>
        <dt>id</dt>
        <dd>{{ todos }}</dd>
        <dd>{{ todo }}</dd>
      </dl>
    </div>
    <div>
      <p>{{ moduleName }}</p>
      <!--<p>{{ aa }}</p>-->
    </div>
    <div>
      <button @click="increment">count++</button>&nbsp;&nbsp;
      <button @click="increment2">count++</button>&nbsp;&nbsp;
      <button @click="increment3">count++</button>&nbsp;&nbsp;
      <button @click="increment4">count4++</button>&nbsp;&nbsp;
      <button @click="incrementAsync">count5++</button>&nbsp;&nbsp;
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'store-index',
  data: function () {
    return {
      name: '许芳',
      localCount: 3
    }
  },
  computed: {
    myName () {
      return this.$store.state.name
    },
    todos () {
      return this.$store.state.todos
    },
    todo () {
      return this.$store.getters.doneTodos
    },
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,
      moduleName: state => state.moduleA.moduleName,
      // 传字符器参数‘count’等同于 ‘state => state.count’
      countAlias: 'count',
      // 为了能够使用‘this’获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    ...mapGetters([
      // 'aa'
    ])
  },
  methods: {
    ...mapMutations([
      'increment', // 将 ‘this.increment()’ 映射为‘this.$store.commit('increment')’
      // 'mapMutations' 也支持载荷
      'increment2'
    ]),
    ...mapMutations({
      add: 'increment'
    }),
    incrementAsync () {
      this.$store.dispatch('incrementAsync')
    },
    increment () {
      this.$store.commit('increment')
    },
    increment2 () {
      this.$store.commit('increment2', 10)
    },
    increment3 () {
      // this.$store.commit('increment3', {
      //   amount: 10
      // })
      this.$store.commit({
        type: 'increment3',
        amount: 10
      })
    },
    increment4 () {
      this.$store.dispatch('increment4')
    }
  }
}
</script>

<style scoped>
div.root>div{ padding: 10px; margin: 10px; }
</style>
