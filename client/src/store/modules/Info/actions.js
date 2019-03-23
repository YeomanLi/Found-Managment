import { API_BASE_INFO } from '../../../../config'
import axios from '../../../service'

const infoActions = {
  getAllInfo (state) {
    return new Promise((resolve, reject) => {
      axios.post(`${ API_BASE_INFO }/`)
           .then(res => {
             console.log('resolve!')
             resolve(res)
           })
           .catch(err => {
             console.log('reject!')
             reject(err)
           })
    })
  }
}

export default infoActions