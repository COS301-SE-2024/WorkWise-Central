<template>
  <v-dialog
    v-model="fileDialog"
    max-width="500px"
    location="bottom"
    location-strategy="connected"
    opacity="0"
    origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn width="100%" class="d-flex justify-start" border="md" elevation="5" @click="openFileDialog" v-bind="activatorProps">
        <v-icon left>
          {{ 'fa: fa-solid fa-upload' }}
        </v-icon>
        Upload File
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Upload a file
        </v-card-title>

        <v-card-text class="text-center">
          <div>
            <h5 class="pt-4">Select a file to upload</h5>
            <v-file-input
              class="pt-4"
              label="File input"
              prepend-icon="mdi-camera"
              variant="solo"
              hide-details
              multiple
            ></v-file-input>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <v-btn @click="upload" color="success">Upload</v-btn>
          <v-btn @click="isActive.value = false" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileDialog = ref(false)

const openFileDialog = () => {
  fileDialog.value = true
}

const upload = () => {
  fileDialog.value = false
}
</script>

<style scoped></style>
