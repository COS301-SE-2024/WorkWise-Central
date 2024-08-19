<template>
  <v-container>
    <v-row v-for="(image, index) in images" :key="index" class="mb-3">
      <v-col cols="12">
        <v-row>
          <v-col offset="1" cols="10" class="pt-0">
            <v-img
              :src="image.src"
              min-height="auto"
              min-width="auto"
              @click="openImageOverlay(index)"
            ></v-img>
          </v-col>
          <v-col cols="1" class="pt-0">
            <v-btn @click="openImageActionsDialog(index)">
              <v-icon>
                {{ 'fa: fa-solid fa-ellipsis-h' }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog
          v-model="image.dialog"
          max-width="300px"
          location="bottom"
          location-strategy="connected"
          opacity="0"
          origin="top center"
        >
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                Image Actions
              </v-card-title>
              <v-card-actions class="d-flex flex-column">
                <v-btn color="primary" @click="uploadImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-upload' }}
                  </v-icon>
                  Upload
                </v-btn>
                <v-btn color="info" @click="changeImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-sync' }}
                  </v-icon>
                  Change Image
                </v-btn>
                <v-btn color="success" @click="downloadImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-download' }}
                  </v-icon>
                  Download
                </v-btn>
                <v-btn color="error" @click="deleteImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-trash' }}
                  </v-icon>
                  Delete
                </v-btn>
                <v-btn color="error" @click="isActive.value = false">
                  <v-icon>
                    {{ 'fa: fa-solid fa-times' }}
                  </v-icon>
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row cols="12">
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
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="imageOverlay = false">
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
  <Toast/>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

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
// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

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

const getJobData = async () => {
  console.log("Getting job data", props.id)
  const apiUrl = getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}job/id/${props.id}`, config)
    if (response.status > 199 && response.data < 300) {
      const job = response.data.data
      console.log("Job:", job)
      if (job.attachments) {
        console.log("Got job data")
        job.attachments.forEach((attachment: string) => {
          images.value.push({
            src: attachment,
            dialog: false
          })
        })
      }
    }

  } catch(error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch images' })
  }

}

const uploadImage = async (index: number) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const formData = new FormData()
  formData.append('files', images.value[index].src)
  const apiUrl = await getRequestUrl()
  const url = `${apiUrl}job/add/attachments/?jId=${props.id}&eId=${localStorage.getItem('employeeId')}`
  try {
    const response = await axios.patch(url, formData, config)
    if (response.status === 200) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully', life:3000 })
    }
  } catch (error) {
    console.log(error)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload image', life:3000 })
    console.log(url)
  }
}

const handleFileChange = (): void => {
  const file = newFile.value
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        images.value.push({
          src: e.target.result as string,
          dialog: false
        })
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
  fileInput.onchange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          images.value[index].src = e.target.result as string
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

const deleteImage = (index: number): void => {
  images.value.splice(index, 1)
}

onMounted(() => {
  getJobData()
})
</script>
<style scoped>
h5 {
  display: flex;
  align-items: center;
}
</style>
