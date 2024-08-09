<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular hello"
        color="secondary"
        variant="elevated"
        v-bind="activatorProps"
        @click="openDialog"
      >
        <v-icon icon="fa:fa-solid fa-file" start color="primary" size="small"></v-icon>
        Generate Inventory Report
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">Inventory Report</v-card-title>
      <v-card-text>
        <p>Below is a comparison between the current stock levels and the expected stock levels.</p>
        <v-data-table
          :headers="headers"
          :items="reportData"
          item-value="name"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
          <template v-slot:[`item.stockDiff`]="{ item }">
            <span :class="item.stockDiff < 0 ? 'text-danger' : 'text-success'">
              {{ item.stockDiff }}
            </span>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="generatePDF">Download PDF</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
  props: {
    inventory: Array
  },
  data() {
    return {
      dialog: false,
      headers: [
        { title: 'Item', value: 'name' },
        { title: 'Current Stock', value: 'currentStock' },
        { title: 'Updated Stock', value: 'expectedStock' },
        { title: 'Difference', value: 'stockDiff' }
      ],
      reportData: []
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
      this.generateReport()
    },
    closeDialog() {
      this.dialog = false
    },
    generateReport() {
      // Example data, replace with real data

      // Calculate the difference
      this.reportData = this.inventory.map((item) => ({
        name: item.name,
        currentStock: item.currentStockLevel,
        expectedStock: item.updatedStock,
        stockDiff: item.updatedStock - item.currentStockLevel
      }))
    },
    generatePDF() {
      const doc = new jsPDF()

      // Title
      doc.text('Inventory Report', 14, 20)

      // Table Headers
      const tableColumn = ['Item', 'Current Stock', 'Expected Stock', 'Difference']
      const tableRows = []

      // Table Rows
      this.reportData.forEach((item) => {
        const rowData = [item.name, item.currentStock, item.expectedStock, item.stockDiff]
        tableRows.push(rowData)
      })

      // AutoTable plugin for jsPDF to generate tables
      autoTable(doc,{
        head: [tableColumn],
        body: tableRows,
        startY: 30
      })

      // Save the PDF
      doc.save('inventory_report.pdf')
    },
    getRowProps(index) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    }
  }
}
</script>

<style scoped>
.text-success {
  color: green;
}
.text-danger {
  color: red;
}
</style>
