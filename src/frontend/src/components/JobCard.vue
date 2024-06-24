<template>
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
            v-model="jobComment"
            rows="2"
            outlined
            class="mb-4"
        ></v-textarea>
      </div>
      <div v-if="clientChips.length" class="chip-container">
        <h4 class="flex-grow-1">Selected Client:</h4>
        <div class="chip-wrapper">
          <v-chip
              v-for="(chip, index) in clientChips"
              :key="index"
              class="ma-2"
              color="primary"
              outlined
              @click:close="removeClient(chip, index)"
              close
          >
            {{ chip.name }}
          </v-chip>
        </div>
        F
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
      <div v-if="dateChips.length">
        <h4 class="flex-grow-1"> Job Dates:</h4>
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
      <v-card-actions class="d-flex flex-column">
        <v-btn class="mb-2" color="blue darken-1" @click="saveJob">Save</v-btn>
        <v-btn class="mb-4" color="blue darken-1" @click="cancelJob">Cancel</v-btn>
      </v-card-actions>
    </v-card>


    <v-card flat class="pa-4" max-width="300">
      <div class="d-flex flex-column">

        <TeamMemberList
            :teamList="teamMemberChips"
            @update:selectedMembers="selectedMemberChips = $event"
            @addMemberToCard="handleAddMemberToCard"
        ></TeamMemberList>

        <v-btn class="mb-2" outlined @click="openClientDialogAndFetchClients">
          <v-icon left>mdi-account-switch</v-icon>
          Change Client
        </v-btn>
        <v-dialog v-model="clientDialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
              Change the client for this job
            </v-card-title>

            <v-card-text>
              <div class="text-caption pa-3">Select a client</div>

              <v-autocomplete
                  v-model="selectedClientName"
                  hint="Click the field to select a client"
                  :items="clientNames"
                  label="Select Client"
                  prepend-icon="mdi-account"
                  persistent-hint
              >
              </v-autocomplete>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="saveClient">Save</v-btn>
              <v-btn color="blue darken-1" text @click="clientDialog=false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <JobLabels @update:status="status = $event" @add:status="updateStatus = $event"/>
        <!-- Job Checklist -->
        <JobChecklist
            @itemAdded:checklistProp="checklistChips = $event"
            @addItemToList="addItemToChecklist"
        ></JobChecklist>
        <v-btn class="mb-2" outlined @click="dialog = true">
          <v-icon left>mdi-paperclip</v-icon>
          File Attachments
        </v-btn>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
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
                    <v-chip
                        class="me-2"
                        color="primary"
                        size="small"
                        label
                    >
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
        <v-btn class="mb-2" outlined @click="dueDateDialog = true">
          <v-icon left>mdi-calendar-clock</v-icon>
          Due Date
        </v-btn>
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
                      <v-checkbox
                          v-model="isEndDatePicked"
                          @click="toggleEndDate"
                      ></v-checkbox>
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
              <v-btn color="blue darken-1"
                     text @click="saveDate">Save
              </v-btn>
              <v-btn color="blue darken-1" text @click="removeDates">Remove</v-btn>
              <v-btn color="blue darken-1" text @click="dueDateDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
  </v-card>
</template>

<script setup>
import {watch, ref} from 'vue'
import axios from 'axios'
import {computed} from 'vue'
import {
  VBtn,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VFileInput,
  VChip,
  VSpacer,
  VAlert
} from 'vuetify/components';
import TeamMemberList from './TeamMemberList.vue'
import JobLabels from './JobLabels.vue'
import JobChecklist from './JobChecklist.vue'
//For change client
const clientDialog = ref(false);
const selectedClient = ref(null);
const clientChips = ref([]);
const clients = ref([]);
const selectedClientName = ref(null);
const clientNames = ref([]);
import { useRouter } from 'vue-router';

const router = useRouter();

const openClientDialogAndFetchClients = async () => {
  clientDialog.value = true;
  await fetchClients();
};

// api call to get clients and stores them here
const fetchClients = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
    }
  };
  try {
    const response = await axios.get('http://localhost:3000/client/all', config);
    console.log(response.data);
    clients.value = response.data.data.map(client => ({
      ...client,
      fullName: `${client.details.firstName ?? ''} ${client.details.surname ?? ''}`.trim()
    }));

    // Populate clientNames array with just the names
    clientNames.value = clients.value.map(client => {
      return client.details.firstName && client.details.surname
          ? `${client.details.firstName} ${client.details.surname}`
          : client.details.name ?? 'Unknown Name';
    });

    // @BOB get rid of this part
    // Watch for changes in selectedClientName and update selectedClient
    watch(() => selectedClientName.value, (newVal) => {
      const selected = clients.value.find(client => {
        const fullName = client.details.firstName && client.details.surname
            ? `${client.details.firstName} ${client.details.surname}`
            : client.details.name ?? 'Unknown Name';
        return fullName === newVal;
      });
      selectedClient.value = selected?._id ?? null;
    })
  } catch (error) {
    console.error('Failed to fetch clients:', error);
  }
};

