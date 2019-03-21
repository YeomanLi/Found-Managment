import axios from '../../../service'
import { API_BASE_USER, isEmpty } from '../../../../config'
import jwt_decode from 'jwt-decode'

import {
  SET_AUTHENTICATED,
  SET_USER,
  LOG_OUT
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
      commit(LOG_OUT)
      resolve('success')
    })
  }
}