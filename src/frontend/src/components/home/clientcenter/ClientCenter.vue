<template>
  <v-container>
    <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row>
          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-icon icon="fa: fa-solid fa-file-invoice"></v-icon>
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Company Invoices</v-label
            >
          </v-col>
          <v-col cols="12" lg="4" class="d-flex align-center">
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
          </v-col>
          <v-col cols="12" lg="4">
            <v-select v-model="selectedFilter" :items="filters" label="Filter Clients"></v-select>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredClients"
          item-value="id"
          class="bg-cardColor"
          :search="search"
          :row-props="getRowProps"
          :header-props="{ class: 'bg-secondRowColor h6' }"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="getStatusColor(item.status)">
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>

        <v-row class="mt-4">
          <v-col cols="12">
            <bar-chart :data="chartData"></bar-chart>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <v-btn @click="generatePDF">Generate PDF Report</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import jsPDF from 'jspdf'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'ClientInvoices',
  components: {
    BarChart: Bar
  },
  data() {
    return {
      selectedFilter: 'All',
      search: '',
      filters: ['All', 'Paid', 'Unpaid'],
      headers: [
        { title: 'Client Name', value: 'name' },
        { title: 'Invoice Number', value: 'invoiceNumber' },
        { title: 'Amount', value: 'amount' },
        { title: 'Status', value: 'status' },
        { title: 'Date', value: 'date' }
      ],
      clients: [
        {
          id: 1,
          name: 'Client A',
          invoiceNumber: 'INV-001',
          amount: 1000,
          status: 'Paid',
          date: '2023-08-15'
        },
        {
          id: 2,
          name: 'Client B',
          invoiceNumber: 'INV-002',
          amount: 500,
          status: 'Unpaid',
          date: '2023-08-16'
        }
        // Add more clients here...
      ]
    }
  },
  computed: {
    filteredClients() {
      if (this.selectedFilter === 'Paid') {
        return this.clients.filter((client) => client.status === 'Paid')
      } else if (this.selectedFilter === 'Unpaid') {
        return this.clients.filter((client) => client.status === 'Unpaid')
      } else {
        return this.clients
      }
    },
    chartData() {
      const paidCount = this.filteredClients.filter((client) => client.status === 'Paid').length
      const unpaidCount = this.filteredClients.filter((client) => client.status === 'Unpaid').length

      return {
        labels: ['Paid', 'Unpaid'],
        datasets: [
          {
            label: 'Invoices',
            data: [paidCount, unpaidCount],
            backgroundColor: ['#4caf50', '#f44336']
          }
        ]
      }
    }
  },
  methods: {
    getStatusColor(status) {
      return status === 'Paid' ? 'green' : 'red'
    },
    getRowProps(index) {
      return {
        class: index % 2 === 0 ? 'bg-secondRowColor' : ''
      }
    },
    generatePDF() {
      const doc = new jsPDF()
      const table = this.filteredClients.map((client) => [
        client.name,
        client.invoiceNumber,
        client.amount,
        client.status,
        client.date
      ])

      doc.text('Client Invoices Report', 10, 10)
      doc.autoTable({
        head: [this.headers.map((header) => header.title)],
        body: table,
        startY: 20
      })

      doc.save('client-invoices-report.pdf')
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
.bg-cardColor {
  background-color: #f5f5f5;
}

.bg-secondRowColor {
  background-color: #e0e0e0;
}

.text-headingTextColor {
  color: #333;
}
</style>
