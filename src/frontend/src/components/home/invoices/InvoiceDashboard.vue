<template>
  <v-container fluid fill-height>
    <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row align="center" justify="space-between">
          <!-- Invoice Label -->
          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-icon icon="fa: fa-solid fa-file"></v-icon>
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Invoice Details</v-label
            >
          </v-col>

          <!-- Centered Search Bar -->
          <v-col cols="12" lg="4" class="d-flex justify-center">
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

          <!-- Save button -->
          <v-col cols="12" lg="4" class="d-flex align-center justify-end">
            <v-btn
              class="text-none font-weight-regular hello"
              color="secondary"
              block
              variant="elevated"
              @click="showGenerateInvoice"
            >
              <v-icon icon="fa: fa-solid fa-plus" color="white"></v-icon>
              generate invoice
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>

      <!-- Table Content -->
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
          <template v-slot:[`item.creationDate`]="{ item }">{{
            formatDate(item.creationDate)
          }}</template>
          <template v-slot:[`item.paymentDate`]="{ item }">{{
            formatDate(item.paymentDate)
          }}</template>

          <template v-slot:[`item.sentDate`]="{ item }">{{
            formatDate(item.sentDate)
          }}</template>

          <template v-slot:[`item.paidDate`]="{ item }">{{
            formatDate(item.paidDate)
          }}</template>

          <template v-slot:[`item.paid`]="{ item }">{{
            formatStatus(item.paid)
          }}</template>

          <template v-slot:[`item.sent`]="{ item }">{{
            formatSend(item.sent)
          }}</template>

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
                  <SendInvoice :invoice_id="selectedItem._id" :client-name="selectedItem.clientName"/>
                </v-list-item>
                <v-list-item>
                  <ViewInvoice :invoice="selectedItem" />
                </v-list-item>
                <v-list-item>
                  <EditInvoice :editedInvoice="selectedItem" :invoice_id="selectedItem._id" />
                </v-list-item>
                <v-list-item>
                  <DeleteInvoice :invoice_id="selectedItem._id" @InvoiceDeleted="getRequests" />
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Modal for Generate Invoice -->
    <v-dialog v-model="isModalVisible" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Generate Invoice</v-card-title>
        <v-card-text>
          <!-- Dropdown for selecting job -->
           <v-select
                clearable
                label="Jobs"
                hint="Select the job for which you want to generate an invoice"
                persistent-hint
                :items="jobs"
                item-value="_id"
                item-title="name"
                v-model="selectedJob"
                bg-color="background"
                variant="solo"
              ></v-select>
          <p v-if="!selectedJob">Please select a job to generate an invoice.</p>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" order="first" order-lg="last">
                <v-btn
                  color="success"
                  rounded="md"
                  width="100%"
                  height="35"
                  variant="text"
                  type="submit"
                  block
                  @click="generateInvoice"
                  :disabled="!selectedJob"
                >
                  <v-icon
                    icon="fa:fa-solid fa-floppy-disk"
                    start
                    color="success"
                    size="small"
                  ></v-icon>
                  generate invoice
                </v-btn>
              </v-col>
              <v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn
                  color="error"
                  rounded="md"
                  width="100%"
                  height="35"
                  variant="text"
                  block
                  @click="close"
                >
                  <Toast position="top-center" />
                  <v-icon icon="fa:fa-solid fa-cancel" color="error" size="small" start></v-icon
                  >Cancel
                </v-btn>
              </v-col></v-row
            >
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import DeleteInvoice from './DeleteInvoice.vue'
import EditInvoice from './EditInvoice.vue'
import ViewInvoice from './ViewInvoices.vue'
import { API_URL } from '@/main'
import Toast from 'primevue/toast'
import SendInvoice from './SendInvoice.vue'

interface Invoice {
  _id: string
  invoiceNumber: string
  creationDate: Date
  paymentDate: Date
  total: number
  paid: boolean
  paidDate: Date
  sent: boolean
  sentDate: Date
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
        { title: 'Sent', value: 'sent', sortable: true, key: 'sent' },
        { title: 'Sent date', value: 'sentDate', sortable: true, key: 'sentDate' },
        { title: 'Paid', value: 'paid', sortable: true, key: 'paid' },
        { title: 'Paid date', value: 'paidDate', sortable: true, key: 'paidDate' },
        { title: '', value: 'actions', key: 'actions', sortable: false, class: 'my-header-style' },
      ],
      invoiceItems: [] as Invoice[],
      search: '',
      selectedItem: {} as Invoice,
      companyId: '',
      currentEmployee: '',
      isModalVisible: false,
      jobs: [] as any[],
      selectedJob: null,
    }
  },
  components: { DeleteInvoice, EditInvoice, ViewInvoice, Toast, SendInvoice},
  methods: {
    formatDate(dateString: any) {
      if(!dateString) return ''
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', options)
    },
    formatStatus(status: boolean) {
      return status ? 'Paid' : 'Unpaid'
    },
    formatSend(send: boolean) {
      return send ? 'Sent' : 'Unsent'
    },
    async getRequests() {
      // Getting all the jobs for the company
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      
      if (localStorage.getItem('currentCompany') !== null) {
        this.companyId = localStorage.getItem('currentCompany') as string
      }
      if (localStorage.getItem('employeeId') !== null) {
        this.currentEmployee = localStorage.getItem('employeeId') as string
      }
      await axios
        .get(`${API_URL}invoice/all/detailed/${this.currentEmployee}`, config)
        .then((response) => {
          console.log('response: ', response)
          for (const invoice of response.data.data) {
            this.invoiceItems.push({
              _id: invoice._id,
              invoiceNumber: invoice.invoiceNumber,
              creationDate: invoice.invoiceDate as any,
              paymentDate: invoice.paymentDate as any,
              total: invoice.total,
              paid: invoice.paid,
              clientName:
                invoice.clientId.details.firstName + ' ' + invoice.clientId.details.lastName,
              jobTitle: invoice.jobId.details.heading,
              sent: invoice.sent,
              sentDate: invoice.sentDate as any,
              paidDate: invoice.paidDate as any
            })
          }
          console.log('this.invoiceItems: ', this.invoiceItems)
        })
        .catch((error) => {
          console.error(error)
        })

         try {
        await axios
        .get(`${API_URL}job/all/company/${localStorage.getItem('currentCompany')}?currentEmployeeId=${localStorage.getItem('employeeId')}`, config)
        .then((response) => {
          console.log('response.data.data: ', response.data.data)
          for (const job of response.data.data) {
            console.log('job: ', job)
            this.jobs.push({
              _id: (job as any)._id,
              name: (job as any).details.heading
            })
          }
          console.log('this.jobs: ', this.jobs)
          setTimeout(() => {
          }, 3000)
        })
      } catch (error) {
        console.error(error)
      }
    },
    async generateInvoice() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`${API_URL}invoice/generate/${localStorage.getItem('employeeId')}/${this.selectedJob}`, config)
        .then((response) => {
          console.log('response: ', response)
          this.invoiceItems = []  
          this.getRequests()
          this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Edited Successfully',
          life: 3000
        })
          this.close()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    showGenerateInvoice() {
      this.isModalVisible = true;
    },
    close() {
      this.isModalVisible = false;
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
