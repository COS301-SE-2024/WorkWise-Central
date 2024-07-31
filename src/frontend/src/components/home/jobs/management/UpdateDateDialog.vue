<template>
  <v-dialog
    v-model="dueDateDialog"
    max-width="400px"
    location="bottom"
    location-strategy="connected"
    opacity="0"
    origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="mb-2" outlined @click="dueDateDialog = true" v-bind="activatorProps">
        <v-icon class="d-none d-lg-inline-block mr-2" left>
          {{ 'fa: fa-solid fa-calendar-alt' }}
        </v-icon>
        Change Due Date
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title> Enter the due date for this job </v-card-title>

        <v-card-text>
          <v-container>
            <v-row justify="space-around">
              <v-date-picker
                v-model="currentDate"
                color="secondary"
                @update:modelValue="updateDates"
              ></v-date-picker>
            </v-row>
            <v-row v-if="errorMessage" class="mt-4">
              <v-col cols="12">
                <v-alert type="error">{{ errorMessage }}</v-alert>
              </v-col>
            </v-row>
            <v-row class="pt-7" align="center">
              <v-col cols="12" md="6">
                <v-row>
                  <v-checkbox v-model="isStartDatePicked" @click="toggleStartDate"></v-checkbox>
                  <v-text-field
                    v-model="formattedStartDate"
                    readonly
                    variant="solo"
                    density="compact"
                    color="grey-lighten-4"
                    rounded="l"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-checkbox v-model="isEndDatePicked" @click="toggleEndDate"></v-checkbox>
                  <v-text-field
                    v-model="formattedEndDate"
                    readonly
                    variant="solo"
                    density="compact"
                    color="grey-lighten-4"
                    rounded="l"
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex flex-column pt-0">
          <v-btn @click="saveDate" color="success">Save</v-btn>
          <v-btn @click="removeDates" color="warning">Remove</v-btn>
          <v-btn @click="isActive.value = false" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch, defineEmits } from 'vue'

// Define the interface for the passedInJob prop
interface Job {
  startDate?: Date | null;
  endDate?: Date | null;
  comments?: Array<{ comment: string }>;
}

interface Props {
  passedInJob: Job
}

const props = defineProps<Props>()
const emit = defineEmits(['updateJob'])

const dueDateDialog = ref(false)
const currentDate = ref<Date | null>(null)
const startDate = ref<Date | null>(props.passedInJob.startDate || null)
const endDate = ref<Date | null>(props.passedInJob.endDate || null)
const isStartDatePicked = ref(false)
const isEndDatePicked = ref(false)
const errorMessage = ref<string | null>('')

// Watch for changes in props and update local state
watch(() => props.passedInJob, (newJob) => {
  startDate.value = newJob.startDate || null
  endDate.value = newJob.endDate || null
}, { immediate: true })

const updateDates = (value: Date | null) => {
  if (value) {
    setDates(value)
  }
}

const setDates = (value: Date) => {
  if (!isStartDatePicked.value) {
    if (isEndDatePicked.value && endDate.value && value > endDate.value) {
      errorMessage.value = 'Start date cannot come after end date.'
      return
    }
    errorMessage.value = null
    startDate.value = value
    isStartDatePicked.value = true
    currentDate.value = null
  } else if (!isEndDatePicked.value) {
    if (isStartDatePicked.value && startDate.value && value < startDate.value) {
      errorMessage.value = 'End date cannot come before start date.'
      return
    }
    errorMessage.value = null
    endDate.value = value
    isEndDatePicked.value = true
    currentDate.value = null
  }

  // Emit updated job object
  emit('updateJob', { ...props.passedInJob, startDate: startDate.value, endDate: endDate.value })
}

const toggleStartDate = () => {
  isStartDatePicked.value = !isStartDatePicked.value
  startDate.value = null
  emit('updateJob', { ...props.passedInJob, startDate: null })
}

const toggleEndDate = () => {
  isEndDatePicked.value = !isEndDatePicked.value
  endDate.value = null
  emit('updateJob', { ...props.passedInJob, endDate: null })
}

const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  const sss = String(d.getMilliseconds()).padStart(3, '0')
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}.${sss}Z`
}

const formattedStartDate = computed(() => formatDate(startDate.value))
const formattedEndDate = computed(() => formatDate(endDate.value))

const saveDate = () => {
  dueDateDialog.value = false
  console.log('Saved job:', props.passedInJob)
}

const removeDates = () => {
  currentDate.value = null
  startDate.value = null
  endDate.value = null
  isStartDatePicked.value = false
  isEndDatePicked.value = false

  // Emit updated job object
  emit('updateJob', { ...props.passedInJob, startDate: null, endDate: null })
}
</script>



<style scoped>
/* Add your styles here */
</style>
