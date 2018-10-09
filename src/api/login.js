import request from '@/utils/request'

export function login(username, password) {
  // return new Promise((rs, rj) => {
  //   const r = {
  //     code: 20000,
  //     data: { token: 'admin' },
  //     token: 'admin'
  //   }
  //   rs(r)
  // })
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  // return new Promise((rs, rj) => {
  //   rs()
  // })
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
