<template>
  <NavigationBar :component="InvoiceCenter" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InvoiceCenter from '@/components/home/invoices/InvoiceCenter.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    InvoiceCenter() {
      return InvoiceCenter
    }
  },
  components: {
    NavigationBar
  }
})
</script>
