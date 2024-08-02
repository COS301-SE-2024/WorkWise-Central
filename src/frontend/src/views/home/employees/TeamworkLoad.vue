<template>
  <NavigationBar :component="TeamworkLoad" />
</template>

<script>
import { defineComponent } from 'vue'
import TeamworkLoad from '@/components/home/employees/teamworkload/TeamworkLoad.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    TeamworkLoad() {
      return TeamworkLoad
    }
  },
  components: {
    NavigationBar
  }
})
</script>
