<template>
  <NavigationBar :component="CompanyRequest" />
</template>

<script>
import { defineComponent } from 'vue'
import CompanyRequest from '@/components/home/settings/company/CompanyRequest.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    CompanyRequest() {
      return CompanyRequest
    }
  },
  components: {
    NavigationBar
  }
})
</script>
