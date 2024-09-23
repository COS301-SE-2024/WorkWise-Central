<template>
  <Toast position="top-center" />
  <v-dialog
    v-model="addDialog"
    max-height="800"
    max-width="600"
    scrollable
    color="warning"
    :opacity="0.1"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="warning" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-pencil" start color="warning " size="small"></v-icon
        >Edit</v-btn
      >
    </template>
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon icon="fa: fa-solid fa-warehouse"></v-icon>
        Edit Inventory
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small class="text-caption white--text">Product Name</small
              ><v-text-field
                v-model="localEditedItem.name"
                color="secondary"
                :rules="nameRules"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption white--text">Description</small
              ><v-text-field
                v-model="localEditedItem.description"
                color="secondary"
                required
              ></v-text-field
            ></v-col>
            <v-row
              ><v-col cols="12" lg="4">
                <small class="text-caption white--text">Cost Price</small
                ><v-text-field
                  v-model="localEditedItem.costPrice"
                  color="secondary"
                  required
                ></v-text-field
              ></v-col>
              <v-col cols="12" lg="4">
                <small class="text-caption white--text">Current Stock Level</small
                ><v-text-field
                  v-model="localEditedItem.currentStockLevel"
                  color="secondary"
                  required
                ></v-text-field
              ></v-col>
              <v-col cols="12" lg="4">
                <small class="text-caption white--text">Reorder Level</small
                ><v-text-field
                  v-model="localEditedItem.reorderLevel"
                  color="secondary"
                  required
                ></v-text-field></v-col
            ></v-row>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn @click="close" color="error" block
                ><v-icon
                  icon="fa:fa-solid fa-cancel"
                  color="error"
                  start
                  size="small"
                  :loading="isDeleting"
                ></v-icon
                >Cancel</v-btn
              ></v-col
            >

            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                @click="updateItem"
                color="success"
                :disabled="!valid"
                block
                :loading="isDeleting"
                ><v-icon
                  icon="fa:fa-solid fa-floppy-disk"
                  start
                  color="success"
                  size="small"
                ></v-icon
                >Save</v-btn
              ></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Toast from 'primevue/toast'
import axios from 'axios'

export default {
  name: 'EditInventory',
  props: {
    editedItem: Object,
    item: Object,
    inventory_id: String
  },
  components: {
    Toast
  },
  data() {
    return {
      localEditedItem: this.editedItem,
      addDialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true',
      isDeleting: false,
      valid: false,
      name: '',
      description: '',
      costPrice: '',
      currentStockLevel: '',
      reorderLevel: '',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      nameRules: [(v) => !!v || 'Name is required'],
      descriptionRules: [(v) => !!v || 'Description is required'],
      costPriceRules: [
        (v) => !!v || 'Cost Price is required',
        (v) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Cost Price must be a valid number',
        (v) => parseFloat(v) > 0 || 'Cost Price must be greater than 0',
        (v) => !/^0\d/.test(v) || 'Cost Price cannot have leading zeros'
      ],
      currentStockLevelRules: [
        (v) => !!v || 'Current Stock Level is required',
        (v) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Current Stock Level must be a valid number',
        (v) => !/^0\d/.test(v) || 'Current Stock Level cannot have leading zeros'
      ],
      reorderLevelRules: [
        (v) => !!v || 'Reorder Level is required',
        (v) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Reorder Level must be a valid number',
        (v) => !/^0\d/.test(v) || 'Reorder Level cannot have leading zeros'
      ]
    }
  },
  created() {
    // Create a deep copy of editedItem
    this.localEditedItem = this.deepCopy(this.editedItem)
  },
  methods: {
    addInventory() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory Added',
        life: 3000
      })
    },
    async updateItem() {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      }

      const data = {
        currentEmployeeId: localStorage.getItem('employeeId'),
        updateInventoryDto: {
          name: this.localEditedItem.name,
          description: this.localEditedItem.description,
          costPrice: this.localEditedItem.costPrice,
          salePrice: this.localEditedItem.salePrice,
          currentStockLevel: this.localEditedItem.currentStockLevel,
          reorderLevel: this.localEditedItem.reorderLevel
        }
      }
      try {
        console.log(data)
        const response = await axios.patch(`${API_URL}inventory/${this.inventory_id}`, data, config)
        console.log(response)
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Inventory Updated',
          life: 3000
        })

        setTimeout(() => {
          this.addDialog = false
          this.isDeleting = false
          this.resetFields()
          this.$emit('updateInventory', response.data.data)
        }, 1500)
      } catch (error) {
        console.error(error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add inventory',
          life: 3000
        })
      }
    },
    allRulesPass() {
      if (
        this.nameRules.every((rule) => rule(this.localEditedItem.name)) &&
        this.descriptionRules.every((rule) => rule(this.localEditedItem.description)) &&
        this.costPriceRules.every((rule) => rule(this.localEditedItem.costPrice)) &&
        this.currentStockLevelRules.every((rule) => rule(this.localEditedItem.currentStockLevel)) &&
        this.reorderLevelRules.every((rule) => rule(this.localEditedItem.reorderLevel))
      ) {
        this.valid = true
      } else {
        this.valid = false
      }
    },
    convertToNumber(value) {
      return parseFloat(value)
    },
    handleSubmission() {
      if (this.valid) {
        this.addInventory()
      }
    },
    close() {
      this.addDialog = false
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status >= 200 && res.status < 300
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>
