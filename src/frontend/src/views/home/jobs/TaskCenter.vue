<template>
  <NavigationBar :component="TaskCenter" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TaskCenter from '@/components/home/jobs/task/TaskCenter.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'TaskView',
  computed: {
    TaskCenter() {
      return TaskCenter
    }
  },
  components: {
    NavigationBar
  }
})
</script>
