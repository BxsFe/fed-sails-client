import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin',
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error.response) // for debug
    if (error.response.data && error.response.data.message) {
      return Promise.reject(new Error(error.response.data.message))
    } else {
      return Promise.reject(error)
    } 
  }
)

export default service
