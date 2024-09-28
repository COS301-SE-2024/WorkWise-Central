<template>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-clock mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Jobs Information -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Jobs: {{ jobStats.totalNumJobs }}</h5>
      </v-chip>
    </v-card-subtitle>

    <!-- Job Categories Breakdown -->
    <v-card-text v-if="statsShown">
      <div>
        <h5>Jobs Overview</h5>

        <!-- Pie Chart for Active Jobs Breakdown -->

        <!-- Overall Rating Cards -->
        <v-container>
          <v-row>
            <v-col cols="12" lg="4">
              <Chart
                type="pie"
                :data="activeJobsChartData"
                :options="chartOptions"
                height="300px"
              />
            </v-col>

            <v-col cols="12" lg="4">
              <v-card
                class="d-flex flex-column mx-auto py-4"
                elevation="10"
                height="auto"
                width="360"
              >
                <div class="d-flex justify-center mt-auto text-h5">Work Performance Rating</div>
                <div class="d-flex align-center flex-column my-auto">
                  <div class="text-h2 mt-5">
                    {{ jobStats.workPerformanceRatingAverage }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>
                  <v-rating
                    :model-value="jobStats.workPerformanceRatingAverage"
                    color="yellow-darken-3"
                    half-increments
                  ></v-rating>
                  <div class="px-3">{{ totalWorkPerformanceRatings }} ratings</div>
                </div>
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                  <v-list-item v-for="(rating, i) in 5" :key="i">
                    <v-progress-linear
                      :model-value="workRatingCounts[i] * ratingValueFactor"
                      class="mx-n5"
                      color="yellow-darken-3"
                      height="20"
                      rounded
                    ></v-progress-linear>
                    <template v-slot:prepend>
                      <span>{{ rating }}</span>
                      <v-icon class="mx-3" icon="mdi-star"></v-icon>
                    </template>
                    <template v-slot:append>
                      <div class="rating-values">
                        <span class="d-flex justify-end">{{ workRatingCounts[i] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12" lg="4">
              <v-card
                class="d-flex flex-column mx-auto py-4"
                elevation="10"
                height="auto"
                width="360"
              >
                <div class="d-flex justify-center mt-auto text-h5">Customer Service Rating</div>
                <div class="d-flex align-center flex-column my-auto">
                  <div class="text-h2 mt-5">
                    {{ jobStats.customerServiceRatingAverage }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>
                  <v-rating
                    :model-value="jobStats.customerServiceRatingAverage"
                    color="yellow-darken-3"
                    half-increments
                  ></v-rating>
                  <div class="px-3">{{ totalCustomerServiceRatings }} ratings</div>
                </div>
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                  <v-list-item v-for="(rating, i) in 5" :key="i">
                    <v-progress-linear
                      :model-value="customerServiceRatingCounts[i] * ratingValueFactor"
                      class="mx-n5"
                      color="yellow-darken-3"
                      height="20"
                      rounded
                    ></v-progress-linear>
                    <template v-slot:prepend>
                      <span>{{ rating }}</span>
                      <v-icon class="mx-3" icon="mdi-star"></v-icon>
                    </template>
                    <template v-slot:append>
                      <div class="rating-values">
                        <span class="d-flex justify-end">{{ customerServiceRatingCounts[i] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Outstanding Invoices -->
        <p><strong>Jobs with Outstanding Invoices:</strong> {{ jobStats.amountOutstanding }}</p>
      </div>

      <!-- Line Chart for Hours Worked -->
      <!-- <Chart type="line" :data="hoursWorkedChartData" :options="chartOptions" height="600px" /> -->
    </v-card-text>
  </v-card>
</template>

<script>
import Chart from 'primevue/chart'
import axios from 'axios'
import { API_URL } from '@/main.js'

export default {
  components: { Chart },
  data() {
    return {
      currentTab: 'Job Breakdown',
      statsShown: false,
      jobStats: {
        totalNumJobs: 0,
        numActiveJobs: 0,
        activeJobs: [],
        numCompletedJobs: 0,
        completedJobs: [],
        numArchivedJobs: 0,
        archivedJobs: [],
        workPerformanceRating: [],
        workPerformanceRatingAverage: 0,
        customerServiceRating: [],
        customerServiceRatingAverage: 0,
        numJobsUnpaidInvoice: 0,
        jobsUnpaidInvoice: [],
        amountOutstanding: 0
      },
      // Chart data for active jobs
      activeJobsChartData: {
        labels: ['Active', 'Archived', 'Completed'],
        datasets: [
          {
            data: [0, 0, 0], // Will be populated with API response
            backgroundColor: ['#FF6384', '#36A2EB', '#42A5F5']
          }
        ]
      },

      // Rating-related data
      totalWorkPerformanceRatings: 0,
      workRatingCounts: [0, 0, 0, 0, 0],
      totalCustomerServiceRatings: 0,
      customerServiceRatingCounts: [0, 0, 0, 0, 0],
      ratingValueFactor: 15 // Factor for progress bar values
    }
  },
  methods: {
    async getRequestUrl() {
      return API_URL
    },
    async getJobStats() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .get(`${apiURL}stats/jobStats/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          this.jobStats = response.data.data

          // Update chart data
          this.activeJobsChartData.datasets[0].data = [
            this.jobStats.numActiveJobs,
            this.jobStats.numArchivedJobs,
            this.jobStats.numCompletedJobs
          ]

          // Update work performance rating data
          this.totalWorkPerformanceRatings = this.jobStats.workPerformanceRating.length
          this.workRatingCounts = this.calculateRatingCounts(this.jobStats.workPerformanceRating)

          // Update customer service rating data
          this.totalCustomerServiceRatings = this.jobStats.customerServiceRating.length
          this.customerServiceRatingCounts = this.calculateRatingCounts(
            this.jobStats.customerServiceRating
          )
        })
        .catch((error) => {
          console.error('Failed to fetch job stats:', error)
        })
      this.statsShown = true
    },
    calculateRatingCounts(ratings) {
      const counts = [0, 0, 0, 0, 0] // Array to hold counts for ratings 1 to 5
      ratings?.forEach((rating) => {
        if (rating.rating >= 1 && rating.rating <= 5) {
          counts[Math.floor(rating.rating) - 1]++ // Adjust index for 0-based array
        }
      })
      return counts
    }
  },
  mounted() {
    this.getJobStats()
  }
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
