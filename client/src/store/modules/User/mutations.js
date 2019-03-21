import {
  SET_AUTHENTICATED,
  SET_USER,
  LOG_OUT
} from './mutation-types'

export const userMutations = {
  [SET_AUTHENTICATED]: (state, payload) => {
    state.isAuthenticated = payload
  },

  [SET_USER]: (state, payload) => {
    if (payload) {
      state.thisUser = payload
      localStorage.setItem('user', JSON.stringify(payload))
      localStorage.setItem('isAuthenticated', true)
    } 
    else {
      state.thisUser = {}
      localStorage.setItem('isAuthenticated', false)
    } 
  },

  [LOG_OUT]: state => {
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userToken')
  }
}