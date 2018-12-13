<template>
  <el-dialog :visible.sync="pDialog.visible" :title="title" :before-close="handleClose" @open="handleOpen" @keyup="handleKeyup">
    <el-form :rules="rules" ref="form" :model="model" label-position="right" label-width="120px" style="width:400px; ">
      <el-form-item label="消费日期" label-width="" prop="costDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="model.costDate" :disabled="elementDisabled.costDate[status]"></el-date-picker>
      </el-form-item>
      <el-form-item label="消费项目" prop="costItemId">
        <el-select v-model="model.costItemId" placeholder="" :disabled="elementDisabled.costItemId[status]">
          <el-option v-for="item in dics.costItemId" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
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
  import { BaseDialog,BaseDialogNew, CostRecord, dicCostItem, saveCostRecord, } from './a-import';
    export default {
      name: "d-cost-record",
      extends:BaseDialogNew,
      data(){
        return {
          // model: new CostRecord({costDate:new Date}),
          dics:{
            costItemId:[]
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
        handleSave(){
          let self = this
          this.$refs.form.validate((valid)=>{
            if(valid){
              saveCostRecord(self.model)
                .then(res=>{
                  if(res.success){
                    let result = {success: true,data:{}};
                    this.$emit('saveSuccess',result);
                    this.$refs.form.resetFields();
                    this.msgSuccess();
                  }
                })
            }
          })
        },
        handleOpen(){
          dicCostItem().then(res=>{
            this.dics.costItemId = res.data;
          })
        },
        handleKeyup(e){
          console.log(e);
        }
      }
    }
</script>

<style scoped>

</style>
