<template>
  <v-container>
   <v-dialog persistent       v-model="dialog"
      max-height="800"
      max-width="600"
      :theme="isDarkMode ? 'dark' : 'light'"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          rounded="md"
          class="text-none font-weight-regular hello"
          variant="elevated"
          color="secondary"
          v-bind="activatorProps"
        >
          Generate Report
        </v-btn>
      </template>
      <v-card :theme="isDarkMode ? 'dark' : 'light'">
        <v-card-title class="text-center">Job Report Form</v-card-title>
        <v-card-text>
          <v-form v-model="formIsValid" ref="form">
            <!-- Job Report Title -->
            <v-label>Report Title</v-label>
            <v-text-field v-model:lazy="report.title" label="Report Title" required outlined />

            <!-- Job ID -->
            <v-label>Job ID</v-label>
            <v-text-field v-model:lazy="report.jobId" label="Job ID" required outlined />

            <!-- Job Description -->
            <v-label>Job Description</v-label>
            <v-textarea
              v-model:lazy="report.description"
              label="Job Description"
              rows="5"
              required
              outlined
            />

            <!-- Date Completed -->
            <v-label>Date Completed</v-label>
            <v-date-picker
              v-model:lazy="report.dateCompleted"
              label="Date Completed"
              required
              outlined
            />

            <!-- Employee In Charge -->
            <v-label>Employee In Charge</v-label>
            <v-select
              v-model="report.employeeInCharge"
              :items="employees"
              item-value="id"
              item-text="name"
              label="Employee In Charge"
              required
              outlined
            />

            <!-- Status -->
            <v-label>Status</v-label>
            <v-select v-model="report.status" :items="statuses" label="Status" required outlined />

            <!-- Comments -->
            <v-label>Additional Comments</v-label>
            <v-textarea
              v-model:lazy="report.comments"
              label="Additional Comments"
              rows="3"
              outlined
            />

            <!-- Submit Button -->
          </v-form>
        </v-card-text>
        <v-card-actions
          ><v-btn
            :disabled="!formIsValid"
            @click="submitReport"
            color="secondary"
            variant="elevated"
          >
            Submit Report
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'JobReportForm',
  setup() {
    // Form data
    const report = ref({
      title: '',
      jobId: '',
      description: '',
      dateCompleted: '',
      employeeInCharge: null,
      status: '',
      comments: ''
    })

    // Form validation
    const formIsValid = ref(false)

    // Dark mode
    const storedTheme = localStorage.getItem('theme')
    const isDarkMode = ref(storedTheme === 'dark')

    // Employee list
    const employees = ref([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
      // Add more employees as needed
    ])

    // Status options
    const statuses = ref([
      'Completed',
      'In Progress',
      'Pending'
      // Add more statuses as needed
    ])

    // Dialog visibility
    const dialog = ref(false)

    // Form submission handler
    const submitReport = () => {
      if (formIsValid.value) {
        // Handle form submission
        console.log('Report submitted:', report.value)
        // Send this data to an API or store it as needed
      } else {
        console.log('Form is not valid')
      }
    }

    return {
      report,
      formIsValid,
      employees,
      statuses,
      submitReport,
      isDarkMode,
      dialog
    }
  }
})
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
