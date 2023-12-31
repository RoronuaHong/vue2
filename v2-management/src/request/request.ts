import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://xue.cnkdl.cn:23683',
  timeout: 3000
})

// TODO: 补全axios部分: 1. 请求缓存；2. 职责链模式；3. cancelToken
// 请求拦截器
instance.interceptors.request.use((config: any) => {
  const token = !config!.url.endsWith('/login')

  if (token && !config!.url.endsWith('/login') && !config.url.endsWith('/captchaImage')) {
    config.headers.Authorization = 'Bearer token'
  }

  return config
}, err => {
  console.log(err)

  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  const data = res.data

  if (data.code !== 200) {
    // 处理失败逻辑
    Message.error(data.msg || '请求发生错误')

    // token过期 | 没有带token
    if (data.code === 401) {
      localStorage.removeItem('edb-authorization-token')

      router.push('/login')
    }

    return Promise.reject(new Error(data.msg || '请求发生错误'))
  }

  return data
}, err => {
  console.log(err)

  return Promise.reject(err)
})

export default instance
