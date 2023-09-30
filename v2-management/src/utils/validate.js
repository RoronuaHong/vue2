export const validateUsername = (rule, value, callback) => {
  if (value.length < 3 || value.length > 20) {
    callback(new Error('用户名必须大于3位, 小于20位'))
  } else {
    callback()
  }
}
