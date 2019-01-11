<template>
  <el-dialog :visible.sync="pDialog.visible" :title="title" :before-close="handleClose" @open="handleOpen">
    <el-form :rules="rules" ref="form" :model="model" label-position="right" label-width="120px" style="width:400px; ">
      <el-form-item label="消费日期" label-width="" prop="costDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="model.costDate" :disabled="elementDisabled.costDate[status]"></el-date-picker>
      </el-form-item>
      <el-form-item label="消费项目" prop="costTypeCode">
          <el-cascader
            expand-trigger="hover"
            :options="dics.costTypeCode"
            :change-on-select="true"
            v-model="model.costTypeCodeArr">
          </el-cascader>
      </el-form-item>
      <el-form-item label="消费金额" prop="costPrice">
        <el-input v-model.number="model.costPrice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :autosize="{ minRows:4,maxRows:5 }" v-model="model.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" >取消</el-button>
      <el-button type="primary" @click="handleSave" >确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { api,reqGet,reqPost, BaseDialogNew } from './a-import'
  import {  CostRecord } from './a-import';
    export default {
      name: "d-cost-record",
      extends:BaseDialogNew,
      data(){
        return {
          api:{ save:api.costRecord.save,getCascader:api.costType.getCascader },
          dics:{
            costTypeCode:[]
          },
          rules:{
            costItemId:[{ required: true, message: '消费项目不能为空'}],
            costDate:[{ required: true, message: '消费日期不能为空'}],
            costPrice:[
              { required: true, message: '消费金额不能为空'},
              { type: 'number', message: '消费金额必须为数字值'}
            ]
          },
          elementDisabled:{
            costDate:{
              'add':false,
              'add-month':true
            },
            costItemId:{
              'add':false,
              'add-month':true
            }
          },
        }
      },
      methods:{
        handleOpen(){
          reqPost(this.api.getCascader)
            .then(res=>{
              if(res.success){
                this.dics.costTypeCode=res.data;
              }
            });
        }
      }
    }
</script>

<style scoped>

</style>
