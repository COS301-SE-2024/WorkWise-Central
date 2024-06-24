<template>
  <v-main>
    <NavigationBar :isDarkMode="isDarkMode" />
    <ClientDesk :isDarkMode="isDarkMode" />
  </v-main>
</template>

<script>
import { defineComponent } from 'vue'
import NavigationBar from '../components/NavigationBar.vue'
import ClientDesk from '../components/ClientDesk.vue'
export default defineComponent({
  name: 'ManagerView',
  components: {
    NavigationBar,
    ClientDesk
  },
  data: () => ({
    isDarkMode: false
  })
})
</script>
