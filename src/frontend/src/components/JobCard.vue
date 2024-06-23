<template>
  <v-app>
    <v-card class="d-flex">
      <v-card class="flex-grow-1 pa-4, text-center">
        <v-card-title class="d-flex align-items-center">
          <h2 class="flex-grow-1">{{ jobTitle }}</h2>
        </v-card-title>
        <div>
          <v-row align="center" justify="space-between">
            <v-col cols="auto">
              <v-icon left>mdi-text</v-icon>
              <v-label>Description</v-label>
            </v-col>
          </v-row>
          <v-textarea
            label="Enter the job description here"
            v-model="jobDescription"
            :rows="descriptionRows"
            outlined
            auto-grow
            :readonly="!editMode"
          ></v-textarea>
        </div>
        <div>
          <v-row align="center" justify="space-between">
            <v-col cols="auto">
              <v-icon left>mdi-text-short</v-icon>
              <v-label>Comment</v-label>
            </v-col>
          </v-row>
          <v-textarea
            label="Add Comment"
            v-model="comment"
            rows="2"
            outlined
            class="mb-4"
          ></v-textarea>
        </div>
        <div v-if="selectedMemberChips.length">
          <h4 class="flex-grow-1">Team Members Selected:</h4>
          <v-chip
            v-for="(chip, index) in selectedMemberChips"
            :key="index"
            class="ma-2"
            color="primary"
            outlined
            close
          >
            {{ chip.name }}
          </v-chip>
        </div>
        <div v-if="status">
          <h4 class="flex-grow-1">Status</h4>
          <v-chip class="ma-2" :color="status.color" outlined close>{{ status.title }}</v-chip>
        </div>
        <div v-if="checklistChips.length">
          <h4 class="flex-grow-1">Checklist:</h4>
          <v-chip
            v-for="(chip, index) in checklistChips"
            :key="index"
            class="ma-2"
            color="primary"
            outlined
            close
          >
            {{ chip.title }}
          </v-chip>
        </div>
        <div v-if="dateChips.length">
          <h4 class="flex-grow-1">Job Dates:</h4>
          <v-chip
            v-for="(chip, index) in dateChips"
            :key="index"
            class="ma-2"
            color="primary"
            outlined
            @click:close="removeDate(chip, index)"
            close
          >
            {{ chip.type }}: {{ formatDate(chip.date) }}
          </v-chip>
        </div>
        <div v-if="clientChips.length" class="chip-container">
          <h4 class="flex-grow-1">Attached clients:</h4>
          <div class="chip-wrapper">
            <v-chip
              v-for="(chip, index) in clientChips"
              :key="index"
              class="ma-2"
              color="primary"
              outlined
              @click:close="removeFile(chip, index)"
              close
            >
              {{ chip.name }} ({{ (chip.size / 1024).toFixed(2) }} KB)
            </v-chip>
          </div>
        </div>
        <div v-if="fileChips.length" class="chip-container">
          <h4 class="flex-grow-1">Attached files:</h4>
          <div class="chip-wrapper">
            <v-chip
              v-for="(chip, index) in fileChips"
              :key="index"
              class="ma-2"
              color="primary"
              outlined
              @click:close="removeFile(chip, index)"
              close
            >
              {{ chip.name }} ({{ (chip.size / 1024).toFixed(2) }} KB)
            </v-chip>
          </div>
        </div>
        <v-card-actions class="d-flex flex-column">
          <v-btn class="mb-2" color="blue darken-1" @click="saveJob">Save</v-btn>
          <v-btn class="mb-4" color="blue darken-1" @click="cancelJob">Cancel</v-btn>
        </v-card-actions>
      </v-card>

      <v-card flat class="pa-4" max-width="300">
        <div class="d-flex flex-column">
          <!-- Team Member List -->
          <TeamMemberList
            :teamList="teamMemberChips"
            @update:selectedMembers="selectedMemberChips = $event"
            @addMemberToCard="handleAddMemberToCard"
          ></TeamMemberList>
          <!-- Change Client -->
          <v-btn class="mb-2" outlined @click="clientDialog = true">Change Client</v-btn>
          <v-dialog v-model="clientDialog" max-width="600px">
            <v-card>
              <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
                Change the client for this job
              </v-card-title>

              <v-card-text>
                <div class="text-caption pa-3">Select a client</div>

                <v-autocomplete
                  v-model="selectedClient"
                  hint="Click the field to select a client"
                  :items="clients"
                  item-text="name"
                  item-value="id"
                  label="Select Client"
                  prepend-icon="mdi-account"
                  persistent-hint
                >
                </v-autocomplete>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="saveClient">Save</v-btn>
                <v-btn color="blue darken-1" text @click="clientDialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Job Labels -->
          <JobLabels @update:status="status = $event" />
          <!-- Job Checklist -->
          <JobChecklist
            @itemAdded:checklistProp="checklistChips = $event"
            @addItemToList="addItemToChecklist"
          ></JobChecklist>

          <v-btn class="mb-2" outlined @click="dialog = true">File Attachments</v-btn>
          <!-- File Attachments -->
          <v-dialog v-model="dialog" max-width="600px">
            <v-card rounded="md">
              <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
                Attach a file from your computer
              </v-card-title>
              <v-card-text>
                <v-file-input
                  v-model="files"
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  label="Choose your job images"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  multiple
                >
                  <template v-slot:selection="{ fileNames }">
                    <template v-for="fileName in fileNames" :key="fileName">
                      <v-chip class="me-2" color="primary" size="small" label>
                        {{ fileName }}
                      </v-chip>
                    </template>
                  </template>
                </v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="insertFiles">Insert</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn class="mb-2" outlined @click="dueDateDialog = true">Due Date</v-btn>

          <!-- DUE DATE -->
          <v-dialog v-model="dueDateDialog" max-width="600px">
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
                        <v-checkbox
                          v-model="isStartDatePicked"
                          @click="toggleStartDate"
                        ></v-checkbox>
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
                        <v-text-field
                          v-model="formattedEndDate"
                          label="End Date"
                          readonly
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="saveDate">Save</v-btn>
                <v-btn color="blue darken-1" text @click="removeDates">Remove</v-btn>
                <v-btn color="blue darken-1" text @click="dueDateDialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
