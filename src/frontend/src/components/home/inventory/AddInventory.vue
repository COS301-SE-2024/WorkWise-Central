<template>
  <v-dialog
    v-model="addDialog"
    max-height="800"
    max-width="600"
    scrollable
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="warning" v-bind="activatorProps"
        >Add</v-btn
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
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small class="text-caption white--text">Name</small
              ><v-text-field v-model="name" color="secondary" required></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption white--text">Description</small
              ><v-text-field v-model="description" color="secondary" required></v-text-field
            ></v-col>
            <v-row
              ><v-col col="4">
                <small class="text-caption white--text">Cost Price</small
                ><v-text-field v-model="costPrice" color="secondary" required></v-text-field
              ></v-col>
              <v-col col="4">
                <small class="text-caption white--text">Current Stock Level</small
                ><v-text-field v-model="currentStockLevel" color="secondary" required></v-text-field
              ></v-col>
              <v-col col="4">
                <small class="text-caption white--text">Reorder Level</small
                ><v-text-field
                  v-model="reorderLevel"
                  color="secondary"
                  required
                ></v-text-field></v-col
            ></v-row>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <Toast />
        <v-btn @click="createInventoryItem" color="success">Create</v-btn>
        <v-btn @click="close" color="error">Cancel</v-btn>
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
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
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
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()

      const data = {
        name: this.name,
        description: this.description,
        costPrice: this.convertToNumber(this.costPrice),
        currentStockLevel: this.convertToNumber(this.currentStockLevel),
        reorderLevel: this.convertToNumber(this.reorderLevel),
        companyID: localStorage.getItem('currentCompany')
      }
      try {
        const response = await axios.post(`${apiURL}inventory/create`, data, config)
        console.log(response)
        this.addDialog = false
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Inventory Added',
          life: 3000
        })
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
    }
  }
})
</script>
