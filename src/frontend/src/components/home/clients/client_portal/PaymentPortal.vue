<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5">Invoices</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="invoice in invoices" :key="invoice.id">
          <v-list-item-content>
            <v-list-item-title>Invoice #{{ invoice.number }}</v-list-item-title>
            <v-list-item-subtitle>Date: {{ invoice.date }}</v-list-item-subtitle>
            <v-list-item-subtitle>Amount: {{ invoice.amount }}</v-list-item-subtitle>
            <v-list-item-subtitle>Status: {{ invoice.status }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <form
              :id="'paymentForm' + invoice.id"
              action="https://sandbox.payfast.co.za/eng/process"
              method="post"
            >
              <input type="hidden" name="merchant_id" :value="merchantId" />
              <input type="hidden" name="merchant_key" :value="merchantKey" />
              <input type="hidden" name="amount" :value="invoice.amount" />
              <input type="hidden" name="item_name" :value="`Invoice #${invoice.number}`" />
            </form>
            <v-btn
              color="success"
              @click="submitPaymentForm(invoice.id)"
              :disabled="invoice.status === 'Paid'"
            >
              Pay Now
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      invoices: [
        { id: 1, number: 'INV-001', date: '2023-07-01', amount: '100.00', status: 'Unpaid' },
        { id: 2, number: 'INV-002', date: '2023-08-01', amount: '200.00', status: 'Paid' }
      ],
      merchantId: '10000100',
      merchantKey: '46f0cd694581a'
    }
  },
  methods: {
    submitPaymentForm(invoiceId: number) {
      const form = document.getElementById('paymentForm' + invoiceId) as HTMLFormElement
      if (form) {
        form.submit()
      } else {
        console.error('Form not found for invoice:', invoiceId)
      }
    }
  }
})
</script>
