<template>
  <div>
    <v-divider></v-divider>
    <h5 class="pt-4">Add job notes</h5>
    <v-container>
      <v-row v-for="(note, index) in notes" :key="index" class="d-flex align-center mb-3">
        <v-col cols="11">
          <v-text-field
            v-model="note.text"
            label="Note"
            dense
            readonly
            :clearable="false"
            class="pt-4"
            hide-details
            prepend-icon="fa: fa-solid fa-sticky-note"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn icon @click="deleteNote(index)">
            <v-icon color="red" class="fa fa-trash pt-4"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-textarea
        v-model="newNote"
        label="Add a new note"
        clearable
        auto-grow
        variant="solo"
        hint="Add a job note"
        hide-details
        prepend-icon="fa: fa-solid fa-sticky-note"
      ></v-textarea>
      <v-btn color="success" @click="addNote">Add Note</v-btn>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import axios from 'axios'
// import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

// Define types
interface Note {
  text: string
}

interface Job {
  _id?: string
  clientId?: string
  clientUsername?: string
  assignedBy?: string
  assignedEmployees?: {
    employeeIds?: string[]
  }
  status?: string
  details?: {
    heading?: string
    description?: string
    address?: {
      street?: string
      province?: string
      suburb?: string
      city?: string
      postalCode?: string
      complex?: string
      houseNumber?: string
    }
    startDate?: string
    endDate?: string
  }
  recordedDetails?: {
    imagesTaken?: any[]
    inventoryUsed?: any[]
  }
  taskList?: any[]
  notes?: Note[]
  createdAt?: string
  updatedAt?: string
}

const props = defineProps<{ passedInJob: Job }>()

// Toast for notifications
const toast = useToast()

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

// Restructure job data
const restructureJob = (job: Job): Job => {
  console.log(job)
  return {
    _id: job._id || '',
    clientId: job.clientId || '',
    clientUsername: job.clientUsername || '',
    assignedBy: job.assignedBy || '',
    assignedEmployees: {
      employeeIds: job.assignedEmployees?.employeeIds || []
    },
    status: job.status || '',
    details: {
      heading: job.details?.heading || '',
      description: job.details?.description || '',
      address: {
        street: job.details?.address?.street || '',
        province: job.details?.address?.province || '',
        suburb: job.details?.address?.suburb || '',
        city: job.details?.address?.city || '',
        postalCode: job.details?.address?.postalCode || '',
        complex: job.details?.address?.complex || '',
        houseNumber: job.details?.address?.houseNumber || ''
      },
      startDate: job.details?.startDate || '',
      endDate: job.details?.endDate || ''
    },
    recordedDetails: {
      imagesTaken: job.recordedDetails?.imagesTaken || [],
      inventoryUsed: job.recordedDetails?.inventoryUsed || []
    },
    taskList: job.taskList || [],
    notes: job.notes || [],
    createdAt: job.createdAt || '',
    updatedAt: job.updatedAt || ''
  }
}

// Initial notes and new note
const notes = ref<{ text: string }[]>(
  (props.passedInJob?.notes || []).map((note: Note) => ({ text: note.text }))
)
const newNote = ref('')

// Toast messages
const showJobNoteSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Successfully added note to job',
    life: 3000
  })
}

const showJobNoteError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'An error occurred while adding note to this job',
    life: 3000
  })
}

// Add a note
const addNote = async () => {
  if (newNote.value.trim() !== '') {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
    const apiUrl = await getRequestUrl()

    try {
      const job = restructureJob(props.passedInJob)
      const currentNotes = job.notes || []

      // Create the new note object
      const noteToAdd = {
        text: newNote.value.trim(),
        date: new Date().toISOString() // Optional: include the date if needed
      }

      // Append the new note to the existing notes array
      const updatedNotes = [...currentNotes, noteToAdd]

      // Prepare the payload for the PATCH request
      const updatedJob = {
        ...job,
        notes: updatedNotes
      }

      // Make the PATCH request to update the job
      const response = await axios.patch(`${apiUrl}job/${job._id}`, updatedJob, config)

      if (response.status < 300 && response.status > 199) {
        showJobNoteSuccess()
        notes.value.push({ text: newNote.value.trim() })
        newNote.value = ''
      } else {
        showJobNoteError()
      }
    } catch (error) {
      console.error('Error updating job:', error)
      showJobNoteError()
    }
  }
}

// Delete a note
const deleteNote = async (index: number) => {
  const job = restructureJob(props.passedInJob)
  const updatedNotes = (job.notes || []).filter((_, i: number) => i !== index)

  const updatedJob = {
    ...job,
    notes: updatedNotes
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }

  try {
    const apiUrl = await getRequestUrl()
    const response = await axios.patch(`${apiUrl}job/${job._id}`, updatedJob, config)

    if (response.status < 300 && response.status > 199) {
      notes.value.splice(index, 1)
    } else {
      showJobNoteError()
    }
  } catch (error) {
    console.error('Error deleting note:', error)
    showJobNoteError()
  }
}
</script>

<style></style>
