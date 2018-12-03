<template>
  <el-form :size="elementSize" :inline="true" :model="model" class="demo-form-inline">
    <!--<el-form-item label="消费时间">-->
      <!--<el-date-picker-->
        <!--v-model="model.costDate"-->
        <!--type="daterange"-->
        <!--align="right"-->
        <!--unlink-panels-->
        <!--range-separator="至"-->
        <!--start-placeholder="开始日期"-->
        <!--end-placeholder="结束日期"-->
        <!--:picker-options="pickerOptions2">-->
      <!--</el-date-picker>-->
    <!--</el-form-item>-->
    <el-form-item label="消费时间" required>
      <el-col :span="11">
        <el-form-item prop="costPriceStart">
          <el-date-picker type="date" placeholder="选择日期" v-model="model.costDateStart" style="width: 140px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="11">
        <el-form-item prop="costPriceEnd">
          <el-date-picker type="date" placeholder="选择日期" v-model="model.costDateEnd" style="width: 150px;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="消费金额" required>
      <el-col :span="11">
        <el-form-item prop="costPriceStart">
          <el-input v-model.number="model.costPriceStart"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="11">
        <el-form-item prop="costPriceEnd">
          <el-input v-model.number="model.costPriceEnd"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="消费项目">
      <el-select v-model="model.costItemId" placeholder="消费项目">
        <el-option v-for="item in dics.costItemId" :key="item.key" :label="item.value" :value="item.key"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="model.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="onRefresh">刷新</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import { dicCostItem  } from './url'
  import { BaseSearch } from '@/components/base'
    export default {
      name: "search",
      extends: BaseSearch,
      data(){
        return {
          model: {
            costDateStart: '',
            costDateEnd: '',
            costPriceStart:undefined,
            costPriceEnd:undefined,
            costItemId:'',
            remark:''
          },
          dics:{
            costItemId:[]
          },
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
        }
      },
      methods: {
        onCreated(){
          dicCostItem().then(res=>{
            this.dics.costItemId = res.data;
          })
        }
      }
    }
</script>

<style scoped>
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{ margin-bottom: 5px; }
</style>
