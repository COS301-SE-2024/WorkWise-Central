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
    <v-card v-if="showHistory" height="auto">
      <v-card-title>Job History</v-card-title>
      <v-list>
        <v-list-item-group>
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
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatDistanceToNow } from 'date-fns'

// // Props for the component
// const props = defineProps({
//   events: {
//     type: Array,
//     default: () => [] // Ensure events is an array by default
//   }
// });

const events = [
  { event: 'Task started', timestamp: '2024-08-08T14:05:11.173Z' },
  { event: 'Task completed', timestamp: '2024-08-08T15:00:00.000Z' }
]

// Local state to toggle history visibility
const showHistory = ref(false)

// Format timestamp to a human-readable string
const formatTimestamp = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}
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
