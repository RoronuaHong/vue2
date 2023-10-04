import Vue from 'vue'

import 'reset-css'

import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import i18n from '@/locales'

Vue.config.productionTip = false

// 创建 i18n 实例
// const i18n = new VueI18n({
//   locale: 'zh',
//   messages: {
//     zh: zhLocale,
//     en: enLocale
//   }
// })
// Vue.prototype.$i18n = i18n

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
