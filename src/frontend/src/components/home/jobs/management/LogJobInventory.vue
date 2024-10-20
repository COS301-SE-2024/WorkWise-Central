<template>
  <v-form @submit.prevent="saveInventory" class="pa-4">
    <v-select
      v-model="newInventory.name"
      :items="inventoryOptions"
      item-title="name"
      item-value="name"
      label="Select Inventory Item"
      class="mb-3"
      @update:model-value="handleInventorySelection"
      variant="solo"
      color="primary"
      background-color="#f5f5f5"
    ></v-select>

    <v-text-field
      v-model.number="newInventory.quantity"
      label="Quantity"
      type="number"
      :min="1"
      class="mb-3"
      @input="validateForm"
    ></v-text-field>

    <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
        class="mb-3"
    ></v-progress-circular>

    <Button
      type="submit"
      :disabled="!formValid || isLoading"
      label="Add Inventory"
      icon="fa: fa-solid fa-plus"
      class="mb-3 p-button-success"
      v-if="!isEditing && !isLoading"
    />

    <Button
      type="submit"
      :disabled="!formValid || isLoading"
      label="Update Inventory"
      icon="fa: fa-solid fa-plus"
      class="mb-3 p-button-success"
      v-if="isEditing && !isLoading"
    />

    <Button
      v-if="isEditing && !isLoading"
      label="Cancel"
      icon="fa: fa-solid fa-times"
      class="mb-3 ml-2 p-button-danger"
      @click="cancelEdit"
    />
  </v-form>

  <v-divider></v-divider>

  <v-table class="left-align-table">
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Quantity Used</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in paginatedInventory" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>
          <v-btn
            color="warning"
            size="small"
            class="mr-2"
            @click="editInventory(index)"
            icon="fa: fa-solid fa-edit"
          >
          </v-btn>
          <v-dialog
              max-width="300px"
              location="bottom"
              location-strategy="connected"
              opacity="0"
              origin="top center"
          >
            <template v-slot:activator="{props: activatorProps}">
              <v-btn
                  color="error"
                  size="small"
                  class="mr-2"
                  v-bind="activatorProps"
                  icon="fa: fa-solid fa-trash"
              >
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-title class="headline">Warning</v-card-title>
                <v-card-text>Are you sure you want to delete this inventory item?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" @click="confirmDelete(index)">
                    <v-icon color="green darken-1">{{ 'fa: fa-solid fa-check' }}</v-icon>
                    Yes
                  </v-btn>
                  <v-btn color="red darken-1" @click="isActive.value = false">
                    <v-icon color="error">{{ 'fa: fa-solid fa-cancel' }}</v-icon>
                    No
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-pagination
    v-model="page"
    :length="Math.ceil(inventoryList.length / itemsPerPage)"
    @update:model-value="onPageChange"
    class="mt-3"
    color="primary"
  ></v-pagination>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Button from 'primevue/button'
import { API_URL } from '@/main'
import axios from 'axios'

interface InventoryItem {
  id: string
  name: string
  quantity: number
  inventoryUsedId: string
}

interface InventoryOption {
  id: string
  name: string
}

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const props = defineProps<{
  jobID: string
}>()

const newInventory = ref<InventoryItem>({
  id: '',
  name: '',
  quantity: 0,
  inventoryUsedId: ''
})

const inventoryList = ref<InventoryItem[]>([])
const inventoryOptions = ref<InventoryOption[]>([])
const formValid = ref(false)
const itemsPerPage = ref(5)
const page = ref(1)
const isEditing = ref(false)
const isLoading = ref(false)
const isDeleting = ref(false)
const editingIndex = ref(-1)

const paginatedInventory = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return inventoryList.value.slice(start, end)
})

