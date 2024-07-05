<template>
  <NavigationBar :component="ManagerEditEmployee" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ManagerEditEmployee from '@/components/home/employees/management/ManagerEditEmployee.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
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
