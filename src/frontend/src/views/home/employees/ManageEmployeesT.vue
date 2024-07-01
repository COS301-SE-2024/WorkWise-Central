<template>
  <NavigationBar :component="ManageEmployeesT" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ManageEmployeesT from '@/components/home/employees/management/ManageEmployeesT.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'ManagerEmployeesView',
  computed: {
    ManageEmployeesT() {
      return ManageEmployeesT
    }
  },
  components: {
    NavigationBar
  }
})
</script>

<style></style>
