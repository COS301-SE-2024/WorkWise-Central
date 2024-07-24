<template>
  <v-card flat class="text-center elevation-0">
    <v-card-text>
      <v-form ref="jobForm">
        <v-label>Job Name</v-label>
        <v-text-field
          v-model="job.jobDetails.jobName"
          variant="solo"
          density="compact"
          color="grey-lighten-4"
          rounded="l"
          required
          :value="props.passedInJob.heading"
        ></v-text-field>
        <v-label>Job Description</v-label>
        <v-textarea
          v-model="job.jobDetails.jobDescription"
          clearable
          variant="solo"
          density="compact"
          color="grey-lighten-4"
          rounded="l"
          required
          :value="props.passedInJob.jobDescription"
        ></v-textarea>
        <v-row>
          <v-col cols="6">
            <v-label>Street</v-label>
            <v-text-field
              v-model="job.jobDetails.jobAddress.street"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
              :value="props.passedInJob.street"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-label>Suburb</v-label>
            <v-text-field
              v-model="job.jobDetails.jobAddress.suburb"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
              :value="props.passedInJob.suburb"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-label>City</v-label>
            <v-text-field
              v-model="job.jobDetails.jobAddress.city"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
              :value="props.passedInJob.city"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-label>Postal Code</v-label>
            <v-text-field
              v-model="job.jobDetails.jobAddress.postalCode"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
              :value="props.passedInJob.postalCode"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-label>Complex</v-label>
            <v-text-field
              v-model="job.jobDetails.jobAddress.complex"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              :value="props.passedInJob.complex"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-label>House Number</v-label>
            <v-text-field
              v-model="job.jobDetails.jobAddress.houseNumber"
              variant="solo"
              density="compact"
              color="grey-lighten-4"
              rounded="l"
              required
              :value="props.passedInJob.houseNumber"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { defineProps, ref } from 'vue'

const job = ref({
  clientId: ref(''),
  status: ref(''),
  jobDetails: {
    jobName: ref(''),
    description: ref(''),
    jobAddress: {
      street: ref(''),
      suburb: ref(''),
      city: ref(''),
      postalCode: ref(''),
      complex: ref(''),
      houseNumber: ref('')
    }
  },
  jobStartDate: ref(null),
  jobEndDate: ref(null)
})

const props = defineProps({
  passedInJob: Object
})
</script>
<style></style>
