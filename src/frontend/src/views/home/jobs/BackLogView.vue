<template>
  <NavigationBar :component="BackLogComponent" />
</template>

<script>
import { defineComponent } from 'vue'
import BackLogComponent from '@/components/home/jobs/management/BackLog.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'BackLogView',
  computed: {
    BackLogComponent() {
      return BackLogComponent
    }
  },
  components: {
    NavigationBar
  }
})
</script>
