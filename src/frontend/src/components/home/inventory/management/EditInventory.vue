<template>
  <v-dialog
    v-model="addDialog"
    max-height="800"
    max-width="600"
    scrollable
    color="warning"
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="warning" v-bind="activatorProps"
        >Edit<v-icon icon="fa:fa-solid fa-pencil" end color="warning " size="small"></v-icon
      ></v-btn>
    </template>
    <v-card>
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
                :rules="descriptionRules"
                required
              ></v-text-field
            ></v-col>
            <v-row
              ><v-col col="4">
                <small class="text-caption white--text">Cost Price</small
                ><v-text-field
                  v-model="localEditedItem.costPrice"
                  color="secondary"
                  :rules="costPriceRules"
                  required
                ></v-text-field
              ></v-col>
              <v-col col="4">
                <small class="text-caption white--text">Current Stock Level</small
                ><v-text-field
                  v-model="localEditedItem.currentStockLevel"
                  color="secondary"
                  :rules="currentStockLevelRules"
                  required
                ></v-text-field
              ></v-col>
              <v-col col="4">
                <small class="text-caption white--text">Reorder Level</small
                ><v-text-field
                  v-model="localEditedItem.reorderLevel"
                  color="secondary"
                  :rules="reorderLevelRules"
                  required
                ></v-text-field></v-col
            ></v-row>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6">
              <v-btn @click="close" color="error" block
                >Cancel<v-icon
                  icon="fa:fa-solid fa-cancel"
                  end
                  color="error"
                  size="small"
                ></v-icon></v-btn
            ></v-col>
            <Toast position="top-center" />
            <v-col cols="12" lg="6">
              <v-btn @click="createInventoryItem" color="success" :disabled="!valid" block
                >Save<v-icon
                  icon="fa:fa-solid fa-floppy-disk"
                  end
                  color="success"
                  size="small"
                ></v-icon></v-btn></v-col></v-row
        ></v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Toast from 'primevue/toast'
import axios from 'axios'

export default {
  name: 'AddInventory',
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
      isdarkmode: localStorage.getItem('isdarkmode') === 'true',
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
    updateItem() {
      this.$emit('update:item', this.localEditedItem)
      alert('Item updated')
    },
    async createInventoryItem() {
      if (!this.localEditedItem) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid item data',
          life: 3000
        })
        return
      }
      console.log(this.inventory_id)
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()

      const data = {
        name: this.localEditedItem.name,
        description: this.localEditedItem.description,
        costPrice: this.convertToNumber(this.localEditedItem.costPrice),
        currentStockLevel: this.convertToNumber(this.localEditedItem.currentStockLevel),
        reorderLevel: this.convertToNumber(this.localEditedItem.reorderLevel),
        companyId: localStorage.getItem('currentCompany')
      }
      try {
        const response = await axios.patch(`${apiURL}inventory/${this.inventory_id}`, data, config)
        console.log(response)
        this.addDialog = false
        alert('Inventory updated')
      } catch (error) {
        console.error(error)
        alert('Failed to update inventory')
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
