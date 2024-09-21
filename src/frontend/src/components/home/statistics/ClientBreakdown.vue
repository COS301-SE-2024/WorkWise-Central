<template>
  <v-card border="" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-briefcase mr-2"></v-icon>
      Client Breakdown
    </v-card-title>

    <!-- Total Clients Information -->
    <v-card-subtitle>Total Clients in the Company: {{ totalClients }}</v-card-subtitle>

    <!-- Search bar for v-data-table -->
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search Clients"
      class="mb-4"
      @keyup="applyFilter"
    />

    <v-card-text>
      <!-- Client Data Table -->
      <v-data-table
        :items="clientDetails"
        :headers="headers"
        class="bg-background"
        :search="search"
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
        <v-card-title>Client Breakdown for {{ selectedClient.name }}</v-card-title>
        <v-card-text>
          <p><strong>Number of Current Jobs:</strong> {{ selectedClient.currentJobs }}</p>
          <p><strong>Total Number of Jobs:</strong> {{ selectedClient.totalJobs }}</p>
          <p><strong>Average Rating:</strong> {{ selectedClient.averageRating }}</p>

          <!-- PrimeVue Chart.js for Ratings per Job -->
          <Chart type="bar" :data="jobRatingData" />

          <!-- PrimeVue Chart.js for Invoices (Paid on time vs not on time) -->
          <Chart type="pie" :data="invoiceData" />
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
      totalClients: 50, // Example data, replace with actual
      search: '',
      clientDetails: [], // Bind actual client data here
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
        {
          title: 'Email',
          value: 'contactInfo.email',
          key: 'contactInfo.email',
          class: 'h3'
        },
        {
          title: 'Address',
          value: 'address.street',
          key: 'address.street',
          class: 'h3'
        },
        { title: '', value: 'actions', key: 'actions', sortable: false, class: 'h3' }
      ],
      showStats: false,
      selectedClient: {},
      jobRatingData: {},
      invoiceData: {}
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
      axios
        .get(`${apiURL}client/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response.data)
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
    }
  },
  mounted() {
    this.getClients()
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
