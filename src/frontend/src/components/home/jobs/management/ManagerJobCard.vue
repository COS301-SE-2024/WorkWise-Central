<template>
  <v-card>
    <v-row>
      <v-col xs="12" sm="9" md="9" lg="9" xl="9">
        <v-card class="text-center">
          <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
            <h2 class="flex-grow-1">{{ jobTitle }}</h2>
          </v-card-title>

          <v-card-text>
            <v-list>
              <!-- Job Details -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Job Name</v-list-item-title>
                  <v-list-item-subtitle>{{ jobDetails.jobName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Job Description</v-list-item-title>
                  <v-list-item-subtitle>{{ jobDetails.jobDescription }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Start Date</v-list-item-title>
                  <v-list-item-subtitle>{{ jobDetails.jobStartDate }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>End Date</v-list-item-title>
                  <v-list-item-subtitle>{{ jobDetails.jobEndDate }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Job Address -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Address</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ jobDetails.jobAddress.street }}, {{ jobDetails.jobAddress.suburb }},
                    {{ jobDetails.jobAddress.city }},
                    {{ jobDetails.jobAddress.postalCode }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Complex</v-list-item-title>
                  <v-list-item-subtitle>{{ jobDetails.jobAddress.complex }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>House Number</v-list-item-title>
                  <v-list-item-subtitle>{{
                    jobDetails.jobAddress.houseNumber
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Assigned Employees -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Assigned Employees</v-list-item-title>
                  <v-list-item-subtitle>
                    <span v-for="employeeId in assignedEmployees.employeesIds" :key="employeeId">{{
                      employeeId
                    }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Recorded Details -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Images Taken</v-list-item-title>
                  <v-list-item-subtitle>
                    <img
                      v-for="image in recordedDetails.imagesTaken"
                      :key="image"
                      :src="image"
                      alt="Job Image"
                      class="ma-2"
                      width="50"
                    />
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Inventory Used</v-list-item-title>
                  <v-list-item-subtitle>
                    <div v-for="item in recordedDetails.inventoryUsed" :key="item.InventoryItem">
                      {{ item.InventoryItem }} - Quantity: {{ item.QuantityUsed }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Status -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle>{{ status }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Task List -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Task List</v-list-item-title>
                  <v-list-item-subtitle>
                    <div v-for="task in taskList" :key="task.task.taskName">
                      {{ task.task.taskName }} - Status: {{ task.task.status }} - Assigned
                      Employees: {{ task.task.assignedEmployees.join(', ') }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Comments -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Comments</v-list-item-title>
                  <v-list-item-subtitle>
                    <div v-for="comment in comments" :key="comment.commentItem.commentDate">
                      {{ comment.commentItem.comment }} - By:
                      {{ comment.commentItem.employeeId }} on {{ comment.commentItem.commentDate }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="3" md="3" lg="3" xl="3">
        <v-card flat class="pa-2">
          <div class="d-flex flex-column">
            <!--Job details and description Model Edit -->

            <v-btn class="mb-2" outlined @click="detailsDialog = true">
              <v-icon left>mdi-card-account-details-outline</v-icon>
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
                      v-model="job.jobName"
                      label="Job Name"
                      variant="solo"
                      density="compact"
                      color="grey-lighten-4"
                      rounded="l"
                      required
                    ></v-text-field>
                    <v-label>Job Description</v-label>
                    <v-textarea
                      v-model="job.jobDescription"
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
                          v-model="job.jobAddress.street"
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
                          v-model="job.jobAddress.suburb"
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
                          v-model="job.jobAddress.city"
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
                          v-model="job.jobAddress.postalCode"
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
                          v-model="job.jobAddress.complex"
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
                          v-model="job.jobAddress.houseNumber"
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
                  <v-btn color="blue darken-1" text @click="detailsDialog = false"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- For client change -->

            <v-btn class="mb-2" outlined @click="openClientDialogAndFetchClients">
              <v-icon left>mdi-account-switch</v-icon>
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
              <v-icon left>mdi-card-account-details-outline</v-icon>
              Select Members
            </v-btn>

            <v-dialog v-model="membersDialog" max-width="600px">
              <v-card>
                <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                  Select Team Members
                </v-card-title>
                <v-card-text>
                  <div class="text-caption pa-3">Select Team Members</div>
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
              <v-icon left>mdi-warehouse</v-icon>
              Update Status
            </v-btn>

            <v-dialog v-model="statusDialog" max-width="600px">
              <v-card>
                <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                  Update Job Status
                </v-card-title>
                <v-card-text>
                  <v-radio-group
                    v-model="selectedState"
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

            <!--        <v-btn class="mb-2" outlined @click="dialog = true">-->
            <!--          <v-icon left>mdi-warehouse</v-icon>-->
            <!--          Record details-->
            <!--        </v-btn>-->

            <!--        <v-btn class="mb-2" outlined @click="dialog = true">-->
            <!--          <v-icon left>mdi-paperclip</v-icon>-->
            <!--          File Attachments-->
            <!--        </v-btn>-->

            <!--        <v-dialog v-model="dialog" max-width="600px">-->
            <!--          <v-card>-->
            <!--            <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">-->
            <!--              Attach a file from your computer-->
            <!--            </v-card-title>-->
            <!--            <v-card-text>-->
            <!--              <v-file-input-->
            <!--                v-model="files"-->
            <!--                :rules="rules"-->
            <!--                accept="image/png, image/jpeg, image/bmp"-->
            <!--                label="Choose your job images"-->
            <!--                placeholder="Pick an avatar"-->
            <!--                prepend-icon="mdi-camera"-->
            <!--                multiple-->
            <!--              >-->
            <!--                <template v-slot:selection="{ fileNames }">-->
            <!--                  <template v-for="fileName in fileNames" :key="fileName">-->
            <!--                    <v-chip class="me-2" color="primary" size="small" label>-->
            <!--                      {{ fileName }}-->
            <!--                    </v-chip>-->
            <!--                  </template>-->
            <!--                </template>-->
            <!--              </v-file-input>-->
            <!--            </v-card-text>-->
            <!--            <v-card-actions>-->
            <!--              <v-spacer></v-spacer>-->
            <!--              <v-btn color="blue darken-1" text @click="insertFiles">Insert</v-btn>-->
            <!--              <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>-->
            <!--            </v-card-actions>-->
            <!--          </v-card>-->
            <!--        </v-dialog>-->

            <v-btn class="mb-2" outlined @click="dueDateDialog = true">
              <v-icon left>mdi-calendar-clock</v-icon>
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
                  <v-btn color="blue darken-1" text @click="saveDate">Save </v-btn>

                  <v-btn color="blue darken-1" text @click="removeDates">Remove</v-btn>
                  <v-btn color="blue darken-1" text @click="dueDateDialog = false">Cancel</v-btn>
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

// const props = defineProps ({
//   job: Object
// })

// const jobTitle = ref('Job Title')
const jobDetails = ref({
  jobName: 'UP Merensky library revamp',
  jobDescription: 'Fixing plumbing issues.',
  jobStartDate: '2024-06-01',
  jobEndDate: '2024-06-05',
  jobAddress: {
    street: '123 Job St',
    suburb: 'Westside',
    city: 'Metropolis',
    postalCode: '67890',
    complex: 'Workplace Plaza',
    houseNumber: '5C'
  }
})
const assignedEmployees = ref({
  employeesIds: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
  teamId: '60d21b4667d0d8992e610c85'
})
const recordedDetails = ref({
  imagesTaken: [
    'data:image/png;base64,iVBORw0KGgoAAAANS...',
    'data:image/png;base64,iVBORw0KGgoAAAANS...'
  ],
  inventoryUsed: [{ InventoryItem: '60d21b4667d0d8992e610c8a', QuantityUsed: 2 }]
})
const status = ref('complete')
const taskList = ref([
  {
    task: {
      taskName: 'Paint north facing wall',
      status: 'complete',
      assignedEmployees: ['60d21b4667d0d8992e610c8a']
    }
  }
])
const comments = ref([
  {
    commentItem: {
      comment: 'Roofing needs adjusting',
      employeeId: '60d21b4667d0d8992e610c8a',
      commentDate: '2024-06-12'
    }
  }
])

// Editing the job details dialog

const detailsDialog = ref(false)

const job = ref({
  jobName: '',
  jobDescription: '',
  jobStartDate: '',
  jobEndDate: '',
  jobAddress: {
    street: '',
    suburb: '',
    city: '',
    postalCode: '',
    complex: '',
    houseNumber: ''
  }
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

const saveSelection = () => {
  // Save selected members logic here
  membersDialog.value = false
  console.log('Selected Members:', favorites.value)
}

// For job status update

const statusDialog = ref(false)
const selectedState = ref('')
const colors = {
  todo: 'red',
  inProgress: 'blue',
  awaitingInvoice: 'orange',
  awaitingPayment: 'green',
  awaitingSignOff: 'purple'
}

const saveStatus = () => {
  // Save job status logic here
  dialog.value = false
  console.log('Selected Job State:', selectedState.value)
}

//For change client

const clientDialog = ref(false)
const selectedClient = ref(null)
const clientChips = ref([])
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

    // @BOB get rid of this part
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
    clientChips.value.push({ name: selectedClientName })
    console.log('Client chips:', clientChips.value)
  }
  clientDialog.value = false
}

// @Kumbi: this is for the employee jobCard File attachments
//
// const dialog = ref(false)
// const files = ref([]) // stores all the selected files that will be pushed to the db
// const rules = ref([
//   (value) => {
//     return (
//       !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
//     )
//   }
// ])
//
// const fileChips = ref([])
// const insertFiles = () => {
//   dialog.value = false
//   files.value.forEach((file) => {
//     fileChips.value.push({
//       name: file.name,
//       size: file.size
//     })
//   })
//   console.log('Files:', fileChips.value)
// }

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
    isStartDatePicked.value = true
    currentDate.value = null
  } else if (!isEndDatePicked.value) {
    if (isStartDatePicked.value && value < startDate.value) {
      errorMessage.value = 'End date can not come before start date.'
      return
    }
    errorMessage.value = null
    endDate.value = value // stores the updated end date
    isEndDatePicked.value = true
    currentDate.value = null
  }
}

const toggleStartDate = () => {
  isStartDatePicked.value = !isStartDatePicked.value
  startDate.value = null
}

const toggleEndDate = () => {
  isEndDatePicked.value = !isEndDatePicked.value
  endDate.value = null
}

const dateChips = ref([])
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
  if (startDate.value) {
    dateChips.value.push({
      type: 'Start Date',
      date: startDate.value
    })
  }
  if (endDate.value) {
    dateChips.value.push({
      type: 'End Date',
      date: endDate.value
    })
  }
}

const removeDates = () => {
  currentDate.value = null
  startDate.value = null
  endDate.value = null
  isStartDatePicked.value = false
  isEndDatePicked.value = false
}

const jobTitle = ref("Tiling Siphele Bob's bathroom")
// const jobComment = ref('')

const saveJob = () => {
  // Perform save operation if needed

  // For demonstration purposes, simulate a successful save
  // Replace this with actual save logic
  // For example:
  // saveJobToBackend();

  // Show alert indicating successful save
  window.alert('Job saved successfully!')

  // Navigate to /jobAssignmentView
  router.push('/jobAssignmentView')
}

const cancelJob = () => {
  // Perform cancel operation if needed

  // Navigate to /jobAssignmentView without any alert
  router.push('/jobAssignmentView')
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
