<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1 class="text-xl font-semibold">Stock Management</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in inventoryItems" :key="item._id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>Cost Price: R{{ item.costPrice }}</v-card-subtitle>
          <v-card-actions>
            <v-container
              ><v-row
                ><v-col>
                  <v-btn color="success" @click="showChart(item)" block>
                    <v-icon icon="fa: fa-solid fa-chart-simple" color="success"></v-icon> Show Stock
                    Chart
                  </v-btn></v-col
                ></v-row
              >
              <v-col>
                <v-btn color="error" @click="showDialog = true" block
                  ><v-icon icon="fa: fa-solid fa-clipboard" color="error"></v-icon>Record
                  Stock</v-btn
                ></v-col
              ></v-container
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Chart Dialog -->
  <v-dialog v-model="chartDialog" max-width="600px">
    <v-card>
      <v-card-title>Stock Levels for {{ selectedItem?.name }}</v-card-title>
      <v-card-text>
        <Chart type="bar" :data="chartData" />
      </v-card-text>
      <v-card-actions>
        <v-container
          ><v-row
            ><v-col cols="12" lg="6">
              <v-btn color="success" @click="generatePDF" block
                ><v-icon icon="fa:fa-solid fa-file" color="success"></v-icon>Generate PDF</v-btn
              ></v-col
            ><v-col cols="12" lg="6">
              <v-btn color="error" @click="chartDialog = false" block
                ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Close</v-btn
              ></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div>
    <!-- Button to open the stock take dialog -->

    <!-- Stock Take Dialog -->
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>Add Stock Item</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitStockTake">
            <v-text-field
              label="Name"
              v-model="selectedItem.name"
              :rules="nameRules"
            ></v-text-field>

            <v-textarea
              label="Description"
              v-model="selectedItem.description"
              :rules="descriptionRules"
            ></v-textarea>

            <v-text-field
              label="Cost Price"
              v-model="selectedItem.costPrice"
              type="number"
              :rules="costPriceRules"
            ></v-text-field>

            <v-text-field
              label="Current Stock Level"
              v-model="selectedItem.currentStockLevel"
              type="number"
              :rules="currentStockLevelRules"
            ></v-text-field>

            <v-text-field
              label="Reorder Level"
              v-model="selectedItem.reorderLevel"
              type="number"
              :rules="reorderLevelRules"
            ></v-text-field>

            <v-textarea
              label="Images (URLs)"
              v-model="selectedItem.images"
              placeholder="Enter image URLs separated by commas"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-container
            ><v-row>
              <v-col cols="12" lg="6" order-lg="2" order="1">
                <v-btn color="success" @click="submitStockTake" block
                  ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
                ></v-col
              >
              <v-col cols="12" lg="6" order-lg="1" order="2">
                <v-btn color="error" @click="showDialog = false" block
                  ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Cancel</v-btn
                ></v-col
              >
            </v-row></v-container
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Chart from 'primevue/chart'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
interface InventoryItem {
  _id: string
  name: string
  currentStockLevel: number
  updatedStock: number
}
export default {
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',

      isUpdating: false,
      searchQuery: '',
      sortOrder: '',
      stockTakeDate: new Date(),
      sortOptions: [
        { text: 'Name (A-Z)', value: 'name' },
        { text: 'Stock Level (Low to High)', value: 'stockAsc' },
        { text: 'Stock Level (High to Low)', value: 'stockDesc' }
      ],
      showDialog: false,
      newStockItem: {
        name: '',
        description: '',
        costPrice: 0,
        currentStockLevel: 0,
        reorderLevel: 0,
        images: ''
      },
      nameRules: [(v: string) => !!v || 'Name is required'],
      descriptionRules: [(v: string) => !!v || 'Description is required'],
      costPriceRules: [
        (v: string) => !!v || 'Cost Price is required',
        (v: string) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Cost Price must be a valid number',
        (v: string) => parseFloat(v) > 0 || 'Cost Price must be greater than 0',
        (v: string) => !/^0\d/.test(v) || 'Cost Price cannot have leading zeros'
      ],
      currentStockLevelRules: [
        (v: string) => !!v || 'Current Stock Level is required',
        (v: string) =>
          /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Current Stock Level must be a valid number',
        (v: string) => !/^0\d/.test(v) || 'Current Stock Level cannot have leading zeros'
      ],
      reorderLevelRules: [
        (v: string) => !!v || 'Reorder Level is required',
        (v: string) =>
          /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Reorder Level must be a valid number',
        (v: string) => !/^0\d/.test(v) || 'Reorder Level cannot have leading zeros'
      ],
      inventoryItems: [
        {
          _id: '1',
          name: 'Item 1',
          costPrice: 100,
          currentStockLevel: 50
        },
        {
          _id: '2',
          name: 'Item 2',
          costPrice: 150,
          currentStockLevel: 30
        },
        {
          _id: '3',
          name: 'Item 3',
          costPrice: 200,
          currentStockLevel: 20
        }
        // Add more items as needed
      ],
      chartDialog: false,
      selectedItem: null as any,
      chartData: {
        labels: [],
        datasets: []
      }
    }
  },
  components: {
    Chart
  },
  computed: {
    filteredInventoryItems() {
      let items = this.inventoryItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      if (this.sortOrder === 'name') {
        items = items.sort((a, b) => a.name.localeCompare(b.name))
      } else if (this.sortOrder === 'stockAsc') {
        items = items.sort((a, b) => a.currentStockLevel - b.currentStockLevel)
      } else if (this.sortOrder === 'stockDesc') {
        items = items.sort((a, b) => b.currentStockLevel - a.currentStockLevel)
      }
      return items
    }
  },
  methods: {
    async updateStock(item: InventoryItem) {
      this.isUpdating = true
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const data = {
        currentStockLevel: item.updatedStock,
        companyID: localStorage.getItem('currentCompany'),
        currentEmployee: localStorage.getItem('employeeId')
      }
      const apiURL = await this.getRequestUrl()
      try {
        await axios.patch(`${apiURL}inventory/${item._id}`, data, config).then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock updated successfully'
          })
          setTimeout(() => {
            this.isUpdating = false
            this.getInventoryItems()
          }, 3000)
        })
      } catch (error) {
        console.error(error)
        this.isUpdating = false
      }
    },
    submitStockTake() {
      // Convert the images string to an array
      // const imagesArray = this.newStockItem.images.split(',').map((img) => img.trim())
      // this.newStockItem.images = imagesArray

      // Handle the saving of the stock item (e.g., API call or local state update)
      console.log('New Stock Item:', this.newStockItem)

      // Close the dialog
      this.showDialog = false

      // Reset the form
      this.resetForm()
    },
    resetForm() {
      this.newStockItem = {
        name: '',
        description: '',
        costPrice: 0,
        currentStockLevel: 0,
        reorderLevel: 0,
        images: ''
      }
    },
    showChart(item: any) {
      console.log('Showing chart for:', item)
      this.selectedItem = item

      // Calculate the reorder level
      const reorderLevel = item.currentStockLevel + 30

      // Prepare the chart data
      this.chartData = {
        labels: ['Current Stock Level', 'Suggested Reorder Level'] as any,
        datasets: [
          {
            label: item.name,
            backgroundColor: '#42A5F5',
            data: [item.currentStockLevel, reorderLevel]
          }
        ] as any
      }

      // Show the chart dialog
      this.chartDialog = true
    },
    generatePDF() {
      const doc = new jsPDF()

      // Loop through each inventory item
      this.inventoryItems.forEach((item, index) => {
        // Calculate reorder level
        const reorderLevel = item.currentStockLevel + 30

        // Add item name as a title for each table
        doc.text(`Item: ${item.name}`, 10, 10 + index * 90)

        // Create the table data
        const tableData = [
          ['Current Stock Level', item.currentStockLevel.toString()],
          ['Suggested Reorder Level', reorderLevel.toString()]
        ]

        // Add the table to the PDF
        autoTable(doc, {
          head: [['Attribute', 'Value']],
          body: tableData,
          startY: 20 + index * 90, // Adjust Y position for each table
          theme: 'grid'
        })

        // Add a new page for the next item, except for the last one
        if (index < this.inventoryItems.length - 1) {
          doc.addPage()
        }
      })

      // Save the PDF
      doc.save('inventory_stock_levels.pdf')
    },
    async saveStockTake() {
      const stockTakeData = {
        date: this.stockTakeDate,
        inventoryItems: this.filteredInventoryItems,
        companyID: localStorage.getItem('currentCompany'),
        currentEmployee: localStorage.getItem('employeeId')
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        await axios.post(`${apiURL}stocktake`, stockTakeData, config).then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock take saved successfully'
          })
        })
      } catch (error) {
        console.error(error)
      }
    },
    async generateAndSaveReport() {
      // Generate the report and ask the user whether to update stock or keep as is
      const confirmed = confirm(
        'Do you want to update the stock on the system based on this report?'
      )
      if (confirmed) {
        for (const item of this.filteredInventoryItems) {
          await this.updateStock(item as any)
        }
      }
      // Generate and download the report
      // this.$refs.report.generateReport()
    },
    async getInventoryItems() {
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
          `${apiURL}inventory/all/${localStorage.getItem('employeeId')}`,
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
    this.getInventoryItems()
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
