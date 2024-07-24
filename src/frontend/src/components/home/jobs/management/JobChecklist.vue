<template>
  <div>
    <v-divider></v-divider>
    <h5 class="pt-4">Check Off Completed Tasks</h5>
    <v-select
      v-model="value"
      :items="items"
      label="Tasks"
      chips
      multiple
      variant="solo"
      class="pt-4"
      hide-details
      prepend-icon="fa: fa-solid fa-check"
    ></v-select>
    <v-btn color="success" @click="saveChecklist">Save</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// const props = defineProps(checklistItems);

// checklist items are populated using the passed in prop
const items = ref(['foo', 'bar', 'fizz', 'buzz'])
const value = ref([])

const saveChecklist = () => {
  // once the save button is clicked the checklist is updated and the backed is updated
}
</script>

<style></style>