// import { VBtn, VDialog, VCard, VCardTitle, VCardText, VCardActions, VFileInput, VChip, VSpacer, VAlert } from 'vuetify/components';
import TeamMemberList from './TeamMemberList.vue'
import JobLabels from './JobLabels.vue'
import JobChecklist from './JobChecklist.vue'

//For change client
const clientDialog = ref(false)
const selectedClient = ref(null)
const clientChips = ref([])

// api call to get clients
const clients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' }
]

const saveClient = () => {
  // Save functionality here
  clientDialog.value = false
  // add a client chip here
}

// For File attachments
const dialog = ref(false)
const files = ref([])
const rules = ref([
  (value) => {
    return (
      !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
    )
  }
])

const fileChips = ref([])
const insertFiles = () => {
  dialog.value = false
  files.value.forEach((file) => {
    fileChips.value.push({
      name: file.name,
      size: file.size
    })
  })
  console.log('Files:', fileChips.value)
}

// For Due Date Dialog
const dueDateDialog = ref(false)
const currentDate = ref(null)
const startDate = ref(null)
const endDate = ref(null)
const isStartDatePicked = ref(false)
const isEndDatePicked = ref(false)
const errorMessage = ref('')

const updateDates = (value) => {
  setDates(value)
}

const setDates = (value) => {
  if (!isStartDatePicked.value) {
    if (isEndDatePicked.value && value > endDate.value) {
      errorMessage.value = 'Start date can not come after end date.'
      return
    }
    errorMessage.value = null
    startDate.value = value
    isStartDatePicked.value = true
    currentDate.value = null
  } else if (!isEndDatePicked.value) {
    if (isStartDatePicked.value && value < startDate.value) {
      errorMessage.value = 'End date can not come before start date.'
      return
    }
    errorMessage.value = null
    endDate.value = value
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

const teamMemberChips = ref([
  { id: 0, name: 'John Doe', selected: false, role: 'Software Engineer' },
  { id: 1, name: 'Jane Smith', selected: false, role: 'Software Engineer' },
  { id: 2, name: 'Alice Johnson', selected: false, role: 'Software Engineer' }
])
const selectedMemberChips = ref([])
const checklistChips = ref([])
const status = ref(null)

const dateChips = ref([])
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
const addItemToChecklist = (item) => {
  checklistChips.value = item
}
const handleAddMemberToCard = (member) => {
  // Assuming cardMembers is a data property of the parent component
  selectedMemberChips.value = member
  // Make sure to update the parent state in a way that Vue can react to
}
const formattedStartDate = computed(() => formatDate(startDate.value))
const formattedEndDate = computed(() => formatDate(endDate.value))

const saveDate = () => {
  dueDateDialog.value = false
  if (startDate.value) {
    dateChips.value.push({
      type: 'Start Date',
      date: startDate.value
    })
  }
  if (endDate.value) {
    dateChips.value.push({
      type: 'End Date',
      date: endDate.value
    })
  }
}

const removeDate = (chip, index) => {
  dateChips.value.splice(index, 1)

  if (chip.type === 'Start Date') {
    startDate.value = null
    isStartDatePicked.value = false
  } else if (chip.type === 'End Date') {
    endDate.value = null
    isEndDatePicked.value = false
  }
}

const removeDates = () => {
  currentDate.value = null
  startDate.value = null
  endDate.value = null
  isStartDatePicked.value = false
  isEndDatePicked.value = false
}

// For description

const jobDescription = ref('')
const editMode = ref(false)

// Adjust the number of rows based on the content
const descriptionRows = computed(() => {
  const lineCount = jobDescription.value.split(/\r\n|\r|\n/).length;
  return Math.max(4, lineCount); // Minimum of 4 rows
});

// const saveDescription = () => {
//   // Save logic here
//   console.log('Saving description:', jobDescription.value);
//   editMode.value = false;
// };


// const cancelEdit = () => {
//   // Cancel editing, revert changes if needed
//   editMode.value = false;
//   // Optionally revert changes if needed
// };

// const toggleEditMode = () => {
//   editMode.value = !editMode.value;
// };

const jobTitle = ref('Job Heading')
const comment = ref('')
</script>

<style scoped>
.v-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
.mt-4 {
  margin-top: 1.5rem;
}

.chip-container {
  max-width: 100%;
  overflow-x: auto;
}

.chip-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
