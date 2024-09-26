<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1 class="text-xl font-semibold">Inventory Movements</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs-items v-model="activeTab">
          <!-- Stock Movement Report -->
          <v-card class="bg-cardColor">
            <v-card-text>
              <v-container>
                <v-col>
                  <v-btn
                    variant="elevated"
                    color="primary"
                    block
                    :loading="isGenerating"
                    @click="generatePDF()"
                    ><v-icon color="secondary" icon="fa:fa-solid fa-file"></v-icon>Generate
                    PDF</v-btn
                  ></v-col
                >
              </v-container>
            </v-card-text>
            <v-data-table
              :headers="stockMovementHeaders"
              :items="stockMovements"
              class="elevation-1 bg-cardColor"
              :header-props="{ class: 'bg-cardColor h6' }"
            />
          </v-card>
        </v-tabs-items>
      </v-col>
    </v-row>
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
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      activeTab: 0,
      isGenerating: false,
      locationTab: null,
      currentInventoryItem: '',
      stockMovementHeaders: [
        { title: 'Item', value: 'item' },
        { title: 'Reason', value: 'reason' },
        { title: 'Quantity', value: 'quantity' },
        { title: 'Employee', value: 'employee' },
        { title: 'Date', value: 'date' }
      ],
      stockMovements: []
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
      tableRows = this.stockMovements.map((item) => [
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
      doc.save(`${reportType.toLowerCase().replace(/ /g, '_')}_report.pdf`)
      this.isGenerating = false
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    formatDate (dateString) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', options)
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
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
        console.log('response.data.data: ', response.data.data)
        for (const item of response.data.data) {
          console.log('item: ', item)
          this.stockMovements.push({
            date: this.formatDate(item.movementDate),
            type: item.type,
            item: item.inventoryItem.nameOfItem,
            quantity: item.movement,
            employee: item.employee.displayName,
            reason: item.reason
          })
        }
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
