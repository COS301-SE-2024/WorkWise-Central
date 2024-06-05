<script lang="ts">
import { defineComponent, ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // icon import


export default defineComponent({
  name: 'NavigationBar',
  setup() {
    // collapse toggle function for navigation bar
    const miniVariant = ref(true) // Initialize the drawer as collapsed

    const toggleDrawer = () => {
      console.log("clicked")
      miniVariant.value = !miniVariant.value // Toggle the drawer when it's clicked
    }
    return { miniVariant, toggleDrawer }
  }

})
</script>

<template>
    <v-navigation-drawer :mini-variant="miniVariant" @click="toggleDrawer">
      <v-list-item title="Company Name" subtitle="WorkWise Central"></v-list-item>
      <v-divider></v-divider>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-view-dashboard</v-icon>
        </template>
        <span>Dashboard</span>
      </v-list-item>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-briefcase</v-icon>
        </template>
        <span>Jobs</span>
      </v-list-item>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-account-group</v-icon>
        </template>
        <span>Clients</span>
      </v-list-item>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-account-multiple</v-icon>
        </template>
        <span>Employees</span>
      </v-list-item>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-calendar</v-icon>
        </template>
        <span>Calendar</span>
      </v-list-item>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-warehouse</v-icon>
        </template>
        <span>Inventory</span>
      </v-list-item>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-inbox</v-icon>
        </template>
        <span>Inbox</span>
      </v-list-item>
    </v-navigation-drawer>
</template>
