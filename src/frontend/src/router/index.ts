import { createRouter, createWebHistory } from 'vue-router'
import RegisterCompanyModal from '../components/RegisterCompanyModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register-modal',
      name: 'regmodal',
      component: RegisterCompanyModal
    },
    {
      path: '/register-modal2',
      name: 'regmodal2',
      component: RegisterCompanyModal2
    }
  ]
})

export default router
