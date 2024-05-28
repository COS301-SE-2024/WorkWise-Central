import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: SplashView
    }
  ]
})

export default router
