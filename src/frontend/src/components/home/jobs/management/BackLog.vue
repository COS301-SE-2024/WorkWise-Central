<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-col :cols="12">
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">BackLog</h4></v-col
        >
      </v-col>
      <v-col :cols="12">
        <v-card><Kanban /></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Kanban from '@/components/home/jobs/Kanban.vue'

export default defineComponent({
  name: 'BackLog',
  components: {
    Kanban
  },
  data() {
    return {
      pi: Math.PI
    }
  }
})
</script>

<style scoped></style>
