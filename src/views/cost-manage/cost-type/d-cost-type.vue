<template>
  <el-dialog :visible.sync="pDialog.visible" :title="title" :before-close="handleClose" @open="handleOpen" :width="width">
    <el-form :rules="rules" ref="form" :model="model" label-position="right" :label-width="labelWidth" >
      <el-form-item label="上级项目" label-width="" prop="itemName">
        <el-cascader
          expand-trigger="hover"
          :options="dicCode"
          :change-on-select="true"
          v-model="model.parentCode">
        </el-cascader>
      </el-form-item>
      <el-form-item label="项目名称" label-width="" prop="itemName">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <!--<el-form-item label="排序" label-width="" prop="sortNo">-->
        <!--<el-input v-model.number="model.sortNo"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :autosize="{ minRows:2,maxRows:4 }" v-model="model.remark"></el-input>
      </el-form-item>
      <el-form-item label="" prop="type">
        <el-checkbox v-model="model.enabled">激活</el-checkbox>
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
          api:{ save:api.costType.save,cascader:api.costType.cascader },
          rules:{
            name:[{ required: true, message: '消费项目不能为空'}],
            // type:[{ required: true, message: '消费日期不能为空'}],
            sortNo:[
              { required: true, message: '不能为空'},
              // { type: 'number', message: '必须为数字值'}
            ]
          },
          dicCode:[]
        }
      },
      // watch:{
      //   model:function (val,oldval) {
      //     debugger;
      //     if(code){
      //
      //     }
      //   },
      //   deep:true
      // },
      methods:{
        handleOpen(){
          reqPost(this.api.cascader)
            .then(res=>{
              if(res.success){
                this.dicCode=res.data;
              }
              console.log(this.dics['code']);
            });
        },
      }
    }
</script>

<style scoped>

</style>
