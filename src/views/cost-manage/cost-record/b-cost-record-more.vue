<template>
  <div class="app-container">
    <div class="buttons-container" style="text-align: center;">
      <el-button type="button" class="">返回</el-button>
      <el-button type="button" class="" @click="postData">提交</el-button>
    </div>
    <div class="">
      <el-form :rules="rules" ref="dataForm" :model="model" label-position="right" >
        <el-table :data="data" border>
          <el-table-column type="index" width="40px"></el-table-column>
          <el-table-column label="消费日期" width="215px">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">

                <el-date-picker type="date" placeholder="" v-model="sel['costDate']" style="width: 130px;"></el-date-picker>
                <el-button type="primary" icon="el-icon-arrow-left" circle @click="handleDateUp('-')"></el-button>
                <!--<el-button type="primary" icon="el-icon-arrow-right" circle  @click="handleDateUp('+')"></el-button>-->
              </span>
              <span v-else>{{ scope.row.costDate | dateString('YYYY-MM-DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="消费项目" width="230px">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                 <!--<el-select v-model="sel['costItemId']" placeholder="" @change="changeCostItem">-->
                    <!--<el-option v-for="item in dics.costItemId" :key="item.key" :label="item.value" :value="item.key"></el-option>-->
                  <!--</el-select>-->
                 <span class="el-tag el-tag--mini" style="cursor: pointer;" @click="changeCostItem(['10','1011','101110'])">早</span>
                 <span class="el-tag el-tag--mini" style="cursor: pointer;" @click="changeCostItem(['10','1011','101111'])">中</span>
                 <span class="el-tag el-tag--mini" style="cursor: pointer;" @click="changeCostItem(['10','1011','101112'])">晚</span>
                 <el-cascader
                   style="width: 120px;"
                   expand-trigger="hover"
                   :options="dics.costTypeCode"
                   :show-all-levels="false"
                   :change-on-select="true"
                   @visible-change="changeCostItem"
                   v-model="sel['costTypeCodeArr']">
                 </el-cascader>

              </span>
              <span v-else>{{ scope.row.costTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="消费金额" width="100px">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input autocomplete="off" placeholder="消费金额" v-model.number="sel['costPrice']" ></el-input>
              </span>
              <span v-else>{{ scope.row.costPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-autocomplete
                  class="inline-input"
                  v-model="sel['remark']"
                  :fetch-suggestions="queryRemarkSearch"
                  placeholder="请输入内容"
                  @select="handleRemarkSelect"
                  style="width: 100%;"
                ></el-autocomplete>
                <!--<el-input autocomplete="off" placeholder="备注" v-model.number="sel['remark']"-->
                          <!--@keyup.tab="log()"-->
                          <!--@keyup.enter.prevent="log"-->
                <!--&gt;</el-input>-->
                <!--<input placeholder="备注" v-model.number="sel['remark']"-->
                       <!--@keyup.tab="log"-->
                       <!--@keyup.enter.prevent="log" />-->
              </span>
              <span v-else>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="updateRecord(scope.row,scope.$index,true)">
                  {{scope.row.isSet?'保存':"修改"}}
              </span>
              <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;">删除</span>
              <span v-else class="el-tag el-tag--mini" style="cursor: pointer;" @click="updateRecord(scope.row,scope.$index,false)">取消</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-table-add-row" @click="nextRecord()"><span>+ 添加</span></div>
        <!--<input placeholder="备注" v-model="sel['remark']"-->
               <!--@keyup.tab="log"-->
               <!--@keyup.enter.prevent="log" ></input>-->
      </el-form>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import { api,reqGet,reqPost, BaseDialogNew,saveCostRecordList } from '../a-import'
  //id生成工具 这个比用看 示例而已 模拟后台返回的id
  var generateId = {
    _count: 1,
    get(){return ((+new Date()) + "_" + (this._count++))}
  }
  export default {
    name: "b-cost-record-more",
    data(){
        return {
          api:{ save:api.costRecord.save,getCascader:api.costType.getCascader },
          sel: {},//选中行
          cols:[
            {field:'costDate',label:'消费日期',formElement:'date'},
            {field:'costTypeCode',label:'消费项目',formElement:'cascader'},
            {field:'costPrice',label:'消费金额',formElement:'input'},
            {field:'remark',label:'描述',formElement:'input'},
          ],
          data:[],
          rules:{
            costItemId:[{ required: true, message: '消费项目不能为空'}],
            costDate:[{ required: true, message: '消费日期不能为空'}],
            costPrice:[
              { required: true, message: '消费金额不能为空'},
              { type: 'number', message: '消费金额必须为数字值'}
            ]
          },
          dics:{
            costTypeCode:[],
            costTypeCodeAll:[],
            remark:[]
          },
          model:{}
        }
    },
    created(){
      this.loadDics();
    },
    mounted(){
      this.dics.remark = this.loadRemarkAll();
    },
    methods:{
      listFromTree(item){
        if(item){
          this.dics.costTypeCodeAll.push({key:item.key,label:item.label});
          if(item.children){
            item.children.forEach(i=>{
              this.listFromTree(i);
            })
          }
        }
      },
      loadDics(){
        reqPost(this.api.getCascader)
          .then(res=>{
            if(res.success){
              this.dics.costTypeCode=res.data;
              console.log(this.dics.costTypeCode);
              this.dics.costTypeCode.forEach(i=>{
                this.listFromTree(i);
              })
              console.log(this.dics.costTypeCodeAll);
            }
          });
      },
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
        let j = { id: 0, "costDate": "", "costTypeCode": "","costTypeCodeArr": [], "costPrice": "", "remark": "","remarkObj": {}, "isSet": true, "_temporary": true };
        if(this.data.length>0){
          let lastRow = this.data[this.data.length-1];
          j.costDate = lastRow.costDate
        }
        this.data.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      nextRecord(){
        let row = this.data.find(m=>m.isSet);
        if(!row){
          this.addRecord();
          return;
        }
        //提交数据
        if (row && row.isSet) {
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
      updateRecord(row, index, cg){
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
      postData(){
        //点击修改 判断是否已经保存所有操作
        for (let i of this.data) {
          if (i.isSet) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        console.log(this.data);
        saveCostRecordList(this.data)
          .then(res=>{
            if(res.success){
              this.$message({
                type: 'success',
                message: "保存成功!"
              });
              this.$emit('postSuccess',true);
              this.data = [];
              this.addRecord();
            }
          })
      },
      changeCostItem(val){
        if(val){
          this.sel['costTypeCodeArr'] = val;
        }
        // if(!val){
        //   console.log(this.sel['costTypeCodeArr']);
          let selectValue=this.sel['costTypeCodeArr'][this.sel['costTypeCodeArr'].length-1];
          let obj = this.dics.costTypeCodeAll.find(m=>m.key == selectValue);
          //判断是否有选择，如果用户没有选择，但是删除了上一个选择内容，避免控制台报错，需要做一个判断
          if(obj!=""&&obj!=undefined){
            this.sel['costTypeName']=obj.label;
            this.sel['costTypeCode']=obj.key;
          }
        // }
      },
      loadRemarkAll(){
        return [
          { "value": "楼下盖饭", "address": "长宁区新渔路144号" },
          { "value": "零食", "address": "上海市长宁区淞虹路661号" },
          { "value": "楼下烧烤", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "楼下铁板烧烤", "address": "天山西路438号" },
          { "value": "味多美", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "外卖", "address": "上海市长宁区金钟路633号" },
          { "value": "折800", "address": "上海市长宁区金钟路633号" },
        ];
      },
      queryRemarkSearch(queryString, cb) {
        var restaurants = this.dics.remark;
        var results = queryString ? restaurants.filter(this.createRemarkFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createRemarkFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          // return restaurant == queryString;
        };
      },
      handleRemarkSelect(val){
        // console.log(val);
        console.log(this.sel['remark']);
      },
      handleDateUp(flag){
        if(flag=='+'){
          this.sel['costDate']=moment(this.sel['costDate']).add(1, 'days');
        }
        if(flag=='-'){
          this.sel['costDate']=moment(this.sel['costDate']).add(-1, 'days');
        }

      }
    },
  }
</script>

<style scoped>

</style>
