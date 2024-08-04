<script setup lang="ts">
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import
import UserAvatar from './UserAvatar.vue'
const isVisible = ref(true)
const drawer = ref(true)

const open = ref(['Dashboard'])

const dashboardSubItems = ref([
  { title: 'Calender', icon: 'fa: fa-solid fa-house', routeName: 'dashboard' },
  { title: 'Statistics', icon: 'fa: fa-solid fa-chart-line', routeName: 'statisticView' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' }
])

const clientSubItems = ref([
  { title: 'Management', icon: 'fa: fa-solid fa-user-tie', routeName: 'client-desk-view' },
  { title: 'Client Center', icon: 'fa: fa-brands fa-centercode', routeName: 'client-center' },
  { title: 'Customer Feedback', icon: 'fa: fa-solid fa-comment', routeName: 'client-feedback' }
])

const employeeSubItems = ref([
  { title: 'Employee Center', icon: 'fa: fa-solid fa-circle-user', routeName: 'employee-center' },
  { title: 'Management', icon: 'fa: fa-solid fa-user-tie', routeName: 'manageremployees' },
  { title: 'Team Workload', icon: 'fa: fa-solid fa-users', routeName: 'teamwork-load' }
])

const jobSubItems = ref([
  { title: 'Job Center', icon: 'fa: fa-solid fa-list-check', routeName: 'task-center' },
  { title: 'Management', icon: 'fa: fa-solid fa-user-tie', routeName: 'jobAssignmentView' },
  { title: 'Job Board', icon: 'fa: fa-solid fa-table', routeName: 'backlog' }
])

const inventorySubItems = ref([
  {
    title: 'Inventory Center',
    icon: 'fa: fa-solid fa-bars-progress',
    routeName: 'inventory-center'
  },
  { title: 'Management', icon: 'fa: fa-solid fa-warehouse', routeName: 'inventory' },
  { title: 'Reports', icon: 'fa: fa-solid fa-chart-simple', routeName: 'report-view' },
  {
    title: 'Inventory Stock Take',
    icon: 'fa: fa-solid fa-chart-line',
    routeName: 'stock-take'
  }
])

const inboxSubItems = ref([
  { title: 'Notifications', icon: 'fa: fa-solid fa-bell', routeName: 'notifications' },
  { title: 'Messages', icon: 'fa: fa-solid fa-message', routeName: 'messages' },
  { title: 'Appointments', icon: 'fa: fa-solid fa-calendar-check', routeName: 'appointments' }
])

const supportSubItems = ref([
  { title: 'Support', icon: 'fa: fa-solid fa-headset', routeName: 'support' }
])
const moreSubItems = ref([
  { title: 'Company Settings', icon: 'fa: fa-solid fa-cog', routeName: 'companySettingsView' }
])
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import
import ProfilePage from './settings/profile/ProfilePage.vue'
import DarkModeToggleVue from './settings/DarkModeToggle.vue'
import CompanyMain from './settings/company/CompanyMain.vue'
// import { mapGetters } from 'vuex'

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
    selected: ''
  }),
  // computed: {
  //   ...mapGetters(['isDarkMode'])
  // },
  methods: {
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
    fuga() {
      this.logoutDialog = true
    }
    // logout(name: string) {
    //   if (name === 'splash') {
    //     // Clear local storage
    //     localStorage.clear()

    //     // Replace current history state to prevent back navigation
    //     window.history.replaceState({}, document.title, window.location.pathname)

    //     // Redirect to login page
    //     this.$router.push({ name: 'splash' })
    //   }
    // }
  }
})
</script>

<template>
  <v-app :theme="isdarkmode ? 'dark' : 'light'">
    <v-app :theme="isdarkmode ? 'dark' : 'light'">
      <v-app-bar :theme="isdarkmode ? 'dark' : 'light'" app class="bg-background">
        <v-app-bar-nav-icon @click="isVisible = !isVisible">
          <v-icon>{{ isVisible ? 'fa: fa-solid fa-bars' : 'fa: fa-solid fa-bars' }}</v-icon>
        </v-app-bar-nav-icon>
        <CompanyMain />
        <v-spacer></v-spacer>

        <v-toolbar-title class="d-flex justify-center">
          <v-label class="text-primary h4">Work</v-label>
          <v-label class="text-secondary h4">Wise</v-label>
        </v-toolbar-title>

        <v-spacer class="d-none d-sm-flex"></v-spacer>

        <div class="d-flex align-center">
          <UserAvatar />
          <v-icon
            class="icon-padding mr-5"
            @click="toggleDarkMode"
            :icon="isdarkmode ? 'fa: fa-solid fa-sun' : 'fa: fa-solid fa-moon'"
          ></v-icon>
        </div>
      </v-app-bar>
      <v-navigation-drawer
        class="bg-background"
        app
        v-model="drawer"
        :rail="isVisible"
        :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
        min-height="100%"
      >
        <v-list v-model:open="open">
          <v-list-group fluid value="Dashboard">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="fa: fa-solid fa-tachometer-alt"
                title="Dashboard"
                class="list-item-large"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(item, i) in dashboardSubItems"
              :key="i"
              :to="{ name: item.routeName }"
              :value="item.title"
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
          </v-list-group>
        </v-list>
        <v-list v-model:open="open">
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
              v-for="(item, i) in clientSubItems"
              :key="i"
              :to="{ name: item.routeName }"
              :value="item.title"
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
          </v-list-group>
        </v-list>
        <v-list v-model:open="open">
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
              v-for="(item, i) in employeeSubItems"
              :key="i"
              :to="{ name: item.routeName }"
              :value="item.title"
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
          </v-list-group>
        </v-list>
        <v-list v-model:open="open">
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
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
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
              v-for="(item, i) in inventorySubItems"
              :key="i"
              :to="{ name: item.routeName }"
              :value="item.title"
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
          </v-list-group>
        </v-list>
        <v-list v-model:open="open">
          <v-list-group fluid value="Inbox">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="fa: fa-solid fa-envelope"
                title="Inbox"
                class="list-item-large"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(item, i) in inboxSubItems"
              :key="i"
              :to="{ name: item.routeName }"
              :value="item.title"
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
          </v-list-group>
        </v-list>
        <v-list v-model:open="open">
          <v-list-group fluid value="Help">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="fa: fa-solid fa-life-ring"
                title="Help"
                class="list-item-large"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(item, i) in supportSubItems"
              :key="i"
              :to="{ name: item.routeName }"
              :value="item.title"
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
          </v-list-group>
        </v-list>

        <v-list v-model:open="open">
          <v-list-group fluid value="More">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="fa: fa-solid fa-ellipsis-h"
                title="More"
                class="list-item-large"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(item, i) in moreSubItems"
              :key="i"
              :to="{ name: item.routeName }"
              :value="item.title"
              @click="setInbox(item.title)"
              :class="{ 'bg-secondary': selected === item.title }"
              ><v-icon
                :icon="item.icon"
                size="sm"
                color="primary"
                start
                :class="isVisible === true ? '' : 'mr-4'"
              ></v-icon
              ><small v-if="isVisible === false">{{ item.title }}</small></v-list-item
            >
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <component :is="component" />
      </v-main>
    </v-app>
  </v-app>
</template>

<style scoped>
.icon-padding {
  padding: 8px; /* Adjust the padding value as needed */
}

.list-item-large {
  height: 70px; /* Customize the height as needed */
}

.list-item-small {
  height: 40px; /* Customize the height as needed */
}
</style>
