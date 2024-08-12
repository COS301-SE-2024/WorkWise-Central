<template>
  <NavigationBar :component="InventoryScreen" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InventoryScreen from '@/components/home/inventory/management/InventoryDashboard.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'

export default defineComponent({
  name: 'InventoryView',
  computed: {
    InventoryScreen() {
      return InventoryScreen
    }
  },
  components: {
    NavigationBar
  }
})
</script>
