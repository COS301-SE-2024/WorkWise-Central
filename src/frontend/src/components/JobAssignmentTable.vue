<template>
  <v-container fluid fill-height>
    <v-row justify="center" xs="6" sm="6" md="12">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="12">
            <v-card
              flat
              :height="auto"
              :max-height="auto"
              class="pa-11 ma-0"
              rounded="md"
              elevation-2
              :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
              border="md"
            >
              <v-card-title
                class="d-flex align-center pe-2"
                :color="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                style="font-family: 'Lato', sans-serif; font-size: 25px; font-weight: lighter"
              >
                <v-icon icon="mdi-account"></v-icon> &nbsp;Job Details

                <v-spacer></v-spacer>

                <v-text-field
                  v-model="search"
                  density="compact"
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  flat
                  style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
                  hide-details
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  single-line
                ></v-text-field>
                <v-spacer></v-spacer>
                <AddJob />
              </v-card-title>

              <v-divider></v-divider>
              <v-col cols="12" xs="12" sm="12" md="12">
                <div style="height: 700px; overflow-y: auto">
                  <v-col cols="12" xs="12" sm="12" md="12">
                    <v-data-table
                      :headers="headers"
                      :items="mockData"
                      :search="search"
                      :single-expand="true"
                      v-model:expanded="expanded"
                      show-expand
                      height="auto"
                      rounded="xl"
                      :item-class="getRowClass"
                      @click:row="toggleExpand"
                      class="font-lato"
                    >
                      <template v-slot:[`item.jobTitle`]="{ value }">
                        <v-chip color="#5A82AF"> <v-icon>mdi-briefcase</v-icon>{{ value }} </v-chip>
                      </template>

                      <template v-slot:[`item.client`]="{ value }">
                        <v-chip color="#5A82AF"> <v-icon>mdi-phone</v-icon>{{ value }} </v-chip>
                      </template>

                      <template v-slot:[`item.jobDescription`]="{ value }">
                        <v-chip color="#5A82AF">
                          {{ value }}
                        </v-chip>
                      </template>

                      <template v-slot:[`item.status`]="{ value }">
                        <v-chip :color="getStatusColor(value)">
                          <v-icon>mdi-progress-clock</v-icon>{{ value }}
                        </v-chip>
                      </template>

                      <template v-slot:[`item.assignedTeam`]="{ value }">
                        <v-chip @click="sendEmail" color="#5A82AF">
                          <v-icon>mdi-email</v-icon>{{ value }}
                        </v-chip>
                      </template>

                      <template v-slot:[`item.startDate`]="{ value }">
                        <v-chip color="#5A82AF">
                          <v-icon>mdi-calendar-start</v-icon>{{ value }}
                        </v-chip>
                      </template>

                      <template v-slot:[`item.endDate`]="{ value }">
                        <v-chip color="#5A82AF">
                          <v-icon>mdi-calendar-end</v-icon>{{ value }}
                        </v-chip>
                      </template>

                      <!-- Expanded content slot -->
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            Full Address: {{ item.name }}, {{ item.surname }}
                          </td>
                        </tr>
                        <tr>
                          <td :colspan="columns.length">VAT Number:{{ item.vatNumber }}</td>
                        </tr>
                        <tr>
                          <td :colspan="columns.length">
                            Languages Spoken: {{ item.preferred_Language }}
                          </td>
                        </tr>
                      </template>
                      <!-- Actions slot -->
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-btn
                          rounded="xl"
                          variant="plain"
                          style="transform: rotate(0deg)"
                          @click="openDialog(item)"
                        >
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </div>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-col></v-row
    >
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
          {{ selectedJob?.jobTitle }}
        </v-card-title>
        <v-card-text> What would you like to do with this job? </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="editJob">Edit</v-btn>
          <v-btn color="error" @click="deleteJob">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AddJob from './AddJob.vue'
// import JobCard from './JobCard.vue'
// import { useRouter } from 'vue-router'
// import ClientDetails from '@/components/AddClient.vue'
// import DeleteClient from '@/components/DeleteClient.vue'
// import EditClient from '@/components/EditClient.vue'

// const router = useRouter()
const search = ref('')
const expanded = ref([])
const jobDetails = ref([])
const isDarkMode = ref(false)
const modal_dark_theme_color = '#333'
const modal_light_theme_color = '#fff'
// const deleteDialog = ref(false)
// const selectedItem = ref(null)

const headers = [
  { title: 'Job Title', key: 'jobTitle', align: 'start', value: 'jobTitle' },
  { title: 'Client', key: 'client', align: 'start', value: 'client' },
  { title: 'Job Description', key: 'jobDescription', align: 'start', value: 'jobDescription' },
  { title: 'Status', key: 'status', align: 'start', value: 'status' },
  { title: 'Assigned Team', key: 'assignedTeam', align: 'start', value: 'assignedTeam' },
  { title: 'Start Date', key: 'startDate', align: 'start', value: 'startDate' },
  { title: 'End Date', key: 'endDate', align: 'start', value: 'endDate' },
  { title: 'Actions', key: 'actions', align: 'start', sortable: false, value: 'actions' }
]

