<template>
  <v-container>
    <v-card class="bg-cardColor">
      <v-card-title class="text-h5">Current Jobs</v-card-title>
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
          <!-- @click="trackEmployee(job)" -->
          <v-btn color="success"
            ><v-icon icon="fa: fa-solid fa-file" color="success"></v-icon>View progress</v-btn
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import { APP_URL } from '@/main'

export default {
  data() {
    return {
      clientId: '',
      client: {
        registrationNumber: '',
        details: {
          firstName: '',
          lastName: '',
          preferredLanguage: '',
          contactInfo: {
            phoneNumber: '',
            email: ''
          },
          address: {
            street: '',
            suburb: '',
            province: '',
            city: '',
            postalCode: '',
            complexOrBuilding: ''
          },
          vatNumber: '',
          companyId: '',
          idNumber: '',
          type: ''
        }
      },
      jobs: [
        {
          _id: '',
          details: {
            heading: '',
            description: '',
            address: {
              street: '',
              province: '',
              suburb: '',
              city: '',
              postalCode: '',
              complex: '',
              houseNumber: ''
            },
            startDate: null,
            endDate: ''
          },
          status: {
            _id: '',
            status: '',
            colour: '',
            companyId: ''
          },
          clientFeedback: {
            jobRating: 10,
            customerServiceRating: 10,
            comments: ''
          }
        }
      ],
      reviewDialog: false,
      currentJobId: '',
      jobRating: 0,
      feedback: '',
      customerServiceRating: 0,
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
        .get(`${APP_URL}client/clientPortal/id/${this.clientId}`, config)
        .then((response) => {
          this.client = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })

      // Getting the client jobs
      await axios
        .get(`${APP_URL}client/portal/view-jobs?clientId=${this.clientId}`, config)
        .then((response) => {
          this.jobs = response.data.data
          console.log('response.data.data: ', response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
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
