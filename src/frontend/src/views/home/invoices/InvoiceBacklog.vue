<template>
  <NavigationBar :component="InvoiceKanban" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InvoiceKanban from '@/components/home/invoices/InvKanbanV1/InvoiceKanban.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'InvoiceBacklog',
  computed: {
    InvoiceKanban() {
      return InvoiceKanban
    }
  },
  components: {
    NavigationBar
  }
})
</script>
