<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Inventory Stock Take</h1>
        </v-col>
        <v-col v-for="item in inventoryItems" :key="item.id" cols="12" md="6">
          <v-card>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>
              Current Stock: {{ item.stock }}
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
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      inventoryItems: [
        { id: 1, name: 'Item 1', stock: 10, updatedStock: 10 },
        { id: 2, name: 'Item 2', stock: 5, updatedStock: 5 }
        // Add more items as needed
      ]
    }
  },
  methods: {
    updateStock(item) {
      item.stock = item.updatedStock
      // Optionally, you can send the updated stock to your server here
      console.log(`Updated stock for ${item.name}: ${item.stock}`)
    }
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
