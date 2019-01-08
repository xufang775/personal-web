<template>
    <div class="app-container">
      <div class="buttons-container">
        <el-button class="filter-item" type="primary" @click="handleAdd">新增</el-button>
      </div>
      <div class="list-container">
        <el-transfer v-model="value1" :data="data"></el-transfer>
        <div>{{value1}}</div>
      </div>
    </div>
</template>

<script>
  import { ListQuery } from './a-import'
    export default {
      name: "b-sys-role",
      data() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        return {
          data: generateData(),
          value1: [1, 4]
        };
      },
      methods:{
        handleAdd(){

        },
        fetchData(){

        }
      }
    }
</script>

<style scoped>

</style>
