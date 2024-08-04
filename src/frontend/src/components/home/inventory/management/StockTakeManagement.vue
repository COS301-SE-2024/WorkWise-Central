<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Inventory Stock Take</h1>
      </v-col>
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
    updateStock(item) {
      item.stock = item.updatedStock
      // Optionally, you can send the updated stock to your server here
      console.log(`Updated stock for ${item.name}: ${item.stock}`)
    },
    getInventoryItems() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const url = this.getRequestUrl()
      axios
        .get(`${url}/inventory/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response)
          this.inventoryItems = response.data
        })
        .catch((error) => {
          console.error(error)
        })
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
