<template>
  <v-card border="md" rounded="md" height="auto">
    <!-- Card Title -->
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-user-friends mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Number of Employees Display -->
    <v-card-subtitle>Total Employees: {{ totalEmployees }}</v-card-subtitle>

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
                <v-btn @click="showJobCard(item)">
                  <v-icon icon="fa: fa-solid fa-briefcase"></v-icon>Active Jobs ({{
                    item.activeJobs
                  }})
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn>
                  <v-icon icon="fa: fa-solid fa-clipboard-check"></v-icon>Total Jobs:
                  {{ item.totalJobs }} 
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn>
                  <v-icon icon="fa: fa-solid fa-check-circle"></v-icon>Completed Jobs:
                  {{ item.completedJobs }}
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn>
                  <v-icon icon="fa: fa-solid fa-clock"></v-icon>Completed On Time:
                  {{ item.onTimeJobs }} / {{ item.totalJobs }}
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn @click="showMonthlyHours(item)">
                  <v-icon icon="fa: fa-solid fa-calendar-alt"></v-icon>Monthly Hours (Select Month)
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn>
                  <v-icon icon="fa: fa-solid fa-star"></v-icon>Average Rating:
                  {{ item.averageRating }}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>

      <!-- Additional Charts/Details can appear below the table when a button is clicked -->
      <v-card v-if="showStats">
        <v-card-title>Job Details for {{ selectedEmployee.name }}</v-card-title>
        <v-card-text>
          <!-- Active Jobs Information (Clickable) -->
          <div v-if="selectedEmployee.activeJobs.length">
            <p><strong>Active Jobs:</strong></p>
            <v-list>
              <v-list-item v-for="job in selectedEmployee.activeJobs" :key="job.id">
                {{ job.name }}
              </v-list-item>
            </v-list>
          </div>

          <!-- Monthly Hours Selection -->
          <v-select
            v-if="showMonthlyHours"
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
          />
          <p v-if="selectedMonth">
            Monthly Hours for {{ selectedMonth }}:
            {{ selectedEmployee.monthlyHours[selectedMonth] }} hours
          </p>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      currentTab: 'Employee Breakdown', // Example tab name
      totalEmployees: 100, // Example total employees, replace with actual data
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      employees: [], // Array to hold employee data
      employeeHeaders: [
        { title: 'First Name', value: 'userInfo.firstName' },
        { title: 'Last Name', value: 'userInfo.surname' },

        { title: 'Actions', value: 'actions', sortable: false }
      ],
      activeEmployeesChartData: {}, // Data for polar area chart, bind actual data here
      chartOptions: {}, // Options for the chart
      selectedEmployee: null, // To hold the selected employee's details
      showStats: false, // To show job card and additional stats
      selectedMonth: null, // For monthly hours selection
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
      ]
    }
  },
  methods: {
    showJobCard(employee) {
      this.selectedEmployee = employee
      this.showStats = true
    },
    showMonthlyHours(employee) {
      this.selectedEmployee = employee
      this.showMonthlyHours = true
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
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
