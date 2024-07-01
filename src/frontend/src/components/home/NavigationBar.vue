<script setup lang="ts">
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import
const isVisible = ref(false)
const drawer = ref(true)

const onProfileClick = () => {
  console.log('Profile icon clicked')
}

const onEllipsisClick = () => {
  console.log('Ellipsis icon clicked')
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
import ProfileEmployee from '@/components/home/settings/profile/ProfileEmployee.vue'

export default defineComponent({
  name: 'NavigationBar',
  props: {
    component: {
      type: Object as PropType<any>
    }
  },
  components: {
    ProfileEmployee
  }
})
</script>

<template>
  <v-card>
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="isVisible = !isVisible">
          <v-icon>{{ isVisible ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title>WorkWise</v-toolbar-title>
        <v-icon @click="onProfileClick">mdi-account-circle</v-icon>
        <v-icon @click="onEllipsisClick">mdi-dots-vertical</v-icon>
      </v-app-bar>

      <v-navigation-drawer app v-model="drawer" :rail="isVisible">
        <v-list-item></v-list-item>
        <v-divider></v-divider>
        <v-list v-model:open="open">
          <v-list-group value="Dashboard">
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
            ></v-list-item>
          </v-list-group>
        </v-list>
        <v-list v-model:open="open">
          <v-list-group value="Clients">
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
          <v-list-group value="Employees">
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
          <v-list-group value="Jobs">
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
          <v-list-group value="Inventory">
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
          <v-list-group value="Inbox">
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
          <v-list-group value="Help">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-information" title="Help"></v-list-item>
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
  <v-col></v-col>
</template>

<style scoped></style>
