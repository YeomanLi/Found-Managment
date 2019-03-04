import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_WARNING,

  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
} from './mutation-types'

export const userMutations = {
  [LOGIN]: state => {
    console.log('is loging...')
  },

  [LOGIN_SUCCESS]: (state, payload) => {
    console.log('success mutation')
    console.log(payload)
  },

  [LOGIN_FAILURE]: (state, payload) => {
    console.log('failure mutation')
    console.log(payload)
  }
}