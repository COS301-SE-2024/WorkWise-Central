<template>
  <v-container fluid fill-height>

    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h4>Stock Take</h4>
      </v-col>
    </v-row>

    <v-row>
      <v-container fluid fill-height>
        <v-card class="bg-cardColor">
          <v-card-title>
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
              </v-col> </v-row
          ></v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="filteredInventoryItems"
              item-key="_id"
              :row-props="getRowProps"
              :header-props="{ class: 'bg-secondRowColor h6' }"
              class="bg-cardColor"
            >
              <template v-slot:[`item.currentStockLevel`]="{ item }">
                <v-text-field type="number" v-model="item.currentStockLevel"> </v-text-field>
              </template>
            </v-data-table>

            <v-btn color="success" block @click="saveAllStockTake()">
              <v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon> Save
            </v-btn></v-card-text
          >
        </v-card></v-container
      >
    </v-row>
  </v-container>

  <!-- Chart Dialog -->
  <v-dialog v-model="chartDialog" max-width="600px">
    <v-card class="bg-cardColor">
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
      <v-card class="bg-cardColor">
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
              label="Recorded Stock Level"
              v-model="selectedItem.currentStockLevel"
              type="number"
              :rules="currentStockLevelRules"
            ></v-text-field>

            <v-text-field
              label="Current Stock Level"
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
    <template>
      <!-- Confirmation Dialog with PDF Preview -->
      <v-dialog v-model="confirmDialog" max-width="800px">
        <v-card>
          <v-card-title class="headline">Update Inventory</v-card-title>
          <v-card-text>
            <p>Do you want to update the inventory table based on this stock take?</p>
            <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="400px"></iframe>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="confirmUpdate(true)">Yes</v-btn>
            <v-btn color="red darken-1" text @click="confirmUpdate(false)">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'primevue/chart'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { API_URL } from '@/main'

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
      headers: [
        { title: 'Name', value: 'name' },

        { title: 'Current Stock Level', value:  'reorderLevel'},
        { title: 'Recorded Stock Level', value: 'currentStockLevel' },
        { title: '', value: 'actions', sortable: false }
      ],
      sortOptions: [
        { title: 'Name (A-Z)', value: 'name' },
        { title: 'Stock Level (Low to High)', value: 'stockAsc' },
        { title: 'Stock Level (High to Low)', value: 'stockDesc' }
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
      nameRules: [(v) => !!v || 'Name is required'],
      descriptionRules: [(v) => !!v || 'Description is required'],
      costPriceRules: [
        (v) => !!v || 'Cost Price is required',
        (v) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Cost Price must be a valid number',
        (v) => parseFloat(v) > 0 || 'Cost Price must be greater than 0',
        (v) => !/^0\d/.test(v) || 'Cost Price cannot have leading zeros'
      ],
      currentStockLevelRules: [
        (v) => !!v || 'Recorded Stock Level is required',
        (v) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Recorded Stock Level must be a valid number',
        (v) => !/^0\d/.test(v) || 'Recorded Stock Level cannot have leading zeros'
      ],
      reorderLevelRules: [
        (v) => !!v || 'Current Stock Level is required',
        (v) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Current Stock Level must be a valid number',
        (v) => !/^0\d/.test(v) || 'Current Stock Level cannot have leading zeros'
      ],
      inventoryItems: [
        // Add more items as needed
      ],
      chartDialog: false,
      selectedItem: '',
      chartData: {
        labels: [],
        datasets: []
      },
      confirmDialog: false,
      updateInventory: false,
      pdfUrl: null
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
    async updateStock(item) {
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
      try {
        await axios.patch(`${API_URL}inventory/${item._id}`, data, config).then(() => {
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
    async createStockItem(item) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiUrl = await this.getRequestUrl()
      const data = ''
      try {
        const response = await axios.post(`${apiUrl}stocktake/create`, data, config)
        console.log('Stock take create:', response)
      } catch (error) {
        console.log('Failed to create stock: ', error)
      }
    },
    getRowProps(index) {
      return {
        class: index % 2 === 0 ? 'bg-secondRowColor' : ''
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
    async saveAllStockTake() {
      this.generatePDFPreview()
      this.confirmDialog = true
    },
    async generatePDFPreview() {
      const stockTakeData = {
        date: new Date(this.currentDate).toISOString(),
        inventoryItems: this.filteredInventoryItems,
        companyID: localStorage.getItem('currentCompany'),
        currentEmployee: localStorage.getItem('username') || 'John Doe'
      }

      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()

      // Add title
      doc.setFontSize(18)
      doc.text('Stock Take Summary', pageWidth / 2, 15, { align: 'center' })

      // Add date and employee name
      doc.setFontSize(12)
      doc.text(`Date: ${stockTakeData.date}`, 15, 30)
      doc.text(`Employee: ${stockTakeData.currentEmployee}`, 15, 40)

      // Create table headers
      const headers = ['Item Name', 'Cost Price', 'Recorded Stock Level', 'Current Stock Level']

      // Create table body data
      const body = stockTakeData.inventoryItems.map((item) => [
        item.name,
        item.costPrice,
        item.currentStockLevel,
        item.currentStockLevel + 30
      ])

      // Add table to the PDF
      autoTable(doc, {
        head: [headers],
        body: body,
        startY: 50,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [50, 50, 50] },
        columnStyles: { 0: { cellWidth: 'auto' } },
        margin: { top: 60 }
      })

      // Generate Blob URL for PDF preview
      const pdfBlob = doc.output('blob')
      this.pdfUrl = URL.createObjectURL(pdfBlob)
    },
    async confirmUpdate(update) {
      this.updateInventory = update;
      this.confirmDialog = false;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      };
      const apiURL = await this.getRequestUrl();
      const data = {
        "currentEmployeeId": localStorage.getItem('employeeId'),
        "companyId": localStorage.getItem('currentCompany'),
        "date": new Date(this.currentDate).toISOString(),
        "items": [],
        "updateInventory": this.updateInventory
      };
      this.filteredInventoryItems.forEach((item) => {
        data.items.push({
          "inventoryId": item._id,
          "recordedStockLevel": item.currentStockLevel
        });
      })
      console.log('Data', data)
      try {
        const response = await axios.post(`${apiURL}stocktake/create`, data, config)
        console.log('Response:', response)
        console.log("Hello world!");
      } catch (error) {
        console.log('Failure to update stock take', error);
      }
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
    selectItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
    handleImageUpload(event) {
      const target = event.target
      if (target.files && target.files[0]) {
        const file = target.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            // this.selectItem.images = e.target.result
          }
        }
        reader.readAsDataURL(file)
      }
    },
    showChart(item) {
      console.log('Showing chart for:', item)
      this.selectedItem = item

      // Calculate the reorder level
      const reorderLevel = item.currentStockLevel + 30

      // Prepare the chart data
      this.chartData = {
        labels: ['Recorded Stock Level', 'Suggested Current Stock Level'],
        datasets: [
          {
            label: item.name,
            backgroundColor: '#42A5F5',
            data: [item.currentStockLevel, reorderLevel]
          }
        ]
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
          ['Recorded Stock Level', item.currentStockLevel.toString()],
          ['Suggested Current Stock Level', reorderLevel.toString()]
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
        head: [['Item Name', 'Cost Price', 'Recorded Stock Level', 'Current Stock Level', 'Difference']],
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
      // doc.text(`Total Current Stock Level: ${totalReorder}`, 10, doc.autoTable.previous.finalY + 24)

      // Save the PDF
      doc.save(`stock_take_${localStorage.getItem('currentCompanyName')}_${this.currentDate}.pdf`)

      // Save stock take data to the backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        await axios.post(`${API_URL}stocktake`, stockTakeData, config).then(() => {
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
          await this.updateStock(item)
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
      try {
        const response = await axios.get(
          `${API_URL}inventory/all/${localStorage.getItem('employeeId')}`,
          config
        )
        this.inventoryItems = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async isLocalAvailable(localUrl) {
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