const confirmDelete = (index: number) => {
  const actualIndex = (page.value - 1) * itemsPerPage.value + index
  isDeleting.value = true
  setTimeout(() => {
    inventoryList.value.splice(actualIndex, 1)
    isDeleting.value = false
  }, 1000)
  try {
    const itemToDelete = inventoryList.value[actualIndex]
    console.log('Deleting item:', itemToDelete)
    axios.delete(`${API_URL}inventory/stockUsed/${itemToDelete.inventoryUsedId}`, config)
  } catch (error) {
    console.error('Error deleting inventory:', error)
  }
}

async function fetchInventoryOptions() {
  try {
    const response = await axios.get(
      `${API_URL}inventory/all/${localStorage.getItem('employeeId')}`,
      config
    )
    inventoryOptions.value = response.data.data.map((item: any) => ({
      id: item._id,
      name: item.name
    }))
  } catch (error) {
    console.error('Error fetching inventory options:', error)
  }
}

async function fetchStockUsed() {
  try {
    const response = await axios.get(`${API_URL}inventory/stockUsed/${props.jobID}`, config)
    console.log('Stock use:', response)
    console.log(response.data.data)
    if (response.data.data.length > 0) {
      inventoryList.value = response.data.data.map((item: any) => ({
        id: item.inventoryId._id,
        name: item.inventoryId.name,
        quantity: item.amount,
        inventoryUsedId: item._id
      }))
    }
    console.log('Inventory list:', inventoryList.value)
  } catch (error) {
    console.error('Error fetching stock used:', error)
  }
}
function validateForm() {
  formValid.value = newInventory.value.id !== '' && newInventory.value.quantity > 0
}

function handleInventorySelection(value: string) {
  console.log('Selected value:', value)
  console.log('Inventory options:', inventoryOptions.value)

  const selectedInventory = inventoryOptions.value.find((inv) => inv.name === value)
  console.log('Selected inventory:', selectedInventory)

  if (selectedInventory) {
    newInventory.value.id = selectedInventory.id
    newInventory.value.name = selectedInventory.name
  }
  validateForm()
}

async function saveInventory() {
  isLoading.value = true
  try {
    if (isEditing.value) {
      const itemToEdit = inventoryList.value[editingIndex.value]
      console.log('Item to edit:', itemToEdit)
      const payload = {
        listOfUsedInventory: [
          {
            changeInAmount: newInventory.value.quantity,
            inventoryId: itemToEdit.id,
            inventoryUsedId: itemToEdit.inventoryUsedId
          }
        ],
        currentEmployeeId: localStorage.getItem('employeeId'),
        jobId: props.jobID,
        companyId: localStorage.getItem('currentCompany')
      }
      console.log('Updating stock use...', payload)
      await axios.post(`${API_URL}inventory/updateStockUse`, payload, config)
    } else {
      const payload = {
        listOfUsedInventory: [
          {
            amountUsed: newInventory.value.quantity,
            inventoryId: newInventory.value.id
          }
        ],
        currentEmployeeId: localStorage.getItem('employeeId'),
        jobId: props.jobID,
        companyId: localStorage.getItem('currentCompany')
      }
      console.log('Recording stock use...', payload)
      await axios.post(`${API_URL}inventory/recordStockUse`, payload, config)
    }

    await fetchStockUsed()
    resetForm()
  } catch (error) {
    console.error('Error saving inventory:', error)
  } finally {
    isLoading.value = false
  }
}

function editInventory(index: number) {
  const actualIndex = (page.value - 1) * itemsPerPage.value + index
  const itemToEdit = inventoryList.value[actualIndex]
  newInventory.value = { ...itemToEdit }
  editingIndex.value = actualIndex
  isEditing.value = true
  validateForm()
}

function cancelEdit() {
  resetForm()
}

function resetForm() {
  newInventory.value = { id: '', name: '', quantity: 1, inventoryUsedId: '' }
  isEditing.value = false
  editingIndex.value = -1
  validateForm()
}

function onPageChange(newPage: number) {
  page.value = newPage
}

onMounted(async () => {
  await fetchInventoryOptions()
  await fetchStockUsed()
  validateForm()
})
</script>

<style scoped>
.left-align-table th,
.left-align-table td {
  text-align: left;
}
</style>
