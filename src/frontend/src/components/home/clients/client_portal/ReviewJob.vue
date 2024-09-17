<template>
  <v-container>
    <v-card class="bg-cardColor">
      <v-card-title class="text-h5">Review Completed Jobs</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="job in completedJobs" :key="job._id">
          <v-list-item-content>
            <v-list-item-title>{{ job.details.heading }}</v-list-item-title>
            <v-list-item-subtitle>Description: {{ job.details.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>Start date: {{ job.details.startDate }}</v-list-item-subtitle>
            <v-list-item-subtitle>End date: {{ job.details.endDate }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="primary" @click="openReviewDialog(job)">Review</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>

    <v-dialog v-model="reviewDialog" max-width="500px">
      <v-card class="bg-cardColor">
        <v-card-title class="text-h5">Review Job</v-card-title>
        <v-card-text>
          <v-label style="display: block; margin-bottom: 10px">Customer Service Rating</v-label>
          <v-rating
            v-model="customerServiceRating"
            background-color="yellow"
            style="margin-bottom: 20px"
          ></v-rating>

          <v-label style="display: block; margin-bottom: 10px">Job Service Rating</v-label>
          <v-rating
            v-model="jobRating"
            background-color="yellow"
            style="margin-bottom: 20px"
          ></v-rating>

          <v-textarea v-model="feedback" label="Your Feedback"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col lg="6" cols="12" order-lg="first">
                <v-btn @click="reviewDialog = false" color="error" block
                  ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Cancel</v-btn
                >
              </v-col>
              <v-col lg="6" cols="12" order-lg="last" order="first">
                <v-btn @click="submitReview" block color="success"
                  ><v-icon icon="fa: fa-solid fa-paper-plane" color="success"></v-icon>Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'

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
      completedJobs: [
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
          clientFeedback: {
            jobRating: 10,
            customerServiceRating: 10,
            comments: ''
          }
        }
      ],
      reviewDialog: false,
      currentJobId:'',
      jobRating: 0,
      feedback: '',
      customerServiceRating: 0,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status >= 200 && res.status < 300
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
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
      const url = await this.getRequestUrl()
      await axios
        .get(`${url}client/clientPortal/id/${this.clientId}`, config)
        .then((response) => {
          this.client = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })

      // Getting the client jobs
      await axios
        .get(`${url}client/portal/view-jobs/complete?clientId=${this.clientId}`, config)
        .then((response) => {
          this.completedJobs = response.data.data
          console.log('response.data.data: ', response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    openReviewDialog(job: any) {
      this.reviewDialog = true
      this.currentJobId = job._id
    },
    async submitReview() {
      // Submit the review to the backend
      this.reviewDialog = false
      const data = {
        jobId: this.currentJobId,
        clientId: this.clientId,
        jobRating: this.jobRating,
        customerServiceRating: this.customerServiceRating,
        comments: this.feedback,
        clientName: this.client.details.firstName + ' ' + this.client.details.lastName
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = await this.getRequestUrl()
      await axios.post(`${url}client/portal/feedback`, data, config).then((response) => {
        console.log(response)
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review Submitted'
        })
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
