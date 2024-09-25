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
import { API_URL } from '@/main'

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


const getAllStatuses = async () => {
  try {
    const response = await axios.get(
      `${API_URL}job/status/all/${localStorage.getItem('currentCompany')}`,
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
  try {
    const response = await axios.patch(
      `${API_URL}job/update/${props.jobID}`,
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
