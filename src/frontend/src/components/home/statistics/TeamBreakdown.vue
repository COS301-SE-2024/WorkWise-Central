<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>{{ selectedClient.firstName }}'s Detailed Breakdown</v-card-title>
      <v-card-text>
        <v-list class="bg-cardColor">
          <v-col cols="12">
            <v-row>
              <!-- Active Jobs -->
              <v-col v-if="clientStats.activeJobs.length > 0" cols="12" lg="4">
                <v-list-item-group>
                  <v-subheader>Active Jobs</v-subheader>
                  <v-list-item
                    v-for="(job, index) in clientStats.activeJobs"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="primary">{{ job.jobTitle }}</v-chip>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>

              <!-- All Jobs -->
              <v-col v-if="clientStats.allJobs.length > 0" cols="12" lg="4">
                <v-list-item-group>
                  <v-subheader>All Jobs</v-subheader>
                  <v-list-item
                    v-for="(job, index) in clientStats.allJobs"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="secondary">{{ job.jobTitle }}</v-chip>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>

              <!-- Completed Jobs -->
              <v-col v-if="clientStats.completedJobs.length > 0" cols="12" lg="4">
                <v-list-item-group>
                  <v-subheader>Completed Jobs</v-subheader>
                  <v-list-item
                    v-for="(job, index) in clientStats.completedJobs"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="success">{{ job.jobTitle }}</v-chip>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>
            </v-row>

            <v-row>
              <!-- Invoices Paid -->
              <v-col v-if="clientStats.invoicesPaid.length > 0" cols="12" lg="6">
                <v-list-item-group>
                  <v-subheader>Invoices Paid</v-subheader>
                  <v-list-item
                    v-for="(invoice, index) in clientStats.invoicesPaid"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-chip color="success">
                      <v-list-item-content>{{ invoice.invoiceNumber }}.</v-list-item-content>
                      <br />
                      <v-list-item-content>{{ invoice.job.jobTitle }}</v-list-item-content>
                      <br />
                      <v-list-item-content>R{{ invoice.total }}</v-list-item-content>
                    </v-chip>
                  </v-list-item>
                </v-list-item-group>
              </v-col>

              <!-- Invoices Unpaid -->
              <v-col v-if="clientStats.invoicesUnpaid.length > 0" cols="12" lg="6">
                <v-list-item-group>
                  <v-subheader>Invoices Unpaid</v-subheader>
                  <v-list-item
                    v-for="(invoice, index) in clientStats.invoicesUnpaid"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-chip color="error">
                      <v-list-item-content>{{ invoice.invoiceNumber }}.</v-list-item-content>
                      <br />
                      <v-list-item-content>{{ invoice.job.jobTitle }}</v-list-item-content>
                      <br />
                      <v-list-item-content>R{{ invoice.total }}</v-list-item-content>
                    </v-chip>
                  </v-list-item>
                </v-list-item-group>
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
        <!-- Conditionally render Bar Chart for Average Number of Team Members per Team -->
        <v-container v-if="teamStats.totalNumTeams">
          <v-row>
            <v-col cols="12" lg="6">
              <p><strong>Average Number of Team Members per Team:</strong></p>
              <Chart
                v-if="teamStats.averageNumMembers > 0"
                type="bar"
                :data="averageTeamMembersChartData"
                :options="chartOptions"
                height="300px"
              />
            </v-col>

            <!-- Conditionally render Line Chart for Average Number of Jobs per Team -->
            <v-col cols="12" lg="6">
              <p><strong>Average Number of Jobs per Team:</strong></p>
              <Chart
                v-if="teamStats.averageNumJobsForTeam > 0"
                type="line"
                :data="averageJobsPerTeamChartData"
                :options="chartOptions"
                height="300px"
              />
            </v-col>
          </v-row>
        </v-container>

        <!-- Conditionally render Average Rating per Team if there are teams with ratings -->
        <p v-if="teamStats.ratingPerTeam.length"><strong>Average Rating per Team:</strong></p>
        <v-container v-if="teamStats.ratingPerTeam.length">
          <v-row>
            <v-col
              cols="12"
              md="6"
              lg="3"
              v-for="(team, index) in teamStats.ratingPerTeam"
              :key="team.teamId"
            >
              <v-card class="d-flex flex-column mx-auto py-4" elevation="10">
                <div class="d-flex justify-center text-h5 mb-2">Team {{ index + 1 }} Ratings</div>

                <div class="d-flex align-center flex-column my-auto">
                  <!-- Work Performance Rating -->
                  <div class="text-h2 mt-4">
                    {{ team.workPerformanceRatingAverage ?? 0 }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>

                  <v-rating
                    :model-value="team.workPerformanceRatingAverage ?? 0"
                    color="yellow-darken-3"
                    half-increments
                  ></v-rating>

                  <div class="px-3 mb-4">
                    {{ team.workPerformanceRating.length }} work performance ratings
                  </div>

                  <!-- Customer Service Rating -->
                  <div class="text-h2 mt-4">
                    {{ team.customerServiceRatingAverage ?? 0 }}
                    <span class="text-h6 ml-n3">/5</span>
                  </div>

                  <v-rating
                    :model-value="team.customerServiceRatingAverage ?? 0"
                    color="yellow-darken-3"
                    half-increments
                  ></v-rating>

                  <div class="px-3 mb-4">
                    {{ team.customerServiceRating.length }} customer service ratings
                  </div>
                </div>

                <!-- Progress Linear for Ratings -->
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                  <v-list-item v-for="(rating, i) in 5" :key="i" class="mb-2">
                    <v-progress-linear
                      :model-value="calculateProgress(team.workPerformanceRating, i + 1)"
                      class="mx-n5"
                      color="yellow-darken-3"
                      height="20"
                      rounded
                    ></v-progress-linear>

                    <template v-slot:prepend>
                      <span>{{ i + 1 }}</span>
                      <v-icon class="mx-3" icon="mdi-star"></v-icon>
                    </template>

                    <template v-slot:append>
                      <div class="rating-values">
                        <span class="d-flex justify-end">{{
                          calculateRatingCount(team.workPerformanceRating, i + 1)
                        }}</span>
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
import Chart from 'primevue/chart'
import axios from 'axios'

export default {
  components: { Chart },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      currentTab: 'Team Breakdown',
      teamStats: {
        totalNumTeams: 0,
        averageNumMembers: 0,
        averageNumJobsForTeam: 0,
        ratingPerTeam: []
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      averageTeamMembersChartData: {
        labels: ['Average Members'],
        datasets: [
          {
            label: 'Team Members',
            data: [], // Will be filled with API data
            backgroundColor: '#42A5F5'
          }
        ]
      },
      averageJobsPerTeamChartData: {
        labels: ['Average Jobs'],
        datasets: [
          {
            label: 'Jobs',
            data: [], // Will be filled with API data
            borderColor: '#FFA726',
            fill: true
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
    calculateProgress(ratings, starValue) {
      const totalRatings = ratings.length
      const starCount = ratings.filter((r) => r === starValue).length
      return totalRatings ? (starCount / totalRatings) * 100 : 0
    },
    calculateRatingCount(ratings, starValue) {
      return ratings.filter((r) => r === starValue).length
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

      try {
        const response = await axios.get(
          `${apiURL}stats/teamStats/${localStorage.getItem('currentCompany')}`,
          config
        )
        this.teamStats = response.data.data

        // Update chart data if values are present
        if (this.teamStats.averageNumMembers > 0) {
          this.averageTeamMembersChartData.datasets[0].data = [this.teamStats.averageNumMembers]
        }
        if (this.teamStats.averageNumJobsForTeam > 0) {
          this.averageJobsPerTeamChartData.datasets[0].data = [this.teamStats.averageNumJobsForTeam]
        }
      } catch (error) {
        console.error('Failed to fetch team stats:', error)
      }
    }
  }
}
</script>
