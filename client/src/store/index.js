import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/User/user'
import info from './modules/Info/info'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules: {
    user,
    info
  }
})