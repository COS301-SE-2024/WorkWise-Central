<template>
  <v-dialog
    v-model="clientDialog"
    max-width="400px"
    location="bottom"
    location-strategy="connected"
    opacity="0"
    origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="mb-2" outlined @click="openClientDialogAndFetchClients" v-bind="activatorProps">
        <v-icon left>
          {{ 'fa: fa-solid fa-user-edit' }}
        </v-icon>
        Change Client
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Change the client
        </v-card-title>

        <v-card-text>
          <div class="text-caption pa-3">Select a client</div>

          <v-autocomplete
            v-model="selectedClientName"
            hint="Click the field to select a client"
            :items="clientNames"
            label="Select Client"
            prepend-icon="fa: fa-solid fa-handshake"
            persistent-hint
            outlined
            dense
            class="my-custom-autocomplete"
            color="primary"
            background-color="#f5f5f5"
            rounded="l"
            variant="solo"
          >
          </v-autocomplete>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <v-btn @click="saveClient" color="success">Save</v-btn>
          <v-btn @click="isActive.value = false" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      clientDialog: false,
      selectedClientName: '',
      clientNames: []
    }
  },
  methods: {
    openClientDialogAndFetchClients() {
      this.clientDialog = true
      // Fetch clients logic here
    },
    saveClient() {
      // Save client logic here
      this.clientDialog = false
    }
  }
}
</script>

<style scoped>
.my-custom-autocomplete {
  /* Custom styles here */
}
</style>
