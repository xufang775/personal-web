import request from '@/utils/request'
import url from './url'
export function pageList (params) {
  // if(params['page']){
  //   data.page = params['page'];
  // }
  // if(params['limit']){
  //   data.rows = params['limit'];
  // }

  return request.post(url.costRecord.pageList, {
    data: params
  })
}
export function del(params) {
  debugger;
  console.log(params);
  return request({
    url: url.costRecord.delete,
    method:'post',
    data:params
  })
}

export function save(params) {
  return request({
    url: url.costRecord.save,
    method:'post',
    data:params
  })
}
