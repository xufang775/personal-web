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
