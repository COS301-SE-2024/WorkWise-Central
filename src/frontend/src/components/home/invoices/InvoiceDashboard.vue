<template>
  <v-container fluid fill-height>
    <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row align="center" justify="space-between">
          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-icon icon="fa: fa-solid fa-file-invoice"></v-icon>
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Company Invoices</v-label
            >
          </v-col>

          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              color="primary"
              width="100%"
              hide-details="auto"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="invoiceHeaders"
          :items="invoiceItems"
          :search="search"
          height="auto"
          :row-props="getRowProps"
          :header-props="{ class: 'bg-secondRowColor h6' }"
          class="bg-cardColor"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="text-none font-weight-regular"
                  color="warning"
                  @click="selectInvoice(item)"
                >
                  <v-icon start color="primary" size="small">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <ViewInvoice :invoice="selectedItem" />
                </v-list-item>
                <v-list-item>
                  <EditInvoice :editedInvoice="selectedItem" :invoice_id="selectedItem._id" />
                </v-list-item>
                <v-list-item>
                  <DeleteInvoice :invoice_id="selectedItem._id" />
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import DeleteInvoice from './DeleteInvoice.vue'
import EditInvoice from './EditInvoice.vue'
import ViewInvoice from './ViewInvoices.vue'

interface Invoice {
  _id: string
  number: string
  date: string
  amount: number
  status: string
}

export default defineComponent({
  name: 'CompanyInvoices',
  data() {
    return {
      invoiceHeaders: [
        { title: 'Invoice Number', value: 'number', sortable: true, key: 'number' },
        { title: 'Date', value: 'date', sortable: true, key: 'date' },
        { title: 'Amount', value: 'amount', sortable: true, key: 'amount' },
        { title: 'Status', value: 'status', sortable: true, key: 'status' },
        { title: '', value: 'actions', key: 'actions', sortable: false, class: 'my-header-style' }
      ],
      invoiceItems: [
        {
          _id: '1',
          number: 'INV-001',
          date: '2021-09-01',
          amount: 1000,
          status: 'Paid'
        },
        {
          _id: '2',
          number: 'INV-002',
          date: '2021-09-02',
          amount: 2000,
          status: 'Unpaid'
        }
      ] as Invoice[],
      search: '',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      selectedItem: {} as Invoice
    }
  },
  components: { DeleteInvoice, EditInvoice, ViewInvoice },
  methods: {
    async getInvoices() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployee: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(`${apiURL}invoice/all`, config)
        console.log(response.data.data)
        this.invoiceItems = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    viewInvoice(invoice: Invoice) {
      console.log('Viewing invoice:', invoice)
      // Implement the view functionality
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    selectInvoice(invoice: Invoice) {
      this.selectedItem = invoice
    },
    getRowProps(index: any) {
      return {
        class: index % 2 === 0 ? 'bg-secondRowColor' : ''
      }
    }
  },
  mounted() {
    this.getInvoices()
  }
})
</script>
