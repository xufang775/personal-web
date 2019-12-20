import request from '@/utils/request'
const urlBase = '/api-system/sysRole';
const url = {
  page: urlBase + '/getPageList',
  all: urlBase + '/queryAll',
  save: urlBase + '/save',
  delete: urlBase + '/delete',
  update: urlBase + '/update'
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

