import {BaseModel} from "../utils/tools";

export class CostRecord extends BaseModel{
  constructor({id='',costDate,costPrice,costItemId,costUserId,addDate,deleteFlag=false}){
    super(id,deleteFlag);
    this.costDate = costDate;
    this.costPrice = costPrice;
    this.costItemId = costItemId;
    this.costUserId = costUserId;
    this.addDate = addDate;
    this.deleteFlag = deleteFlag;
  }
}
