import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://xue.cnkdl.cn:23683',
  timeout: 3000
})

// TODO: 补全axios部分: 1. 请求缓存；2. 职责链模式；3. cancelToken
// 请求拦截器
instance.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer token'

  return config
}, err => {
  console.log(err)

  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err)

  return Promise.reject(err)
})

export default instance
