<template>
  <v-container fluid fill-height>
    <v-row justify="center" xs="6" sm="6" md="12">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="12">
            <v-card
              height="auto"
              class="pa-11 ma-0 bg-cardColor"
              rounded="md"
              :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
              border="md"
            >
              <v-card-title height="auto" width="100%">
                <v-row align="center" justify="space-between">
                  <v-col cols="12" md="4" sm="6" xs="12" class="d-flex align-center">
                    <v-icon icon="fa: fa-solid fa-briefcase"></v-icon>
                    <v-label
                      class="ms-2 text-h4 font-family-lato text-headingTextColor"
                      style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
                      height="auto"
                      width="auto"
                      >Job Details</v-label
                    >
                  </v-col>

                  <v-col cols="12" md="4" sm="6" xs="12">
                    <v-text-field
                      v-model="search"
                      density="compact"
                      label="Search"
                      prepend-inner-icon="mdi-magnify"
                      variant="solo-inverted"
                      flat
                      width="100%"
                      style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
                      hide-details
                      single-line
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12" xs="12" class="d-flex justify-end">
                    <AddJob />
                  </v-col>
                </v-row>
              </v-card-title>

              <v-card-text>
                <v-divider></v-divider>
                <v-col cols="12" xs="12" sm="12" md="12">
                  <div style="height: 700px; overflow-y: auto">
                    <v-data-table
                      :headers="headers"
                      :items="jobClientData"
                      :search="search"
                      label="Jobs"
                      height="auto"
                      rounded="xl"
                      class="bg-cardColor"
                      :row-props="getRowProps"
                    >
                      <template v-slot:[`item.heading`]="{ value }">
                        {{ value }}
                      </template>

                      <template v-slot:[`item.clientName`]="{ value }">
                        <v-chip color="primary"> <v-icon>mdi-phone</v-icon>{{ value }} </v-chip>
                      </template>

                      <template v-slot:[`item.jobDescription`]="{ value }">
                        {{ value }}
                      </template>

                      <template v-slot:[`item.status`]="{ value }">
                        <v-chip :color="getStatusColor(value)">
                          <v-icon>mdi-progress-clock</v-icon>{{ value }}
                        </v-chip>
                      </template>

                      <template v-slot:[`item.startDate`]="{ value }">
                        {{ value }}
                      </template>

                      <template v-slot:[`item.endDate`]="{ value }">
                        {{ value }}
                      </template>

                      <!-- Actions slot -->
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-btn
                          rounded="xl"
                          variant="plain"
                          style="transform: rotate(0deg)"
                          @click="openDialog(item)"
                        >
                          <v-icon color="primary">mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </div>
                </v-col>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ selectedJob?.heading }}
        </v-card-title>
        <v-card-text> What would you like to do with this job? </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="viewJobDialog = true">View</v-btn>
          <!-- View Job Dialog -->
          <v-dialog v-model="viewJobDialog" max-width="1000">
            <v-card elevation="14" rounded="md" :max-width="1000" :max-height="800">
              <v-card-title> Job Details </v-card-title>

              <v-row>
                <v-col xs="12" sm="9" md="9" lg="9" xl="9" class="pr-0 pb-0" cols="12">
                  <v-card flat class="text-center elevation-0">
                    <v-card-text>
                      <v-col>
                        <v-col class="text-center">
                          <h3>Job Title</h3>
                          <p class="text-caption">
                            {{ selectedJob.heading }}
                          </p>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h3>Description</h3>
                          <v-spacer></v-spacer>
                          <small class="text-caption">
                            {{ selectedJob.jobDescription }}
                          </small>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h3>Status</h3>
                          <v-spacer></v-spacer>
                          <small class="text-caption">
                            <v-chip :color="getStatusColor(selectedJob.status)" dark>
                              {{ selectedJob.status }}
                            </v-chip>
                          </small>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h3>Address</h3>
                          <v-col>
                            <label>Street</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.street }}
                            </small>
                          </v-col>
                          <v-col>
                            <label>Suburb</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.suburb }}
                            </small>
                          </v-col>
                          <v-col>
                            <label>City</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.city }}
                            </small>
                          </v-col>
                          <v-col>
                            <label>Postal Code</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.postalCode }}
                            </small>
                          </v-col>
                          <v-col>
                            <label>Complex</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.complex }}
                            </small>
                          </v-col>
                          <v-col>
                            <label>House Number</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.houseNumber }}
                            </small>
                          </v-col>
                        </v-col>

                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h3>Dates</h3>
                          <v-col>
                            <label>Start Date</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.startDate }}
                            </small>
                          </v-col>
                          <v-col>
                            <label>End Date</label><v-spacer></v-spacer>
                            <small class="text-caption">
                              {{ selectedJob.endDate }}
                            </small>
                          </v-col>
                        </v-col>
                      </v-col>
                      <v-col class="pt-0">
                        <v-btn color="error" width="100%" @click="viewJobDialog = false"
                          >Close</v-btn
                        >
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col xs="12" sm="3" md="3" lg="3" xl="3" class="pl-0 pb-0" cols="12">
                  <v-card flat class="pa-5 bg-cardColor elevation-0">
                    <div class="d-flex flex-column">
                      <AttachImages />
                      <AddComment />
                      <JobChecklist />
                      <LogInventory/>
                      <JobNotes/>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>

          <v-btn color="warning" @click="editJobCardDialog()">Edit</v-btn>
          <v-dialog v-model="managerJobCardDialog" max-width="1000px">
            <ManagerJobCard
              :passedInJob="selectedJob"
              @close="managerJobCardDialog = false"
            ></ManagerJobCard>
          </v-dialog>

          <v-btn color="error" @click="deleteDialog = true">Delete</v-btn>
          <v-dialog v-model="deleteDialog" max-width="500">
            <v-card>
              <v-card-title class="text-h5 font-weight-regular bg-red">
                <v-icon color="white">mdi-alert-circle-outline</v-icon>
                Confirm Deletion
              </v-card-title>
              <v-card-text> Are you sure you want to delete this job? </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="confirmDelete">Confirm</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-spacer></v-spacer>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AddJob from './AddJob.vue'
