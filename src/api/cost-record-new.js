import request from '@/utils/request'
const urlBase = '/api-money/costRecord';
const url = {
  page: urlBase + '/page',
  all: urlBase + '/all',
  save: urlBase + '/save',
  delete: urlBase + '/delete',
  update: urlBase + '/update',
  queryTable: urlBase + '/queryTable',
};
const fns = {};
Object.keys(url).forEach(key =>{
  fns[key] = async function (params) {
    return request({
      url: url[key],
      method: 'post',
      data: params
    })
  }
});
export default fns;

