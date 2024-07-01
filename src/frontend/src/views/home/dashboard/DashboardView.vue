<template>
  <NavigationBar :component="DashboardScreen" />
</template>

<script>
import { defineComponent } from 'vue'
import DashboardScreen from '@/components/home/dashboard/home/DashboardScreen.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    DashboardScreen() {
      return DashboardScreen
    }
  },
  components: {
    NavigationBar
  }
})
</script>
