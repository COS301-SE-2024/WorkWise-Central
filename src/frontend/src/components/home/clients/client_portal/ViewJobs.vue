<template>
  <v-container fluid fill-height>
    <v-card class="bg-cardColor">
      <v-card-title class="text-h6">
        <v-col cols="12" lg="12" class="d-flex align-start">
            <v-icon icon="fa: fa-solid fa-briefcase"></v-icon>
            <v-label
              class="ms-2 h4 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Current Jobs</v-label
            >
          </v-col>
        </v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="job in jobs" :key="job._id">
          <v-list-item-content>
            <v-list-item-title>{{ job.details.heading }}</v-list-item-title>
            <v-list-item-subtitle>Description: {{ job.details.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>Status: {{ job.status.status }}</v-list-item-subtitle>
            <v-list-item-subtitle>Start Date: {{ job.details.startDate }}</v-list-item-subtitle>
            <v-list-item-subtitle
              >Expected Completion: {{ job.details.endDate }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-col cols="12" md="4" class="d-flex align-center justify-end">
              <v-btn
                class="text-none font-weight-regular hello"
                color="primary"
                block
                variant="elevated"
                style="color: white !important"
                @click="openProgressModal(job)"
              >
                View progress
              </v-btn>
            </v-col>
          <!-- <v-btn color="success" @click="openProgressModal(job)">
            <v-icon icon="fa: fa-solid fa-file" color="success"></v-icon>View progress
          </v-btn> -->
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Progress Modal -->
    <v-dialog v-model="progressDialog" max-width="500px">
      <v-card>
        <v-card-title>Job Progress</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p><strong>Job:</strong> {{ selectedJob.details.heading }}</p>
          <p><strong>Status:</strong> {{ selectedJob.status.status }}</p>

          <v-timeline align="start">
            <v-timeline-item
              v-for="status in jobStatuses"
              :key="status"
              :dot-color="status === selectedJob.status.status ? 'primary' : 'grey'"
            >
              <div>
                <div class="text-h6">{{ status }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeProgressModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import { APP_URL, API_URL } from '@/main'

interface Job {
  _id: string
  details: {
    heading: string
    description: string
    address: {
      street: string
      province: string
      suburb: string
      city: string
      postalCode: string
      complex: string
      houseNumber: string
    }
    startDate: string
    endDate: string
  }
  status: {
    _id: string
    status: string
    colour: string
    companyId: string
  }
  clientFeedback: {
    jobRating: number
    customerServiceRating: number
    comments: string
  }
}

interface Client {
  registrationNumber: string
  details: {
    firstName: string
    lastName: string
    preferredLanguage: string
    contactInfo: {
      phoneNumber: string
      email: string
    }
    address: {
      street: string
      suburb: string
      province: string
      city: string
      postalCode: string
      complexOrBuilding: string
    }
    vatNumber: string
    companyId: string
    idNumber: string
    type: string
  }
}

export default {
  data() {
    return {
      clientId: '',
      client: {} as Client,
      jobs: [] as Job[],
      reviewDialog: false,
      currentJobId: '',
      jobRating: 0,
      feedback: '',
      customerServiceRating: 0,
      selectedJob: {
        details: { heading: '' },
        status: { status: '' }
      },
      progressDialog: false,
      jobStatuses: [] as string[]
    }
  },
  methods: {
    async getRequests() {
      if (localStorage.getItem('clientId') !== null) {
        this.clientId = localStorage.getItem('clientId') as string
      }

      // Getting the client info
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`${API_URL}client/clientPortal/id/${this.clientId}`, config)
        .then((response) => {
          this.client = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })

      // Getting the client jobs
      await axios
        .get(`${API_URL}client/portal/view-jobs?clientId=${this.clientId}`, config)
        .then((response) => {
          //pushing each of the jobs in the response to the jobs array
          this.jobs = response.data.data
          console.log('response: ', response)
          console.log('this.jobs: ', this.jobs)
          for (const job of this.jobs) {
            job.details.startDate = this.formatDate(job.details.startDate)
            job.details.endDate = this.formatDate(job.details.endDate)
          }
        })
        .catch((error) => {
          console.error(error)
        })

      //getting the job statuses
      await axios
        .get(`${API_URL}job/status/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log('response.data.data: ', response.data.data)
          for (const status of response.data.data) {
            this.jobStatuses.push(status.status)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    formatDate(date: string) {
      const date_passed_in = new Date(date)
      const y = date_passed_in.getFullYear()
      const m = String(date_passed_in.getMonth() + 1).padStart(2, '0')
      const d = String(date_passed_in.getDate()).padStart(2, '0')
      const h = String(date_passed_in.getHours()).padStart(2, '0')
      const mn = String(date_passed_in.getMinutes()).padStart(2, '0')
      const f_date = `${y}-${m}-${d} ${h}:${mn}`
      console.log('f_date: ', f_date)
      return f_date
    },
    openProgressModal(job: any) {
      this.selectedJob = job
      this.progressDialog = true
    },
    closeProgressModal() {
      this.progressDialog = false
    }
  },
  mounted() {
    if (sessionStorage.getItem('clientId') !== null) {
      this.clientId = sessionStorage.getItem('clientId') as string
    }
    this.getRequests()
  }
}
</script>
