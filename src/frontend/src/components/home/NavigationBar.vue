<script setup lang="ts">
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import
const isVisible = ref(false)
const drawer = ref(true)
const onProfileClick = () => {
  console.log('Profile icon clicked')
}

const open = ref(['Dashboard'])

const dashboardSubItems = ref([
  { title: 'Home', icon: 'fa: fa-solid fa-house', routeName: 'dashboard' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' }
])

const clientSubItems = ref([
  { title: 'Management', icon: 'fa: fa-solid fa-user-tie', routeName: 'client-desk-view' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' }
])

const employeeSubItems = ref([
  { title: 'Management', icon: 'fa: fa-solid fa-user-tie', routeName: 'manageremployees' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' }
])

const jobSubItems = ref([
  { title: 'Management', icon: 'fa: fa-solid fa-user-tie', routeName: 'jobAssignmentView' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' }
])

const inventorySubItems = ref([
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' }
])

const inboxSubItems = ref([
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' },
  { title: 'TBD', icon: 'fa: fa-solid fa-clock', routeName: '404' }
])

const supportSubItems = ref([
  { title: 'Support', icon: 'fa: fa-solid fa-headset', routeName: 'support' }
])
const moreSubItems = ref([
  { title: 'Settings', icon: 'fa: fa-solid fa-cog', routeName: '404' },
  { title: 'Logout', icon: 'fa: fa-solid fa-sign-out-alt', routeName: '404' }
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
    isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false
  }),
  // computed: {
  //   ...mapGetters(['isDarkMode'])
  // },
  methods: {
    toggleDarkMode() {
      console.log(this.isdarkmode)
      if (this.isdarkmode === true) {
        this.isdarkmode = false
        console.log(this.isdarkmode)
      } else {
        this.isdarkmode = true
        console.log(this.isdarkmode)
      }
      sessionStorage.setItem('theme', this.isdarkmode.toString()) // save the theme to session storage
    }
  }
})
</script>

<template>
  <v-app :theme="isdarkmode ? 'dark' : 'light'">
    <v-card class="bg-cardColor">
      <v-app :theme="isdarkmode ? 'dark' : 'light'">
        <v-app-bar :theme="isdarkmode ? 'dark' : 'light'" app class="bg-background">
          <v-app-bar-nav-icon @click="isVisible = !isVisible">
            <v-icon>{{ isVisible ? 'fa: fa-solid fa-times' : 'fa: fa-solid fa-bars' }}</v-icon>
          </v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <v-toolbar-title class="d-flex justify-center">
            <v-label class="text-primary">Work</v-label>
            <v-label class="text-secondary">Wise</v-label>
          </v-toolbar-title>

          <v-spacer class="d-none d-sm-flex"></v-spacer>

          <div class="d-flex align-center">
            <v-icon class="icon-padding mr-5" @click="onProfileClick">{{
              'fa: fa-solid fa-user-circle'
            }}</v-icon>
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
        >
          <CompanyMain />
          <v-list v-model:open="open">
            <v-list-group fluid value="Dashboard">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="fa: fa-solid fa-tachometer-alt"
                  title="Dashboard"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in dashboardSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Clients">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="fa: fa-solid fa-handshake"
                  title="Clients"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in clientSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Employees">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="fa: fa-solid fa-users"
                  title="Employees"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in employeeSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Jobs">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="fa: fa-solid fa-briefcase"
                  title="Jobs"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in jobSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
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
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in inventorySubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Inbox">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="fa: fa-solid fa-envelope"
                  title="Inbox"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in inboxSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Help">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="fa: fa-solid fa-life-ring"
                  title="Help"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in supportSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="More">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="fa: fa-solid fa-ellipsis-h"
                  title="More"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in moreSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
              ></v-list-item>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <component :is="component" />
        </v-main>
      </v-app>
    </v-card>
  </v-app>
</template>

<style scoped>
.colorAccent {
  color: #6a99ce;
}
.colorAccent2 {
  color: #879898;
}
.toolbar-text {
  font-size: 36px;
}
.icon-padding {
  padding: 8px; /* Adjust the padding value as needed */
}
</style>
