<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-col :cols="12">
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">BackLog</h4></v-col
        >
      </v-col>
      <v-col :cols="12">
        <KanbanV2 />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KanbanV2 from '@/components/home/jobs/KanbanV2/KanbanV2.vue'

export default defineComponent({
  name: 'BackLog',
  components: {
    KanbanV2
  },
  data() {
    return {
      pi: Math.PI
    }
  }
})
</script>

<style scoped></style>
