<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1 class="text-xl font-semibold">Company Settings</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in inventoryItems" :key="item.id" cols="12" md="6">
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
            <v-btn @click="updateStock(item)">Update</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      inventoryItems: []
    }
  },
  methods: {
    async updateStock(item) {
      console.log(item._id)
      item.stock = item.updatedStock
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
        await axios.patch(`${apiURL}inventory/${item._id}`, data, config)
      } catch (error) {
        console.error(error)
      }
      // Optionally, you can send the updated stock to your server here
      console.log(`Updated stock for ${item.name}: ${item.stock}`)
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
        const response = await axios.get(`${apiURL}inventory/all`, config)
        console.log(response.data.data)
        this.inventoryItems = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
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
