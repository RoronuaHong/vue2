import instance from './request'

// 获取验证码请求
const getCaptchaCodeApi = () => instance.get('/prod-api/captchaImage')

// 登录请求
const loginApi = params => instance.post('/prod-api/login', params)

export {
  getCaptchaCodeApi,
  loginApi
}
