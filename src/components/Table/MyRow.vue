<template>
    <tr v-for="(row,irow) in rows">
      <!--<template v-for="(col,icol) in cols">-->
        <!--<th v-if="col.isTH"></th>-->
        <!--<td v-if="!col.isTH"></td>-->
      <!--</template>-->
    </tr>
</template>

<script>
export default {
  name: "my-row",
  data(){
    return{
      cols:[],
      rows:[],
    }
  }
}
</script>

<style scoped>

</style>
