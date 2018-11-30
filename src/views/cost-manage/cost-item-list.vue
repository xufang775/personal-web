<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-add" @click="handleCreate">新增</el-button>
      <el-input @keyup.enter.native="handleFilter" style="width:100px;" class="filter-item" placeholder="编码"  v-model="listQuery.title"/>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <el-table :key="tableKey" :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ (listQuery.page-1)*listQuery.limit + scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="消费项目名称" width="110" align="center"></el-table-column>
      <el-table-column prop="enabled" label="激活" width="90">
        <template slot-scope="scope">
          {{ scope.enabled }}
        </template>
      </el-table-column>
      <el-table-column prop="sortNo" label="排序" width="100"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="float:right;">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.page"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listQuery.limit"
                     layout="total,prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px" style="width:400px; margin-left: 50px;">
        <el-form-item label="项目名称" label-width="" prop="itemName">
          <el-input v-model="temp.itemName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :autosize="{ minRows:2,maxRows:4 }" v-model="temp.remark"></el-input>
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-checkbox v-model="temp.enabled">激活</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {getPageList, getList, createCostItem, updateCostItem } from '@/api/cost-item'


const calendarTypeOptions = [
  { key: 'CN', display_name: 'China'},
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc,cur) => {
  acc[cur.key] = cur.display_name
  return acc
},{})

export default {
  name: 'cost-item-list',
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery:{
        page:1,
        limit: 15,
        importance: undefined,
        title:undefined,
        type: undefined,
        sort:'+id'
      },
      importanceOptions:[1,2,3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        itemName:'',
        remark:'',
        enabled:true,
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus:'',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        itemName: [{required:true,message:'项目名称是必填的', trigger:'change'}],
      },
      downloadLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList(){
      this.listLoading = true;
      getPageList(this.listQuery)
        .then((res)=>{
          this.list = res.data.list;
          this.total = res.data.total;
          this.listLoading = false
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1.5 * 1000)
        })
    },
    handleFilter(){
      this.listQuery.page = 1;
      this.getList();
    },
    resetTemp(){
      this.temp = {
        id: undefined,
        itemName:'',
        remark: '',
        enabled: true,
      }
    },
    handleCreate(){
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData(){
      this.$refs['dataForm'].validate((valid)=>{
        if(valid){
          createCostItem(this.temp).then(()=>{
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title:'成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row){
      this.temp = Object.assign({},row);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.$refs['dataForm'].clearValidate();
      })
    },
    updateData(){
      this.$refs['dataForm'].validate((valid)=>{
        if(valid){
          debugger;
          const tempData = Object.assign({}, this.temp);
          updateCostItem(tempData).then(()=>{
            for (const v of this.list){
              if(v.id === this.temp.id){
                const index = this.list.indexOf(v);
                this.list.splice(index,1,this.temp);
                break
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row){
      this.$notify({
        title:'成功',
        message:'删除成功',
        type:'success',
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index,1);
    },
    handleSizeChange(val){
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val){
      this.listQuery.page = val;
      this.getList();
    },
    fetchData () {
      this.listLoading = true
      getList(this.listQuery)
        .then((res) => {
          this.list = res.data
          this.listLoading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
