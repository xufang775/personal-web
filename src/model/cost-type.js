import {BaseModel} from "../utils/tools";
export class CostType extends BaseModel{
  constructor({id,name,code,type,remark,sortNo,enabled,deleteFlag}={id:'',deleteFlag:false}){
    super(id,deleteFlag);
    this.name = name;
    this.code = code;
    this.type = type;
    this.sortNo = sortNo;
    this.remark = remark;
    this.enabled = enabled;
  }
}
