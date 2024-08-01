<template>
  <div>
    <v-divider></v-divider>
    <h5 class="pt-4">Add job comments</h5>
    <v-container>
      <v-row v-for="(comment, index) in comments" :key="index" class="d-flex align-center mb-3">
        <v-col cols="2" class="pt-6">
          <v-avatar color="secondary" style="width: 38px; height: 36px">
            <span class="text-h6">{{ user.initials }}</span>
          </v-avatar>
        </v-col>
        <v-col md="9">
          <v-text-field
            v-model="comment.text"
            label="Comment"
            dense
            readonly
            :clearable="false"
            class="pt-4"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn icon @click="deleteComment(index)">
            <v-icon color="red" class="fa fa-trash pt-4"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-textarea
        v-model="newComment"
        label="Add a comment"
        clearable
        auto-grow
        variant="solo"
        hint="Enter your comment here"
        hide-details
        prepend-icon="fa: fa-solid fa-comment"
      ></v-textarea>
      <v-btn color="success" @click="comment">Comment</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import axios from 'axios'
// import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

// Define types
interface Comment {
  comment: string
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
  comments?: Comment[]
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

// Initial user data
const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com'
}

// Comments and new comment
const comments = ref<{ text: string }[]>(
  (props.passedInJob.comments || []).map((comment) => ({ text: comment.comment }))
)
const newComment = ref('')

// Toast messages
const showJobCommentSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Successfully commented on job',
    life: 3000
  })
}

const showJobCommentError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'An error occurred while commenting on this job',
    life: 3000
  })
}

const restructureJob = (job: Job): Job => {
  console.log(job)
  return {
    _id: job._id || '', // Safe access with optional chaining
    clientId: job.clientId || '', // Assume clientId is a string; adjust if it's an object
    clientUsername: job.clientUsername || '',
    assignedBy: job.assignedBy || '',
    assignedEmployees: {
      employeeIds: job.assignedEmployees?.employeeIds || [] // Ensure it's an array
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
    comments: job.comments || [],
    createdAt: job.createdAt || '',
    updatedAt: job.updatedAt || ''
  }
}

// Add a comment
const comment = async () => {
  if (newComment.value.trim() !== '') {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
    const apiUrl = await getRequestUrl()

    try {
      const job = restructureJob(props.passedInJob)
      const currentComments = job.comments || []

      // Create the new comment object
      const commentToAdd = {
        employeeId: localStorage.getItem('id') || '',
        comment: newComment.value,
        date: new Date().toISOString()
      }

      // Append the new comment to the existing comments array
      const updatedComments = [...currentComments, commentToAdd]

      // Prepare the payload for the PATCH request
      const updatedJob = {
        ...job,
        comments: updatedComments
      }

      // Make the PATCH request to update the job
      const response = await axios.patch(`${apiUrl}job/${job._id}`, updatedJob, config)

      if (response.status < 300 && response.status > 199) {
        showJobCommentSuccess()
        comments.value.push({ text: newComment.value.trim() })
        newComment.value = ''
      } else {
        showJobCommentError()
      }
    } catch (error) {
      console.error('Error updating job:', error)
      showJobCommentError()
    }
  }
}

// Delete a comment
const deleteComment = async (index: number) => {
  const job = restructureJob(props.passedInJob)
  const updatedComments = job.comments?.filter((_, i) => i !== index) || []
  updatedComments.splice(index, 1)

  const updatedJob = {
    ...job,
    comments: updatedComments
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
      comments.value.splice(index, 1)
    } else {
      showJobCommentError()
    }
  } catch (error) {
    console.error('Error deleting comment:', error)
    showJobCommentError()
  }
}
</script>
