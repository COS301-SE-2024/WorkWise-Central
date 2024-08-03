<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="activeTab" bg-color="secondary">
          <v-tab v-for="tab in header" :key="tab" @click="changeTab(tab)">{{ tab }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <!-- Stock Movement Report -->
          <v-tab-item v-if="currentTab === 'Stock Movement Report'">
            <v-card>
              <v-card-title>Stock Movement Report</v-card-title>
              <v-data-table
                :headers="stockMovementHeaders"
                :items="stockMovements"
                class="elevation-1 bg-cardColor"
                :header-props="{ class: 'bg-cardColor h6' }"
              />
            </v-card>
          </v-tab-item>

          <!-- Employee Activity Report -->

          <!-- Location-Based Inventory Report -->
          <v-tab-item v-if="currentTab === 'Location-Based Inventory Report'">
            <v-card>
              <v-card-title>Location-Based Inventory Report</v-card-title>
              <v-tabs v-model="locationTab" bg-color="background">
                <v-tab
                  v-for="location in locations"
                  :key="location"
                  @click="changeLocationTab(location)"
                  >{{ location }}</v-tab
                >
              </v-tabs>
              <v-tabs-items v-model="locationTab">
                <v-tab-item v-for="location in locations" :key="location">
                  <v-card v-if="locationName === location">
                    <v-card-title>{{ location }} Inventory Levels</v-card-title>
                    <v-list class="bg-cardColor">
                      <v-list-item v-for="item in getLocationItems(location)" :key="item.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                          <v-list-item-subtitle>Stock: {{ item.stock }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-tab-item>

          <!-- Inventory Forecast Report -->
          <v-tab-item v-if="currentTab === 'Inventory Forecast Report'">
            <v-card>
              <v-card-title>Inventory Usage Report</v-card-title>
              <v-data-table
                :items="forecastData"
                :items-per-page="5"
                content-tag="v-data-table"
                :headers="forecastHeaders"
                class="elevation-1 bg-cardColor"
              >
              </v-data-table>
              <Chart type="bar" :data="chartData" class="elevation-1 bg-cardColor" />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

import Chart from 'primevue/chart'

export default defineComponent({
  components: {
    Chart
  },
  data() {
    return {
      activeTab: 0,
      locationTab: null,
      locationName: 'Warehouse A',
      currentTab: 'Stock Movement Report',
      header: [
        'Stock Movement Report',

        'Location-Based Inventory Report',
        'Inventory Forecast Report'
      ],
      stockMovementHeaders: [
        { title: 'Date', value: 'date' },
        { title: 'Type', value: 'type' },
        { title: 'Item', value: 'item' },
        { title: 'Quantity', value: 'quantity' },
        { title: 'Employee', value: 'employee' },
        { title: 'Reason', value: 'reason' }
      ],
      stockMovements: [
        {
          date: '2024-07-01',
          type: 'Purchase',
          item: 'Item A',
          quantity: 50,
          employee: 'John Doe',
          reason: 'Restock'
        },
        {
          date: '2024-07-02',
          type: 'Sale',
          item: 'Item B',
          quantity: 20,
          employee: 'Jane Smith',
          reason: 'Customer Order'
        },
        {
          date: '2024-07-03',
          type: 'Adjustment',
          item: 'Item C',
          quantity: -5,
          employee: 'John Doe',
          reason: 'Damage'
        }
      ],
      employeeActivityHeaders: [
        { title: 'Employee', value: 'employee' },
        { title: 'Item Managed', value: 'item' },
        { title: 'Action', value: 'action' },
        { title: 'Date', value: 'date' }
      ],
      employeeActivities: [
        { employee: 'John Doe', item: 'Item A', action: 'Restock', date: '2024-07-01' },
        { employee: 'Jane Smith', item: 'Item B', action: 'Sale', date: '2024-07-02' },
        { employee: 'John Doe', item: 'Item C', action: 'Adjustment', date: '2024-07-03' }
      ],
      locations: ['Warehouse A', 'Warehouse B'],
      inventory: [
        { id: 1, name: 'Item A', stock: 100, location: 'Warehouse A' },
        { id: 2, name: 'Item B', stock: 50, location: 'Warehouse B' }
      ],
      forecastHeaders: [
        { title: 'Item', value: 'item' },
        { title: 'Predicted Demand', value: 'predictedDemand' },
        { title: 'Reorder Recommendation', value: 'reorderRecommendation' }
      ],
      forecastData: [
        { item: 'Item A', predictedDemand: 200, reorderRecommendation: 50 },
        { item: 'Item B', predictedDemand: 150, reorderRecommendation: 30 }
      ],
      chartData: {
        labels: [
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
        ],
        datasets: [
          {
            label: 'Start of the month stock levels for Item A',
            data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
            backgroundColor: '#42A5F5'
          },
          {
            label: 'End of the month stock levels for Item A',
            data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
            backgroundColor: '#66BB6A'
          }
        ]
      }
    }
  },
  methods: {
    getLocationItems(location) {
      return this.inventory.filter((item) => item.location === location)
    },
    changeTab(tab) {
      this.currentTab = tab
      console.log('Current tab:', tab)

      // Perform actions based on the selected tab
      if (tab === 0) {
        console.log('Stock Movement Report tab selected')
        this.currentTab = 'Stock Movement Report'
        // Add any specific actions you need to perform
      } else if (tab === 1) {
        console.log('Employee Activity Report tab selected')
        this.currentTab = 'Employee Activity Report'
        // Add any specific actions you need to perform
      } else if (tab === 2) {
        console.log('Location-Based Inventory Report tab selected')
        this.currentTab = 'Location-Based Inventory Report'
        // Add any specific actions you need to perform
      } else if (tab === 3) {
        console.log('Inventory Forecast Report tab selected')
        this.currentTab = 'Inventory Forecast Report'
        // Add any specific actions you need to perform
      }
    },
    changeLocationTab(location) {
      this.locationName = location
      console.log('Current location tab:', location)
    }
  }
})
</script>
