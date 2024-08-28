<template>
  <div>
    <v-container>
      <!-- Display comments -->
      <v-row v-for="(comment, index) in paginatedComments" :key="index" class="d-flex align-center mb-3">
        <v-col cols="2" class="pt-2">
          <v-avatar color="secondary" style="width: 38px; height: 36px">
            <!-- Display initials of the comment's employee -->
            <span class="text-h6">{{ getInitials(comment.firstName, comment.surname) }}</span>
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
            :hint="new Date(comment.date).toLocaleDateString()"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <!-- Delete comment button -->
          <v-btn @click="deleteComment(index)">
            <v-icon color="red" class="fa fa-trash pt-1"></v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Pagination -->
      <v-row >
        <v-col offset="1">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            color="primary"
          ></v-pagination>
        </v-col>
      </v-row>

      <!-- Add new comment textarea -->
      <v-textarea
        v-model="newComment"
        label="Add a comment"
        clearable
        auto-grow
        variant="solo"
        hint="Enter your comment here"
        hide-details
        prepend-icon="fa: fa-solid fa-comment"
        rows="3"
      ></v-textarea>

      <!-- Submit button -->
      <v-btn color="success" @click="addComment" prepend-icon="mdi-comment-plus">Comment</v-btn>
    </v-container>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// API URLs
const localUrl = 'http://localhost:3000/'
const remoteUrl = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Request Config
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

// Props
const props = defineProps<{ jobComments: Comment[]; id: string }>()

// Interfaces
interface Comment {
  employeeId: EmployeeId
  comment: string
  date: string
  _id: string
}

interface EmployeeId {
  companyId: string
  createdAt: string
  currentJobAssignments: string[]
  role: {
    permissionSuite: string[]
    roleId: string
    roleName: string
  }
  subordinateTeams: string[]
  subordinates: string[]
  superiorId: string
  updatedAt: string
  userId: string
  userInfo: {
    displayName: string
    firstName: string
    surname: string
    username: string
  }
  _id: string
}
const firstName = ref('')
const surname = ref('')

// Data
const newComment = ref('')
const comments = ref(
  props.jobComments.map((comment) => ({
    text: comment.comment,
    employeeId: comment.employeeId._id,
    date: comment.date,
    _id: comment._id,
    firstName: comment.employeeId.userInfo.firstName,
    surname: comment.employeeId.userInfo.surname
  }))
)

const currentPage = ref(1) // Tracks the current page number
const commentsPerPage = 3 // Number of comments to show per page

// Computed property to slice the comments based on current page
const paginatedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * commentsPerPage
  const endIndex = startIndex + commentsPerPage
  return comments.value.slice(startIndex, endIndex)
})

// Calculate the total number of pages
const totalPages = computed(() => {
  return Math.ceil(comments.value.length / commentsPerPage)
})

const getInitials = (firstName: string, surname: string): string => {
  const firstInitial = firstName.charAt(0).toUpperCase()
  const lastInitial = surname.charAt(0).toUpperCase()
  return `${firstInitial}${lastInitial}`
}

const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status >= 200 && res.status < 300
  } catch {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const getUserData = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}users/id/${localStorage.getItem('id')}`, config)
    if (response.status > 199 && response.status < 300) {
      const userData = response.data.data
      firstName.value = userData.personalInfo.firstName
      surname.value = userData.personalInfo.surname
    }
  } catch (error) {
    console.error('Error getting user data', error)
  }
}

const addComment = async () => {
  if (!newComment.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Comment cannot be empty',
      life: 3000
    })
    return
  }
  const apiUrl = await getRequestUrl()
  const addedComment = ref<{ employeeId: string; jobId: string; newComment: string }>({
    employeeId: localStorage.getItem('employeeId') || '',
    jobId: props.id,
    newComment: newComment.value
  })
  try {
    const response = await axios.put(`${apiUrl}job/comment`, addedComment.value, config)
    const commentId: string =
      response.data.data.comments[response.data.data.comments.length - 1]._id
    comments.value.push({
      text: newComment.value,
      date: new Date().toISOString(),
      firstName: firstName.value,
      surname: surname.value,
      _id: commentId,
      employeeId: localStorage.getItem('employeeId') || ''
    })
    newComment.value = ''
    currentPage.value = totalPages.value // Go to the last page
  } catch (error) {
    console.error('Error adding comment', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while commenting on this job',
      life: 3000
    })
  }
}

const deleteComment = async (index: number) => {
  const apiUrl = await getRequestUrl()
  const commentToBeRemoved = paginatedComments.value[index]
  const commentBody = ref<{ employeeId: string; jobId: string; commentId: string }>({
    employeeId: commentToBeRemoved.employeeId,
    jobId: props.id,
    commentId: commentToBeRemoved._id
  })
  const updatedComments = comments.value.filter((_, i) => i !== index + (currentPage.value - 1) * commentsPerPage)
  try {
    await axios.delete(`${apiUrl}job/comment`, {
      data: commentBody.value,
      headers: config.headers
    })
    comments.value = updatedComments
    // If deleting the last comment on a page, move to the previous page
    if (paginatedComments.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  } catch (error) {
    console.error('Error deleting comment', error)
  }
}

onMounted(async () => {
  await getUserData()
})
</script>
