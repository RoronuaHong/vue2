import Vue from 'vue'
import SvgIcon from './SvgIconView.vue'

// 全局注册: 可以在其它地方使用icon-svg组件。
Vue.component('svg-icon', SvgIcon)

const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)

requireAll(req)
