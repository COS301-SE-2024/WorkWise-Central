<template>
  <v-container>
    <v-tabs v-model="activeTab" background-color="primary" bg-color="secondary" dark>
      <v-tab v-for="category in categories" :key="category">{{ category }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="category in categories" :key="category">
        <v-row>
          <v-col v-for="(feedback, index) in feedbacks" :key="index" cols="12" lg="6" md="6">
            <v-menu
              v-model="feedbackMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              :return-value.sync="selectedFeedback"
              @click:outside="feedbackMenu = false"
            >
              <template v-slot:activator="{ props }">
                <v-card v-bind="props" class="ma-3">
                  <v-card-title>
                    <span>{{ feedback.employeeName }}</span>
                    <v-spacer></v-spacer>
                    <v-rating
                      v-model="feedback.satisfactionLevel"
                      active-color="blue"
                      color="orange-lighten-1"
                      readonly
                    ></v-rating>
                  </v-card-title>
                  <h6 class="bg-cardColor pa-5 ma-0">{{ feedback.jobDone }}</h6>
                  <v-card-text>{{ feedback.feedback }}</v-card-text>
                  <v-card-actions>
                    <v-btn text v-bind="props">Details</v-btn>
                  </v-card-actions>
                </v-card>
              </template>

              <v-card>
                <v-card-title>{{ feedback.clientName }}</v-card-title>
                <h6 class="bg-cardColor pa-5 ma-0">{{ feedback.employeeName }}</h6>
                <v-card-text>
                  <div><strong>Job Done:</strong> {{ feedback.jobDone }}</div>
                  <div>
                    <strong>Satisfaction Level:</strong>
                    <v-rating
                      v-model="feedback.satisfactionLevel"
                      color="success"
                      readonly
                    ></v-rating>
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
      ] as Feedback[],
      methods: {
        getRowProps(row: Feedback) {
          return {
            class: 'bg-cardColor'
          }
        },
        getFeedbackDetails(feedback: Feedback) {
          console.log(feedback)
        },
        filterCategory(category: string): Feedback[] {
          if (category === 'All Feedback') {
            return this.feedbacks
          } else {
            return this.feedbacks.filter((feedback) => feedback.jobDone === category)
          }
        }
      }
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
