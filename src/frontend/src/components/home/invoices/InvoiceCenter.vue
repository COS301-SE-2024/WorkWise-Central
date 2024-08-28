<template>
  <v-container>
    <!-- Invoice Summary Card -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Invoice Summary</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="currentInvoiceType" bg-color="secondary" dark>
          <v-tab v-for="tab in tabs" :key="tab.value" @click="changeTab(tab.value)">{{
            tab.text
          }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentInvoiceType">
          <v-tab-item v-for="tab in tabs" :key="tab.value" :value="tab.value">
            <v-card v-if="currentTab === tab.value">
              <v-card-title>{{ tab.title }}</v-card-title>
              <v-card-subtitle>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="6">
                     <Chart type="bar" :data="chartData" />
                    </v-col>
                    <v-col cols="12" lg="6">
                      <Chart :type="chartType" :data="chartData" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-subtitle>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>

    <!-- Invoice Status Filter -->

    <!-- Client-Specific Invoice Table -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Client Invoices</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="filterInvoices('all')">All</v-btn>
        <v-btn @click="filterInvoices('paid')">Paid</v-btn>
        <v-btn @click="filterInvoices('unpaid')">Unpaid</v-btn>
        <v-data-table
          :headers="headers"
          :items="filteredInvoices"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="item.status === 'paid' ? 'green' : 'red'" dark>{{
              item.status
            }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Payment History Timeline -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Payment History</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-timeline>
          <v-timeline-item v-for="(payment, index) in payments" :key="index">
            {{ payment.date }} - {{ payment.amount }} - {{ payment.invoiceNumber }}
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <!-- Revenue Chart -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2>Revenue Chart</h2>
        <p>Description: A chart visualizing the paid and unpaid amounts over time.</p>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="chart-container">
          <Chart type="bar" :data="data" :options="chartOptions" />
        </div>
      </v-col>
    </v-row>

    <!-- Invoice Details Modal -->
    <v-dialog v-model="showInvoiceModal">
      <v-card>
        <v-card-title>Invoice Details</v-card-title>
        <v-card-text>
          <p>Invoice #: {{ selectedInvoice.invoiceNumber }}</p>
          <p>Client: {{ selectedInvoice.clientName }}</p>
          <p>Status: {{ selectedInvoice.status }}</p>
          <p>Amount: {{ selectedInvoice.amount }}</p>
          <!-- More details can be added here -->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showInvoiceModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Export and Reporting Tools -->
    <v-row>
      <v-col>
        <v-btn @click="exportInvoices">Export Invoices</v-btn>
      </v-col>
    </v-row>

    <!-- Invoice Aging Report -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Invoice Aging Report</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="aging in invoiceAgingReport" :key="aging.daysOverdue">
                {{ aging.daysOverdue }} days overdue: {{ aging.count }} invoices
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Action Buttons -->
    <v-row>
      <v-btn @click="createInvoice">Create New Invoice</v-btn>
      <v-btn @click="markAsPaid">Mark as Paid</v-btn>
      <v-btn @click="sendReminder">Send Payment Reminder</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Chart from 'primevue/chart'

// Define interfaces
interface Invoice {
  id: number
  invoiceNumber: string
  clientName: string
  status: string
  amount: number
}

interface Client {
  id: number
  name: string
  totalInvoices: number
  totalPaid: number
  totalUnpaid: number
}

interface Payment {
  date: string
  amount: number
  invoiceNumber: string
}

interface AgingReport {
  daysOverdue: number
  count: number
}

export default {
  data() {
    return {
      invoices: [] as Invoice[],
      clients: [] as Client[],
      payments: [] as Payment[],
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Paid Amount',
            backgroundColor: '#42A5F5', // Blue color for paid
            borderColor: '#1E88E5',
            data: [50, 40, 60, 70, 55, 65, 50],
            stack: 'stack1'
          },
          {
            label: 'Unpaid Amount',
            backgroundColor: '#FF6384', // Red color for unpaid
            borderColor: '#FF6384',
            data: [15, 20, 20, 11, 10, 10, 10],
            stack: 'stack1'
          }
        ]
      },
      currentTab: 'totalInvoices',
      tabs: [
        {
          value: 'totalInvoices',
          text: 'Total Invoices',
          title: 'Total Invoices',
          subtitle: 'Total Invoices Subtitle'
        },
        {
          value: 'totalPaid',
          text: 'Total Paid',
          title: 'Total Paid',
          subtitle: 'Total Paid Subtitle'
        },
        {
          value: 'totalUnpaid',
          text: 'Total Unpaid',
          title: 'Total Unpaid',
          subtitle: 'Total Unpaid Subtitle'
        }
      ],
      currentInvoiceType: 'totalInvoices',
      totalInvoices: 100,
      totalPaid: 70,
      totalUnpaid: 30,
      chartType: 'pie',
      // Define chart options
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                let label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat().format(context.parsed.y)
                }
                return label
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      },
      invoiceAgingReport: [] as AgingReport[],
      filteredInvoices: [] as Invoice[],
      showInvoiceModal: false,
      selectedInvoice: {} as Partial<Invoice>,
      totalInvoices2: 0,
      totalPaid2: 0,
      totalUnpaid2: 0,
      headers: [
        { title: 'Invoice Number', value: 'invoiceNumber' },
        { title: 'Client Name', value: 'clientName' },
        { title: 'Status', value: 'status' },
        { title: 'Amount', value: 'amount' }
      ],
      chartData: {
        labels: ['Paid', 'Unpaid'],
        datasets: [
          {
            data: [1500, 2500],
            backgroundColor: ['#42A5F5', '#FF6384'],
            hoverBackgroundColor: ['#64B5F6', '#FF8A80']
          }
        ]
      }
    }
  },
  components: {
    Chart
  },
  methods: {
    changeTab(tab: string) {
      this.currentTab = tab
    },
    initializeData() {
      this.invoices = [
        { id: 1, invoiceNumber: 'INV-001', clientName: 'Client A', status: 'paid', amount: 1000 },
        { id: 2, invoiceNumber: 'INV-002', clientName: 'Client B', status: 'unpaid', amount: 2000 },
        { id: 3, invoiceNumber: 'INV-003', clientName: 'Client A', status: 'unpaid', amount: 1500 }
      ]

      this.clients = [
        { id: 1, name: 'Client A', totalInvoices: 2, totalPaid: 1, totalUnpaid: 1 },
        { id: 2, name: 'Client B', totalInvoices: 1, totalPaid: 0, totalUnpaid: 1 }
      ]

      this.payments = [
        { date: '2024-08-01', amount: 1000, invoiceNumber: 'INV-001' },
        { date: '2024-08-05', amount: 2000, invoiceNumber: 'INV-002' }
      ]

      this.chartOptions = {
        series: [1500, 2500],
        labels: ['Paid', 'Unpaid']
      }

      this.invoiceAgingReport = [
        { daysOverdue: 30, count: 2 },
        { daysOverdue: 60, count: 1 }
      ]

      this.filteredInvoices = this.invoices
      this.totalInvoices = this.invoices.length
      this.totalPaid = this.invoices.filter((invoice) => invoice.status === 'paid').length
      this.totalUnpaid = this.invoices.filter((invoice) => invoice.status === 'unpaid').length
    },
    filterInvoices(status: string) {
      if (status === 'all') {
        this.filteredInvoices = this.invoices
      } else {
        this.filteredInvoices = this.invoices.filter((invoice) => invoice.status === status)
      }
    },
    getRowProps(index: any) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    exportInvoices() {
      // Mock export functionality
      console.log('Exporting invoices...')
    },
    createInvoice() {
      // Mock create invoice functionality
      console.log('Creating new invoice...')
    },
    markAsPaid() {
      // Mock mark as paid functionality
      console.log('Marking invoice as paid...')
    },
    sendReminder() {
      // Mock send reminder functionality
      console.log('Sending payment reminder...')
    }
  },
  created() {
    this.initializeData()
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
