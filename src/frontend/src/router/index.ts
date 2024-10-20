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
import ManagerView from '@/views/ManagerView.vue'
import ProfilePage from '@/components/home/settings/profile/ProfilePage.vue'
import CompanySettings from '@/components/home/settings/company/CompanySettings.vue'
import EditCompany from '@/components/home/settings/company/EditCompany.vue'
import EditRoles from '@/components/home/settings/company/EditRoles.vue'
import EditStructure from '@/components/home/settings/company/EditStructure.vue'
import CompanySettingsView from '../views/settings/CompanySettings.vue'
import LoadingScreen from '@/components/home/misc/LoadingScreen.vue'
import StatisticsDashboard from '@/components/home/statistics/StatisticsDashboard.vue'
import StatisticView from '@/views/home/dashboard/StatisticView.vue'
import InventoryView from '@/views/home/inventory/InventoryView.vue'
import NotificationView from '@/views/notfications/NotificationView.vue'
import TeamworkLoad from '@/views/home/employees/TeamworkLoad.vue'
import ClientCenter from '@/views/home/clients/ClientCenter.vue'
import EmployeeCenter from '@/views/home/employees/EmployeeCenter.vue'
import InventoryCenter from '@/views/home/inventory/InventoryCenter.vue'
import TaskCenter from '@/views/home/jobs/TaskCenter.vue'
import ClientFeedback from '@/views/home/clients/ClientFeedback.vue'
import ReportView from '@/views/home/inventory/ReportView.vue'
import MessagesView from '@/views/notfications/MessagesView.vue'
import StockTakeManagementView from '@/views/home/inventory/StockTakeManagementView.vue'
import AppointmentsView from '@/views/notfications/AppointmentsView.vue'
import EditTags from '@/components/home/settings/company/EditTags.vue'
import EditPriority from '@/components/home/settings/company/EditPriority.vue'
import EditStatus from '@/components/home/settings/company/EditStatus.vue'
import TeamView from '@/views/home/teams/TeamView.vue'
import CompanyRequestView from '@/views/home/company/CompanyRequestView.vue'
import InvitesCompanyView from '@/views/home/company/InvitesCompanyView.vue'
import NewPasswordView from '@/views/signup/NewPasswordView.vue'
import ClientPortal from '@/views/home/clients/ClientPortalView.vue'
import InvoicesView from '@/views/home/invoices/InvoicesView.vue'
import InvoiceCenter from '@/views/home/invoices/InvoiceCenter.vue'
import HourlyRate from '@/components/home/settings/company/HourlyRate.vue'
import SetupPaymentGateway from '@/components/home/settings/company/SetupPaymentGateway.vue'
import SuccessfulPayment from '@/components/home/clients/client_portal/SuccessfulPayment.vue'
import VideoMeetings from '@/views/notfications/VideoMeetings.vue'
import GoogleMapsView from '@/views/home/map/GoogleMapsView.vue'
import NoAccess from '@/components/home/misc/NoAccess.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/manageremployees',
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
      path: '/notifications',
      name: 'notifications',
      component: NotificationView
    },
    {
      path: '/manageCompanies',
      name: 'manageCompanies',
      component: () => import('@/views/settings/ManageCompanies.vue')
    },
    {
      path: '/teamwork-load',
      name: 'teamwork-load',
      component: TeamworkLoad
    },
    {
      path: '/client-center',
      name: 'client-center',
      component: ClientCenter
    },
    {
      path: '/employee-center',
      name: 'employee-center',
      component: EmployeeCenter
    },
    {
      path: '/inventory-center',
      name: 'inventory-center',
      component: InventoryCenter
    },
    {
      path: '/task-center',
      name: 'task-center',
      component: TaskCenter
    },
    {
      path: '/client-feedback',
      name: 'client-feedback',
      component: ClientFeedback
    },
    {
      path: '/report-view',
      name: 'report-view',
      component: ReportView
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView
    },
    {
      path: '/stock-take',
      name: 'stock-take',
      component: StockTakeManagementView
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsView
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: () => import('@/components/home/help/tutorial/Tutorial.vue')
    },
    {
      path: '/edit-tags',
      name: 'edit-tags',
      component: EditTags
    },
    {
      path: '/edit-priority',
      name: 'edit-priority',
      component: EditPriority
    },
    {
      path: '/edit-status',
      name: 'edit-status',
      component: EditStatus
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamView
    },
    {
      path: '/company-requests',
      name: 'company-requests',
      component: CompanyRequestView
    },
    {
      path: '/company-invites',
      name: 'company-invites',
      component: InvitesCompanyView
    },
    {
      path: '/new-password',
      name: 'new-password',
      component: NewPasswordView
    },
    {
      path: '/splash/tutorial',
      name: 'splash-tutorial',
      component: () => import('@/components/signup/Tutorial.vue')
    },
    {
      path: '/backlog/archive',
      name: 'backlog-archive',
      component: () => import('@/views/home/jobs/Archive.vue')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/UserChats.vue'),
      props: {
        currentUser: `${localStorage.getItem('id')}`,
        onLogout: () => console.log('Logged out')
      }
    },
    {
      path: '/client-portal',
      name: 'client-portal',
      component: ClientPortal,
      props: (route) => ({ cid: route.query.cid })
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoicesView
    },
    {
      path: '/invoice-center',
      name: 'invoice-center',
      component: InvoiceCenter
    },
    {
      path: '/hourly-rate',
      name: 'hourly-rate',
      component: HourlyRate
    },
    {
      path: '/companySettingsView/setup-payment-gateway',
      name: 'setup-payment-gateway',
      component: SetupPaymentGateway
    },
    {
      path: '/client-portal/successful-payment',
      name: 'successful-payment',
      component: SuccessfulPayment
    },
    {
      path: '/video-meetings',
      name: 'video-meetings',
      component: VideoMeetings
    },
    {
      path: '/inv-kanban',
      name: 'invoice-kanban',
      component: () => import('@/views/home/invoices/InvoiceBacklog.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: GoogleMapsView
    },
    {
      path: '/chatHome',
      name: 'chatHome',
      component: () => import('@/views/home/chat/ChatHome.vue')
    },
    {
      path: '/no-access',
      name: 'no-access',
      component: NoAccess
    }
  ]
})
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  const currentEmployeeId = localStorage.getItem('employeeId')
  const currentCompanyId = localStorage.getItem('currentCompany')

  // Check if access token is available and if trying to access a protected route
  if (to.name !== 'splash' && !accessToken && to.name !== 'new-password' && to.name !== 'client-portal' && to.name !== 'successful-payment') {
    return next({ name: 'splash' }) // Redirect to splash page if no access_token
  }

  // If user is already logged in, prevent access to splash page
  if (to.name === 'splash' && accessToken && currentCompanyId && currentEmployeeId) {
    return next({ name: 'dashboard' }) // Redirect to dashboard if trying to access splash when logged in
  }

  // Allow navigation to 'splash' from 'no-access'
  // if (to.name === 'splash' && from.name === 'no-access') {
  //   return next() // Allow access to splash from no-access page
  // }

  // Check if the employeeId is missing and prevent access to restricted routes, except for 'no-access'
  // if (
  //   to.name !== 'no-access' &&
  //   to.name !== '' &&
  //   (currentEmployeeId === null || currentEmployeeId === undefined)
  // ) {
  //   return next({ name: 'no-access' }) // Redirect to no-access if no employeeId
  // }

  // Proceed to the intended route
  next()
})

export default router
