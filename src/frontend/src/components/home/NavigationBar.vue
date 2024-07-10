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
  { title: 'Home', icon: 'mdi-home', routeName: 'dashboard', color:'#227D9B'},
  { title: 'TBD', icon: 'mdi-clock', routeName: '404', color:'#227D9B' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404', color:'#227D9B' }
])

const clientSubItems = ref([
  { title: 'Management', icon: 'mdi-account-group-outline', routeName: 'client-desk-view' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' }
])

const employeeSubItems = ref([
  { title: 'Management', icon: 'mdi-account-tie', routeName: 'manageremployees' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' }
])

const jobSubItems = ref([
  { title: 'Management', icon: 'mdi-briefcase', routeName: 'jobAssignmentView' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' }
])

const inventorySubItems = ref([
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' }
])

const inboxSubItems = ref([
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' }
])

const supportSubItems = ref([{ title: 'Support', icon: 'mdi-star', routeName: 'support' }])
const moreSubItems = ref([
  { title: 'Settings', icon: 'mdi-cog', routeName: '404' },
  {
    title: 'Logout',
    icon: 'mdi-logout',
    routeName: '404'
  }
])
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import
import ProfilePage from './settings/profile/ProfilePage.vue'
import DarkModeToggleVue from './settings/DarkModeToggle.vue'
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
    DarkModeToggleVue
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
        <v-app-bar :theme="isdarkmode ? 'dark' : 'light'" app class="bg-background" border="xs" density="comfortable" elevation="1" tile>
          <v-app-bar-nav-icon @click="isVisible = !isVisible">
            <v-icon>{{ isVisible ? 'mdi-menu' : 'mdi-close' }}</v-icon>
          </v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <v-toolbar-title class="d-flex justify-center">
            <v-label class="text-primary">Work</v-label>
            <v-label class="text-secondary">Wise</v-label>
          </v-toolbar-title>

          <v-spacer class="d-none d-sm-flex"></v-spacer>

          <div class="d-flex align-center">
            <v-icon class="icon-padding mr-5" @click="onProfileClick">mdi-account-circle</v-icon>
            <v-icon
              class="icon-padding mr-5"
              @click="toggleDarkMode"
              :icon="isdarkmode ? ' mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'"
            ></v-icon>
          </div>
        </v-app-bar>

        <v-navigation-drawer
          class="bg-background"
          app
          v-model="drawer"
          :rail="isVisible"
          :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
          border="xs"
        >
          <v-list-item></v-list-item>
          <v-divider></v-divider>
          <v-defaults-provider :defaults="{'VIcon':{'color':'secondary'}}">
          <v-list v-model:open="open">
            <v-list-group fluid value="Dashboard">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-view-dashboard"
                  title="Dashboard"
                  class="custom-list-height-higher"
                ></v-list-item>
              </template>
                <v-list-item
                  v-for="(item, i) in dashboardSubItems"
                  :key="i"
                  :to="{ name: item.routeName }"
                  :prepend-icon="item.icon"
                  :title="item.title"
                  :value="item.title"
                  class="custom-list-height-lower colored-icon"
                ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Clients">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-group"
                  title="Clients"
                  class="custom-list-height-higher"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in clientSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="custom-list-height-lower"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Employees">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-multiple"
                  title="Employees"
                  class="custom-list-height-higher"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in employeeSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="custom-list-height-lower"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Jobs">
              <template v-slot:activator="{ props }">
                <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-briefcase"
                    title="Jobs"
                    class="custom-list-height-higher"
                >
                </v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in jobSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="custom-list-height-lower colored-icon"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Inventory">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-warehouse"
                  title="Inventory"
                  class="custom-list-height-higher"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in inventorySubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="custom-list-height-lower"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Inbox">
              <template v-slot:activator="{ props }">
                <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-inbox"
                    title="Inbox"
                    class="custom-list-height-higher"
                >
                </v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in inboxSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="custom-list-height-lower"
                active-color= "primary"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="Help">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-information"
                  title="Help"
                  class="custom-list-height-higher"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in supportSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="custom-list-height-lower"
              ></v-list-item>
            </v-list-group>
          </v-list>
          <v-list v-model:open="open">
            <v-list-group fluid value="More">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-dots-horizontal"
                  title="More"
                  class="custom-list-height-higher"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(item, i) in moreSubItems"
                :key="i"
                :to="{ name: item.routeName }"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                class="custom-list-height-lower"
              ></v-list-item>
            </v-list-group>
          </v-list>
          </v-defaults-provider>
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

.custom-list-height-lower {
  height: 30px !important; /* Adjust to your desired height */
}

.custom-list-height-higher {
  height: 60px !important; /* Adjust to your desired height */
}

.v-list-item:hover {
  background-color: #F0984D !important; /* Replace with your desired hover color */
}

.v-list-item--active {
  //background-color: grey;
}

.colored-icon .v-list-item__icon {
  color: #227D9B; /* Replace with your color */
}
</style>
