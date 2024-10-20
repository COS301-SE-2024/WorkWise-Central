<template>
  <v-container fluid fill-height>
    <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
      <v-card-title class="d-flex align-center pe-2 text-h5 font-weight-regular" height="auto" width="100%">
        <v-row align="center" justify="space-between">
          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-icon icon="fa: fa-solid fa-boxes"></v-icon>
            <v-label class="ms-2 h2 font-family-Nunito text-headingTextColor" height="auto" width="auto">
              Inventory Movements
            </v-label>
          </v-col>

          <!-- Separate the Filter Toggle Button and the Generate PDF Button into different columns -->
          <v-col cols="12" lg="4" class="d-flex align-center justify-end">
            <!-- Add margin and spacing to ensure the buttons are well separated -->
            <v-btn icon @click="filtersVisible = !filtersVisible" class="me-3">
              <!-- Label before the arrow -->
              <span class="me-2">{{ filtersVisible ? 'Hide Filters' : 'Show Filters' }}</span>
              <v-icon>{{ filtersVisible ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" lg="4" class="d-flex align-center justify-end">
            <v-btn variant="elevated" color="secondary" block :loading="isGenerating" @click="generatePDF()">
              <v-icon color="white" icon="fa:fa-solid fa-file"></v-icon>
              Generate PDF
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-divider></v-divider>

      <!-- Filters Section (Collapsible) -->
      <v-expand-transition>
        <v-card-text v-if="filtersVisible">
          <v-row class="mb-3">
            <!-- Date Filters -->
            <v-col cols="12" lg="4">
              <v-text-field v-model="startDate" type="date" label="Start Date" color="primary" variant="outlined" flat hide-details="auto"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field v-model="endDate" type="date" label="End Date" color="primary" variant="outlined" flat hide-details="auto"></v-text-field>
            </v-col>

            <!-- Additional Filters -->
            <v-col cols="12" lg="4">
              <v-text-field v-model="filters.item" label="Item" color="primary" variant="outlined" flat hide-details="auto"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field v-model="filters.reason" label="Reason" color="primary" variant="outlined" flat hide-details="auto"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field v-model="filters.employee" label="Employee" color="primary" variant="outlined" flat hide-details="auto"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field v-model="filters.quantity" label="Quantity" type="number" color="primary" variant="outlined" flat hide-details="auto"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-expand-transition>

      <!-- Data Table -->
      <v-data-table
        :headers="stockMovementHeaders"
        :items="filteredStockMovements"
        :search="search"
        height="auto"
        class="bg-cardColor"
        :row-props="getRowProps"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { API_URL } from '@/main'

export default defineComponent({
  data() {
    return {
      activeTab: 0,
      isGenerating: false,
      filtersVisible: false, // Control visibility of filters
      stockMovementHeaders: [
        { title: 'Item', value: 'item' },
        { title: 'Reason', value: 'reason' },
        { title: 'Quantity', value: 'quantity' },
        { title: 'Employee', value: 'employee' },
        { title: 'Date', value: 'date' }
      ],
      stockMovements: [],
      startDate: '',
      endDate: '',
      filters: {
        item: '',
        reason: '',
        quantity: '',
        employee: ''
      },
      filteredStockMovements: []
    }
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF()
      this.isGenerating = true

      // Title
      doc.text(`${'Stock Movement Report'}`, 14, 20)

      // Define table columns and rows
      let tableColumns = ['Item', 'Reason', 'Quantity', 'Employee', 'Date']
      let tableRows = this.filteredStockMovements.map((item) => [
        item.item,
        item.reason,
        item.quantity,
        item.employee,
        item.date
      ])

      // AutoTable plugin for jsPDF
      autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
        startY: 30
      })

      // Save the PDF
      doc.save(`stock_movement_report.pdf`)
      this.isGenerating = false
    },
    applyFilters() {
      // Date filtering
      const start = this.startDate ? new Date(this.startDate).setHours(0, 0, 0, 0) : null
      const end = this.endDate ? new Date(this.endDate).setHours(23, 59, 59, 999) : null

      // Apply all filters
      this.filteredStockMovements = this.stockMovements.filter((item) => {
        const itemDate = new Date(item.date).getTime()

        // Check date range
        const dateInRange = (!start || itemDate >= start) && (!end || itemDate <= end)

        // Apply all field filters (case-insensitive)
        const matchesItem =
          !this.filters.item || item.item.toLowerCase().includes(this.filters.item.toLowerCase())
        const matchesReason =
          !this.filters.reason ||
          item.reason.toLowerCase().includes(this.filters.reason.toLowerCase())
        const matchesEmployee =
          !this.filters.employee ||
          item.employee.toLowerCase().includes(this.filters.employee.toLowerCase())
        const matchesQuantity = !this.filters.quantity || item.quantity == this.filters.quantity

        return dateInRange && matchesItem && matchesReason && matchesEmployee && matchesQuantity
      })
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', options)
    },
    async getRequests() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const response = await axios.get(
          `${API_URL}StockMovements/all/${localStorage.getItem('employeeId')}`,
          config
        )
        for (const item of response.data.data) {
          this.stockMovements.push({
            date: this.formatDate(item.movementDate),
            type: item.type,
            item: item.inventoryItem.nameOfItem,
            quantity: item.movement,
            employee: item.employee.displayName,
            reason: item.reason
          })
        }
        // Initialize filtered stock movements to show all by default
        this.filteredStockMovements = this.stockMovements
      } catch (error) {
        console.error(error)
      }
    }
  },
  watch: {
    // Watchers for filters
    startDate() {
      this.applyFilters()
    },
    endDate() {
      this.applyFilters()
    },
    filters: {
      deep: true,
      handler() {
        this.applyFilters()
      }
    }
  },
  mounted() {
    this.getRequests()
  }
})
</script>
