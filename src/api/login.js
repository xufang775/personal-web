import request1 from '@/utils/request'

export function login (username, password) {
  return request1.post('/login', {
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
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
export function logout () {
  return request1({
    url: '/logout',
    method: 'get'
  })
}
