<template>
  <div>
    <v-divider></v-divider>
    <h3 class="pb-2">Check Off Complated Tasks</h3>
    <v-select
        v-model="value"
        :items="items"
        label="Tasks"
        chips
        multiple
        variant="solo"
    ></v-select>
    <v-btn color="success" @click="saveChecklist">Save</v-btn>
  </div>
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
