<template>
  <div class="avatar-upload">
    <v-avatar color="grey" rounded="1" size="150" @click="triggerFileInput" class="avatar-wrapper">
      <v-img :src="avatarSrc" cover></v-img>
      <v-icon small class="camera-icon" color="grey" style="opacity: 0.7">mdi-camera</v-icon>
    </v-avatar>
    <v-file-input
      ref="fileInput"
      accept="image/*"
      class="hidden bg-transparent"
      @change="onFileChange"
    ></v-file-input>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { onUpdated } from 'vue'
import axios from 'axios'
import avatarImage from '@/assets/images/profile/avatar.jpg'

const avatarSrc = ref(avatarImage)
const displayName = ref('')

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

const getProfileImage = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  const userId = localStorage.getItem('id')

  try {
    const response = await axios.get(`${apiUrl}users/id/${userId}`, config)
    const data = response.data.data

    displayName.value = data.profile.displayName || ''
    avatarSrc.value = data.profile.displayImage || avatarImage
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  if (fileInput.value != null) {
    fileInput.value.click()
  }
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        avatarSrc.value = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

const updateProfileImage = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  const userId = localStorage.getItem('id')

  const updatedUserData = {
    profile: {
      displayName: displayName.value,
      displayImage: avatarSrc.value
    }
  }

  try {
    await axios.patch(`${apiUrl}users/update`, updatedUserData, config)
  } catch (error) {
    console.log('Failed to upload image: ', error)
  }
}

onMounted(() => {
  getProfileImage()
})

// onUpdated(() => {
//   window.addEventListener('UploadImage', updateProfileImage)
// })
</script>

<style scoped>
.avatar-upload {
  position: relative;
  display: inline-block;
}

.avatar-wrapper {
  cursor: pointer;
  position: relative;
}

.camera-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 5px;
}

.hidden {
  display: none;
}
</style>
