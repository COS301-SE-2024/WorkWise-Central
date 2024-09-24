<template>
  <NavigationBar :component="Map" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
import Map from '@/views/home/map/Map.vue'

export default defineComponent({
  name: 'MapView',
  computed: {
    Map() {
      return Map
    }
  },
  components: {
    NavigationBar
  }
})
</script>
