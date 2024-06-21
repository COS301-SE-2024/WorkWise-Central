<template>
  <NavigationBar :component="DashboardScreen" />
</template>

<script>
import { defineComponent } from 'vue'
import DashboardScreen from '@/components/DashboardScreen.vue'
import NavigationBar from '@/components/NavigationBar.vue'
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
