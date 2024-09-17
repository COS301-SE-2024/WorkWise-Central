<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1 class="text-xl font-semibold">Inventory Reports</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs-items v-model="activeTab">
          <!-- Stock Movement Report -->
          <v-tab-item v-if="currentTab === 'Stock Movement Report'">
            <v-card class="bg-cardColor">
              <v-card-title>Stock Movement Report</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="6"
                      ><v-btn
                        variant="elevated"
                        color="primary"
                        block
                        :loading="isGenerating"
                        @click="generatePDF('Stock Movement Report')"
                        ><v-icon color="secondary" icon="fa:fa-solid fa-file"></v-icon>Generate
                        PDF</v-btn
                      ></v-col
                    >
                    <v-col cols="12" lg="6"><LogStockMovement /></v-col></v-row
                ></v-container>
              </v-card-text>
              <v-data-table
                :headers="stockMovementHeaders"
                :items="stockMovements"
                class="elevation-1 bg-cardColor"
                :header-props="{ class: 'bg-cardColor h6' }"
              />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

import LogStockMovement from './LogStockMovement.vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default defineComponent({
  components: {
    LogStockMovement
  },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      activeTab: 0,
      isGenerating: false,
      locationTab: null,
      locationName: 'Warehouse A',
      currentInventoryItem: '',
      currentTab: 'Stock Movement Report',
      header: ['Stock Movement Report'],
      stockMovementHeaders: [
        { title: 'Item', value: 'item' },

        { title: 'Reason', value: 'reason' },
        { title: 'Quantity', value: 'quantity' },
        { title: 'Employee', value: 'employee' },
        { title: 'Date', value: 'date' }
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
          reason: 'Damage'
        },
        {
          date: '2024-07-03',
          type: 'Adjustment',
          item: 'Item C',
          quantity: -5,
          employee: 'John Doe',
          reason: 'Damage'
        },
        {
          date: '2024-07-04',
          type: 'Return',
          item: 'Item D',
          quantity: 10,
          employee: 'Alice Johnson',
          reason: 'Inventory Recount'
        },
        {
          date: '2024-07-05',
          type: 'Sale',
          item: 'Item E',
          quantity: 15,
          employee: 'Mark Brown',
          reason: 'Damage'
        },
        {
          date: '2024-07-06',
          type: 'Purchase',
          item: 'Item F',
          quantity: 100,
          employee: 'Emily Davis',
          reason: 'Bulk Order'
        },
        {
          date: '2024-07-07',
          type: 'Adjustment',
          item: 'Item G',
          quantity: -8,
          employee: 'Michael Wilson',
          reason: 'Inventory Recount'
        },
        {
          date: '2024-07-08',
          type: 'Sale',
          item: 'Item H',
          quantity: 30,
          employee: 'Sarah Miller',
          reason: 'Inventory Recount'
        },
        {
          date: '2024-07-09',
          type: 'Transfer',
          item: 'Item I',
          quantity: 25,
          employee: 'David Lee',
          reason: 'Warehouse Transfer'
        },
        {
          date: '2024-07-10',
          type: 'Purchase',
          item: 'Item J',
          quantity: 60,
          employee: 'Laura White',
          reason: 'Restock'
        },
        {
          date: '2024-07-11',
          type: 'Sale',
          item: 'Item K',
          quantity: 40,
          employee: 'James Harris',
          reason: 'Damage'
        },
        {
          date: '2024-07-12',
          type: 'Adjustment',
          item: 'Item L',
          quantity: -3,
          employee: 'Jessica Clark',
          reason: 'Damage'
        },
        {
          date: '2024-07-13',
          type: 'Return',
          item: 'Item M',
          quantity: 5,
          employee: 'Chris Martinez',
          reason: 'Supplier Return'
        },
        {
          date: '2024-07-14',
          type: 'Sale',
          item: 'Item N',
          quantity: 50,
          employee: 'Anna Thompson',
          reason: 'Damage'
        },
        {
          date: '2024-07-15',
          type: 'Purchase',
          item: 'Item O',
          quantity: 75,
          employee: 'Kevin Walker',
          reason: 'Bulk Order'
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
        { title: 'Month', value: 'month' },
        { title: 'Starting Stock', value: 'startingStock' },
        { title: 'Ending Stock', value: 'endingStock' },
        { title: 'Show Graph', value: 'showGraph' }
      ],
      forecastData: [
        { month: '2024-01', item: 'Pipes', startingStock: 200, endingStock: 180 },
        { month: '2024-01', item: 'Wires', startingStock: 150, endingStock: 120 },
        { month: '2024-02', item: 'Pipes', startingStock: 180, endingStock: 160 },
        { month: '2024-02', item: 'Wires', startingStock: 120, endingStock: 90 },
        { month: '2024-03', item: 'Pipes', startingStock: 160, endingStock: 140 },
        { month: '2024-03', item: 'Wires', startingStock: 90, endingStock: 60 },
        { month: '2024-04', item: 'Pipes', startingStock: 140, endingStock: 130 },
        { month: '2024-04', item: 'Wires', startingStock: 60, endingStock: 50 },
        { month: '2024-05', item: 'Pipes', startingStock: 130, endingStock: 110 },
        { month: '2024-05', item: 'Wires', startingStock: 50, endingStock: 40 },
        { month: '2024-06', item: 'Pipes', startingStock: 110, endingStock: 100 },
        { month: '2024-06', item: 'Wires', startingStock: 40, endingStock: 30 },
        { month: '2024-07', item: 'Pipes', startingStock: 100, endingStock: 90 },
        { month: '2024-07', item: 'Wires', startingStock: 30, endingStock: 20 },
        { month: '2024-08', item: 'Pipes', startingStock: 90, endingStock: 80 },
        { month: '2024-08', item: 'Wires', startingStock: 20, endingStock: 15 },
        { month: '2024-09', item: 'Pipes', startingStock: 80, endingStock: 70 },
        { month: '2024-09', item: 'Wires', startingStock: 15, endingStock: 10 },
        { month: '2024-10', item: 'Pipes', startingStock: 70, endingStock: 60 },
        { month: '2024-10', item: 'Wires', startingStock: 10, endingStock: 5 },
        { month: '2024-11', item: 'Pipes', startingStock: 60, endingStock: 50 },
        { month: '2024-11', item: 'Wires', startingStock: 5, endingStock: 0 },
        { month: '2024-12', item: 'Pipes', startingStock: 50, endingStock: 40 },
        { month: '2024-12', item: 'Wires', startingStock: 0, endingStock: 0 }
      ],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Start of the month stock levels for ' + this.currentInventoryItem,
            data: [],
            backgroundColor: '#42A5F5'
          },
          {
            label: 'End of the month stock levels for ' + this.currentInventoryItem,
            data: [],
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
    generatePDF(reportType) {
      const doc = new jsPDF()
      this.isGenerating = true
      // Title
      doc.text(`${reportType}`, 14, 20)

      // Define table columns and rows based on report type
      let tableColumns = []
      let tableRows = []

      if (reportType === 'Stock Movement Report') {
        tableColumns = ['Item', 'Reason', 'Quantity', 'Employee', 'Date']
        tableRows = this.stockMovements.map((item) => [
          item.item,
          item.reason,
          item.quantity,
          item.employee,
          item.date
        ])
      } else if (reportType === 'Location-Based Inventory Report') {
        tableColumns = ['Item', 'Stock', 'Location']
        tableRows = this.inventory.map((item) => [item.name, item.stock, item.location])
      } else if (reportType === 'Inventory Forecast Report') {
        tableColumns = ['Item', 'Month', 'Starting Stock', 'Ending Stock']
        tableRows = this.forecastData.map((item) => [
          item.item,
          item.month,
          item.startingStock,
          item.endingStock
        ])
      }

      // AutoTable plugin for jsPDF to generate tables
      autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
        startY: 30
      })

      // Save the PDF
      doc.save(`${reportType.toLowerCase().replace(/ /g, '_')}_report.pdf`)
      this.isGenerating = false
    },
    changeLocationTab(location) {
      this.locationName = location
      console.log('Current location tab:', location)
    },
    setGraphWithCorrectData(item) {
      this.currentInventoryItem = item.item // Update the item name

      // Filter the forecast data for the selected item
      const filteredData = this.forecastData.filter((data) => data.item === item.item)

      // Extract the starting and ending stock levels for the selected item
      const startingStock = filteredData.map((data) => data.startingStock)
      const endingStock = filteredData.map((data) => data.endingStock)
      const months = filteredData.map((data) => data.month) // Extract the months

      // Update the chart data
      this.chartData = {
        labels: months, // Set the months as labels
        datasets: [
          {
            label: 'Start of the month stock levels for ' + this.currentInventoryItem,
            data: startingStock, // Set the starting stock levels
            backgroundColor: '#42A5F5'
          },
          {
            label: 'End of the month stock levels for ' + this.currentInventoryItem,
            data: endingStock, // Set the ending stock levels
            backgroundColor: '#66BB6A'
          }
        ]
      }
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
    async getStockMovements() {
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
          `${apiURL}StockMovements/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        this.stockMovements = response.data.data
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getStockMovements()
  }
})
</script>
