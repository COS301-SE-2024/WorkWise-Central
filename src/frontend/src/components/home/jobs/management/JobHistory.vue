<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn @click="showHistory = !showHistory" color="success" :icon="true">
          <v-icon>
            {{ showHistory ? 'fa: fa-solid fa-eye-slash' : 'fa: fa-solid fa-eye' }}
          </v-icon>
          {{ showHistory ? 'Hide History' : 'Show History' }}
        </v-btn>
      </v-col>
    </v-row>
    <v-card v-if="showHistory" height="auto" elevation="0">
      <v-list>
        <v-list-item
          v-for="(event, index) in events"
          :key="event.timestamp"
          :class="{ 'alternate-bg': index % 2 !== 0 }"
        >
          <v-list-item-content>
            <v-list-item-title>{{ event.event }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatTimestamp(event.timestamp) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="events.length === 0">
          <v-list-item-content>
            <v-list-item-title>No events found</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatDistanceToNow } from 'date-fns'

// Define the type for an event
interface Event {
  event: string
  timestamp: string
}

// Props for the component
const props = defineProps<{
  jobHistory: Event[]
}>()

const events = ref<Event[]>([])

// Local state to toggle history visibility
const showHistory = ref<boolean>(false)

// Format timestamp to a human-readable string
const formatTimestamp = (timestamp: string): string => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}

onMounted(() => {
  if (props.jobHistory && props.jobHistory.length > 0) {
    events.value = props.jobHistory
  }
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
