<template>
  <v-container fluid fill-height>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h4>Customer Feedback</h4>
      </v-col>
    </v-row>
    <!-- Search and Filters Section -->
    <v-row class="d-flex justify-space-between">
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          label="Search Feedback"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          color="primary"
          clearable
        ></v-text-field>
      </v-col>
      <!-- <v-col cols="12" md="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filter by Category"
          variant="outlined"
          color="primary"
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedSatisfaction"
          :items="satisfactionLevels"
          label="Filter by Satisfaction Level"
          variant="outlined"
          color="primary"
          clearable
        ></v-select>
      </v-col> -->
    </v-row>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-row>
          <v-col
            v-for="(feedback, index) in filteredFeedbacks"
            :key="index"
            cols="12"
            lg="6"
            md="6"
          >
            <v-menu
              v-model="feedbackMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              v-model:return-value="selectedFeedback"
              @click:outside="feedbackMenu = false"
            >
              <template v-slot:activator="{ props }">
                <v-card v-bind="props" class="ma-3 bg-background" border="md">
                  <v-card-title class="bg-background">
                    <span> {{ feedback.clientName }}</span>
                    <v-spacer></v-spacer>
                    <span>{{ feedback.jobTitle }}</span>
                  </v-card-title>
                  <v-card-text
                    ><v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-label style="display: block; margin-bottom: 10px">Job Rating</v-label>
                          <v-rating
                            v-model="feedback.jobRating"
                            active-color="blue"
                            color="orange-lighten-1"
                            readonly
                          ></v-rating>
                        </v-col>

                        <v-col cols="12">
                          <v-label style="display: block; margin-bottom: 10px"
                            >Customer Service Rating</v-label
                          >
                          <v-rating
                            v-model="feedback.customerServiceRating"
                            active-color="blue"
                            color="orange-lighten-1"
                            readonly
                          ></v-rating>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-container>
                      <v-row
                        ><v-col>
                          <v-label style="display: block; margin-bottom: 10px">Comment</v-label>
                          <v-card-text>{{ feedback.comments }}</v-card-text></v-col
                        ></v-row
                      ></v-container
                    >
                  </v-card-text>
                </v-card>
              </template>
            </v-menu>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main'

interface Feedback {
  clientName: string
  comments: string
  jobRating: number
  customerServiceRating: number
  jobTitle: string
}

export default defineComponent({
  data() {
    return {
      activeTab: 0,
      feedbackMenu: false,
      selectedFeedback: null as Feedback | null,
      searchQuery: '',
      selectedCategory: '',
      selectedSatisfaction: null,
      satisfactionLevels: [1, 2, 3, 4, 5],
      categories: ['All Feedback'] as string[],
      categoryName: 'All Feedback',
      companyId: '',
      feedbacks: [] as Feedback[]
    }
  },
  methods: {
    getFeedbackDetails(feedback: Feedback) {
      console.log(feedback)
    },
    selectCategory(category: string) {
      this.categoryName = category // Update the categoryName
      console.log('Selected Category:', category)
    },
    populateCategories() {
      this.feedbacks.forEach((feedback: Feedback) => {
        if (!this.categories.includes(feedback.jobTitle)) {
          this.categories.push(feedback.jobTitle)
        }
      })
    },
    async getRequests() {
      // Getting all the jobs for the company
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      if (localStorage.getItem('currentCompany') !== null) {
        this.companyId = localStorage.getItem('currentCompany') as string
      }
      await axios
        .get(`${API_URL}job/all/company/${this.companyId}`, config)
        .then((response) => {
          for (const job of response.data.data) {
            if (job.clientFeedback != null) {
              this.feedbacks.push(job.clientFeedback)
              console.log('job.details.heading: ', job.details.heading)
              this.feedbacks[this.feedbacks.length - 1].jobTitle = job.details.heading
            }
          }
          console.log('this.feedbacks: ', this.feedbacks)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.populateCategories()
    this.getRequests()
  },
  computed: {
    filteredFeedbacks(): Feedback[] {
      return this.feedbacks.filter((feedback: Feedback) => {
        const matchesCategory = this.selectedCategory
          ? feedback.jobTitle === this.selectedCategory
          : true
        const matchesSatisfaction = this.selectedSatisfaction
          ? feedback.jobRating === this.selectedSatisfaction ||
            feedback.customerServiceRating === this.selectedSatisfaction
          : true
        const matchesSearchQuery = this.searchQuery
          ? feedback.comments.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            feedback.clientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            feedback.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true

        return matchesCategory && matchesSatisfaction && matchesSearchQuery
      })
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
