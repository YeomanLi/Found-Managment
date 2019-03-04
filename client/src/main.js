import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import axios from 'axios'
import { Form, FormItem, Input, Select, Option, Button, Row } from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(Row.name, Row)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
// Vue.use(Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
