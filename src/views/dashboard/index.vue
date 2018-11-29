<template>
  <div>
    1111
    <my-table></my-table>
    <br/>
    <my-row></my-row>
    <br/>
    <my-td></my-td>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MyTable } from '../../components/Table'
import MyRow  from '../../components/Table/MyRow'
import MyTd from "../../components/Table/MyTd";
// import aa from '@/components/Table/MyTd'
// import MyTd from "../../components/Table/MyTd";
export default {
  name: 'Dashboard',
  components:{
    MyTd,
    MyTable,
    MyRow,
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
