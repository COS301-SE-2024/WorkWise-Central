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
</script>

<template>
  <v-card>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="isVisible = !isVisible">
        <v-icon>{{ isVisible ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>WorkWise</v-toolbar-title>
      <v-icon @click="onProfileClick">mdi-account-circle</v-icon>
      <v-icon @click="onEllipsisClick">mdi-dots-vertical</v-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-navigation-drawer app v-model="drawer" :rail="isVisible">
          <v-list-item title="Company Name"></v-list-item>
          <v-divider></v-divider>

          <v-list>
            <v-list-group v-model="dashboardActive">
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

            <v-list-group>
              <template v-slot:activator>
                <v-list-item link>
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
                    <v-icon>mdi-account-multiple</v-icon>
                  </template>
                  <span>Project Board</span>
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
      </v-container>
    </v-main>
  </v-card>
</template>

<style scoped></style>
