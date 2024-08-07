<template>
  <v-container fluid :max-width="2560">
    <v-row justify="center" xs="6" sm="6" md="12">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="12" class="pa-0">
            <v-card
              height="auto"
              class="ma-0 bg-cardColor md-start"
              rounded="md"
              border="md"
              min-height="1000%"
            >
              <v-card-title height="auto" width="100%">
                <v-row align="center" justify="space-between">
                  <v-col
                    order-sm="0"
                    order-md="0"
                    cols="12"
                    md="4"
                    sm="12"
                    xs="12"
                    class="d-flex justify-start"
                  >
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
                  <v-col
                    order-sm="2"
                    order-md="2"
                    cols="12"
                    md="4"
                    sm="12"
                    xs="12"
                    class="d-flex justify-end"
                  >
                    <AddJob />
                  </v-col>
                </v-row>
              </v-card-title>

              <v-card-text>
                <v-divider></v-divider>
                <v-col cols="12" xs="12" sm="12" md="12">
                  <v-data-table
                    :headers="headers as any"
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
                        <a :href="`mailto:${value}`" style="color: inherit; text-decoration: none">
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
                      {{ item.details.startDate }}
                    </template>

                    <template v-slot:[`item.endDate`]="{ item }">
                      {{ item.details.endDate }}
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
      </v-col>
    </v-row>
    <v-dialog v-model="actionsDialog" :max-width="500">
      <v-card>
        <v-card-title>
          {{ selectedJob?.details.heading }}
        </v-card-title>
        <v-card-text> What would you like to do with this job? </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog"
            >Cancel <v-icon icon="fa:fa-solid fa-cancel" end color="primary" size="small"></v-icon
          ></v-btn>
          <v-spacer></v-spacer>

          <ViewJob :passedInJob="selectedJob"></ViewJob>

          <ManagerJobCard :passedInJob="selectedJob"></ManagerJobCard>

          <v-btn color="error" @click="deleteDialog = true"
            >Delete<v-icon icon="fa:fa-solid fa-trash" end color="error" size="small"></v-icon
          ></v-btn>
          <v-dialog v-model="deleteDialog" :max-width="500">
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
    <Toast />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AddJob from './AddJob.vue'
import ManagerJobCard from './ManagerJobCard.vue'
import ViewJob from './ViewJob.vue'
import { useToast } from 'primevue/usetoast'

// Define the type for the job object
interface Job {
  _id: string
  company: {
    registrationNumber: string
    vatNumber: string
    name: string
    type?: string
    jobStatuses?: string[]
    logo?: string
    contactDetails: {
      phoneNumber: string
      email: string
    }
    address: {
      street: string
      province: string
      suburb: string
      city: string
      postalCode: string
      complex?: string
      houseNumber?: string
    }
    private: boolean
  }
  client: {
    registrationNumber?: string
    details: {
      firstName: string
      lastName: string
      preferredLanguage?: string
      contactInfo: {
        phoneNumber: string
        email: string
      }
      address?: {
        street: string
        province: string
        suburb: string
        city: string
        postalCode: string
        complex?: string
        houseNumber?: string
      }
      vatNumber?: string
      companyId: string
      idNumber?: string
      type?: string
    }
    createdAt: string
    updatedAt: string
    deletedAt: string
  }
  assignedBy: {
    roleId: string
    superiorId?: string
    subordinates?: string[]
    subordinateTeams?: string[]
    userId: string
    userInfo: {
      username: string
      firstName: string
      surname: string
      displayName: string
      displayImage?: string
    }
    companyId: string
  }
  assignedEmployees?: {
    employeeIds?: string[]
    teamIds?: string[]
  }
  status: string
  tags?: string[]
  priorityTag?: string
  attachments: string[]
  details: {
    heading: string
    description: string
    address: {
      street: string
      province: string
      suburb: string
      city: string
      postalCode: string
      complex?: string
      houseNumber?: string
    }
    startDate: string
    endDate?: string
  }
  recordedDetails?: {
    imagesTaken?: string[]
    inventoryUsed?: {
      inventoryItemId: string
      inventoryItemName: string
      quantityUsed: number
    }[]
  }
  clientFeedback?: {
    rating?: number
    comment?: string
  }
  taskList: {
    name: string
    status: string
    assignedEmployees?: {
      roleId: string
      superiorId?: string
      subordinates?: string[]
      subordinateTeams?: string[]
      userId: string
      userInfo: {
        username: string
        firstName: string
        surname: string
        displayName: string
        displayImage?: string
      }
      companyId: string
    }[]
  }[]
  comments: string[]
  history?: {
    event: string
    timestamp: string
  }[]
  createdAt: string
  updatedAt: string
}

// Define state variables with types
const actionsDialog = ref(false)
const selectedJob = ref<Job | null>(null)
const deleteDialog = ref(false)
const detailedJobData = ref<Job[]>([])
const search = ref('')

const toast = useToast()

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

// Set the table headers
const headers: any[] = [
  { title: 'Job Heading', key: 'heading', align: 'start', value: 'heading' },
  { title: 'Client Phone', key: 'clientPhone', align: 'start', value: 'clientPhone' },
  { title: 'Client Mail', key: 'clientMail', align: 'start', value: 'clientMail' },
  { title: 'Job Description', key: 'description', align: 'start', value: 'description' },
  { title: 'Job Status', key: 'status', align: 'start', value: 'status' },
  { title: 'Start Date', key: 'startDate', align: 'start', value: 'startDate' },
  { title: 'End Date', key: 'endDate', align: 'start', value: 'endDate' },
  { title: 'Actions', key: 'actions', align: 'end', value: 'actions' }
]

// Fetch data and populate the table
const fetchData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(
      `${apiUrl}job/all/company/detailed/${localStorage.getItem('currentCompany')}`,
      config
    )
    detailedJobData.value = response.data.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Fetch Data Error',
      detail: 'Failed to fetch data',
      life: 3000
    })
  }
}

// Dialog management
const openDialog = (job: Job) => {
  selectedJob.value = job
  actionsDialog.value = true
}

const closeDialog = () => {
  actionsDialog.value = false
}

const confirmDelete = async () => {
  if (selectedJob.value) {
    try {
      const url = await getRequestUrl()
      await axios.delete(`${url}job/${selectedJob.value._id}`)
      detailedJobData.value = detailedJobData.value.filter(
        (job) => job._id !== selectedJob.value!._id
      )
      toast.add({
        severity: 'success',
        summary: 'Job Deleted',
        detail: 'Job deleted successfully',
        life: 3000
      })
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Delete Error',
        detail: 'Failed to delete job',
        life: 3000
      })
    } finally {
      deleteDialog.value = false
    }
  }
}

onMounted(fetchData)

const getRowProps = (item: Job) => {
  return {
    class: item.status === 'completed' ? 'bg-completed' : ''
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in progress':
      return 'blue'
    case 'completed':
      return 'green'
    case 'on hold':
      return 'yellow'
    case 'cancelled':
      return 'red'
    default:
      return 'gray'
  }
}
</script>

<style scoped>
.bg-cardColor {
  background-color: #e3e3e3;
}
.text-headingTextColor {
  color: #333;
}
.font-family-lato {
  font-family: 'Lato', sans-serif;
}
</style>
