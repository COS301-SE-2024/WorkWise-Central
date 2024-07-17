<template>
  <v-btn @click="fileInputSection = true">Upload File</v-btn>
  <v-dialog v-model="fileInputSection" max-width="500px">
    <v-card class="text-center">
      <v-card-title>Upload a File</v-card-title>
      <v-card-text>
        <label class="pb-2">Select a file to upload</label>
        <v-file-input label="File input" prepend-icon="mdi-camera" variant="solo"></v-file-input>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="success" @click="upload">Upload</v-btn>
        <v-btn color="error" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
