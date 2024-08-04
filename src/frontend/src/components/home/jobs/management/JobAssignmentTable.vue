<template>
  <v-container fluid :max-width="2560" >
    <v-row justify="center" xs="6" sm="6" md="12">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="12" class="pa-0">
            <v-card
              height="auto "
              class=" ma-0 bg-cardColor md-start"
              rounded="md"
              :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
              border="md"
              min-height="1000%"
            >
              <v-card-title height="auto" width="100%">
                <v-row align="center" justify="space-between">
                  <v-col order-sm="0" order-md="0" cols="12" md="4" sm="12" xs="12" class="d-flex justify-start">
                    <v-label
                      class="ms-2 text-h4 font-family-lato text-headingTextColor"
                      style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
                      height="auto"
                      width="auto"
                      >
                      <v-icon icon="fa: fa-solid fa-briefcase" size="x-small"></v-icon>
                      Job Details</v-label
                    >
                  </v-col>

                  <v-col order-sm="1" order-md="1" cols="12" md="4" sm="12" xs="12">
                    <v-text-field
                      v-model="search"
                      density="compact"
                      label="Search"
                      prepend-inner-icon="mdi-magnify"
                      variant="outlined"
                      color="primary"
                      flat
                      width="100%"
                      style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
                      hide-details
                      single-line
                    ></v-text-field>
                  </v-col>
                  <v-col order-sm="2" order-md="2" cols="12" md="4" sm="12" xs="12" class="d-flex justify-end">
                    <AddJob />
                  </v-col>
                </v-row>
              </v-card-title>

              <v-card-text>
                <v-divider></v-divider>
                <v-col cols="12" xs="12" sm="12" md="12">
                    <v-data-table
                      :headers="headers"
                      :items="detailedJobData"
                      :search="search"
                      label="Jobs"
                      height="auto"
                      rounded="xl"
                      class="bg-cardColor"
                      :row-props="getRowProps"
                      min-width="100%"
                      min-height
                    >
                      <template v-slot:[`item.heading`]="{ item }">
                        {{ item.details.heading }}
                      </template>

                      <template v-slot:[`item.clientPhone`]="{ value }">
                        <v-chip color="primary">
                          <a :href="`tel:${value}`" style="color: inherit; text-decoration: none">
                            <v-icon>fa-solid fa-phone</v-icon>{{ value }}
                          </a>
                        </v-chip>
                      </template>

                      <template v-slot:[`item.clientMail`]="{ value }">
                        <v-chip color="primary">
                          <a
                            :href="`mailto:${value}`"
                            style="color: inherit; text-decoration: none"
                          >
                            <v-icon>fa-solid fa-envelope</v-icon>{{ value }}
                          </a>
                        </v-chip>
                      </template>

                      <template v-slot:[`item.description`]="{ item }">
                        {{ item.details.description }}
                      </template>

                      <template v-slot:[`item.status`]="{ value }">
                        <v-chip :color="getStatusColor(value)">
                          <v-icon>mdi-progress-clock</v-icon>{{ value }}
                        </v-chip>
                      </template>

                      <template v-slot:[`item.startDate`]="{ item }">
                        {{  new Date(item.details.startDate).toLocaleDateString() }}
                      </template>

                      <template v-slot:[`item.endDate`]="{ item }">
                        {{ new Date(item.details.endDate).toLocaleDateString() }}
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
                </v-col>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col></v-row
    >
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ selectedJob?.heading }}
        </v-card-title>
        <v-card-text> What would you like to do with this job? </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog"
            >Cancel <v-icon icon="fa:fa-solid fa-cancel" end color="primary" size="small"></v-icon
          ></v-btn>
          <v-spacer></v-spacer>

          <!-- View Job Dialog -->
          <ViewJob :passedInJob="selectedJob" @close="viewJobDialog"></ViewJob>

          <ManagerJobCard
            :passedInJob="selectedJob"
            @close="managerJobCardDialog = false"
          ></ManagerJobCard>

          <v-btn color="error" @click="deleteDialog = true"
            >Delete<v-icon icon="fa:fa-solid fa-trash" end color="error" size="small"></v-icon
          ></v-btn>
          <v-dialog v-model="deleteDialog" max-width="500">
            <v-card>
              <v-card-title class="text-h6 font-weight-regular bg-red">
                <v-icon color="white">mdi-alert-circle-outline</v-icon>
                Confirm Deletion
              </v-card-title>
              <v-card-text> Are you sure you want to delete this job? </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="confirmDelete">Confirm</v-btn>
                <v-btn @click="deleteDialog = false"
                  >Cancel<v-icon
                    icon="fa:fa-solid fa-cancel"
                    end
                    color="error"
                    size="small"
                  ></v-icon
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AddJob from './AddJob.vue'
import ManagerJobCard from './ManagerJobCard.vue'
import ViewJob from './ViewJob.vue'

const search = ref('')
const viewJobDialog = ref(false)

// set the table headers
const headers = [
  { title: 'Job Heading', key: 'heading', align: 'start', value: 'heading' },
  { title: 'Client Phone', key: 'clientPhone', align: 'start', value: 'clientPhone' },
  { title: 'Client Mail', key: 'clientMail', align: 'start', value: 'clientMail' },
  { title: 'Job Description', key: 'description', align: 'start', value: 'description' },
  { title: 'Status', key: 'status', align: 'start', value: 'status' },
  { title: 'Start Date', key: 'startDate', align: 'start', value: 'startDate' },
  { title: 'End Date', key: 'endDate', align: 'start', value: 'endDate' },
  { title: 'Actions', key: 'actions', align: 'start', sortable: false, value: 'actions' }
]

// Reactive variable to hold job and client data
const detailedJobData = ref([])

// Function to fetch job data

const fetchJobData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }

  try {
    const response = await axios.get(`http://localhost:3000/job/all/company/detailed/${localStorage.getItem('currentCompany')}`, config)
    return response.data.data
  } catch (error) {
    console.error('Error fetching job data:', error)
    throw error // Re-throw the error for handling elsewhere if needed
  }
}

onMounted(async () => {
  try {
    detailedJobData.value = await fetchJobData()
    console.log('Job data fetched successfully:', detailedJobData.value)
  } catch (error) {
    console.error('Error fetching job data:', error)
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

const getRowProps = ({ index }) => {
  return {
    class: index % 2 ? 'bg-secondRowColor' : ''
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  fetchJobData()
})
</script>

<style scoped></style>
