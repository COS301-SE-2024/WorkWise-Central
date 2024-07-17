<template>
  <NavigationBar :component="StatisticsDashboard" />
</template>

<script>
import { defineComponent } from 'vue'
import StatisticsDashboard from '@/components/home/statistics/StatisticsDashboard.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    StatisticsDashboard() {
      return StatisticsDashboard
    }
  },
  components: {
    NavigationBar
  }
})
</script>
