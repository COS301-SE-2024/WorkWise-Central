<template>
  <v-container>
    <v-carousel height="400" v-if="images.length">
      <v-carousel-item v-for="(image, index) in images" :key="index">
        <v-img :src="image.src" height="100%" width="100%" cover @click="openImageOverlay(index)">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-btn
          @click="openImageActionsDialog(index)"
          class="image-actions-btn"
          icon
          elevation="2"
          color="secondary"
          style="position: absolute; bottom: 16px; right: 16px"
        >
          <v-icon class="pl-3" color="primary">{{ 'fa: fa-solid fa-ellipsis-h' }}</v-icon>
        </v-btn>
        <v-dialog
          v-model="image.dialog"
          max-width="300px"
          location="bottom"
          location-strategy="connected"
          opacity="0"
          origin="top center"
        >
          <template v-slot:default="{ isActive }">
            <v-card class="bg-cardColor">
              <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                Image Actions
              </v-card-title>
              <v-card-actions class="d-flex flex-column">
                <v-btn color="info" @click="changeImage(index)" :loading="isDownloading">
                  <v-icon left>{{ 'fa: fa-solid fa-sync' }}</v-icon>
                  Change Image
                </v-btn>
                <v-btn color="success" @click="downloadImage(index)">
                  <v-icon left>{{ 'fa: fa-solid fa-download' }}</v-icon>
                  Download
                </v-btn>
                <v-btn color="error" @click="deleteImage(index)" :loading="isDeleting">
                  <v-icon left>{{ 'fa: fa-solid fa-trash' }}</v-icon>
                  Delete
                </v-btn>
                <v-btn color="error" @click="isActive.value = false">
                  <v-icon left>{{ 'fa: fa-solid fa-times' }}</v-icon>
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-carousel-item>
    </v-carousel>

    <v-row cols="12" class="pt-4">
      <v-col>
        <v-file-input
          v-model="newFile"
          label="Add an image"
          prepend-icon="fa: fa-solid fa-image"
          accept="image/*"
          @change="handleFileChange"
          variant="solo"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-dialog v-model="imageOverlay" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="bg-cardColor">
        <v-toolbar dark color="primary">
          <v-btn dark @click="imageOverlay = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Image Preview</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="d-flex justify-center">
          <v-img :src="overlayImageSrc" max-width="100%" max-height="100%"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { API_URL } from '@/main'

let isDeleting = ref<boolean>(false)
let isDownloading = ref<boolean>(false)

const toast = useToast()
interface Image {
  src: string
  dialog: boolean
}

const props = defineProps<{ id: string }>()

const images = ref<Image[]>([])
const newFile = ref<File | null>(null)
const imageOverlay = ref(false)
const overlayImageSrc = ref('')

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const getJobData = async () => {
  console.log('Getting job data', props.id)

  try {
    const response = await axios.get(`${API_URL}job/id/${props.id}`, config)
    const job = response.data.data
    job.attachments.forEach((attachment: string) => {
      images.value.push({
        src: attachment,
        dialog: false
      })
    })
    console.log('Here are the images', images.value)
  } catch (error) {
    console.log(error)
  }
}

const handleFileChange = async () => {
  const file = newFile.value
  if (file) {
    const reader = new FileReader()
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        images.value.push({
          src: e.target.result as string,
          dialog: false
        })
        // Upload the image
        const formData = new FormData()
        formData.append('files', file)

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        const url = `${API_URL}job/add/attachments/?jId=${props.id}&eId=${localStorage.getItem('employeeId')}`
        try {
          const response = await axios.patch(url, formData, config)
          if (response.status === 200) {
            toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Image uploaded successfully',
              life: 3000
            })
          }
        } catch (error) {
          console.log(error)
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to upload image',
            life: 3000
          })
          console.log(url)
        }
      }
    }
    reader.readAsDataURL(file)
    newFile.value = null
  }
}

const openImageActionsDialog = (index: number): void => {
  images.value[index].dialog = true
}

const openImageOverlay = (index: number): void => {
  overlayImageSrc.value = images.value[index].src
  imageOverlay.value = true
}

const changeImage = (index: number): void => {
  images.value[index].dialog = false
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.onchange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    if (file) {
      // Remove the old image
      await deleteImage(index)
      // Add the new image
      const reader = new FileReader()
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          images.value.push({
            src: e.target.result as string,
            dialog: false
          })
          // Upload the new image
          const formData = new FormData()
          formData.append('files', file)

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }
          const url = `${API_URL}job/add/attachments/?jId=${props.id}&eId=${localStorage.getItem('employeeId')}`
          isDownloading.value = true
          try {
            const response = await axios.patch(url, formData, config)
            if (response.status === 200) {
              toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Image updated successfully',
                life: 3000
              })
            }
          } catch (error) {
            console.log(error)
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update image',
              life: 3000
            })
          } finally {
            isDownloading.value = false
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }
  fileInput.click()
}

const downloadImage = (index: number): void => {
  const link = document.createElement('a')
  link.href = images.value[index].src
  link.download = `downloaded-image-${index + 1}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const deleteImage = async (index: number): Promise<void> => {
  // Clear the images array
  images.value.splice(index, 1)
  // Prepare the request body
  const imgUrls = images.value.map((image) => image.src)
  const body = {
    employeeId: localStorage.getItem('employeeId'),
    jobId: props.id,
    attachments: imgUrls
  }
  console.log('Body:', body)
  // Get the API URL

  const url = `${API_URL}job/updateAttachments`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  isDeleting.value = true
  try {
    const response = await axios.patch(url, body, config)
    if (response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Image deleted successfully',
        life: 3000
      })
    }
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete image',
      life: 3000
    })
  } finally {
    isDeleting.value = false
  }
}
const hasImages = computed(() => images.value.length > 0)

onMounted(() => {
  getJobData()
})
</script>
<style scoped>
.image-actions-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.v-carousel {
  overflow: hidden;
}
</style>
