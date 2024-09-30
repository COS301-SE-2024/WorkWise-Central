<template>
  <NavigationBar :component="InvoiceDashboard" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InvoiceDashboard from '@/components/home/invoices/InvoiceDashboard.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    InvoiceDashboard() {
      return InvoiceDashboard
    }
  },
  components: {
    NavigationBar
  }
})
</script>
