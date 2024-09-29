<template>
  <v-dialog v-model="deleteDialog" max-width="500px" :opacity="0.1">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="primary" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-paper-plane" start color="primary" size="small"></v-icon>Send</v-btn
      >
    </template>
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon icon="fa:fa-solid fa-paper-plane" start color="white" size="small"></v-icon>
        <span>Send Invoice</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to send the invoice to <strong>{{ clientName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container>
      </v-card-text>

      <Toast position="top-center" />
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn label="Cancel" color="secondary" @click="close" block :disabled="isSending"
                ><v-icon icon="fa:fa-solid fa-cancel" color="secondary" size="small"></v-icon>Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn label="Delete" color="primary" :loading="isSending" block @click="sendInvoice"
                ><v-icon icon="fa:fa-solid fa-paper-plane" start color="primary" size="small"></v-icon
                >Send
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import axios from 'axios'
import { API_URL } from '@/main'

export default defineComponent({
  name: 'sendInvoice',
  props: {
    invoice_id: String,
    clientName: String
  },
  components: {
    Toast
  },
  data: () => ({
    deleteDialog: false,
    isSending: false,
  }),
  methods: {
    async sendInvoice() {
      this.isSending = true // Indicate the start of the deletion process
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      try {
        await axios.delete(`${API_URL}invoice/${this.invoice_id}`, config).then((response) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Invoice deleted successfully',
            life: 3000
          })
          setTimeout(() => {
            this.deleteDialog = false
            this.$emit('InvoiceDeleted', response.data.data)
          }, 3000)
        })
      } catch (error) {
        console.error(error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while deleting the invoice',
          life: 3000
        })
      }
      this.isSending = false
    },
    close() {
      this.deleteDialog = false
    },
  }
})
</script>
