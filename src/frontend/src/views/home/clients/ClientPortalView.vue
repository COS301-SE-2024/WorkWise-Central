<template>
  <ClientPortal />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ClientPortal from '@/components/home/clients/client_portal/ClientPortal.vue'

export default defineComponent({
  name: 'DashboardView',

  components: {
    ClientPortal
  }
})
</script>
