<template>
  <NavigationBar :component="StockTakeManagement" />
</template>
<script lang="ts">
import NavigationBar from '@/components/home/NavigationBar.vue'
import StockTakeManagement from '@/components/home/inventory/management/StockTakeManagement.vue'

export default {
  name: 'StockTakeManagementView',
  components: {
    NavigationBar
  },
  data() {
    return {
      StockTakeManagement
    }
  }
}
</script>
