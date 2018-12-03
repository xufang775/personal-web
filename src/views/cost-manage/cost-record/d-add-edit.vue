<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :before-close="close" @open="open">
    <el-form :rules="rules" ref="dataForm" :model="model" label-position="right" label-width="100px" style="width:400px; margin-left: 50px;">
      <el-form-item label="消费日期" label-width="" prop="costDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="model.costDate" ></el-date-picker>
      </el-form-item>
      <el-form-item label="消费项目" prop="costItemId">
        <el-select v-model="model.costItemId" placeholder="">
          <el-option v-for="item in dics.costItemId" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消费金额" prop="costPrice">
        <el-input v-model.number="model.costPrice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :autosize="{ minRows:4,maxRows:5 }" v-model="model.remark"></el-input>
        {{title}}
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取消</el-button>
      <el-button v-if="status=='create'" type="primary" @click="createData" size="mini">确认</el-button>
      <el-button v-else type="primary" @click="updateData" size="mini">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import BaseDialog from '@/components/base/base-dialog'
  import {CostRecord} from "../../../model/cost-record";
  import { dic } from '@/api/cost-item';
  import { save } from '@/api/cost-record';
    export default {
      name: "d-add-edit",
      extends: BaseDialog,
      props:['pVisible','pStatus'],
      data(){
        return {
          model: new CostRecord({costDate:new Date}),
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
          }
        }
      },
      methods:{
        createData(){
          this.$refs['dataForm'].validate((valid)=>{
            if(valid){
              save(this.model)
                .then(res=>{
                  if(res.success){
                    this.close();
                    this.$emit('isRefreshList',true);
                    // this.$refs['dataForm'].clearValidate();
                    this.model = {};
                    this.$notify({
                      title:'成功',
                      message: '创建成功',
                      type: 'success',
                      duration: 2000
                    })

                  }
                })
            }
          })
        },
        updateData(){

        },
        open(){
          dic().then(res=>{
            this.dics.costItemId = res.data;
          })
        }
      }
    }
</script>

<style scoped>

</style>
