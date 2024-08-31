<template>
  <v-card elevation="14" rounded="md">
    <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
      <h2 class="flex-grow-1">{{ props.passedInJob?.details?.heading }}</h2>
    </v-card-title>
    <v-card-text class="text-center">
      <v-row>
        <v-col xs="12" sm="12" md="9">
<!--          <EditDetails :jobDetails="props?.passedInJob?.details" :jobID="props.passedInJob?._id" />-->
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
              <v-col  cols="12" md="6" class="d-flex justify-center align-center">
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
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
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
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
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
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
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
          </v-form>
        </v-col>
        <v-col xs="12" sm="12" md="3">
          <v-col>
            <ChangeClient :jobID="props.passedInJob?._id" />
          </v-col>
          <v-col>
            <SelectMembers :jobID="props.passedInJob?._id" />
          </v-col>
          <!--          <v-col>-->
          <!--            <UpdateJobStatus :passedInJob="props.passedInJob" />-->
          <!--          </v-col>-->
          <v-col>
            <!--              <ChangeDueDate :jobDetails="props.passedInJob?.details" :jobID="props.passedInJob?._id"  />-->
          </v-col>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex flex-column">
      <v-container>
        <v-row>
          <v-col class="d-flex flex-column" order="last" order-lg="first" cols="12" lg="6">
            <v-btn class="mb-4" @click="cancelJob" color="error" block
              ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Close</v-btn
            >
          </v-col>
          <v-col class="d-flex flex-column" order="first" order-lg="last" cols="12" lg="6">
            <v-btn class="mb-4" @click="patchJobDetails" color="success" block
              ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
            >
          </v-col></v-row
        ></v-container
      >
    </v-card-actions>
  </v-card>
  <Toast position="top-center" />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref} from 'vue'
import ChangeClient from './ChangeClientDialog.vue'
import SelectMembers from './SelectMembers.vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
// import ChangeDueDate from './UpdateDateDialog.vue'

// Props and Emits
const props = defineProps<{ passedInJob: any }>()
const emits = defineEmits(['close', 'save'])

// Toast for notifications
const toast = useToast()

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Province Options
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

// Reactive Variables
const job = ref({
  details: {
    heading: props.passedInJob.details.heading,
    description: props.passedInJob.details.description,
    address: {
      street: props.passedInJob.details.address.street,
      suburb: props.passedInJob.details.address.suburb,
      city: props.passedInJob.details.address.city,
      postalCode: props.passedInJob.details.address.postalCode,
      complex: props.passedInJob.details.address.complex,
      houseNumber: props.passedInJob.details.address.houseNumber,
      province: props.passedInJob.details.address.province
    },
    startDate: props.passedInJob.details.startDate,
    endDate: props.passedInJob.details.endDate
  }
})

// Date and Time Variables
const startDate = ref<string | null>(null)
const startTime = ref<string>('')
const endDate = ref<string | null>(null)
const endTime = ref<string>('')

// Current Date and Time
const now = new Date()
const currentHour = now.getHours()
const currentMinute = now.getMinutes()

// Date Rules and Minimum Date
const startDateRule = [(v: string) => !!v || 'Start date is required']
const endDateRule = [(v: string) => !!v || 'End date is required']
const minDate = new Date().toISOString().slice(0, 10);

// Allowed Hours and Minutes
const allowedHours = ref<(hour: number) => boolean>(() => true)
const allowedMinutes = ref<(minute: number) => boolean>(() => true)
const allowedHours2 = ref<(hour: number) => boolean>(() => true)
const allowedMinutes2 = ref<(minute: number) => boolean>(() => true)

// Utility Functions
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

// Function to Update Allowed Start Times
const updateAllowedTimes = () => {
  const isToday = startDate.value === minDate
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

// Function to Update Allowed End Times
const updateAllowedTimesEnd = () => {
  const isToday = endDate.value === minDate
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

// Patch Job Details
const patchJobDetails = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    // Validate and set startDate
    if (startDate.value && startTime.value) {
      const startTimeString = startTime.value
      const [hours, minutes] = startTimeString.split(':').map(Number)
      const startDateTime = new Date(startDate.value)
      startDateTime.setHours(hours, minutes, 0, 0)
      if (!isNaN(startDateTime.getTime())) {
        job.value.details.startDate = startDateTime.toISOString()
      } else {
        console.error('Invalid start date/time:', startDateTime)
      }
    } else {
      console.error('Missing start date or time value')
    }

    // Validate and set endDate
    if (endDate.value && endTime.value) {
      // Construct a valid ISO string manually
      const endDateTimeStr = endTime.value
      const [hours, minutes] = endDateTimeStr.split(':').map(Number)
      const endDateTime = new Date(endDate.value)
      endDateTime.setHours(hours, minutes, 0,0)
      if (!isNaN(endDateTime.getTime())) {
        job.value.details.endDate = endDateTime.toISOString()
      } else {
        console.error('Invalid end date/time:', endDateTimeStr)
      }
    } else {
      console.error('Missing end date or time value')
    }

      // Make patch request
    const response = await axios.patch(
      `${apiUrl}job/update/${props.passedInJob._id}`,
      { details: job.value.details },
      config
    )
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

// Event Handlers
const cancelJob = () => {
  emits('close')
}

// Toast Notifications
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
    detail: 'An error occurred while editing the details of this job',
    life: 3000
  })
}
</script>
