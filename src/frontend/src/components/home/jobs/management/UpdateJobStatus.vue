<template>
 <v-dialog persistent     v-model="statusDialog"
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
        @click="statusDialog = true"
        v-bind="activatorProps"
      >
        <v-icon left>
          {{ 'fa: fa-solid fa-tasks' }}
        </v-icon>
        Update Status
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="bg-cardColor">
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Update Job Status
        </v-card-title>
        <v-card-text>
          <v-radio-group
            v-model="displayJob.status"
            column
            :disabled="req_loading"
            class="my-custom-radio-group"
            row
            background-color="#f5f5f5"
          >
            <v-radio label="Todo" value="To do" :color="colors.todo"></v-radio>
            <v-radio label="In progress" value="In Progress" :color="colors.inProgress"></v-radio>
            <v-radio
              label="Awaiting Invoice"
              value="Awaiting Invoice"
              :color="colors.awaitingInvoice"
            ></v-radio>
            <v-radio
              label="Awaiting payment"
              value="Awaiting Payment"
              :color="colors.awaitingPayment"
            ></v-radio>
            <v-radio
              label="Awaiting sign off"
              value="Awaiting SignOff"
              :color="colors.awaitingSignOff"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions class="d-flex flex-column">
          <v-container>
            <v-row>
              <v-col cols="12" lg="6">
                <v-btn @click="saveStatus" color="success" :loading="req_loading" block>
                  Save
                </v-btn></v-col
              >
              <v-col cols="12" lg="6"
                ><v-btn @click="isActive.value = false" color="error" block :disabled="req_loading">
                  Cancel
                </v-btn></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { API_URL } from '@/main'

// Reactive state
const statusDialog = ref(false)

// Toast for notifications
const toast = useToast()

// Define props with TypeScript
const props = defineProps({
  passedInJob: Object
})

const restructureJob = (job: any) => {
  if (!job) {
    console.error('Job data is undefined')
    return {}
  }
  return {
    _id: job?._id || '',
    clientId: job?.clientId || '',
    clientUsername: job?.clientUsername || '',
    assignedBy: job?.assignedBy || '',
    assignedEmployees: {
      employeeIds: job?.assignedEmployees?.employeeIds || []
    },
    status: job?.status || '',
    details: {
      heading: job?.details?.heading || '',
      description: job?.details?.description || '',
      address: {
        street: job?.details?.address?.street || '',
        province: job?.details?.address?.province || '',
        suburb: job?.details?.address?.suburb || '',
        city: job?.details?.address?.city || '',
        postalCode: job?.details?.address?.postalCode || '',
        complex: job?.details?.address?.complex || '',
        houseNumber: job?.details?.address?.houseNumber || ''
      },
      startDate: job?.details?.startDate || '',
      endDate: job?.details?.endDate || ''
    },
    recordedDetails: {
      imagesTaken: job?.recordedDetails?.imagesTaken || [],
      inventoryUsed: job?.recordedDetails?.inventoryUsed || []
    },
    taskList: job?.taskList || [],
    comments: job?.comments || [],
    createdAt: job?.createdAt || '',
    updatedAt: job?.updatedAt || ''
  }
}

// Colors object with custom colors
const displayJob = reactive({
  status: ''
})

const colors = {
  todo: '#ff9999', // Light red
  inProgress: '#99ccff', // Light blue
  awaitingInvoice: '#ffcc99', // Light orange
  awaitingPayment: '#ffff99', // Light yellow
  awaitingSignOff: '#ccff99' // Light green
} as const

// Toast messages
const showJobCommentSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Successfully commented on job',
    life: 3000
  })
}

const showJobCommentError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'An error occurred while commenting on this job',
    life: 3000
  })
}

let req_loading = ref<boolean>(false)

// Method to save status
const saveStatus = async () => {
  console.log(props.passedInJob)
  if (!props.passedInJob) {
    console.error('No job data passed in')
    return
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }

  try {
    req_loading.value = true
    console.log(props.passedInJob)
    const job = restructureJob(props.passedInJob)

    const updatedJob = {
      ...job,
      status: displayJob.status // Ensure to update the status here
    }
    console.log(updatedJob)
    // Make the PATCH request to update the job
    const response = await axios.patch(`${API_URL}job/${job._id}`, updatedJob, config)
    console.log(response.data)
    if (response.status < 300 && response.status > 199) {
      showJobCommentSuccess()
    } else {
      showJobCommentError()
    }
  } catch (error) {
    console.error('Error updating job:', error)
    showJobCommentError()
  } finally {
    req_loading.value = false
  }
  statusDialog.value = false
}
</script>

<style scoped></style>
