<template>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-users mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Team Breakdown Summary -->
    <v-card-subtitle
      ><v-chip color="primary"
        ><h5>Total Teams: {{ }}</h5></v-chip
      ></v-card-subtitle
    >
    <v-card-text>
      <div>
        <!-- Bar Chart for Average Number of Team Members per Team -->
        <p><strong>Average Number of Team Members per Team:</strong></p>
        <Chart
          type="bar"
          :data="averageTeamMembersChartData"
          :options="chartOptions"
          height="300px"
        />

        <!-- Line Chart for Average Number of Jobs per Team -->
        <p><strong>Average Number of Jobs per Team:</strong></p>
        <Chart
          type="line"
          :data="averageJobsPerTeamChartData"
          :options="chartOptions"
          height="300px"
        />
        <p><strong>Average Rating per Team:</strong></p>
        <!-- Overall Average Ratings Card -->
        <v-card class="d-flex flex-column mx-auto py-4" elevation="10" height="auto" width="360">
          <div class="d-flex justify-center mt-auto text-h5">Average Ratings</div>

          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h2 mt-5">
              {{ averageTeamRatingsValue }}
              <span class="text-h6 ml-n3">/5</span>
            </div>

            <v-rating
              :model-value="averageTeamRatingsValue"
              color="yellow-darken-3"
              half-increments
            ></v-rating>
            <div class="px-3">{{ totalRatings }} ratings</div>
          </div>

          <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
            <v-list-item v-for="(rating, i) in 5" :key="i">
              <v-progress-linear
                :model-value="ratingCounts[i] * ratingValueFactor"
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
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Chart from 'primevue/chart'
import axios from 'axios'
export default {
  components: { Chart },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      currentTab: 'Team Breakdown', // Tab name
      totalTeams: 10, // Example total number of teams
      teamBreakdownChartData: {}, // Data for polar area chart
      averageTeamMembersChartData: {}, // Data for average team members bar chart
      averageJobsPerTeamChartData: {}, // Data for average jobs per team line chart
      averageTeamRatingsChartData: {}, // Data for average ratings radar chart
      averageTeamRatingsValue: 4.5, // Example overall average rating
      totalRatings: 3360, // Example total ratings count
      ratingCounts: [0, 224, 448, 672, 896], // Example counts for each star rating
      ratingValueFactor: 0.05, // Factor for progress bar values
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // Example data for the polar area chart, replace with actual team breakdown data
    this.teamBreakdownChartData = {
      labels: ['Team A', 'Team B', 'Team C', 'Team D'],
      datasets: [
        {
          data: [6, 8, 7, 5], // Example data for team members in each team
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
      ]
    }

    // Average team members chart data
    this.averageTeamMembersChartData = {
      labels: ['Average Members'],
      datasets: [
        {
          label: 'Team Members',
          data: [], // Average number of team members
          backgroundColor: '#42A5F5'
        }
      ]
    }

    // Average jobs per team chart data
    this.averageJobsPerTeamChartData = {
      labels: ['Team A', 'Team B', 'Team C', 'Team D'],
      datasets: [
        {
          label: 'Jobs Per Team',
          data: [14, 16, 13, 17], // Example data for jobs per team
          borderColor: '#FFA726',
          fill: false
        }
      ]
    }

    // Average ratings chart data
    this.averageTeamRatingsChartData = {
      labels: ['Team A', 'Team B', 'Team C', 'Team D'],
      datasets: [
        {
          label: 'Ratings',
          data: [4.6, 4.4, 4.5, 4.7], // Example ratings
          backgroundColor: '#66BB6A'
        }
      ]
    }

    // Calculate total teams
    this.totalTeams = this.teamBreakdownChartData.labels.length
    this.getTeamStats()
  },
  methods: {
    calculateAverage(arr) {
      return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2)
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
    async getTeamStats() {
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
        .get(`${apiURL}stats/teamStats/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response)
          this.teamStats = response.data.data
        })
        .catch((error) => {
          console.error('Failed to fetch team stats:', error)
        })
    }
  }
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
