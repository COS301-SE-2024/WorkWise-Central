<template>
  <v-container>
    <!-- Invoice Summary Card -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Invoice Center</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
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
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <!-- Invoice Status Filter -->

    <!-- Client-Specific Invoice Table -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Client Invoices</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-container
          ><v-row
            ><v-col cols="12" lg="3">
              <v-btn @click="filterInvoices('all')" block variant="elevated">All</v-btn></v-col
            ><v-col cols="12" lg="3">
              <v-btn @click="filterInvoices('true')" block variant="elevated">Paid</v-btn></v-col
            >
            <v-col cols="12" lg="3"
              ><v-btn @click="filterInvoices('false')" block variant="elevated"
                >Unpaid</v-btn
              ></v-col
            >
            <v-col cols="12" lg="3">
              <v-btn @click="exportInvoices" block variant="elevated">Export Invoices</v-btn>
            </v-col></v-row
          ></v-container
        >
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredInvoices"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="item.status === 'false' ? 'green' : 'red'">{{ item.status }}</v-chip>
          </template>
          <template v-slot:[`item.total`]="{ item }"> R{{ item.total }} </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-spacer></v-spacer>
    <!-- Payment History Timeline -->
    <!-- <v-row class="justify-center align-center">
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
    </v-row> -->

    <!-- Revenue Chart -->
    <v-spacer></v-spacer>
    <v-card>
      <v-row class="justify-center align-center">
        <v-col cols="12" class="text-center">
          <h2>Revenue Chart</h2>
          <p>Description: A chart visualizing the paid and unpaid amounts over time.</p>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="createInvoice" block variant="text">Create New Invoice</v-btn>
        <v-btn @click="markAsPaid" block variant="text">Mark as Paid</v-btn>
        <v-btn @click="sendReminder" block variant="text">Send Payment Reminder</v-btn>
      </v-row>
      <v-row>
        <v-col>
          <div class="chart-container">
            <Chart type="bar" :data="data" :options="chartOptions" />
          </div>
        </v-col> </v-row
    ></v-card>

    <!-- Invoice Details Modal -->
    <v-dialog v-model="showInvoiceModal">
      <v-card class="bg-cardColor">
        <v-card-title>Invoice Details</v-card-title>
        <v-card-text>
          <p>Invoice #: {{ selectedInvoice.invoiceNumber }}</p>
          <p>Date: {{ selectedInvoice.creationDate }}</p>
          <p>Status: {{ selectedInvoice.paid }}</p>
          <p>Amount: {{ selectedInvoice.total }}</p>
          <!-- More details can be added here -->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showInvoiceModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Export and Reporting Tools -->

    <!-- Quick Action Buttons -->
  </v-container>
</template>

<script lang="ts">
import Chart from 'primevue/chart'
import axios from 'axios'

