<template>
  <v-card class="bg-cardColor">
    <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
      <h2 class="flex-grow-1">{{ props.passedInJob.heading }}</h2>
    </v-card-title>
    <v-row>
      <v-col xs="12" sm="9" md="9" lg="9" xl="9" class="pr-0 pb-0" cols="12">
        <EditDetails :passedInJob="props.passedInJob" />
      </v-col>
      <v-col xs="12" sm="3" md="3" lg="3" xl="3" class="pl-0 pb-0" cols="12">
        <v-card flat class="pa-5 bg-cardColor elevation-0">
          <div class="d-flex flex-column">
            <!-- For client change -->
            <ChangeClient />
            <!-- Multi-member select -->
            <SelectMembers />
            <!-- For job status-->
            <UpdateJobStatus :passedInJob="props.passedInJob" />
            <!-- For date change -->
            <ChangeDueDate :passedInJob="props.passedInJob"/>
          </div>
          <v-card-actions class="d-flex flex-column">
            <Toast />
            <v-btn class="mb-2" @click="saveJob" color="success">Save</v-btn>
            <v-btn class="mb-4" @click="cancelJob" color="error">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { defineProps } from 'vue'
import { useToast } from 'primevue/usetoast'
import EditDetails from './EditDetailsJobCard.vue'
import ChangeClient from './ChangeClientDialog.vue'
import SelectMembers from './SelectMembers.vue'
import UpdateJobStatus from './UpdateJobStatus.vue'
import ChangeDueDate from './UpdateDateDialog.vue'

const toast = useToast()

const props = defineProps({
  passedInJob: Object
})

// Editing the job details dialog

const job = ref({
  clientId: ref(''),
  status: ref(''),
  jobDetails: {
    jobName: ref(''),
    description: ref(''),
    jobAddress: {
      street: ref(''),
      suburb: ref(''),
      city: ref(''),
      postalCode: ref(''),
      complex: ref(''),
      houseNumber: ref('')
    }
  },
  jobStartDate: ref(null),
  jobEndDate: ref(null)
})

function filterNonEmptyValues(obj) {
  return Object.fromEntries(
      Object.entries(obj)
          .filter(([_, v]) => v != null && v !== '' && !(Array.isArray(v) && v.length === 0))
          .map(([k, v]) => [
            k,
            typeof v === 'object' && !Array.isArray(v) ? filterNonEmptyValues(v) : v
          ])
  )
}

const saveJob = () => {
  const pathJob = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
    }

    const jobData = {
      clientId: job.value.clientId,
      status: job.value.status,
      jobDetails: {
        jobName: job.value.jobDetails.jobName,
        description: job.value.jobDetails.description,
        jobAddress: {
          street: job.value.jobDetails.jobAddress.street,
          suburb: job.value.jobDetails.jobAddress.suburb,
          city: job.value.jobDetails.jobAddress.city,
          postalCode: job.value.jobDetails.jobAddress.postalCode,
          complex: job.value.jobDetails.jobAddress.complex,
          houseNumber: job.value.jobDetails.jobAddress.houseNumber
        }
      },
      jobStartDate: job.value.jobStartDate,
      jobEndDate: job.value.jobEndDate
    }

    const filteredJobData = filterNonEmptyValues(jobData)

    try {
      const response = await axios.patch(
          `http://localhost:3000/job/${props.passedInJob.jobId}`,
          filteredJobData,
          config
      )
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Job updated successfully'
      })
      console.log('Job updated successfully:', response.data)
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update job'
      })
      console.error('Error updating job:', error)
    }
  }
}

const emit = defineEmits(['close'])
const cancelJob = () => {
  emit('close')
}
</script>