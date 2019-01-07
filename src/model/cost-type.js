import {BaseModel} from "../utils/tools";
export class CostType extends BaseModel{
  constructor({id,name,parentCode,code,type,remark,sortNo,enabled,deleteFlag}={id:'',deleteFlag:false}){
    super(id,deleteFlag);
    this.name = name;
    this.code = code;
    this.parentCode = parentCode;
    this.type = type;
    this.sortNo = sortNo;
    this.remark = remark;
    this.enabled = enabled;
  }
}

export class CostTypeConfig extends BaseModel{
  constructor({id,configName,addUserId,addUserName,addDate,detail,remark,sortNo,enabled,deleteFlag}={id:'',deleteFlag:false,detail:[]}){
    super(id,deleteFlag);
    this.configName = configName;
    this.addUserId = addUserId;
    this.addUserName = addUserName;
    this.detail = detail;
    this.addDate = addDate;
    this.sortNo = sortNo;
    this.remark = remark;
    this.enabled = enabled;
  }
}
