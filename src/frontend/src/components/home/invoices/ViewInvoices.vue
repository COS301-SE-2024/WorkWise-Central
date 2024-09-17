<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular" color="success" v-bind="activatorProps">
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
            <small class="text-caption" style="font-size: 12px">{{ LocalInvoice?.number }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px">Date</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ LocalInvoice?.date }}</small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px">Amount</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ LocalInvoice?.amount }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px">Status</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ LocalInvoice?.status }}</small>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'InvoiceDetails',
  props: {
    invoice: Object
  },
  data() {
    return {
      dialog: false,
      LocalInvoice: this.invoice
    }
  },
  methods: {
    close() {
      this.dialog = false
    }
  }
}
</script>
