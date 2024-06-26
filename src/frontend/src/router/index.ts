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
import Client from '@/components/ClientDesk.vue'
import ClientView from '@/views/ClientEmployee.vue'
import ClientEmployeeView from '@/views/EmployeeDesk.vue'
import ClientEmployee from '../components/ClientEmployeeView.vue'
import Kanban from '@/components/Kanban.vue'
import ManagerView from '@/views/ManagerView.vue'
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
      path: '/client/employee',
      name: 'client_employee',
      component: ClientEmployee
    },

    {
      path: '/testview',
      name: 'testview',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/manager-employees',
      name: 'manageremployees',
      component: () => import('@/views/ManagerEmployeesView.vue')
    },
    {
      path: '/manager-employees-t',
      name: 'manageremployees',
      component: () => import('@/views/ManageEmployeesT.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/views/Support.vue')
    },
    {
      path: '/manager',
      name: 'manager-view',
      component: ManagerView
    },
    {
      path: '/manager-edit-employee',
      name: 'managereditemployee',
      component: () => import('@/views/ManagerEditEmployee.vue')
    },
    {
      path: '/client-desk-view',
      name: 'client-desk-view',
      component: ClientEmployeeView
    },
    {
      path: '/jobAssignmentView',
      name: 'jobAssignmentView',
      component: () => import('@/views/ManagerJobAssignmentView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404Page.vue')
    },
    {
      path: '/client-employee-view',
      name: 'client-employee-view',
      component: ClientView
    },
    {
      path: '/jobCard',
      name: 'jobCard',
      component: () => import('@/components/JobCard.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue')
    }
  ]
})

export default router
