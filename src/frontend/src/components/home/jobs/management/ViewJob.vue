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
              <h5>Description</h5>
            </v-divider>
            <v-col class="text-center">
              <v-spacer></v-spacer>
              <p>
                {{ props.passedInJob?.details?.description }}
              </p>
            </v-col>
            <v-divider>
              <h5>Status</h5>
            </v-divider>
            <v-col class="text-center">
              <v-spacer></v-spacer>
              <p>
                <v-chip :color="getStatusColor(props.passedInJob?.status)" dark>
                  {{ props.passedInJob?.status }}
                </v-chip>
              </p>
            </v-col>

            <v-divider>
              <h5>Client Details</h5>
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
              <h5>Address</h5>
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
                <h5>Add Job Comments</h5>
              </v-divider>
              <v-row>
                <v-col ref="commentsSection">
                  <AddComment
                    :jobComments="props.passedInJob?.comments"
                    :id="props.passedInJob?._id"
                  />
                </v-col>
              </v-row>
              <v-divider>
                <h5>Add Job Notes</h5>
              </v-divider>
              <v-row>
                <v-col ref="notesSection">
                  <JobNotes :passedInJob="props.passedInJob" />
                </v-col>
              </v-row>
                <v-divider>
                  <h5>Check Off Tasks</h5>
                </v-divider>
              <v-row>
                <v-col>
                  <CheckOffItems
                    :jobComments="props.passedInJob?.comments"
                    :id="props.passedInJob?._id"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-col sm="12" md="3">
            <v-col class="pb-0">
              <v-label class="d-flex justify-start pb-0 font-weight-bold">Card Actions</v-label>
            </v-col>
            <v-col ref="imagesSection">
              <AttachImages
                :recordedDetails="props.passedInJob?.recordedDetails"
                :jobID="props.passedInJob?._id"
              />
            </v-col>
            <v-col ref="checklistSection">
              <JobChecklist :passedInJob="props.passedInJob" />
            </v-col>
            <v-col ref="inventorySection">
              <LogInventory
                :recordedDetails="props.passedInJob?.recordedDetails"
                :jobID="props.passedInJob?._id"
              />
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
import AttachImages from './AttachImages.vue'
import AddComment from './AddComments.vue'
import JobNotes from './JobNotes.vue'
import JobChecklist from './JobChecklist.vue'
import LogInventory from './LogInventory.vue'
import CheckOffItems from './CheckOffItems.vue'

const props = defineProps({
  passedInJob: Object
})

const viewJob = () => {
  console.log('click click')
}
const viewJobDialog = ref(false) // Dialog state
const imagesSection = ref(null)
const commentsSection = ref(null)
const notesSection = ref(null)
const checklistSection = ref(null)
const inventorySection = ref(null)

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

const scrollToSection = (sectionRef: Ref<HTMLElement | null>) => {
  const section = sectionRef.value
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    console.log('Section not found')
  }
}

const closeView = () => {
  viewJobDialog.value = false
}
</script>
