<template>
  <NavigationBar :component="ClientCenter" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ClientCenter from '@/components/home/clientcenter/ClientCenter.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'DashboardView',
  computed: {
    ClientCenter() {
      return ClientCenter
    }
  },
  components: {
    NavigationBar
  }
})
</script>
