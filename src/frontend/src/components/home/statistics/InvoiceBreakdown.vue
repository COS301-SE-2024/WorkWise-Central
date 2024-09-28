<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>Detailed Breakdown</v-card-title>
      <v-card-text>
        <v-list class="bg-cardColor">
          <v-col cols="12">
            <v-row>
              <!-- Active Jobs -->
              <v-col v-if="invoiceStats.paidInvoices.length > 0" cols="12" lg="6">
                <v-list-item-group>
                  <v-subheader>Paid Invoices</v-subheader>
                  <v-list-item
                    v-for="(job, index) in invoiceStats.paidInvoices"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="secondary"
                        >{{ job.invoiceNumber }}, R{{ job.total }}, {{ job.job.jobTitle }}</v-chip
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>

              <!-- All Jobs -->
              <v-col v-if="invoiceStats.unpaidInvoices.length > 0" cols="12" lg="5">
                <v-list-item-group>
                  <v-subheader>Unpaid Invoices</v-subheader>
                  <v-list-item
                    v-for="(job, index) in invoiceStats.unpaidInvoices"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="secondary"
                        >{{ job.invoiceNumber }}, R{{ job.total }}, {{ job.job.jobTitle }}</v-chip
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>

              <!-- Completed Jobs -->
              <v-col v-if="invoiceStats.revenue.length > 0" cols="12" lg="4">
                <v-list-item-group>
                  <v-subheader>Revenue</v-subheader>
                  <v-list-item
                    v-for="(job, index) in invoiceStats.revenue"
                    :key="index"
                    class="bg-cardColor"
                  >
                    <v-list-item-content>
                      <v-chip color="success">{{ job.month }},R{{ job.numUnpaid }}</v-chip>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-col>
            </v-row>
          </v-col>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" @click="dialog = false" block>
          <v-icon color="error">fa-solid fa-cancel</v-icon>Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-file-invoice-dollar mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>
    <v-btn @click="dialog = true">View Details</v-btn>
    <!-- Invoice Breakdown Summary -->
    <v-card-subtitle>
      <v-chip color="primary">
        <h5>Total Invoices: {{ invoiceStats.totalNumInvoices }}</h5>
      </v-chip>
    </v-card-subtitle>

    <v-card-text>
      <div>
        <!-- Conditionally Render Pie Chart for Paid vs Unpaid Invoices -->
        <v-container v-if="invoiceStats.numPaid || invoiceStats.numUnpaid">
          <v-row>
            <v-col cols="12" lg="6">
              <p><strong>Paid vs Unpaid Invoices:</strong></p>
              <Chart type="pie" :data="paidVsUnpaidChartData" height="300px" />
            </v-col>

            <!-- Conditionally Render Bar Chart for Revenue Per Month -->
            <v-col cols="12" lg="6" v-if="revenueChartHasData">
              <p><strong>Revenue Per Month:</strong></p>
              <Chart type="bar" :data="revenueChartData" :options="chartOptions" height="300px" />
            </v-col>
          </v-row>
        </v-container>
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
      currentTab: 'Invoice Breakdown',
      dialog: false,
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
      paidVsUnpaidChartData: {}, // Data for pie chart (paid vs unpaid invoices)
      revenueChartData: {}, // Data for bar chart (revenue per month)
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    // Computed property to check if revenue chart data has meaningful values
    revenueChartHasData() {
      return this.revenueChartData.datasets?.[0]?.data?.some((value) => value > 0)
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
      const monthlyRevenue = this.invoiceStats.revenue

      // Extract the data for the chart
      const months = monthlyRevenue.map((entry) => entry.month)
      const numUnpaid = monthlyRevenue.map((entry) => entry.numUnpaid)

      // Update the chart with the data
      this.revenueChartData = {
        labels: months,
        datasets: [
          {
            label: 'Revenue',
            data: numUnpaid,
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            borderWidth: 1
          }
        ]
      }
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

          // Fetch revenue data for all months (replace with actual logic if needed)
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
