import { userActions } from './actions'
import { userMutations } from './mutations'
import { userGetters } from './getters'
export default {
  namespaced: true,
  state: {
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    thisUser: JSON.parse(localStorage.getItem('user'))
  },
  actions: userActions,
  mutations: userMutations,
  getters: userGetters
}