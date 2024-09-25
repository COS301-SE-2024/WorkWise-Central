<template>
  <v-app :style="isDarkMode === true ? 'dark' : 'light'" class="pl-5 pr-5">
    <v-container fluid fill-height>
      <v-row justify="center" xs="6" sm="6" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" class="pa-0">
              <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
                <v-card-title
                  class="d-flex align-center pe-2"
                  style="font-family: Nunito, sans-serif; font-size: 25px; font-weight: lighter"
                >
                  <v-row align="center" justify="space-between">
                    <v-col cols="12" lg="4" class="d-flex align-center">
                      <v-icon icon="fa: fa-solid fa-briefcase" size="x-small"></v-icon>
                      <v-label
                        class="ms-2 h2 font-family-Nunito text-headingTextColor"
                        height="auto"
                        width="auto"
                        >Job Details</v-label
                      >
                    </v-col>

                    <v-col order-sm="1" order-md="1" cols="12" lg="4">
                      <v-text-field
                        v-model="search"
                        density="compact"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        color="primary"
                        flat
                        width="100%"
                        style="
                          font-family: 'Lato', sans-serif;
                          font-size: 15px;
                          font-weight: lighter;
                        "
                        hide-details
                        single-line
                      ></v-text-field>
                    </v-col>
                    <v-col order-sm="2" order-md="2" cols="12" lg="4" class="d-flex justify-end">
                      <AddJob />
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
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
                        {{ item?.details?.heading }}
                      </template>

                      <template v-slot:[`item.clientPhone`]="{ item }">
                        <v-chip color="secondary">
                          <a
                            :href="`tel:${item?.clientId?.details?.contactInfo?.phoneNumber}`"
                            style="color: inherit; text-decoration: none"
                          >
                            <v-icon>
                              {{ 'fa: fa-solid fa-phone' }}
                            </v-icon>
                            {{ item?.clientId?.details?.contactInfo?.phoneNumber }}
                          </a>
                        </v-chip>
                      </template>

                      <template v-slot:[`item.clientMail`]="{ item }">
                        <v-chip color="secondary">
                          <a
                            :href="`mailto:${item?.clientId?.details?.contactInfo?.email}`"
                            style="color: inherit; text-decoration: none"
                          >
                            <v-icon>
                              {{ 'fa: fa-solid fa-envelope' }}
                            </v-icon>
                            {{ item?.clientId?.details?.contactInfo?.email }}
                          </a>
                        </v-chip>
                      </template>

                      <template v-slot:[`item.description`]="{ item }">
                        {{ item?.details?.description }}
                      </template>

                      <template v-slot:[`item.status`]="{ item }">
                        <v-chip :color="item?.status?.colour">
                          <v-icon>mdi-progress-clock</v-icon>{{ item?.status?.status }}
                        </v-chip>
                      </template>

                      <template v-slot:[`item.startDate`]="{ item }">
                        {{ formatDate(item?.details?.startDate) }}
                      </template>

                      <template v-slot:[`item.endDate`]="{ item }">
                        {{ formatDate(item?.details?.endDate) }}
                      </template>

                      <!-- Actions slot -->
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-menu max-width="500px">
                          <template v-slot:activator="{ props }">
                            <v-btn
                              rounded="xl"
                              variant="plain"
                              v-bind="props"
                              @click="openDialog(item)"
                            >
                              <v-icon color="primary">mdi-dots-horizontal</v-icon>
                            </v-btn>
                          </template>
                          <v-list class="bg-background">
                            <v-list-item class="pl-0">
                              <v-btn color="success" width="100%" @click.stop="openViewDialog()">
                                <v-icon
                                  icon="fa:fa-solid fa-eye"
                                  start
                                  color="success"
                                  size="small"
                                ></v-icon
                                >View
                              </v-btn>
                              <v-dialog
                                v-model="viewJobDialogVisible"
                                :max-height="800"
                                :max-width="1000"
                              >
                                <ViewJob
                                  :passedInJob="selectedJob"
                                  @close="closeViewJob()"
                                ></ViewJob>
                              </v-dialog>
                            </v-list-item>
                            <v-list-item class="pl-0">
                              <v-btn color="warning" width="100%" @click.stop="openJobCardDialog()">
                                <v-icon
                                  icon="fa:fa-solid fa-pencil"
                                  start
                                  color="warning"
                                  size="small"
                                ></v-icon
                                >Edit
                              </v-btn>
                              <v-dialog
                                v-model="viewManagerJobCardVisible"
                                :max-height="800"
                                :max-width="1000"
                              >
                                <ManagerJobCard
                                  :passedInJob="selectedJob"
                                  @close="closeEditJob()"
                                ></ManagerJobCard>
                              </v-dialog>
                            </v-list-item>
                            <v-list-item>
                              <v-btn color="error" @click.stop="deleteDialog = true">
                                <v-icon
                                  icon="fa:fa-solid fa-trash"
                                  start
                                  color="error"
                                  size="small"
                                ></v-icon
                                >Delete
                              </v-btn>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="deleteDialog" :max-width="500" :opacity="0">
        <v-card class="bg-cardColor">
          <v-card-title class="text-h6 font-weight-regular bg-red">
            <v-icon color="white">mdi-alert-circle-outline</v-icon>
            Confirm Deletion
          </v-card-title>
          <v-card-text> Are you sure you want to delete this job? </v-card-text>
          <v-card-actions>
            <v-container
              ><v-row
                ><v-col cols="12" lg="6" order="last" order-lg="first">
                  <v-btn @click="deleteDialog = false" block color="secondary"
                    ><v-icon icon="fa: fa-solid fa-cancel" color="secondary"></v-icon>Cancel</v-btn
                  ></v-col
                ><v-col cols="12" lg="6" order="first" order-lg="last">
                  <v-btn color="error" @click="confirmDelete" block :loading="isDeleting"
                    ><v-icon icon="fa: fa-solid fa-trash" color="error"></v-icon>Delete</v-btn
                  ></v-col
                >
              </v-row></v-container
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <Toast position="top-center" />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AddJob from './AddJob.vue'
import ManagerJobCard from './ManagerJobCard.vue'
import ViewJob from './ViewJob.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { API_URL } from '@/main'

