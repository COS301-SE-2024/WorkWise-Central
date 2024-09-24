To make the small cards completely red (with red backgrounds, borders, and text), you can adjust the
card's color and text styles. Here's an updated version of the component where the entire card,
including the text, appears red: vue Copy code
<template>
  <v-card border="md" rounded="md" height="auto">
    <!-- Items to Reorder Section -->
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-exclamation-circle mr-2" color="red"></v-icon>
      <strong style="color: red">Items to Reorder</strong>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <!-- Each item in a small red card -->
          <v-col cols="12" sm="6" md="4" v-for="item in itemsToReorder" :key="item.name">
            <v-card
              class="colourCard1"
              elevation="2"
              rounded="md"
              height="auto"
              color="red important"
            >
              <v-card-title class="colourCard2" colour="black">
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle>
                <strong>Stock Level: {{ item.stock }}</strong>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <!-- Original Content -->
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-calendar-alt mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Number of Items Display -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Number of Items: {{ inventoryStats.totalNumItems }}</h5>
      </v-chip>
    </v-card-subtitle>

    <v-card-text>
      <!-- Doughnut Chart for Highest Usage Items -->
      <v-container>
        <v-row>
          <v-col cols="12" lg="4">
            <p><strong>Highest Usage Items:</strong></p>
            <Chart
              type="doughnut"
              :data="highestUsageItemsChartData"
              :options="chartOptions"
              height="600px"
            />
          </v-col>

          <!-- Bar Chart for Loss of Stock -->
          <v-col cols="12" lg="4">
            <p><strong>Loss of Stock:</strong></p>
            <Chart type="pie" :data="lossOfStockChartData" :options="chartOptions" height="400px" />
          </v-col>
        </v-row>
      </v-container>
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
      currentTab: 'Inventory Breakdown',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      totalItems: 500,
      highestUsageItemsChartData: {},
      itemsToReorder: [
        { id: 1, name: 'Item A' },
        { id: 2, name: 'Item B' }
      ],
      lossOfStock: [
        { id: 3, name: 'Item X', lostQuantity: 10 },
        { id: 4, name: 'Item Y', lostQuantity: 5 }
      ],
      itemsToReorderChartData: {},
      lossOfStockChartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      inventoryStats: {}
    }
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
    async getInventoryStats() {
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
        .get(`${apiURL}stats/inventoryStats/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log('Inventory Stats: ', response)
          this.inventoryStats = response.data.data
        })
        .catch((error) => {
          console.error('Failed to fetch inventory stats:', error)
        })
    }
  },
  mounted() {
    this.getInventoryStats()
    // Doughnut chart data for highest usage items
    this.highestUsageItemsChartData = {
      labels: ['Item 1', 'Item 2', 'Item 3'],
      datasets: [
        {
          data: [300, 250, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    }

    // Bar chart data for items that need reordering
    this.itemsToReorderChartData = {
      labels: this.itemsToReorder.map((item) => item.name),
      datasets: [
        {
          label: 'Items to Reorder',
          data: this.itemsToReorder.map(() => 1), // Dummy data, each item needs reordering
          backgroundColor: '#FFCE56'
        }
      ]
    }

    // Bar chart data for loss of stock
    this.lossOfStockChartData = {
      labels: this.lossOfStock.map((item) => item.name),
      datasets: [
        {
          label: 'Lost Quantity',
          data: this.lossOfStock.map((item) => item.lostQuantity),
          backgroundColor: '#36A2EB'
        }
      ]
    }
  }
}
</script>

<style scoped>
.colourCard1 {
  background-color: rgb(255, 193, 193) !important;
  color:black;
}
.colourCard2 {
  background-color: rgb(255, 131, 131) !important;
  color:black;
}
</style>
