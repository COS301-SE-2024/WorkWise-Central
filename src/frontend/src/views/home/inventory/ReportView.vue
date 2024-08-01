<template>
  <NavigationBar :component="ReportView" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ReportView from '@/components/home/inventory/reports/Reports.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'ReportView',
  computed: {
    ReportView() {
      return ReportView
    }
  },
  components: {
    NavigationBar
  }
})
</script>
