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
  { title: 'Home', icon: 'mdi-home', routeName: 'dashboard' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' },
  { title: 'TBD', icon: 'mdi-clock', routeName: '404' }
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
    <v-card>
      <v-app :theme="isdarkmode ? 'dark' : 'light'">
        <v-app-bar :theme="isdarkmode ? 'dark' : 'light'" app>
          <v-app-bar-nav-icon @click="isVisible = !isVisible">
            <v-icon>{{ isVisible ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-toolbar-title
            ><span class="colorAccent toolbar-text">Work</span>
            <span class="colorAccent2 toolbar-text">Wise</span></v-toolbar-title
          >
          <v-icon class="icon-padding" @click="onProfileClick">mdi-account-circle</v-icon>
          <v-icon class="icon-padding" @click="toggleDarkMode">mdi-brightness-4</v-icon>
        </v-app-bar>

        <v-navigation-drawer
          app
          v-model="drawer"
          :rail="isVisible"
          :theme="isdarkmode ? 'dark' : 'light'"
        >
          <v-list-item></v-list-item>
          <v-divider></v-divider>
          <v-list v-model:open="open">
            <v-list-group fluid value="Dashboard">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-view-dashboard"
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
                class="custom-padding"
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
                  prepend-icon="mdi-account-multiple"
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
                <v-list-item v-bind="props" prepend-icon="mdi-briefcase" title="Jobs"></v-list-item>
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
                  prepend-icon="mdi-warehouse"
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
                <v-list-item v-bind="props" prepend-icon="mdi-inbox" title="Inbox"></v-list-item>
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
                  prepend-icon="mdi-information"
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
  font-display: 'Lato';
}
.icon-padding {
  padding: 8px; /* Adjust the padding value as needed */
}

.custom-padding {
  padding-left: 0px !important;
}
</style>
