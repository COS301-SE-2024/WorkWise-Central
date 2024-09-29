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
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px">Invoice Number</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{
              LocalInvoice?.invoiceNumber
            }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px">Date</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{
              LocalInvoice?.creationDate
            }}</small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px">Amount</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ LocalInvoice?.total }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px">Status</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{
              LocalInvoice?.paid ? 'Paid' : 'Unpaid'
            }}</small>
          </v-col>
        </v-row>

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
      this.generatePdf()
    },
    generatePdf() {
      const props = {
        outputType: OutputType.Blob, // Generate the PDF as a Blob to embed it
        fileName: 'Invoice_2024',
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

      // Create an Object URL for the PDF to view in the iframe
      const v = jsPDFInvoiceTemplate(props).blob
      console.log(v)
      this.pdfSrc = URL.createObjectURL(v)
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
