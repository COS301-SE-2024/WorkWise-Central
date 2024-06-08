<script setup lang="ts">
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import

const isVisible = ref(false)
const drawer = ref(true)
const dashboardActive = ref(false)

const toggleDashboard = () => {
  dashboardActive.value = !dashboardActive.value
}
const onProfileClick = () => {
  console.log('Profile icon clicked')
}

const onEllipsisClick = () => {
  console.log('Ellipsis icon clicked')
}

// Drop down list items and routes with icons for each

const dashboardItems = ref([
    { icon: 'dashboard_icon_1', text: 'Dashboard Item 1', route: '/dashboard/item1' },
    { icon: 'dashboard_icon_2', text: 'Dashboard Item 2', route: '/dashboard/item2' },
    { icon: 'dashboard_icon_3', text: 'Dashboard Item 3', route: '/dashboard/item3' }
]);

const jobItems = ref([
    { icon: 'job_icon_1', text: 'Job Item 1', route: '/jobs/item1' },
    { icon: 'job_icon_2', text: 'Job Item 2', route: '/jobs/item2' },
    { icon: 'job_icon_3', text: 'Job Item 3', route: '/jobs/item3' }
]);

const clientItems = ref([
    { icon: 'client_icon_1', text: 'Client Item 1', route: '/clients/item1' },
    { icon: 'client_icon_2', text: 'Client Item 2', route: '/clients/item2' },
    { icon: 'client_icon_3', text: 'Client Item 3', route: '/clients/item3' }
]);

const employeesItems = ref([
    { icon: 'employee_icon_1', text: 'Employee Item 1', route: '/employees/item1' },
    { icon: 'employee_icon_2', text: 'Employee Item 2', route: '/employees/item2' },
    { icon: 'employee_icon_3', text: 'Employee Item 3', route: '/employees/item3' }
]);

const inventoryItems = ref([
    { icon: 'inventory_icon_1', text: 'Inventory Item 1', route: '/inventory/item1' },
    { icon: 'inventory_icon_2', text: 'Inventory Item 2', route: '/inventory/item2' },
    { icon: 'inventory_icon_3', text: 'Inventory Item 3', route: '/inventory/item3' }
]);

const inboxItems = ref([
    { icon: 'inbox_icon_1', text: 'Inbox Item 1', route: '/inbox/item1' },
    { icon: 'inbox_icon_2', text: 'Inbox Item 2', route: '/inbox/item2' },
    { icon: 'inbox_icon_3', text: 'Inbox Item 3', route: '/inbox/item3' }
]);

</script>

<template>
  <v-card>
    <v-app>
      <v-app-bar app color="surface" :elevation="8">
        <v-app-bar-nav-icon @click="isVisible = !isVisible">
          <v-icon>{{ isVisible ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>WorkWise</v-toolbar-title>
        <v-icon @click="onProfileClick" :style="{ fontSize: '40px' }">mdi-account-circle</v-icon>
        <v-icon @click="onEllipsisClick" :style="{ fontSize: '40px' }">mdi-dots-vertical</v-icon>
      </v-app-bar>

      <v-navigation-drawer app v-model="drawer" :rail="isVisible" color="background">
        <v-list-item title="Company Name" class="title"></v-list-item>
        <v-divider></v-divider>

        <v-list>
          <v-list-group v-model="dashboardActive" color="secondary">
            <template v-slot:activator>
              <v-list-item link @click="toggleDashboard">
                <template v-slot:prepend>
                  <v-icon>mdi-view-dashboard</v-icon>
                </template>
                <span>Dashboard</span>
              </v-list-item>
            </template>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 1</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 2</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 3</span>
            </v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator>
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-briefcase</v-icon>
                </template>
                <span>Jobs</span>
              </v-list-item>
            </template>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 1</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 2</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 3</span>
            </v-list-item>
          </v-list-group>

          <v-list-group color="primary">
            <template v-slot:activator>
              <v-list-item link color="secondary">
                <template v-slot:prepend>
                  <v-icon>mdi-account-group</v-icon>
                </template>
                <span>Clients</span>
              </v-list-item>
            </template>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span colour="secondary">Sub-item 1</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 2</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 3</span>
            </v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator>
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-account-multiple</v-icon>
                </template>
                <span>Employees</span>
              </v-list-item>
            </template>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 1</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 2</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 3</span>
            </v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator>
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-warehouse</v-icon>
                </template>
                <span>Inventory</span>
              </v-list-item>
            </template>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 1</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 2</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 3</span>
            </v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator>
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon> mdi-inbox</v-icon>
                </template>
                <span>Inbox</span>
              </v-list-item>
            </template>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 1</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 2</span>
            </v-list-item>

            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </template>
              <span>Sub-item 3</span>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid> </v-container>
      </v-main>
    </v-app>
  </v-card>
</template>

<style scoped>

</style>
