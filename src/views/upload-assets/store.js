import { gen } from '@/api'

const ossPath = gen.create('ossPath')
export default {
  namespaced: true,
  state: {
    ossPaths: [],
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
    getOssPath({ state }) {
      return ossPath.list().then(res => {
        if (res.code === 200) {
          state.ossPaths = res.data
        } else {
          throw new Error(res.message || '获取ossPath失败')
        }
      })
    }
  }
}
