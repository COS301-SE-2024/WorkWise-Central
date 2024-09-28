<template>
  <Dialog
    v-model:visible="inventoryDialog"
    modal
    header="Log Inventory"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <div class="p-fluid">
      <div v-for="(item, index) in inventory" :key="index" class="p-field p-grid p-mb-2">
        <div class="p-col-12 p-md-5">
          <InputText v-model="item.name" placeholder="Item Name" />
        </div>
        <div class="p-col-12 p-md-3">
          <InputNumber v-model="item.quantity" placeholder="Quantity" :min="0" />
        </div>
        <div class="p-col-12 p-md-4">
          <Button icon="pi pi-trash" class="p-button-danger p-mr-2" @click="deleteItem(index)" />
          <Button icon="pi pi-save" class="p-button-success" @click="saveItem(index)" />
        </div>
      </div>
    </div>
    <Button label="Add Item" icon="pi pi-plus" @click="addItem" class="p-mt-3" />

    <template #footer>
      <Button label="Save All" icon="pi pi-check" @click="saveAllItems" autofocus />
      <Button label="Cancel" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
    </template>
  </Dialog>

  <Button
    label="Log Inventory"
    icon="pi pi-box"
    @click="openInventoryDialog"
    class="p-button-outlined"
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const toast = useToast()
const inventoryDialog = ref(false)
const inventory = ref<{ name: string; quantity: number }[]>([])

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

const closeDialog = () => {
  inventoryDialog.value = false
}

const addItem = () => {
  inventory.value.push({ name: '', quantity: 0 })
}

const deleteItem = (index: number) => {
  inventory.value.splice(index, 1)
}

const saveItem = (index: number) => {
  if (inventory.value[index].name.trim() !== '' && inventory.value[index].quantity > 0) {
    inventory.value[index].name = inventory.value[index].name.trim()
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Item saved successfully',
      life: 3000
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please provide valid item details',
      life: 3000
    })
  }
}

const saveAllItems = async () => {
  if (inventory.value.length === 0) {
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

  const updatedInventory = inventory.value.map((item) => ({
    inventoryItemId: '', // Provide or retrieve this from somewhere
    inventoryItemName: item.name,
    quantityUsed: item.quantity
  }))

  try {
    const response = await axios.patch(`${apiUrl}job/${props.jobID}`, updatedInventory, config)
    console.log(response)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully logged inventory',
      life: 3000
    })
    closeDialog()
  } catch (error) {
    console.error('Error while logging inventory', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while logging the inventory item',
      life: 3000
    })
  }
}
</script>

<style scoped>
.p-dialog-content {
  padding-bottom: 0;
}
</style>
