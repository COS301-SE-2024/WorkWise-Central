<template>
    <div>
      <v-divider></v-divider>
        <h3 class="pb-2">Log Inventory</h3>
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
          <v-btn color="success" @click="addItem">Add Item</v-btn>
        </v-container>
    </div>
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
