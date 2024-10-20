<template>
  <v-container fluid fill-height>
    <v-card class="bg-cardColor">
      <v-card-title class="text-h6">
        <v-col cols="12" lg="12" class="d-flex align-start">
          <v-icon icon="fa: fa-solid fa-star-half-stroke"></v-icon>
          <v-label
            class="ms-2 h4 font-family-Nunito text-headingTextColor"
            height="auto"
            width="auto"
            >Review Completed Jobs
          </v-label>
        </v-col>
      </v-card-title>
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
            <!-- <v-btn color="primary">Review</v-btn> -->
            <v-col cols="12" md="4" class="d-flex align-center justify-end">
              <v-btn
                class="text-none font-weight-regular hello"
                color="primary"
                block
                variant="elevated"
                style="color: white !important"
                @click="openReviewDialog(job)"
              >
                Review
              </v-btn>
            </v-col>
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
import { API_URL } from '@/main'

//creating an interface for completed jobs
interface CompletedJob {
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
  clientFeedback: {
    jobRating: number
    customerServiceRating: number
    comments: string
  }
}

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
      completedJobs: [] as CompletedJob[],
      reviewDialog: false,
      currentJobId: '',
      jobRating: 0,
      feedback: '',
      customerServiceRating: 0
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
        .get(`${API_URL}client/portal/view-jobs/complete?clientId=${this.clientId}`, config)
        .then((response) => {
          this.completedJobs = response.data.data
          console.log('response.data.data: ', response.data.data)
          for (const job of this.completedJobs) {
            job.details.startDate = this.formatDate(job.details.startDate)
            job.details.endDate = this.formatDate(job.details.endDate)
          }
          //removing the jobs that already have a rating (has an empty array or undefined)
          this.completedJobs = this.completedJobs.filter((job) => {
            return job.clientFeedback === undefined || job.clientFeedback === null
          })
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
      await axios.post(`${API_URL}client/portal/feedback`, data, config).then((response) => {
        console.log(response)
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review Submitted'
        })
      })
      //removing that job from the list
      this.completedJobs = this.completedJobs.filter((job) => {
        return job._id !== this.currentJobId
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
