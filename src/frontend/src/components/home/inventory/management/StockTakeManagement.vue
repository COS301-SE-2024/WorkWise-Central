<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1 class="text-xl font-semibold">Stock Take Management</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="searchQuery" label="Search Inventory" clearable></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-select v-model="sortOrder" :items="sortOptions" label="Sort By" clearable></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-date-picker v-model="stockTakeDate" label="Stock Take Date"></v-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="saveStockTake" variant="outlined">Save Stock Take</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"> <GenerateReport :inventory="filteredInventoryItems" /></v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in filteredInventoryItems" :key="item._id" cols="12" md="6">
        <v-card>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            Current Stock: {{ item.currentStockLevel }}
            <v-text-field
              v-model="item.updatedStock"
              label="Update Stock"
              type="number"
              min="0"
            ></v-text-field>
            <v-btn @click="updateStock(item)" variant="outlined" :loading="isUpdating"
              >Update</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="generateAndSaveReport" variant="outlined">Generate and Save Report</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import GenerateReport from '../reports/GenerateReport.vue'
interface InventoryItem {
  _id: string
  name: string
  currentStockLevel: number
  updatedStock: number
}
export default {
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      inventoryItems: [] as InventoryItem[],
      isUpdating: false,
      searchQuery: '',
      sortOrder: '',
      stockTakeDate: new Date(),
      sortOptions: [
        { text: 'Name (A-Z)', value: 'name' },
        { text: 'Stock Level (Low to High)', value: 'stockAsc' },
        { text: 'Stock Level (High to Low)', value: 'stockDesc' }
      ]
    }
  },
  components: {
    GenerateReport
  },
  computed: {
    filteredInventoryItems() {
      let items = this.inventoryItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      if (this.sortOrder === 'name') {
        items = items.sort((a, b) => a.name.localeCompare(b.name))
      } else if (this.sortOrder === 'stockAsc') {
        items = items.sort((a, b) => a.currentStockLevel - b.currentStockLevel)
      } else if (this.sortOrder === 'stockDesc') {
        items = items.sort((a, b) => b.currentStockLevel - a.currentStockLevel)
      }
      return items
    }
  },
  methods: {
    async updateStock(item: InventoryItem) {
      this.isUpdating = true
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const data = {
        currentStockLevel: item.updatedStock,
        companyID: localStorage.getItem('currentCompany'),
        currentEmployee: localStorage.getItem('employeeId')
      }
      const apiURL = await this.getRequestUrl()
      try {
        await axios.patch(`${apiURL}inventory/${item._id}`, data, config).then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock updated successfully'
          })
          setTimeout(() => {
            this.isUpdating = false
            this.getInventoryItems()
          }, 3000)
        })
      } catch (error) {
        console.error(error)
        this.isUpdating = false
      }
    },
    async saveStockTake() {
      const stockTakeData = {
        date: this.stockTakeDate,
        inventoryItems: this.filteredInventoryItems,
        companyID: localStorage.getItem('currentCompany'),
        currentEmployee: localStorage.getItem('employeeId')
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        await axios.post(`${apiURL}stocktake`, stockTakeData, config).then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock take saved successfully'
          })
        })
      } catch (error) {
        console.error(error)
      }
    },
    async generateAndSaveReport() {
      // Generate the report and ask the user whether to update stock or keep as is
      const confirmed = confirm(
        'Do you want to update the stock on the system based on this report?'
      )
      if (confirmed) {
        for (const item of this.filteredInventoryItems) {
          await this.updateStock(item)
        }
      }
      // Generate and download the report
      // this.$refs.report.generateReport()
    },
    async getInventoryItems() {
      // Fetch inventory items from the backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployee: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}inventory/all/${localStorage.getItem('employeeId')}`,
          config
        )
        this.inventoryItems = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async isLocalAvailable(localUrl: string) {
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
    }
  },
  mounted() {
    this.getInventoryItems()
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
