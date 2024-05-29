import { createRouter, createWebHistory } from 'vue-router'
import RegisterCompanyModal from '../components/RegisterCompanyModal.vue'
import RegisterCompanyModal2 from '../components/RegisterCompanyModal2.vue'
import JoinCompanyModal from '../components/JoinCompanyModal.vue'
import ClientDetails from '../components/ClientDetails.vue'
import AddEmployee from '/src/components/AddEmployee.vue'
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
    },
    {
      path: '/join',
      name: 'join',
      component: JoinCompanyModal
    },
    {
      path: '/client-details',
      name: 'client-details',
      component: ClientDetails
    },
    {
      path: '/add-employee',
      name: 'add-employee',
      component: AddEmployee
    }
  ]
})

export default router
