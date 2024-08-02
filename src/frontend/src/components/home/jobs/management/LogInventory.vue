<template>
  <div>
    <v-divider></v-divider>
    <h5 class="pt-4">Log Inventory</h5>
    <v-container>
      <v-row v-for="(item, index) in inventory" :key="index" class="d-flex align-center mb-3">
        <v-text-field
          v-model="item.name"
          label="Item Name"
          dense
          class="pt-4 pr-2"
          hide-details
          prepend-icon="fa: fa-solid fa-box"
        ></v-text-field>
        <v-text-field
          v-model="item.quantity"
          label="Quantity"
          dense
          class="pt-4"
          hide-details
        ></v-text-field>

        <v-btn icon @click="deleteItem(index)">
          <v-icon color="red" class="pt-4">{{ 'fa: fa-solid fa-trash' }}</v-icon>
        </v-btn>
        <v-btn icon @click="saveItem(index)">
          <v-icon color="success" class="pt-4">{{ 'fa: fa-solid fa-save' }}</v-icon>
        </v-btn>
      </v-row>
      <v-btn color="success" @click="addItem">Add Item</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// const props = defineProps(inventoryItems)

// inventory items should be populated by a passed in prop from the job assignment view
const inventory = ref([{ name: '', quantity: 0 }])

const addItem = () => {
  inventory.value.push({ name: '', quantity: 0 })
}

const deleteItem = (index: number) => {
  // if the item is readonly item name and quantity are readonly fields delete the item in the backend else just remove the item from the view
  if (inventory.value[index].name.trim() !== '' && inventory.value[index].quantity > 0) {
    // delete item in the backend
  } else {
    inventory.value.splice(index, 1)
  }
}

const saveItem = (index: number) => {
  // checks if both item name field and quantity fields are not empty else the item is not saved and display an error to the user using a toast
  if (inventory.value.length > 0) {
    if (inventory.value[index].name.trim() !== '' && inventory.value[index].quantity > 0) {
      inventory.value[index].name = inventory.value[index].name.trim()
      // textfield and quantity for the item become index readonly
      // post the list of inventory items to the backend
    } else {
      // display error toast
    }
  }
}
</script>

<style></style>
