<template>
  <v-dialog
    v-model="inventoryDialog"
    max-width="600px"
    location="bottom"
    location-strategy="connected"
    opacity="0"
    origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn width="100%" class="d-flex justify-start" border="md" elevation="5" outlined @click="openInventoryDialog" v-bind="activatorProps">
        <v-icon left>
          {{ 'fa: fa-solid fa-box' }}
        </v-icon>
        Log Inventory
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Log Inventory
        </v-card-title>

        <v-card-text class="text-center">
          <div>
            <h5 class="pt-4">Log Inventory</h5>
            <v-container>
              <v-row
                v-for="(item, index) in inventory"
                :key="index"
                class="d-flex align-center mb-3"
              >
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

                <v-btn @click="deleteItem(index)">
                  <v-icon color="red" class="pt-4">{{ 'fa: fa-solid fa-trash' }}</v-icon>
                </v-btn>
                <v-btn @click="saveItem(index)">
                  <v-icon color="success" class="pt-4">{{ 'fa: fa-solid fa-save' }}</v-icon>
                </v-btn>
              </v-row>
              <v-btn color="success" @click="addItem">Add Item</v-btn>
            </v-container>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <v-btn @click="saveAllItems" color="success">Save All</v-btn>
          <v-btn @click="isActive.value = false" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inventoryDialog = ref(false)
const inventory = ref([{ name: '', quantity: 0 }])

const openInventoryDialog = () => {
  inventoryDialog.value = true
}

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

const saveAllItems = () => {
  inventoryDialog.value = false
  // logic to save all items
}
</script>

<style scoped></style>
