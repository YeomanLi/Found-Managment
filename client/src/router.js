import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import NotFound from './views/404.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import FoundList from './views/FoundList.vue'
import TestPage from './views/test.vue'

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
      meta: { requiresAuth: true },
      children: [
        // { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/profile', name: 'profile', component: Profile },
        { path: '/foundlist', name: 'foundlist', component: FoundList }
      ]
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
      path: '/test',
      name: 'test',
      component: TestPage,
      meta: { requiresAuth: true }
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