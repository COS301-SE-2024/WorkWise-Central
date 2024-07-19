<template>
  <v-card class="bg-cardColor">
    <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
      <h2 class="flex-grow-1">{{ passedInJob.heading }}</h2>
    </v-card-title>
    <v-row>
      <v-col xs="12" sm="9" md="9" lg="9" xl="9" class="pr-0 pb-0" cols="12">
        <v-card flat class="text-center elevation-0">
          <v-card-text>

            <!--            Edit the details of a job -->

            <v-form ref="jobForm">
              <v-label>Job Name</v-label>
              <v-text-field
                  v-model="job.jobDetails.jobName"
                  variant="solo"
                  density="compact"
                  color="grey-lighten-4"
                  rounded="l"
                  required
                  :value="passedInJob.heading"
              ></v-text-field>
              <v-label>Job Description</v-label>
              <v-textarea
                  v-model="job.jobDetails.jobDescription"
                  clearable
                  variant="solo"
                  density="compact"
                  color="grey-lighten-4"
                  rounded="l"
                  required
                  :value="passedInJob.jobDescription"
              ></v-textarea>
              <v-row>
                <v-col cols="6">
                  <v-label>Street</v-label>
                  <v-text-field
                      v-model="job.jobDetails.jobAddress.street"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      required
                      :value="passedInJob.street"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-label>Suburb</v-label>
                  <v-text-field
                      v-model="job.jobDetails.jobAddress.suburb"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      required
                      :value="passedInJob.suburb"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-label>City</v-label>
                  <v-text-field
                      v-model="job.jobDetails.jobAddress.city"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      required
                      :value="passedInJob.city"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-label>Postal Code</v-label>
                  <v-text-field
                      v-model="job.jobDetails.jobAddress.postalCode"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      required
                      :value="passedInJob.postalCode"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-label>Complex</v-label>
                  <v-text-field
                      v-model="job.jobDetails.jobAddress.complex"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      :value="passedInJob.complex"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-label>House Number</v-label>
                  <v-text-field
                      v-model="job.jobDetails.jobAddress.houseNumber"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      required
                      :value="passedInJob.houseNumber"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="3" md="3" lg="3" xl="3" class="pl-0 pb-0" cols="12">
        <v-card flat class="pa-5 bg-cardColor elevation-0">
          <div class="d-flex flex-column">



            <!-- For client change -->
            <ChangeClient/>


            <!-- Mutli-member select -->

            <v-btn class="mb-2" outlined @click="membersDialog = true">
              <v-icon class="d-none d-lg-inline-block mr-2" left>{{
                'fa: fa-solid fa-users-cog'
              }}</v-icon>
              Select Employees
            </v-btn>

            <v-dialog v-model="membersDialog" max-width="600px">
              <v-card>
                <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                  Assigned Employees
                </v-card-title>
                <v-card-text>
                  <div class="text-caption pa-3">Select Employees</div>
                  <v-select
                    v-model="favorites"
                    :items="states"
                    hint="Pick your favorite states"
                    label="Select Team Members"
                    prepend-icon="fa: fa-solid fa-users"
                    multiple
                    persistent-hint
                    outlined
                    dense
                    class="my-custom-autocomplete"
                    background-color="#f5f5f5"
                    rounded="l"
                    variant="solo"
                  ></v-select>
                </v-card-text>
                <v-card-actions class="d-flex flex-column">
                  <v-btn @click="saveSelection" color="success"> Save </v-btn>
                  <v-btn @click="membersDialog = false" color="error"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn class="mb-2" outlined @click="statusDialog = true">
              <v-icon class="d-none d-lg-inline-block mr-2" left>{{
                'fa: fa-solid fa-tasks'
              }}</v-icon>
              Update Status
            </v-btn>

            <v-dialog v-model="statusDialog" max-width="600px">
              <v-card>
                <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                  Update Job Status
                </v-card-title>
                <v-card-text>
                  <v-radio-group
                    v-model="job.status"
                    column
                    class="my-custom-radio-group"
                    row
                    background-color="#f5f5f5"
                  >
                    <v-radio label="Todo" value="todo" :color="colors.todo"></v-radio>
                    <v-radio
                      label="In progress"
                      value="inProgress"
                      :color="colors.inProgress"
                    ></v-radio>
                    <v-radio
                      label="Awaiting Invoice"
                      value="awaitingInvoice"
                      :color="colors.awaitingInvoice"
                    ></v-radio>
                    <v-radio
                      label="Awaiting payment"
                      value="awaitingPayment"
                      :color="colors.awaitingPayment"
                    ></v-radio>
                    <v-radio
                      label="Awaiting sign off"
                      value="awaitingSignOff"
                      :color="colors.awaitingSignOff"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
                <v-card-actions class="d-flex flex-column">
                  <v-btn @click="saveStatus" color="success"> Save </v-btn>
                  <v-btn @click="statusDialog = false" color="error"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn class="mb-2" outlined @click="dueDateDialog = true">
              <v-icon class="d-none d-lg-inline-block mr-2" left>{{
                'fa: fa-solid fa-calendar-alt'
              }}</v-icon>
              Change Due Date
            </v-btn>

            <v-dialog v-model="dueDateDialog" max-width="600px">
              <v-card>
                <v-card-title> Enter the due date for this job </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row justify="space-around">
                      <v-date-picker
                        v-model="currentDate"
                        color="secondary"
                        @update:modelValue="updateDates"
                      ></v-date-picker>
                    </v-row>
                    <v-row v-if="errorMessage" class="mt-4">
                      <v-col cols="12">
                        <v-alert type="error">{{ errorMessage }}</v-alert>
                      </v-col>
                    </v-row>
                    <v-row class="pt-7" align="center">
                      <v-col cols="12" md="6">
                        <v-row>
                          <v-checkbox
                            v-model="isStartDatePicked"
                            @click="toggleStartDate"
                          ></v-checkbox>
                          <v-text-field
                            v-model="formattedStartDate"
                            label="Start Date"
                            readonly
                            variant="solo"
                            density="compact"
                            color="grey-lighten-4"
                            rounded="l"
                          ></v-text-field>
                        </v-row>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-row>
                          <v-checkbox v-model="isEndDatePicked" @click="toggleEndDate"></v-checkbox>
                          <v-text-field
                            v-model="formattedEndDate"
                            label="End Date"
                            readonly
                            variant="solo"
                            density="compact"
                            color="grey-lighten-4"
                            rounded="l"
                          ></v-text-field>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions class="d-flex flex-column pt-0">
                  <v-btn @click="saveDate" color="success">Save </v-btn>

                  <v-btn @click="removeDates" color="warning">Remove</v-btn>
                  <v-btn @click="dueDateDialog = false" color="error">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
