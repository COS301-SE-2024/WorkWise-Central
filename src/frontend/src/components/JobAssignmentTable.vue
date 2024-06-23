<template>
  <v-app :style="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color">
    <v-container fluid fill-height class="pa-16 ma-auto pt-5 fixed-container">
      <v-row justify="center" xs="4" sm="4" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" xs="4" sm="4" md="12" offset="3">
              <v-card
                  flat
                  :height="auto"
                  :width="1500"
                  class="pa-11 ma-10"
                  rounded="xl"
                  elevation-2
                  :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  border="md"
              >
                <v-card-title class="d-flex align-center pe-2">
                  <v-icon icon="mdi-briefcase"></v-icon> &nbsp; Job Details
                  <v-spacer></v-spacer>
                  <v-text-field
                      v-model="search"
                      density="compact"
                      label="Search"
                      prepend-inner-icon="mdi-magnify"
                      variant="solo-filled"
                      flat
                      hide-details
                      :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                      single-line
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <AddJob />
                </v-card-title>
                <v-divider></v-divider>
                <div style="height: 700px; overflow-y: auto">
                  <v-data-table
                      :headers="headers"
                      :items="jobDetails"
                      :search="search"
                      :single-expand="true"
                      v-model:expanded="expanded"
                      show-expand
                      rounded="xl"
                      :item-class="getRowClass"
                  >
                    <template v-slot:[`item.jobTitle`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-briefcase</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.client`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-account</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.jobDescription`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-text-box-outline</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.status`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.assignedTeam`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-account-group</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.startDate`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-calendar-start</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.endDate`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-calendar-end</v-icon></v-chip>
                    </template>
                    <!-- Expanded content slot -->
                    <template v-slot:expanded-row="{ columns, item }">
                      <tr>
                        <td :colspan="columns.length">More info about {{ item.jobTitle }}</td>
                      </tr>
                    </template>
                    <!-- Actions slot -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-col cols="12">
                        <v-btn icon size="small" @click="openJobCard(item)" color="#5A82AF">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-btn icon size="small" @click="deleteClient(item)" color="#5A82AF">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </template>
                  </v-data-table>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-col> <DeleteClient v-model="deleteDialog" :details="selectedItem" /></v-col>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AddJob from './AddJob.vue'

const search = ref('');
const expanded = ref([]);
const jobDetails = ref([]);
const isDarkMode = ref(false);
const modal_dark_theme_color = "#333";
const modal_light_theme_color = "#fff";
const deleteDialog = ref(false);
const selectedItem = ref(null);

const headers = [
  { title: 'Job Title', key: 'jobTitle', align: 'start', value: 'jobTitle' },
  { title: 'Client', key: 'client', align: 'start', value: 'client' },
  { title: 'Job Description', key: 'jobDescription', align: 'start', value: 'jobDescription' },
  { title: 'Status', key: 'status', align: 'start', value: 'status' },
  { title: 'Assigned Team', key: 'assignedTeam', align: 'start', value: 'assignedTeam' },
  { title: 'Start Date', key: 'startDate', align: 'start', value: 'startDate' },
  { title: 'End Date', key: 'endDate', align: 'start', value: 'endDate' },
  { title: 'Actions', key: 'actions', align: 'start', sortable: false, value: 'actions' }
];

const fetchJobData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  };

  try {
    const response = await axios.get('http://localhost:3000/job/all', config);
    const jobData = response.data;

    jobDetails.value = jobData.map(job => ({
      jobTitle: job.details.heading,
      client: job.clientId,
      jobDescription: job.details.description,
      status: job.status,
      assignedTeam: job.assignedEmployees.join(', '),
      startDate: new Date(job.scheduledDateTime).toLocaleString(),
      endDate: 'N/A',
      actions: 'View/Edit/Delete'
    }));

    console.log('Job details constructed successfully:', jobDetails.value);
    console.log('Full response:', response);
  } catch (error) {
    console.error('Error fetching job data:', error);
  }
};

const openJobCard = (item) => {
  console.log('Open job card for:', item);
};

const deleteClient = (item) => {
  console.log('Delete client:', item);
  selectedItem.value = item;
  deleteDialog.value = true;
};

const getRowClass = () => {
  // Define your row class logic here
};

onMounted(() => {
  fetchJobData();
});
</script>