import ManagerJobCard from './ManagerJobCard.vue'
import AttachImages from './AttachImages.vue'
import AddComment from './AddComments.vue'
import JobChecklist from './JobChecklist.vue'
import LogInventory from './LogInventory.vue'
import JobNotes from './JobNotes.vue'

const search = ref('')
const viewJobDialog = ref(false)
// set the table headers

const headers = [
  { title: 'Job Heading', key: 'heading', align: 'start', value: 'heading' },
  { title: 'Client', key: 'clientName', align: 'start', value: 'client' },
  { title: 'Job Description', key: 'jobDescription', align: 'start', value: 'jobDescription' },
  { title: 'Status', key: 'status', align: 'start', value: 'status' },
  { title: 'Start Date', key: 'startDate', align: 'start', value: 'startDate' },
  { title: 'End Date', key: 'endDate', align: 'start', value: 'endDate' },
  { title: 'Actions', key: 'actions', align: 'start', sortable: false, value: 'actions' }
]

// Reactive variable to hold job and client data
// Requests made locally or on the deployed server
const jobClientData = ref([])
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

const isLocalAvailable = async (localUrl: string) => {
  try {
    const res = await axios.get(localUrl)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async () => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const fetchJobData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  }

  try {
    const response = await axios.get('http://localhost:3000/job/all', config)
    const jobData = response.data.data

    console.log(response.data)

    // Check if jobData is an array or needs conversion
    const jobs = Array.isArray(jobData) ? jobData : [jobData]

    // Map job data to include necessary details
    const mappedJobs = jobs.map((job) => ({
      jobId: job._id,
      heading: job.details.heading,
      jobDescription: job.details.description,
      startDate: job.details.startDate,
      endDate: job.details.endDate,
      status: job.status,
      clientId: job.clientId,
      street: job.details.address.street,
      suburb: job.details.address.suburb,
      city: job.details.address.city,
      postalCode: job.details.address.postalCode,
      complex: job.details.address.complex,
      houseNumber: job.details.address.houseNumber,
      imagesTaken: job.recordedDetails.imagesTaken, // is an array
      inventoryUsed: job.recordedDetails.inventoryUsed, // is an array
      taskList: job.taskList, // is an array
      comments: job.comments // is an array
    }))

    // Fetch client data for each job
    // Return combined job and client data
    return await fetchClientData(mappedJobs)
  } catch (error) {
    console.error('Error fetching job data:', error)
    throw error // Re-throw the error for handling elsewhere if needed
  }
}

