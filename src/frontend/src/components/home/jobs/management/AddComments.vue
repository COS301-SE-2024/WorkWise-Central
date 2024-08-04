<template>
  <div>
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
          <v-btn @click="deleteComment(index)">
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
      <v-btn color="success" @click="comment" prepend-icon="mdi-comment-plus">Comment</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const newComment = ref('')

// Comments and new comment
const comments = ref<{ text: string, employeeId: string, date: string }[]>([])

interface Comment {
  employeeId: string;
  newComment: string;
  date: string;
}

const user = ref({
  initials: ''
})

const props = defineProps<{ jobComments: Comment[], id: string }>()

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

const getUserData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}users/id/${localStorage.getItem('id')}`, config)
    const userData = response.data.data;
    user.value.initials = getInitials(userData.personalInfo.firstName, userData.personalInfo.surname);
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

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.patch(`${apiUrl}job/${props.id}`,
      { newComment: newComment.value },
      config
    )
    comments.value.push({
      text: newComment.value,
      employeeId: localStorage.getItem('employeeId'),
      date: new Date().toISOString()
    })
    newComment.value = ''
    showJobCommentSuccess()
  } catch (error) {
    console.error('Error adding comments', error)
    showJobCommentError()
  }
}

const deleteComment = async (index: number) => {
  const commentToDelete = comments.value[index]

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()
  try {
    await axios.delete(`${apiUrl}job/${props.id}/comments/${commentToDelete.employeeId}`, config)
    comments.value.splice(index, 1)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Comment deleted successfully',
      life: 3000
    })
  } catch (error) {
    console.error('Error deleting comment', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while deleting the comment',
      life: 3000
    })
  }
}

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

const getInitials = (firstName: string, surname: string): string => {
  return `${firstName.charAt(0)}${surname.charAt(0)}`.toUpperCase();
};

onMounted(async () => {
  await getUserData()
  comments.value = props.jobComments.map((comment) => ({
    text: comment.newComment,
    employeeId: comment.employeeId,
    date: comment.date
  }))
})

</script>
