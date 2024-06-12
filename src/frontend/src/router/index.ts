import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import RegisterCompanyModal from '@/components/RegisterCompanyModal.vue'
import JoinCompanyModal from '@/components/JoinCompanyModal.vue'
import AddClient from '@/components/AddClient.vue'
import AddEmployee from '@/components/AddEmployee.vue'
import JobDetailsModal from '@/components/JobDetailsModal.vue'
import AddJob from '@/components/AddJob.vue'
import Modals from '@/views/Modals.vue'
import Calendar from '@/components/Calendar.vue'
import Kanban from '@/components/Kanban.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/kanban',
      name: 'kanban',
      component: Kanban
    },
    {
      path: '/register-company',
      name: 'registercompany',
      component: RegisterCompanyModal
    },
    {
      path: '/join-company',
      name: 'joincompany',
      component: JoinCompanyModal
    },
    {
      path: '/add-client',
      name: 'addclient',
      component: AddClient
    },
    {
      path: '/add-employee',
      name: 'addemployee',
      component: AddEmployee
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/add-job',
      name: 'addjob',
      component: AddJob
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
    },
    {
      path: '/client',
      name: 'client',
      component: Client
    },

    {
      path: '/testview',
      name: 'testview',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/manager-employees',
      name: 'manageremployees',
      component: () => import('@/views/ManagerEmployeesView.vue')
    }
  ]
})

export default router
