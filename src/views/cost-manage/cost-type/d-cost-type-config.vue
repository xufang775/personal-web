<template>
  <el-dialog :visible.sync="pDialog.visible" :title="title" :before-close="handleClose" @open="handleOpen" :width="width">
    <el-form :rules="rules" ref="form" :model="model" label-position="right" :label-width="labelWidth" >
      <el-form-item label="项目名称" label-width="" prop="itemName">
        <el-input v-model="model.configName"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :autosize="{ minRows:2,maxRows:4 }" v-model="model.remark"></el-input>
      </el-form-item>
      <el-form-item label="详情项目" prop="type">
        <el-transfer v-model="model.detailsArr" :data="dic.typeData">
          <span class="inline-block" :class="handleRender(option)" slot-scope="{ option }">
            <span style="color:#fff;">{{ option.key }}</span>
            <span style="margin-left: -22px;"> - {{ option.label }}</span>
          </span>
        </el-transfer>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" >取消</el-button>
      <el-button type="primary" @click="handleSave" >确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {api,reqGet,reqPost, BaseDialogNew } from '../a-import'
    export default {
      name: "d-cost-type",
      extends: BaseDialogNew ,
      data(){
        return {
          api:{
            save:api.costTypeConfig.save,
            getKeyLabelList:api.costType.getKeyLabelList
          },
          rules:{
            name:[{ required: true, message: '配置名称不能为空'}],
          },
          dic:{ typeData:[] }
        }
      },
      methods:{
        handleOpen(){
          reqPost(this.api.getKeyLabelList)
            .then(res=>{
              if(res.success){
                this.dic.typeData=res.data;
              }
            });
        },
        handleRender(row){
          let res = {};
          if(row.key.length == 2){
            res['font-bold']=true;
          }
          return res;
        }
      }
    }
</script>

<style scoped>
  .inline-block{ display: inline-block;}
  .font-bold{ font-weight: bold; }
</style>
