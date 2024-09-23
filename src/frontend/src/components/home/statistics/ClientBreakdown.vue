<template>
  <v-card border="" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-briefcase mr-2"></v-icon>
      Client Breakdown
    </v-card-title>

    <!-- Total Clients Information -->
    <v-card-subtitle>
      <v-chip color="primary"
        ><h5>Total Number of Clients: {{ totalClients }}</h5></v-chip
      >
    </v-card-subtitle>

    <!-- Search bar for v-data-table -->
    <v-card-text>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        variant="outlined"
        color="primary"
        label="Search Clients"
        class="mb-4"
        @keyup="applyFilter"
      />
      <!-- Client Data Table -->
      <v-data-table
        :items="clientDetails"
        :headers="headers"
        class="bg-background"
        :search="search"
        :item-class="getItemClass"
      >
        <!-- Actions Column -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn rounded="xl" variant="plain" v-bind="props">
                <v-icon color="primary">mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
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

      <!-- Breakdown Section (Appears after clicking View Breakdown) -->
      <v-card v-if="showStats">
        <v-card-title>Client Breakdown for {{ selectedClient.firstName }}</v-card-title>
        <v-card-text>
          <!-- Bar chart for number of jobs -->
          <v-container
            ><v-row
              ><v-col cols="12" lg="6">
                <Chart
                  type="pie"
                  :data="jobsData"
                  :options="jobsChartOptions"
                  @chart-click="onChartClick" /></v-col
              ><v-col cols="12" lg="6"
                ><Chart
                  type="pie"
                  :data="invoiceData"
                  :options="invoiceChartOptions"
                  @chart-click="onChartClick" /></v-col></v-row
          ></v-container>

          <!-- Customer Service Rating Section -->
          <v-container
            ><v-row
              ><v-col cols="12" lg="6"
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
                  <v-list
                    bg-color="transparent"
                    class="d-flex flex-column-reverse"
                    density="compact"
                  >
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
                </v-card></v-col
              ><v-col cols="12" lg="6">
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
                  <v-list
                    bg-color="transparent"
                    class="d-flex flex-column-reverse"
                    density="compact"
                  >
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
                </v-card></v-col
              ></v-row
            ></v-container
          >
        </v-card-text>
      </v-card>
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
      totalClients: 0, // Example data, replace with actual
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      search: '',
      clientDetails: [], // Bind actual client data here
      clientIds: [],
      filteredClientDetails: [],
      clients: [],
      headers: [
        {
          title: 'First Name',
          align: 'start',
          sortable: true,
          value: 'firstName',
          key: 'firstName',
          class: 'text-h3'
        },
        {
          title: 'Surname',
          align: 'start',
          sortable: true,
          value: 'lastName',
          key: 'lastName',
          class: 'h3'
        },
        {
          title: 'Phone',
          value: 'contactInfo.phoneNumber',
          key: 'contactInfo.phoneNumber',
          class: 'h3'
        },
        { title: 'Email', value: 'contactInfo.email', key: 'contactInfo.email', class: 'h3' },
        { title: 'Address', value: 'address.street', key: 'address.street', class: 'h3' },
        { title: '', value: 'actions', key: 'actions', sortable: false, class: 'h3' }
      ],
      showStats: true,
      selectedClient: {},
      jobRatingData: {},
      invoiceData: {
        labels: ['Paid on time', 'Paid Late'],
        datasets: [
          {
            label: 'Payment time of Invoices',
            backgroundColor: ['#FFCE56', '#EF5350'],
            data: [5, 10] // Mock data: Current Jobs: 5, Total Jobs: 10
          }
        ]
      },
      overallRating: 4.2, // Mock overall rating value
      totalRatings: 150, // Mock total number of ratings
      ratingCounts: [100, 30, 10, 5, 5], // Mock counts for 5-star, 4-star, 3-star, etc.
      ratingValueFactor: 2, // Factor for progress bar width calculation
      jobsData: {
        labels: ['Current Jobs', 'Total Jobs'],
        datasets: [
          {
            label: 'Job Breakdown',
            backgroundColor: ['#42A5F5', '#66BB6A'],
            data: [5, 10] // Mock data: Current Jobs: 5, Total Jobs: 10
          }
        ]
      },
      jobsChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 12
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            // Get the clicked dataset and index
            const datasetIndex = elements[0].datasetIndex
            const index = elements[0].index
            this.onChartClick('jobsData', datasetIndex, index)
          }
        }
      },
      jobRatingChartOptions: {
        responsive: true,
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex
            const index = elements[0].index
            this.onChartClick('jobRatingData', datasetIndex, index)
          }
        }
      },
      invoiceChartOptions: {
        responsive: true,
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex
            const index = elements[0].index
            this.onChartClick('invoiceData', datasetIndex, index)
          }
        }
      }
    }
  },
  methods: {
    applyFilter() {
      this.filteredClientDetails = this.clientDetails.filter((client) =>
        client.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    showBreakdown(client) {
      this.selectedClient = client
      this.showStats = true
      this.loadBreakdownData(client)
    },
    loadBreakdownData() {
      // Example job rating data, replace with actual logic
      this.jobRatingData = {
        labels: ['Job 1', 'Job 2', 'Job 3'],
        datasets: [
          {
            label: 'Ratings per Job',
            backgroundColor: '#42A5F5',
            data: [4, 5, 3]
          }
        ]
      }

      // Example invoice data, replace with actual logic
      this.invoiceData = {
        labels: ['Paid On Time', 'Paid Late'],
        datasets: [
          {
            label: 'Invoices',
            backgroundColor: ['#66BB6A', '#FF7043'],
            data: [80, 20] // Percentage of paid on time vs late
          }
        ]
      }
    },
    getItemClass(client) {
      // Returns the 'selected-client' class for the selected client
      return client === this.selectedClient ? 'selected-client' : ''
    },
    async getStats() {
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
        .get(`${apiURL}stats/numClients/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          this.totalClients = response.data.data
        })
        .catch((error) => {
          console.error('Failed to fetch clients:', error)
        })
    },
    async getClientStats() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
    },
    async getClients() {
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
        .get(`${apiURL}client/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response)
          this.clients = response.data.data
          console.log(this.clients)

          for (let i = 0; i < this.clients.length; i++) {
            this.clientIds[i] = this.clients[i]._id
            console.log(this.clientIds[i])
            this.clientDetails[i] = this.clients[i].details
            console.log(this.clientDetails[i])
          }
          console.log(this.clientDetails)
        })
        .catch((error) => {
          console.error('Failed to fetch clients:', error)
        })
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
    onChartClick(chartType, datasetIndex, index) {
      // Handle the chart click event based on chart type and the clicked item
      if (chartType === 'jobsData') {
        console.log(`Clicked on Job dataset: ${datasetIndex}, index: ${index}`)
        // You can trigger a modal or a detailed view for the clicked job
      } else if (chartType === 'jobRatingData') {
        console.log(`Clicked on Job Rating dataset: ${datasetIndex}, index: ${index}`)
        // Show job rating breakdown or other details
      } else if (chartType === 'invoiceData') {
        console.log(`Clicked on Invoice dataset: ${datasetIndex}, index: ${index}`)
        // Show invoice details, such as payment info
      }
    }
  },
  mounted() {
    this.getClients()
    this.getStats()
  }
}
</script>

<style scoped>
.selected-client {
  background-color: #f0f8ff !important; /* Highlight color for selected client */
}
</style>
