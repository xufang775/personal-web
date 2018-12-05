<template>

</template>

<script>
    export default {
      name: "base-search",
      data(){
        return {
          model:{},
          elementSize:'mini'
        }
      },
      created(){
        this.onCreated();
      },
      methods:{
        onCreated(){
        },
        onSubmit(){
          this.$emit('onSearch',this.model);
        },
        onRefresh(){
          this.model = {};
          this.$emit('onSearch',this.model);
        }
      }
    }
</script>

<style scoped>

</style>
