import { API_BASE_INFO } from '../../../../config'
import axios from '../../../service'

import {
  SET_INFO_LIST
} from './mutation-types'

const infoActions = {
  getAllInfo ({commit}) {
    return new Promise((resolve, reject) => {
      axios.post(`${ API_BASE_INFO }/`)
           .then(res => {
             console.log(res.data)
             commit(SET_INFO_LIST, res.data)
             resolve(res.data)
           })
           .catch(err => {
             reject(err)
           })
    })
  },

  deleteInfo({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${ API_BASE_INFO }/delete/${ payload }`)
           .then(res => {
             console.log(res)
             resolve('success')
           })
           .catch(err => {
             console.log(err)
             reject(err)
           })
    })
  }
}

export default infoActions