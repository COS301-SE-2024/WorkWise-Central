<template>
  <NavigationBar :component="EmployeeCenter" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EmployeeCenter from '@/components/home/employees/employeecenter/EmployeeCenter.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'EmployeeView',
  computed: {
    EmployeeCenter() {
      return EmployeeCenter
    }
  },
  components: {
    NavigationBar
  }
})
</script>