const toast = useToast()

interface EmployeeId {
  companyId: string
  createdAt: string
  currentJobAssignments: string[]
  role: {
    permissionSuite: string[]
    roleId: string
    roleName: string
  }
  subordinateTeams: string[]
  subordinates: string[]
  superiorId: string
  updatedAt: string
  userId: string
  userInfo: {
    displayName: string
    firstName: string
    surname: string
  }
  _id: string
}

// Define the type for the job object
interface Job {
  _id: string
  assignedBy: {
    companyId: string
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
  }
  assignedEmployees?: {
    employeeIds?: string[]
    teamIds?: string[]
  }
  clientId: {
    createdAt: string
    details: {
      address: {
        city: string
        postalCode: string
        province: string
        street: string
        suburb: string
      }
      companyId: string
      contactInfo: {
        email: string
        phoneNumber: string
      }
      firstName: string
      idNumber: string
      lastName: string
      preferredLanguage: string
    }
  }
  companyId: string
  priorityTag?: {
    colour: string
    companyId: string
    label: string
    priorityLevel: number
    _v: number
    _id: string
  }
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
  status: {
    status: string
    colour: string
    companyId: string
    _v: number
    _id: string
  }
  tags?: {
    colour: string
    companyId: string
    label: string
    _v: number
    _id: string
  }[]
  clientFeedback?: {
    rating?: number
    comment?: string
  }
  taskList: {
    title: string
    items: {
      description: string
      assignedEmployees: string[]
      dueDate: string
      done: boolean
    }[]
  }
  comments: {
    employeeId: EmployeeId
    comment: string
    date: string
    _id: string
  }[]
  history?: {
    event: string
    timestamp: string
  }[]
  createdAt: string
  updatedAt: string
}

// Define state variables with types
const selectedJob = ref<Job | null>(null)
const deleteDialog = ref(false)
const isDeleting = ref(false)
const detailedJobData = ref<Job[]>([])
const search = ref('')
const isDarkMode = ref(localStorage.getItem('theme') === 'true' ? true : false)
const viewJobDialogVisible = ref(false)
const viewManagerJobCardVisible = ref(false)

const openJobCardDialog = () => {
  viewManagerJobCardVisible.value = true
}

const openViewDialog = () => {
  viewJobDialogVisible.value = true
}

const closeViewJob = async () => {
  viewJobDialogVisible.value = false
  await fetchData()
}

const closeEditJob = async () => {
  viewManagerJobCardVisible.value = false
  await fetchData()
}

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
  try {
    const response = await axios.get(
      `${API_URL}job/all/company/detailed/${localStorage.getItem('currentCompany')}`,
      config
    )
    if (response.status > 199 && response.status < 300) {
      detailedJobData.value = response.data.data
      console.log('Detailed Job Data', detailedJobData.value)
      console.log(response)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Fetch Data Error',
        detail: 'Failed to fetch data',
        life: 3000
      })
    }
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
}

const closeDialog = () => {}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}

const confirmDelete = async () => {
  isDeleting.value = true
  if (selectedJob.value) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
    try {
      const response = await axios.delete(`${API_URL}job/full/${selectedJob.value._id}`, config)
      detailedJobData.value = detailedJobData.value.filter(
        (job) => job._id !== selectedJob.value!._id
      )
      console.log('Deleted job:', response)
      toast.add({
        severity: 'success',
        summary: 'Job deleted successfully',
        detail: 'Job deleted successfully',
        life: 3000
      })
      setTimeout(() => {
        deleteDialog.value = false
        isDeleting.value = false
      }, 3000)
      closeDialog()
    } catch (error) {
      isDeleting.value = false
      toast.add({
        severity: 'error',
        summary: 'Delete Error',
        detail: 'Failed to delete job',
        life: 3000
      })
    } finally {
      localStorage.setItem('jobDeleted', 'true')
    }
  }
}

onMounted(() => {
  fetchData()
  const jobDeleted = localStorage.getItem('jobDeleted')

  if (jobDeleted === 'true') {
    toast.add({
      severity: 'success',
      summary: 'Job Deleted',
      detail: 'Job deleted successfully',
      life: 3000
    })
    localStorage.removeItem('jobDeleted')
  }
})

const getRowProps = ({ index }: any) => {
  return {
    class: index % 2 ? 'bg-secondRowColor' : ''
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
</style>
