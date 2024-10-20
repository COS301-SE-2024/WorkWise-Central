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
              Pay Now </v-btn
            ><v-btn color="primary" @click="formatPdfData(invoice)"> View Invoice </v-btn>
          </v-list-item-action>
         <v-dialog persistent v-model="dialog" max-width="600">
            <v-card class="bg-cardColor">
              <v-card-title>
                <v-icon>mdi-file-document-outline</v-icon>
                <span>Invoice Details</span>
              </v-card-title>
              <v-card-text>
                <!-- Embed the PDF inside an iframe -->
                <v-row>
                  <v-col cols="12">
                    <iframe v-if="pdfSrc" :src="pdfSrc" style="width: 100%; height: 500px"></iframe>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-container
                  ><v-row
                    ><v-col cols="12">
                      <v-btn color="error" block @click="dialog = false"
                        ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Close</v-btn
                      ></v-col
                    ></v-row
                  ></v-container
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="js">
import axios from 'axios'
import { defineComponent } from 'vue'
import CryptoJS from 'crypto-js'
import { API_URL } from '@/main'
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template/index'

export default defineComponent({
  data() {
    return {
      dialog: false,
      invoices: [], // Update with your invoice model
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
      testRoute: '',
      companyId: '',
      merchant_id: '',
      merchant_key: '',
      passPhrase: '',
      return_url: 'https://tuksui.sharpsoftwaresolutions.net/client-portal?cId=',
      cancel_url: 'https://tuksui.sharpsoftwaresolutions.net/client-portal?cId=',
      notify_url: 'https://tuksapi.sharpsoftwaresolutions.net/payfast/notify',
      testingMode: true,
      pfHost: 'sandbox.payfast.co.za',
      forms: {}
    }
  },
  methods: {
    formatPdfData(payload) {
      console.log(payload)
      this.invoiceGeneration({
        id: payload._id,
        invoiceNumber: payload.invoiceNumber,
        invoiceDate: this.formatDate(payload.invoiceDate),
        paymentDate: this.formatDate(payload.paymentDate),
        subTotal: Number(payload.subTotal.toFixed(2)),
        total: Number(payload.total.toFixed(2)),
        taxAmount: Number(payload.taxAmount.toFixed(2)),
        taxPercentage: payload.taxPercentage,
        paid: payload.paid,
        clientId: payload.clientId._id,
        clientName: payload.clientId.details.firstName + ' ' + payload.clientId.details.lastName,
        jobName: payload.jobId.details.heading,
        clientAddress:
          payload.clientId.details.address.province +
          ', ' +
          payload.clientId.details.address.city +
          ', ' +
          payload.clientId.details.address.suburb +
          ', ' +
          payload.clientId.details.address.street +
          ', ' +
          payload.clientId.details.address.postalCode,
        clientEmail: payload.clientId.details.contactInfo.email,
        clientPhoneNumber: payload.clientId.details.contactInfo.phoneNumber,
        companyName: payload.companyId.name,
        companyAddress:
          payload.clientId.details.address.province +
          ', ' +
          payload.companyId.address.city +
          ', ' +
          payload.companyId.address.suburb +
          ', ' +
          payload.companyId.address.street +
          ', ' +
          payload.companyId.address.postalCode,
        companyEmail: payload.companyId.contactDetails.email,
        companyPhoneNumber: payload.companyId.contactDetails.phoneNumber,
        companyLogo: payload.companyId.logo,
        inventoryItems: payload.inventoryItems.map((obj) => [
          obj.description,
          obj.quantity,
          obj.unitPrice,
          obj.discount,
          Number(obj.total.toFixed(2))
        ]),
        laborItems: payload.laborItems.map((obj) => [
          obj.description,
          Number(obj.quantity.toFixed(2)),
          obj.unitPrice,
          obj.discount,
          Number(obj.total.toFixed(2))
        ])
      })
    },
    invoiceGeneration(payload) {
      try {
        if (payload.laborItems.length != 0) {
          payload.inventoryItems.push(['', '', '', '', ''])
          payload.inventoryItems.push(['Description', 'Hours', 'Hourly Rate', 'Discount', 'Total'])
          payload.inventoryItems.unshift([
            'Description',
            'Quantity',
            'Unit Price',
            'Discount',
            'Total'
          ])
          payload.inventoryItems = payload.inventoryItems.concat(payload.laborItems)
          payload.inventoryItems.push(['', '', '', '', ''])
        }
        const data = {
          outputType: OutputType.Blob, // Generate the PDF as a Blob to embed it
          fileName: `Invoice ${payload.companyName}`,
          orientationLandscape: false,
          compress: true,
          logo: {
            src: payload.companyLogo,
            type: 'PNG',
            width: 53.33,
            height: 26.66,
            margin: {
              top: 0,
              left: 0
            }
          },
          stamp: {
            inAllPages: true,
            src: payload.companyLogo,
            type: 'JPG',
            width: 20,
            height: 20,
            margin: {
              top: 0,
              left: 0
            }
          },
          business: {
            name: payload.companyName,
            address: payload.companyAddress,
            phone: payload.companyPhoneNumber,
            email: payload.companyEmail
          },
          contact: {
            label: 'Invoice issued for:',
            name: payload.clientName,
            address: payload.clientAddress,
            phone: payload.clientPhoneNumber,
            email: payload.clientEmail,
            otherInfo: 'www.website.al'
          },
          invoice: {
            label: `Invoice #:`,
            num: payload.invoiceNumber,
            invDate: `Payment Date: ${this.formatDate(payload.paymentDate)}`,
            invGenDate: `Invoice Date:  ${this.formatDate(payload.invoiceDate)}`,
            headerBorder: false,
            tableBodyBorder: false,
            header: [{ title: '' }, { title: '' }, { title: '' }, { title: '' }, { title: '' }],
            table: payload.inventoryItems,
            additionalRows: [
              {
                col1: 'Total:',
                col2: `${payload.total}`,
                col3: 'R',
                style: {
                  fontSize: 14
                }
              },
              {
                col1: 'VAT:',
                col2: `${payload.taxPercentage}`,
                col3: '%',
                style: {
                  fontSize: 10
                }
              },
              {
                col1: 'SubTotal:',
                col2: `${payload.subTotal}`,
                col3: 'R',
                style: {
                  fontSize: 10
                }
              }
            ],
            invDescLabel: 'Invoice Note',
            invDesc: 'Thank you for your business. Please make the payment by the due date.'
          },
          footer: {
            text: 'The invoice is created on a computer and is valid without the signature and stamp.'
          },
          pageEnable: true,
          pageLabel: 'Page '
        }
        console.log(data)
        const pdf = jsPDFInvoiceTemplate(data)
        console.log(pdf)
        const blb = pdf.blob
        console.log(blb)
        this.pdfSrc = URL.createObjectURL(blb)
        this.dialog = true
        console.log(this.pdfSrc)
      } catch (error) {
        console.log('Error fetching data: ' + error)
      }
    },
    generateSignature(invoice) {
      // Create parameter string
      const data = {
        merchant_id: this.merchant_id,
        merchant_key: this.merchant_key,
        return_url: this.return_url,
        cancel_url: this.cancel_url,
        notify_url: this.notify_url,
        name_first: this.client.details.firstName,
        name_last: this.client.details.lastName,
        email_address: this.client.details.contactInfo.email,
        m_payment_id: invoice._id,
        amount: invoice.total,
        item_name: invoice.invoiceNumber
      }
      let pfOutput = ''
      for (const key in data) {
        let value = data[key]
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
      return CryptoJS.MD5(getString).toString()
    },
    submitPaymentForm(invoiceId) {
      const form = document.getElementById('paymentForm' + invoiceId)
      // console.log('Form:', form)
      if (form) {
        form.submit()
      } else {
        // console.error('Form not found for invoice:', invoiceId)
      }
    },
    async getRequests() {
      if (localStorage.getItem('clientId') !== null) {
        this.clientId = localStorage.getItem('clientId')

      }

      this.return_url = this.return_url + this.clientId
      this.cancel_url = this.cancel_url + this.clientId


      console.log('this.return_url: ', this.return_url)
      console.log('this.cancel_url: ', this.cancel_url)

      // Getting the client info
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`${API_URL}client/clientPortal/id/${this.clientId}`, config)
        .then((response) => {
          this.client = response.data.data
          // console.log('Client:', this.client)
        })
        .catch((error) => {
          console.error(error)
        })

      this.companyId = this.client.details.companyId

      // Getting the company info
      await axios
        .get(`${API_URL}company/id/${this.companyId}`, config)
        .then((response) => {
          if (response.data.data.name.includes('DemoAccount')) {
            this.testingMode = true
            this.pfHost = 'https://sandbox.payfast.co.za/eng/process'
          }
        })
        .catch((error) => {
          console.error(error)
        })

      // Getting the company info
      await axios
        .get(`${API_URL}company/id/${this.companyId}/accountDetails`, config)
        .then((response) => {
          this.merchant_id = response.data.data.merchantId
          this.merchant_key = response.data.data.merchantKey
          this.passPhrase = response.data.data.passPhrase
        })
        .catch((error) => {
          console.error(error)
        })

      // Getting the invoices
      await axios
        .get(`${API_URL}invoice/all/forClient/${this.clientId}`, config)
        .then((response) => {
          // console.log('Invoices:', response)
          this.invoices = response.data.data
          for (const invoice of this.invoices) {
            invoice.paymentDate = this.formatDate(invoice.paymentDate)
            invoice.total = Number(invoice.total.toFixed(2))
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    formatDate(date) {
      const date_passed_in = new Date(date)
      const y = date_passed_in.getFullYear()
      const m = String(date_passed_in.getMonth() + 1).padStart(2, '0')
      const d = String(date_passed_in.getDate()).padStart(2, '0')
      const h = String(date_passed_in.getHours()).padStart(2, '0')
      const mn = String(date_passed_in.getMinutes()).padStart(2, '0')
      const f_date = `${y}-${m}-${d} ${h}:${mn}`
      console.log('f_date: ', f_date)
      return f_date
    }
  },
  mounted() {
    if (sessionStorage.getItem('clientId') !== null) {
      this.clientId = sessionStorage.getItem('clientId')
    }
    this.getRequests()
  }
})
</script>
