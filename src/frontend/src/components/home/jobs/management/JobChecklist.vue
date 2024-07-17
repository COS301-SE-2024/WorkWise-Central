<template>
  <v-btn @click="checklistSection = true">View Checklist</v-btn>
  <v-dialog v-model="checklistSection" max-width="500px">
    <v-card>
      <v-card-title>Checklist of tasks completed in the job</v-card-title>
      <v-card-text>
        <label class="pb-2">Select completed tasks</label>
        <v-select
            v-model="value"
            :items="items"
            label="Tasks"
            chips
            multiple
            variant="solo"
        ></v-select>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="success" @click="saveChecklist">Save</v-btn>
        <v-btn color="error" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const checklistSection = ref(false);
const items = ref(['foo', 'bar', 'fizz', 'buzz']);
const value = ref(['foo', 'bar', 'fizz', 'buzz']);

const saveChecklist = () => {
  checklistSection.value = false;
};

const cancel = () => {
  checklistSection.value = false;
};
</script>

<style></style>
