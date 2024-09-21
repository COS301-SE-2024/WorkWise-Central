<template>
  <v-card border="md" rounded="md" height="auto">
    <v-card-title>
      <v-icon icon="fa: fa-solid fa-calendar-alt mr-2"></v-icon>
      {{ currentTab }}
    </v-card-title>

    <!-- Total Number of Items Display -->
    <v-card-subtitle>Total Number of Items: {{ totalItems }}</v-card-subtitle>

    <v-card-text>
      <!-- Doughnut Chart for Highest Usage Items -->
      <Chart
        type="doughnut"
        :data="highestUsageItemsChartData"
        :options="chartOptions"
        height="600px"
      />

      <!-- Bar Chart for Items to Reorder -->
      <Chart
        type="bar"
        :data="itemsToReorderChartData"
        :options="chartOptions"
        height="400px"
      />

      <!-- Bar Chart for Loss of Stock -->
      <Chart
        type="bar"
        :data="lossOfStockChartData"
        :options="chartOptions"
        height="400px"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Chart from 'primevue/chart';

export default {
  components: { Chart },
  data() {
    return {
      currentTab: 'Inventory Breakdown',
      totalItems: 500,
      highestUsageItemsChartData: {},
      itemsToReorder: [
        { id: 1, name: 'Item A' },
        { id: 2, name: 'Item B' },
      ],
      lossOfStock: [
        { id: 3, name: 'Item X', lostQuantity: 10 },
        { id: 4, name: 'Item Y', lostQuantity: 5 },
      ],
      itemsToReorderChartData: {},
      lossOfStockChartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    // Doughnut chart data for highest usage items
    this.highestUsageItemsChartData = {
      labels: ['Item 1', 'Item 2', 'Item 3'],
      datasets: [
        {
          data: [300, 250, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    // Bar chart data for items that need reordering
    this.itemsToReorderChartData = {
      labels: this.itemsToReorder.map(item => item.name),
      datasets: [
        {
          label: 'Items to Reorder',
          data: this.itemsToReorder.map(() => 1), // Dummy data, each item needs reordering
          backgroundColor: '#FFCE56',
        },
      ],
    };

    // Bar chart data for loss of stock
    this.lossOfStockChartData = {
      labels: this.lossOfStock.map(item => item.name),
      datasets: [
        {
          label: 'Lost Quantity',
          data: this.lossOfStock.map(item => item.lostQuantity),
          backgroundColor: '#36A2EB',
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
