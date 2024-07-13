<template>
  <div class="card flex justify-center">
    <Menu :model="items" class="w-full md:w-60">
      <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-5 custom-settings">
            <span class="text-xl font-semibold">Settings</span>
        </span>
      </template>
      <template #submenulabel="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action" @click="navigate(item.route)">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import Menu from 'primevue/menu'
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
    separator: true
  },
  {
    label: 'User',
    items: [
      {
        label: 'Personal Information',
        icon: 'fa fa-solid fa-user',
        route: '/userSettings'
      },
      {
        label: 'Preferences',
        icon: 'fa: fa-solid fa-sliders-h',
        route: '/preferences'
      },
      {
        label: 'Notifications',
        icon: 'fa fa-solid fa-bell',
        route: '/notifications'
      }
    ]
  },
  {
    separator: true
  },
  {
    label: 'Company',
    items: [
      {
        label: 'Settings',
        icon: 'fa fa-solid fa-building',
        route: '/companySettings'
      }
    ]
  }
])
</script>

<style>
.custom-settings {
  height: 80px; /* Adjust the height as needed */
  align-items: center; /* Center the content vertically */
}
</style>
