import request from '@/utils/request'
const urlBase = '/api-login';
const url = {
  login: urlBase + '/login',
  // info: urlBase + '/user/info',
  info: urlBase + '/info',
  logout: urlBase + '/logout',
};

export function login (username, password) {
  return request.post(url.login, {
    data: {
      username,
      password
    }
  })
}
export function getInfo (token) {
  return request({
    url: url.info,
    method: 'get',
    params: { token }
  })
}
export function logout () {
  return request({
    url: url.logout,
    method: 'get'
  })
}
