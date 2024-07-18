<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="column in columns"
        :key="column.id"
        cols="3"
        :class="{ 'drop-target': isDropTarget(column) }"
        @dragover.prevent="onDragOver(column)"
        @dragleave="onDragLeave"
        @drop="onDrop(column)"
        role="listbox"
        aria-dropeffect="move"
      >
        <v-card variant="flat">
          <v-card-title color="red" class="font-weight-black" v-if="column.status === 'Todo'"
            ><v-icon class="pr-1" color="#708090">{{ 'fa: fa-solid fa-clipboard-list' }}</v-icon>
            {{ column.status }}
            <v-chip class="text-subtitle-1 font-weight-black" color="black" variant="tonal">
              {{ column.cards.length }}
            </v-chip></v-card-title
          >
          <v-card-title class="font-weight-black" v-else-if="column.status === 'In Progress'"
            ><v-icon color="blue">{{ 'fa:fas fa-spinner fa-spin' }}</v-icon> {{ column.status
            }}<v-chip class="text-subtitle-1 font-weight-black" color="black" variant="tonal">
              {{ column.cards.length }}
            </v-chip></v-card-title
          ><v-card-title class="font-weight-black" v-else-if="column.status === 'Awaiting review'"
            ><v-icon color="purple">{{ 'fa:fas fa-hourglass-half' }}</v-icon> {{ column.status }}
            <v-chip class="text-subtitle-1 font-weight-black" color="black" variant="tonal">
              {{ column.cards.length }}
            </v-chip></v-card-title
          ><v-card-title class="font-weight-black" v-else-if="column.status === 'Done'"
            ><v-icon color="green">{{ 'fa: fa-solid fa-clipboard-check' }}</v-icon>
            {{ column.status }}
            <v-chip class="text-subtitle-1 font-weight-black" color="black" variant="tonal">
              {{ column.cards.length }}
            </v-chip></v-card-title
          >

          <v-card-text>
            <v-card
              variant="flat"
              v-for="card in column.cards"
              :key="card.jobId"
              class="kanban-card mb-2"
              draggable="true"
              :class="{ dragging: isDragging(card) }"
              @dragstart="onDragStart(card, column)"
              @dragend="onDragEnd"
              aria-grabbed="true"
              role="option"
            >
              <v-card-title>{{ card.heading }}</v-card-title>
              <v-card-subtitle v-if="column.status === 'Todo'"
                ><v-chip color="#708090" variant="flat" rounded="sm" density="comfortable">{{
                  card.status
                }}</v-chip></v-card-subtitle
              ><v-card-subtitle v-else-if="column.status === 'In Progress'"
                ><v-chip color="blue" variant="flat" rounded="sm" density="comfortable">{{
                  card.status
                }}</v-chip></v-card-subtitle
              ><v-card-subtitle v-else-if="column.status === 'Awaiting review'"
                ><v-chip color="purple" variant="flat" rounded="sm" density="comfortable">{{
                  card.status
                }}</v-chip></v-card-subtitle
              ><v-card-subtitle v-else-if="column.status === 'Done'"
                ><v-chip color="green" variant="flat" rounded="sm" density="comfortable">{{
                  card.status
                }}</v-chip></v-card-subtitle
              >

              <v-card-text class="text-body-1">
                <b>Description:</b> {{ card.jobDescription }}</v-card-text
              >

              <v-card-subtitle v-if="card.priority === 'High'"
                ><v-chip color="#FF0000" variant="tonal" density="comfortable"
                  >Priority: {{ card.priority }}</v-chip
                ></v-card-subtitle
              ><v-card-subtitle v-if="card.priority === 'Medium'"
                ><v-chip color="#FFA500" variant="tonal" density="comfortable"
                  >Priority: {{ card.priority }}</v-chip
                ></v-card-subtitle
              ><v-card-subtitle v-if="card.priority === 'Low'"
                ><v-chip color="#008000" variant="tonal" density="comfortable"
                  >Priority: {{ card.priority }}</v-chip
                ></v-card-subtitle
              >
              <v-card-text>
                <v-chip color="blue" variant="tonal" v-for="tag in card.tags">{{ tag }}</v-chip>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { JobCardDataFormat, Column } from '../types'
import '@mdi/font/css/materialdesignicons.css' // icon import

const columns = ref<Column[]>([
  { id: 1, status: 'Todo', cards: [] },
  { id: 2, status: 'In Progress', cards: [] },
  { id: 3, status: 'Awaiting review', cards: [] },
  { id: 4, status: 'Done', cards: [] }
])

const order_of_sorting_in_columns = ref<string[]>(['High', 'Medium', 'Low'])

const draggedCard = ref<JobCardDataFormat | null>(null)
const sourceColumn = ref<Column | null>(null)
const dropTarget = ref<Column | null>(null)

let starting_cards = ref<JobCardDataFormat[]>([
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
    jobDescription: 'Complete renovation of the kitchen including new cabinets and appliances.',
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
])

function loading(cards: JobCardDataFormat[]) {
  for (let i = 0; i < cards.length; i++) {
    switch (cards[i].status) {
      case 'Todo':
        loadCardsInRespectiveColumns(cards[i], columns.value[0])
        break
      case 'In Progress':
        loadCardsInRespectiveColumns(cards[i], columns.value[1])
        break
      case 'Awaiting review':
        loadCardsInRespectiveColumns(cards[i], columns.value[2])
        break
      case 'Done':
        loadCardsInRespectiveColumns(cards[i], columns.value[3])
        break
      default:
        console.log('No column with such status name')
    }
  }
}
function loadCardsInRespectiveColumns(card: JobCardDataFormat, column: Column) {
  column.cards.push(card)
  // loading(starting_cards.value)
}

function onDragStart(card: JobCardDataFormat, column: Column) {
  draggedCard.value = card
  sourceColumn.value = column
}

function onDragEnd() {
  draggedCard.value = null
  dropTarget.value = null
}

function onDragOver(column: Column) {
  dropTarget.value = column
}

function onDragLeave() {
  dropTarget.value = null
}

function onDrop(targetColumn: Column) {
  if (draggedCard.value && sourceColumn.value) {
    sourceColumn.value.cards = sourceColumn.value.cards.filter(
      (c) => c.jobId !== draggedCard.value!.jobId
    )
    draggedCard.value.status = targetColumn.status
    targetColumn.cards.push(draggedCard.value)
    draggedCard.value = null
    sourceColumn.value = null
    dropTarget.value = null
  }
}

function isDropTarget(column: Column) {
  return dropTarget.value === column
}

function isDragging(card: JobCardDataFormat) {
  return draggedCard.value === card
}

const N_M_Sort = (sorted: string[], sortee: string[]) => {
  let tracker = new Map()

  for (let i = 0; i < sortee.length; i++) if (!tracker.has(sortee[i])) tracker.set(sortee[i], i + 1)

  sorted.sort((x: string, y: string) => {
    let tracker1: number = tracker.get(x) || 0
    let tracker2: number = tracker.get(y) || 0

    if (tracker1 === 0 && tracker2 === 0) return x - y
    else if (tracker1 === 0) return 1
    else if (tracker2 === 0) return -1

    return tracker1 - tracker2
  })
}

onMounted(() => {
  loading(starting_cards.value)
})
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
