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
    return new Promise((resolve, reject) => {
      axios.post(`${ API_BASE_USER }/login`, loginUser)
           .then(res => resolve(res.status))
           .catch(err => reject(err.response.status))
    })
  },

  register({commit}, registerUser) {
    commit(REGISTER)
    return new Promise((resolve, reject) => {
      axios.post(`${ API_BASE_USER }/register`, registerUser)
           .then(res => resolve(res.status))
           .catch(err => reject(err.response.status))
    })
  }
}