import instance from './request'

// 获取验证码请求
const getCaptchaCodeApi = () => instance.get('/prod-api/captchaImage')

// 登录请求
const loginApi = (params: any) => instance.post('/prod-api/login', params)

// 获取用户可以访问的路由的api
const getUserRouterApi = () => instance.get('/prod-api/getRouters')

// 获取用户可以访问的路由的api
const getUserInfoApi = () => instance.get('/prod-api/getUserInfo')

export {
  getCaptchaCodeApi,
  loginApi,
  getUserRouterApi,
  getUserInfoApi
}
