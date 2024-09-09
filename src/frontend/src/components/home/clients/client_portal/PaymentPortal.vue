<template>
  <v-container>
    <v-card class="bg-cardColor">
      <v-card-title class="text-h5">Invoices</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="invoice in invoices" :key="invoice._id">
          <v-list-item-content>
            <v-list-item-title>Invoice #{{ invoice.invoiceNumber }}</v-list-item-title>
            <v-list-item-subtitle>Payment date: {{ invoice.paymentDate }}</v-list-item-subtitle>
            <v-list-item-subtitle>Amount: {{ invoice.total }}</v-list-item-subtitle>
            <v-list-item-subtitle
              >Status: {{ invoice.paid ? 'Paid' : 'Awaiting payment' }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <form :id="'paymentForm' + invoice._id" :action="pfHost" method="post">
              <input name="merchant_id" type="hidden" :value="merchant_id" />
              <input name="merchant_key" type="hidden" :value="merchant_key" />
              <input name="return_url" type="hidden" :value="return_url" />
              <input name="cancel_url" type="hidden" :value="cancel_url" />
              <input name="notify_url" type="hidden" :value="notify_url" />
              <input name="name_first" type="hidden" :value="client.details.firstName" />
              <input name="name_last" type="hidden" :value="client.details.lastName" />
              <input name="email_address" type="hidden" :value="client.details.contactInfo.email" />
              <input name="m_payment_id" type="hidden" :value="invoice._id" />
              <input name="amount" type="hidden" :value="invoice.total" />
              <input name="item_name" type="hidden" :value="invoice.invoiceNumber" />
              <input name="signature" type="hidden" :value="generateSignature(invoice)" />
            </form>
            <v-btn
              color="success"
              @click="submitPaymentForm(invoice._id)"
              :disabled="invoice.paid === 'Paid'"
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
import MD5 from 'crypto-js/md5'
export default defineComponent({
  data() {
    return {
      invoices: [] as Array<any>, // Update with your invoice model
      clientId: '66cf13c3a76252f35d46c8fb', // This is for testing purposes
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
        }
      },
      companyId: '',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      merchant_id: '10000100',
      merchant_key: '46f0cd694581a',
      passPhrase: 'jt7NOE43FZPn',
      return_url: 'https://tuksapi.sharpsoftwaresolutions.net/client-portal/SuccessfulPayment',
      cancel_url: 'https://tuksapi.sharpsoftwaresolutions.net/client-portal',
      notify_url: 'https://tuksapi.sharpsoftwaresolutions.net/client-portal/SuccessfulPayment',
      testingMode: true,
      pfHost: 'https://sandbox.payfast.co.za/eng/process',
      forms: {} as { [key: string]: any }
    }
  },
  methods: {
    generateSignature(invoice: any): string {
      // Create parameter string
      const data: { [key: string]: string | number | any } = {
        merchant_id: this.merchant_id,
        merchant_key: this.merchant_key,
        return_url: this.return_url,
        cancel_url: this.cancel_url,
        notify_url: this.notify_url,
        name_first: this.client.details.firstName,
        name_last: this.client.details.lastName,
        email_address: this.client.details.contactInfo.email,
        m_payment_id: invoice._id,
        amount:invoice.total,
        item_name: invoice.invoiceNumber
      }
      let pfOutput = ''
      for (const key in data) {
        let value = data[key as keyof typeof data]
        value = value.toString().trim()
        pfOutput += `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}&`
      }
      // Remove last ampersand
      let getString = pfOutput.slice(0, -1)
      //adding the passphrase
      if (this.passPhrase !== null) {
        getString += `&passphrase=${encodeURIComponent(this.passPhrase.trim())}`
      }
      console.log('getString:', getString)
      return MD5(getString).toString()
    },
    submitPaymentForm(invoiceId: number) {
      const form = document.getElementById('paymentForm' + invoiceId) as HTMLFormElement
      // console.log('Form:', form)
      if (form) {
        form.submit()
      } else {
        // console.error('Form not found for invoice:', invoiceId)
      }
    },
    async getRequests() {
      if (localStorage.getItem('clientId') !== null) {
        this.clientId = localStorage.getItem('clientId') as string
      }

      // Getting the client info
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = await this.getRequestUrl()
      await axios
        .get(`${url}client/clientPortal/id/${this.clientId}`, config)
        .then((response) => {
          this.client = response.data.data
          // console.log('Client:', this.client)
        })
        .catch((error) => {
          console.error(error)
        })

      this.companyId = this.client.details.companyId

      if (this.companyId !== '66cdad718554b49834a56eed') {
        this.testingMode = false
        this.pfHost = 'www.payfast.co.za'
      }

      // Getting the company info
      await axios
        .get(`${url}company/id/${this.companyId}`, config)
        .then((response) => {
          this.merchant_id = response.data.data.accountDetails.merchantId
          this.merchant_key = response.data.data.accountDetails.merchantKey
        })
        .catch((error) => {
          console.error(error)
        })

      // Getting the invoices
      await axios
        .get(`${url}invoice/all/forClient/${this.clientId}`, config)
        .then((response) => {
          // console.log('Invoices:', response)
          this.invoices = response.data.data
          // for (const invoice of this.invoices) {
          //   this.forms[invoice._id] = this.generateHtmlForm(invoice._id)
          // }
        })
        .catch((error) => {
          console.error(error)
        })
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
