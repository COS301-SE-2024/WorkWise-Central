<template>
  <v-card elevation="14" rounded="md" :max-width="1000">
    <v-card-title>Job Details</v-card-title>
    <v-row>
      <v-col cols="12" md="9" order-xs="1" order-sm="1" order-md="0">
        <v-card flat class="text-center elevation-0">
          <v-card-text>
            <v-col>
              <v-col class="text-center pt-0">
                <h5>{{ props.passedInJob.heading }}</h5>
              </v-col>
              <v-divider></v-divider>
              <v-col class="text-center">
                <h5>Description</h5>
                <v-spacer></v-spacer>
                <small class="text-caption">
                  {{ props.passedInJob.jobDescription }}
                </small>
              </v-col>
              <v-divider></v-divider>
              <v-col class="text-center">
                <h5>Status</h5>
                <v-spacer></v-spacer>
                <small class="text-caption">
                  <v-chip :color="getStatusColor(props.passedInJob.status)" dark>
                    {{ props.passedInJob.status }}
                  </v-chip>
                </small>
              </v-col>
              <v-divider></v-divider>
              <v-col class="text-center">
                <h5>Address</h5>
                <v-row class="text-center">
                  <v-col sm="6" md="3" offset-md="3">
                    <label class="font-weight-bold">City</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.city }}
                    </small>
                  </v-col>
                  <v-col sm="6" md="3">
                    <label class="font-weight-bold">Suburb</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.suburb }}
                    </small>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="6" md="3" offset-md="3">
                    <label class="font-weight-bold">Street</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.street }}
                    </small>
                  </v-col>
                  <v-col sm="6" md="3">
                    <label class="font-weight-bold">Postal Code</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.postalCode }}
                    </small>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="6" md="3" offset-md="3">
                    <label class="font-weight-bold">Complex</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.complex }}
                    </small>
                  </v-col>
                  <v-col sm="6" md="3">
                    <label class="font-weight-bold">House Number</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.houseNumber }}
                    </small>
                  </v-col>
                </v-row>
              </v-col>

              <v-divider></v-divider>
              <v-col class="text-center">
                <h5>Dates</h5>
                <v-row>
                  <v-col sm="6" md="3" offset-md="3">
                    <label class="font-weight-bold">Start Date</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.startDate }}
                    </small>
                  </v-col>
                  <v-col sm="6" md="3">
                    <label class="font-weight-bold">End Date</label>
                    <v-spacer></v-spacer>
                    <small class="text-caption">
                      {{ props.passedInJob.endDate }}
                    </small>
                  </v-col>
                </v-row>
              </v-col>
            </v-col>
            <v-col ref="imagesSection">
              <AttachImages :passedInJob="props.passedInJob" />
            </v-col>
            <v-col ref="commentsSection">
              <AddComment :passedInJob="props.passedInJob" />
            </v-col>
            <v-col ref="notesSection">
              <JobNotes :passedInJob="props.passedInJob" />
            </v-col>
            <v-col ref="checklistSection">
              <JobChecklist :passedInJob="props.passedInJob" />
            </v-col>
            <v-col ref="inventorySection">
              <LogInventory :passedInJob="props.passedInJob" />
              <v-divider></v-divider>
            </v-col>
            <v-col class="pt-0">
              <v-btn color="error" @click="closeView">Close</v-btn>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="pt-10" order-xs="0" order-sm="0" order-md="1">
        <v-row justify="center">
          <v-btn class="mb-2" outlined @click="scrollToSection(imagesSection)">
            <v-icon left>{{ 'fa: fas fa-upload' }}</v-icon>
            Upload File
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn class="mb-2" outlined @click="scrollToSection(commentsSection)">
            <v-icon left>{{ 'fa: fas fa-comment' }}</v-icon>
            Add Comment
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn class="mb-2" outlined @click="scrollToSection(notesSection)">
            <v-icon left>{{ 'fa: fas fa-sticky-note' }}</v-icon>
            Add Notes
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn class="mb-2" outlined @click="scrollToSection(checklistSection)">
            <v-icon left>{{ 'fa: fas fa-check-circle' }}</v-icon>
            Check Off Task
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn class="mb-2" outlined @click="scrollToSection(inventorySection)">
            <v-icon left>{{ 'fa: fas fa-clipboard-list' }}</v-icon>
            Log Inventory
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import AttachImages from './AttachImages.vue'
import AddComment from './AddComments.vue'
import JobNotes from './JobNotes.vue'
import JobChecklist from './JobChecklist.vue'
import LogInventory from './LogInventory.vue'

const toast = useToast()

const props = defineProps({
  passedInJob: Object
})

const imagesSection = ref(null)
const commentsSection = ref(null)
const notesSection = ref(null)
const checklistSection = ref(null)
const inventorySection = ref(null)

// Function to get the color based on job status
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'To do':
      return 'blue'
    case 'In progress':
      return 'yellow'
    case 'Awaiting invoice':
      return 'orange'
    case 'Awaiting payment':
      return 'red'
    case 'Awaiting sign off':
      return 'green'
    default:
      return 'grey'
  }
}

// Function to scroll to a section
function scrollToSection(sectionRef) {
  console.log(sectionRef)
  const section = sectionRef.value
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    console.log('failed')
  }
}

const emit = defineEmits(['close'])
const closeView = () => {
  emit('close')
}
</script>