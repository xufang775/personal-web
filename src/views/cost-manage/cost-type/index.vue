<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-item">
        <el-button type="primary" data-code="add" @click="handle($event)" >新增</el-button>
      </div>
      <div class="float-r">
        <div class="filter-item">
          <el-input v-model="params.name" placeholder="请输入名称"></el-input>
        </div>
        <div class="filter-item">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="handleRefresh">重置</el-button>
        </div>
      </div>
    </div>
    <el-table border :data="list">
      <el-table-column type="selection" align="center" width="50" label=""></el-table-column>
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ (pager.pageIndex)*pager.pageSize + scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="编码" width="180"/>
      <el-table-column prop="name" label="类型名称" width="180"/>
      <el-table-column prop="field" label="字段" width="180"/>
      <el-table-column prop="remark" label="备注"/>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" data-code="edit" @click.native.prevent="handle($event,scope)">编辑</el-button>
          <el-button type="text" data-code="delete-one" @click.native.prevent="handle($event,scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container float-r">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pager.pageIndex"
                       :page-sizes="pager.pageSizes"
                       :page-size="pager.pageSize"
                       layout="total,prev, pager, next,sizes"
                       :total="total">
        </el-pagination>
    </div>
    <test></test>
    <el-dialog :visible.sync="show">
        <el-form  :ref="formName" :model="model" :rules="rules" label-position="right" :label-width="labelWidth" >
          <el-form-item label="是否顶级类型" prop="isTop">
            <el-switch
              v-model="model.isTop">
            </el-switch>
            <span class="red margin-l10">若为否，则需要设置"上级项目"</span>
          </el-form-item>
          <el-form-item label="上级项目" prop="parentCode" v-if="!model.isTop">
              <template v-if="dic.parentCode.length>0">
                <el-cascader
                  v-model="model.parentCode"
                  :options="dic.parentCode"
                  :props="{ expandTrigger: 'hover' }"
                  >
                </el-cascader>

                <!--<el-cascader-->
                  <!--expand-trigger="hover"-->
                  <!--:options="dic.parentCode"-->
                  <!--:change-on-select="true"-->
                  <!--v-model="model.parentCode">-->
                <!--</el-cascader>-->
                <!--{{model.parentCode}}-->
              </template>
              <template v-else>无-顶级类型</template>
          </el-form-item>
          <el-form-item label="类型名称" prop="name">
              <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :autosize="{ minRows:2,maxRows:4 }" v-model="model.remark"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="enabled">
            <el-switch v-model="model.enabled"></el-switch>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideForm">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { BaseList, BaseSearch, BaseForm } from '@/utils/base-comp';
  import api from '@/api/cost-type';
    export default {
      mixins:[BaseList,BaseForm],
      data(){
        return {
          api: api,
          dic:{
            parentCode:[]
          },
          model:{
            isTop: false,
            parentCode:'',
            name:'',
            remark:'',
            enabled:true,
            deleteFlag:false,
            addUserId:this.$store.state.user.userId,
            addUserName: this.$store.state.user.username,
            // addDate:
          },
          rules:{
            name:[{ required: true, message: '类型名称不能为空'}],
          },
          formName:'form'
        }
      },
      async created(){
        console.log(Vue.$myName);
        Vue.myGlobalMethod();
        this.$myMethod();
        // console.log('sub created');
       let userId = this.$store.state.user.userId;
       let result = await api.cascader({ userId: userId});
       this.dic.parentCode = result.data;
       this.sayHello();
       // console.log(result);
      },
      methods:{
        getParentCode(code){
          let ret = [];
          for(let i=0; i<code.length; i++){
            if( (i+1) % 2 == 0 && i != 0 ){
              ret.push(code.substr(0,i+1))
            }
          }
          return ret;
        },
        handleEdit({$index,column,row}){
          this.model = row;
          this.model.parentCode = this.getParentCode(this.model.code);
          this.model.isTop = this.convartIntToBoolean(row.isTop);  // row.isTop == '1' ? true : false;
          this.model.enabled = this.convartIntToBoolean(row.enabled); // row.enabled == '1' ? true : false;
          delete this.model.addDate;
          delete this.model.deleteFlag;
          this.show = true;
        },

      }
    }
</script>

<style scoped>

</style>
