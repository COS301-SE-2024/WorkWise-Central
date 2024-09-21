<template>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-file-invoice-dollar mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Invoice Breakdown Summary -->
    <v-card-subtitle>Total Invoices: {{ totalInvoices }}</v-card-subtitle>

    <v-card-text>
      <div>
        <!-- Pie Chart for Paid vs Unpaid Invoices -->
        <p><strong>Paid vs Unpaid Invoices:</strong></p>
        <Chart type="pie" :data="paidVsUnpaidChartData" :options="chartOptions" height="300px" />

        <!-- Bar Chart for Revenue Per Month -->
        <div>
          <p><strong>Revenue Per Month:</strong></p>
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
            @change="fetchRevenueForMonth"
          ></v-select>
          <Chart type="bar" :data="revenueChartData" :options="chartOptions" height="300px" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Chart from 'primevue/chart'
import { ref } from 'vue'

export default {
  components: { Chart },
  data() {
    return {
      currentTab: 'Invoice Breakdown', // Example tab name
      totalInvoices: 120, // Example total invoices, replace with actual data
      selectedMonth: null, // Selected month for revenue breakdown
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
    // Replace the data below with actual paid vs unpaid invoice data
    this.paidVsUnpaidChartData = {
      labels: ['Paid', 'Unpaid'],
      datasets: [
        {
          data: [90, 30], // Example data: 90 paid, 30 unpaid invoices
          backgroundColor: ['#42A5F5', '#FF6384']
        }
      ]
    }

    // Fetch initial revenue data for the current month (replace with actual logic)
    this.fetchRevenueForMonth('January')
  },
  methods: {
    fetchRevenueForMonth(month) {
      // Example data fetching logic for revenue per month
      // Replace with actual data fetching logic based on `month`
      const revenueData = {
        January: [5000, 7000, 6000],
        February: [4500, 6000, 6500],
        March: [4000, 5500, 7000]
        // Add data for other months...
      }

      // Example data for revenue bar chart (replace with actual data)
      this.revenueChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3'], // Example weekly labels
        datasets: [
          {
            label: `Revenue for ${month}`,
            data: revenueData[month] || [0, 0, 0], // Example revenue data
            backgroundColor: '#36A2EB'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
