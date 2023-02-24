import request from '../utils/request' // 引入封装得axios

// 用户登录验证
// {
//   username: "xxx"
//   password: "123"
// }
export function login(data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data,
  })
}
export function getInfo(token: any) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { token: token },
  })
}
const actions = {
  // user login
  // login ({ commit }, userInfo:any) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}
