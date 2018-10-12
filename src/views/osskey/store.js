import { getOsskeyList, createOsskey } from '@/api'
export default {
  namespaced: true,
  state: {
    isNew: false,
    detail: {}
  },
  getters: {},
  mutations: {
    setDetail(state, detail) {
      if (detail) {
        state.isNew = false
        const temp = Object.assign({}, detail)
        temp.times = [detail.startTime, detail.endTime]
        state.detail = temp
      } else {
        state.isNew = true
        state.detail = {}
      }
    }
  },
  actions: {
    getTableList({ state }, { page }) {
      return getOsskeyList(page)
    },
    createOsskey({ state }, params) {
      return createOsskey(params)
    }
  }
}
