<template>
  <NavigationBar :component="ManagerEditEmployee" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ManagerEditEmployee from '@/components/ManagerEditEmployee.vue'
import NavigationBar from '@/components/NavigationBar.vue'
export default defineComponent({
  name: 'ManagerEditEmployeeView',
  computed: {
    ManagerEditEmployee() {
      return ManagerEditEmployee
    }
  },
  components: {
    NavigationBar
  }
})
</script>

<style></style>
