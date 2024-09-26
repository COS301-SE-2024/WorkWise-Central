<script setup lang="ts">
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import
import UserAvatar from './UserAvatar.vue'
const isVisible = ref(false)
// const drawer = ref(true)

const open = ref(['Dashboard'])

const CommunicationSubItems = ref([
  {
    title: 'Chats',
    icon: 'fa: fa-solid fa-comments',
    routeName: 'chatHome'
  },
  { title: 'Meetings', icon: 'fa: fa-solid fa-video', routeName: 'appointments' }
])

const invoicesSubItems = ref([
  { title: 'Invoice Details', icon: 'fa: fa-solid fa-table', routeName: 'invoices' },
  { title: 'Invoice Board', icon: 'fa: fa-solid fa-table-columns', routeName: 'invoice-kanban' }
])


const companySubItems = ref([
  { title: 'Company Settings', icon: 'fa: fa-solid fa-cog', routeName: 'companySettingsView' },
  {
    title: 'Join Requests',
    icon: 'fa: fa-solid fa-person-circle-question',
    routeName: 'company-requests'
  }
])

const jobSubItems = ref([
  { title: 'Job Details', icon: 'fa: fa-solid fa-table', routeName: 'jobAssignmentView' },
  { title: 'Job Board', icon: 'fa: fa-solid fa-table-columns', routeName: 'backlog' }
])

// const dashboardSubItems = ref([
//   { title: 'Calender', icon: 'fa: fa-solid fa-house', routeName: 'dashboard' },
//   { title: 'Statistics', icon: 'fa: fa-solid fa-chart-line', routeName: 'statisticView' }
// ])

// const clientSubItems = ref([
//   { title: 'Management', icon: 'fa: fa-solid fa-table', routeName: 'client-desk-view' },

//   { title: 'Customer Feedback', icon: 'fa: fa-solid fa-comment', routeName: 'client-feedback' }
// ])
// const employeeSubItems = ref([
//   { title: 'Management', icon: 'fa: fa-solid fa-table', routeName: 'manageremployees' },
//   { title: 'Teams', icon: 'fa: fa-solid fa-users', routeName: 'teams' }
// ])
// const teamSubItems = ref([{ title: 'Management' }])
// const inventorySubItems = ref([
//   { title: 'Management', icon: 'fa: fa-solid fa-table', routeName: 'inventory' },
//   {
//     title: 'Stock Take',
//     icon: 'fa: fa-solid fa-chart-line',
//     routeName: 'stock-take'
//   },
//   {
//     title: 'Movements',
//     icon: 'fa: fa-solid fa-bars-progress',
//     routeName: 'report-view'
//   }
// ])
// const FleetSubItems = ref([{ title: 'Map', icon: 'fa: fa-solid fa-map', routeName: 'map' }])

// const supportSubItems = ref([
//   { title: 'Support', icon: 'fa: fa-solid fa-headset', routeName: 'support' }
// ])
// const filterClientSubItems = ref(clientSubItems.value.filter((item) => item.title === 'Management'))
// const filterInventorySubItems = ref(
//   inventorySubItems.value.filter((item) => item.title === 'Management')
// )
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import
import ProfilePage from './settings/profile/ProfilePage.vue'
import DarkModeToggleVue from './settings/DarkModeToggle.vue'
import CompanyMain from './settings/company/CompanyMain.vue'
import axios from 'axios'
import { API_URL } from '@/main'

