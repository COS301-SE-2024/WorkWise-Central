<template>
  <v-container fluid>
    <v-row>
      <VueDraggable
        class="d-flex flex-nowrap overflow-scroll flex flex-col gap-2 p-4 w-300px h-800px m-auto bg-gray-500/5 rounded overflow-auto"
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
          :lg="3"
          :md="4"
          :sm="6"
          :cols="12"
        >
          <v-card variant="flat" elevation="1" color="red">
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
              <!--              <v-menu align="left">-->
              <!--                <template v-slot:activator="{ props }">-->
              <!--                  <v-btn icon="mdi-dots-horizontal" v-bind="props"></v-btn>-->
              <!--                </template>-->

              <!--                <v-list :border="true" bg-color="background" rounded="lg">-->
              <!--                  <v-list-subheader>Jobs</v-list-subheader>-->

              <!--                  <v-list-item>-->
              <!--                    <v-btn :elevation="0" @click="columnArchiveAll(column)">-->
              <!--                      <v-icon>{{ 'fa: fa-solid fa-box-archive' }}</v-icon>-->
              <!--                      {{ 'Archive all' }}-->
              <!--                    </v-btn>-->
              <!--                  </v-list-item>-->
              <!--                  <v-list-item>-->
              <!--                    <v-dialog v-model="delete_all_jobs_dialog" max-width="500px">-->
              <!--                      <template v-slot:activator="{ props }">-->
              <!--                        <v-btn :elevation="0" v-bind="props">-->
              <!--                          <v-icon>{{ 'fa: fa-regular fa-trash-can' }}</v-icon>-->
              <!--                          {{ 'Delete all' }}-->
              <!--                        </v-btn>-->
              <!--                      </template>-->
              <!--                      <v-card color="background">-->
              <!--                        <v-card-title>-->
              <!--                          <span class="headline">Delete {{ column.status }}</span>-->
              <!--                        </v-card-title>-->
              <!--                        <v-card-text>-->
              <!--                          <v-container>-->
              <!--                            <v-row>-->
              <!--                              <p>-->
              <!--                                Are you sure you want to delete all the jobs in the-->
              <!--                                <strong>{{-->
              <!--                                  column.status.charAt(0).toUpperCase() + column.status.slice(1)-->
              <!--                                }}</strong>-->
              <!--                                column. all the jobs within it will be permanently removed through-->
              <!--                                out the company.-->
              <!--                              </p>-->
              <!--                              <strong> This action cannot be reversed. </strong>-->
              <!--                            </v-row>-->
              <!--                          </v-container>-->
              <!--                        </v-card-text>-->
              <!--                        <v-card-actions>-->
              <!--                          <v-spacer></v-spacer>-->
              <!--                          <v-btn-->
              <!--                            @click="columnDeleteAllJobs(column)"-->
              <!--                            color="success"-->
              <!--                            variant="text"-->
              <!--                          >-->
              <!--                            {{ 'Delete' }}-->
              <!--                          </v-btn>-->

              <!--                          <v-btn-->
              <!--                            color="error"-->
              <!--                            variant="text"-->
              <!--                            @click="delete_all_jobs_dialog = false"-->
              <!--                            >Cancel</v-btn-->
              <!--                          >-->
              <!--                        </v-card-actions>-->
              <!--                      </v-card>-->
              <!--                    </v-dialog>-->
              <!--                  </v-list-item>-->
              <!--                  <v-list-subheader v-if="column.status !== 'No Status'">Column</v-list-subheader>-->

              <!--                  <v-list-item v-if="column.status !== 'No Status'">-->
              <!--                    <v-dialog max-height="700" max-width="500" v-model="edit_column_details_dialog">-->
              <!--                      <template v-slot:activator="{ props }">-->
              <!--                        <v-btn :elevation="0" v-bind="props"-->
              <!--                          ><v-icon>{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon-->
              <!--                          >{{ 'Edit details' }}-->
              <!--                        </v-btn>-->
              <!--                      </template>-->
              <!--                      <v-card elevation="14" rounded="md" max-height="100%" max-width="900">-->
              <!--                        <v-card-title class="text-center">Edit {{ column.status }}</v-card-title>-->
              <!--                        <v-card-text>-->
              <!--                          &lt;!&ndash;              <v-form ref="form" v-model="valid" @submit.prevent="validateForm">&ndash;&gt;-->
              <!--                          <v-col>-->
              <!--                            <v-spacer></v-spacer>-->
              <!--                            <v-col>-->
              <!--                              <v-col align="center">-->
              <!--                                <v-icon :color="column_color" :size="40">-->
              <!--                                  {{ 'fa: fa-solid fa-cube' }}-->
              <!--                                </v-icon>-->
              <!--                              </v-col>-->
              <!--                              <v-col>-->
              <!--                                <label style="font-size: 14px; font-weight: lighter"-->
              <!--                                  >Column Name</label-->
              <!--                                >-->
              <!--                                <v-text-field-->
              <!--                                  density="compact"-->
              <!--                                  color="grey-lighten-4"-->
              <!--                                  placeholder="Enter the name of the new column"-->
              <!--                                  rounded="md"-->
              <!--                                  variant="solo"-->
              <!--                                  v-model="new_column_name"-->
              <!--                                  :rules="column_name_rule"-->
              <!--                                  required-->
              <!--                                  data-testid="job-title-field"-->
              <!--                                ></v-text-field-->
              <!--                              ></v-col>-->
              <!--                              <v-col align="center">-->
              <!--                                <label style="font-size: 14px; font-weight: lighter">Color</label>-->
              <!--                                <v-color-picker-->
              <!--                                  v-model="column_color"-->
              <!--                                  hide-inputs-->
              <!--                                  show-swatches-->
              <!--                                  @update:modelValue="addColorPickerUpdate"-->
              <!--                                ></v-color-picker>-->
              <!--                              </v-col>-->
              <!--                            </v-col>-->
              <!--                          </v-col>-->
              <!--                          <v-col align="center">-->
              <!--                            <label style="{color:red}">{{ error_message }}</label>-->
              <!--                          </v-col>-->
              <!--                          <v-col cols="8" offset="2" align="center">-->
              <!--                            <v-btn-->
              <!--                              color="success"-->
              <!--                              rounded="md"-->
              <!--                              type="submit"-->
              <!--                              boarder="md"-->
              <!--                              width="100%"-->
              <!--                              height="35"-->
              <!--                              variant="text"-->
              <!--                              @click="editColumnButtonClickedSave(column)"-->
              <!--                              data-testid="create-btn"-->
              <!--                              >Save-->
              <!--                            </v-btn>-->
              <!--                            <v-btn-->
              <!--                              color="error"-->
              <!--                              rounded="md"-->
              <!--                              boarder="md"-->
              <!--                              width="100%"-->
              <!--                              height="35"-->
              <!--                              variant="text"-->
              <!--                              @click="edit_column_details_dialog = false"-->
              <!--                              data-testid="cancel-btn"-->
              <!--                              >Cancel-->
              <!--                            </v-btn>-->
              <!--                          </v-col>-->
              <!--                        </v-card-text>-->
              <!--                      </v-card>-->
              <!--                    </v-dialog>-->
              <!--                  </v-list-item>-->
              <!--                  <v-list-item v-if="column.status !== 'No Status'">-->
              <!--                    <v-dialog v-model="delete_column_dialog" max-width="500px">-->
              <!--                      <template v-slot:activator="{ props }">-->
              <!--                        <v-btn :elevation="0" v-bind="props"-->
              <!--                          ><v-icon>{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon-->
              <!--                          >{{ 'Delete' }}</v-btn-->
              <!--                        >-->
              <!--                      </template>-->
              <!--                      <v-card color="background">-->
              <!--                        <v-card-title>-->
              <!--                          <span class="headline">Delete {{ column.status }}</span>-->
              <!--                        </v-card-title>-->
              <!--                        <v-card-text>-->
              <!--                          <v-container>-->
              <!--                            <v-row>-->
              <!--                              <p>-->
              <!--                                Are you sure you want to delete the-->
              <!--                                <strong>{{-->
              <!--                                  column.status.charAt(0).toUpperCase() + column.status.slice(1)-->
              <!--                                }}</strong>-->
              <!--                                column, all jobs within it will be moved to the-->
              <!--                                <b>No Status</b> column.-->
              <!--                              </p>-->
              <!--                              <strong> This action cannot be reversed. </strong>-->
              <!--                            </v-row>-->
              <!--                          </v-container>-->
              <!--                        </v-card-text>-->
              <!--                        <v-card-actions>-->
              <!--                          <v-spacer></v-spacer>-->
              <!--                          <v-btn @click="columnDelete(column)" color="success" variant="text">-->
              <!--                            {{ 'Delete' }}-->
              <!--                          </v-btn>-->

              <!--                          <v-btn color="error" variant="text" @click="delete_column_dialog = false"-->
              <!--                            >Cancel</v-btn-->
              <!--                          >-->
              <!--                        </v-card-actions>-->
              <!--                      </v-card>-->
              <!--                    </v-dialog>-->
              <!--                  </v-list-item>-->
              <!--                </v-list>-->
              <!--              </v-menu>-->
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
                  class="ga-2"
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
  <v-dialog v-model="JobCardVisibility" max-width="1000px">
    <ViewJob @close="JobCardVisibility = false" :passedInJob="SelectedEvent" />
  </v-dialog>
</template>

<script lang="ts">
import type { InvoiceCardDataFormat, Column } from '../types'
import '@mdi/font/css/materialdesignicons.css'
import ViewJob from '@/components/home/jobs/management/ViewJob.vue'
import { type SortableEvent, VueDraggable } from 'vue-draggable-plus'
import axios from 'axios'
import { API_URL } from '@/main'

export default {
  name: 'InvoiceKanban',
  components: {
    ViewJob,
    VueDraggable
  },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
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
      ] as Column[],
      archive_id: '',
      new_column_name: '',
      error_message: '',
      column_color: '',
      SelectedEvent: {} as InvoiceCardDataFormat,
      JobCardVisibility: false,
      order_of_sorting_in_columns: ['High', 'Medium', 'Low'],
      draggedCard: null as InvoiceCardDataFormat | null,
      sourceColumn: null as Column | null,
      dropTarget: null as Column | null,
      starting_cards: [] as InvoiceCardDataFormat[],
      column_name_rule: [
        (v: string) => !!v || 'Column name is required',
        (v: string) => (v && v.length <= 20) || 'Column name must be less than 20 characters'
      ]
    }
  },
  methods: {
    async onCardStatusAdd(e: any, c: Column) {
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
    async onJobCardChanges(e: SortableEvent) {
      console.log(e)
    },
    async onColumnDragEnd(e: SortableEvent) {
      console.log('column dragged')
      let list = [] as string[]
      this.columns.map((col: Column) => {
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
    async ArchiveJob(payload: InvoiceCardDataFormat) {
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
    async columnArchiveAll(col: Column) {
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
    async columnDelete(col: Column) {
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
    columnDeleteAllJobs(col: Column) {
      //add a modal that will ask the user if they are sure they want to delete all the cards in a job column
      col.cards.splice(0, col.cards.length)
      this.delete_all_jobs_dialog = false
      //
    },
    async editColumnButtonClickedSave(col: Column) {
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
    async clickedEvent(payload: InvoiceCardDataFormat) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      //
      //
      // try {
      //   const response = await axios.get(API_URL + `job/id/${payload.id}`, config)
      //   console.log(response)
      //   this.SelectedEvent = response.data.data
      //   this.openJobCard()
      // } catch (error) {
      //   console.log('Error fetching data: ' + error)
      // }
    },
    openJobCard() {
      console.log('edit button clicked')
      this.JobCardVisibility = true
    },
    loading(cards: InvoiceCardDataFormat[]) {
      console.log(cards.length)
      let hit = false
      // for (let i = 0; i < cards.length; i++) {
      //   this.columns.forEach((value: Column) => {
      //     if (value.status === cards[i].status.status) {
      //       console.log('hit')
      //       hit = true
      //       this.loadCardsInRespectiveColumns(cards[i], value)
      //     }
      //   })
      //   if (!hit) this.loadCardsInRespectiveColumns(cards[i], this.columns[0])
      //
      //   hit = false
      // }
      // this.columns.forEach((col: Column) => {
      //   // this.N_M_Sort(col.cards, this.order_of_sorting_in_columns)
      //   col.cards.sort(
      //     (a: InvoiceCardDataFormat, b: InvoiceCardDataFormat) =>
      //       a.priorityTag.priorityLevel - b.priorityTag.priorityLevel
      //   )
      // })
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

        let paid_cards = [] as InvoiceCardDataFormat[]
        let unpaid_cards = [] as InvoiceCardDataFormat[]
        loaded_tags_response.data.data.forEach((card: any) => {
          if (card.paid)
            paid_cards.push({
              id: card._id,
              invoiceNumber: card.invoiceNumber,
              invoiceDate: this.formatDate(card.invoiceDate),
              paymentDate: this.formatDate(card.paymentDate),
              subTotal: card.subTotal,
              total: card.total,
              paid: card.paid,
              clientId: card.clientId._id,
              clientName: card.clientId.details.firstName + ' ' + card.clientId.details.lastName
            })
          else
            unpaid_cards.push({
              id: card._id,
              invoiceNumber: card.invoiceNumber,
              invoiceDate: this.formatDate(card.invoiceDate),
              paymentDate: this.formatDate(card.paymentDate),
              subTotal: card.subTotal,
              total: card.total,
              paid: card.paid,
              clientId: card.clientId._id,
              clientName: card.clientId.details.firstName + ' ' + card.clientId.details.lastName
            })
        })
        this.columns[0].cards = unpaid_cards
        this.columns[1].cards = paid_cards
        console.log(loaded_tags_response.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    formatDate(date: string) {
      const date_passed_in = new Date(date)
      const y = date_passed_in.getFullYear()
      const m = String(date_passed_in.getMonth() + 1).padStart(2, '0')
      const d = String(date_passed_in.getDate()).padStart(2, '0')
      const h = String(date_passed_in.getHours()).padStart(2, '0')
      const mn = String(date_passed_in.getMinutes()).padStart(2, '0')
      const f_date = `${y}-${m}-${d} ${h}:${mn}`
      return f_date
    },
    onDragStart(card: InvoiceCardDataFormat, column: Column) {
      this.draggedCard = card
      this.sourceColumn = column
    },
    onDragEnd() {
      this.draggedCard = null
      this.dropTarget = null
    },
    onDragOver(column: Column) {
      this.dropTarget = column
    },
    onDragLeave() {
      this.dropTarget = null
    },
    async onDrop(targetColumn: Column) {
      if (this.draggedCard && this.sourceColumn) {
        console.log(this.draggedCard)
        this.sourceColumn.cards = this.sourceColumn.cards.filter(
          (c) => c.id !== this.draggedCard!.id
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
    isDropTarget(column: Column) {
      return this.dropTarget === column
    },
    isDragging(card: InvoiceCardDataFormat) {
      return this.draggedCard === card
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
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
