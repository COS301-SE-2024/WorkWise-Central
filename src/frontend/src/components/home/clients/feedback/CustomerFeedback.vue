<template></template>
<script lang="ts"></script>
<template>
  <v-container>
    <v-tabs v-model="activeTab" background-color="primary" dark>
      <v-tab v-for="category in categories" :key="category">{{ category }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="category in categories" :key="category">
        <v-row>
          <v-col v-for="(feedback, index) in feedbacks" :key="index" cols="12" md="4">
            <v-menu
              v-model="feedbackMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              :return-value.sync="selectedFeedback"
              @click:outside="feedbackMenu = false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-card v-bind="attrs" v-on="on" class="ma-3">
                  <v-card-title>
                    <span>{{ feedback.employeeName }}</span>
                    <v-spacer></v-spacer>
                    <v-rating v-model="feedback.satisfactionLevel" readonly></v-rating>
                  </v-card-title>
                  <v-card-subtitle>{{ feedback.jobDone }}</v-card-subtitle>
                  <v-card-text>{{ feedback.feedback }}</v-card-text>
                  <v-card-actions>
                    <v-btn text v-bind="attrs" v-on="on">Details</v-btn>
                  </v-card-actions>
                </v-card>
              </template>

              <v-card>
                <v-card-title>{{ feedback.clientName }}</v-card-title>
                <v-card-subtitle>{{ feedback.employeeName }}</v-card-subtitle>
                <v-card-text>
                  <div><strong>Job Done:</strong> {{ feedback.jobDone }}</div>
                  <div>
                    <strong>Satisfaction Level:</strong>
                    <v-rating v-model="feedback.satisfactionLevel" readonly></v-rating>
                  </div>
                  <div><strong>Feedback:</strong> {{ feedback.feedback }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="feedbackMenu = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Feedback {
  clientName: string
  employeeName: string
  jobDone: string
  satisfactionLevel: number
  feedback: string
}

export default defineComponent({
  data() {
    return {
      activeTab: 0,
      feedbackMenu: false,
      selectedFeedback: null as Feedback | null,
      categories: ['All Feedback', 'Plumbing', 'Electrical', 'Carpentry'],
      feedbacks: [
        {
          clientName: 'Alice Brown',
          employeeName: 'John Doe',
          jobDone: 'Plumbing',
          satisfactionLevel: 4,
          feedback: 'Great job, very satisfied with the service.'
        },
        {
          clientName: 'Bob Smith',
          employeeName: 'Jane Smith',
          jobDone: 'Electrical',
          satisfactionLevel: 5,
          feedback: 'Excellent work, highly recommend!'
        }
        // Add more feedback objects here
      ] as Feedback[]
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
