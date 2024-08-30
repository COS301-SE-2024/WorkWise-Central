<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5">Review Completed Jobs</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="job in completedJobs" :key="job.id">
          <v-list-item-content>
            <v-list-item-title>{{ job.name }}</v-list-item-title>
            <v-list-item-subtitle>Completed On: {{ job.completionDate }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="primary" @click="openReviewDialog(job)">Review</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>

    <v-dialog v-model="reviewDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Review Job</v-card-title>
        <v-card-text>
          <v-rating v-model="rating" background-color="yellow"></v-rating>
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

<script>
export default {
  data() {
    return {
      completedJobs: [
        { id: 1, name: 'Job 3', completionDate: '2023-08-20' },
        { id: 2, name: 'Job 4', completionDate: '2023-09-01' }
      ],
      reviewDialog: false,
      rating: 0,
      feedback: ''
    }
  },
  methods: {
    openReviewDialog(job) {
      this.reviewDialog = true
    },
    submitReview() {
      // Submit the review to the backend
      this.reviewDialog = false
    }
  }
}
</script>
