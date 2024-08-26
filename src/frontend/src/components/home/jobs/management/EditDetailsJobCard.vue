<template>
  <v-card flat class="text-center elevation-0" :min-height="1800">
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
        <!--                <v-row>-->
        <!--                  <v-col cols="5"> </v-col>-->
        <!--                  <v-label>Description</v-label>-->
        <!--                  <Editor-->
        <!--                    v-model="job.details.description"-->
        <!--                    editorStyle="height: 300px;"-->
        <!--                    contentStyle="color: #f5f5f5;"-->
        <!--                  />-->
        <!--                </v-row>-->
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
        <v-row>
          <v-col align="center" cols="12" md="6">
            <v-date-picker
              title="SELECT START DATE"
              header="Start date of job"
              border="md"
              width="unset"
              max-width="350"
              v-model="startDate"
              elevation="5"
              required
              :rules="startDateRule"
              @update:modelValue="updateAllowedTimes"
              data-testid="job-start-date-datepicker"
              :min="minDate"
              style="height: 475px"
            ></v-date-picker>
          </v-col>
          <v-col cols="12" md="6" align="center">
            <v-time-picker
              format="24hr"
              :allowed-hours="allowedHours"
              :allowed-minutes="allowedMinutes"
              v-model="startTime"
              data-testid="job-start-time-timepicker"
              elevation="5"
              style="height: 475px"
            ></v-time-picker>
          </v-col>
          <v-col align="center" cols="12" md="6">
            <v-date-picker
              title="SELECT END DATE"
              header="End date of job"
              border="md"
              width="unset"
              max-width="350"
              :rules="endDateRule"
              v-model="endDate"
              elevation="5"
              required
              @update:modelValue="updateAllowedTimesEnd"
              data-testid="job-end-date-datepicker"
              :min="minDate"
              style="height: 475px"
            ></v-date-picker>
          </v-col>
          <v-col cols="12" md="6" align="center">
            <v-time-picker
              :allowed-hours="allowedHours2"
              :allowed-minutes="allowedMinutes2"
              format="24hr"
              v-model="endTime"
              data-testid="job-end-time-timepicker"
              elevation="5"
            ></v-time-picker>
          </v-col>
        </v-row>
        <v-row cols="12" class="justify-center">
          <v-btn color="success" @click="patchJobDetails"
            ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
  <Toast position="top-center" />
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
// import Editor from 'primevue/editor'

const toast = useToast()

interface Address {
  street: string
  province: string
  suburb: string
  city: string
  postalCode: string
  complex: string
  houseNumber: string
}

interface JobDetails {
  heading: string
  description: string
  address: Address
  startDate: string
  endDate: string
}

const props = defineProps<{
  jobDetails: JobDetails
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
    if (startDate.value != null && startTime.value != null) {
      job.value.details.startDate = `${startDate.value}T${startTime.value}:00.000Z`
    }
    if (endDate.value != null && endTime.value != null) {
      job.value.details.endDate = `${endDate.value}T${endTime.value}:00.000Z`
    }
    console.log(job.value.details)
    const response = await axios.patch(
      `${apiUrl}job/update/${props.jobID}`,
      job.value.details,
      config
    )
    if (response.status < 300 && response.status > 199) {
      console.log(response)
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

// Define the rules and minimum date
const startDateRule = [(v: string) => !!v || 'Start date is required']
const endDateRule = [(v: string) => !!v || 'End date is required']
const minDate = new Date().toISOString().substr(0, 10)

// Define the reactive variables
const allowedHours2 = ref<(hour: number) => boolean>(() => true)
const allowedMinutes2 = ref<(minute: number) => boolean>(() => true)
const endTime = ref<string>('')

// Define the reactive variables
const endDate = ref<string | null>(null)
const startDate = ref<string | null>(null)
const startTime = ref<string>('')

// Define the current hour and minute
const now = new Date()
const currentHour = now.getHours()
const currentMinute = now.getMinutes()

// Define the allowed hours and minutes
const allowedHours = ref<(hour: number) => boolean>(() => true)
const allowedMinutes = ref<(minute: number) => boolean>(() => true)

// Function to update allowed times
const updateAllowedTimes = () => {
  const isToday = startDate.value === minDate

  console.log('updateAllowedTimes')
  if (isToday) {
    allowedHours.value = (hour: number) => hour > currentHour
    allowedMinutes.value = (minute: number) => {
      return startTime.value
        ? minute > currentMinute || parseInt(startTime.value.split(':')[0]) !== currentHour
        : true
    }
  } else {
    allowedHours.value = () => true
    allowedMinutes.value = () => true
  }
}

const updateAllowedTimesEnd = () => {
  const isToday = endDate.value === minDate

  console.log('updateAllowedTimes')
  if (isToday) {
    allowedHours2.value = (hour: number) => hour > currentHour
    allowedMinutes2.value = (minute: number) => {
      return endTime.value
        ? minute > currentMinute || parseInt(endTime.value.split(':')[0]) !== currentHour
        : true
    }
  } else {
    allowedHours2.value = () => true
    allowedMinutes2.value = () => true
  }
}
</script>
