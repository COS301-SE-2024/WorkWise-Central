<template>
  <v-container fluid>
    <v-row class="d-flex flex-nowrap overflow-scroll">
      <v-col
        v-for="column in columns"
        :key="column.id"
        :class="{ 'drop-target': isDropTarget(column) }"
        @dragover.prevent="onDragOver(column)"
        @dragleave="onDragLeave"
        @drop="onDrop(column)"
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
            <v-icon class="pr-1" :color="column.color">{{ 'fa: fa-solid fa-cube' }}</v-icon>
            {{ column.status }}
            <v-chip class="text-subtitle-1 font-weight-black" variant="tonal">
              {{ column.cards.length }}
            </v-chip>
            <v-menu align="left" v-if="column.status !== 'No Status'">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-horizontal" v-bind="props"></v-btn>
              </template>

              <v-list :border="true" bg-color="background" rounded="lg">
                <v-list-subheader>Cards</v-list-subheader>

                <v-list-item>
                  <v-btn :elevation="0"
                    ><v-icon>{{ 'fa: fa-solid fa-box-archive' }}</v-icon
                    >{{ 'Archive all' }}</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-dialog v-model="delete_all_jobs_dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn :elevation="0" v-bind="props"
                        ><v-icon>{{ 'fa: fa-regular fa-trash-can' }}</v-icon
                        >{{ 'Delete all' }}</v-btn
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
                              Are you sure you want to delete all the jobs in the
                              <strong>{{
                                column.status.charAt(0).toUpperCase() + column.status.slice(1)
                              }}</strong>
                              column. all the jobs within it will be permanently removed through out
                              the company.
                            </p>
                            <strong> This action cannot be reversed. </strong>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="columnDeleteAllJobs(column)" color="success" variant="text">
                          {{ 'Delete' }}
                        </v-btn>

                        <v-btn color="error" variant="text" @click="delete_all_jobs_dialog = false"
                          >Cancel</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list-item>
                <v-list-subheader>Column</v-list-subheader>

                <v-list-item>
                  <v-dialog max-height="700" max-width="500" v-model="edit_column_details_dialog">
                    <template v-slot:activator="{ props }">
                      <v-btn :elevation="0" v-bind="props"
                        ><v-icon>{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon
                        >{{ 'Edit details' }}
                      </v-btn>
                    </template>
                    <v-card elevation="14" rounded="md" max-height="700" max-width="900">
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
                <v-list-item>
                  <v-dialog v-model="delete_column_dialog" max-width="500px">
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
          <!--          <v-card-item-->
          <!--            class="font-weight-black text-h5"-->
          <!--            style="font-family: 'Nunito', sans-serif"-->
          <!--            v-else-if="column.status === 'In Progress'"-->
          <!--            align="center"-->
          <!--            ><v-icon class="pr-1" color="light-blue-accent-4">{{-->
          <!--              'fa:fas fa-spinner fa-spin'-->
          <!--            }}</v-icon>-->
          <!--            {{ column.status-->
          <!--            }}<v-chip class="text-subtitle-1 font-weight-black" variant="tonal">-->
          <!--              {{ column.cards.length }}-->
          <!--            </v-chip></v-card-item-->
          <!--          ><v-card-item-->
          <!--            class="font-weight-black text-h5"-->
          <!--            style="font-family: 'Nunito', sans-serif"-->
          <!--            v-else-if="column.status === 'Awaiting review'"-->
          <!--            align="center"-->
          <!--            ><v-icon class="pr-1" color="purple-accent-3">{{ 'fa:fas fa-hourglass-half' }}</v-icon>-->
          <!--            {{ column.status }}-->
          <!--            <v-chip class="text-subtitle-1 font-weight-black" variant="tonal">-->
          <!--              {{ column.cards.length }}-->
          <!--            </v-chip></v-card-item-->
          <!--          ><v-card-item-->
          <!--            class="font-weight-black text-h5"-->
          <!--            style="font-family: 'Nunito', sans-serif"-->
          <!--            v-else-if="column.status === 'Done'"-->
          <!--            align="center"-->
          <!--            ><v-icon class="pr-1" color="green-accent-4">{{-->
          <!--              'fa: fa-solid fa-clipboard-check'-->
          <!--            }}</v-icon>-->
          <!--            {{ column.status }}-->
          <!--            <v-chip class="text-subtitle-1 font-weight-black" variant="tonal">-->
          <!--              {{ column.cards.length }}-->
          <!--            </v-chip></v-card-item-->
          <!--          >-->

          <v-virtual-scroll
            :items="column.cards"
            class="kanban-column-scroller"
            :max-height="850"
            :max-width="500"
          >
            <template #default="{ item }">
              <v-card-text>
                <v-card
                  @click="clickedEvent(item)"
                  variant="flat"
                  elevation="3"
                  class="kanban-card mb-2"
                  draggable="true"
                  :class="{ dragging: isDragging(item) }"
                  @dragstart="onDragStart(item, column)"
                  @dragend="onDragEnd"
                  aria-grabbed="true"
                  role="option"
                >
                  <v-card-item class="text-h6" style="font-family: 'Nunito', sans-serif"
                    ><b>{{ item.heading }}</b></v-card-item
                  >
                  <v-card-subtitle v-if="item.status === column.status"
                    ><v-chip
                      :color="column.color"
                      variant="elevated"
                      rounded="sm"
                      density="comfortable"
                    >
                      <b>{{ item.status }}</b></v-chip
                    ></v-card-subtitle
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

                  <v-card-subtitle v-if="item.priority === 'High'"
                    ><v-chip color="#FF0000" variant="tonal" density="comfortable"
                      ><b>Priority: {{ item.priority }}</b></v-chip
                    ></v-card-subtitle
                  ><v-card-subtitle v-if="item.priority === 'Medium'"
                    ><v-chip color="amber-darken-4" variant="tonal" density="comfortable"
                      ><b>Priority: {{ item.priority }}</b></v-chip
                    ></v-card-subtitle
                  ><v-card-subtitle v-if="item.priority === 'Low'"
                    ><v-chip color="#008000" variant="tonal" density="comfortable"
                      ><b>Priority: {{ item.priority }}</b></v-chip
                    ></v-card-subtitle
                  >
                  <v-card-text>
                    <v-chip
                      color="light-blue-accent-4"
                      class=""
                      v-for="(n, i) in item.tags.length"
                      :key="i"
                      ><b>{{ item.tags[i] }}</b></v-chip
                    >
                  </v-card-text>
                </v-card>
              </v-card-text>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-dialog max-height="700" max-width="500" v-model="add_column_dialog">
          <template v-slot:activator="{ props }">
            <v-btn icon="fa: fa-solid fa-plus" v-bind="props"></v-btn>
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
    </v-row>
  </v-container>
  <v-dialog v-model="JobCardVisibility" max-width="1000px">
    <JBC @close="JobCardVisibility = false" :passedInJob="SelectedEvent" />
  </v-dialog>
</template>

<script lang="ts">
import type { JobCardDataFormat, Column } from '../types'
import '@mdi/font/css/materialdesignicons.css'
import JBC from '../management/ManagerJobCard.vue'
import axios from 'axios'

export default {
  components: {
    JBC
  },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      delete_all_jobs_dialog: false,
      add_column_dialog: false,
      delete_column_dialog: false,
      edit_column_details_dialog: false,
      // columns: [
      //   { id: 0, status: 'No Status', color: 'purple-accent-3', cards: [] },
      //   { id: 1, status: 'Todo', color: '#FF073A', cards: [] },
      //   { id: 2, status: 'In Progress', color: '#39FF14', cards: [] },
      //   { id: 3, status: 'Awaiting review', color: '#0FF0FC', cards: [] },
      //   { id: 4, status: 'Done', color: '#FFFF33', cards: [] }
      // ] as Column[],
      columns: [] as Column[],
      new_column_name: '',
      error_message: '',
      column_color: '',
      SelectedEvent: {},
      JobCardVisibility: false,
      order_of_sorting_in_columns: ['High', 'Medium', 'Low'],
      draggedCard: null as JobCardDataFormat | null,
      sourceColumn: null as Column | null,
      dropTarget: null as Column | null,
      starting_cards: [
        {
          jobId: 'J12348',
          heading: 'Roof Inspection',
          jobDescription: 'Inspection of roof for potential leaks and damages.',
          startDate: '2024-07-04',
          endDate: '2024-07-04',
          status: 'Done',
          clientName: 'Peter Parker',
          street: '100 Queens Blvd',
          suburb: 'Sunnyvale',
          city: 'Gotham',
          postalCode: '54321',
          imagesTaken: ['roof_before.jpg', 'roof_after.jpg'],
          inventoryUsed: ['Ladder', 'Camera'],
          taskList: ['Inspect roof', 'Document findings', 'Provide recommendations'],
          comments: ['Check for any loose tiles', 'Ensure all gutters are clear'],
          priority: 'High',
          tags: ['Roofing', 'Inspection', 'Residential']
        },
        {
          jobId: 'J12349',
          heading: 'Garden Landscaping',
          jobDescription: 'Landscaping the garden area with new plants and a water feature.',
          startDate: '2024-07-05',
          endDate: '2024-07-07',
          status: 'In Progress',
          clientName: 'Bruce Wayne',
          street: '200 Wayne Manor',
          suburb: 'Richville',
          city: 'Gotham',
          postalCode: '67891',
          imagesTaken: ['garden_before.jpg', 'landscaping_progress.jpg'],
          inventoryUsed: ['Plants', 'Soil', 'Water Feature Kit'],
          taskList: ['Remove old plants', 'Plant new ones', 'Install water feature'],
          comments: ['Ensure proper irrigation', 'Use organic soil'],
          priority: 'Medium',
          tags: ['Landscaping', 'Gardening', 'Residential']
        },
        {
          jobId: 'J12350',
          heading: 'Office Painting',
          jobDescription: 'Repainting the office walls with new colors.',
          startDate: '2024-07-06',
          endDate: '2024-07-08',
          status: 'Todo',
          clientName: 'Wayne Enterprises',
          street: '300 Industrial Rd',
          suburb: 'Tech Park',
          city: 'Metropolis',
          postalCode: '23456',
          imagesTaken: [],
          inventoryUsed: ['Paint', 'Brushes', 'Rollers'],
          taskList: ['Prepare walls', 'Apply primer', 'Paint walls'],
          comments: ['Use non-toxic paint', 'Ensure even coverage'],
          priority: 'Low',
          tags: ['Painting', 'Office', 'Commercial']
        },
        {
          jobId: 'J12351',
          heading: 'Pool Cleaning',
          jobDescription: 'Thorough cleaning of the swimming pool.',
          startDate: '2024-07-07',
          endDate: '2024-07-07',
          status: 'Done',
          clientName: 'Clark Kent',
          street: '400 Kent Farm',
          suburb: 'Smallville',
          city: 'Metropolis',
          postalCode: '98765',
          imagesTaken: ['pool_before.jpg', 'pool_after.jpg'],
          inventoryUsed: ['Pool Cleaner', 'Chemicals', 'Brushes'],
          taskList: ['Remove debris', 'Clean pool surface', 'Add chemicals'],
          comments: ['Check water pH levels', 'Ensure filter is working'],
          priority: 'Medium',
          tags: ['Pool', 'Cleaning', 'Residential']
        },
        {
          jobId: 'J12352',
          heading: 'AC Installation',
          jobDescription: 'Installation of a new air conditioning system.',
          startDate: '2024-07-08',
          endDate: '2024-07-09',
          status: 'In Progress',
          clientName: 'Tony Stark',
          street: '500 Stark Tower',
          suburb: 'Downtown',
          city: 'New York',
          postalCode: '10101',
          imagesTaken: ['ac_unit.jpg', 'installation_progress.jpg'],
          inventoryUsed: ['AC Unit', 'Ducts', 'Thermostat'],
          taskList: ['Remove old unit', 'Install new unit', 'Test system'],
          comments: ['Check duct connections', 'Ensure system efficiency'],
          priority: 'High',
          tags: ['HVAC', 'Installation', 'Commercial']
        },
        {
          jobId: 'J12353',
          heading: 'Window Replacement',
          jobDescription: 'Replacing old windows with energy-efficient ones.',
          startDate: '2024-07-10',
          endDate: '2024-07-11',
          status: 'Todo',
          clientName: 'Natasha Romanoff',
          street: '600 Widow Street',
          suburb: 'East Side',
          city: 'New York',
          postalCode: '20202',
          imagesTaken: [],
          inventoryUsed: ['Windows', 'Sealant', 'Tools'],
          taskList: ['Remove old windows', 'Install new windows', 'Seal edges'],
          comments: ['Ensure proper insulation', 'Dispose of old windows'],
          priority: 'Medium',
          tags: ['Windows', 'Replacement', 'Residential']
        },
        {
          jobId: 'J12354',
          heading: 'Security System Upgrade',
          jobDescription: 'Upgrading the security system with new cameras and sensors.',
          startDate: '2024-07-11',
          endDate: '2024-07-12',
          status: 'In Progress',
          clientName: 'Steve Rogers',
          street: '700 Shield Avenue',
          suburb: 'West Side',
          city: 'Brooklyn',
          postalCode: '30303',
          imagesTaken: ['old_system.jpg', 'new_system.jpg'],
          inventoryUsed: ['Cameras', 'Sensors', 'Control Panel'],
          taskList: ['Remove old system', 'Install new system', 'Test sensors'],
          comments: ['Ensure all areas are covered', 'Test system functionality'],
          priority: 'High',
          tags: ['Security', 'Upgrade', 'Residential']
        },
        {
          jobId: 'J12355',
          heading: 'Kitchen Renovation',
          jobDescription:
            'Complete renovation of the kitchen including new cabinets and appliances.',
          startDate: '2024-07-13',
          endDate: '2024-07-20',
          status: 'Todo',
          clientName: 'Bruce Banner',
          street: '800 Hulk Street',
          suburb: 'Uptown',
          city: 'San Francisco',
          postalCode: '40404',
          imagesTaken: [],
          inventoryUsed: ['Cabinets', 'Appliances', 'Tiles'],
          taskList: ['Remove old kitchen', 'Install cabinets', 'Fit appliances'],
          comments: ['Ensure electrical safety', 'Check plumbing connections'],
          priority: 'High',
          tags: ['Renovation', 'Kitchen', 'Residential']
        },
        {
          jobId: 'J12356',
          heading: 'Fence Installation',
          jobDescription: 'Installing a new wooden fence around the property.',
          startDate: '2024-07-14',
          endDate: '2024-07-16',
          status: 'Done',
          clientName: 'Diana Prince',
          street: '900 Amazon Lane',
          suburb: 'Westfield',
          city: 'Themyscira',
          postalCode: '50505',
          imagesTaken: ['old_fence.jpg', 'new_fence.jpg'],
          inventoryUsed: ['Wooden Panels', 'Nails', 'Tools'],
          taskList: ['Remove old fence', 'Install new fence', 'Paint fence'],
          comments: ['Ensure fence is level', 'Use weather-resistant paint'],
          priority: 'Medium',
          tags: ['Fence', 'Installation', 'Residential']
        },
        {
          jobId: 'J12357',
          heading: 'Basement Waterproofing',
          jobDescription: 'Waterproofing the basement to prevent future leaks.',
          startDate: '2024-07-17',
          endDate: '2024-07-19',
          status: 'Todo',
          clientName: 'Barry Allen',
          street: '1000 Speedster Drive',
          suburb: 'Central City',
          city: 'Keystone',
          postalCode: '60606',
          imagesTaken: [],
          inventoryUsed: ['Sealant', 'Membrane', 'Tools'],
          taskList: ['Clean basement', 'Apply sealant', 'Install waterproof membrane'],
          comments: ['Check for existing leaks', 'Ensure proper drainage'],
          priority: 'High',
          tags: ['Basement', 'Waterproofing', 'Residential']
        }
      ] as JobCardDataFormat[],
      column_name_rule: [
        (v: string) => !!v || 'Column name is required',
        (v: string) => (v && v.length <= 20) || 'Column name must be less than 20 characters'
      ]
    }
  },
  methods: {
    // columnDelete(col: Column) {
    //   for (let i = 0; i < col.cards.length; i++) {
    //     this.columns[0].cards.push(col.cards[i])
    //     col.cards[i].status = this.columns[0].status
    //     console.log(col.cards[i].status)
    //   }
    //   this.N_M_Sort(this.columns[0].cards, this.order_of_sorting_in_columns)
    //   this.columns.splice(this.columns.indexOf(col), 1)
    //   this.delete_column_dialog = false
    // },
    columnDeleteAllJobs(col: Column) {
      //add a modal that will ask the user if they are sure they want to delete all the cards in a job column
      col.cards.splice(0, col.cards.length)
      this.delete_all_jobs_dialog = false
      // window.location.reload()
    },
    editColumnButtonClickedSave(col: Column) {
      if (this.new_column_name === '' && this.column_color === '') {
        this.error_message = 'No changes were made'
        return
      }

      if (this.new_column_name.length > 20) {
        this.error_message = 'Column name length should be shorter than 20 characters'
      }
      if (this.new_column_name !== '') {
        col.status = this.new_column_name
        this.new_column_name = ''
      }
      if (this.column_color !== '') {
        col.color = this.column_color
        this.column_color = ''
      }
      this.edit_column_details_dialog = false
    },
    addColumnButtonClickedSave() {
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
      // const column: Column = {
      //   id: this.columns.length + 1,
      //   status: this.new_column_name,
      //   color: this.column_color,
      //   cards: []
      // }
      // this.add_column_dialog = !this.add_column_dialog
      // this.columns.push(column)

      this.new_column_name = ''
      this.column_color = ''
      this.add_column_dialog = false
    },
    addColorPickerUpdate() {
      console.log(this.column_color)
    },
    addColumnButtonClicked() {
      console.log('Add button clicked')
    },
    clickedEvent(payload: JobCardDataFormat) {
      this.SelectedEvent = payload
      this.openJobCard()
    },
    openJobCard() {
      console.log('edit button clicked')
      this.JobCardVisibility = true
    },
    // loading(cards: JobCardDataFormat[]) {
    //   for (let i = 0; i < cards.length; i++) {
    //     this.columns.forEach((value: Column) => {
    //       if (value.status === cards[i].status) {
    //         console.log('hit')
    //         this.loadCardsInRespectiveColumns(cards[i], value)
    //       }
    //     })
    //   }
    //   this.columns.forEach((col: Column) => {
    //     this.N_M_Sort(col.cards, this.order_of_sorting_in_columns)
    //   })
    //   console.log(this.columns[0].cards.length)
    // },
    async loadColumns() {
      console.log('load Column request')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const loaded_tags_response = await axios.get(
          apiURL + `job/status/all/${localStorage['currentCompany']}`,
          config
        )
        console.log(loaded_tags_response)
        this.columns.push({
          id: '0',
          status: 'No Status',
          color: 'purple-accent-3',
          cards: [],
          companyId: localStorage['currentCompany']
        })
        loaded_tags_response.data.data.forEach((status: any) => {
          this.columns.push({
            id: status._id,
            status: status.status,
            color: status.colour,
            companyId: status.companyId,
            cards: [] as JobCardDataFormat[]
          })
        })
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    async loadJobs() {
      console.log('load jobs request')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const loaded_tags_response = await axios.get(
          apiURL + `job/all/company/detailed/${localStorage['currentCompany']}`,
          config
        )
        let valid_data = []
        let loaded_tags_res = loaded_tags_response.data.data
        for (let i = 0; i < loaded_tags_res.length; i++) {
          if (loaded_tags_res[i].priorityTag === undefined) continue
          valid_data.push(loaded_tags_res[i])
        }

        for (let i = 0; i < valid_data.length; i++) {
          const status_res = await axios.get(apiURL + `job/status/${valid_data[i].status}`, config)

          this.starting_cards.push({
            jobId: '',
            heading: '',
            jobDescription: 'Repainting the office walls with new colors.',
            startDate: '2024-07-06',
            endDate: '2024-07-08',
            status: 'Todo',
            clientName: 'Wayne Enterprises',
            street: '300 Industrial Rd',
            suburb: 'Tech Park',
            city: 'Metropolis',
            postalCode: '23456',
            imagesTaken: [],
            inventoryUsed: ['Paint', 'Brushes', 'Rollers'],
            taskList: ['Prepare walls', 'Apply primer', 'Paint walls'],
            comments: ['Use non-toxic paint', 'Ensure even coverage'],
            priority: 'Low',
            tags: ['Painting', 'Office', 'Commercial']
          })
        }
        console.log(valid_data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    loadCardsInRespectiveColumns(card: JobCardDataFormat, column: Column) {
      column.cards.push(card)
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
    onDrop(targetColumn: Column) {
      if (this.draggedCard && this.sourceColumn) {
        this.sourceColumn.cards = this.sourceColumn.cards.filter(
          (c) => c.jobId !== this.draggedCard!.jobId
        )
        this.draggedCard.status = targetColumn.status
        targetColumn.cards.push(this.draggedCard)
        this.N_M_Sort(targetColumn.cards, this.order_of_sorting_in_columns)
        this.makeRequest()
        this.draggedCard = null
        this.sourceColumn = null
        this.dropTarget = null
      }
    },
    makeRequest() {},
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
        let tracker1: number = tracker.get(x.priority) || 0
        let tracker2: number = tracker.get(y.priority) || 0

        if (tracker1 === 0 && tracker2 === 0) return 0
        else if (tracker1 === 0) return 1
        else if (tracker2 === 0) return -1

        return tracker1 - tracker2
      })
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
    // this.loading(this.starting_cards)
    this.loadColumns()
    // this.loadJobs()
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
