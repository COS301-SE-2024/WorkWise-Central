<template>
  <NavigationBar :component="MessageBoard" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MessageBoard from '@/components/home/notifications/messages/MessageBoard.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    MessageBoard() {
      return MessageBoard
    }
  },
  components: {
    NavigationBar
  }
})
</script>
