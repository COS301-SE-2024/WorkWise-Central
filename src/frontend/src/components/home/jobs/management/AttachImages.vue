<template>
  <div>
    <v-divider></v-divider>
    <h3 class="pt-4 ">Select a file to upload</h3>
    <v-file-input
        class="pt-4"
        label="File input"
        prepend-icon="mdi-camera"
        variant="solo"
        hide-details
        multiple
    ></v-file-input>
    <v-btn color="success" @click="upload">Upload</v-btn>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
const fileInputSection = ref(false);

const upload = () => {
  fileInputSection.value = false;
};

const cancel = () => {
  fileInputSection.value = false;
};
</script>

<style></style>
