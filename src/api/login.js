import request1 from '@/utils/request'
import url from './url'

export function login (username, password) {
  return request1.post(url.login.login, {
    data: {
      username,
      password
    }
  })

  // return request1({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}
export function getInfo (token) {
  return request1({
    url: url.login.info,
    method: 'get',
    params: { token }
  })
}
export function logout () {
  return request1({
    url: url.login.logout,
    method: 'get'
  })
}
