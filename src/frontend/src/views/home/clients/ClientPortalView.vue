<template>
  <NavigationBar :component="ClientPortal" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ClientPortal from '@/components/home/clients/client_portal/ClientPortal.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    ClientPortal() {
      return ClientPortal
    }
  },
  components: {
    NavigationBar
  }
})
</script>
