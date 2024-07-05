<template>
  <v-btn class="mb-2" outlined @click="dialog = true">
    <v-icon left>mdi-paperclip</v-icon>
    File Attachments
  </v-btn>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
        Attach a file from your computer
      </v-card-title>
      <v-card-text>
        <v-file-input
            v-model="files"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            label="Choose your job images"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            multiple
        >
          <template v-slot:selection="{ fileNames }">
            <template v-for="fileName in fileNames" :key="fileName">
              <v-chip class="me-2" color="primary" size="small" label>
                {{ fileName }}
              </v-chip>
            </template>
          </template>
        </v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="insertFiles">Insert</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const files = ref([])
const rules = ref([
  (value) => {
    return (
        !value ||
        !value.length ||
        value[0].size < 2000000 ||
        'Avatar size should be less than 2 MB!'
    )
  }
])
const fileChips = ref([])

const insertFiles = () => {
  dialog.value = false
  fileChips.value = files.value.map((file) => ({
    name: file.name,
    size: file.size
  }))
  console.log('Files:', fileChips.value)
}
</script>