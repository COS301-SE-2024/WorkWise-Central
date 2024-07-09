<template>
  <v-card>
    <v-row>
      <v-col xs="12" sm="9" md="9" lg="9" xl="9">
        <v-card class="text-center">
          <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
            <h2 class="flex-grow-1">{{ passedInJob.heading }}</h2>
          </v-card-title>

          <v-card-text>
            <v-list>
              <!-- Job Details -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold">Job Name</v-list-item-title>
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">{{
                    passedInJob.heading || 'Job name is empty'
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold"
                    >Job Description</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">{{
                    passedInJob.jobDescription || 'Job description is empty'
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold">Start Date</v-list-item-title>
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">{{
                    passedInJob.startDate || 'Start date is empty'
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold">End Date</v-list-item-title>
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">{{
                    passedInJob.endDate || 'End date is empty'
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Job Address -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold">Address</v-list-item-title>
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">
                    {{ passedInJob.street || 'Street is empty' }},
                    {{ passedInJob.suburb || 'Suburb is empty' }},
                    {{ passedInJob.city || 'City is empty' }},
                    {{ passedInJob.postalCode || 'Postal code is empty' }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold">Complex</v-list-item-title>
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">{{
                    passedInJob.complex || 'Complex is empty'
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold"
                    >House Number</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">{{
                    passedInJob.houseNumber || 'House number is empty'
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Assigned Employees -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold"
                    >Assigned Employees</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">
                    <span v-for="employeeId in assignedEmployees" :key="employeeId">
                      {{ employeeId || 'Employee ID is empty' }}
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Recorded Details -->
              <!--              <v-list-item>-->
              <!--                <v-list-item-content>-->
              <!--                  <v-list-item-title class="text-h6 font-weight-bold">Images Taken</v-list-item-title>-->
              <!--                  <v-list-item-subtitle class="text-body-1 font-weight-medium">-->
              <!--                    <img-->
              <!--                        v-for="image in imagesTaken"-->
              <!--                        :key="image"-->
              <!--                        :src="image"-->
              <!--                        alt="Job Image"-->
              <!--                        class="ma-2"-->
              <!--                        width="50"-->
              <!--                        v-if="image"-->
              <!--                    />-->
              <!--                    <span v-if="imagesTaken.length === 0">No images taken</span>-->
              <!--                  </v-list-item-subtitle>-->
              <!--                </v-list-item-content>-->
              <!--              </v-list-item>-->

              <!--              <v-list-item>-->
              <!--                <v-list-item-content>-->
              <!--                  <v-list-item-title class="text-h6 font-weight-bold">Inventory Used</v-list-item-title>-->
              <!--                  <v-list-item-subtitle class="text-body-1 font-weight-medium">-->
              <!--                    <div v-for="item in inventoryUsed" :key="item.InventoryItem">-->
              <!--                      {{ item.InventoryItem || 'Inventory item is empty' }} - Quantity: {{ item.QuantityUsed || 'Quantity is empty' }}-->
              <!--                    </div>-->
              <!--                    <span v-if="inventoryUsed.length === 0">No inventory used</span>-->
              <!--                  </v-list-item-subtitle>-->
              <!--                </v-list-item-content>-->
              <!--              </v-list-item>-->

              <!-- Status -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold">Status</v-list-item-title>
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">{{
                    passedInJob.status || 'Status is empty'
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Task List -->
              <!--              <v-list-item>-->
              <!--                <v-list-item-content>-->
              <!--                  <v-list-item-title class="text-h6 font-weight-bold">Task List</v-list-item-title>-->
              <!--                  <v-list-item-subtitle class="text-body-1 font-weight-medium">-->
              <!--                    <div v-for="task in taskList" :key="task.taskName">-->
              <!--                      {{ task.taskName || 'Task name is empty' }} - Status: {{ task.status || 'Task status is empty' }} - Assigned Employees: {{ task.assignedEmployees.join(', ') || 'No assigned employees' }}-->
              <!--                    </div>-->
              <!--                    <span v-if="taskList.length === 0">No tasks available</span>-->
              <!--                  </v-list-item-subtitle>-->
              <!--                </v-list-item-content>-->
              <!--              </v-list-item>-->

              <!--              &lt;!&ndash; Comments &ndash;&gt;-->
              <!--              <v-list-item>-->
              <!--                <v-list-item-content>-->
              <!--                  <v-list-item-title class="text-h6 font-weight-bold">Comments</v-list-item-title>-->
              <!--                  <v-list-item-subtitle class="text-body-1 font-weight-medium">-->
              <!--                    <div v-for="comment in comments" :key="comment.commentDate">-->
              <!--                      {{ comment.comment || 'Comment is empty' }} - By: {{ comment.employeeId || 'Employee ID is empty' }} on {{ comment.commentDate || 'Comment date is empty' }}-->
              <!--                    </div>-->
              <!--                    <span v-if="comments.length === 0">No comments available</span>-->
              <!--                  </v-list-item-subtitle>-->
              <!--                </v-list-item-content>-->
              <!--              </v-list-item>-->
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="3" md="3" lg="3" xl="3">
        <v-card flat class="pa-2">
          <div class="d-flex flex-column">
            <!--Job details and description Model Edit -->

            <v-btn class="mb-2" outlined @click="detailsDialog = true">
              <v-icon class="d-none d-lg-inline-block mr-2" left
                >mdi-card-account-details-outline</v-icon
              >
              Edit Details
            </v-btn>

            <v-dialog v-model="detailsDialog" max-width="600px">
              <v-card>
                <v-card-title
                  class="text-h5 font-weight-regular bg-blue-grey text-center text-center"
                >
                  Edit The Job Details
                </v-card-title>
                <v-card-text>
                  <v-form ref="jobForm">
                    <v-label>Job Name</v-label>
                    <v-text-field
                      v-model="job.jobDetails.jobName"
                      label="Job Name"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      required
                    ></v-text-field>
                    <v-label>Job Description</v-label>
                    <v-textarea
                      v-model="job.jobDetails.jobDescription"
                      clearable
                      label="Job Description"
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
                          v-model="job.jobDetails.jobAddress.street"
                          label="Street"
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
                          v-model="job.jobDetails.jobAddress.suburb"
                          label="Suburb"
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
                          v-model="job.jobDetails.jobAddress.city"
                          label="City"
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
                          v-model="job.jobDetails.jobAddress.postalCode"
                          label="Postal Code"
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
                          v-model="job.jobDetails.jobAddress.complex"
                          label="Complex"
                          variant="solo"
                          density="compact"
                          color="grey-lighten-4"
                          rounded="l"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-label>House Number</v-label>
                        <v-text-field
                          v-model="job.jobDetails.jobAddress.houseNumber"
                          label="House Number"
                          variant="solo"
                          density="compact"
                          color="grey-lighten-4"
                          rounded="l"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="saveJobDetails"> Save </v-btn>
                  <v-btn color="blue darken-1" text @click="cancelJob"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- For client change -->

            <v-btn class="mb-2" outlined @click="openClientDialogAndFetchClients">
              <v-icon class="d-none d-lg-inline-block mr-2" left>mdi-account-switch</v-icon>
              Change Client
            </v-btn>

            <v-dialog v-model="clientDialog" max-width="600px">
              <v-card>
                <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                  Change the client for this job
                </v-card-title>

                <v-card-text>
                  <div class="text-caption pa-3">Select a client</div>

                  <v-autocomplete
                    v-model="selectedClientName"
                    hint="Click the field to select a client"
                    :items="clientNames"
                    label="Select Client"
                    prepend-icon="mdi-account"
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

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="saveClient">Save</v-btn>

                  <v-btn color="blue darken-1" text @click="clientDialog = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Mutli-member select -->

            <v-btn class="mb-2" outlined @click="membersDialog = true">
              <v-icon class="d-none d-lg-inline-block mr-2" left
                >mdi-card-account-details-outline</v-icon
              >
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
                    prepend-icon="mdi-account-multiple"
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
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="saveSelection"> Save </v-btn>
                  <v-btn color="blue darken-1" text @click="membersDialog = false"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn class="mb-2" outlined @click="statusDialog = true">
              <v-icon class="d-none d-lg-inline-block mr-2" left>mdi-warehouse</v-icon>
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
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="saveStatus"> Save </v-btn>
                  <v-btn color="blue darken-1" text @click="statusDialog = false"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn class="mb-2" outlined @click="dueDateDialog = true">
              <v-icon class="d-none d-lg-inline-block mr-2" left>mdi-calendar-clock</v-icon>
              Change Due Date
            </v-btn>

            <v-dialog v-model="dueDateDialog" max-width="600px">
              <v-card>
                <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                  Enter the due date for this job
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row justify="space-around">
                      <v-date-picker
                        v-model="currentDate"
                        color="primary"
                        @update:modelValue="updateDates"
                      ></v-date-picker>
                    </v-row>
                    <v-row v-if="errorMessage" class="mt-4">
                      <v-col cols="12">
                        <v-alert type="error">{{ errorMessage }}</v-alert>
                      </v-col>
                    </v-row>
                    <v-row class="mt-4" align="center">
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
                <v-card-actions>
                  <v-btn color="blue darken-1" @click="saveDate">Save </v-btn>

                  <v-btn color="blue darken-1" @click="removeDates">Remove</v-btn>
                  <v-btn color="blue darken-1" @click="dueDateDialog = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <v-card-actions class="d-flex flex-column">
            <v-btn class="mb-2" color="blue darken-1" @click="saveJob">Save</v-btn>
            <v-btn class="mb-4" color="blue darken-1" @click="cancelJob">Cancel</v-btn>
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

const clientDialog = ref(false)
const selectedClient = ref(null)
const clients = ref([])
const selectedClientName = ref(null)
const clientNames = ref([])

const router = useRouter()

const openClientDialogAndFetchClients = async () => {
  clientDialog.value = true
  await fetchClients()
}

// api call to get clients and stores them here
const fetchClients = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  }
  try {
    const response = await axios.get('http://localhost:3000/client/all', config)
    console.log(response.data)
    clients.value = response.data.data.map((client) => ({
      ...client,
      fullName: `${client.details.firstName ?? ''} ${client.details.surname ?? ''}`.trim()
    }))

    // Populate clientNames array with just the names
    clientNames.value = clients.value.map((client) => {
      return client.details.firstName && client.details.surname
        ? `${client.details.firstName} ${client.details.surname}`
        : client.details.name ?? 'Unknown Name'
    })

    // Watch for changes in selectedClientName and update selectedClient
    watch(
      () => selectedClientName.value,
      (newVal) => {
        const selected = clients.value.find((client) => {
          const fullName =
            client.details.firstName && client.details.surname
              ? `${client.details.firstName} ${client.details.surname}`
              : client.details.name ?? 'Unknown Name'
          return fullName === newVal
        })
        selectedClient.value = selected?._id ?? null
      }
    )
  } catch (error) {
    console.error('Failed to fetch clients:', error)
  }
}

const saveClient = () => {
  if (selectedClientName.value) {
    // match the client name with the client id
    // add that id to the job
  }
  clientDialog.value = false
}

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
      console.log('Job updated successfully:', response.data)
    } catch (error) {
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
