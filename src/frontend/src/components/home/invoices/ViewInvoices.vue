<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        color="success"
        v-bind="activatorProps"
        @click="openDialog"
      >
        <v-icon start color="success" size="small">mdi-eye</v-icon>
        View
      </v-btn>
    </template>
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon>mdi-file-document-outline</v-icon>
        <span>Invoice Details</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <iframe v-if="pdfSrc" :src="pdfSrc" style="width: 100%; height: 600px"></iframe>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-container
          ><v-row
            ><v-col cols="12">
              <v-btn color="error" block @click="close"
                ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Close</v-btn
              ></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'

export default {
  name: 'InvoiceDetails',
  props: {
    invoice: Object
  },
  data() {
    return {
      dialog: false,
      LocalInvoice: this.invoice,
      pdfSrc: '' // Store generated PDF URL for viewing
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
      this.generatePdf(this.LocalInvoice)
    },
    generatePdf(payload) {
      console.log("payload", payload)
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
            invGenDate: `Invoice Date:  ${this.formatDate(payload.creationDate)}`,
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
    formatDate(date) {
      const date_passed_in = new Date(date)
      const y = date_passed_in.getFullYear()
      const m = String(date_passed_in.getMonth() + 1).padStart(2, '0')
      const d = String(date_passed_in.getDate()).padStart(2, '0')
      const h = String(date_passed_in.getHours()).padStart(2, '0')
      const mn = String(date_passed_in.getMinutes()).padStart(2, '0')
      const f_date = `${y}-${m}-${d} ${h}:${mn}`
      return f_date
    },
    close() {
      //wiping add the data
      this.dialog = false,
      this.pdfSrc = '',
      this.LocalInvoice = {}
    },
    downloadPdf() {
      const props = {
        outputType: OutputType.Save, // Generate the PDF as a Blob to embed it
        fileName: 'Invoice_2021',
        orientationLandscape: false,
        compress: true,
        logo: {
          src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png',
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
          src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
          type: 'JPG',
          width: 20,
          height: 20,
          margin: {
            top: 0,
            left: 0
          }
        },
        business: {
          name: 'Business Name',
          address: '1234 Business Street, City, Country',
          phone: '(+355) 069 11 11 111',
          email: 'email@example.com',
          email_1: 'info@example.al',
          website: 'www.example.al'
        },
        contact: {
          label: 'Invoice issued for:',
          name: 'Client Name',
          address: '5678 Client Address, City, Country',
          phone: '(+355) 069 22 22 222',
          email: 'client@website.al',
          otherInfo: 'www.website.al'
        },
        invoice: {
          label: 'Invoice #: ',
          num: 19,
          invDate: 'Payment Date: 01/01/2021 18:12',
          invGenDate: 'Invoice Date: 02/02/2021 10:17',
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            { title: 'Invoice Number', style: { width: 10 } },
            { title: 'Job Title', style: { width: 30 } },
            { title: 'Client Name', style: { width: 80 } },
            { title: 'Payment Date' },
            { title: 'Paid' },
            { title: 'Creation Date' },
            { title: 'Total' }
          ],
          table: [
            [1, 'Design Work', 'Initial design concept for website', 300, 2, 'hours', 600],
            [2, 'Development', 'Frontend and backend development', 700, 5, 'hours', 3500],
            [3, 'Testing', 'Testing and bug fixing', 200, 3, 'hours', 600]
          ],
          additionalRows: [
            {
              col1: 'Total:',
              col2: '4700.00',
              col3: 'USD',
              style: {
                fontSize: 14
              }
            },
            {
              col1: 'VAT:',
              col2: '20',
              col3: '%',
              style: {
                fontSize: 10
              }
            },
            {
              col1: 'SubTotal:',
              col2: '3760.00',
              col3: 'USD',
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

      jsPDFInvoiceTemplate(props)
    }
  }
}
</script>

<style scoped>
/* Additional styles for better visuals */
.bg-cardColor {
  background-color: #f5f5f5;
}
</style>
