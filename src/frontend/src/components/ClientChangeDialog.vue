<template>
  <v-dialog v-model="clientDialog" max-width="600px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn outlined v-bind="activatorProps" @click="openClientDialogAndFetchClients">
        <v-icon left>mdi-account-switch</v-icon>
        Change Client
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
        Change the client for this job
      </v-card-title>

      <v-card-text>
        <div class="text-caption pa-3">Select a client</div>

        <v-autocomplete
          v-model="selectedClientName"
          hint="Click the field to select a client"
          :items="clientNames"
          label="Select Client"
          prepend-icon="mdi-account"
          persistent-hint
        ></v-autocomplete>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="saveClient">Save</v-btn>
        <v-btn color="blue darken-1" @click="clientDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface ClientDetails {
  firstName?: string
  surname?: string
  name?: string
}

interface Client {
  details: ClientDetails
  _id: string
  fullName?: string
}

// For change client
const clientDialog = ref(false)
const selectedClient = ref<string | null>(null)
const clientChips = ref<{ name: string }[]>([])
const clients = ref<Client[]>([])
const selectedClientName = ref<string | null>(null)
const clientNames = ref<string[]>([])
const router = useRouter()

const openClientDialogAndFetchClients = async () => {
  clientDialog.value = true
  await fetchClients()
}

// API call to get clients and stores them here
const fetchClients = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  }
  try {
    const response = await axios.get('http://localhost:3000/client/all', config)
    console.log(response.data)
    clients.value = response.data.data.map((client: Client) => ({
      ...client,
      fullName: `${client.details.firstName ?? ''} ${client.details.surname ?? ''}`.trim()
    }))

    // Populate clientNames array with just the names
    clientNames.value = clients.value.map((client: Client) =>
      client.details.firstName && client.details.surname
        ? `${client.details.firstName} ${client.details.surname}`
        : client.details.name ?? 'Unknown Name'
    )
  } catch (error) {
    console.error('Failed to fetch clients:', error)
  }
}

// Watch for changes in selectedClientName and update selectedClient
watch(
  () => selectedClientName.value,
  (newVal) => {
    const selected = clients.value.find((client: Client) => {
      const fullName =
        client.details.firstName && client.details.surname
          ? `${client.details.firstName} ${client.details.surname}`
          : client.details.name ?? 'Unknown Name'
      return fullName === newVal
    })
    selectedClient.value = selected?._id ?? null
  }
)

const saveClient = () => {
  if (selectedClientName.value) {
    clientChips.value.push({ name: selectedClientName.value })
    console.log('Client chips:', clientChips.value)
  }
  clientDialog.value = false
}
</script>
