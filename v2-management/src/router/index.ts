import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'mainlayout',
    // component: () => import(/* webpackChunkName: "layout" */ '../views/layouts/MainLayout.vue')
    component: () => import(/* webpackChunkName: "layout" */ '../views/layouts/ElMainLayout.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/LoginView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 1. 登录页 -> token存在 -> 回首页。
  // 2. 首页 -> token不存在 -> 登录页。
  const token = localStorage.getItem('edb-authorization-token')

  // if (to.path === '/login') {
  //   // 如果当前要跳转的路由是登录页
  //   if (token) {
  //     // 如果已经存在 token，说明用户已登录
  //     next('/')
  //   } else {
  //     // 如果没有 token，则继续访问登录页
  //     next()
  //   }
  // } else {
  //   // 如果当前要跳转的路由不是登录页
  //   if (token) {
  //     // 如果存在 token，则用户已登录，继续访问目标路由
  //     next()
  //   } else {
  //     // 如果没有 token，则重定向到登录页
  //     next('/login')
  //   }
  // }
  next()
})

export default router
