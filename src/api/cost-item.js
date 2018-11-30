import request from '@/utils/request'

export function getPageList (params) {
  let data = { page: 1,rows: 5 };
  if(params['page']){
    data.page = params['page'];
  }
  if(params['limit']){
    data.rows = params['limit'];
  }

  return request.post('/costItem/pageList', {
    data: data
  })
}

export function createCostItem(data) {
  return request({
    url: '/costItem/create',
    method:'post',
    data
  })
}
export function updateCostItem(data) {
  return request({
    url: '/costItem/update',
    method:'post',
    data
  })
}

export function getList (params) {
  return request({
    url: '/costItem/list',
    method: 'get',
    params
  })
}
