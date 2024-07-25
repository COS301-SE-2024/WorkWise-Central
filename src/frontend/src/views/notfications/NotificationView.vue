<template>
  <NavigationBar :component="NotificationsPage" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
import NotificationsPage from '@/components/home/notifications/NotificationsPage.vue'
export default defineComponent({
  name: 'NotificationView',
  components: {
    NavigationBar,
    NotificationsPage
  },
  computed: {
    NotificationsPage() {
      return NotificationsPage
    }
  }
})
</script>
