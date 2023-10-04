import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import navCollapse, { navCollapseState } from './navCollapse'
import userMenuData, { userMenuDataState } from './userMenuData'

Vue.use(Vuex)

interface RootState {
  // 根状态类型
  navCollapse: navCollapseState,
  userMenuData: userMenuDataState
}

const store: StoreOptions<RootState> = {
  state: {} as any,
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    navCollapse,
    userMenuData
  }
}

export default new Vuex.Store<RootState>(store)
