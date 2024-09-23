<template>
  <v-card border="md" rounded="md" height="auto">
    <!-- Card Title -->
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-user-friends mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Number of Employees Display -->
    <v-card-subtitle
      ><v-chip color="primary"
        ><h5>Total Employees: {{ totalEmployees }}</h5></v-chip
      ></v-card-subtitle
    >

    <v-card-text>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        variant="outlined"
        color="primary"
        label="Search Employees"
        class="mb-4"
      />

      <!-- Employee Stats Table -->
      <v-data-table :items="employees" :headers="employeeHeaders" class="bg-background">
        <!-- Stats for Each Employee -->
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
      </v-data-table>

      <!-- Employee Breakdown Charts -->
      <div v-if="showStats">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6"
              ><p>Combined Employee and Job Stats:</p>
              <Chart type="bar" :data="combinedChartData" :options="chartOptions" height="300px"
            /></v-col>
            <v-col cols="12" lg="6"
              ><p>Jobs Completed On Time vs Not:</p>
              <Chart type="pie" :data="onTimeJobsChartData" :options="chartOptions" height="300px"
            /></v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Monthly Hours:</p>
              <v-select
                v-model="selectedMonth"
                :items="months"
                variant="outlined"
                color="primary"
                label="Select Month"
                @change="fetchMonthlyHours"
            /></v-col>
          </v-row>

          <Chart type="bar" :data="monthlyHoursChartData" :options="chartOptions" height="300px"
        /></v-container>

        <v-container>
          <v-row>
            <p>Average Ratings:</p>
            <v-col>
              <v-card
                class="d-flex flex-column mx-auto py-4"
                elevation="10"
                height="auto"
                width="360"
              >
                <div class="d-flex justify-center mt-auto text-h5">Customer Service Rating</div>
                <div class="d-flex align-center flex-column my-auto">
                  <div class="text-h2 mt-5">
                    {{ overallRating }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>
                  <v-rating
                    :model-value="overallRating"
                    color="yellow-darken-3"
                    half-increments
                  ></v-rating>
                  <div class="px-3">{{ totalRatings }} ratings</div>
                </div>
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                  <v-list-item v-for="(rating, i) in 5" :key="i">
                    <v-progress-linear
                      :model-value="rating * ratingValueFactor"
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
                        <span class="d-flex justify-end">{{ ratingCounts[i] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col>
              <v-card
                class="d-flex flex-column mx-auto py-4"
                elevation="10"
                height="auto"
                width="360"
              >
                <div class="d-flex justify-center mt-auto text-h5">Work Performance Rating</div>
                <div class="d-flex align-center flex-column my-auto">
                  <div class="text-h2 mt-5">
                    {{ overallRating }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>
                  <v-rating
                    :model-value="overallRating"
                    color="yellow-darken-3"
                    half-increments
                  ></v-rating>
                  <div class="px-3">{{ totalRatings }} ratings</div>
                </div>
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                  <v-list-item v-for="(rating, i) in 5" :key="i">
                    <v-progress-linear
                      :model-value="rating * ratingValueFactor"
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
                        <span class="d-flex justify-end">{{ ratingCounts[i] }}</span>
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
      totalEmployees: 100,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      employees: [],
      employeeStats: '',
      employeeHeaders: [
        { title: 'First Name', value: 'userInfo.firstName' },
        { title: 'Last Name', value: 'userInfo.surname' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      showStats: true,
      selectedMonth: null,
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      // Mock Chart Data
      combinedChartData: {
        labels: ['Active Jobs', 'Total Jobs', 'Completed Jobs'],
        datasets: [
          {
            label: 'Count',
            data: [25, 150, 100], // Replace with actual values
            backgroundColor: ['#66BB6A', '#FFA726', '#AB47BC']
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
      onTimeJobsChartData: {
        labels: ['On Time', 'Late'],
        datasets: [
          {
            label: 'Jobs Completed On Time vs Not',
            data: [70, 30], // 70 On Time, 30 Late
            backgroundColor: ['#66BB6A', '#EF5350']
          }
        ]
      },
      monthlyHoursChartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Hours Worked',
            data: [40, 35, 45, 50], // Example hours for each week
            backgroundColor: ['#42A5F5']
          }
        ]
      },
      overallRating: 4.5, // Example overall rating
      totalRatings: 120, // Example total ratings
      ratingCounts: [10, 30, 50, 20, 10], // Example counts for each rating
      ratingValueFactor: 20 // Example factor to scale the rating
    }
  },
  methods: {
    showBreakdown(employee) {
      this.selectedEmployee = employee
      this.showStats = true
      //this.fetchChartsData() // Fetch data for charts here
    },
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
    async getEmployeeStats() {
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
        .get(`${apiURL}stats/employeeStats/${localStorage.getItem('employeeId')}`, config)
        .then((response) => {
          this.employeeStats = response.data.data
        })
        .catch((error) => {
          console.error('Failed to fetch employee stats:', error)
        })
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
