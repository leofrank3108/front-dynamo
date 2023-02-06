import { createRouter, createWebHistory } from 'vue-router'
import doctorsRouter from '@/modules/doctors/router'
import authRouter from '@/modules/auth/router'

const routes = [
  {
    path: '/',
    ...authRouter
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
