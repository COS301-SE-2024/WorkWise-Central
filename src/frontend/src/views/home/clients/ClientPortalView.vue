<template>
  <ClientPortal :cid="cid" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClientPortal from '@/components/home/clients/client_portal/ClientPortal.vue'
import { useRoute } from 'vue-router' // Assuming cid comes from the route

export default defineComponent({
  name: 'DashboardView',

  components: {
    ClientPortal
  },

  setup() {
    const route = useRoute()
    const cid = route.query.cid as string // Retrieve cid from query parameters

    return {
      cid
    }
  }
})
</script>
