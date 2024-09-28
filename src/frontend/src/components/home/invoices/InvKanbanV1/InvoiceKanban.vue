<template>
  <v-container fluid>
    <v-row>
      <VueDraggable
        class="d-flex flex-nowrap flex flex-col gap-2 p-4 w-600px h-800px m-auto bg-gray-500/5 rounded overflow-auto"
        ref="el"
        v-model="columns"
        :onUpdate="onColumnDragEnd"
        group="columns"
        :animation="150"
        ghostClass="ghost"
        :scroll="true"
        :disabled="true"
      >
        <v-col
          v-for="column in columns"
          :key="column._id"
          role="listbox"
          aria-dropeffect="move"
          :sm="6"
          :cols="12"
        >
          <v-card
            variant="flat"
            elevation="1"
            color="red"
            :min-width="350"
            :max-height="800"
            class="overflow-auto"
          >
            <v-card-item
              class="font-weight-black text-h5"
              style="font-family: 'Nunito', sans-serif"
              align="center"
            >
              <v-icon class="pr-1" :color="column.colour">{{ 'fa: fa-solid fa-cube' }}</v-icon>
              {{ column.status }}
              <v-chip class="text-subtitle-1 font-weight-black" variant="tonal">
                {{ column.cards.length }}
              </v-chip>
            </v-card-item>
            <v-card-text>
              <VueDraggable
                class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
                v-model="column.cards"
                group="job-cards"
                :onUpdate="onJobCardChanges"
                :animation="150"
                ghostClass="ghost"
                :onAdd="(event) => onCardStatusAdd(event, column)"
              >
                <v-card
                  @click="clickedEvent(item)"
                  v-for="item in column.cards"
                  :key="item.id"
                  variant="flat"
                  elevation="3"
                  draggable="true"
                  aria-grabbed="true"
                  role="option"
                  class="my-5"
                >
                  <v-card-item class="text-h6" style="font-family: 'Nunito', sans-serif"
                    ><b>{{ 'Invoice #' + item.invoiceNumber }}</b>
                  </v-card-item>
                  <v-card-item
                    ><v-chip
                      :color="column.colour"
                      variant="elevated"
                      rounded="sm"
                      density="comfortable"
                    >
                      <b>{{ column.status }}</b></v-chip
                    ></v-card-item
                  >

                  <v-card-item class="text-body-1" style="font-family: 'Nunito', sans-serif">
                    <v-icon color="kanbanIconColor">{{ 'fa: fa-solid fa-user-large' }}</v-icon>
                    {{ item.clientName }}</v-card-item
                  ><v-card-item class="text-body-1" style="font-family: 'Nunito', sans-serif">
                    <v-icon color="kanbanIconColor">{{ 'fa: fa-solid fa-clock' }}</v-icon>
                    {{ 'Invoice date: ' + item.invoiceDate }}</v-card-item
                  ><v-card-item class="text-body-1" style="font-family: 'Nunito', sans-serif">
                    <v-icon color="kanbanIconColor">{{ 'fa: fa-solid fa-clock' }}</v-icon>
                    {{ 'Payment date: ' + item.paymentDate }}</v-card-item
                  >
                  <v-card-item class="text-body-1" style="font-family: 'Nunito', sans-serif">
                    <v-icon color="kanbanIconColor">{{ 'fa: fa-solid fa-cash-register' }}</v-icon>
                    {{ 'Amount Due: ' + item.total }}</v-card-item
                  >
                </v-card>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-col>
      </VueDraggable>
    </v-row>
  </v-container>
<!--  <v-dialog v-model="dialog" max-width="400" persistent>-->
<!--    <template v-slot:activator="{ props: activatorProps }">-->
<!--      <v-btn v-bind="activatorProps"> Open Dialog </v-btn>-->
<!--    </template>-->

<!--    <v-card title="Use Google's location service?">-->
<!--      <template v-slot:actions>-->
<!--        <iframe v-if="pdfSrc" :src="pdfSrc" style="width: 100%; height: 500px"></iframe>-->

<!--        <v-btn @click="dialog = false"> Disagree </v-btn>-->

<!--        <v-btn @click="dialog = false"> Agree </v-btn>-->
<!--      </template>-->
<!--    </v-card>-->
<!--  </v-dialog>-->
</template>

<script lang="js">
import '@mdi/font/css/materialdesignicons.css'
import { VueDraggable } from 'vue-draggable-plus'
import axios from 'axios'
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'
import { API_URL } from '@/main'

