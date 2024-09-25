<template>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-file-invoice-dollar mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Invoice Breakdown Summary -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Invoices: {{ invoiceStats.totalNumInvoices }}</h5>
      </v-chip>
    </v-card-subtitle>

    <v-card-text>
      <div>
        <!-- Pie Chart for Paid vs Unpaid Invoices -->
        <v-container><v-row><v-col cols="12" lg="6">
              <p><strong>Paid vs Unpaid Invoices:</strong></p>
              <Chart type="pie" :data="paidVsUnpaidChartData" height="300px" />
            </v-col><v-col cols="12" lg="6">
              <p><strong>Revenue Per Month:</strong></p>
              <Chart type="bar" :data="revenueChartData" :options="chartOptions" height="300px" />
            </v-col></v-row></v-container>


        <!-- Bar Chart for Revenue Per Month -->



      </div>
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
      currentTab: 'Invoice Breakdown', // Example tab name
      selectedMonth: null, // Selected month for revenue breakdown
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      invoiceStats: {
        totalNumInvoices: 0,
        numPaid: 0,
        paidInvoices: [],
        numUnpaid: 0,
        unpaidInvoices: [],
        revenue: 0
      },
      months: [
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
      paidVsUnpaidChartData: {}, // Data for pie chart (paid vs unpaid invoices)
      revenueChartData: {}, // Data for bar chart (revenue per month)
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      } // Chart options for customization
    }
  },
  mounted() {
    this.getInvoiceStats()
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
    fetchRevenueForMonth(month) {
      // Assuming invoiceStats is already populated with API data
      const monthlyRevenue = this.invoiceStats.revenue;

      // Extract the data for the chart
      const months = monthlyRevenue.map((entry) => entry.month);
      const numUnpaid = monthlyRevenue.map((entry) => entry.numUnpaid);

      // Update the chart with the data
      this.revenueChartData = {
        labels: months,
        datasets: [
          {
            label: 'Revenue',
            data: numUnpaid,
            backgroundColor: '#FF6384', // Example color, you can add more colors as needed
            borderColor: '#FF6384',
            borderWidth: 1
          }
        ]
      };
    },

    async getInvoiceStats() {
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
        .get(`${apiURL}stats/invoiceStats/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          this.invoiceStats = response.data.data
          console.log(this.invoiceStats)
          // Update the pie chart data with API response
          this.paidVsUnpaidChartData = {
            labels: ['Paid', 'Unpaid'],
            datasets: [
              {
                data: [this.invoiceStats.numPaid, this.invoiceStats.numUnpaid],
                backgroundColor: ['#42A5F5', '#FF6384']
              }
            ]
          }

          // Fetch initial revenue data for the current month (replace with actual logic)
          this.fetchRevenueForMonth('January')
        })
        .catch((error) => {
          console.error('Failed to fetch invoice stats:', error)
        })
    }
  }
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
