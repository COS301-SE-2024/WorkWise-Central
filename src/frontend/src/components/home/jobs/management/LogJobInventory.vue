<template>
  <v-form v-model="formValid" @submit.prevent="addInventory">
    <v-select
      v-model="newInventory.name"
      :items="inventoryOptions"
      label="Inventory Item Name"
      variant="solo"
      required
      @change="validateForm"
    ></v-select>

    <v-text-field
      v-model="newInventory.quantity"
      label="Quantity"
      type="number"
      min="1"
      required
      @input="validateForm"
    ></v-text-field>

    <v-btn
      :disabled="!formValid"
      color="primary"
      @click="addInventory"
    >
      Add Inventory
    </v-btn>
  </v-form>

  <v-divider class="my-4"></v-divider>

  <v-data-table
    :headers="tableHeaders"
    :items="paginatedInventory"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:[`item.actions`]="{ index }">
      <v-btn icon @click="removeInventory(index)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>

  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    :total-visible="5"
    class="mt-4"
  ></v-pagination>

  <v-btn
    :disabled="!inventoryList.length"
    color="success"
    class="mt-4"
    @click="logInventory"
  >
    Log All Inventory
  </v-btn>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

const props = defineProps<{ jobID: string }>();

interface InventoryItem {
  name: string;
  quantity: number;
}

const newInventory = ref<InventoryItem>({
  name: '',
  quantity: 1,
});

const inventoryList = ref<InventoryItem[]>([]);
const inventoryOptions = ref(['Item A', 'Item B', 'Item C']); // Replace with actual options

const formValid = ref(false);
const itemsPerPage = ref(5);
const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(inventoryList.value.length / itemsPerPage.value);
});

const paginatedInventory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return inventoryList.value.slice(start, end);
});

const tableHeaders = [
  { text: 'Item Name', value: 'name' },
  { text: 'Quantity Used', value: 'quantity' },
  { text: 'Action', value: 'actions', sortable: false },
];

function validateForm() {
  formValid.value = newInventory.value.name !== '' && newInventory.value.quantity > 0;
}

function addInventory() {
  const existingItem = inventoryList.value.find(
    (item) => item.name === newInventory.value.name
  );

  if (existingItem) {
    // If the item exists, increase the quantity
    existingItem.quantity += newInventory.value.quantity;
  } else {
    // If the item doesn't exist, add it to the list
    inventoryList.value.push({ ...newInventory.value });
  }

  // Reset the new inventory fields
  newInventory.value.name = '';
  newInventory.value.quantity = 1;
  validateForm();
}

function removeInventory(index: number) {
  inventoryList.value.splice(index, 1);
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
}

function logInventory() {
  console.log("Inventory Logged:", inventoryList.value);
  inventoryList.value = [];
  currentPage.value = 1;
}
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
.mt-4 {
  margin-top: 16px;
}
.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>