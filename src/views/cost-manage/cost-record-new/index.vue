<template>
    <div class="app-container">

      <div class="filter-container">
        <div class="filter-item">
          <el-button type="primary" icon="el-icon-plus" @click="showForm">新增</el-button>
        </div>
        <div style="float:right">
          <div class="filter-item">
            <el-input v-model="params.remark" />
          </div>
          <div class="filter-item">
            <el-button type="primary" @click.native.prevent="editRow(scope)">搜索</el-button>
          </div>
          <div class="filter-item">
            <el-button type="primary" @click.native.prevent="deleteRow(scope)">重置</el-button>
          </div>
        </div>
      </div>

      <el-table :data="list" border >
        <el-table-column type="selection" align="center" width="50" label=""></el-table-column>
        <!--<el-table-column type="index" width="50" label="22" />-->
        <el-table-column align="center" label="ID" width="50">
            <template slot-scope="scope">
            {{ (pager.pageIndex)*pager.pageSize + scope.$index+1 }}
            </template>
        </el-table-column>
        <el-table-column prop="costDate" label="消费日期" width="180">
            <template slot-scope="scope">
            {{scope.row.costDate | parseTime('{y}-{m}-{d}')}}
            <span style="color:red;font-size: 5px;">{{weekenStr(scope.row.costDate)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="costPrice" label="消费金额" width="180">
            <template slot-scope="scope">
            <span class="font-b">￥</span>
            <span>{{scope.row.costPrice}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="handleUpdate(scope)">编辑</el-button>
            <el-button type="text" @click.native.prevent="handleDelete(scope)">删除</el-button>
            <el-button type="text" >设置权限</el-button>
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


      <el-dialog title="提示" :visible.sync="show">
        <span>这是一条消息</span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="hideForm">取 消</el-button>
          <el-button type="primary" @click="hideForm">确 定</el-button>
        </span>
      </el-dialog>
      <detail :pShow="displayDetail" @dislayForm="hideDetail"></detail>
    </div>
</template>

<script>
    import { BaseList, BaseSearch, BaseForm } from '@/utils/base-comp';
    import moment from "moment";
    import detail from './detail';
    import api from '@/api/cost-record-new';
    export default {
      mixins: [ BaseList,BaseSearch,BaseForm ],
      components:{ detail },
      data(){
        return {
          displayDetail:false,
          api: api,
          params:{

          }
        }
      },
      methods:{
        showDetail(){
          this.displayDetail = true;
        },
        hideDetail(){
          this.displayDetail = false;
        },
        weekenStr(date){
          const weekNum = moment(date).day();
          if(weekNum == 6){
            return '[六]';
          }
          if(weekNum == 0){
            return '[日]';
          }
        },

      }
    }
</script>

<style scoped>

</style>
