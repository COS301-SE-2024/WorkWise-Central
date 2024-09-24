<template>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-users mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Team Breakdown Summary -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Teams: {{ teamStats.totalNumTeams }}</h5>
      </v-chip>
    </v-card-subtitle>

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

        <!-- Average Rating per Team -->
        <p><strong>Average Rating per Team:</strong></p>
        <v-card
          class="d-flex flex-column mx-auto py-4"
          elevation="10"
          height="auto"
          width="360"
        >
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
      teamStats: {
        totalNumTeams: 0,
        averageNumMembers: 0,
        averageNumJobsForTeam: 0,
        ratingPerTeam: []
      },
      averageTeamRatingsValue: 4.5, // Example average rating value
      totalRatings: 3360, // Example total ratings count
      ratingCounts: [0, 224, 448, 672, 896], // Example rating counts
      ratingValueFactor: 0.05, // Factor for progress bar values
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      averageTeamMembersChartData: {
        labels: ['Average Members'],
        datasets: [
          {
            label: 'Team Members',
            data: [], // Average number of team members
            backgroundColor: '#42A5F5'
          }
        ]
      },
      averageJobsPerTeamChartData: {
        labels: ['Team A', 'Team B', 'Team C', 'Team D'], // Example team labels
        datasets: [
          {
            label: 'Jobs Per Team',
            data: [], // Average jobs per team
            borderColor: '#FFA726',
            fill: false
          }
        ]
      }
    }
  },
  mounted() {
    this.getTeamStats()
  },
  methods: {
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
      axios
        .get(`${apiURL}stats/teamStats/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          this.teamStats = response.data.data
console.log(this.teamStats)
          // Update chart data with API response
          this.averageTeamMembersChartData.datasets[0].data = [this.teamStats.averageNumMembers]
          this.averageJobsPerTeamChartData.datasets[0].data = [this.teamStats.averageNumJobsForTeam]
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
