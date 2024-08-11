<template>
  <v-dialog
    v-model="clientDialog"
    max-width="400px"
    location="bottom"
    location-strategy="connected"
    opacity="0"
    origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        width="100%"
        border="md"
        elevation="5"
        @click="openClientDialogAndFetchClients"
        v-bind="activatorProps"
      >
        <v-icon left>
          {{ 'fa: fa-solid fa-user-edit' }}
        </v-icon>
        Change Client
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Change the client
        </v-card-title>

        <v-card-text>
          <div class="text-caption pa-3">Select a client</div>

          <v-autocomplete
            v-model="selectedClientName"
            hint="Click the field to select a client"
            :items="clientNames"
            label="Select Client"
            prepend-icon="fa: fa-solid fa-handshake"
            persistent-hint
            outlined
            dense
            class="my-custom-autocomplete"
            color="primary"
            background-color="#f5f5f5"
            rounded="l"
            variant="solo"
          >
          </v-autocomplete>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <v-btn @click="saveClient" color="success">Save</v-btn>
          <v-btn @click="isActive.value = false" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <Toast />
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

interface Address {
  street: string
  province: string
  suburb: string
  city: string
  postalCode: string
  complex?: string
  houseNumber?: string
}

interface ContactInfo {
  phoneNumber: string
  email: string
}

interface Details {
  firstName: string
  lastName: string
  preferredLanguage?: string
  contactInfo: ContactInfo
  address: Address
  vatNumber?: string
  companyId: any // Replace with appropriate type if known
  idNumber?: string
  type?: string
}

interface Client {
  _id: any // Replace with appropriate type if known
  registrationNumber?: string
  details: Details
  createdAt: string
  updatedAt: string
}

const props = defineProps<{
  jobID: string
}>()

const toast = useToast()
const clientDialog = ref<boolean>(false)
const selectedClientName = ref<string>('')
const clientNames = ref<string[]>([])
const clientData = ref<Client[]>([])

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

const showClientChangeSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Changed client successfully',
    life: 3000
  })
}

const showClientChangeError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Failed to change client',
    life: 3000
  })
}

const getClients = async (): Promise<string> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}client/all`, config)
    if (response.status < 300 && response.status > 199) {
      console.log('Got client data')
      console.log(response.data.data)
      clientData.value = response.data.data
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.error('Error updating job:', error)
  }
  return 'cheese'
}

const openClientDialogAndFetchClients = () => {
  clientDialog.value = true
}

const saveClient = () => {
  clientDialog.value = false
}

onMounted(() => {
  getClients()
})
</script>
