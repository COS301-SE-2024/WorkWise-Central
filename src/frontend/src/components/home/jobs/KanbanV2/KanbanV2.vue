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
        :col="12"
        :md="3"
      >
        <v-card variant="flat" elevation="1" color="red">
          <v-card-item
            class="font-weight-black text-h5"
            style="font-family: 'Nunito', sans-serif"
            align="center"
          >
            <v-icon class="pr-1" color="#708090">{{ 'fa: fa-solid fa-cube' }}</v-icon>
            {{ column.status }}
            <v-chip class="text-subtitle-1 font-weight-black" variant="tonal">
              {{ column.cards.length }}
            </v-chip>
            <v-menu align="left">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
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
                  <v-btn :elevation="0"
                    ><v-icon>{{ 'fa: fa-regular fa-trash-can' }}</v-icon
                    >{{ 'Delete all' }}</v-btn
                  >
                </v-list-item>
                <v-list-subheader>Column</v-list-subheader>

                <v-list-item>
                  <v-btn :elevation="0"
                    ><v-icon>{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon
                    >{{ 'Edit details' }}
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn :elevation="0"
                    ><v-icon>{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon
                    >{{ 'Delete' }}</v-btn
                  >
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
                    ><v-chip color="#708090" variant="elevated" rounded="sm" density="comfortable">
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

export default {
  components: {
    JBC
  },
  data() {
    return {
      columns: [
        { id: 1, status: 'Todo', cards: [] },
        { id: 2, status: 'In Progress', cards: [] },
        { id: 3, status: 'Awaiting review', cards: [] },
        { id: 4, status: 'Done', cards: [] },
        { id: 5, status: 'Hello', cards: [] }
      ] as Column[],

      SelectedEvent: null as JobCardDataFormat | null,
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
      ] as JobCardDataFormat[]
    }
  },
  methods: {
    clickedEvent(payload: JobCardDataFormat) {
      this.SelectedEvent = payload
      this.openJobCard()
    },
    openJobCard() {
      console.log('edit button clicked')
      this.JobCardVisibility = true
    },
    loading(cards: JobCardDataFormat[]) {
      for (let i = 0; i < cards.length; i++) {
        this.columns.forEach((value: Column) => {
          if (value.status === cards[i].status) {
            console.log('hit')
            this.loadCardsInRespectiveColumns(cards[i], value)
          }
        })
      }
      this.columns.forEach((col: Column) => {
        this.N_M_Sort(col.cards, this.order_of_sorting_in_columns)
      })
      console.log(this.columns[0].cards.length)
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
    }
  },
  mounted() {
    this.loading(this.starting_cards)
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
