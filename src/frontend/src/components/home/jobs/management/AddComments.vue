<template>
  <div>
    <v-container>
      <!-- Display comments -->
      <v-row
        v-for="(comment, index) in paginatedComments"
        :key="index"
        class="d-flex align-center mb-3"
      >
        <v-col cols="2" class="pt-2">
          <v-avatar color="secondary" style="width: 38px; height: 36px">
            <!-- Display image of the comment's employee -->
            <img
              :src="comment.displayImage"
              alt="Employee Image"
              style="width: 100%; height: 100%; object-fit: cover"
            />
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
            :disabled="isAdding || isDeleting"
            auto-grow
            multi-line
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <!-- Delete comment button -->
          <!--          <v-btn @click="deleteComment(index)">-->
          <!--            <v-icon color="red" class="fa fa-trash pt-1"></v-icon>-->
          <!--          </v-btn>-->
          <Button
            icon="fa: fa-solid fa-trash"
            class="p-button-danger"
            :disabled="isAdding"
            :loading="isDeleting"
            @click="deleteComment(index)"
          />
        </v-col>
      </v-row>

      <!-- Pagination -->
      <v-row>
        <v-col offset="1">
          <v-pagination v-model="currentPage" :length="totalPages" color="primary"></v-pagination>
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
        :disabled="isAdding || isDeleting"
      ></v-textarea>

      <!-- Submit button -->
      <!--      <v-btn color="success" @click="addComment" prepend-icon="mdi-comment-plus">Comment</v-btn>-->
      <div class="pt-2">
        <Button
          label="Comment"
          icon="mdi mdi-comment-plus"
          class="p-button-primary"
          @click="addComment"
          :disabled="isDeleting"
          :loading="isAdding"
        />
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import { API_URL } from '@/main'

let isAdding = ref<boolean>(false)
let isDeleting = ref<boolean>(false)
const toast = useToast()

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
    displayImage: string
    displayName: string
    firstName: string
    surname: string
    username: string
  }
  _id: string
}
const firstName = ref('')
const surname = ref('')
const profilePicture = ref('')

// Data
const newComment = ref('')
const comments = ref(
  props.jobComments.map((comment) => ({
    text: comment.comment,
    employeeId: comment.employeeId._id,
    date: comment.date,
    _id: comment._id,
    firstName: comment.employeeId.userInfo.firstName,
    surname: comment.employeeId.userInfo.surname,
    displayImage: comment.employeeId.userInfo.displayImage
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

const getUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}users/id/${localStorage.getItem('id')}`, config)
    if (response.status > 199 && response.status < 300) {
      const userData = response.data.data
      console.log('User data', userData)
      firstName.value = userData.personalInfo.firstName
      surname.value = userData.personalInfo.surname
      profilePicture.value = userData.profile.displayImage
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
  isAdding.value = true
  const addedComment = ref<{ employeeId: string; jobId: string; newComment: string }>({
    employeeId: localStorage.getItem('employeeId') || '',
    jobId: props.id,
    newComment: newComment.value
  })
  try {
    const response = await axios.put(`${API_URL}job/comment`, addedComment.value, config)
    const commentId: string =
      response.data.data.comments[response.data.data.comments.length - 1]._id
    comments.value.push({
      text: newComment.value,
      date: new Date().toISOString(),
      firstName: firstName.value,
      surname: surname.value,
      _id: commentId,
      employeeId: localStorage.getItem('employeeId') || '',
      displayImage: profilePicture.value
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
  } finally {
    isAdding.value = false
  }
}

const deleteComment = async (index: number) => {
  const commentToBeRemoved = paginatedComments.value[index]
  const commentBody = ref<{ employeeId: string; jobId: string; commentId: string }>({
    employeeId: commentToBeRemoved.employeeId,
    jobId: props.id,
    commentId: commentToBeRemoved._id
  })
  const updatedComments = comments.value.filter(
    (_, i) => i !== index + (currentPage.value - 1) * commentsPerPage
  )
  try {
    isDeleting.value = true
    await axios.delete(`${API_URL}job/comment`, {
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
  } finally {
    isDeleting.value = false
  }
}

onMounted(async () => {
  await getUserData()
})
</script>

<style>
 .p-button-primary {
   background-color: #F0984D;
   outline-color: #F0984D;
   border: none; /* Add this line to remove the green outline */
 }

 .p-button-primary:hover {
   background-color: #F0984D !important; /* Ensure hover color matches */
   border: none !important; /* Add this line to remove the green outline */
 }
</style>