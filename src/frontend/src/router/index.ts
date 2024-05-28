import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import SplashView from '../views/SplashView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name:'home',
      component: SplashView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path:'/signup',
      name:'signup',
      component: SignupView
    }
  ]
})

export default router
