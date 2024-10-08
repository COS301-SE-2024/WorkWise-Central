<template>
  <v-container fluid>
    <v-row>
      <VueDraggable
        ref="el"
        v-model="columns"
        class="d-flex flex-nowrap overflow-scroll flex flex-col gap-2 p-4 w-300px h-800px m-auto bg-gray-500/5 rounded overflow-auto"
        :onUpdate="onColumnDragEnd"
        group="columns"
        :animation="150"
        ghostClass="ghost"
        :scroll="true"
      >
        <v-col
          v-for="column in columns"
          :key="column._id"
          role="listbox"
          aria-dropeffect="move"
          :xl="2"
          :lg="3"
          :md="4"
          :sm="6"
          :cols="12"
        >
          <v-card
            variant="flat"
            elevation="1"
            color="red"
            :max-width="350"
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
              <v-menu align="left">
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-horizontal" v-bind="props"></v-btn>
                </template>

                <v-list :border="true" bg-color="background" rounded="lg">
                  <v-list-subheader>Jobs</v-list-subheader>

                  <v-list-item>
                    <v-btn :elevation="0" @click="columnArchiveAll(column)">
                      <v-icon>{{ 'fa: fa-solid fa-box-archive' }}</v-icon>
                      {{ 'Archive all' }}
                    </v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-dialog :opacity="0.6" v-model="delete_all_jobs_dialog" max-width="500px">
                      <template v-slot:activator="{ props }">
                        <v-btn :elevation="0" v-bind="props">
                          <v-icon>{{ 'fa: fa-regular fa-trash-can' }}</v-icon>
                          {{ 'Delete all' }}
                        </v-btn>
                      </template>
                      <v-card color="background">
                        <v-card-title>
                          <span class="headline">Delete {{ column.status }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <p>
                                Are you sure you want to delete all the jobs in the
                                <strong>{{
                                  column.status.charAt(0).toUpperCase() + column.status.slice(1)
                                }}</strong>
                                column. all the jobs within it will be permanently removed through
                                out the company.
                              </p>
                              <strong> This action cannot be reversed. </strong>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            @click="columnDeleteAllJobs(column)"
                            color="success"
                            variant="text"
                          >
                            {{ 'Delete' }}
                          </v-btn>

                          <v-btn
                            color="error"
                            variant="text"
                            @click="delete_all_jobs_dialog = false"
                            >Cancel</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-list-item>
                  <v-list-subheader v-if="column.status !== 'No Status'">Column</v-list-subheader>

                  <v-list-item v-if="column.status !== 'No Status'">
                    <v-dialog
                      :opacity="0.6"
                      max-height="700"
                      max-width="500"
                      v-model="edit_column_details_dialog"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn :elevation="0" v-bind="props"
                          ><v-icon>{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon
                          >{{ 'Edit details' }}
                        </v-btn>
                      </template>
                      <v-card elevation="14" rounded="md" max-height="100%" max-width="900">
                        <v-card-title class="text-center">Edit {{ column.status }}</v-card-title>
                        <v-card-text>
                          <!--              <v-form ref="form" v-model="valid" @submit.prevent="validateForm">-->
                          <v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                              <v-col align="center">
                                <v-icon :color="column_color" :size="40">
                                  {{ 'fa: fa-solid fa-cube' }}
                                </v-icon>
                              </v-col>
                              <v-col>
                                <label style="font-size: 14px; font-weight: lighter"
                                  >Column Name</label
                                >
                                <v-text-field
                                  density="compact"
                                  color="grey-lighten-4"
                                  placeholder="Enter the name of the new column"
                                  rounded="md"
                                  variant="solo"
                                  v-model="new_column_name"
                                  :rules="column_name_rule"
                                  required
                                  data-testid="job-title-field"
                                ></v-text-field
                              ></v-col>
                              <v-col align="center">
                                <label style="font-size: 14px; font-weight: lighter">Color</label>
                                <v-color-picker
                                  v-model="column_color"
                                  hide-inputs
                                  show-swatches
                                  :hide-sliders="true"
                                  :hide-canvas="true"
                                  @update:modelValue="addColorPickerUpdate"
                                ></v-color-picker>
                              </v-col>
                            </v-col>
                          </v-col>
                          <v-col align="center">
                            <label style="{color:red}">{{ error_message }}</label>
                          </v-col>
                          <v-col cols="8" offset="2" align="center">
                            <v-btn
                              color="success"
                              rounded="md"
                              type="submit"
                              boarder="md"
                              width="100%"
                              height="35"
                              variant="text"
                              @click="editColumnButtonClickedSave(column)"
                              data-testid="create-btn"
                              >Save
                            </v-btn>
                            <v-btn
                              color="error"
                              rounded="md"
                              boarder="md"
                              width="100%"
                              height="35"
                              variant="text"
                              @click="edit_column_details_dialog = false"
                              data-testid="cancel-btn"
                              >Cancel
                            </v-btn>
                          </v-col>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-list-item>
                  <v-list-item v-if="column.status !== 'No Status'">
                    <v-dialog :opacity="0.6" v-model="delete_column_dialog" max-width="500px">
                      <template v-slot:activator="{ props }">
                        <v-btn :elevation="0" v-bind="props"
                          ><v-icon>{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon
                          >{{ 'Delete' }}</v-btn
                        >
                      </template>
                      <v-card color="background">
                        <v-card-title>
                          <span class="headline">Delete {{ column.status }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <p>
                                Are you sure you want to delete the
                                <strong>{{
                                  column.status.charAt(0).toUpperCase() + column.status.slice(1)
                                }}</strong>
                                column, all jobs within it will be moved to the
                                <b>No Status</b> column.
                              </p>
                              <strong> This action cannot be reversed. </strong>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="columnDelete(column)" color="success" variant="text">
                            {{ 'Delete' }}
                          </v-btn>

                          <v-btn color="error" variant="text" @click="delete_column_dialog = false"
                            >Cancel</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-item>

            <v-card-text>
              <!--              <v-virtual-scroll-->
              <!--                :items="column.cards"-->
              <!--                class="kanban-column-scroller"-->
              <!--                :max-height="700"-->
              <!--                :max-width="500"-->
              <!--              >-->
              <!--                <template v-slot:default>-->
              <VueDraggable
                class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
                v-model="column.cards"
                group="job-cards"
                :animation="150"
                ghostClass="ghost"
                :onAdd="(event) => onCardStatusAdd(event, column)"
              >
                <v-card
                  class="my-5"
                  v-for="item in column.cards"
                  :key="item.jobId"
                  @click="clickedEvent(item)"
                  variant="flat"
                  elevation="3"
                  draggable="true"
                  aria-grabbed="true"
                  role="option"
                >
                  <v-card-item>
                    <v-img :src="item.coverImage"> </v-img>
                  </v-card-item>
                  <v-card-item class="text-h6" style="font-family: 'Nunito', sans-serif"
                    ><b>{{ item.heading }}</b>
                    <v-menu align="left">
                      <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-horizontal" v-bind="props"></v-btn>
                      </template>
                      <v-list :border="true" bg-color="background" rounded="lg">
                        <v-list-item>
                          <v-btn :elevation="0" @click="ArchiveJob(item, column)">
                            <v-icon>{{ 'fa: fa-solid fa-box-archive' }}</v-icon>
                            {{ 'Archive' }}
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-card-item>
                  <v-card-item v-if="item.status.status === column.status"
                    ><v-chip
                      :color="column.colour"
                      variant="elevated"
                      rounded="sm"
                      density="comfortable"
                    >
                      <b>{{ item.status.status }}</b></v-chip
                    ></v-card-item
                  >

                  <v-card-item class="text-body-1" style="font-family: 'Nunito', sans-serif">
                    <v-icon color="kanbanIconColor">{{ 'fa: fa-solid fa-user-large' }}</v-icon>
                    {{ item.clientName }}</v-card-item
                  ><v-card-item class="text-body-1" style="font-family: 'Nunito', sans-serif">
                    <v-icon color="kanbanIconColor">{{ 'fa: fa-solid fa-clock' }}</v-icon>
                    {{ item.startDate }}</v-card-item
                  ><v-card-item class="text-body-1" style="font-family: 'Nunito', sans-serif">
                    <v-icon color="kanbanIconColor">{{ 'fa: fa-solid fa-location-dot' }}</v-icon>
                    {{ item.city + ', ' + item.suburb }}</v-card-item
                  >

                  <v-card-item v-if="item.priorityTag != null"
                    ><v-chip :color="item.priorityTag.colour" variant="tonal" density="comfortable"
                      ><b>Priority: {{ item.priorityTag.label }}</b></v-chip
                    ></v-card-item
                  >

                  <v-card-item v-if="item.tags.length != 0">
                    <v-chip
                      :color="item.tags[i].colour"
                      class=""
                      v-for="(n, i) in item.tags.length"
                      :key="i"
                      ><b>{{ item.tags[i].label }}</b></v-chip
                    >
                  </v-card-item>
                </v-card>
              </VueDraggable>
              <!--                </template>-->
              <!--              </v-virtual-scroll>-->
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="auto">
          <v-dialog :opacity="0.6" max-height="600" max-width="500" v-model="add_column_dialog">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" size="small"
                ><v-icon size="x-large" icon="fa: fa-solid fa-plus"></v-icon
              ></v-btn>
            </template>
            <v-card elevation="14" rounded="md" max-height="700" max-width="900">
              <v-card-title class="text-center">New Column</v-card-title>
              <v-card-text>
                <!--              <v-form ref="form" v-model="valid" @submit.prevent="validateForm">-->
                <v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-col align="center">
                      <v-icon :color="column_color" :size="40">
                        {{ 'fa: fa-solid fa-cube' }}
                      </v-icon>
                    </v-col>
                    <v-col>
                      <label style="font-size: 14px; font-weight: lighter">Column Name</label>
                      <v-text-field
                        density="compact"
                        color="grey-lighten-4"
                        placeholder="Enter the name of the new column"
                        rounded="md"
                        variant="solo"
                        v-model="new_column_name"
                        :rules="column_name_rule"
                        required
                        data-testid="job-title-field"
                      ></v-text-field
                    ></v-col>
                    <v-col align="center">
                      <label style="font-size: 14px; font-weight: lighter">Color</label>
                      <v-color-picker
                        v-model="column_color"
                        :hide-sliders="true"
                        :hide-canvas="true"
                        hide-inputs
                        show-swatches
                        @update:modelValue="addColorPickerUpdate"
                      ></v-color-picker>
                    </v-col>
                  </v-col>
                </v-col>
                <v-col align="center">
                  <label style="{color:red;}">{{ error_message }}</label>
                </v-col>
                <v-col cols="8" offset="2" align="center">
                  <v-btn
                    color="success"
                    rounded="md"
                    type="submit"
                    boarder="md"
                    width="100%"
                    height="35"
                    variant="text"
                    @click="addColumnButtonClickedSave"
                    data-testid="create-btn"
                    >Save
                  </v-btn>
                  <v-btn
                    color="error"
                    rounded="md"
                    boarder="md"
                    width="100%"
                    height="35"
                    variant="text"
                    @click="add_column_dialog = false"
                    data-testid="cancel-btn"
                    >Cancel
                  </v-btn>
                </v-col>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </VueDraggable>
    </v-row>
  </v-container>
  <v-dialog :opacity="0.6" v-model="JobCardVisibility" max-width="1000px">
    <ViewJob @close="JobCardVisibility = false" :passedInJob="SelectedEvent" />
  </v-dialog>
</template>

<script lang="ts">
import type { JobCardDataFormat, Column } from '../types'
import '@mdi/font/css/materialdesignicons.css'
import ViewJob from '@/components/home/jobs/management/ViewJob.vue'
import { type SortableEvent, VueDraggable } from 'vue-draggable-plus'
import { API_URL } from '@/main'

import axios from 'axios'

export default {
  components: {
    ViewJob,
    VueDraggable
  },
  data() {
    return {
      nostatusID: '',
      delete_all_jobs_dialog: false,
      add_column_dialog: false,
      delete_column_dialog: false,
      edit_column_details_dialog: false,
      archive_status_id: '',
      columns: [] as Column[],
      archive_id: '',
      new_column_name: '',
      error_message: '',
      column_color: '',
      SelectedEvent: {} as JobCardDataFormat,
      JobCardVisibility: false,
      order_of_sorting_in_columns: ['High', 'Medium', 'Low'],
      draggedCard: null as JobCardDataFormat | null,
      sourceColumn: null as Column | null,
      dropTarget: null as Column | null,
      starting_cards: [] as JobCardDataFormat[],
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
      console.log(c.status)
      e.clonedData.status.status = c.status

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      console.log(e.clonedData.jobId)
      try {
        let res = await axios.patch(
          API_URL + `job/update/${e.clonedData.jobId}`,
          { status: c._id },
          config
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    onUpdate() {
      console.log('update')
    },
    onAdd() {
      console.log('add')
    },
    remove() {
      console.log('remove')
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
    async ArchiveJob(payload: JobCardDataFormat, col: Column) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      console.log(this.archive_status_id)
      console.log(payload)

      axios
        .patch(API_URL + `job/update/${payload.jobId}`, { status: this.archive_status_id }, config)
        .then((res) => {
          console.log(res.data.data)
          col.cards = col.cards.filter((item) => item.jobId !== payload.jobId)
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
              API_URL + `job/update/${col.cards[i].jobId}`,
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

        const obj = { status: this.nostatusID } as any
        await axios.delete(API_URL + 'job/status', config).then(() => {
          for (let i = 0; i < col.cards.length; i++) {
            axios.patch(API_URL + `job/update/${col.cards[i].jobId}`, obj, config)
          }
          for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i]._id == this.nostatusID) {
              this.columns[i].cards.concat(col.cards)
            }
          }
        })

        this.columns.splice(this.columns.indexOf(col), 1)
        this.delete_column_dialog = false
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
          this.edit_column_details_dialog = false
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

        let res = await axios
          .post(
            API_URL + 'job/status',
            {
              status: this.new_column_name,
              colour: this.column_color,
              companyId: localStorage['currentCompany'],
              employeeId: localStorage['employeeId']
            },
            config
          )
          .then((res) => {
            console.log(res)
            this.new_column_name = ''
            this.column_color = ''
            this.columns.push({
              _id: res.data.data._id,
              __v: res.data.data.__v,
              status: res.data.data.status,
              colour: res.data.data.colour,
              companyId: res.data.data.companyId,
              cards: [] as JobCardDataFormat[]
            })
            this.add_column_dialog = false
          })
      } catch (error) {
        console.log(error)
      }
      // this.columns.push(column)
    },
    addColorPickerUpdate() {
      console.log(this.column_color)
    },
    addColumnButtonClicked() {
      console.log('Add button clicked')
    },
    async clickedEvent(payload: JobCardDataFormat) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const response = await axios.get(API_URL + `job/id/${payload.jobId}`, config)
        console.log(response)
        this.SelectedEvent = response.data.data
        this.openJobCard()
      } catch (error) {
        console.log('Error fetching data: ' + error)
      }
    },
    openJobCard() {
      console.log('edit button clicked')
      this.JobCardVisibility = true
    },
    loading(cards: JobCardDataFormat[]) {
      console.log(cards.length)
      let hit = false
      for (let i = 0; i < cards.length; i++) {
        this.columns.forEach((value: Column) => {
          if (value.status === cards[i].status.status) {
            console.log('hit')
            hit = true
            this.loadCardsInRespectiveColumns(cards[i], value)
          }
        })
        if (!hit) this.loadCardsInRespectiveColumns(cards[i], this.columns[0])

        hit = false
      }
      this.columns.forEach((col: Column) => {
        col.cards.sort(
          (a: JobCardDataFormat, b: JobCardDataFormat) =>
            a.priorityTag.priorityLevel - b.priorityTag.priorityLevel
        )
      })
      console.log(this.columns[0].cards.length)
    },
    async loadColumns() {
      console.log('load Column request')

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const loaded_tags_response = await axios.get(
          API_URL + `company/status/all/${localStorage['currentCompany']}`,
          config
        )
        console.log(loaded_tags_response.data.data)

        let archive_index = -1
        for (let i = 0; i < loaded_tags_response.data.data.jobStatuses.length; i++) {
          if (loaded_tags_response.data.data.jobStatuses[i].status === 'Archive') {
            archive_index = i
          }
          if (loaded_tags_response.data.data.jobStatuses[i].status === 'No Status') {
            this.nostatusID = loaded_tags_response.data.data.jobStatuses[i]._id
          }
          loaded_tags_response.data.data.jobStatuses[i]['cards'] = []
        }

        this.archive_status_id = loaded_tags_response.data.data.jobStatuses[archive_index]._id
        loaded_tags_response.data.data.jobStatuses.splice(archive_index, 1)
        this.columns = loaded_tags_response.data.data.jobStatuses
      } catch (error) {
        console.log(error)
      }
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
          API_URL + `company/status/all/${localStorage['currentCompany']}`,
          config
        )
        console.log(loaded_tags_response.data.data)
        loaded_tags_response.data.data.forEach((col: any) => {
          col['cards'] = [] as JobCardDataFormat[]
        })
        this.columns = loaded_tags_response.data.data
        console.log(loaded_tags_response.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async loadJobs() {
      console.log('load jobs request')
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` }, params:{
          currentEmployeeId:localStorage['employeeId']
        } }

      try {
        const loaded_tags_response = await axios.get(
            API_URL + `job/all/employee/${localStorage['employeeId']}`,
            config
        )
        console.log(loaded_tags_response)
        let loaded_tags_res = loaded_tags_response.data.data
        for (let i = 0; i < loaded_tags_res.length; i++) {
          if (loaded_tags_res[i].status.status === 'Archive') continue

          this.starting_cards.push({
            jobId: loaded_tags_res[i]._id,
            heading: loaded_tags_res[i].details.heading,
            jobDescription: loaded_tags_res[i].details.description,
            startDate: this.formatDate(loaded_tags_res[i].details.startDate),
            endDate: this.formatDate(loaded_tags_res[i].details.endDate),
            status: loaded_tags_res[i].status,
            clientName:
              loaded_tags_res[i].clientId.details.firstName +
              ' ' +
              loaded_tags_res[i].clientId.details.lastName,
            street: loaded_tags_res[i].details.address.street,
            suburb: loaded_tags_res[i].details.address.suburb,
            city: loaded_tags_res[i].details.address.city,
            postalCode: loaded_tags_res[i].details.address.street.postalCode,
            taskList: loaded_tags_res[i].taskList,
            comments: loaded_tags_res[i].comments,
            priorityTag: loaded_tags_res[i].priorityTag,
            tags: loaded_tags_res[i].tags,
            coverImage: loaded_tags_res[i].coverImage
          })
        }
        console.log(this.starting_cards)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    loadCardsInRespectiveColumns(card: JobCardDataFormat, column: Column) {
      column.cards.push(card)
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
    onDragStart(card: JobCardDataFormat, column: Column) {
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
          (c) => c.jobId !== this.draggedCard!.jobId
        )
        {
          targetColumn.cards.push(this.draggedCard)
          targetColumn.cards.sort((a: JobCardDataFormat, b: JobCardDataFormat) => {
            return a.priorityTag.priorityLevel - b.priorityTag.priorityLevel
          })
          const jobid = this.draggedCard.jobId
          this.draggedCard.status.status = targetColumn.status

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
    isDragging(card: JobCardDataFormat) {
      return this.draggedCard === card
    },
    N_M_Sort(sorted: JobCardDataFormat[], sortee: string[]) {
      let tracker = new Map()

      for (let i = 0; i < sortee.length; i++)
        if (!tracker.has(sortee[i])) tracker.set(sortee[i], i + 1)

      sorted.sort((x: JobCardDataFormat, y: JobCardDataFormat) => {
        let tracker1: number = tracker.get(x.priorityTag.priorityLevel) || 0
        let tracker2: number = tracker.get(y.priorityTag.priorityLevel) || 0

        if (tracker1 === 0 && tracker2 === 0) return 0
        else if (tracker1 === 0) return 1
        else if (tracker2 === 0) return -1

        return tracker1 - tracker2
      })
    }
  },
  mounted() {
    this.loadColumns().then(() => this.loadJobs().then(() => this.loading(this.starting_cards)))
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