// Function to fetch client data for each job
const fetchClientData = async (jobs) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  }

  try {
    // Fetch client data for each job asynchronously
    const promises = jobs.map(async (job) => {
      const response = await axios.get(`http://localhost:3000/client/id/${job.clientId}`, config)
      const client = response.data.data

      const clientName = `${client.details.firstName} ${client.details.lastName}`

      // Return complete job details including client name
      return {
        jobId: job.jobId,
        heading: job.heading,
        jobDescription: job.jobDescription, // Corrected reference to jobDescription
        startDate: job.startDate,
        endDate: job.endDate,
        status: job.status,
        clientName: clientName,
        street: job.street,
        suburb: job.suburb,
        city: job.city,
        postalCode: job.postalCode,
        complex: job.complex,
        houseNumber: job.houseNumber,
        imagesTaken: job.imagesTaken,
        inventoryUsed: job.inventoryUsed,
        taskList: job.taskList,
        comments: job.comments
      }
    })

    // Wait for all promises to resolve
    return await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching client data:', error)
    throw error // Re-throw the error for handling elsewhere if needed
  }
}

// Fetch data on component mount using onMounted() hook
onMounted(async () => {
  try {
    jobClientData.value = await fetchJobData()
    // Log job and client data for verification
    console.log('Job and client data fetched successfully:', jobClientData.value)
  } catch (error) {
    console.error('Error fetching job and client data:', error)
  }
})

// Actions

const dialog = ref(false)
const selectedJob = ref(null)
const managerJobCardDialog = ref(false)

const openDialog = (item) => {
  selectedJob.value = item
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  selectedJob.value = null
}

// Deleting a job

const deleteDialog = ref(false)

const confirmDelete = () => {
  console.log('Delete job:', selectedJob.value)
  // confirm delete dialog activation here
  // add delete end point and refresh data
  closeDialog()
}

// managers the managerJobCard state

const editJobCardDialog = () => {
  managerJobCardDialog.value = true
}

// Job Status colours
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'green'
    case 'in progress':
      return 'orange'
    case 'not started':
      return 'red'
    default:
      return 'primary' // Default color
  }
}

//
// const openJobCard = (item) => {
//   router.push('/jobCard')
//   console.log('Open job card for:', item)
// }
//
// const confirmDelete = ref(false)
// const items = ref([
//   // Your list of items
// ])
// let currentItemToDelete = null

// const confirmDeleteItem = (item) => {
//   currentItemToDelete = item
//   confirmDelete.value = true
// }
//
// const deleteConfirmed = () => {
//   const index = items.value.findIndex((i) => i === currentItemToDelete)
//   if (index !== -1) {
//     items.value.splice(index, 1)
//   }
//   cancelDelete()
// }

// const cancelDelete = () => {
//   confirmDelete.value = false
//   currentItemToDelete = null
// }

const getRowProps = ({ index }) => {
  return {
    class: index % 2 ? 'bg-secondRowColor' : ''
  }
}

onMounted(() => {
  fetchJobData()
})
</script>

<style scoped></style>
