<template>
  <NavigationBar :component="InventoryCenter" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InventoryCenter from '@/components/home/inventory/inventorycenter/InventoryCenter.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'InventoryView',
  computed: {
    InventoryCenter() {
      return InventoryCenter
    }
  },
  components: {
    NavigationBar
  }
})
</script>
