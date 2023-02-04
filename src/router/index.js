import { createRouter, createWebHistory } from 'vue-router'
// import Index from '../views/Index.vue'
import doctorsRouter from '@/modules/doctors/router'
import authRouter from '@/modules/auth/router'

const routes = [
  {
    path: '/',
    ...authRouter
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/doctors',
    ...doctorsRouter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
