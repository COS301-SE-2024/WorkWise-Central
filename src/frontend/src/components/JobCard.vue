<template>
  <v-card class="d-flex">
    <v-card class="flex-grow-1 pa-4">
      <v-card-title>
        <h2>{{ jobTitle }}</h2>
      </v-card-title>
      <v-textarea
          label="Job Description"
          v-model="jobDescription"
          rows="10"
          outlined
      ></v-textarea>
      <v-btn class="mt-4" color="primary">View All Notifications</v-btn>
    </v-card>

    <v-card flat class="pa-4" max-width="300">
      <div class="d-flex flex-column">
        <v-btn class="mb-2" color="success">Save</v-btn>
        <v-btn class="mb-4" color="error">Cancel</v-btn>
        <v-textarea
            label="Add Comment"
            v-model="comment"
            rows="4"
            outlined
            class="mb-4"
        ></v-textarea>
        <v-btn class="mb-2" outlined>Team Member List</v-btn>
        <v-btn class="mb-2" outlined>Labels</v-btn>
        <v-btn class="mb-2" outlined>Checklist</v-btn>
        <v-btn class="mb-2" outlined>Dates</v-btn>
        <v-btn class="mb-2" outlined>File Attachments</v-btn>
      </div>
    </v-card>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const jobTitle = ref('Job Heading');
const jobDescription = ref('');
const comment = ref('');
</script>

<style scoped>
.v-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
