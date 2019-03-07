import axios from 'axios' 
import { API_BASE_USER } from '../../../../config'

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

export const userActions = {
  login({commit}, loginUser) {
    commit(LOGIN)
    axios.post(`${ API_BASE_USER }/login`, loginUser)
         .then(res => {
           const { token } = res.data
           if (res.status == 200) { commit(LOGIN_SUCCESS, token) }
           else { commit(LOGIN_FAILURE, res.data) }
         })
  },

  register({commit}, registerUser) {
    commit(REGISTER)
    axios.post(`${ API_BASE_USER }/register`, registerUser)
         .then(res => {
           if (res.status == 200) { commit(REGISTER_SUCCESS, res) }
           else { commit(REGISTER_FAILURE, res) }
         })
  }
}