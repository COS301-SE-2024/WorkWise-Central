<template>
  <v-dialog
    v-model="managerJobCard"
    :max-height="700"
    :max-width="1000"
    scrollable
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          text="Edit"
          prepend-icon="fa:fa-solid fa-pencil"
          color="warning"
          v-bind="activatorProps"
        ></v-btn>
      </v-defaults-provider>
    </template>
    <v-card elevation="14" rounded="md" :max-height="1000" :max-width="900">
      <v-img
        src="https://media.istockphoto.com/id/2162545535/photo/two-male-workers-taking-a-break-at-the-construction-site.jpg?s=612x612&w=is&k=20&c=xceTrLx7-MPKjjLo302DjIw1mGaZiKAceaWIYsRCX0U="
        aspect-ratio="5.75"
      ></v-img>
      <!--      <v-img :src="props.passedInJob.imageUrl" aspect-ratio="2.75"></v-img>-->
      <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
        <h2 class="flex-grow-1">{{ props.passedInJob.heading }}</h2>
      </v-card-title>
      <v-card-text class="text-center">
        <v-row>
          <v-col xs="12" sm="12" md="9" lg="9" xl="9" class="pr-0 pb-0" cols="12">
            <EditDetails :passedInJob="props.passedInJob" />
          </v-col>
          <v-col xs="12" sm="12" md="3" lg="3" xl="3">
            <v-col>
              <!-- For client change -->
              <ChangeClient />
            </v-col>
            <v-col>
              <!-- Multi-member select -->
              <SelectMembers />
            </v-col>
            <v-col>
              <!-- For job status -->
              <UpdateJobStatus :passedInJob="props.passedInJob" />
            </v-col>
            <v-col>
              <!-- For date change -->
              <ChangeDueDate :passedInJob="props.passedInJob" />
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col class="d-flex flex-column">
          <Toast />
          <v-btn class="mb-2" @click="saveJob" color="success">Save</v-btn>
          <v-btn class="mb-4" @click="cancelJob" color="error">Cancel</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
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

const managerJobCard = ref(false) // Dialog state

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

<style scoped>
.card-with-image-background {
  background-color: #f5f5f5; /* Light grey color that blends well with most images */
}
</style>
