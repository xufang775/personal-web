<template>
  <div>
    <!--1111-->
    <!--<my-table></my-table>-->
    <!--<br/>-->
    <!--<my-row></my-row>-->
    <!--<br/>-->
    <!--<my-td></my-td>-->
    <!--<month-cost-record-new></month-cost-record-new>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MyTable } from '@/components/Table'
import MyRow  from '@/components/Table/MyRow'
import MyTd from "@/components/Table/MyTd";
import MonthCostRecordNew from "./month-cost-record-new";
// import aa from '@/components/Table/MyTd'
// import MyTd from "../../components/Table/MyTd";
export default {
  name: 'Dashboard',
  components:{
    MyTd,
    MyTable,
    MyRow,
    MonthCostRecordNew
    //monthCostRecordNew
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
