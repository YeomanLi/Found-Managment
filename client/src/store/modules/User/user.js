import { userActions } from './actions'
import { userMutations } from './mutations'
export default {
  namespaced: true,
  state: {
    token: '',
    loginStatus: ''
  },
  actions: Object.assign({}, userActions),
  mutations: Object.assign({}, userMutations)
}