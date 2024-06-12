<template>
  <NavigationBar :component="ManagerViewBody" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ManagerViewBody from '@/components/ManagerViewBody.vue'
import NavigationBar from '@/components/NavigationBar.vue'
export default defineComponent({
  name: 'ManagerEmployeesView',
  computed: {
    ManagerViewBody() {
      return ManagerViewBody
    }
  },
  components: {
    NavigationBar
  }
})
</script>

<style></style>
