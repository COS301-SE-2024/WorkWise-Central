<template>
  <v-btn @click="inventorySection = true">Log Inventory</v-btn>
  <v-dialog v-model="inventorySection" max-width="700px">
    <v-card class="text-center">
      <v-card-title>Log Inventory Used in the Job</v-card-title>
      <v-card-text>
        <label class="pb-2">Add or Edit Inventory Items</label>
        <v-container>
          <v-row v-for="(item, index) in inventory" :key="index" class="d-flex align-center mb-3">
            <v-col cols="8">
              <v-text-field
                  v-model="item.name"
                  label="Item Name"
                  dense
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                  v-model="item.quantity"
                  label="Quantity"
                  type="number"
                  dense
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn icon @click="deleteItem(index)">
                <v-icon color="red">{{'fa: fa-solid fa-trash'}}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="addItem">Add Item</v-btn>
        </v-container>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="success" @click="saveInventory">Save</v-btn>
        <v-btn color="error" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inventorySection = ref(false);
const inventory = ref([{ name: '', quantity: 0 }]);

const addItem = () => {
  inventory.value.push({ name: '', quantity: 0 });
};

const deleteItem = (index: number) => {
  inventory.value.splice(index, 1);
};

const saveInventory = () => {
  // Logic to save inventory data
  inventorySection.value = false;
};

const cancel = () => {
  inventorySection.value = false;
};
</script>

<style></style>
