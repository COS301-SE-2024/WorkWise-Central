<template>
  <v-dialog v-model="viewJobDialog" :min-height="800" :max-width="1000">
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          text="View"
          prepend-icon="fa:fa-solid fa-eye"
          color="success"
          v-bind="activatorProps"
          @click="viewJob"
        ></v-btn>
      </v-defaults-provider>
    </template>
    <v-card elevation="14" rounded="md">
      <v-img
        src="https://media.istockphoto.com/id/2162545535/photo/two-male-workers-taking-a-break-at-the-construction-site.jpg?s=612x612&w=is&k=20&c=xceTrLx7-MPKjjLo302DjIw1mGaZiKAceaWIYsRCX0U="
        aspect-ratio="5.75"
      ></v-img>
      <v-card-title>
        {{ props.passedInJob?.details?.heading }}
      </v-card-title>
      <v-card-text class="text-center">
        <v-row>
          <v-col sm="12" md="9">
            <v-divider>
              <h5 ref="descriptionSection">Description</h5>
            </v-divider>
            <v-col class="text-center">
              <v-spacer></v-spacer>
              <p>
                {{ props.passedInJob?.details?.description }}
              </p>
            </v-col>
            <v-divider>
              <h5 ref="statusSection">Status</h5>
            </v-divider>
            <v-col class="text-center">
              <v-spacer></v-spacer>
              <p>
                <v-chip :color="getStatusColor(props.passedInJob?.status.status)" dark>
                  {{ props.passedInJob?.status.status }}
                </v-chip>
              </p>
            </v-col>

            <v-divider>
              <h5 ref="clientDetailsSection">Client Details</h5>
            </v-divider>

            <v-row>
              <v-col class="text-center" md="4">
                <label class="font-weight-bold">Client Name</label>
                <v-spacer></v-spacer>
                <p>Holder Name</p>
              </v-col>
              <v-col class="text-center" md="4">
                <label class="font-weight-bold">Phone</label>
                <v-spacer></v-spacer>
                <p>Holder phone</p>
              </v-col>
              <v-col class="text-center" md="4">
                <label class="font-weight-bold">Email</label>
                <v-spacer></v-spacer>
                <p>Holder Email</p>
              </v-col>
            </v-row>

            <v-divider>
              <h5 ref="addressSection">Address</h5>
            </v-divider>
            <v-col class="text-center">
              <v-row class="text-center">
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">City</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.city }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Suburb</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.suburb }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Street</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.street }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Postal Code</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.postalCode }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Complex</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.complex }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">House Number</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.houseNumber }}
                  </p>
                </v-col>
              </v-row>
              <v-divider>
                <h5 ref="commentsSection">Add Job Comments</h5>
              </v-divider>
              <v-row>
                <v-col>
                  <AddComment
                    :jobComments="props.passedInJob?.comments"
                    :id="props.passedInJob?._id"
                  />
                </v-col>
              </v-row>
              <v-divider>
                <h5 ref="notesSection">Add Job Notes</h5>
              </v-divider>
              <v-row>
                <v-col>
                  <JobNotes :passedInJob="props.passedInJob" />
                </v-col>
              </v-row>
              <v-divider>
                <h5 ref="tasksSection">Check Off Tasks</h5>
              </v-divider>
              <v-row>
                <v-col>
                  <CheckOffItems
                    :jobTaskList="props.passedInJob?.taskList"
                    :id="props.passedInJob?._id"
                  />
                </v-col>
              </v-row>
              <v-divider>
                <h5 ref="imagesSection">Attach Images</h5>
              </v-divider>
              <v-col>
                <GetJobImages />
              </v-col>
              <v-divider>
                <h5 ref="tagsSection">Add Job Tags</h5>
              </v-divider>
              <v-col>
                <JobTags :tags="props.passedInJob?.tags" :jobID="props.passedInJob?._id" />
              </v-col>
              <v-divider>
                <h5 ref="historySection">View Job History</h5>
              </v-divider>
              <v-col>
                <JobHistory />
              </v-col>
            </v-col>
          </v-col>
          <v-col sm="12" md="3">
            <v-col class="pb-0">
              <v-label class="d-flex justify-start pb-0 font-weight-bold">Card Actions</v-label>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('commentsSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-comment' }}
                </v-icon>
                Add Comment
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('notesSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-sticky-note' }}
                </v-icon>
                Add Note
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('tasksSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-tasks' }}
                </v-icon>
                Check Off Task
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('imagesSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-upload' }}
                </v-icon>
                Attach Images
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('tagsSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-box' }}
                </v-icon>
                Log Inventory
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('historySection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-eye' }}
                </v-icon>
                View History
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="closeView">Close</v-btn>
        <v-btn color="success" @click="closeView">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, type Ref } from 'vue'
import AddComment from './AddComments.vue'
import JobNotes from './JobNotes.vue'
import CheckOffItems from './CheckOffItems.vue'
import GetJobImages from './GetJobImages.vue'
import JobTags from './JobTags.vue'
import JobHistory from './JobHistory.vue'

const props = defineProps<{ passedInJob: any }>()


const viewJob = () => {
  console.log('click click')
}

const commentsSection = ref<HTMLElement | null>(null)
const notesSection = ref<HTMLElement | null>(null)
const tasksSection = ref<HTMLElement | null>(null)
const imagesSection = ref<HTMLElement | null>(null)
const tagsSection = ref<HTMLElement | null>(null)
const historySection = ref<HTMLElement | null>(null)
const viewJobDialog = ref(false) // Dialog state
const checklistSection = ref(null)
const inventorySection = ref(null)

function scrollToSection(
  section:
    | 'commentsSection'
    | 'notesSection'
    | 'tasksSection'
    | 'imagesSection'
    | 'tagsSection'
    | 'historySection'
) {
  let sectionRef = null

  if (section === 'commentsSection') {
    sectionRef = commentsSection
  } else if (section === 'notesSection') {
    sectionRef = notesSection
  } else if (section === 'tasksSection') {
    sectionRef = tasksSection
  } else if (section === 'imagesSection') {
    sectionRef = imagesSection
  } else if (section === 'tagsSection') {
    sectionRef = tagsSection
  } else if (section === 'historySection') {
    sectionRef = historySection
  }

  if (sectionRef && sectionRef.value) {
    sectionRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'to do':
      return 'blue'
    case 'in progress':
      return 'yellow'
    case 'awaiting invoice':
      return 'orange'
    case 'awaiting payment':
      return 'red'
    case 'awaiting sign off':
      return 'green'
    default:
      return 'grey'
  }
}

const closeView = () => {
  console.log('Passed in job', props.passedInJob)
  viewJobDialog.value = false
}
</script>
