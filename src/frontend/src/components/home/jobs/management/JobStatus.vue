<template>
  <v-select
      v-model="selectedStatus"
      label="Select"
      :items="statusItems"
      item-value="_id"
      item-title="status"
      variant="solo"
      color="primary"
      item-text="status"
      @update:modelValue="updateStatus"
  >
    <template #selection="{ item }">
      <v-chip :style="{ backgroundColor: item.raw.colour, color: 'white' }">
        {{ item.raw.status }}
      </v-chip>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'

interface Status {
  _id: string
  status: string
  colour: string
  companyId: string
  _v: number
}
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}
const props = defineProps<{ jobID: string; status: Status }>()
const statusItems = ref<Status[]>([])
const selectedStatus = ref<Status>(props.status)

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

const getAllStatuses = async () => {
  const url = await getRequestUrl()
  try {
    const response = await axios.get(
      `${url}job/status/all/${localStorage.getItem('currentCompany')}`,
      config
    )
    statusItems.value = response.data.data
    console.log('Status request:', response)
  } catch (error) {
    console.log(error)
  }
}

const updateStatus = async () => {
  console.log('Update status')
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.patch(
      `${apiUrl}job/update/${props.jobID}`,
      { status: selectedStatus.value },
      config
    )
    console.log('Status update:', response)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getAllStatuses()
})
</script>
