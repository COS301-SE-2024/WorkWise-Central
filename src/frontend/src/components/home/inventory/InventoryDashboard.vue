<template>
  <v-container fluid fill-height>
    <v-card
      height="auto"
      class="pa-11 ma-0 bg-cardColor"
      rounded="md"
      :theme="isdarkmode ? 'dark' : 'light'"
      border="md"
    >
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
        ><v-row align="center" justify="space-between">
          <v-col cols="12" md="4" sm="6" xs="12" class="d-flex align-center">
            <v-icon icon="fa: fa-solid fa-warehouse"></v-icon>
            <v-label
              class="ms-2 h4 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Inventory</v-label
            >
          </v-col>

          <v-col cols="12" md="4" sm="6" xs="12">
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-inverted"
              flat
              width="100%"
              style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
              hide-details
              single-line
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="12" xs="12" class="d-flex justify-end">
            <AddInventory />
          </v-col> </v-row
      ></v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="inventoryHeaders"
          :items="inventoryItems"
          :search="search"
          :items-per-page="5"
          class="bg-cardColor"
          :theme="isdarkmode ? 'dark' : 'light'"
          :row-props="getRowProps"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn rounded="xl" variant="plain" @click="(actionsMenu = true), selectItem(item)">
              <v-icon color="primary">mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-menu v-model="actionsMenu" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-primary text-center"></v-card-title>
        <v-card-text> What would you like to do with this inventory item</v-card-text>
        <v-card-actions>
          <InventoryDetails />
          <EditInventory />
          <DeleteInventory />
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import AddInventory from './AddInventory.vue'
import DeleteInventory from './DeleteInventory.vue'
import EditInventory from './EditInventory.vue'
import InventoryDetails from './InventoryDetails.vue'

export default defineComponent({
  name: 'InventoryDashboard',
  components: { AddInventory, DeleteInventory, EditInventory, InventoryDetails },
  data() {
    return {
      inventoryHeaders: [
        { title: 'Name', value: 'name', sortable: true, key: 'name' },
        { title: 'Description', value: 'description', sortable: true, key: 'description' },
        { title: 'Quantity', value: 'quantity', sortable: true, key: 'quantity' },
        { title: 'Price', value: 'price', sortable: true, key: 'price' },
        { title: 'Category', value: 'category', sortable: true, key: 'category' },
        { title: 'Supplier', value: 'supplier', sortable: true, key: 'supplier' },
        { title: 'Date', value: 'date', sortable: true, key: 'date' },
        { title: '', value: 'actions', key: 'actions', sortable: false, class: 'my-header-style' }
      ],
      form: {
        avatar: null
      },
      categoryOptions: ['Electronics', 'Clothing', 'Food', 'Furniture', 'Stationery'],
      supplierOptions: [
        'Supplier 1',
        'Supplier 2',
        'Supplier 3',
        'Supplier 4',
        'Supplier 5',
        'Supplier 6',
        'Supplier 7',
        'Supplier 8',
        'Supplier 9',
        'Supplier 10'
      ],
      inventoryItems: [
        {
          name: 'Laptop',
          description: 'Dell Inspiron 15',
          quantity: 10,
          price: 15000,
          category: 'Electronics',
          supplier: 'Supplier 1',
          date: '2021-09-01'
        },
        {
          name: 'T-Shirt',
          description: 'Blue T-Shirt',
          quantity: 20,
          price: 500,
          category: 'Clothing',
          supplier: 'Supplier 2',
          date: '2021-09-02'
        },
        {
          name: 'Rice',
          description: 'Basmati Rice',
          quantity: 50,
          price: 1000,
          category: 'Food',
          supplier: 'Supplier 3',
          date: '2021-09-03'
        },
        {
          name: 'Chair',
          description: 'Office Chair',
          quantity: 5,
          price: 2000,
          category: 'Furniture',
          supplier: 'Supplier 4',
          date: '2021-09-04'
        },
        {
          name: 'Pen',
          description: 'Blue Pen',
          quantity: 100,
          price: 10,
          category: 'Stationery',
          supplier: 'Supplier 5',
          date: '2021-09-05'
        }
      ],
      search: '',
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      selectedItem: {},
      selectedItemName: ''
    }
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
      this.selectedItemName = item.name
    },
    getRowProps({ index }) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    }
  }
})
</script>
