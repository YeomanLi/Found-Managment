import { userActions } from './actions'
import { userMutations } from './mutations'
import { userGetters } from './getters'
export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    thisUser: {}
  },
  actions: Object.assign({}, userActions),
  mutations: Object.assign({}, userMutations),
  getters: Object.assign({}, userGetters)
}