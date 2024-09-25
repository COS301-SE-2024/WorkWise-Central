<template>
  <v-card border="" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-briefcase mr-2"></v-icon>
      Client Breakdown
    </v-card-title>

    <!-- Total Clients Information -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Number of Clients: {{ totalClients }}</h5>
      </v-chip>
    </v-card-subtitle>

    <!-- Search bar for v-data-table -->
    <v-card-text>
      <v-text-field v-model="search" append-icon="mdi-magnify" variant="outlined" color="primary" label="Search Clients"
        class="mb-4" @keyup="applyFilter" />
      <!-- Client Data Table -->
      <v-data-table :items="clientDetails" :headers="headers" class="bg-background" :search="search"
        :row-props="getItemClass">
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
                <v-btn @click="showBreakdown(item)" :loading="isloading">
                  <v-icon icon="fa: fa-solid fa-chart-simple"></v-icon>
                  View Breakdown
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:[`item.firstName`]="{ item }">
          <v-chip :color="selectedClient === item ? 'success' : 'secondary'">{{ item.firstName }}</v-chip>
        </template>
      </v-data-table>

      <!-- Breakdown Section (Appears after clicking View Breakdown) -->
      <v-card v-if="
        showStats
      ">
        <v-card-title>Client Breakdown for {{ selectedClient.firstName }}</v-card-title>
        <v-card-text>
          <!-- Bar chart for number of jobs -->
          <v-container>
            <v-row><v-col cols="12" lg="6" v-if="!jobsData.data">
                <h5>Breakdown of the Jobs for {{ selectedClient.firstName }}</h5>
                <Chart type="pie" :data="jobsData"  @chart-click="onChartClick" />
              </v-col><v-col cols="12" lg="6" v-if="!invoiceData.data">
                <h5>Breakdown of the Invoices for {{ selectedClient.firstName }}</h5>
                <Chart type="pie" :data="invoiceData"  @chart-click="onChartClick" />
              </v-col></v-row></v-container>

          <!-- Customer Service Rating Section -->
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" v-if="totalRatings !== 0">
                <h5>Average Customer Service ratings given by {{ selectedClient.firstName }}</h5>
                <v-card class="d-flex flex-column mx-auto py-4" elevation="10" height="auto" width="360">
                  <div class="d-flex justify-center mt-auto text-h5">Customer Service Rating</div>
                  <div class="d-flex align-center flex-column my-auto">
                    <div class="text-h2 mt-5">
                      {{ overallCustomerRating }}
                      <span class="text-h6 ml-n3">/5</span>
                    </div>
                    <v-rating :model-value="overallRating" color="yellow-darken-3" half-increments></v-rating>
                    <div class="px-3">{{ totalRatings }} ratings</div>
                  </div>
                  <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                    <v-list-item v-for="(rating, i) in 5" :key="i">
                      <v-progress-linear :model-value="rating * ratingValueFactor" class="mx-n5" color="yellow-darken-3"
                        height="20" rounded></v-progress-linear>
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
              </v-col><v-col cols="12" lg="6" v-if="totalJobRatings !== 0">
                <h5>Average Job quality ratings given by {{ selectedClient.firstName }}</h5>
                <v-card class="d-flex flex-column mx-auto py-4" elevation="10" height="auto" width="360">
                  <div class="d-flex justify-center mt-auto text-h5">Job Quality Rating</div>
                  <div class="d-flex align-center flex-column my-auto">
                    <div class="text-h2 mt-5">
                      {{ overallRating }}
                      <span class="text-h6 ml-n3">/5</span>
                    </div>
                    <v-rating :model-value="overallRating" color="yellow-darken-3" half-increments></v-rating>
                    <div class="px-3">{{ totalRatings }} ratings</div>
                  </div>
                  <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                    <v-list-item v-for="(rating, i) in 5" :key="i">
                      <v-progress-linear :model-value="rating * ratingValueFactor" class="mx-n5" color="yellow-darken-3"
                        height="20" rounded></v-progress-linear>
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
              </v-col></v-row></v-container>
          <v-dialog v-model="dialog" max-width="500">
            <v-card>
              <v-card-title>{{ dialogTitle }}</v-card-title>
              <v-card-text>
                <ul>
                  <li v-for="(item, index) in dialogItems" :key="index">{{ item }}</li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      isloading: false,
      selectedItemId: '',
      search: '',
      clientStats: '',
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
      showStats: false,
      selectedClient: {},
      jobRatingData: {},
      invoiceData: {
        labels: ['Paid on time', 'Paid Late'],
        datasets: [
          {
            label: 'Payment time of Invoices',
            backgroundColor: ['#FFCE56', '#EF5350'],
            data: [] // Mock data: Current Jobs: 5, Total Jobs: 10
          }
        ]
      },
      overallRating: 0, // Mock overall rating value
      overallCustomerRating: 0,
      totalRatings: 150, // Mock total number of ratings
      totalJobRatings: 0,
      ratingCounts: [100, 30, 10, 5, 5], // Mock counts for 5-star, 4-star, 3-star, etc.
      ratingValueFactor: 2, // Factor for progress bar width calculation
      jobsData: {
        labels: ['Current Jobs', 'Total Jobs'],
        datasets: [
          {
            label: 'Job Breakdown',
            backgroundColor: ['#42A5F5', '#66BB6A'],
            data: [] // Mock data: Current Jobs: 5, Total Jobs: 10
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
    async showBreakdown(client) {
      this.isloading = true
      this.selectedClient = client
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i] === this.selectedClient) {
          this.selectedItemId = this.clientIds[i]
        }
      }
      console.log('Deleting client' + this.selectedItemId)

      await this.getClientStats(this.selectedItemId)
      this.isloading = false
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
          console.log(response)
          this.totalClients = response.data.data
        })
        .catch((error) => {
          console.error('Failed to fetch clients:', error)
        })
    },
    selectItem(item) {
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i] === item) {
          this.selectedItemId = this.clientIds[i]
        }
      }
      console.log('Deleting client' + this.selectedItemId)
      console.log('Selected item:', this.selectedItem) // Corrected console.log
    },
    async getClientStats(id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      console.log(this.selectedClient)
      console.log
      axios
        .get(`${apiURL}stats/clientStats/${id}`, config)
        .then((response) => {
          this.clientStats = response.data.data
          console.log('Client stats response: ', response)

          // Update the jobsData chart
          this.jobsData = {
            labels: ['Active Jobs', 'Completed Jobs', 'Total Jobs'],
            datasets: [
              {
                label: 'Job Breakdown',
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
                data: [
                  this.clientStats.numActiveJobs,
                  this.clientStats.numCompletedJobs,
                  this.clientStats.numTotalJobs
                ]
              }
            ]
          }

          // Update the invoiceData chart
          this.invoiceData = {
            labels: ['Paid On Time', 'Unpaid Invoices'],
            datasets: [
              {
                label: 'Invoices',
                backgroundColor: ['#66BB6A', '#FF7043'],
                data: [this.clientStats.numInvoicesPaid, this.clientStats.numInvoicesUnpaid]
              }
            ]
          }

          // Update the customer service rating data
          this.overallCustomerRating = this.clientStats.customerServiceRatingAverage || 0
          this.totalRatings = this.clientStats.customerServiceRating.length || 0
          this.overallRating = this.clientStats.workPerformanceRatingAverage || 0
          // Update the rating counts (for 5-star, 4-star, etc.)
          this.ratingCounts = this.calculateRatingCounts(this.clientStats.customerServiceRating)

          // Similar updates can be done for the job performance rating if needed
          this.showStats = true
        })
        .catch((error) => {
          console.error('Failed to fetch clients:', error)
        })
    },

    calculateRatingCounts(ratingsArray) {
      // Calculate the number of 5-star, 4-star, etc. ratings from the customerServiceRating array
      const ratingCounts = [0, 0, 0, 0, 0] // Initialize counts for 5, 4, 3, 2, 1 stars

      ratingsArray.forEach((rating) => {
        if (rating >= 1 && rating <= 5) {
          ratingCounts[5 - rating]++
        }
      })

      return ratingCounts
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
          this.selectedClient = this.clientDetails[0]
          this.selectedItemId = this.clientIds[0]
          this.getClientStats(this.selectedItemId)
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
    onChartClick(type, index) {
      if (type === 'jobs') {
        if (index === 0) {
          // Show active jobs in dialog
          console.log('jkefh')
          this.dialogTitle = `Active Jobs for ${this.selectedClient.firstName}`
          this.dialogItems = this.clientStats.activeJobs
        } else if (index === 1) {
          // Show completed jobs in dialog
          this.dialogTitle = `Completed Jobs for ${this.selectedClient.firstName}`
          this.dialogItems = this.clientStats.completedJobs
        }
      } else if (type === 'invoices') {
        if (index === 0) {
          // Show paid invoices in dialog
          this.dialogTitle = `Paid Invoices for ${this.selectedClient.firstName}`
          this.dialogItems = this.clientStats.invoicesPaid
        } else if (index === 1) {
          // Show unpaid invoices in dialog
          this.dialogTitle = `Unpaid Invoices for ${this.selectedClient.firstName}`
          this.dialogItems = this.clientStats.invoicesUnpaid
        }
      }
      // Show the dialog
      this.dialog = true
    },
  },
  async mounted() {
    await this.getClients()
    await this.getStats()
  }
}
</script>

<style scoped>
.selected-client {
  background-color: #f0f8ff !important;
  /* Highlight color for selected client */
}
</style>
