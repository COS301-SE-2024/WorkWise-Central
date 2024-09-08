<template>
  <v-container>
    <v-card class="bg-cardColor">
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
      clientId: '66cf13c3a76252f35d46c8fb', //This is for testing purposes
      client: {
        registrationNumber: '',
        details: {
          firstName: '',
          lastName: '',
          preferredLanguage: '',
          contactInfo: {
            phoneNumber: '',
            email: ''
          },
          address: {
            street: '',
            suburb: '',
            province: '',
            city: '',
            postalCode: '',
            complexOrBuilding: ''
          },
          vatNumber: '',
          companyId: '',
          idNumber: '',
          type: ''
        },

      },
      companyId: '',
      merchantId: '',
      merchantKey: '',
      requests: [] as Request[],
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
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
    },
    async getRequests() {
      if (localStorage.getItem('clientId') !== null) {
        this.clientId = localStorage.getItem('clientId') as string
      }

      //Getting the client info
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = await this.getRequestUrl()
      await axios
        .get(`${url}client/id/${this.clientId}`, config)
        .then((response) => {
          this.client = response.data
        })
        .catch((error) => {
          console.error(error)
        })

      this.companyId = this.client.details.companyId

      //Getting the company info
      await axios
        .get(`${url}admin/request/all/company/${this.companyId}/detailed`, config)
        .then((response) => {
          this.merchantId = response.data.accountDetails.merchantId
          this.merchantKey = response.data.accountDetails.merchantKey
        })
        .catch((error) => {
          console.error(error)
        })

      //Getting the invoices
      
    },
    async isLocalAvailable(localUrl: string) {
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
    }
  },
  mounted() {
    this.getRequests()
  }
})
</script>
