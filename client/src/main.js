import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from './service'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faServer, faMoneyBillAlt, faSitemap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 
import {
  Icon,
  Form, FormItem, 
  Input, Select, 
  Option, Button, 
  Row, Col, 
  Dropdown, DropdownMenu, DropdownItem,
  Menu, Submenu, MenuItem,
  Table, TableColumn,
  DatePicker
 } from 'element-ui'
library.add(faServer, faMoneyBillAlt, faSitemap)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// Vue.use(Button)
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Icon.name, Icon)
Vue.component('fai', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
