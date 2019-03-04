const actions = require('./actions')
const mutations = require('./mutations')
export default {
  namespace: true,
  state: {
    token: ''
  },
  actions,
  mutations
}