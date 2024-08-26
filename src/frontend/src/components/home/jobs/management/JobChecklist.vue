<template>
  <v-dialog
    v-model="checklistDialog"
    max-width="500px"
    location="bottom"
    location-strategy="connected"
    opacity="0"
    origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        width="100%"
        class="d-flex justify-start"
        border="md"
        elevation="5"
        @click="openChecklistDialog"
        v-bind="activatorProps"
      >
        <v-icon left>
          {{ 'fa: fa-solid fa-tasks' }}
        </v-icon>
        Check off Task
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Update Checklist
        </v-card-title>

        <v-card-text class="text-center">
          <div>
            <h5 class="pt-4">Check Off Completed Tasks</h5>
            <v-select
              v-model="value"
              :items="items"
              label="Tasks"
              chips
              multiple
              variant="solo"
              class="pt-4"
              hide-details
              prepend-icon="fa: fa-solid fa-check"
            ></v-select>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <v-container
            ><v-row
              ><v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn @click="saveChecklist" color="success" block
                  ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
                ></v-col
              ><v-col cols="12" lg="6" order="first" order-lg="last"
                ><v-btn @click="isActive.value = false" color="error" block
                  ><v-icon icon="fa: fa-solid fa-cancel"></v-icon>Cancel</v-btn
                ></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checklistDialog = ref(false)
const items = ref(['foo', 'bar', 'fizz', 'buzz'])
const value = ref([])

const openChecklistDialog = () => {
  checklistDialog.value = true
}

const saveChecklist = () => {
  // logic to save checklist
  checklistDialog.value = false
}
</script>

<style scoped></style>
