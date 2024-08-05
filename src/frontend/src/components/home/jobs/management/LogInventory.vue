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
      <v-btn
        width="100%"
        class="d-flex justify-start"
        border="md"
        elevation="5"
        outlined
        @click="openInventoryDialog"
        v-bind="activatorProps"
      >
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
                  :width="30"
                ></v-text-field>

                <v-btn @click="deleteItem(index)">
                  <v-icon color="red" class="pt-4 pr-0 mr-0">{{ 'fa: fa-solid fa-trash' }}</v-icon>
                </v-btn>
                <v-btn @click="saveItem(index)">
                  <v-icon color="success" class="pt-4 pl-0 ml-0">{{
                    'fa: fa-solid fa-save'
                  }}</v-icon>
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
import { defineProps, ref } from 'vue'
import axios from 'axios'

const inventoryDialog = ref(false)
const inventory = ref([{ name: '', quantity: 0 }])

interface InventoryUsed {
  inventoryItemId: string
  inventoryItemName: string
  quantityUsed: number
}

interface UpdateRecordedDetails {
  imagesTaken: string[]
  inventoryUsed: InventoryUsed[]
}

const props = defineProps<{ recordedDetails: UpdateRecordedDetails; jobID: string }>()

// const inventory = ref<{ inventoryItemId: string, inventoryItemName: string, quantityUsed: number }[]>(
//   props.jobInventory.map(inventory => ({
//     inventoryItemId: inventory.inventoryItemId,
//     inventoryItemName: inventory.inventoryItemName,
//     quantityUsed: inventory.quantityUsed
//   }))
// )

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const openInventoryDialog = () => {
  inventoryDialog.value = true
}

const addItem = () => {
  inventory.value.push({ name: '', quantity: 0 })
}

const deleteItem = (index: number) => {
  if (inventory.value[index].name.trim() !== '' && inventory.value[index].quantity > 0) {
  } else {
    inventory.value.splice(index, 1)
  }
}

const saveItem = (index: number) => {
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
}

const logInventoryItems = async () => {
  if (inventory.value.length < 0) {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Inventory item(s) cannot be empty',
      life: 3000
    })
    return
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()

  const updatedInventory = [
    ...inventory.value,
    {
      // this wrong update
      inventoryItemId: inventory.inventoryItemId,
      inventoryItemName: inventory.inventoryItemName,
      quantityUsed: inventory.quantityUsed
    }
  ]

  try {
    const response = await axios.patch(`${apiUrl}job/${props.id}`, updatedInventory, config)
    console.log(response)
  } catch (error) {
    console.log('Error while logging inventory', error)
  }
}

const showInventoryLogSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Successfully logged inventory',
    life: 3000
  })
}

const showInventoryLogError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'An error occurred while loggin the inventory item',
    life: 3000
  })
}
</script>

<style scoped></style>
