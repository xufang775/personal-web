import request from '@/utils/request'
const urlBase = '/api-money/costTypeConfig';
const url = {
  page: urlBase + '/page',
  all: urlBase + '/all',
  insert: urlBase + '/insert',
  update: urlBase + '/update',
  delete: urlBase + '/delete',
  cascader: urlBase + '/cascader',
  queryById: urlBase + '/queryById'
};
const fns = {};
Object.keys(url).forEach(key =>{
  fns[key] = async function (params={}) {
    return request({
      url: url[key],
      method: 'post',
      data: params
    })
  }
});

fns.queryTableColumns =async function (params={}) {
  return request({
    url: urlBase + '/queryById',
    method: 'post',
    data: params
  })
}

export default fns;

