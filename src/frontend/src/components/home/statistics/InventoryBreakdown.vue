<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>Detailed Breakdown</v-card-title>
      <v-card-text>
        <v-list class="bg-cardColor">
          <v-col cols="12">
            <v-row>
              <!-- Active Jobs -->
              <v-col v-if="inventoryStats.itemsToReorder.length > 0" cols="12" lg="4">
                <v-list-item-group>
                  <v-subheader>Items To Reorder</v-subheader>
                  <v-list-item
                    v-for="(job, index) in inventoryStats.itemsToReorder"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="warning">{{ job.itemName }}, {{ job.quantity }}</v-chip>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>

              <!-- All Jobs -->
              <v-col v-if="inventoryStats.itemUsage.length > 0" cols="12" lg="4">
                <v-list-item-group>
                  <v-subheader>Item Usage</v-subheader>
                  <v-list-item
                    v-for="(job, index) in inventoryStats.itemsToReorder"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="success">{{ job.itemName }}, {{ job.quantity }}</v-chip>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>

              <!-- Completed Jobs -->
              <v-col v-if="inventoryStats.stockLost.length > 0" cols="12" lg="4">
                <v-list-item-group>
                  <v-subheader>Stock Lost</v-subheader>
                  <v-list-item
                    v-for="(job, index) in inventoryStats.itemsToReorder"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="error">{{ job.itemName }}, {{ job.quantity }}</v-chip>
                    </v-list-item-content>
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
    <!-- Items to Reorder Section -->
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-exclamation-circle mr-2" color="red"></v-icon>
      <strong style="color: red">Items to Reorder</strong>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <!-- Each item in a small red card -->
          <v-col cols="12" sm="6" md="4" v-for="item in itemsToReorder" :key="item.inventoryId">
            <v-card
              class="colourCard1"
              elevation="2"
              rounded="md"
              height="auto"
              color="red important"
            >
              <v-card-title class="colourCard2" colour="black">
                {{ item.itemName }}
              </v-card-title>
              <v-card-subtitle>
                <strong>Stock Level: {{ item.quantity }}</strong>
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
    <v-btn @click="dialog = true">View Details</v-btn>
    <!-- Total Number of Items Display -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Number of Items: {{ inventoryStats.totalNumItems }}</h5>
      </v-chip>
    </v-card-subtitle>

    <v-card-text>
      <v-container>
        <v-row>
          <!-- Doughnut Chart for Highest Usage Items -->
          <v-col v-if="hasHighestUsageData" cols="12" lg="6">
            <p><strong>Highest Usage Items:</strong></p>
            <Chart
              type="doughnut"
              :data="highestUsageItemsChartData"
              :options="chartOptions"
              height="600px"
            />
          </v-col>

          <!-- Bar Chart for Loss of Stock -->
          <v-col v-if="hasLossOfStockData" cols="12" lg="6">
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
      totalItems: 0,

      itemsToReorder: [],
      itemUsage: [],
      stockLost: [],
      costDueToStockLoss: 0,
      dialog: false,

      // Doughnut chart data for highest usage items
      highestUsageItemsChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }
        ]
      },

      // Pie chart data for loss of stock
      lossOfStockChartData: {
        labels: [],
        datasets: [
          {
            label: 'Lost Quantity',
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },

      inventoryStats: {}
    }
  },
  computed: {
    hasHighestUsageData() {
      return this.itemUsage.length > 0 && this.itemUsage.some((item) => item.quantity > 0)
    },
    hasLossOfStockData() {
      return (
        this.stockLost.length > 0 && this.stockLost.some((item) => item.inventoryItem.quantity > 0)
      )
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
      axios
        .get(`${apiURL}stats/inventoryStats/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log('Inventory Stats: ', response)
          this.inventoryStats = response.data.data
          this.totalItems = this.inventoryStats.totalNumItems
          this.itemsToReorder = this.inventoryStats.itemsToReorder
          this.itemUsage = this.inventoryStats.itemUsage
          this.stockLost = this.inventoryStats.stockLost
          this.costDueToStockLoss = this.inventoryStats.costDueToStockLoss

          // Update chart data
          this.updateCharts()
        })
        .catch((error) => {
          console.error('Failed to fetch inventory stats:', error)
        })
    },
    updateCharts() {
      // Update Highest Usage Items Chart
      this.highestUsageItemsChartData.labels = this.itemUsage.map((item) => item.itemName)
      this.highestUsageItemsChartData.datasets[0].data = this.itemUsage.map((item) => item.quantity)

      // Ensure there are enough background colors for the highest usage items
      const itemCount = this.itemUsage.length
      this.highestUsageItemsChartData.datasets[0].backgroundColor = this.generateColors(
        itemCount,
        this.highestUsageItemsChartData.datasets[0].backgroundColor
      )

      // Update Loss of Stock Chart
      this.lossOfStockChartData.labels = this.stockLost.map((item) => item.inventoryItem.itemName)
      this.lossOfStockChartData.datasets[0].data = this.stockLost.map(
        (item) => item.inventoryItem.quantity
      )

      // Ensure there are enough background colors for the lost stock items
      const stockLostCount = this.stockLost.length
      this.lossOfStockChartData.datasets[0].backgroundColor = this.generateColors(
        stockLostCount,
        this.lossOfStockChartData.datasets[0].backgroundColor
      )
    },

    // Helper function to generate or add colors
    generateColors(count, existingColors = []) {
      const defaultColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
      const newColors = [...existingColors]

      // Add new random colors if there aren't enough
      while (newColors.length < count) {
        const newColor = this.getRandomColor()
        newColors.push(newColor)
      }

      return newColors
    },

    // Helper function to generate a random color
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  },
  async mounted() {
    await this.getInventoryStats()
  }
}
</script>

<style scoped>
.colourCard1 {
  background-color: rgb(255, 193, 193) !important;
  color: black;
}

.colourCard2 {
  background-color: rgb(255, 131, 131) !important;
  color: black;
}
</style>