export default defineComponent({
  name: 'NavigationBar',
  props: {
    component: {
      type: Object as PropType<any>
    }
  },
  components: {
    ProfilePage,
    DarkModeToggleVue,
    CompanyMain
  },
  data: () => ({
    isdarkmode: localStorage.getItem('theme') === 'true',
    logoutDialog: false,
    selected: '',
    new_notification: false,
    employeePermissions: [] as string[],
  }),
  methods: {
    redirectToDashBoard() {
      if (this.$route.path !== '/dashboard') this.$router.push('/dashboard')
    },
    redirectToArchivePage() {
      this.$router.push('/backlog/archive')
    },
    toggleDarkMode() {
      console.log(this.isdarkmode)
      if (this.isdarkmode) {
        this.isdarkmode = false
        console.log(this.isdarkmode)
      } else {
        this.isdarkmode = true
        console.log(this.isdarkmode)
      }
      localStorage.setItem('theme', this.isdarkmode.toString()) // save the theme to session storage
    },
    setInbox(inbox: string) {
      this.selected = inbox
    },
    async getEmployeePermissions() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      axios
        .get(`${API_URL}employee/detailed/id/${localStorage.getItem('employeeId')}`, config)
        .then((response) => {
          console.log(response)
          console.log(response.data.data)
          localStorage.setItem('roleId', response.data.data.role._id)
          this.employeePermissions = response.data.data.role.permissionSuite
        })
        .catch((error) => {
          console.error('Failed to fetch employees:', error)
        })
    },
    checkPermission(permission: string) {
      return this.employeePermissions.includes(permission)
    },
    notificationCheck() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      axios
        .get(`${API_URL}notification/new-notifications`, config)
        .then((res) => {
          console.log('new notification check')
          this.new_notification = res.data.data
        })
        .catch((error) => {
          console.error('Failed to fetch employees:', error)
        })
    }
  },
  mounted() {
    this.getEmployeePermissions()
    this.notificationCheck()
  }
})
</script>

