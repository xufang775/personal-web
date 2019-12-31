<template>
    <div class="datetime-container">
      <div class="filter-item">
        <el-button type="primary"
                   icon="el-icon-arrow-left"
                   @click="handle(-1)">
          {{typeData[type].btnText.up}}
        </el-button>
      </div>
      <div class="filter-item">
        <el-date-picker v-if="type=='month'"
                        type="month"
                        format="yyyy年MM月"
                        v-model="currDateStr"
                        class="inputWidth"
                        align="center">
        </el-date-picker>
        <el-date-picker v-if="type=='year'"
                        type="year" format="yyyy年"
                        v-model="currDateStr"
                        class="inputWidth"
                        align="center">
        </el-date-picker>
      </div>
      <div class="filter-item">
        <el-button type="primary" @click="handle(1)">
          {{typeData[type].btnText.down}}
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
      name: "date-change",
      props:['type','currDate'],
      data(){
          return {
            typeFlag:'',
            typeData:{
              'date':{ format:'',placeholder:'',btnText:{ up:'',down:''}},
              'month':{ format:'yyyy年MM月',placeholder:'月份',btnText:{ up:'上月',down:'下月'}},
              'year':{ format:'yyyy年',placeholder:'年份',btnText:{ up:'上年',down:'下年'}},
            },
          }
      },
      computed:{
        currDateStr:{
          get: function() {
            return this.currDate;
          },
          set: function (newValue) {
            let ret = this.$dateHelper(newValue).format(this.type);
            this.$emit('dateChange',ret);
          }
        }
      },
      methods:{
        handle(m){
          let newDate = this.$dateHelper(this.currDateStr)
            .first(this.$datetype[this.type])
            .add(m,this.type);
          let ret = newDate.format(this.type);
          this.$emit('dateChange',ret);
        }
      }
    }
</script>

<style lang="scss" scoped>
  .datetime-container{
    display: inline-block;
    span{ display: inline-block;margin: 3px; cursor: pointer; color: blue; }
    span:hover{ text-decoration: underline; }
    .inputWidth{ width: 150px; font-size: 16px; }
  }
</style>
