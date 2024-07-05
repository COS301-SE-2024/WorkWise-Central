<!-- DueDateDialog.vue -->
<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="mb-2" outlined v-bind="activatorProps" @click="emitOpenDialog">
        <v-icon left>mdi-calendar-clock</v-icon>
        Due Date
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
        Enter the due date for this job
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row justify="space-around">
            <v-date-picker
              v-model="currentDate"
              color="primary"
              @update:modelValue="updateDates"
            ></v-date-picker>
          </v-row>
          <v-row v-if="errorMessage" class="mt-4">
            <v-col cols="12">
              <v-alert type="error">{{ errorMessage }}</v-alert>
            </v-col>
          </v-row>
          <v-row class="mt-4" align="center">
            <v-col cols="12" md="6">
              <v-row>
                <v-checkbox v-model="isStartDatePicked" @click="toggleStartDate"></v-checkbox>
                <v-text-field
                  v-model="formattedStartDate"
                  label="Start Date"
                  readonly
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-checkbox v-model="isEndDatePicked" @click="toggleEndDate"></v-checkbox>
                <v-text-field v-model="formattedEndDate" label="End Date" readonly></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue darken-1" text @click="emitSaveDate">Save</v-btn>
        <v-btn color="blue darken-1" text @click="emitRemoveDates">Remove</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'

// Define props
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  }
})

// Define emits
const emit = defineEmits(['open-dialog', 'save-date', 'remove-dates'])

// State variables
const currentDate = ref<Date | null>(null)
const isStartDatePicked = ref(false)
const isEndDatePicked = ref(false)
const errorMessage = ref('')

// Methods
const updateDates = (value: Date) => {
  setDates(value)
}

const setDates = (value: Date) => {
  if (!isStartDatePicked.value) {
    if (isEndDatePicked.value && value > endDate.value!) {
      errorMessage.value = 'Start date cannot come after end date.'
      return
    }
    errorMessage.value = ''
    emit('open-dialog')
    currentDate.value = null
  } else if (!isEndDatePicked.value) {
    if (isStartDatePicked.value && value < startDate.value!) {
      errorMessage.value = 'End date cannot come before start date.'
      return
    }
    errorMessage.value = ''
    endDate.value = value // stores the updated end date
    isEndDatePicked.value = true
    currentDate.value = null
  }
}

const toggleStartDate = () => {
  isStartDatePicked.value = !isStartDatePicked.value
  startDate.value = null
}

const toggleEndDate = () => {
  isEndDatePicked.value = !isEndDatePicked.value
  endDate.value = null
}

const formattedStartDate = computed(() => formatDate(startDate.value))
const formattedEndDate = computed(() => formatDate(endDate.value))

const emitOpenDialog = () => {
  emit('open-dialog')
}

const emitSaveDate = () => {
  emit('save-date', { startDate: startDate.value, endDate: endDate.value })
}

const emitRemoveDates = () => {
  emit('remove-dates')
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
