import request from '@/utils/request'

export function init() {
  return request({
    url:'/monthRecord/init',
    method:'get'
  })
}
