import {BaseModel} from "../utils/tools";

export class CostRecord extends BaseModel{
  constructor({id='',costDate,costPrice,costItemId,costTypeCode,costTypeCodeArr,costUserId,addDate,deleteFlag=false}){
    super(id,deleteFlag);
    this.costDate = costDate;
    this.costPrice = costPrice;
    this.costItemId = costItemId;
    this.costTypeCode = costTypeCode;
    this.costTypeCodeArr = costTypeCodeArr;
    this.costUserId = costUserId;
    this.addDate = addDate;
    this.deleteFlag = deleteFlag;
  }
}

export class CostRecordSearch {
  constructor({
                costDateStart,
                costDateEnd,
                costMonth,
                costYear,
                costPriceStart=undefined,
                costPriceEnd=undefined,
                costItemId,
                remark,
                searchType
              }={searchType:'record'}){
    this.costDateStart= costDateStart;
    this.costDateEnd=costDateEnd;
    this.costMonth=costMonth;
    this.costYear=costYear;
    this.costPriceStart=costPriceStart;
    this.costPriceEnd=costPriceEnd;
    this.costItemId=costItemId;
    this.remark=remark;
    this.searchType=searchType;
  }
}