// Define interfaces
interface Invoice {
  _id: string
  invoiceNumber: string
  creationDate: string
  paymentDate: string
  total: number
  paid: boolean
  clientName: string
  jobTitle: string
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
      invoices: [] as any[],
      clients: [] as any[],
      payments: [] as any[],
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
      chartData2: {
        labels: ['January', 'February'], // Labels for the x-axis
        datasets: [
          {
            label: 'Invoices', // Label for the dataset
            data: [1500, 2500], // Data points for the dataset
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for the bars
            borderColor: 'rgba(75, 192, 192, 1)', // Border color for the bars
            borderWidth: 1 // Border width of the bars
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' // Position of the legend
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
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
            stacked: true // Enable stacking on the x-axis
          },
          y: {
            stacked: true, // Enable stacking on the y-axis
            beginAtZero: true // Start the y-axis at zero
          }
        }
      },
      invoiceAgingReport: [] as AgingReport[],
      currentEmployee: '',
      companyId: '',
      filteredInvoices: [] as any[],
      showInvoiceModal: false,
      selectedInvoice: {} as Partial<Invoice>,
      totalInvoices2: 0,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      invoiceItems: [] as Invoice[],
      totalPaid2: 0,
      totalUnpaid2: 0,
      headers: [
        { title: 'Invoice Number', value: 'invoiceNumber' },
        { title: 'Client Name', value: 'clientName' },
        { title: 'Paid', value: 'paid' },
        { title: 'Total', value: 'total' }
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
      this.filteredInvoices = this.invoices
      this.totalInvoices = this.invoices.length
      this.totalPaid = this.invoices.filter((invoice) => invoice.paid === 'true').length
      this.totalUnpaid = this.invoices.filter((invoice) => invoice.paid === 'false').length
    },
    filterInvoices(status: string) {
      if (status === 'all') {
        this.filteredInvoices = this.invoices
      } else {
        this.filteredInvoices = this.invoices.filter((invoice) => invoice.paid === status)
      }
    },
    getRowProps(index: any) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status >= 200 && res.status < 300
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async getRequests() {
      // Getting all the jobs for the company
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = await this.getRequestUrl()
      if (localStorage.getItem('currentCompany') !== null) {
        this.companyId = localStorage.getItem('currentCompany') as string
      }
      if (localStorage.getItem('employeeId') !== null) {
        this.currentEmployee = localStorage.getItem('employeeId') as string
      }
      await axios
        .get(`${url}invoice/all/detailed/${this.currentEmployee}`, config)
        .then((response) => {
          console.log('response: ', response)
          for (const invoice of response.data.data) {
            this.invoices.push({
              _id: invoice._id,
              invoiceNumber: invoice.invoiceNumber,
              creationDate: invoice.invoiceDate,
              paymentDate: invoice.paymentDate,
              total: invoice.total,
              paid: invoice.paid,
              clientName:
                invoice.clientId.details.firstName + ' ' + invoice.clientId.details.lastName,
              jobTitle: invoice.jobId.details.heading
            })
          }
          console.log('this.invoiceItems: ', this.invoiceItems)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    exportInvoices() {
      // Implement mock export functionality
      const exportedData = this.filteredInvoices.map((invoice) => ({
        InvoiceNumber: invoice.number,
        Date: invoice.date,
        Status: invoice.status,
        Amount: invoice.amount
      }))

      const blob = new Blob([JSON.stringify(exportedData)], { type: 'application/json' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'invoices.json'
      link.click()

      console.log('Exporting invoices...', exportedData)
    },
    createInvoice() {
      // Implement mock create invoice functionality
      const newInvoice = {
        id: this.invoices.length + 1,
        invoiceNumber: `INV-00${this.invoices.length + 1}`,
        clientName: 'New Client',
        status: 'unpaid',
        amount: Math.floor(Math.random() * 5000) + 500 // Random amount between 500 and 5000
      }

      this.invoices.push(newInvoice)
      this.filteredInvoices.push(newInvoice) // Update filtered list if not filtered
      console.log('Creating new invoice...', newInvoice)
    },
    markAsPaid() {
      // Implement mock mark as paid functionality
      const unpaidInvoice = this.invoices.find((invoice) => invoice.status === 'unpaid')
      if (unpaidInvoice) {
        unpaidInvoice.status = 'paid'
        this.filteredInvoices = this.filteredInvoices.filter(
          (invoice) => invoice._id !== unpaidInvoice.id
        ) // Refresh filtered list
        console.log('Marking invoice as paid...', unpaidInvoice)
      } else {
        console.log('No unpaid invoices to mark as paid.')
      }
    },
    sendReminder() {
      // Implement mock send reminder functionality
      const unpaidInvoices = this.invoices.filter((invoice) => invoice.status === 'unpaid')
      if (unpaidInvoices.length > 0) {
        unpaidInvoices.forEach((invoice) => {
          console.log(
            `Sending reminder for invoice: ${invoice.invoiceNumber} to ${invoice.clientName}`
          )
        })
      } else {
        console.log('No unpaid invoices to send reminders for.')
      }
    }
  },
  created() {
    this.initializeData()
  },
  mounted() {
    this.getRequests()
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
