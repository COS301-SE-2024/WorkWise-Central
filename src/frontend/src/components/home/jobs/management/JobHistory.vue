<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center">
        <!--        <v-btn @click="toggleHistory" color="success" :icon="true">-->
        <!--          <v-icon>-->
        <!--            {{ showHistory ? 'fa: fa-solid fa-eye-slash' : 'fa: fa-solid fa-eye' }}-->
        <!--          </v-icon>-->
        <!--          {{ showHistory ? 'Hide History' : 'Show History' }}-->
        <!--        </v-btn>-->
        <div class="pb-2">
          <Button
            @click="toggleHistory"
            label="Show History"
            :icon="showHistory ? 'fa: fa-solid fa-eye-slash' : 'fa: fa-solid fa-eye'"
            :class="showHistory ? 'p-button-danger' : 'p-button-success'"
          >
          </Button>
        </div>
      </v-col>
    </v-row>
    <v-card v-if="showHistory" height="auto" elevation="0">
      <v-list>
        <v-list-item
          v-for="(event, index) in paginatedEvents"
          :key="event.timestamp"
          :class="{ 'alternate-bg': index % 2 !== 0 }"
        >
          <v-list-item-content>
            <v-list-item-title>{{ event.event }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatTimestamp(event.timestamp) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="paginatedEvents.length === 0">
          <v-list-item-content>
            <v-list-item-title>No events found</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        class="d-flex justify-center mt-4"
        color="primary"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import axios from 'axios'
import Button from 'primevue/button'

// Define the type for an event
interface Event {
  event: string
  timestamp: string
}

// Props for the component
const props = defineProps<{
  jobHistory: Event[]
  jobID: string
}>()

const events = ref<Event[]>([])

// Local state to toggle history visibility
const showHistory = ref<boolean>(false)
const currentPage = ref<number>(1)
const itemsPerPage = 10

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

// Format timestamp to a human-readable string
const formatTimestamp = (timestamp: string): string => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}

// Calculate the total number of pages
const totalPages = computed(() => {
  return Math.ceil(events.value.length / itemsPerPage)
})

// Compute the paginated events based on the current page
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return events.value.slice(start, end)
})

const refreshHistory = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const res = await axios.get(`${apiUrl}job/id/${props.jobID}`)
    events.value = res.data.data.history
    console.log('History updated:', res)
  } catch (error) {
    console.log(error)
  }
}

const toggleHistory = async () => {
  showHistory.value = !showHistory.value
  await refreshHistory()
}

onMounted(() => {
  refreshHistory()
})
</script>

<style scoped>
/* Ensure the button is positioned correctly */
.v-btn {
  margin-bottom: 16px; /* Adjust if needed */
}

/* Style for alternating background colors */
.v-list-item:nth-of-type(odd) {
  background-color: #f0f0f0; /* Example color for odd rows */
}
</style>
