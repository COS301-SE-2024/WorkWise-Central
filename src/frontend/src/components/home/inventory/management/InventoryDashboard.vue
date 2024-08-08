<template>
  <v-container fluid fill-height>
    <v-card
      height="auto"
      class="pa-11 ma-0 bg-cardColor"
      rounded="md"
      :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
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
              variant="outlined"
              flat
              color="primary"
              width="100%"
              hide-details="auto"
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
          height="auto"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <!-- <v-btn
              rounded="xl"
              variant="plain"
              v-bind="attrs"
              v-on="on"
              @click="fuga(), selectItem(item)"
            >
              <v-icon color="primary">mdi-dots-horizontal</v-icon>
            </v-btn> -->
            <v-menu max-width="500px" :theme="isdarkmode === true ? 'dark' : 'light'">
              <template v-slot:activator="{ props }">
                <v-btn rounded="xl" variant="plain" v-bind="props" @click="selectItem(item)">
                  <v-icon color="primary">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <InventoryDetails :inventoryItem="selectedItem" />
                </v-list-item>
                <v-list-item>
                  <EditInventory :inventory_id="selectedItemID" :editedItem="selectedItem" />
                </v-list-item>

                <v-list-item>
                  <DeleteInventory
                    :inventory_id="selectedItemID"
                    :inventoryName="selectedItemName"
                  />
                </v-list-item>
              </v-list> </v-menu
          ></template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddInventory from './AddInventory.vue'
import DeleteInventory from './DeleteInventory.vue'
import EditInventory from './EditInventory.vue'
import InventoryDetails from './InventoryDetails.vue'
import axios from 'axios'
interface Inventory {
  _id: string
  name: string
  description: string
  costPrice: number
  currentStockLevel: number
  reorderLevel: number
}
export default defineComponent({
  name: 'InventoryDashboard',

  components: { AddInventory, DeleteInventory, EditInventory, InventoryDetails },
  data() {
    return {
      inventoryHeaders: [
        { title: 'Product Name', value: 'name', sortable: true, key: 'name' },
        { title: 'Description', value: 'description', sortable: true, key: 'description' },
        { title: 'Cost Price', value: 'costPrice', sortable: true, key: 'costPrice' },
        {
          title: 'Current Stock Level',
          value: 'currentStockLevel',
          sortable: true,
          key: 'currentStockLevel'
        },
        { title: 'Reorder Level', value: 'reorderLevel', sortable: true, key: 'reorderLevel' },
        // Keep the actions column if you have actions like edit or delete for each row
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
      inventoryItems: [],
      search: '',
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      selectedItem: {},
      selectedItemName: '',
      selectedItemID: '',
      actionsMenu: false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    selectItem(item: Inventory) {
      console.log(item)
      this.selectedItem = item
      this.selectedItemName = item.name
      this.selectedItemID = item._id
    },
    getRowProps(index: number) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    fuga() {
      this.actionsMenu = true
    },
    async getInventory() {
      // Fetch inventory items from the backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployee: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}inventory/all/${localStorage.getItem('currentCompany')}`,
          config
        )
        this.inventoryItems = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  },
  mounted() {
    this.getInventory()
  }
})
</script>
