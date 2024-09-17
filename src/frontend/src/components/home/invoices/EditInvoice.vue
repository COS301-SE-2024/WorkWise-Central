<template>
  <Toast position="top-center" />
  <v-dialog v-model="editDialog" max-height="800" max-width="600" scrollable>
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
            <v-col>
              <small class="text-caption">Invoice Number</small>
              <v-text-field
                v-model="localEditedInvoice.invoiceNumber"
                color="secondary"
                :rules="invoiceNumberRules"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <small class="text-caption">Date</small>
              <v-text-field
                v-model="localEditedInvoice.creationDate"
                color="secondary"
                required
              ></v-text-field>
            </v-col>
            <v-row>
              <v-col cols="12" lg="6">
                <small class="text-caption">Amount</small>
                <v-text-field
                  v-model="localEditedInvoice.total"
                  color="secondary"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6">
                <small class="text-caption">Status</small>
                <v-select
                  v-model="localEditedInvoice.paid"
                  :items="statusOptions"
                  color="secondary"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6">
              <v-btn @click="close" color="error" block>
                <v-icon start color="error" size="small">mdi-cancel</v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn @click="updateInvoice" color="success" :disabled="!valid" block>
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

<script lang="ts">
import Toast from 'primevue/toast'
import axios from 'axios'
interface Invoice {
  _id: string
  invoiceNumber: string
  creationDate: string
  paymentDate: string
  total: number
  paid: boolean
  clientName: string
  jobTitle: string
}

export default {
  name: 'EditInvoice',
  props: {
    editedInvoice: {
      type: Object as () => Invoice,
      required: true
    },
    invoice_id: String
  },
  components: {
    Toast
  },
  data() {
    return {
      localEditedInvoice: {
        ...this.editedInvoice
      } as Invoice,
      editDialog: false,
      valid: false,
      statusOptions: ['Paid', 'Unpaid'] as boolean[],
      invoiceNumberRules: [(v: string) => !!v || 'Invoice number is required'],
      dateRules: [(v: string) => !!v || 'Date is required'],
      amountRules: [
        (v: string) => !!v || 'Amount is required',
        (v: string) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v) || 'Amount must be a valid number'
      ]
    }
  },
  created() {
    // Create a deep copy of editedInvoice
    this.localEditedInvoice = this.deepCopy(this.editedInvoice)
  },
  methods: {
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

      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` }
      }
      const apiURL = this.getRequestUrl()

     

      axios
        .patch(`${apiURL}/invoices/${this.invoice_id}`, this.localEditedInvoice, config)
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
    },
    handleSubmission() {
      if (this.valid) {
        this.updateInvoice()
      }
    },
    close() {
      this.editDialog = false
    },
    deepCopy(obj: any) {
      return JSON.parse(JSON.stringify(obj))
    },
    getRequestUrl() {
      return 'https://your-api-url.com'
    }
  }
}
</script>
