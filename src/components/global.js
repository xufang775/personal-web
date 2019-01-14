import Vue from 'vue'
import { api } from '@/api/url'
import { reqGet,reqPost } from '@/api/common'

Vue.component('edit-table',{
  template:`
    <div >
      
      <el-table :data="rows" border>
        <el-table-column type="index" width="40px" label=""></el-table-column>
        <el-table-column v-for="(col,colKey) in cols" :key="colKey" :prop="col.field" :label="col.label">
          <template slot-scope="scope">
            <span v-if="scope.row.isSet">
              <span v-if="col.formElement=='input'">
                <el-input autocomplete="off" :placeholder="col.label" v-model="scope.row[col.field]" ></el-input>
              </span>
              <span v-if="col.formElement=='select'">
                <!--<el-select v-model="scope.row[col.field]" placeholder="">-->
                  <!--<el-option v-for="item in dics.costItemId" :key="item.key" :label="item.value" :value="item.key"></el-option>-->
                <!--</el-select>-->
              </span>
               <span v-if="col.formElement=='cascader' && dictionary[col.field]">
               11{{[col.field]}}{{aa}}
               <!--{{dictionary[col.field]}}-->
                 <el-cascader v-if="dictionary[col.field]"
                  expand-trigger="hover"
                  :options="dictionary[col.field]"
                  :change-on-select="true"
                  v-model="scope.row[col.field]">
                </el-cascader>
              </span>
              <span v-if="col.formElement=='date'">
                <el-date-picker type="date" placeholder="" v-model="scope.row[col.field]" style="width: 130px;"></el-date-picker>
              </span>
              <!--<span v-else>{{scope.row[col.field]}}</span>-->
            </span>
            <span v-else>{{ scope.row.costPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="hasRowBtn" label="操作" >
          <template slot-scope="scope">
            <span v-for="btn in rowBtns">
              <el-button @click="handleClick(scope.row)" type="text">{{btn.label}}</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="status=='add'" class="el-table-add-row" @click="nextRecord()"><span>+ 添加</span></div>
    </div>
  `,
  props:{
    status:{
      type:String,
      default:'add'
    },
    cols:{
      type:Array,
      default:[]
    },
    rows:{
      type:Array,
      default:[]
    },
    rowBtns:{
      type:Array,
      default:[]
    },
    dics:{
      type:Object,
      default:{}
    },
    hasRowBtn:{
      type:Boolean,
      default:true
    },
    apiUrl:{
      type:String,
    }
  },

  data(){
    return {
      // status:'',
      // cols:[],
      // rows:[]
      aa:'qqqqq',
      dictionary:{}
    };
  },
  beforeMount(){
    reqPost(this.apiUrl)
      .then(res=>{
        if(res.success){
          this.dictionary.costTypeCode=res.data;
          this.aa="wwww";
          console.log(this.dictionary.costTypeCode)
        }
      });
  },
  methods:{
    loadDics(){
      reqPost(this.apiUrl)
        .then(res=>{
          if(res.success){
            this.dictionary.costTypeCode=res.data;
            this.aa="wwww";
            console.log(this.dictionary.costTypeCode)
          }
        });
    },
    handleClick(code){

    }
  }
});
