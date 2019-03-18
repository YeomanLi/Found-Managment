import {
  SET_AUTHENTICATED,
  SET_USER,
} from './mutation-types'

export const userMutations = {
  [SET_AUTHENTICATED]: (state, payload) => {
    state.isAuthenticated = payload
  },

  [SET_USER]: (state, payload) => {
    if (payload)  state.thisUser = payload
    else  state.thisUser = {}
  }
}