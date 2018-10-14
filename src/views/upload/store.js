// import { listMallPromotionModule } from '@/api'
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
    // 获取table的列表页
    // getTableList({ state }, { page }) {
    //   return listMallPromotionModule(page).then(res => {
    //     // 在这里洗数据
    //     return res
    //   })
    // }
  }
}
