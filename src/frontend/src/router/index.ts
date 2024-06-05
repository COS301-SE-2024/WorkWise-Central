import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'

import RegisterCompanyModal from '../components/RegisterCompanyModal.vue'
import JoinCompanyModal from '../components/JoinCompanyModal.vue'
import ClientDetails from '../components/ClientDetails.vue'
import AddEmployee from '../components/AddEmployee.vue'
import JobDetailsModal from '../components/JobDetailsModal.vue'
import JobDetailsList from '../components/JobDetailsList.vue'
import Modals from '../views/Modals.vue'

import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register-modal',
      name: 'regmodal',
      component: RegisterCompanyModal
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
    },
    {
      path: '/job-details',
      name: 'job-details',
      component: JobDetailsList
    },
    {
      path: '/details-of-job',
      name: 'detailsofjob',
      component: JobDetailsModal
    },
    {
      path: '/',
      name: 'splash',
      component: SplashView
    },
    {
      path: '/modals',
      name: 'modals',
      component: Modals
    }
    {
      path: '/testview',
      name: 'testview',
      component: TestView
    }
  ]
})

export default router
