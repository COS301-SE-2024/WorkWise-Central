<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title> Detailed Breakdown</v-card-title>
      <v-card-text>
        <v-list class="bg-background">
          <v-col cols="12">
            <v-row>
              <!-- Active Jobs -->
              <v-col v-if="jobStats.activeJobs.length > 0" cols="12">
                <h6>Active Jobs</h6>
                <v-data-table
                  :headers="[{ title: 'Job Title', value: 'jobTitle' }]"
                  :items="jobStats.activeJobs"
                  item-value="jobTitle"
                  class="bg-background"
                >
                  <template v-slot:[`item.jobTitle`]="{ item }">
                    <v-chip color="primary">{{ item.jobTitle }}</v-chip>
                  </template>
                </v-data-table>
              </v-col>

              <!-- Archived Jobs -->
              <v-col v-if="jobStats.archivedJobs.length > 0" cols="12">
                <h6>Archived Jobs</h6>
                <v-data-table
                  :headers="[{ title: 'Job Title', value: 'jobTitle' }]"
                  :items="jobStats.archivedJobs"
                  item-value="jobTitle"
                  class="bg-background"
                >
                  <template v-slot:[`item.jobTitle`]="{ item }">
                    <v-chip color="secondary">{{ item.jobTitle }}</v-chip>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>

            <v-row>
              <!-- Completed Jobs -->
              <v-col v-if="jobStats.completedJobs.length > 0" cols="12">
                <h6>Completed Jobs</h6>
                <v-data-table
                  :headers="[{ title: 'Job Title', value: 'jobTitle' }]"
                  :items="jobStats.completedJobs"
                  item-value="jobTitle"
                  class="bg-background"
                >
                  <template v-slot:[`item.jobTitle`]="{ item }">
                    <v-chip color="success">{{ item.jobTitle }}</v-chip>
                  </template>
                </v-data-table>
              </v-col>

              <!-- Invoices Unpaid -->
              <v-col v-if="jobStats.jobsUnpaidInvoice.length > 0" cols="12">
                <h6>Invoices Unpaid</h6>
                <v-data-table
                  :headers="[
                    { title: 'Invoice Number', value: 'invoiceNumber' },
                    { title: 'Job Title', value: 'job.jobTitle' },
                    { title: 'Total', value: 'total' }
                  ]"
                  :items="jobStats.jobsUnpaidInvoice"
                  item-value="invoiceNumber"
                  class="bg-background"
                >
                  <template v-slot:[`item.invoiceNumber`]="{ item }">
                    <v-chip color="error">{{ item.invoiceNumber }}</v-chip>
                  </template>
                  <template v-slot:[`itemjob.jobTitle`]="{ item }">
                    <v-chip>{{ item.job.jobTitle }}</v-chip>
                  </template>
                  <template v-slot:[`item.total`]="{ item }">
                    <v-chip color="error">R{{ item.total }}</v-chip>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-col>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" @click="dialog = false" block>
          <v-icon color="error">fa-solid fa-cancel</v-icon>Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <LoadingScreen :Loading="!statsShown" />
  <v-card border="md" rounded="md" height="auto" v-if="statsShown">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-clock mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Jobs Information -->
    <v-card-subtitle>
      <v-btn @click="dialog = true">View Details</v-btn>
      <br />
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
                max-height="300px"
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
import LoadingScreen from '@/components/home/misc/LoadingScreen.vue'
import axios from 'axios'
import { API_URL } from '@/main'
export default {
  components: { Chart, LoadingScreen },
  data() {
    return {
      currentTab: 'Job Breakdown',
      statsShown: false,
      jobStats: {
        totalNumJobs: 0,
        loadingData: true,
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
      dialog: false,
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
      const API_URL = await this.getRequestUrl()
      axios
        .get(`${API_URL}stats/jobStats/${localStorage.getItem('currentCompany')}`, config)
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
          this.customerServiceRatingCounts = this.calculateRatingCounts(
            this.jobStats.customerServiceRating
          )
          setTimeout(() => {
            this.statsShown = true
          }, 4000)
        })
        .catch((error) => {
          console.error('Failed to fetch job stats:', error)
        })
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
