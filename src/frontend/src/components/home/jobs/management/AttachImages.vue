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
      <v-btn
        width="100%"
        class="d-flex justify-start"
        border="md"
        elevation="5"
        @click="openFileDialog"
        v-bind="activatorProps"
      >
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
            <v-file-input
              class="pt-4"
              label="File input"
              prepend-icon="mdi-camera"
              accept="image/*"
              chips
              variant="solo"
              hide-details
              multiple
              @change="handleFileInput"
              hint="Select a file upload"
            ></v-file-input>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <Toast />
          <v-btn @click="upload" color="success">Upload</v-btn>
          <v-btn @click="closeDialog" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const fileDialog = ref<boolean>(false)
const selectedFiles = ref<File[]>([])
const uploadReadyFiles = ref<string[]>([])
const toast = useToast()

interface InventoryUsed {
  inventoryItemId: string
  inventoryItemName: string
  quantityUsed: number
}

interface UpdateRecordedDetails {
  imagesTaken: string[]
  inventoryUsed: InventoryUsed[]
}

const props = defineProps<{
  recordedDetails: UpdateRecordedDetails
  jobID: string
}>()

const recordedDetails = ref<UpdateRecordedDetails>(props.recordedDetails)

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const showImageUploadSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Image Uploaded',
    life: 3000
  })
}

const showImageUploadError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Failed to upload image',
    life: 3000
  })
}

const uploadFileInput = async (): Promise<string> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  await processSelectedFiles()

  try {
    const response = await axios.patch(`${apiUrl}job/${props.jobID}`, recordedDetails, config)
    if (response.status < 300 && response.status > 199) {
      showImageUploadSuccess()
    } else {
      showImageUploadError()
    }
  } catch (error) {
    console.error('Error updating job:', error)
  }
}

const openFileDialog = (): void => {
  fileDialog.value = true
}

const handleFileInput = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (files) {
    selectedFiles.value = []
    for (const file of files) {
      selectedFiles.value.push(file)
    }
  }
}

const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
  const base64Strings: string[] = []

  for (const file of files) {
    const base64String = await fileToBase64(file)
    base64Strings.push(base64String)
  }

  return base64Strings
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string)
      } else {
        reject(new Error('Failed to convert file to base64'))
      }
    }

    reader.onerror = (error) => reject(error)
  })
}

const processSelectedFiles = async () => {
  try {
    console.log('Recorded details', recordedDetails.value)
    const base64Strings = await convertFilesToBase64(selectedFiles.value)
    if (recordedDetails.value) {
      recordedDetails.value.imagesTaken.push(...base64Strings)
      console.log('Updated recordedDetails:', recordedDetails.value)
    } else {
      console.error('recorded details is undefined')
    }
  } catch (error) {
    console.error('Error converting files to base64:', error)
  }
}

const upload = (): void => {
  if (selectedFiles.value.length > 0) {
    uploadFileInput()
  }
}

const closeDialog = (): void => {
  fileDialog.value = false
}
</script>