const mockData = [
  {
    jobTitle: 'Bathroom Tiling',
    client: 'Siphele Bob',
    jobDescription: "Tiling Siphele Bob's bathroom according to specifications.",
    status: 'In Progress',
    assignedTeam: 'Team A',
    startDate: '2024-07-01',
    endDate: '2024-07-07',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Kitchen Renovation',
    client: 'Heaven Gates',
    jobDescription: "Renovating Heaven Gates' kitchen with new cabinets and countertops.",
    status: 'Not Started',
    assignedTeam: 'Team B',
    startDate: '2024-07-10',
    endDate: '2024-07-20',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Roof Repairs',
    client: 'Steven',
    jobDescription: "Repairing the roof for Steven's house due to storm damage.",
    status: 'Completed',
    assignedTeam: 'Team C',
    startDate: '2024-06-25',
    endDate: '2024-06-30',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Garden Landscaping',
    client: 'Lara Croft',
    jobDescription: "Landscaping Lara Croft's garden with new plants and a patio.",
    status: 'In Progress',
    assignedTeam: 'Team D',
    startDate: '2024-07-05',
    endDate: '2024-07-12',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Office Painting',
    client: 'Tony Stark',
    jobDescription: "Painting Tony Stark's office in modern colors.",
    status: 'Not Started',
    assignedTeam: 'Team E',
    startDate: '2024-07-15',
    endDate: '2024-07-18',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Deck Installation',
    client: 'Bruce Wayne',
    jobDescription: "Installing a new deck for Bruce Wayne's mansion.",
    status: 'Completed',
    assignedTeam: 'Team F',
    startDate: '2024-06-20',
    endDate: '2024-06-25',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Plumbing Repairs',
    client: 'Clark Kent',
    jobDescription: "Fixing plumbing issues in Clark Kent's house.",
    status: 'In Progress',
    assignedTeam: 'Team G',
    startDate: '2024-07-02',
    endDate: '2024-07-04',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Window Replacement',
    client: 'Peter Parker',
    jobDescription: "Replacing windows in Peter Parker's apartment.",
    status: 'Not Started',
    assignedTeam: 'Team H',
    startDate: '2024-07-08',
    endDate: '2024-07-10',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Electrical Wiring',
    client: 'Diana Prince',
    jobDescription: "Rewiring Diana Prince's house for safety.",
    status: 'Completed',
    assignedTeam: 'Team I',
    startDate: '2024-06-18',
    endDate: '2024-06-22',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Fence Installation',
    client: 'Barry Allen',
    jobDescription: "Installing a new fence around Barry Allen's property.",
    status: 'In Progress',
    assignedTeam: 'Team J',
    startDate: '2024-07-03',
    endDate: '2024-07-06',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Flooring Replacement',
    client: 'Hal Jordan',
    jobDescription: "Replacing the flooring in Hal Jordan's house.",
    status: 'Not Started',
    assignedTeam: 'Team K',
    startDate: '2024-07-12',
    endDate: '2024-07-14',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'HVAC Maintenance',
    client: 'Arthur Curry',
    jobDescription: "Maintaining the HVAC system in Arthur Curry's home.",
    status: 'Completed',
    assignedTeam: 'Team L',
    startDate: '2024-06-28',
    endDate: '2024-07-01',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Driveway Paving',
    client: 'Victor Stone',
    jobDescription: "Paving the driveway for Victor Stone's residence.",
    status: 'In Progress',
    assignedTeam: 'Team M',
    startDate: '2024-07-07',
    endDate: '2024-07-09',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Pool Cleaning',
    client: 'Wally West',
    jobDescription: "Cleaning Wally West's pool and performing maintenance.",
    status: 'Not Started',
    assignedTeam: 'Team N',
    startDate: '2024-07-13',
    endDate: '2024-07-15',
    actions: ['Edit', 'Delete']
  },
  {
    jobTitle: 'Basement Renovation',
    client: 'Oliver Queen',
    jobDescription: "Renovating the basement of Oliver Queen's house.",
    status: 'Completed',
    assignedTeam: 'Team O',
    startDate: '2024-06-15',
    endDate: '2024-06-20',
    actions: ['Edit', 'Delete']
  }

  // Add more mock data entries as needed
]

// Actions

const dialog = ref(false)
const selectedJob = ref(null)

const openDialog = (item) => {
  selectedJob.value = item
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  selectedJob.value = null
}

const editJob = () => {
  console.log('Edit job:', selectedJob.value)
  closeDialog()
}

const deleteJob = () => {
  console.log('Delete job:', selectedJob.value)
  closeDialog()
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
      return '#5A82AF' // Default color
  }
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
    const jobData = response.data

    jobDetails.value = jobData.map((job) => ({
      jobTitle: job.details.heading,
      client: job.clientId,
      jobDescription: job.details.description,
      status: job.status,
      assignedTeam: job.assignedEmployees.join(', '),
      startDate: new Date(job.scheduledDateTime).toLocaleString(),
      endDate: 'N/A',
      actions: 'View/Edit/Delete'
    }))

    console.log('Job details constructed successfully:', jobDetails.value)
    console.log('Full response:', response)
  } catch (error) {
    console.error('Error fetching job data:', error)
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

const getRowClass = () => {
  // Define your row class logic here
}

onMounted(() => {
  fetchJobData()
})
</script>
