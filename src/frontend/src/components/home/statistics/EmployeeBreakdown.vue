<template>
  <v-card border="md" rounded="md" height="auto">
    <!-- Card Title -->
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-user-friends mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Number of Employees Display -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Employees: {{ totalEmployees }}</h5>
      </v-chip>
    </v-card-subtitle>

    <v-card-text>
      <v-text-field v-model="search" append-icon="mdi-magnify" variant="outlined" color="primary"
        label="Search Employees" class="mb-4" />

      <!-- Employee Stats Table -->
      <v-data-table :items="employees" :headers="employeeHeaders" class="bg-background">
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn rounded="xl" variant="plain" v-bind="props">
                <v-icon color="primary">mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <!-- Employee Breakdown Menu -->
            <v-list>
              <v-list-item>
                <v-btn @click="showBreakdown(item)">
                  <v-icon icon="fa: fa-solid fa-chart-simple"></v-icon>
                  View Breakdown
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:[`item.userInfo.firstName`]="{ item }">
          <v-chip :color="selectedEmployee === item ? 'success' : 'secondary'">{{ item.userInfo.firstName }}</v-chip>
        </template>
      </v-data-table>


      <!-- Employee Breakdown Charts -->
      <div v-if="showStats">
        <v-card-title>Employee Breakdown for {{ selectedEmployee.userInfo.firstName }}</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" v-if="!combinedChartData.datasets[0].data.every(d => d !== 0)">
              <h5>Jobs for {{ selectedEmployee.userInfo.firstName }}</h5>
              <Chart type="pie" :data="combinedChartData" height="300px" />
            </v-col>
            <v-col cols="12" lg="6" v-if="!onTimeJobsChartData.datasets[0].data.every(d => d !== 0)">
              <h5>
                Jobs completed on time vs jobs completed late for {{ selectedEmployee.userInfo.firstName }}
              </h5>
              <Chart type="pie" :data="onTimeJobsChartData" height="300px" />
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-col cols="12" lg="6" v-if="totalCustomerRatings !== 0">
              <h5>Average Customer Service ratings given by</h5>
              <v-card class="d-flex flex-column mx-auto py-4" elevation="10" height="auto" width="360">
                <div class="d-flex justify-center mt-auto text-h5">Customer Service Rating</div>
                <div class="d-flex align-center flex-column my-auto">
                  <div class="text-h2 mt-5">
                    {{ customerServiceRatingAverage }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>
                  <v-rating :model-value="customerServiceRatingAverage" color="yellow-darken-3"
                    half-increments></v-rating>
                  <div class="px-3">{{ totalCustomerRatings }} ratings</div>
                </div>
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                  <v-list-item v-for="(rating, i) in 5" :key="i">
                    <v-progress-linear :model-value="ratingCounts[i] * ratingValueFactor" class="mx-n5"
                      color="yellow-darken-3" height="20" rounded></v-progress-linear>
                    <template v-slot:prepend>
                      <span>{{ rating }}</span>
                      <v-icon class="mx-3" icon="mdi-star"></v-icon>
                    </template>
                    <template v-slot:append>
                      <div class="rating-values">
                        <span class="d-flex justify-end">{{ ratingCounts[i] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="12" lg="6" v-if="totalJobRatings !== 0">
              <h5>Average Job Performance ratings given by</h5>
              <v-card class="d-flex flex-column mx-auto py-4" elevation="10" height="auto" width="360">
                <div class="d-flex justify-center mt-auto text-h5">Job Performance Rating</div>
                <div class="d-flex align-center flex-column my-auto">
                  <div class="text-h2 mt-5">
                    {{ jobPerformanceRatingAverage }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>
                  <v-rating :model-value="jobPerformanceRatingAverage" color="yellow-darken-3"
                    half-increments></v-rating>
                  <div class="px-3">{{ totalJobRatings }} ratings</div>
                </div>
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                  <v-list-item v-for="(rating, i) in 5" :key="i">
                    <v-progress-linear :model-value="jobRatingCounts[i] * ratingValueFactor" class="mx-n5"
                      color="yellow-darken-3" height="20" rounded></v-progress-linear>
                    <template v-slot:prepend>
                      <span>{{ rating }}</span>
                      <v-icon class="mx-3" icon="mdi-star"></v-icon>
                    </template>
                    <template v-slot:append>
                      <div class="rating-values">
                        <span class="d-flex justify-end">{{ jobRatingCounts[i] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
import Chart from 'primevue/chart'

export default {
  components: {
    Chart
  },
  data() {
    return {
      currentTab: 'Employee Breakdown',
      totalEmployees: 0,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      employees: [],
      employeeStats: '',
      employeeHeaders: [
        { title: 'First Name', value: 'userInfo.firstName' },
        { title: 'Last Name', value: 'userInfo.surname' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      showStats: false,
      selectedEmployee: {},
      // Mock Chart Data
      combinedChartData: {
        labels: ['Active Jobs', 'Completed Jobs'],
        datasets: [
          {
            label: 'Count',
            data: [], // Updated values from API
            backgroundColor: ['#FFA726', '#AB47BC']
          }
        ]
      },
      onTimeJobsChartData: {
        labels: ['On Time', 'Late'],
        datasets: [
          {
            label: 'On Time vs Late',
            data: [], // Updated values from API
            backgroundColor: ['#66BB6A', '#EF5350']
          }
        ]
      },
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      customerServiceRatingAverage: 0, // Fetched from API
      jobPerformanceRatingAverage: 0,
      totalJobRatings: 0,
      totalCustomerRatings: 0, // Calculated from customerServiceRating
      ratingCounts: [0, 0, 0, 0, 0], // Fetched from API
      jobRatingCounts: [0, 0, 0, 0, 0],
      ratingValueFactor: 20 // Example factor to scale the rating
    }
  },
  methods: {
    async fetchMonthlyHours() {
      // Fetch monthly hours data based on selectedMonth
      this.monthlyHoursChartData = {
        /* your data */
      }
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    showBreakdown(employee) {
      this.selectedEmployee = employee

      this.getEmployeeStats(employee)
    },
    async getEmployeeStats(employee) {
      this.showStats = true
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
      try {
        const response = await axios.get(`${apiURL}stats/employeeStats/${employee._id}`, config)
        const data = response.data.data

        // Update stats with response data
        this.combinedChartData.datasets[0].data = [data.numActiveJobs, data.numCompletedJobs]
        this.onTimeJobsChartData.datasets[0].data = [
          data.numJobsCompletedOnTime,
          data.numJobsCompletedLate
        ]
        this.customerServiceRatingAverage = data.customerServiceRatingAverage
        this.totalCustomerRatings = data.customerServiceRating.length
        this.jobPerformanceRatingAverage = data.workPerformanceRatingAverage
        this.totalJobRatings = data.workPerformanceRating.length

        // Assuming `ratingCounts` is calculated from `customerServiceRating`
        this.ratingCounts = this.calculateRatingCounts(data.customerServiceRating)
      } catch (error) {
        console.error('Failed to fetch employee stats:', error)
      }
    },
    calculateRatingCounts(ratings) {
      const counts = [0, 0, 0, 0, 0]
      ratings.forEach((rating) => {
        counts[Math.floor(rating) - 1]++
      })
      return counts
    },
    async getNumEmployees() {
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
      console.log(apiURL)
      axios
        .get(`${apiURL}stats/numEmployees/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response)
          this.totalEmployees = response.data.data
        })
        .catch((error) => {
          console.error('Failed to fetch number of employees:', error)
        })
    },
    async getEmployees() {
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
      try {
        const response = await axios.get(
          `${apiURL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response)
        this.employees = response.data.data
        this.selectedEmployee = this.employees[0]
        await this.getEmployeeStats(this.employees[0])
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getEmployees()
    this.getNumEmployees()
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
