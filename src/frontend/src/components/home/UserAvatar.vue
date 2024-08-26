<template>
  <v-menu width="300px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-avatar color="secondary" style="width: 38px; height: 36px">
          <template v-if="displayImage">
            <v-img :src="displayImage" alt="User Avatar"></v-img>
          </template>
          <template v-else>
            <span class="text-h6">{{ user.initials }}</span>
          </template>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="secondary" style="width: 38px; height: 36px">
            <template v-if="displayImage">
              <v-img :src="displayImage" alt="User Avatar"></v-img>
            </template>
            <template v-else>
              <span class="text-h6">{{ user.initials }}</span>
            </template>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>

          <router-link to="/userSettings" class="text-decoration-none">
            <v-btn variant="text" width="100%"> <i class="fas fa-cog"></i> Settings </v-btn>
          </router-link>

          <v-divider class="my-3"></v-divider>

          <router-link to="/manageCompanies" class="text-decoration-none">
            <v-btn variant="text" width="100%">
              <i class="fas fa-building"></i> Manage Companies
            </v-btn>
          </router-link>
          <v-divider class="my-3"></v-divider>

          <v-btn variant="text" @click="logout" width="100%">
            <i class="fas fa-sign-out-alt"></i> Logout
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
// import avatarImage from '@/assets/images/profile/avatar.jpg'

const firstName = ref('')
const lastName = ref('')
const displayImage = ref('')

const makeInitials = (firstName: string, lastName: string) => {
  if (!firstName || !lastName) return ''
  return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

const user = ref({
  initials: '',
  fullName: '',
  email: localStorage.getItem('email')
})

const updateUser = () => {
  user.value.initials = makeInitials(firstName.value, lastName.value)
  user.value.fullName = `${firstName.value} ${lastName.value}`
}

const router = useRouter()

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

const getUserData = async () => {
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

    firstName.value = data.personalInfo.firstName
    lastName.value = data.personalInfo.surname
    displayImage.value = data.profile.displayImage
    console.log('Heres the display image:', displayImage.value)

    updateUser()
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const logout = () => {
  // Perform logout logic, then redirect to login page
  localStorage.clear()
  router.replace('/')
}

onMounted(() => {
  getUserData()
})
</script>

<style></style>
