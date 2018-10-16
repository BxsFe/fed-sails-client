import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import adminurl from '@/views/admin-url/store'
import osskey from '@/views/osskey/store'
import upload from '@/views/upload/store'
import ossPath from '@/views/ossPath/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    upload,
    osskey,
    ossPath,
    'admin-url': adminurl
  },
  getters
})

export default store
