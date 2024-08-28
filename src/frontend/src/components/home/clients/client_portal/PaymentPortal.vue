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
            <v-btn
              color="success"
              @click="payInvoice(invoice)"
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

<script>
export default {
  data() {
    return {
      stripe: null,
      invoices: [
        { id: 1, number: 'INV-001', date: '2023-07-01', amount: '100.00', status: 'Unpaid' },
        { id: 2, number: 'INV-002', date: '2023-08-01', amount: '200.00', status: 'Paid' }
      ]
    }
  },
  async mounted() {
    this.stripe = await loadStripe('your-public-key-here')
  },
  methods: {
    async payInvoice(invoice) {
      try {
        const response = await axios.post('your-backend-endpoint', {
          amount: invoice.amount,
          currency: 'usd',
          invoice_id: invoice.id
        })

        const { sessionId } = response.data
        await this.stripe.redirectToCheckout({ sessionId })
      } catch (error) {
        console.error('Payment failed', error)
      }
    }
  }
}
</script>
