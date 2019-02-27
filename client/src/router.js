import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import NotFound from './views/404.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },

    {
      path: '/index',
      name: 'index',
      component: Index
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },
    
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    },
  ]
})
