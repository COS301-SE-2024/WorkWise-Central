<template>
  <v-dialog
      v-model="membersDialog"
      max-width="400px"
      location="bottom"
      location-strategy="connected"
      opacity="0"
      origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="mb-2" outlined @click="membersDialog = true" v-bind="activatorProps">
        <v-icon class="d-none d-lg-inline-block mr-2" left>
          {{ 'fa: fa-solid fa-users-cog' }}
        </v-icon>
        Select Employees
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Assigned Employees
        </v-card-title>
        <v-card-text>
          <div class="text-caption pa-3">Select Employees</div>
          <v-select
              v-model="favorites"
              :items="states"
              hint="Pick your favorite states"
              label="Select Team Members"
              prepend-icon="fa: fa-solid fa-users"
              multiple
              persistent-hint
              outlined
              dense
              class="my-custom-autocomplete"
              background-color="#f5f5f5"
              rounded="l"
              variant="solo"
          ></v-select>
        </v-card-text>
        <v-card-actions class="d-flex flex-column">
          <v-btn @click="saveSelection" color="success">Save</v-btn>
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
      membersDialog: false,
      favorites: [],
      states: [] // Populate with your states data
    }
  },
  methods: {
    saveSelection() {
      // Save selection logic here
      this.membersDialog = false
    }
  }
}
</script>

<style scoped>
.my-custom-autocomplete {
  /* Custom styles here */
}
</style>