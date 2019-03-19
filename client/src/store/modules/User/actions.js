import axios from '../../../service'
import { API_BASE_USER, isEmpty } from '../../../../config'
import jwt_decode from 'jwt-decode'

import {
  // GET_USER_INFO,
  // GET_USER_INFO_SUCCESS,
  // GET_USER_INFO_FAILURE,

  SET_AUTHENTICATED,
  SET_USER
} from './mutation-types'

export const userActions = {
  login({commit}, loginUser) {
    return new Promise((resolve, reject) => {
    axios.post(`${ API_BASE_USER }/login`, loginUser)
           .then(res => {
             const { token } = res.data
             localStorage.setItem('userToken', token)
             const decodedJwt = jwt_decode(token)
             commit(SET_AUTHENTICATED, !isEmpty(decodedJwt))
             commit(SET_USER, decodedJwt)
             resolve(res.status)
           })
           .catch(err => reject(err.response.status))
          // .catch(err => console.log(err))
    })
  },

  register({commit}, registerUser) {
    return new Promise((resolve, reject) => {
      axios.post(`${ API_BASE_USER }/register`, registerUser)
           .then(res => resolve(res.status))
           .catch(err => reject(err.response.status))
    })
  },

  logout({commit}) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('userToken')
      commit(SET_AUTHENTICATED, false)
      commit(SET_USER, null)
      resolve('success')
    })
  }
}