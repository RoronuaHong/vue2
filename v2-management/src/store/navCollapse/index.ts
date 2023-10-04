export interface navCollapseState {
  isCollapse: boolean
}

export default {
  namespaced: true,
  state: {
    isCollapse: false
  },
  mutations: {
    toggleCollapse (state: navCollapseState) {
      // 取反
      state.isCollapse = !state.isCollapse
    }
  }
}
