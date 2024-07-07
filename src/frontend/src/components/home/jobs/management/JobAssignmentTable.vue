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
                      :items="jobClientData"
                      :search="search"
                      :single-expand="true"
                      v-model:expanded="expanded"
                      show-expand
                      height="auto"
                      rounded="xl"
                      :item-class="getRowClass"
                      class="font-lato"
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
          {{ selectedJob?.heading }}
        </v-card-title>
        <v-card-text> What would you like to do with this job? </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="editJobCardDialog(selectedJob)">Edit</v-btn>
          <v-dialog v-model="managerJobCardDialog" max-width="2000px">
            <ManagerJobCard
              :passedInJob="selectedJob"
              @close="managerJobCardDialog = false"
            ></ManagerJobCard>
          </v-dialog>
          <v-btn color="error" @click="deleteJob">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import AddJob from './AddJob.vue'
import ManagerJobCard from './ManagerJobCard.vue'

const search = ref('')
const expanded = ref([])
const isDarkMode = ref(false)
const modal_dark_theme_color = '#333'
const modal_light_theme_color = '#fff'

// set the table headers

const headers = [
  { title: 'Job Heading', key: 'heading', align: 'start', value: 'heading' },
  { title: 'Client', key: 'clientName', align: 'start', value: 'client' },
  { title: 'Job Description', key: 'jobDescription', align: 'start', value: 'jobDescription' },
  { title: 'Status', key: 'status', align: 'start', value: 'status' },
  { title: 'Start Date', key: 'startDate', align: 'start', value: 'startDate' },
  { title: 'End Date', key: 'endDate', align: 'start', value: 'endDate' },
  { title: 'Actions', key: 'actions', align: 'start', sortable: false, value: 'actions' }
];

// Reactive variable to hold job and client data
const jobClientData = ref([]);

// Function to fetch job data

const fetchJobData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  };

  try {
    const response = await axios.get('http://localhost:3000/job/all', config);
    const jobData = response.data.data;
    console.log(response.data);

    // Check if jobData is an array or needs conversion
    const jobs = Array.isArray(jobData) ? jobData : [jobData];

    // Map job data to include necessary details
    const mappedJobs = jobs.map(job => ({
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
    }));

    // Fetch client data for each job
    // Return combined job and client data
    return await fetchClientData(mappedJobs);
  } catch (error) {
    console.error('Error fetching job data:', error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
};

// Function to fetch client data for each job
const fetchClientData = async (jobs) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  };

  try {
    // Fetch client data for each job asynchronously
    const promises = jobs.map(async job => {
       const response = await axios.get(`http://localhost:3000/client/id/${job.clientId}`, config);
      const client = response.data.data;

      const clientName = `${client.details.firstName} ${client.details.lastName}`;

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
      };
    });

    // Wait for all promises to resolve
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching client data:', error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
};

// Fetch data on component mount using onMounted() hook
onMounted(async () => {
  try {
    jobClientData.value = await fetchJobData();
    // Log job and client data for verification
    console.log('Job and client data fetched successfully:', jobClientData.value);
  } catch (error) {
    console.error('Error fetching job and client data:', error);
  }
});

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
const deleteJob = () => {
  console.log('Delete job:', selectedJob.value)
  // confirm delete dialog activation here
  // add delete end point and refresh data
  closeDialog()
}

// managers the managerJobCard state

const editJobCardDialog = (job) => {
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

const getRowClass = () => {
  // Define your row class logic here
}

onMounted(() => {
  fetchJobData()
})
</script>
