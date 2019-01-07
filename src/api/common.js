import request from '@/utils/request'
export { default as api} from './url'

export function reqPost(url,params) {
  if(params){
    return request({
      url: url,
      method:'post',
      data:params
    })
  } else {
    return request({
      url: url,
      method:'post'
    })
  }
}
export function reqGet(url,params) {
  return request({
    url: url,
    method:'get',
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

