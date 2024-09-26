<template>
  <div>
    <!-- Vuetify Button to Generate PDF Invoice -->
<!--    <v-btn @click="generatePdf" color="primary"> Generate PDF Invoice </v-btn>-->
    <Button @click="generatePdf" label="Generate PDF Invoice" icon="fa: fa-solid fa-file-pdf" class="p-button-success"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'
import Button from 'primevue/button'
import axios from 'axios'
import { API_URL } from '@/main'

const props = defineProps({
  jobID: String
})

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const formatDate = (date) => {
  const date_passed_in = new Date(date)
  const y = date_passed_in.getFullYear()
  const m = String(date_passed_in.getMonth() + 1).padStart(2, '0')
  const d = String(date_passed_in.getDate()).padStart(2, '0')
  const h = String(date_passed_in.getHours()).padStart(2, '0')
  const mn = String(date_passed_in.getMinutes()).padStart(2, '0')
  const f_date = `${y}-${m}-${d} ${h}:${mn}`
  return f_date
}
// Function to Generate PDF
const generatePdf = async () => {
  let invoiceData
  try {
    const response = await axios.get(`${API_URL}invoice/generate/${localStorage.getItem('employeeId')}/${props.jobID}`,config)
    invoiceData = response.data.data
    console.log('Returned invoice:', invoiceData)
  } catch (error) {
    console.error(error)
  }

  const data = {
    outputType: OutputType.Save, // Generate the PDF as a Blob to embed it
    fileName: `Invoice ${invoiceData.companyName}`,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: invoiceData.companyLogo,
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
      src: invoiceData.companyLogo,
      type: 'JPG',
      width: 20,
      height: 20,
      margin: {
        top: 0,
        left: 0
      }
    },
    business: {
      name: invoiceData.companyName,
      address: invoiceData.companyAddress,
      phone: invoiceData.companyPhoneNumber,
      email: invoiceData.companyEmail
    },
    contact: {
      label: 'Invoice issued for:',
      name: invoiceData.clientName,
      address: invoiceData.clientAddress,
      phone: invoiceData.clientPhoneNumber,
      email: invoiceData.clientEmail,
      otherInfo: 'www.website.al'
    },
    invoice: {
      label: `Invoice #: ${invoiceData.invoiceNumber}`,
      num: 19,
      invDate: `Payment Date: ${formatDate(invoiceData.paymentDate)}`,
      invGenDate: `Invoice Date:  ${formatDate(invoiceData.invoiceDate)}`,
      headerBorder: false,
      tableBodyBorder: false,
      header: [{ title: '' }, { title: '' }, { title: '' }, { title: '' }],
      table: invoiceData.inventoryItems,
      additionalRows: [
        {
          col1: 'Total:',
          col2: `${invoiceData.total}`,
          col3: 'R',
          style: {
            fontSize: 14
          }
        },
        {
          col1: 'VAT:',
          col2: `${invoiceData.taxPercentage}`,
          col3: '%',
          style: {
            fontSize: 10
          }
        },
        {
          col1: 'SubTotal:',
          col2: `${invoiceData.subTotal}`,
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

  // Generate the PDF using the template
  jsPDFInvoiceTemplate(data)
}
</script>


<style scoped>
/* No display-specific styles are needed since we're not displaying data */
</style>
