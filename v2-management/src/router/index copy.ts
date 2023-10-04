import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import store from '@/store'
import i18n from '@/locales'
import { getUserRouterApi } from '@/request/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainlayout',
    // component: () => import(/* webpackChunkName: "layout" */ '../views/layouts/MainLayout.vue')
    component: () => import(/* webpackChunkName: "layout" */ '../views/layouts/ElMainLayout.vue'),
    redirect: '/home',
    children: []
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

// 路由守卫：
router.beforeEach(async (to, from, next) => {
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

  // 3.
  if (token && store.state.userMenuData.menuData.length === 0) {
    if (!getUserRouterApi) {
      return
    }
    try {
      const res = await getUserRouterApi()

      let newMenuData = [{
        id: '0',
        title: '首页',
        path: '/'
      }]

      const ret = res.data.map(item => {
        if (item.children) {
          return {
            title: i18n.t(item.meta.title),
            path: item.path,
            children: item.children.map(cItem => {
              return {
                title: i18n.t(cItem.meta.title),
                path: item.path + '/' + cItem.path
              }
            })
          }
        } else {
          return {
            title: i18n.t(item.meta.title),
            path: item.path
          }
        }
      })

      newMenuData = [...newMenuData, ...ret]

      store.commit('userMenuData/handleMenuData', newMenuData)

      // 生成动态路由数据
      let newChildrenRouter = [{
        path: '/',
        component: () => import(/* webpackChunkName: "layout" */ '../views/layouts/ElMainLayout.vue')
      }]

      res.data.forEach(item => {
        const ret = item.children.map(cItem => {
          return {
            path: item.path + '/' + cItem.path,
            component: () => import(`../views//${item.path}/${cItem.name}.vue`)
          }
        })
      })

      newChildrenRouter = [...newChildrenRouter, ...ret]

      // 添加到路由中的children里:
      // router.addRoute(父路由, 子路由)
      newChildrenRouter.forEach(item => {
        router.addRoute('mainlayout', item)
      })

      // 重走新路由
      next(to.path)

      return
    } catch (err) {

    }
  }

  next()
})

export default router
