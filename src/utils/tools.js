export class ListQuery{
  constructor({page=1,rows=15,params}){
    this.page = page;
    this.rows = rows;
    this.params = params;
  }
}
export class BaseModel{
  constructor({id}){

  }
}
