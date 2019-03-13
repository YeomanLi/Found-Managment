import axios from 'axios'
import router from './router'
import { Loading, Message } from 'element-ui'

let loading

const options = {
  text: '正在为您加载......',
  lock: true,
  background: 'rgba(0, 0, 0, 0.7)'
}

function startLoading () {
  loading = Loading.service(options)
}

function endLoading () {
  loading.close()
}

axios.interceptors.request.use(config => {
  const isLogin = localStorage.userToken
  startLoading()
  if (isLogin)  config.headers.Authorization = localStorage.userToken
  return config
}, error => Promise.reject(error))

axios.interceptors.response.use(response => {
  endLoading()
  return response
}, error => {
  Message.error(error.response.data)
  const { status } = error.response
  if (401 == status) {
    Message.error('身份过期，请重新登录')
    localStorage.removeItem('userToken')
    router.push('/login')
  } else if (404 == status) {
    Message.error('异常, 请检查您的网络')
  }
})

export default axios