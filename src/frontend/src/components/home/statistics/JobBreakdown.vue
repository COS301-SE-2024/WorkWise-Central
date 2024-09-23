<template>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-clock mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Jobs Information -->
    <v-card-subtitle
      ><v-chip color="primary"
        ><h5>Total Jobs: {{ totalJobs }}</h5></v-chip
      ></v-card-subtitle
    >

    <!-- Job Categories Breakdown -->
    <v-card-text>
      <div>
        <strong>Active Jobs: {{ activeJobs.length }}</strong>

        <!-- Pie Chart for Active Jobs Breakdown -->
        <Chart type="pie" :data="activeJobsChartData" :options="chartOptions" height="300px" />

        <p><strong>Archived Jobs:</strong> {{ archivedJobs.length }}</p>

        <!-- Overall Rating Card -->
        <v-container>
          <v-row>
            <v-col
              ><v-card
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
            <v-col
              ><v-card
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
            </v-col></v-row
          ></v-container
        >

        <!-- Outstanding Invoices -->
        <p>
          <strong>Jobs with Outstanding Invoices:</strong> {{ jobsWithOutstandingInvoices.length }}
        </p>
      </div>

      <!-- Line Chart for Hours Worked -->
      <Chart type="line" :data="hoursWorkedChartData" :options="chartOptions" height="600px" />
    </v-card-text>
  </v-card>
</template>

<script>
import Chart from 'primevue/chart'

export default {
  components: { Chart },
  data() {
    return {
      currentTab: 'Job Breakdown', // Tab name
      totalJobs: 100, // Example total jobs
      activeJobs: [], // Array of active jobs
      archivedJobs: [], // Array of archived jobs
      jobsWithOutstandingInvoices: [], // Array of jobs with outstanding invoices

      // Chart data for active jobs
      activeJobsChartData: {
        labels: ['Currently Busy', 'Completed'],
        datasets: [
          {
            data: [], // Will be populated in mounted
            backgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      },

      // Overall rating
      overallRating: 3.5, // Example overall rating
      totalRatings: 3360, // Example total ratings count
      ratingValueFactor: 15, // Factor for progress bar values
      ratingCounts: [0, 224, 448, 672, 896], // Example counts for each star rating

      // Chart data for ratings
      ratingChartData: {
        labels: ['Work Rating', 'Customer Service Rating'],
        datasets: [
          {
            label: 'Ratings',
            data: [], // Will be populated in mounted
            backgroundColor: ['#4BC0C0', '#FFCE56']
          }
        ]
      },

      // Chart data for hours worked
      hoursWorkedChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Hours Worked',
            data: [120, 150, 180, 200, 170, 210],
            borderColor: '#42A5F5',
            fill: false
          }
        ]
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // Example data, replace with actual job data
    this.activeJobs = [
      { id: 1, name: 'Job A', status: 'busy' },
      { id: 2, name: 'Job B', status: 'completed' }
    ]

    const busyJobs = this.activeJobs.filter((job) => job.status === 'busy')
    const completedJobs = this.activeJobs.filter((job) => job.status === 'completed')

    this.archivedJobs = [{ id: 3, name: 'Job C' }]

    this.jobsWithOutstandingInvoices = [{ id: 4, name: 'Job D', invoiceStatus: 'outstanding' }]

    // Update active jobs chart data
    this.activeJobsChartData.datasets[0].data = [busyJobs.length, completedJobs.length]

    // Update rating chart data
    this.ratingChartData.datasets[0].data = [4.5, 4.7] // Example ratings, replace with actual data
  }
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
