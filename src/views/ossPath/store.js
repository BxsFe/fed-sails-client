import { gen } from '@/api'

const ossPath = gen.create('ossPath')
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
        state.detail = Object.assign({}, detail)
      } else {
        state.isNew = true
        state.detail = {}
      }
    }
  },
  actions: {
    getTableList({ state }, { page }) {
      return ossPath.list(page)
    },
    createOsskey({ state }, params) {
      return ossPath.create(params)
    },
    deleteOsskey({ state }, { id }) {
      return ossPath.delete(id)
    },
    updateOsskey({ state }, { id, form}) {
      return ossPath.update(id, form)
    }
  }
}
