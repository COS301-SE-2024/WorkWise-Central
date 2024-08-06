<template>
  <v-card flat class="text-center elevation-0" :max-height="750">
    <v-card-text>
      <v-form ref="jobForm">
        <v-label>Job Name</v-label>
        <v-text-field
          v-model="job.details.heading"
          variant="solo"
          density="compact"
          color="grey-lighten-4"
          rounded="l"
          required
        ></v-text-field>
        <v-label>Job Description</v-label>
        <v-textarea
          v-model="job.details.description"
          clearable
          variant="solo"
          density="compact"
          color="grey-lighten-4"
          rounded="l"
          required
        ></v-textarea>
        <v-row>
          <v-col cols="6">
            <v-label>Street</v-label>
            <v-text-field
              v-model="job.details.address.street"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-label>Suburb</v-label>
            <v-text-field
              v-model="job.details.address.suburb"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-label>City</v-label>
            <v-text-field
              v-model="job.details.address.city"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-label>Postal Code</v-label>
            <v-text-field
              v-model="job.details.address.postalCode"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-label>Complex</v-label>
            <v-text-field
              v-model="job.details.address.complex"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-label>House Number</v-label>
            <v-text-field
              v-model="job.details.address.houseNumber"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-label>Province</v-label>
            <v-select
              v-model="job.details.address.province"
              variant="solo"
              :items="provinceOptions"
            ></v-select>
          </v-col>
        </v-row>
        <v-row cols="12" class="justify-center">
          <v-btn color="success" @click="patchJobDetails"> Save </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
  <Toast />
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

interface Address {
  street: string;
  province: string;
  suburb: string;
  city: string;
  postalCode: string;
  complex: string;
  houseNumber: string;
}

interface JobDetails {
  heading: string;
  description: string;
  address: Address;
  startDate: string;
  endDate: string;
}

const props = defineProps<{
  jobDetails: JobDetails;
  jobID: string
}>()

const provinceOptions = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape'
]

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

const patchJobDetails = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    console.log(job.value.details)
    const response = await axios.patch(`${apiUrl}job/${props.jobID}`, job.value.details, config)
    if (response.status < 300 && response.status > 199) {
      showEditSuccess()
    } else {
      showEditError()
    }
  } catch (error) {
    console.error('Error getting editing job details', error)
    showEditError()
  }
}

const job = ref({
  details: {
    heading: props.jobDetails.heading,
    description: props.jobDetails.description,
    address: {
      street: props.jobDetails.address.street,
      suburb: props.jobDetails.address.suburb,
      city: props.jobDetails.address.city,
      postalCode: props.jobDetails.address.postalCode,
      complex: props.jobDetails.address.complex,
      houseNumber: props.jobDetails.address.houseNumber,
      province: props.jobDetails.address.province
    },
    startDate: props.jobDetails.startDate,
    endDate: props.jobDetails.endDate
  }
})

const showEditSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Successfully edited details',
    life: 3000
  })
}

const showEditError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'An error occurred while editing the details this job',
    life: 3000
  })
}
</script>
