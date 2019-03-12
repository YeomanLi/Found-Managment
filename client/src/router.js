import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import NotFound from './views/404.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

Vue.use(Router)
const router = new Router({
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
      component: Index,
      meta: { requiresAuth: true }
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },
    
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log(localStorage.userToken)
    const isLogin = localStorage.userToken
    if (isLogin) {
      next()
    } else {
      next({
        path: '/login',
        // query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
export default router