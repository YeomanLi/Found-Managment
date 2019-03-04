import axios from 'axios' 
import { API_BASE_USER } from '@/config'

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
           console.log(res)
           if (res.status == 200) { commit(LOGIN_SUCCESS, res.data) }
           else { commit(LOGIN_FAILURE, res.data) }
         })
  }
}