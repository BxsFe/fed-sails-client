import { gen } from '@/api'

const osskey = gen.create('osskey')
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
      return osskey.list(page)
    },
    createOsskey({ state }, params) {
      return osskey.create(params)
    },
    deleteOsskey({ state }, { id }) {
      return osskey.delete(id)
    },
    updateOsskey({ state }, { id, form}) {
      return osskey.update(id, form)
    }
  }
}
