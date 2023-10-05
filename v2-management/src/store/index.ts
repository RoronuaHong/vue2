import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import userInfo, { userInfoState } from './userInfo'
import navCollapse, { navCollapseState } from './navCollapse'
import userMenuData, { userMenuDataState } from './userMenuData'

Vue.use(Vuex)

interface RootState {
  // 根状态类型
  navCollapse: navCollapseState,
  userMenuData: userMenuDataState,
  userInfo: userInfoState
}

const store: StoreOptions<RootState> = {
  state: {} as any,
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userInfo,
    navCollapse,
    userMenuData
  }
}

export default new Vuex.Store<RootState>(store)
