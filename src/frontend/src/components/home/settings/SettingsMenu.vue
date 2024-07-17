<template>
  <div :class="menuContainerClass">
    <Menu :model="items" :class="menuClass">
      <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-4">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Menu from 'primevue/menu'

const router = useRouter()

const theme = ref('light') // Assume the theme is stored in a reactive variable

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
        icon: 'fa fa-solid fa-sliders-h',
        route: '/preferenceSettings'
      },
      {
        label: 'Notifications',
        icon: 'fa fa-solid fa-bell',
        route: '/notificationSettings'
      }
    ]
  }
])

const menuClass = computed(() => ({
  'bg-light': theme.value === 'light',
  'bg-dark': theme.value === 'dark'
}))

const menuContainerClass = computed(() => ({
  'flex justify-center': true,
  'bg-light-page': theme.value === 'light',
  'bg-dark-page': theme.value === 'dark'
}))
</script>

<style scoped>
.bg-light {
  background-color: #f7f8f9; /* Light theme menu background color */
  color: #4c9fc3; /* Light theme text color */
}

.bg-dark {
  background-color: #161a1d; /* Dark theme menu background color */
  color: #b6c2cf; /* Dark theme text color */
}

.bg-light-page {
  background-color: #f1f2f4; /* Light theme page background color */
}

.bg-dark-page {
  background-color: #22272b; /* Dark theme page background color */
}
</style>
