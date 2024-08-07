<template>
  <v-dialog
    v-model="addDialog"
    max-height="800"
    max-width="600"
    scrollable
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular hello"
        color="secondary"
        v-bind="activatorProps"
        variant="elevated"
        ><v-icon icon="fa:fa-solid fa-plus" color="" size="xs" />
        <v-icon icon="fa:fa-solid fa-warehouse" color="" />
        Add Inventory</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <v-icon icon="fa: fa-solid fa-warehouse"></v-icon>
        Add Inventory
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
          <v-col>
            <v-row>
              <v-col>
                <h6>Product Name</h6>
                <v-text-field
                  v-model="name"
                  color="secondary"
                  :rules="nameRules"
                  required
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col>
                <h6>Description</h6>
                <v-text-field
                  v-model="description"
                  color="secondary"
                  :rules="descriptionRules"
                  required
                  hide-details="auto"
                ></v-text-field></v-col
            ></v-row>

            <v-row
              ><v-col col="4">
                <h6>Cost Price</h6>
                <v-text-field
                  v-model="costPrice"
                  color="secondary"
                  :rules="costPriceRules"
                  required
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col col="4">
                <h6>Current Stock Level</h6>
                <v-text-field
                  v-model="currentStockLevel"
                  color="secondary"
                  :rules="currentStockLevelRules"
                  required
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col col="4">
                <h6>Reorder Level</h6>
                <v-text-field
                  v-model="reorderLevel"
                  color="secondary"
                  :rules="reorderLevelRules"
                  required
                ></v-text-field></v-col
            ></v-row>
          </v-col>
        </v-form>
      </v-card-text>
      <Toast position="top-center" />
      <v-divider></v-divider>
      <v-card-actions
        ><v-container
          ><v-row justify="end"
            ><v-col cols="12" lg="6">
              <v-btn @click="close" color="error" block
                >Cancel
                <v-icon icon="fa:fa-solid fa-cancel" color="error" size="small" end></v-icon></v-btn
            ></v-col>
            <v-col cols="12" lg="6">
              <v-btn @click="createInventoryItem" color="success" :disabled="!valid" block
                >Create<v-icon
                  icon="fa:fa-solid fa-plus"
                  color="success"
                  size="small"
                  end
                ></v-icon></v-btn></v-col></v-row
        ></v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import axios from 'axios'
export default defineComponent({
  name: 'AddInventory',
  components: {
    Toast
  },
  data: () => ({
    addDialog: false,
    isdarkmode: localStorage.getItem('isdarkmode') === 'true' ? true : false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    valid: false,
    name: '',
    description: '',
    costPrice: '',
    currentStockLevel: '',
    reorderLevel: '',
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
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
      (v: string) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Reorder Level must be a valid number',
      (v: string) => !/^0\d/.test(v) || 'Reorder Level cannot have leading zeros'
    ]
  }),
  methods: {
    addInventory() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory Added',
        life: 3000
      })
    },
    async createInventoryItem() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      }
      const apiURL = await this.getRequestUrl()

      const data = {
        createInventoryDto: {
          name: this.name,
          description: this.description,
          costPrice: this.convertToNumber(this.costPrice),
          currentStockLevel: this.convertToNumber(this.currentStockLevel),
          reorderLevel: this.convertToNumber(this.reorderLevel),
          companyId: localStorage.getItem('currentCompany') || ''
        },
        currentEmployeeId: localStorage.getItem('employeeId') || '' // Ensure a fallback if the item doesn't exist
      }
      try {
        console.log(data)
        const response = await axios.post(`${apiURL}inventory/create`, data, config)
        console.log(response)
        alert('Inventory added')
        this.addDialog = false
      } catch (error) {
        console.error(error)
        alert('Inventory not added')
      }
    },
    convertToNumber(value: string) {
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
    },
    allRulesPass() {
      if (
        this.nameRules.every((rule) => rule(this.name)) &&
        this.descriptionRules.every((rule) => rule(this.description)) &&
        this.costPriceRules.every((rule) => rule(this.costPrice)) &&
        this.currentStockLevelRules.every((rule) => rule(this.currentStockLevel)) &&
        this.reorderLevelRules.every((rule) => rule(this.reorderLevel))
      ) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
  }
})
</script>
