<template>
  <Toast position="top-center" />
  <v-dialog persistent v-model="editDialog" max-height="800" max-width="800" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular" color="warning" v-bind="activatorProps">
        <v-icon start color="warning" size="small">mdi-pencil</v-icon>
        Edit
      </v-btn>
    </template>
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon>mdi-file-document-edit-outline</v-icon>
        Edit Invoice
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
          <v-col>
            <!-- Invoice Number -->
            <v-col>
              <small class="text-caption">Invoice Number</small>
              <v-text-field
                :disabled="isDeleting"
                v-model="localEditedInvoice.invoiceNumber"
                color="secondary"
                :rules="invoiceNumberRules"
                required
              ></v-text-field>
            </v-col>
           
            <!-- Inventory Items -->
            <v-col>
              <small class="text-caption">Inventory Items</small>
              <v-row
                v-for="(item, index) in localEditedInvoice.inventoryItems2"
                :key="index"
                class="d-flex align-center"
              >
                <v-col cols="5">
                  <v-select
                    v-model="item.description"
                    label="Item Name"
                    :items="inventoryItemNames"
                    :disabled="isDeleting"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-model="item.quantity"
                    label="Quantity"
                    type="number"
                    :disabled="isDeleting"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="d-flex align-center">
                  <v-btn icon @click="removeInventoryItem(index)" :disabled="isDeleting">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn text="true" color="primary" @click="addInventoryItem">
                <v-icon start size="small">mdi-plus</v-icon> Add Inventory Item
              </v-btn>
            </v-col>
            <!-- Labor Items -->
            <v-col>
              <small class="text-caption">Labor Items</small>
              <v-row
                v-for="(item, index) in localEditedInvoice.laborItems2"
                :key="index"
                class="d-flex align-center"
              >
                <v-col cols="5">
                  <v-text-field
                    v-model="item.description"
                    label="Labor Name"
                    :disabled="isDeleting"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-model="item.quantity"
                    label="Hours"
                    type="number"
                    :disabled="isDeleting"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="d-flex align-center">
                  <v-btn icon @click="removeLaborItem(index)" :disabled="isDeleting">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn text="true" color="primary" @click="addLaborItem">
                <v-icon start size="small">mdi-plus</v-icon> Add Labor Item
              </v-btn>
            </v-col>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6">
              <v-btn @click="close" color="error" block>
                <v-icon start color="error" size="small" :disabled="isDeleting">mdi-cancel</v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn
                @click="updateInvoice"
                color="success"
                :disabled="!valid"
                block
                :loading="isDeleting"
              >
                <v-icon start color="success" size="small">mdi-content-save</v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang>
import Toast from 'primevue/toast'
import axios from 'axios'
import { API_URL } from '@/main'

export default {
  name: 'EditInvoice',
  props: {
    editedInvoice: Object,
    invoice_id: String
  },
  components: {
    Toast
  },
  data() {
    return {
      isDeleting: false,
      localEditedInvoice: {
        ...this.editedInvoice
      },
      editDialog: false,
      valid: false,
      invoiceNumberRules: [(v) => !!v || 'Invoice number is required'],
      inventoryItems: [],
      inventoryItemNames: []
    }
  },
  created() {
    // Create a deep copy of editedInvoice
    this.localEditedInvoice = this.deepCopy(this.editedInvoice)
    console.log(this.editedInvoice)
    this.getInventoryItems()
    this.roundAmounts()
  },
  methods: {
    roundAmounts() {
      for (let i = 0; i < this.localEditedInvoice.inventoryItems2.length; i++) {
        this.localEditedInvoice.inventoryItems2[i].total = Math.round(
          this.localEditedInvoice.inventoryItems2[i].total * 100
        ) / 100
      }
      for (let i = 0; i < this.localEditedInvoice.laborItems2.length; i++) {
        this.localEditedInvoice.laborItems2[i].total = Math.round(
          this.localEditedInvoice.laborItems2[i].total * 100
        ) / 100
      }
    },
    updateInvoice() {
      if (!this.localEditedInvoice) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid invoice data',
          life: 3000
        })
        return
      }

      this.isDeleting = true
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` }
      }
      const data = {
        invoiceNumber: this.localEditedInvoice.invoiceNumber,
        inventoryItems: this.localEditedInvoice.inventoryItems2,
        laborItems: this.localEditedInvoice.laborItems2
      }
      axios
        .patch(`${API_URL}invoice/${this.invoice_id}`, data, config)
        .then((response) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Invoice updated successfully',
            life: 3000
          })
          setTimeout(() => {
            this.editDialog = false
            this.$emit('invoiceUpdated', response.data)
          }, 3000)
        })
        .catch((error) => {
          console.error(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating the invoice',
            life: 3000
          })
        })
      this.isDeleting = false
    },
    handleSubmission() {
      if (this.valid) {
        this.updateInvoice()
      }
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
        console.log(response.data.data)
        console.log(response.data.data)
        this.inventoryItems = response.data.data
        for (let i = 0; i < this.inventoryItems.length; i++) {
          this.inventoryItemNames.push(this.inventoryItems[i].name)
        }
      } catch (error) {
        console.error(error)
      }
    },
    close() {
      this.editDialog = false
    },
    addInventoryItem() {
      this.localEditedInvoice.inventoryItems.push({ description: '', quantity: 0 })
    },
    removeInventoryItem(index) {
      this.localEditedInvoice.inventoryItems.splice(index, 1)
    },
    addLaborItem() {
      this.localEditedInvoice.laborItems.push({ description: '', hours: 0 })
    },
    removeLaborItem(index) {
      this.localEditedInvoice.laborItems.splice(index, 1)
    },
    deepCopy(obj) {
      console.log(JSON.parse(JSON.stringify(obj)))
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>
