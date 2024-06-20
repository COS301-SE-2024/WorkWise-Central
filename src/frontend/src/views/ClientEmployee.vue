<template>
  <v-app> <NavigationBar :component="ClientDesk" /></v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import ClientDesk from '@/components/ClientEmployeeView.vue'
export default defineComponent({
  name: 'EmployeeDesk',
  computed: {
    ClientDesk() {
      return ClientDesk
    }
  },
  components: {
    NavigationBar
  }
})
</script>

<style></style>
