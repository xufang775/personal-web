<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    name: function () {
      return this.$store.state.name
    }
  }
}
</script>
<style>
  .float-r{ float: right;}
  .font-b{font-weight: bold;}
  .red{color: red;}
  .margin-l10{margin-left: 10px;}
</style>