<template>
  <v-app :theme="isdarkmode ? 'dark' : 'light'">
    <v-app-bar :theme="isdarkmode ? 'dark' : 'light'" app class="bg-background">
      <v-app-bar-nav-icon @click="isVisible = !isVisible">
        <v-icon>{{ isVisible ? 'fa: fa-solid fa-bars' : 'fa: fa-solid fa-bars' }}</v-icon>
      </v-app-bar-nav-icon>
      <CompanyMain />
      <v-spacer></v-spacer>

      <v-toolbar-title class="d-flex justify-center" @click="redirectToDashBoard">
        <v-label class="text-primary h4">Work</v-label>
        <v-label class="text-secondary h4">Wise</v-label>
      </v-toolbar-title>

      <v-spacer class="d-none d-sm-flex"></v-spacer>

      <div class="d-flex align-center">
        <v-btn size="small" @click="redirectToArchivePage" v-if="$route.path === '/backlog'">
          <v-icon size="x-large">{{ 'fa: fa-solid fa-box-archive' }}</v-icon>
        </v-btn>
        <UserAvatar />
        <v-icon
          class="icon-padding mr-5"
          @click="toggleDarkMode"
          :icon="isdarkmode ? 'fa: fa-solid fa-sun' : 'fa: fa-solid fa-moon'"
        ></v-icon>
      </div>
    </v-app-bar>
    <v-navigation-drawer class="bg-background " app v-model="isVisible" min-height="100%" width="300">
      <v-list v-model:open="open">
        <v-list-group fluid value="Dashboard">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-house"
              title="Dashboard"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            class="list-item-large"
            to="dashboard"
            value="Calender"
            title="Calender"
            prepend-icon="fa: fa-solid fa-calendar-days"
          ></v-list-item>
          <v-list-item
            class="list-item-large"
            to="statisticView"
            value="Statistics"
            title="Statistics"
            prepend-icon="fa: fa-solid fa-chart-pie"
            v-show="checkPermission('view statistics')"
          ></v-list-item>
        </v-list-group>
      </v-list>

      <v-list
        v-model:open="open"
        v-show="checkPermission('view all clients') || checkPermission('view clients under me')"
      >
        <v-list-group fluid value="Clients">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-handshake"
              title="Clients"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            class="list-item-large"
            to="client-desk-view"
            value="Client details"
            title="Client details"
            prepend-icon="fa: fa-solid fa-table"
            v-show="checkPermission('view all clients') || checkPermission('view clients under me')"
          ></v-list-item>
          <v-list-item
            class="list-item-large"
            to="client-feedback"
            value="Customer Feedback"
            title="Customer Feedback"
            prepend-icon="fa: fa-solid fa-comment"
            v-show="checkPermission('view customer feedback')"
          ></v-list-item>
        </v-list-group>
      </v-list>

      <v-list
        v-model:open="open"
      >
        <v-list-group fluid value="Employees">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-users"
              title="Employees"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            class="list-item-large"
            to="manageremployees"
            value="Employee details"
            title="Employee details"
            prepend-icon="fa: fa-solid fa-table"
            v-show="checkPermission('view all employees') || checkPermission('view employees under me')"
          ></v-list-item>
          <v-list-item
            class="list-item-large"
            to="teams"
            value="Teams"
            title="Teams"
            prepend-icon="fa: fa-solid fa-people-group"
            v-show="checkPermission('view teams')"
          ></v-list-item>
        </v-list-group>
      </v-list>

      <v-list v-model:open="open" v-show="checkPermission('view all jobs') || checkPermission('view jobs under me') || checkPermission('view jobs assigned to me')">
        <v-list-group fluid value="Jobs">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-briefcase"
              title="Jobs"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in jobSubItems"
            :key="i"
            :to="{ name: item.routeName }"
            :value="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            @click="setInbox(item.title)"
          ></v-list-item>
        </v-list-group>
      </v-list>

      <v-list v-model:open="open"  v-show="checkPermission('view invoices')">
        <v-list-group fluid value="Invoices">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-file"
              title="Invoices"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in invoicesSubItems"
            :key="i"
            :to="{ name: item.routeName }"
            :value="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            @click="setInbox(item.title)"
          ></v-list-item>
        </v-list-group>
      </v-list>

      <v-list v-model:open="open">
        <v-list-group fluid value="Inventory">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-boxes"
              title="Inventory"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            class="list-item-large"
            to="inventory"
            value="Inventory Details"
            title="Inventory Details"
            prepend-icon="fa: fa-solid fa-table"
            v-show="checkPermission('view all inventory')"
          ></v-list-item>
          <v-list-item
            class="list-item-large"
            to="stock-take"
            value="Stock Take"
            title="Stock Take"
            prepend-icon="fa: fa-solid fa-clipboard"
            v-show="checkPermission('record stock take')"
          ></v-list-item>
          <v-list-item
            class="list-item-large"
            to="report-view"
            value="Movements"
            title="Movements"
            prepend-icon="fa: fa-solid fa-people-carry-box"
            v-show="checkPermission('view movements')"
          ></v-list-item>
        </v-list-group>
      </v-list>

      <v-list-item
        class="list-item-large"
        to="map"
        value="Fleet"
        title="Fleet"
        prepend-icon="fa: fa-solid fa-truck"
        v-show="checkPermission('view fleet')"
      ></v-list-item>

      <v-list v-model:open="open">
        <v-list-group fluid value="Communication">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-address-book"
              title="Social"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in CommunicationSubItems"
            :key="i"
            :to="{ name: item.routeName }"
            :value="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            @click="setInbox(item.title)"
          ></v-list-item>
        </v-list-group>
      </v-list>
      <v-list-item
        class="list-item-large"
        to="notifications"
        value="Notifications"
        title="Notifications"
        prepend-icon="fa: fa-solid fa-bell"
      >
        <!--        <v-list-item-title> Notifications </v-list-item-title>-->
        <template v-slot:append>
          <v-icon
            color="light-green-accent-4"
            :style="{ fontSize: '10px' }"
            size="x-small"
            v-if="new_notification"
            >mdi-circle</v-icon
          >
        </template>
      </v-list-item>

      <v-list-item
        class="list-item-large"
        to="support"
        value="Help"
        title="Help"
        prepend-icon="fa: fa-solid fa-circle-question"
      ></v-list-item>

      <v-list v-model:open="open" v-show="checkPermission('company settings') === true">
        <v-list-group fluid value="company">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa: fa-solid fa-building"
              title="Admin"
              class="list-item-large"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in companySubItems"
            :key="i"
            :to="{ name: item.routeName }"
            :value="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            @click="setInbox(item.title)"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <component :is="component" />
    </v-main>
  </v-app>
</template>

<style scoped>
.icon-padding {
  padding: 8px; 
}

.list-item-large {
  height: 70px; 
}

.list-item-small {
  height: 40px; 
}
</style>
