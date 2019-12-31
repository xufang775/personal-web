<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-item">
        <date-change :type="searchDateType" :currDate="currentDateStr" @dateChange="dateChange"></date-change>
      </div>
      <!--<div class="filter-item">-->
        <!--<el-radio-group id="searchDateType" v-model="searchDateType" @change="formChange">-->
          <!--<el-radio-button label="上海"></el-radio-button>-->
          <!--<el-radio-button label="北京"></el-radio-button>-->
          <!--<el-radio-button label="广州"></el-radio-button>-->
          <!--<el-radio-button label="深圳"></el-radio-button>-->
        <!--</el-radio-group>-->
      <!--</div>-->
    </div>
    <div>
       <record-table></record-table>
    </div>
  </div>
</template>

<script>
  import { DateChange, RecordTable }  from './components'
  import { mapState } from 'vuex'
    export default {
      name: "index-table",
      components:{
        'date-change': DateChange,
        'record-table': RecordTable
      },
      data(){
        return {
          currentDateStr:''
        }
      },
      computed:mapState({
        searchDateType: state => state.costRecord.searchDateType,
        currentDate: state => state.costRecord.currentDate,
      }),
      created(){
        // console.log(this.$store.user.userId);
        this.$store.commit('setSearchType','month');
        // this.$store.commit('setCurrentDate',this.$now.format());
        this.$store.commit('setCurrentDate',this.$dateHelper('2019-03-31'));
        this.currentDateStr = this.currentDate.format();
        // this.$store.commit('setSearchType','month');
        console.log(this.searchDateType)
        console.log(this.currentDate)

        // console.log(this.$now.format());
        // console.log(this.$now.format('year'));
        // console.log(this.$now.format('month'));
        // console.log(this.$now.format('date'));
        // console.log(this.$now.isToday);
        // let aa = this.$dateHelper('2019-12-30');
        // // console.log(aa.format())
        // // console.log(aa.first())
        // // console.log(aa.first().format(this.$format.date))
        // // console.log(aa.last().format(this.$format.date))
        // // console.log(aa.first(this.$datetype.year).format(this.$format.date))
        // // console.log(aa.last(this.$datetype.year).format(this.$format.date))
        // console.log(aa.first(this.$datetype.week).format(this.$format.date))
        // console.log(aa.last(this.$datetype.week).format(this.$format.date))
        //
        // console.log(this.$dateHelper('2019-12-01').day);
        // console.log(this.$dateHelper('2019-12-02').day);
        // console.log(this.$dateHelper('2019-12-03').day);
        // console.log(this.$dateHelper('2020-01-05').day);
        // let aa = this.$now;
        // // console.log(aa.addYear(1).addMonth(1).format())
        // console.log(aa.addDate(1).format());
        // console.log(aa.date)
        // console.log(aa.month)

        // console.log(this.$now.format());
        // console.log(this.$now.addYear(-5).format());
        // console.log(this.$now.addYear(2).format());
        // console.log(this.$now.addYear(2).format());

      },
      methods:{
        dateChange(v){
          this.currentDateStr = v;
          let currDate = this.$dateHelper(v);
          this.$store.dispatch('loadTableRows',{currDate});
          console.log(this.currentDate.format())
        },
        formChange(v){
          console.log(v)
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
