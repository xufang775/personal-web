export class ListQuery{
  constructor({page=1,rows=15,params}){
    this.page = page;
    this.rows = rows;
    this.params = params;
  }
}
export class BaseModel{
  constructor({id,deleteFlag}){
    this.id = id;
    this.deleteFlag = deleteFlag;
  }
}
export class KeyValue{
  constructor({key,value,other}){
    this.key = key;
    this.value = value;
    this.other = other;
  }
}

export const HttpCode ={
  success:20000
}
