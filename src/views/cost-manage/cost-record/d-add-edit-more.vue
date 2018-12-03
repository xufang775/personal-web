<template>
    <el-dialog :title="titleMap[status]" width="60%" :visible.sync="visible" :close-on-click-modal="false"  @open="open" @before-close="close">
      <el-row>
        <el-form :rules="rules" ref="dataForm" :model="model" label-position="right" >
        <el-table size="mini" :data="data" border style="width: 100%" highlight-current-row>
          <el-table-column type="index" width="40px"></el-table-column>
          <el-table-column label="消费日期" width="150px">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-date-picker size="mini" type="date" placeholder="" v-model="sel['costDate']" style="width: 130px;"></el-date-picker>
              </span>
              <span v-else>{{ scope.row.costDate | dateString('YYYY-MM-DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="消费项目" width="120px">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                 <el-select size="mini" v-model="sel['costItemId']" placeholder="" @change="changeCostItem">
                    <el-option v-for="item in dics.costItemId" :key="item.key" :label="item.value" :value="item.key"></el-option>
                  </el-select>
              </span>
              <span v-else>{{ scope.row.costItemName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="消费金额" width="100px">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input size="mini" autocomplete="off" placeholder="消费金额" v-model.number="sel['costPrice']" ></el-input>
              </span>
              <span v-else>{{ scope.row.costPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input size="mini" autocomplete="off" placeholder="备注" v-model.number="sel['remark']" ></el-input>
              </span>
              <span v-else>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column v-for="(v,i) in master_user.columns" :key="v.field" :prop="v.field" :label="v.title" :width="v.width">-->
            <!--<template slot-scope="scope">-->
                <!--<span v-if="scope.row.isSet">-->
                    <!--<el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[v.field]">-->
                    <!--</el-input>-->
                <!--</span>-->
              <!--<span v-else>{{scope.row[v.field]}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                  {{scope.row.isSet?'保存':"修改"}}
              </span>
              <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;">删除</span>
              <span v-else class="el-tag el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">取消</span>
              <!--<span v-if="scope.row.id==0" class="el-tag el-tag&#45;&#45;danger el-tag&#45;&#45;mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">下一条</span>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="el-table-add-row" style="width: 99.2%;" @click="nextRecord()"><span>+ 添加</span></div>
        </el-form>
      </el-row>
      <div slot="footer"  class="dialog-footer">
        <el-button @click="close" size="mini">取消</el-button>
        <el-button type="primary" @click="postData" size="mini">确认</el-button>
      </div>
    </el-dialog>
</template>

<script>
  import { BaseDialog } from '@/components/base'
  import { dicCostItem,saveCostRecord,saveCostRecordList } from './url'
  //id生成工具 这个比用看 示例而已 模拟后台返回的id
  var generateId = {
    _count: 1,
    get(){return ((+new Date()) + "_" + (this._count++))}
  };
  export default {
    name: "d-add-edit-more",
    extends: BaseDialog,
    data(){
      return {
        sel: null,//选中行
        columns: [
          {field: "type", title: "远程类型", width: 120},
          {field: "addport", title: "连接地址", width: 150},
          {field: "user", title: "登录用户", width: 120},
          {field: "pwd", title: "登录密码", width: 220},
          {field: "info", title: "其他信息"}
        ],
        data: [],
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
      //读取表格数据
      readRecord() {
        //根据实际情况，自己改下啊
        this.data.map(i => {
          i.id = generateId.get();//模拟后台插入成功后有了id
          i.isSet=false;//给后台返回数据添加`isSet`标识
          return i;
        });
      },
      addRecord(){
        for (let i of this.data) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        let j = { id: 0, "costDate": "", "costItemId": "", "costPrice": "", "remark": "", "isSet": true, "_temporary": true };
        if(this.data.length>0){
          let lastRow = this.data[this.data.length-1];
          j.costDate = lastRow.costDate
        }
        this.data.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      nextRecord(){
        let row = this.data.find(m=>m.isSet);
        //提交数据
        if (row.isSet) {
          let self = this;
          //项目是模拟请求操作  自己修改下
          (function () {
            let data = JSON.parse(JSON.stringify(self.sel));
            for (let k in data) row[k] = data[k];
            // self.$message({
            //   type: 'success',
            //   message: "保存成功!"
            // });
            //然后这边重新读取表格数据
            self.readRecord();
            row.isSet = false;
            console.log(self.data);
            self.addRecord();
          })();
        } else {
          this.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.data) {
          if (i.isSet && i.id != row.id) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.id) this.data.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        //提交数据
        if (row.isSet) {
          let self = this;

          // saveCostRecord(row)
          //   .then(res=>{
          //     if(res.success){
          //       self.$message({
          //         type: 'success',
          //         message: "保存成功!"
          //       });
          //       //然后这边重新读取表格数据
          //       self.readRecord();
          //       row.isSet = false;
          //     }
          //   })

          //项目是模拟请求操作  自己修改下
          (function () {
            let data = JSON.parse(JSON.stringify(self.sel));
            for (let k in data) row[k] = data[k];
            // self.$message({
            //   type: 'success',
            //   message: "保存成功!"
            // });
            //然后这边重新读取表格数据
            self.readRecord();
            row.isSet = false;
            console.log(self.data);
            // self.addRecord();
          })();
        } else {
          this.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      open(){
        dicCostItem().then(res=>{
          this.dics.costItemId = res.data;
        })
        this.addRecord();
      },
      postData(){
        //点击修改 判断是否已经保存所有操作
        for (let i of this.data) {
          if (i.isSet) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        saveCostRecordList(this.data)
          .then(res=>{
            if(res.success){
              this.$message({
                type: 'success',
                message: "保存成功!"
              });
              this.$emit('postSuccess',true);
              this.data = [];
            }
          })
      },
      changeCostItem(val){
        let obj = {};
        obj = this.dics.costItemId.find((item)=>{
          return item.key === val;//比如：选项2
        });
        //判断是否有选择，如果用户没有选择，但是删除了上一个选择内容，避免控制台报错，需要做一个判断
        if(obj!=""&&obj!=undefined){
          let currItem = this.data.find(m=>m.id == 0);
          if(currItem){
            currItem.costItemName = obj.value;
          }
        }
      },
    }
  }
</script>

<style scoped>
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
  .el-dialog__body{
    padding: 5px;
  }
</style>
