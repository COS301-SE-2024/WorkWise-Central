<template>
  <NavigationBar :component="ClientFeedbackScreen" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClientFeedbackScreen from '@/components/home/clients/feedback/CustomerFeedback.vue'
import NavigationBar from '@/components/home/NavigationBar.vue'
export default defineComponent({
  name: 'ClientFeedbackView',
  computed: {
    ClientFeedbackScreen() {
      return ClientFeedbackScreen
    }
  },
  components: {
    NavigationBar
  }
})
</script>
