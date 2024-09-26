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
          <template v-slot:[`item.total`]="{ item }">R{{ item.total }}</template>
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
  invoiceNumber: string
  creationDate: string
  paymentDate: string
  total: number
  paid: boolean
  clientName: string
  jobTitle: string
}

export default defineComponent({
  name: 'CompanyInvoices',
  data() {
    return {
      invoiceHeaders: [
        { title: 'Invoice Number', value: 'invoiceNumber', sortable: true, key: 'invoiceNumber' },
        { title: 'Client', value: 'clientName', sortable: true, key: 'clientName' },
        { title: 'Job', value: 'jobTitle', sortable: true, key: 'jobTitle' },
        { title: 'Creation date', value: 'creationDate', sortable: true, key: 'creationDate' },
        { title: 'Payment due date', value: 'paymentDate', sortable: true, key: 'paymentDate' },
        { title: 'Amount', value: 'total', sortable: true, key: 'total' },
        { title: 'Status', value: 'paid', sortable: true, key: 'paid' },
        { title: '', value: 'actions', key: 'actions', sortable: false, class: 'my-header-style' }
      ],
      invoiceItems: [] as Invoice[],
      search: '',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      selectedItem: {} as Invoice,
      companyId: '',
      currentEmployee: ''
    }
  },
  components: { DeleteInvoice, EditInvoice, ViewInvoice },
  methods: {
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
    },
    formatDate (dateString: string) {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', options)
    },
    async getRequests() {
      // Getting all the jobs for the company
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = await this.getRequestUrl()
      if (localStorage.getItem('currentCompany') !== null) {
        this.companyId = localStorage.getItem('currentCompany') as string
      }
      if (localStorage.getItem('employeeId') !== null) {
        this.currentEmployee = localStorage.getItem('employeeId') as string
      }
      await axios
        .get(`${url}invoice/all/detailed/${this.currentEmployee}`, config)
        .then((response) => {
          console.log('response: ', response)
          for (const invoice of response.data.data) {
            this.invoiceItems.push({
              _id: invoice._id,
              invoiceNumber: invoice.invoiceNumber,
              creationDate: this.formatDate(invoice.invoiceDate),
              paymentDate: this.formatDate(invoice.paymentDate),
              total: invoice.total,
              paid: invoice.paid,
              clientName:
                invoice.clientId.details.firstName + ' ' + invoice.clientId.details.lastName,
              jobTitle: invoice.jobId.details.heading
            })
          }
          console.log('this.invoiceItems: ', this.invoiceItems)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    viewInvoice(invoice: Invoice) {
      console.log('Viewing invoice:', invoice)
      // Implement the view functionality
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
    this.getRequests()
  }
})
</script>
