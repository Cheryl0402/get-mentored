import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home')
  },
  {
    path: '/mentor-login',
    name: 'mentor-login',
    component: () => import('../components/mentor/Login'),
    meta: { guest: true }
  },
  {
    path: '/mentee-login',
    name: 'mentee-login',
    component: () => import('../components/mentee/Login'),
    meta: { guest: true }
  },
  {
    path: '/mentor-register',
    name: 'mentor-register',
    component: () => import('../components/mentor/Register'),
    meta: { guest: true }
  },
  {
    path: '/mentee-register',
    name: 'mentee-register',
    component: () => import('../components/mentee/Register'),
    meta: { guest: true }
  },
  {
    path: '/career',
    name: 'career',
    component: () => import('../components/Career')
  },
  {
    path: '/mentor',
    name: 'mentor',
    component: () => import('../components/Mentor')
  },
  {
    path: '/mentor-profile',
    name: 'mentor-profile',
    component: () => import('../components/mentor/Profile'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mentee-profile',
    name: 'mentee-profile',
    component: () => import('../components/mentee/Profile'),
    meta: { requiresAuth: true }
  },
  {
    path: '/career/:id',
    name: 'career-detail',
    component: () => import('../components/CareerDetail')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window.localStorage.getItem('mentor-jwt') == null && window.localStorage.getItem('mentee-jwt') == null) {
      next('/')
      return
    }
    next()
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (window.localStorage.getItem('mentor-jwt') != null) {
      next('/mentor-profile')
      return
    }
    if (window.localStorage.getItem('mentee-jwt') != null) {
      next('/mentee-profile')
      return
    }
    next()
  } else {
    next()
  }
})
export default router
