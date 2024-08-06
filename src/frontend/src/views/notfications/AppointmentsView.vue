<template>
  <NavigationBar :component="AppointmentPage" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import NavigationBar from '@/components/home/NavigationBar.vue'
import AppointmentPage from '@/components/home/notifications/appointments/AppointmentsPage.vue'

export default defineComponent({
  components: {
    NavigationBar
  },
  data() {
    return {
      AppointmentPage
    }
  }
})
</script>
