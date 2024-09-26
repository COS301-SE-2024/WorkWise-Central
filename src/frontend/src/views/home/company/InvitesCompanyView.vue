<template>
  <NavigationBar :component="InvitePage" />
</template>
<script lang="ts">
import InvitePage from '@/components/home/settings/user/InvitePage.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardView',
  computed: {
    InvitePage() {
      return InvitePage
    }
  },
  components: {
    NavigationBar
  }
})
</script>
