import { gen } from '@/api'

const registry = gen.create('registry')
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
      return registry.list(page)
    },
    createOsskey({ state }, params) {
      return registry.create(params)
    },
    deleteOsskey({ state }, { id }) {
      return registry.delete(id)
    },
    updateOsskey({ state }, { id, form}) {
      return registry.update(id, form)
    }
  }
}
