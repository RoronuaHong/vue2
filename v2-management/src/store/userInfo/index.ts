import { getUserInfoApi } from '@/request/api'

export interface userInfoState {
  permissions: string[] | null;
  roles: string[] | null;
  user: string | null;
}

interface State {
  userInfo: userInfoState;
}

export default {
  namespaced: true,
  state (): State {
    const userInfoJson = localStorage.getItem('edb-userInfo')
    const userInfo: userInfoState = userInfoJson
      ? JSON.parse(userInfoJson)
      : {
          permissions: null,
          roles: null,
          user: null
        }

    return { userInfo }
  },
  mutations: {
    handleUserInfo (state: State, payload: userInfoState) {
      state.userInfo = payload
      localStorage.setItem('edb-userInfo', JSON.stringify(payload))
    }
  },
  actions: {
    async asyncHandleUserInfo ({ commit }: { commit: (mutation: string, payload?: any) => void }, payload: any) {
      try {
        const res = await getUserInfoApi()

        if (!res || !res.data) {
          return
        }

        const data: userInfoState = res.data

        commit('handleUserInfo', { ...data })
      } catch (error) {
        console.error('Error in asyncHandleUserInfo:', error)
      }
    }
  }
}
