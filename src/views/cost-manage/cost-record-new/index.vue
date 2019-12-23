<template>
    <div class="app-container">
        <el-table :data="list">
          <el-table-column label="id" prop="id" />
          <el-table-column label="名称" prop="name" />
        </el-table>
    </div>
</template>

<script>

    const extend = {
      data(){
        return {
          name: 'extend name'
        }
      }
    };
    const mixin1 = {
      data(){
        return {
          name: 'mixin1 name'
        }
      }
    }
    import { BaseList,BaseSearch } from '@/utils/base-comp';
    export default {
      mixins: [ BaseList,BaseSearch ],
      // extends: extend,
      data(){
        return {
          // name: 'name'
        }
      },
      created(){
        this.loadList();
        console.log(this.list);
        console.log(this.params)
          
      }
    }
</script>

<style scoped>

</style>
