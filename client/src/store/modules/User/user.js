import { userActions } from './actions'
import { userMutations } from './mutations'
import { userGetters } from './getters'
export default {
  namespaced: true,
  state: {
    // isAuthenticated: false,
    // thisUser: {}
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    // thisUser: localStorage.getItem('user')
    thisUser: JSON.parse(localStorage.getItem('user'))
  },
  actions: Object.assign({}, userActions),
  mutations: Object.assign({}, userMutations),
  getters: Object.assign({}, userGetters)
}