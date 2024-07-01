<template>
  <NavigationBar :component="Support" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Support from '@/components/home/help/support/Support.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
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
