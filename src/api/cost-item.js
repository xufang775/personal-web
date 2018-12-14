import request from '@/utils/request'
import url from './url'
export function getPageList (params) {
  return request({
    url: url.costItem.getPageList,
    method:'post',
    data:params
  })
}

export function saveCostItem(data) {
  return request({
    url: url.costItem.save,
    method:'post',
    data
  })
}

export function deleteCostItem(params) {
  return request({
    url: url.costItem.delete,
    method:'post',
    data:params
  })
}

export function getList (params) {
  return request({
    url: '/costItem/list',
    method: 'get',
    params
  })
}
export function dic() {
  return request({
    url: url.costItem.dic,
    method:'get'
  })
}
