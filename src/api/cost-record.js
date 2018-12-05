import request from '@/utils/request'
import url from './url'
export function pageList (params) {
  return request({
    url: url.costRecord.pageList,
    method:'post',
    data:params
  })
}
export function pageListByDate (params) {
  return request({
    url: url.costRecord.pageListByDate,
    method:'post',
    data:params
  })
}

export function getMonthRecordForTable (params) {
  return request({
    url: url.costRecord.getMonthRecordForTable,
    method:'post',
    data:params
  })
}

export function del(params) {
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
export function saveList(params) {
  return request({
    url: url.costRecord.saveList,
    method:'post',
    data:params
  })
}
