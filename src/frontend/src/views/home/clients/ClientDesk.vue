c
<template>
  <NavigationBar :component="ClientDesk" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClientDesk from '@/components/home/clients/management/ClientDesk.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'ClientDeskView',
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
