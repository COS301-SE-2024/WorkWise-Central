<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1 class="text-xl font-semibold">Stock Management</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="searchQuery"
          label="Search"
          placeholder="Search for an item"
          outlined
          variant="outlined"
          color="primary"
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6">
        <v-text-field
          type="date"
          placeholder="Date of Stock Take"
          color="primary"
          variant="outlined"
          v-model="currentDate"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in filteredInventoryItems" :key="item._id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ item?.name }}</v-card-title>
          <v-card-subtitle>Cost Price: R{{ item?.costPrice }}</v-card-subtitle>
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
                <v-btn color="error" @click="selectItem(item)" block
                  ><v-icon icon="fa: fa-solid fa-clipboard" color="error"></v-icon>Record
                  Stock</v-btn
                ></v-col
              ></v-container
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-btn color="success" block @click="saveStockTake"
        ><v-icon icon="fa:fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
      >
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
        <v-card-title>Record Stock of {{ selectedItem.name }}</v-card-title>
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

            <v-file-input
              v-model="selectedItem.images"
              variant="solo"
              accept="image/*"
              width="100%"
              placeholder="Inventory Item Image"
              @change="handleImageUpload"
              hint="Image size limit of  5MB"
              persistent-hint
              color="black"
              rounded="md"
              required
              clearable
              data-testid="company-logo-file-input"
            ></v-file-input>
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
      currentDate: new Date().toISOString().substr(0, 10),
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
      selectedItem: '' as any,
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
      return this.inventoryItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
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
    selectItem(item: any) {
      this.selectedItem = item
      this.showDialog = true
    },
    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const file: File = target.files[0]
        const reader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === 'string') {
            // this.selectItem.images = e.target.result
          }
        }
        reader.readAsDataURL(file)
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
        date: this.currentDate,
        inventoryItems: this.filteredInventoryItems,
        companyID: localStorage.getItem('currentCompany'),
        currentEmployee: localStorage.getItem('username')
      }

      const mockEmployeeName = 'John Doe' // Replace with actual employee name if available

      const doc = new jsPDF()

      const pageWidth = doc.internal.pageSize.getWidth()

      // Add title
      doc.setFontSize(18)
      doc.text('Stock Take Summary', pageWidth / 2, 15, { align: 'center' })

      // Add date and employee name
      doc.setFontSize(12)
      doc.text(`Date: ${this.currentDate}`, 10, 25)
      doc.text(`Employee: ${stockTakeData.currentEmployee}`, 10, 32)

      // Add a table with inventory data
      const tableBody = this.filteredInventoryItems.map((item) => {
        const reorderLevel = item.currentStockLevel + 30
        const difference = reorderLevel - item.currentStockLevel
        return [
          item.name,
          `R${item.costPrice.toFixed(2)}`,
          item.currentStockLevel,
          reorderLevel,
          difference
        ]
      })

      autoTable(doc, {
        head: [['Item Name', 'Cost Price', 'Current Stock Level', 'Reorder Level', 'Difference']],
        body: tableBody,
        startY: 40,
        theme: 'grid'
      })

      // Add summary at the end of the PDF
      const totalItems = this.filteredInventoryItems.length
      const totalStock = this.filteredInventoryItems.reduce(
        (sum, item) => sum + item.currentStockLevel,
        0
      )
      const totalReorder = this.filteredInventoryItems.reduce(
        (sum, item) => sum + (item.currentStockLevel + 30),
        0
      )

      // doc.text(`Total Items: ${totalItems}`, 10, doc.autoTable.previous.finalY + 10)
      // doc.text(`Total Current Stock: ${totalStock}`, 10, doc.autoTable.previous.finalY + 17)
      // doc.text(`Total Reorder Level: ${totalReorder}`, 10, doc.autoTable.previous.finalY + 24)

      // Save the PDF
      doc.save(`stock_take_${localStorage.getItem('currentCompanyName')}_${this.currentDate}.pdf`)

      // Save stock take data to the backend
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
            detail: 'Stock take saved and PDF generated successfully'
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
