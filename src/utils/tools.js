// export interface IDialog {
//   title?: string;
//   message?: string;
//   width?: string;
//   positionTop?: string;
//   content?: any;
//   model?: any;
//   pageModel?: any;
//   // show?:Func;
//   yes?: Func;
//   no?: Func;
// }

export class Dialog{
  constructor({
    title='',
    status='add',
    ref='',
    visible=false,
    width=undefined,
    model=new BaseModel(),
    yes=function () {

    },
    no=function () {

    }
    }={})
  {
    this.title = title;
    this.status = status;
    this.ref = ref;
    this.visible = visible;
    this.width = width;
    this.labelWidth = '100px';
    this.model = model;
    this.yes = yes;
    this.no = no;
    this.result = {};
  }
  open({
         title='',
         status='add',
         width=undefined,
         labelWidth,
         model=new BaseModel(),
         yes,
         no=function () {

         }
       }={})
  {
    if(title)
      this.title = title;
    if(status)
      this.status = status;
    if(width)
      this.width = width;
    if(labelWidth){
      this.labelWidth = labelWidth;
    }
    if(model)
      this.model = model;
    this.visible = true;
    if(yes){
      this.yes =  yes
    } else{
      this.yes = function () {
        this.visible = false;
      }
    }
    // this.yes =  yes
    this.no = no;
  }
  open2(data={})
  {
    Object.assign(this,data);
    console.log(this);
  }
  save(data){
    this.visible = false;
    this.yes();
    // this.yes.then(res=>{
    //   console.log(2222)
    //   console.log(this.result);
    // });
  }
  close(data){
    this.visible = false;
    this.result =data;
    return this;
  }
}

export class ListQuery{
  constructor({page=1,rows=15,params}){
    this.page = page;
    this.rows = rows;
    this.params = params;
  }
}
export class BaseModel{
  constructor({id,deleteFlag}={}){
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