const saveClient = () => {
  if (selectedClientName.value) {
    clientChips.value.push({name: selectedClientName});
    console.log('Client chips:', clientChips.value);
  }
  clientDialog.value = false;
};
const updateStatus = async (status) => {
  await axios.patch(`http://localhost:3000/job/${job_ID.value}`, {
    status: status
  })
};
const selectedMemberChips = ref([])
const checklistChips = ref([])
const status = ref(null)

//Define props
const props = defineProps({
  job_ID: String
})

// If you need to make job_ID reactive and use it within your setup
const job_ID = ref(props.job_ID)
const teamMemberChips = ref([
  {id: 0, name: 'John Doe', selected: false, role: 'Software Engineer'},
  {id: 1, name: 'Jane Smith', selected: false, role: 'Software Engineer'},
  {id: 2, name: 'Alice Johnson', selected: false, role: 'Software Engineer'}
])

const addItemToChecklist = (item) => {
  checklistChips.value = item
}
const handleAddMemberToCard = async (member) => {
  // Assuming cardMembers is a data property of the parent component
  selectedMemberChips.value = member
  await axios.patch(`http://localhost:3000/job/${job_ID.value}`, {
    assignEmployees: {
      employeeIds: [member.id]
    }
  })
// Make sure to update the parent state in a way that Vue can react to
}
// the id of the selected client is stored in selectedClient

// For File attachments

const dialog = ref(false);
const files = ref([]); // stores all the selected files that will be pushed to the db
const rules = ref([
  value => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!';
  },
]);

const fileChips = ref([]);
const insertFiles = () => {
  dialog.value = false;
  files.value.forEach(file => {
    fileChips.value.push({
      name: file.name,
      size: file.size
    });
  });
  console.log('Files:', fileChips.value);
};

// For Due Date Dialog

const dueDateDialog = ref(false);
const currentDate = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const isStartDatePicked = ref(false);
const isEndDatePicked = ref(false);
const errorMessage = ref('');

const updateDates = (value) => {
  setDates(value);
};

const setDates = (value) => {
  if (!isStartDatePicked.value) {
    if (isEndDatePicked.value && value > endDate.value) {
      errorMessage.value = 'Start date can not come after end date.';
      return;
    }
    errorMessage.value = null;
    startDate.value = value; // stores the updated start date
    isStartDatePicked.value = true;
    currentDate.value = null;
  } else if (!isEndDatePicked.value) {
    if (isStartDatePicked.value && value < startDate.value) {
      errorMessage.value = 'End date can not come before start date.';
      return;
    }
    errorMessage.value = null;
    endDate.value = value; // stores the updated end date
    isEndDatePicked.value = true;
    currentDate.value = null;
  }
};

const toggleStartDate = () => {
  isStartDatePicked.value = !isStartDatePicked.value;
  startDate.value = null;
};

const toggleEndDate = () => {
  isEndDatePicked.value = !isEndDatePicked.value;
  endDate.value = null;
};

const dateChips = ref([]);
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const formattedStartDate = computed(() => formatDate(startDate.value));
const formattedEndDate = computed(() => formatDate(endDate.value));

const saveDate = () => {
  dueDateDialog.value = false;
  if (startDate.value) {
    dateChips.value.push({
      type: 'Start Date',
      date: startDate.value
    });
  }
  if (endDate.value) {
    dateChips.value.push({
      type: 'End Date',
      date: endDate.value
    });
  }
};

const removeDate = (chip, index) => {
  dateChips.value.splice(index, 1);

  if (chip.type === 'Start Date') {
    startDate.value = null;
    isStartDatePicked.value = false;
  } else if (chip.type === 'End Date') {
    endDate.value = null;
    isEndDatePicked.value = false;
  }
};

const removeDates = () => {
  currentDate.value = null;
  startDate.value = null;
  endDate.value = null;
  isStartDatePicked.value = false;
  isEndDatePicked.value = false;
};

// For description

const jobDescription = ref(''); // will store the changed description

// Adjust the number of rows based on the content
const descriptionRows = computed(() => {
  const lineCount = jobDescription.value.split(/\r\n|\r|\n/).length;
  return Math.max(4, lineCount); // Minimum of 4 rows
});


const jobTitle = ref('Tiling Siphele Bob\'s bathroom')
const jobComment = ref('')

const saveJob = () => {
  // Perform save operation if needed

  // For demonstration purposes, simulate a successful save
  // Replace this with actual save logic
  // For example:
  // saveJobToBackend();

  // Show alert indicating successful save
  window.alert('Job saved successfully!');

  // Navigate to /jobAssignmentView
  router.push('/jobAssignmentView');
};

const cancelJob = () => {
  // Perform cancel operation if needed

  // Navigate to /jobAssignmentView without any alert
  router.push('/jobAssignmentView');
};
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
