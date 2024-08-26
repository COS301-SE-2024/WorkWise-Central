<template>
  <NavigationBar :component="Archive" />
</template>

<script>
import { defineComponent } from 'vue'
import Archive from '@/components/home/jobs/KanbanV2/Archive.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'ArchiveView',
  computed: {
    Archive() {
      return Archive
    }
  },
  components: {
    NavigationBar
  }
})
</script>