import { watch, ref } from 'vue'
import axios from 'axios'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import { useToast } from 'primevue/usetoast'
import ChangeClient from './ChangeClientDialog.vue'

const toast = useToast()
// This passes in the selected job as a prop that the manager job component accepts

const props = defineProps({
  passedInJob: Object
})

// Editing the job details dialog

const detailsDialog = ref(false)

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

const saveJobDetails = () => {
  // Save job details logic here
  detailsDialog.value = false
  console.log('Job Details:', job.value)
}

const cancelJobDetails = () => {
  detailsDialog.value = false
}

// Selecting team members

const membersDialog = ref(false)
const favorites = ref([])
const states = ref(['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado'])

// get all the employees
// get all the employees users for from the userId field in the returned employee object
// map those names to the employee ids
// display the names in the select box
// when the user selects a name, add the employee id to the favorites array

const saveSelection = () => {
  // Save selected members logic here
  membersDialog.value = false
  console.log('Selected Members:', favorites.value)
}

// For job status update

const statusDialog = ref(false)
const colors = {
  todo: 'red',
  inProgress: 'blue',
  awaitingInvoice: 'orange',
  awaitingPayment: 'green',
  awaitingSignOff: 'purple'
}

const saveStatus = () => {
  // Save job status logic here
  statusDialog.value = false
  console.log('Selected Job State:', job.value.status)
}

//For change client


// For Due Date Dialog

const dueDateDialog = ref(false)
const currentDate = ref(null)
const startDate = ref(null)
const endDate = ref(null)
const isStartDatePicked = ref(false)
const isEndDatePicked = ref(false)
const errorMessage = ref('')

const updateDates = (value) => {
  setDates(value)
}

const setDates = (value) => {
  if (!isStartDatePicked.value) {
    if (isEndDatePicked.value && value > endDate.value) {
      errorMessage.value = 'Start date can not come after end date.'
      return
    }
    errorMessage.value = null
    startDate.value = value // stores the updated start date
    job.value.jobStartDate = value
    console.log(job.value)
    isStartDatePicked.value = true
    currentDate.value = null
  } else if (!isEndDatePicked.value) {
    if (isStartDatePicked.value && value < startDate.value) {
      errorMessage.value = 'End date can not come before start date.'
      return
    }
    errorMessage.value = null
    endDate.value = value // stores the updated end date
    job.value.jobEndDate = value
    isEndDatePicked.value = true
    currentDate.value = null
  }
}

const toggleStartDate = () => {
  isStartDatePicked.value = !isStartDatePicked.value
  startDate.value = null
  job.value.jobStartDate = null
}

const toggleEndDate = () => {
  isEndDatePicked.value = !isEndDatePicked.value
  endDate.value = null
  job.value.jobEndDate = null
}

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const formattedStartDate = computed(() => formatDate(startDate.value))
const formattedEndDate = computed(() => formatDate(endDate.value))

const saveDate = () => {
  dueDateDialog.value = false
}

const removeDates = () => {
  currentDate.value = null
  startDate.value = null
  job.value.jobStartDate = null
  endDate.value = null
  job.value.jobEndDate = null
  isStartDatePicked.value = false
  isEndDatePicked.value = false
}

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

  // Show alert indicating successful save
  window.alert('Job saved successfully!')

  // Navigate to /jobAssignmentView
  router.push('/jobAssignmentView')
}

const emit = defineEmits(['close'])
const cancelJob = () => {
  emit('close')
}
</script>

<style scoped>
.mt-4 {
  margin-top: 1.5rem;
}

.my-custom-radio-group {
  padding: 16px;
  border-radius: 8px;
}
</style>
