import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import adminurl from '@/views/admin-url/store'
import osskey from '@/views/osskey/store'
import ossPath from '@/views/ossPath/store'
import registry from '@/views/registry/store'
import uploadImage from '@/views/upload-image/store'
import uploadAssets from '@/views/upload-image/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    osskey,
    ossPath,
    registry,
    'admin-url': adminurl,
    'upload-image': uploadImage,
    'upload-assets': uploadAssets
  },
  getters
})

export default store
