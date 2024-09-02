<template>
  <v-container>
    <v-btn color="primary" @click="generatePdf">
      Generate PDF
    </v-btn>

    <!-- Hidden content to be converted to PDF -->
    <div ref="invoiceContent" class="hidden-content">
      <v-card>
        <v-card-title>Invoice</v-card-title>
        <v-card-subtitle>
          <div>{{ companyName }}</div>
          <div>{{ companyAddress }}</div>
        </v-card-subtitle>

        <v-card-text>
          <div>
            <strong>Customer Details:</strong>
            <div>{{ customerName }}</div>
            <div>{{ customerAddress }}</div>
          </div>

          <div>
            <strong>Invoice Date:</strong> {{ invoiceDate }}
          </div>

          <div>
            <strong>Job:</strong> {{ jobTitle }}
          </div>

          <v-table>
            <thead>
            <tr>
              <th>Action</th>
              <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(action, index) in actions" :key="index">
              <td>{{ action.name }}</td>
              <td>{{ formatCurrency(action.amount) }}</td>
            </tr>
            </tbody>
          </v-table>

          <v-divider></v-divider>

          <div class="text-right mt-3">
            <strong>Total:</strong> {{ formatCurrency(totalAmount) }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import html2pdf from 'html2pdf.js';

export default {
  data() {
    return {
      companyName: "Your Company Name",
      companyAddress: "1234 Street, City, Country",
      customerName: "John Doe",
      customerAddress: "5678 Customer St, City, Country",
      invoiceDate: new Date().toLocaleDateString(),
      jobTitle: "Job #1234: Website Development",
      actions: [
        { name: "Initial Consultation", amount: 100 },
        { name: "Website Design", amount: 500 },
        { name: "Development", amount: 1200 },
        { name: "Testing", amount: 300 },
      ],
    };
  },
  computed: {
    totalAmount() {
      return this.actions.reduce((total, action) => total + action.amount, 0);
    },
  },
  methods: {
    generatePdf() {
      const element = this.$refs.invoiceContent;

      const options = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().from(element).set(options).save();
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "R",
      }).format(value);
    },
  },
};
</script>

<style scoped>
.hidden-content {
  display: none;
}
.text-right {
  text-align: right;
}
</style>
