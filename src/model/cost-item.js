import {BaseModel} from "../utils/tools";
export class CostItem extends BaseModel{
  constructor({id,itemName,itemCode,type,remark,sortNo,enabled,deleteFlag}={id:'',deleteFlag:false}){
    super(id,deleteFlag);
    this.itemName = itemName;
    this.itemCode = itemCode;
    this.type = type;
    this.sortNo = sortNo;
    this.remark = remark;
    this.enabled = enabled;
  }
}
