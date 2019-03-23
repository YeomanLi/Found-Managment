import {
  SET_INFO_LIST
} from './mutation-types'
const infoMutations = {
  [SET_INFO_LIST]: (state, payload) => {
    state.infoList = payload
  }
}
export default infoMutations