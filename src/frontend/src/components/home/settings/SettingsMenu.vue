<template>
  <v-card class="elevation-0 bg-background" border="md">
    <v-list class="bg-background">
      <v-list-subheader class="text-center">User Settings</v-list-subheader>
      <!-- Render the list items -->
      <v-list-item-group>
        <template v-for="(item, i) in items" :key="i">
          <!-- Handle sections with nested items -->
          <template v-if="item.items">
            <v-list-item-group v-for="(subItem, j) in item.items" :key="j">
              <v-list-item @click="navigate(subItem.route)" class="bg-secondary">
                <template v-slot:prepend>
                  <v-icon :icon="subItem.icon" color="primary"></v-icon>
                </template>
                <v-list-item-title>{{ subItem.label }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </template>

          <!-- Handle regular items -->
          <template v-else>
            <v-list-item @click="navigate(item.route)">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </template>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = (route) => {
  if (route) {
    router.push(route)
  }
}

const items = ref([
  {
    label: 'User',
    items: [
      {
        label: 'Personal Information',
        icon: 'fa: fa-solid fa-user',
        route: '/userSettings'
      }
      // {
      //   label: 'Notifications',
      //   icon: 'fa: fa-solid fa-bell',
      //   route: '/notificationSettings'
      // }
    ]
  }
])
</script>

<style scoped>
/* Optional: Custom hover effect */
.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Change the color as needed */
}
</style>