export default {
  name: 'InvoiceKanban',
  components: {
    VueDraggable
  },
  data() {
    return {
      dialog: false,
      pdfSrc: '',
      delete_all_jobs_dialog: false,
      add_column_dialog: false,
      delete_column_dialog: false,
      edit_column_details_dialog: false,
      archive_status_id: '',
      columns: [
        {
          _id: '2',
          __v: 0,
          status: 'Unpaid',
          colour: '#FF0000', // Example color for unpaid status
          companyId: 'company_2',
          cards: []
        },
        {
          _id: '1',
          __v: 0,
          status: 'Paid',
          colour: '#00FF00', // Example color for paid status
          companyId: 'company_1',
          cards: []
        }
      ],
      archive_id: '',
      new_column_name: '',
      error_message: '',
      column_color: '',
      SelectedEvent: {},
      order_of_sorting_in_columns: ['High', 'Medium', 'Low'],
      draggedCard: null,
      sourceColumn: null,
      dropTarget: null,
      starting_cards: []
    }
  },
  methods: {
    async onCardStatusAdd(e, c) {
      console.log('hello there man')
      console.log(e)
      console.log(c)
      console.log(e.clonedData.paid)
      e.clonedData.status = c.status

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      console.log(e.clonedData.id)
      try {
        let res = await axios.patch(
          API_URL + `invoice/${e.clonedData.id}`,
          { paid: !e.clonedData.paid },
          config
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async onJobCardChanges(e) {
      console.log(e)
    },
    async onColumnDragEnd(e) {
      console.log('column dragged')
      let list = []
      this.columns.map((col) => {
        list.push(col._id)
      })
      list.push(this.archive_status_id)
      const req = { employeeId: localStorage['employeeId'], jobStatuses: list }
      console.log(req)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      console.log(this.columns)
      axios
        .patch(API_URL + 'company/statuses', req, config)
        .then((res) => {
          console.log(`this is me and this is the response: ${res}`)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async ArchiveJob(payload) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      console.log(this.archive_status_id)
      console.log(payload)

      axios
        .patch(API_URL + `job/update/${payload.id}`, { status: this.archive_status_id }, config)
        .then((res) => {
          console.log(res.data.data)
          window.location.reload()
        })
        .catch((error) => console.log(error))
    },
    async columnArchiveAll(col) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }

        for (let i = 0; i < col.cards.length; i++) {
          axios
            .patch(
              API_URL + `job/update/${col.cards[i].id}`,
              { status: this.archive_status_id },
              config
            )
            .then((res) => {
              console.log(res.data.data)
            })
            .catch((error) => console.log(error))
        }
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    redirectToArchivePage() {
      this.$router.push('/backlog/archive')
    },
    async columnDelete(col) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          data: {
            statusId: col._id,
            companyId: localStorage['currentCompany'],
            employeeId: localStorage['employeeId']
          }
        }

        let res = await axios.delete(API_URL + 'job/status', config)

        // for (let i = 0; i < col.cards.length; i++) {
        //   this.columns[0].cards.push(col.cards[i])
        //   col.cards[i].status.status = this.columns[0].status
        //   console.log(col.cards[i].status)
        // }

        this.columns.splice(this.columns.indexOf(col), 1)
        this.delete_column_dialog = false

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    columnDeleteAllJobs(col) {
      //add a modal that will ask the user if they are sure they want to delete all the cards in a job column
      col.cards.splice(0, col.cards.length)
      this.delete_all_jobs_dialog = false
      //
    },
    async editColumnButtonClickedSave(col) {
      if (this.new_column_name === '' && this.column_color === '') {
        this.error_message = 'No changes were made'
        return
      }

      if (this.new_column_name.length > 20) {
        this.error_message = 'Column name length should be shorter than 20 characters'
      }
      if (this.new_column_name !== '' && this.column_color !== '') {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }

          let res = await axios.patch(
            API_URL + 'job/status',
            {
              statusId: col._id,
              status: this.new_column_name,
              colour: this.column_color,
              companyId: localStorage['currentCompany'],
              employeeId: localStorage['employeeId']
            },
            config
          )
          console.log(res)

          this.new_column_name = ''
          this.column_color = ''
          this.add_column_dialog = false
        } catch (error) {
          console.log(error)
        }
      }
      if (this.new_column_name !== '') {
        col.status = this.new_column_name
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }

          let res = await axios.patch(
            API_URL + 'job/status',
            {
              statusId: col._id,
              status: this.new_column_name,
              companyId: localStorage['currentCompany'],
              employeeId: localStorage['employeeId']
            },
            config
          )
          console.log(res)

          this.new_column_name = ''
          this.column_color = ''
          this.add_column_dialog = false
        } catch (error) {
          console.log(error)
        }
      }
      if (this.column_color !== '') {
        col.colour = this.column_color
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }

          let res = await axios.patch(
            API_URL + 'job/status',
            {
              statusId: col._id,
              colour: this.column_color,
              companyId: localStorage['currentCompany'],
              employeeId: localStorage['employeeId']
            },
            config
          )
          console.log(res)

          this.new_column_name = ''
          this.column_color = ''
          this.add_column_dialog = false
        } catch (error) {
          console.log(error)
        }
      }
      this.edit_column_details_dialog = false
    },
    async addColumnButtonClickedSave() {
      if (this.new_column_name === '' && this.column_color === '') {
        this.error_message = 'No changes were made'
        return
      }
      if (this.new_column_name === '') {
        this.error_message = 'Column name is empty'
      }
      if (this.new_column_name.length > 20) {
        this.error_message = 'Column name length should be shorter than 20 characters'
      }
      if (this.column_color === '') {
        this.error_message = 'A color should be selected'
        return
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }

        let res = await axios.post(
          API_URL + 'job/status',
          {
            status: this.new_column_name,
            colour: this.column_color,
            companyId: localStorage['currentCompany'],
            employeeId: localStorage['employeeId']
          },
          config
        )
        console.log(res)

        this.new_column_name = ''
        this.column_color = ''
        this.add_column_dialog = false
      } catch (error) {
        console.log(error)
      }
      this.add_column_dialog = !this.add_column_dialog
      // this.columns.push(column)
    },
    addColorPickerUpdate() {
      console.log(this.column_color)
    },
    async clickedEvent(payload) {
      try {
        if (payload.laborItems.length != 0) {
          payload.inventoryItems.push(['', '', '', ''])
          payload.inventoryItems.push(['Description', 'Hours', 'Hourly Rate', 'Discount','Total',])
          payload.inventoryItems.unshift(['Description', 'Quantity', 'Unit Price', 'Discount','Total'])
          payload.inventoryItems = payload.inventoryItems.concat(payload.laborItems)
          payload.inventoryItems.push(['', '', '', ''])
        }
        const data = {
          outputType: OutputType.Save, // Generate the PDF as a Blob to embed it
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
            label: `Invoice #: ${payload.invoiceNumber}`,
            num: 19,
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
        console.log(payload)
        console.log(data)
        this.pdfSrc = URL.createObjectURL(jsPDFInvoiceTemplate(data).blob)
      } catch (error) {
        console.log('Error fetching data: ' + error)
      }
    },
    openJobCard() {
      console.log('edit button clicked')
      this.JobCardVisibility = true
    },
    loading(cards) {
      console.log(cards.length)
      let hit = false

      console.log(this.columns[0].cards.length)
    },
    async loadData() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const loaded_tags_response = await axios.get(
          API_URL + `invoice/all/detailed/${localStorage['employeeId']}`,
          config
        )
        console.log(loaded_tags_response.data.data)

        let paid_cards = []
        let unpaid_cards = []
        loaded_tags_response.data.data.forEach((card) => {
          if (card.paid)
            paid_cards.push({
              id: card._id,
              invoiceNumber: card.invoiceNumber,
              invoiceDate: this.formatDate(card.invoiceDate),
              paymentDate: this.formatDate(card.paymentDate),
              subTotal: card.subTotal,
              total: card.total,
              taxAmount: card.taxAmount,
              taxPercentage: card.taxPercentage,
              paid: card.paid,
              clientId: card.clientId._id,
              clientName: card.clientId.details.firstName + ' ' + card.clientId.details.lastName,
              jobName: card.jobId.details.heading,
              clientAddress:
                card.clientId.details.address.province +
                ', ' +
                card.clientId.details.address.city +
                ', ' +
                card.clientId.details.address.suburb +
                ', ' +
                card.clientId.details.address.street +
                ', ' +
                card.clientId.details.address.postalCode,
              clientEmail: card.clientId.details.contactInfo.email,
              clientPhoneNumber: card.clientId.details.contactInfo.phoneNumber,
              companyName: card.companyId.name,
              companyAddress:
                card.clientId.details.address.province +
                ', ' +
                card.companyId.address.city +
                ', ' +
                card.companyId.address.suburb +
                ', ' +
                card.companyId.address.street +
                ', ' +
                card.companyId.address.postalCode,
              companyEmail: card.companyId.contactDetails.email,
              companyPhoneNumber: card.companyId.contactDetails.phoneNumber,
              companyLogo: card.companyId.logo,
              inventoryItems: card.inventoryItems.map((obj) => [
                obj.description,
                obj.quantity,
                obj.untiPrice,
                obj.discount,
                obj.total
              ]),
              laborItems: card.laborItems.map((obj) => [
                obj.description,
                obj.quantity,
                obj.untiPrice,
                obj.discount,
                obj.total
              ])
            })
          else
            unpaid_cards.push({
              id: card._id,
              invoiceNumber: card.invoiceNumber,
              invoiceDate: this.formatDate(card.invoiceDate),
              paymentDate: this.formatDate(card.paymentDate),
              subTotal: card.subTotal,
              total: card.total,
              taxAmount: card.taxAmount,
              taxPercentage: card.taxPercentage,
              paid: card.paid,
              clientId: card.clientId._id,
              clientName: card.clientId.details.firstName + ' ' + card.clientId.details.lastName,
              jobName: card.jobId.details.heading,
              clientAddress:
                card.clientId.details.address.province +
                ', ' +
                card.clientId.details.address.city +
                ', ' +
                card.clientId.details.address.suburb +
                ', ' +
                card.clientId.details.address.street +
                ', ' +
                card.clientId.details.address.postalCode,
              clientEmail: card.clientId.details.contactInfo.email,
              clientPhoneNumber: card.clientId.details.contactInfo.phoneNumber,
              companyName: card.companyId.name,
              companyAddress:
                card.clientId.details.address.province +
                ', ' +
                card.companyId.address.city +
                ', ' +
                card.companyId.address.suburb +
                ', ' +
                card.companyId.address.street +
                ', ' +
                card.companyId.address.postalCode,
              companyEmail: card.companyId.contactDetails.email,
              companyPhoneNumber: card.companyId.contactDetails.phoneNumber,
              companyLogo: card.companyId.logo,
              inventoryItems: card.inventoryItems.map((obj) => [
                obj.description,
                obj.quantity,
                obj.unitPrice,
                obj.total
              ]),
              laborItems: card.laborItems.map((obj) => [
                obj.description,
                obj.quantity,
                obj.unitPrice,
                obj.total
              ])
            })

          console.log()
        })
        this.columns[0].cards = unpaid_cards
        this.columns[1].cards = paid_cards
        console.log(loaded_tags_response.data.data)
      } catch (error) {
        console.log(error)
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
    onDragStart(card, column) {
      this.draggedCard = card
      this.sourceColumn = column
    },
    onDragEnd() {
      this.draggedCard = null
      this.dropTarget = null
    },
    onDragOver(column) {
      this.dropTarget = column
    },
    onDragLeave() {
      this.dropTarget = null
    },
    async onDrop(targetColumn) {
      if (this.draggedCard && this.sourceColumn) {
        console.log(this.draggedCard)
        this.sourceColumn.cards = this.sourceColumn.cards.filter(
          (c) => c.id !== this.draggedCard.id
        )
        {
          targetColumn.cards.push(this.draggedCard)

          const jobid = this.draggedCard.id
          // this.draggedCard.status.status = targetColumn.status

          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }
          console.log(jobid)
          try {
            let res = await axios.patch(
              API_URL + `job/update/${jobid}`,
              { status: targetColumn._id },
              config
            )
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        }
        this.draggedCard = null
        this.sourceColumn = null
        this.dropTarget = null
      }
    },
    isDropTarget(column) {
      return this.dropTarget === column
    },
    isDragging(card) {
      return this.draggedCard === card
    },
  },
  mounted() {
    // this.loadColumns().then(() => this.loadJobs().then(() => this.loading(this.starting_cards)))
    this.loadData()
  }
}
</script>

<style scoped>
.drop-target {
  border: 2px dashed #3f51b5;
  background-color: #e3f2fd;
}

.dragging {
  opacity: 0.5;
  cursor: grabbing;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.kanban-card {
  transition: transform 0.2s ease-in-out;
}
.kanban-card:active {
  transform: scale(1.05);
}
.kanban-card:hover {
  cursor: grab;
}
</style>
