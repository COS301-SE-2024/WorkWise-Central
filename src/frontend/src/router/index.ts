import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/signup/SplashView.vue'

import RegisterCompanyModal from '@/components/signup/RegisterCompanyModal.vue'
import JoinCompanyModal from '@/components/signup/JoinCompanyModal.vue'
import AddClient from '@/components/home/clients/management/AddClient.vue'
import AddEmployee from '@/components/home/employees/management/AddEmployee.vue'
import JobDetailsModal from '@/components/JobDetailsModal.vue'
import AddJob from '@/components/home/jobs/management/AddJob.vue'
import Modals from '@/views/Modals.vue'
import Calendar from '@/components/home/dashboard/home/Calendar.vue'
import Client from '@/components/home/clients/management/ClientDesk.vue'
import ClientView from '@/views/ClientEmployee.vue'
import ClientEmployeeView from '@/views/home/employees/EmployeeDesk.vue'
import ClientEmployee from '@/components/ClientEmployeeView.vue'
import Dashboard from '@/views/home/dashboard/DashboardView.vue'
import Kanban from '@/components/home/jobs/Kanban.vue'
import ManagerView from '@/views/ManagerView.vue'
import ProfilePage from '@/components/home/settings/profile/ProfilePage.vue'
import CompanySettings from '@/components/home/settings/company/CompanySettings.vue'
import EditCompany from '@/components/home/settings/company/EditCompany.vue'
import EditRoles from '@/components/home/settings/company/EditRoles.vue'
import EditStructure from '@/components/home/settings/company/EditStructure.vue'
import CompanySettingsView from '../views/settings/CompanySettings.vue'
import LoadingScreen from '@/components/misc/LoadingScreen.vue'
import StatisticsDashboard from '@/components/home/statistics/StatisticsDashboard.vue'
import StatisticView from '@/views/home/dashboard/StatisticView.vue'
import InventoryView from '@/views/home/inventory/InventoryView.vue'
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
      path: '/manager-employees-t',
      name: 'manageremployees',
      component: () => import('@/views/home/employees/ManageEmployees.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/views/home/help/Support.vue')
    },
    {
      path: '/manager',
      name: 'manager-view',
      component: ManagerView
    },
    {
      path: '/client-desk-view',
      name: 'client-desk-view',
      component: ClientEmployeeView
    },
    {
      path: '/jobAssignmentView',
      name: 'jobAssignmentView',
      component: () => import('@/views/home/jobs/ManagerJobAssignmentView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/error/404Page.vue')
    },
    {
      path: '/client-employee-view',
      name: 'client-employee-view',
      component: ClientView
    },
    {
      path: '/managerJobCard',
      name: 'managerJobCard',
      component: () => import('../components/home/jobs/management/ManagerJobCard.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/email-confirmation',
      name: 'email-confirm',
      component: () => import('@/views/emailConfirmation/EmailConfirmation.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/userSettings',
      name: 'userSettings',
      component: () => import('@/views/settings/UserSettings.vue')
    },
    {
      path: '/companySettings',
      name: 'companySettings',
      component: CompanySettings
    },
    {
      path: '/companySettingsView/editCompany',
      name: 'editCompany',
      component: EditCompany
    },
    {
      path: '/companySettingsView/editRoles',
      name: 'editRoles',
      component: EditRoles
    },
    {
      path: '/companySettingsView/editStructure',
      name: 'editStructure',
      component: EditStructure
    },
    {
      path: '/companySettingsView',
      name: 'companySettingsView',
      component: CompanySettingsView
    },
    {
      path: '/loading',
      name: 'loading',
      component: LoadingScreen
    },
    {
      path: '/backlog',
      name: 'backlog',
      component: () => import('@/views/home/jobs/BackLogView.vue')
    },
    {
      path: '/notificationSettings',
      name: 'notificationSettings',
      component: () => import('@/views/settings/NotificationSettings.vue')
    },
    {
      path: '/preferenceSettings',
      name: 'preferenceSettings',
      component: () => import('@/views/settings/PreferenceSettings.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsDashboard
    },
    {
      path: '/statisticView',
      name: 'statisticView',
      component: StatisticView
    },
    {
      path: '/dummy-kanban',
      name: 'dummy-kanban',
      component: () => import('@/components/home/jobs/KanbanV2/KanbanV2.vue')
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView
    },
    {
      path: '/manageCompanies',
      name: 'manageCompanies',
      component: () => import('@/views/settings/ManageCompanies.vue')
    }
  ]
})

export default router
