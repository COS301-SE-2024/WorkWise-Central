<template>
  <div>
    <!-- Vuetify Button to Generate PDF Invoice -->
    <v-btn @click="generatePdf" color="primary">
      Generate PDF Invoice
    </v-btn>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { VBtn } from 'vuetify/components';
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template';

export default {
  name: 'InvoiceGenerator',
  components: {
    VBtn,
  },
  setup() {
    // Function to Generate PDF
    const generatePdf = () => {
      const props = {
        outputType: OutputType.Save,
        fileName: "Invoice",
        orientationLandscape: false,
        compress: true,
        logo: {
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
          type: 'PNG',
          width: 53.33,
          height: 26.66,
          margin: {
            top: 0,
            left: 0,
          }
        },
        stamp: {
          inAllPages: true,
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG',
          width: 20,
          height: 20,
          margin: {
            top: 0,
            left: 0
          }
        },
        business: {
          name: "Business Name",
          address: "1234 Business Street, City, Country",
          phone: "(+355) 069 11 11 111",
          email: "email@example.com",
          email_1: "info@example.al",
          website: "www.example.al",
        },
        contact: {
          label: "Invoice issued for:",
          name: "Client Name",
          address: "5678 Client Address, City, Country",
          phone: "(+355) 069 22 22 222",
          email: "client@website.al",
          otherInfo: "www.website.al",
        },
        invoice: {
          label: "Invoice #: ",
          num: 19,
          invDate: "Payment Date: 01/01/2021 18:12",
          invGenDate: "Invoice Date: 02/02/2021 10:17",
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            { title: "#", style: { width: 10 } },
            { title: "Title", style: { width: 30 } },
            { title: "Description", style: { width: 80 } },
            { title: "Price" },
            { title: "Quantity" },
            { title: "Unit" },
            { title: "Total" }
          ],
          table: [
            [1, "Design Work", "Initial design concept for website", 300, 2, "hours", 600],
            [2, "Development", "Frontend and backend development", 700, 5, "hours", 3500],
            [3, "Testing", "Testing and bug fixing", 200, 3, "hours", 600]
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
          invDescLabel: "Invoice Note",
          invDesc: "Thank you for your business. Please make the payment by the due date."
        },
        footer: {
          text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      };

      // Generate the PDF using the template
      jsPDFInvoiceTemplate(props);
    };

    return {
      generatePdf,
    };
  },
};
</script>

<style scoped>
/* No display-specific styles are needed since we're not displaying data */
</style>
