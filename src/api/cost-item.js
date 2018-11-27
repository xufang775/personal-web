import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/costItem/list',
    method: 'get',
    params
  })
}
