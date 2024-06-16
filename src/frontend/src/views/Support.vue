<template>
  <NavigationBar :component="Support" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Support from '@/components/Support.vue'
import NavigationBar from '@/components/NavigationBar.vue'
export default defineComponent({
  name: 'SupportView',
  computed: {
    Support() {
      return Support
    }
  },
  components: {
    NavigationBar
  }
})
</script>

<style></style>
