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

import { state } from './user'
export const userMutations = {
  [LOGIN]: state => {
    console.log('is loging...')
  },

  [LOGIN_SUCCESS]: (state, payload) => {
    state.token = payload
    console.log(state.token)
    state.loginStatus = LOGIN_SUCCESS
  },

  [LOGIN_FAILURE]: (state, payload) => {
    console.log('failure mutation')
    console.log(payload)
    state.loginStatus = LOGIN_FAILURE
  },

  [REGISTER]: state => {
    console.log('pending...')
  },

  [REGISTER_SUCCESS]: (state, payload) => {
    console.log('success!')
    console.log(payload)
  },

  [REGISTER_FAILURE]: (state, payload) => {
    console.log('error')
    console.log(payload)
  }
}