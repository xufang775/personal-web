import request from '@/utils/request'
export { default as api} from './url'

export function reqPost(url,params) {
  return request({
    url: url,
    method:'post',
    data:params
  })
}
export function comDelete(url,params) {
  return request({
    url: url,
    method:'post',
    data:params
  })
}

