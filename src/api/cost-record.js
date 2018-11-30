import request from '@/utils/request'
import url from './url'
export function getPageList (params) {
  let data = { page: 1,rows: 5 };
  if(params['page']){
    data.page = params['page'];
  }
  if(params['limit']){
    data.rows = params['limit'];
  }

  return request.post(url.costRecord.pageList, {
    data: data
  })
}
