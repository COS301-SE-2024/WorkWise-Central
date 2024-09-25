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
        Change Client
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="bg-cardColor">
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Change the client
        </v-card-title>

        <v-card-text>
          <div class="text-caption pa-3">Select a client</div>

          <v-autocomplete
            v-model="selectedClient"
            hint="Click the field to select a client"
            :items="clientData.filter((item) => getClientFullName(item))"
            :item-title="getClientFullName"
            item-value="_id"
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
          <v-container
            ><v-row
              ><v-col cols="12" lg="6">
                <v-btn @click="saveClient" color="success" block
                  ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
                ></v-col
              ><v-col cols="12" lg="6">
                <v-btn @click="isActive.value = false" color="error" block
                  ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Close</v-btn
                ></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <Toast position="top-center" />
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { API_URL } from '@/main'

interface Client {
  _id: string
  details: {
    firstName: string
    lastName: string
  }
}

const props = defineProps<{
  jobID: string
}>()

const toast = useToast()
const clientDialog = ref<boolean>(false)
const selectedClient = ref<Client>({
  _id: '',
  details: {
    firstName: '',
    lastName: ''
  }
})
const clientData = ref<Client[]>([])

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}


const showClientChangeSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Changed client successfully',
    life: 3000
  })
  clientDialog.value = false
}

const showClientChangeError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Failed to change client',
    life: 3000
  })
}

const getClients = async () => {
  try {
    const response = await axios.get(
      `${API_URL}client/all/${localStorage.getItem('currentCompany')}?currentEmployeeId=${localStorage.getItem('employeeId')}`,
      config
    )
    if (response.status < 300 && response.status > 199) {
      console.log(response)
      clientData.value = response.data.data
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
    console.error('Error updating job:', error)
  }
}

const getCurrentClient = async () => {
  try {
    const response = await axios.get(`${API_URL}job/id/${props.jobID}`, config)
    if (response.status > 199 && response.status < 300) {
      console.log('Client job data', response.data.data.clientId)
      selectedClient.value = {
        _id: response.data.data.clientId._id,
        details: {
          firstName: response.data.data.clientId.details.firstName,
          lastName: response.data.data.clientId.details.lastName
        }
      }
    } else {
      console.log('Wtf happened?', response)
    }
  } catch (error) {
    console.error('Error fetching current client:', error)
  }
}

const openClientDialogAndFetchClients = () => {
  clientDialog.value = true
}

const saveClient = async () => {
  try {
    const response = await axios.patch(
      `${API_URL}job/update/${props.jobID}`,
      { clientId: selectedClient.value },
      config
    )
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      showClientChangeSuccess()
    } else {
      console.log('Wtf happened?', response)
    }
  } catch (error) {
    console.error('Error updating job:', error)
    showClientChangeError()
  }
}

onMounted(() => {
  getCurrentClient()
  getClients()
})

const getClientFullName = (item: Client) => {
  if (item.details && item.details.firstName && item.details.lastName) {
    return `${item.details.firstName} ${item.details.lastName}`
  }
  return ''
}
</script>
