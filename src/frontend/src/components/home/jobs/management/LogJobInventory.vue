<template>
  <form @submit.prevent="saveInventory" class="p-fluid">
    <div class="p-field">
      <AutoComplete
          v-model="newInventory.name"
          :suggestions="filteredInventoryOptions"
          @complete="filterInventory"
          field="name"
          placeholder="Select Inventory Item"
          class="mb-3 p-inputtext full-width"
          @change="validateForm"
      />
    </div>
    <div class="p-field">
      <InputNumber
          v-model="newInventory.quantity"
          placeholder="Quantity"
          :min="1"
          class="mb-3 p-inputnumber full-width"
          @input="validateForm"
      />
    </div>
    <Button
        type="submit"
        :label="isEditing ? 'Update Inventory' : 'Add Inventory'"
        icon="fa: fa-solid fa-plus"
        :disabled="!formValid"
        class="mb-3 p-button p-button-success"
    />
    <Button
        v-if="isEditing"
        type="button"
        label="Cancel"
        icon="fa: fa-solid fa-times"
        class="p-button p-button-secondary mb-3"
        @click="cancelEdit"
    />
  </form>

  <Divider />

  <DataTable :value="paginatedInventory" responsiveLayout="scroll" class="mb-3 p-datatable">
    <Column field="name" header="Item Name" class="p-column"></Column>
    <Column field="quantity" header="Quantity Used" class="p-column"></Column>
    <Column header="Action" class="p-column">
      <template #body="slotProps">
        <Button
            icon="fa: fa-solid fa-pencil"
            class="p-button-rounded p-button-warning mr-2"
            @click="editInventory(slotProps.index)"
        />
        <Button
            icon="fa: fa-solid fa-trash"
            class="p-button-rounded p-button-danger"
            @click="removeInventory(slotProps.index)"
        />
      </template>
    </Column>
  </DataTable>

  <Paginator
      v-model:first="first"
      :rows="itemsPerPage"
      :totalRecords="inventoryList.length"
      @page="onPageChange($event)"
      class="p-paginator"
  />

  <Button
      label="Log All Inventory"
      icon="fa: fa-solid fa-check"
      class="p-button p-button-success mt-3"
      :disabled="!inventoryList.length"
      @click="logInventory"
  />
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from 'vue'
import axios from 'axios'
import AutoComplete from 'primevue/autocomplete'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'

const props = defineProps<{ jobID: string }>()

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

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

const newInventory = ref<InventoryItem>({
  id: '',
  name: '',
  quantity: 1
})

const inventoryList = ref<InventoryItem[]>([])
const inventoryOptions = ref<InventoryItem[]>([])

const filteredInventoryOptions = ref<InventoryItem[]>([])

const formValid = ref(false)
const itemsPerPage = ref(5)
const first = ref(0)
const isEditing = ref(false)
const editingIndex = ref(-1)

const paginatedInventory = computed(() => {
  const start = first.value
  const end = Math.min(start + itemsPerPage.value, inventoryList.value.length)
  return inventoryList.value.slice(start, end)
})

// Fetch inventory data on component mount
onMounted(async () => {
  await fetchInventoryData()
})

async function fetchInventoryData() {
  try {
    const baseUrl = await getRequestUrl()
    const response = await axios.get(`${baseUrl}inventory/stockUsed/${props.jobID}`)
    inventoryOptions.value = response.data.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      quantity: item.currentStockLevel
    }))
  } catch (error) {
    console.error('Error fetching inventory data:', error)
  }
}

function validateForm() {
  formValid.value = newInventory.value.name !== '' && newInventory.value.quantity > 0
}

async function saveInventory() {
  try {
    const baseUrl = await getRequestUrl()
    if (isEditing.value) {
      // Update existing inventory item
      const changeInAmount = newInventory.value.quantity - inventoryList.value[editingIndex.value].quantity
      await axios.patch(`${baseUrl}inventory/updateStockUse`, {
        listOfUsedInventory: [{
          changeInAmount,
          inventoryId: newInventory.value.id
        }],
        currentEmployeeId: localStorage.getItem('employeeId'),
        jobId: props.jobID
      })
      inventoryList.value[editingIndex.value] = { ...newInventory.value }
      isEditing.value = false
    } else {
      // Add new inventory item
      await axios.patch(`${baseUrl}inventory/recordStockUse`, {
        listOfUsedInventory: [{
          amountUsed: newInventory.value.quantity,
          inventoryId: newInventory.value.id
        }],
        currentEmployeeId: localStorage.getItem('employeeId'),
        jobId: props.jobID
      })
      inventoryList.value.push({ ...newInventory.value })
    }
    resetForm()
  } catch (error) {
    console.error('Error saving inventory:', error)
  }
}

function editInventory(index: number) {
  const actualIndex = first.value + index
  const itemToEdit = inventoryList.value[actualIndex]
  newInventory.value = { ...itemToEdit }
  editingIndex.value = actualIndex
  isEditing.value = true
  validateForm()
}

async function removeInventory(index: number) {
  try {
    const actualIndex = first.value + index
    const itemToRemove = inventoryList.value[actualIndex]
    const baseUrl = await getRequestUrl()
    await axios.patch(`${baseUrl}inventory/updateStockUse`, {
      listOfUsedInventory: [{
        changeInAmount: -itemToRemove.quantity,
        inventoryId: itemToRemove.id
      }],
      currentEmployeeId: localStorage.getItem('employeeId'),
      jobId: props.jobID
    })
    inventoryList.value.splice(actualIndex, 1)
    if (paginatedInventory.value.length === 0 && first.value > 0) {
      first.value -= itemsPerPage.value
    }
  } catch (error) {
    console.error('Error removing inventory:', error)
  }
}

function cancelEdit() {
  resetForm()
}

function resetForm() {
  newInventory.value = { id: '', name: '', quantity: 1 }
  isEditing.value = false
  editingIndex.value = -1
  validateForm()
}

function onPageChange(event: any) {
  first.value = event.first
}

async function logInventory() {
  try {
    const baseUrl = await getRequestUrl()
    const updatePromises = inventoryList.value.map(item =>
        axios.patch(`${baseUrl}inventory/updateStockUse`, {
          listOfUsedInventory: [{
            changeInAmount: item.quantity,
            inventoryId: item.id
          }],
          currentEmployeeId: localStorage.getItem('employeeId'),
          jobId: props.jobID
        })
    )
    await Promise.all(updatePromises)
    console.log('Inventory Logged:', inventoryList.value)
    inventoryList.value = []
    first.value = 0
  } catch (error) {
    console.error('Error logging inventory:', error)
  }
}

function filterInventory(event: any) {
  const query = event.query.toLowerCase()
  filteredInventoryOptions.value = inventoryOptions.value.filter(option =>
      option.name.toLowerCase().includes(query)
  )
}
</script>

<style scoped>
.full-width {
  width: 100%;
}

.p-button {
  background-color: var(--v-primary-base);
  color: var(--v-buttonText);
}

.p-button-danger {
  background-color: var(--v-error-base);
}

.p-button-success {
  background-color: var(--v-success-base);
}
</style>