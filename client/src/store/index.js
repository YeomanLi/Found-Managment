import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/User/user'
// import info from './modules/info'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    // info
  }
})