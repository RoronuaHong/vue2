// 引入 vue
import Vue from 'vue'

// 引入vue-i18n
import VueI18n from 'vue-i18n'

// 注册vue-i18n
Vue.use(VueI18n)

interface IMessages {
  [key: string]: any
}

// 利用 webpack 的 require.context 方法遍历读取 i18n 目录下的所有 .json 语言文件
// 这样做省去了逐一引入语言文件的工作量，只需要将创建的语言文件 xx.json 直接放入 i18n这个目录中就行
function loadLocaleMessages () {
  const locales = require.context('.', true, /.json$/i)
  const messages: IMessages = {}

  locales.keys().forEach((key) => {
    const newKey = key.replace('./', '').replace('.json', '')
    messages[newKey] = locales(key)
  })

  // 返回语言配置对象
  return messages
}

// 初始化语言配置
const i18nConfig = {
  locale: 'zh',
  messages: loadLocaleMessages()
}

// 创建 vue-i18n 实例
const i18n = new VueI18n(i18nConfig)

// 导出实例
export default i18n
