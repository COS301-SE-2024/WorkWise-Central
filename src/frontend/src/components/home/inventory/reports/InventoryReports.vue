<template>
  <v-container fluid fill-height>
    <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row align="center" justify="space-between">
          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-icon icon="fa: fa-solid fa-boxes"></v-icon>
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
            >
              Inventory Movements
            </v-label>
          </v-col>

          <!-- <v-col cols="12" lg="4" class="d-flex align-center">
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              color="primary"
              width="100%"
              hide-details="auto"
              single-line
            ></v-text-field>
          </v-col> -->

          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-btn
              variant="elevated"
              color="secondary"
              block
              :loading="isGenerating"
              @click="generatePDF()"
            >
              <v-icon color="white" icon="fa:fa-solid fa-file"></v-icon>
              Generate PDF
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-row class="mb-3">
          <v-col cols="12" lg="4">
            <v-text-field
              v-model="startDate"
              type="date"
              label="Start Date"
              color="primary"
              variant="outlined"
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-text-field
              v-model="endDate"
              type="date"
              label="End Date"
              color="primary"
              variant="outlined"
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-btn
              variant="elevated"
              color="primary"
              block
              @click="filterByDateRange"
              style="color: white !important"
            >
              <v-icon color="white" icon="mdi-calendar-range"></v-icon>
              Filter
            </v-btn>
          </v-col>
        </v-row>

        <v-data-table
          :headers="stockMovementHeaders"
          :items="filteredStockMovements"
          :search="search"
          height="auto"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
        </v-data-table>
      </v-card-text>
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
      filteredStockMovements: []
    }
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF()
      this.isGenerating = true
      // Title
      doc.text(`${'Stock Movement Report'}`, 14, 20)

      // Define table columns and rows based on report type
      let tableColumns = []
      let tableRows = []

      tableColumns = ['Item', 'Reason', 'Quantity', 'Employee', 'Date']
      tableRows = this.filteredStockMovements.map((item) => [
        item.item,
        item.reason,
        item.quantity,
        item.employee,
        item.date
      ])

      // AutoTable plugin for jsPDF to generate tables
      autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
        startY: 30
      })

      // Save the PDF
      doc.save(`stock_movement_report.pdf`)
      this.isGenerating = false
    },
    filterByDateRange() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate)
        const end = new Date(this.endDate)
        this.filteredStockMovements = this.stockMovements.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= start && itemDate <= end
        })
      } else {
        // If no dates are selected, show all stock movements
        this.filteredStockMovements = this.stockMovements
      }
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
  mounted() {
    this.getRequests()
  }
})
</script>
