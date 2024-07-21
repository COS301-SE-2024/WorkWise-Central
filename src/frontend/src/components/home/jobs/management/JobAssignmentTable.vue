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

                      <template v-slot:[`item.clientPhone`]="{ value }">
                        <v-chip color="primary">
                          <a :href="`tel:${value}`" style="color: inherit; text-decoration: none;">
                            <v-icon>fa-solid fa-phone</v-icon>{{ value }}
                          </a>
                        </v-chip>
                      </template>

                      <template v-slot:[`item.clientMail`]="{ value }">
                        <v-chip color="primary">
                          <a :href="`mailto:${value}`" style="color: inherit; text-decoration: none;">
                            <v-icon>fa-solid fa-envelope</v-icon>{{ value }}
                          </a>
                        </v-chip>
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
          <v-dialog v-model="viewJobDialog" max-width="1000" scrollable>
            <v-card elevation="14" rounded="md" :max-width="1000" :max-height="800">
              <v-card-title> Job Details </v-card-title>

              <v-row>
                <v-col cols="12">
                  <v-card flat class="text-center elevation-0">
                    <v-card-text>
                      <v-col>
                        <v-col class="text-center pt-0">
                          <h2>{{ selectedJob.heading }}</h2>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h4>Description</h4>
                          <v-spacer></v-spacer>
                          <small class="text-caption">
                            {{ selectedJob.jobDescription }}
                          </small>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h4>Status</h4>
                          <v-spacer></v-spacer>
                          <small class="text-caption">
                            <v-chip :color="getStatusColor(selectedJob.status)" dark>
                              {{ selectedJob.status }}
                            </v-chip>
                          </small>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h4>Address</h4>
                          <v-row>
                            <v-col>
                              <label>City</label><v-spacer></v-spacer>
                              <small class="text-caption">
                                {{ selectedJob.city }}
                              </small>
                            </v-col>
                            <v-col>
                              <label>Suburb</label><v-spacer></v-spacer>
                              <small class="text-caption">
                                {{ selectedJob.suburb }}
                              </small>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <label>Street</label><v-spacer></v-spacer>
                              <small class="text-caption">
                                {{ selectedJob.street }}
                              </small>
                            </v-col>
                            <v-col>
                              <label>Postal Code</label><v-spacer></v-spacer>
                              <small class="text-caption">
                                {{ selectedJob.postalCode }}
                              </small>
                            </v-col>
                          </v-row>
                          <v-row>
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
                          </v-row>
                        </v-col>

                        <v-divider></v-divider>
                        <v-col class="text-center">
                          <h4>Dates</h4>
                          <v-row>
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
                          </v-row>
                        </v-col>
                      </v-col>

                      <v-col>
                        <AttachImages />
                      </v-col>
                      <v-col>
                        <AddComment :passedInJob="selectedJob" />
                      </v-col>
                      <v-col>
                        <JobNotes/>
                      </v-col>
                      <v-col>
                        <JobChecklist />
                      </v-col>
                      <v-col>
                        <LogInventory/>
                      </v-col>

                      <v-col class="pt-0">
                        <v-btn color="error" width="100%" @click="viewJobDialog = false"
                          >Close</v-btn
                        >
                      </v-col>
                    </v-card-text>
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
                <Toast/>
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
import { onMounted, ref, Ref } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import AddJob from './AddJob.vue'
import ManagerJobCard from './ManagerJobCard.vue'
import AttachImages from './AttachImages.vue'
import AddComment from './AddComments.vue'
import JobChecklist from './JobChecklist.vue'
import LogInventory from './LogInventory.vue'
import JobNotes from './JobNotes.vue'

const toast = useToast()

// Search and dialog states
const search: Ref<string> = ref('')
const viewJobDialog: Ref<boolean> = ref(false)
const dialog: Ref<boolean> = ref(false)
const deleteDialog: Ref<boolean> = ref(false)
const managerJobCardDialog: Ref<boolean> = ref(false)
const selectedJob: Ref<any | null> = ref(null)

// Table headers
const headers = [
  { title: 'Job Heading', key: 'heading', align: 'start', value: 'heading' },
  { title: 'Client Phone', key: 'clientPhone', align: 'start', value: 'clientPhone' },
  { title: 'Client Mail', key: 'clientMail', align: 'start', value: 'clientMail' },
  { title: 'Job Description', key: 'jobDescription', align: 'start', value: 'jobDescription' },
  { title: 'Status', key: 'status', align: 'start', value: 'status' },
  { title: 'Start Date', key: 'startDate', align: 'start', value: 'startDate' },
  { title: 'End Date', key: 'endDate', align: 'start', value: 'endDate' },
  { title: 'Actions', key: 'actions', align: 'start', sortable: false, value: 'actions' }
]

// Reactive variable to hold job and client data
const jobClientData: Ref<any[]> = ref([])

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (localUrl: string): Promise<boolean> => {
  try {
    const res = await axios.get(localUrl)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

// Fetch job data
const fetchJobData = async (): Promise<any[]> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(apiUrl + `job/all/company/detailed/${localStorage['currentCompany']}`, config)
    const jobData = response.data.data
    const jobs = Array.isArray(jobData) ? jobData : [jobData]
    return jobs.map((job) => ({
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
      imagesTaken: job.recordedDetails.imagesTaken,
      inventoryUsed: job.recordedDetails.inventoryUsed,
      taskList: job.taskList,
      comments: job.comments
    }))
  } catch (error) {
    console.error('Error fetching job data:', error)
    throw error
  }
}

// Fetch data on component mount
onMounted(async () => {
  try {
    jobClientData.value = await fetchJobData()
    console.log('Job and client data fetched successfully:', jobClientData.value)
  } catch (error) {
    console.error('Error fetching job and client data:', error)
  }
})

// Dialog actions
const openDialog = (item: any) => {
  selectedJob.value = item
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  selectedJob.value = null
}

// Delete job
const showJobDeleteSuccess = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: `${selectedJob.value.heading} deleted successfully`, life: 3000 });
}

const showJobDeleteError = () => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: `An error occurred while deleting ${selectedJob.value.heading}`, life: 3000 });
}

const confirmDelete = async () => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()

  try {
    const response = await axios.delete(`${apiUrl}job/${selectedJob.value.jobId}`, config)
    console.log(response.data)

    if (response.data === true) {
      showJobDeleteSuccess()
      jobClientData.value = await fetchJobData()
    } else {
      showJobDeleteError()
    }
    closeDialog()
  } catch (error) {
    console.error('Error fetching job and client data:', error)
    showJobDeleteError()
  }
}

// Job status colors
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'green'
    case 'in progress':
      return 'orange'
    case 'not started':
      return 'red'
    default:
      return 'primary'
  }
}

// Row styling
const getRowProps = ({ index }: { index: number }) => {
  return {
    class: index % 2 ? 'bg-secondRowColor' : ''
  }
}

// Manager job card dialog
const editJobCardDialog = () => {
  managerJobCardDialog.value = true
}
</script>


<style scoped></style>
