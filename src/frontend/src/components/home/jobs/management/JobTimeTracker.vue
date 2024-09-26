<template>
  <div class="mb-4">
    <Button
      :label="isCheckedIn ? 'Check Out' : 'Check In'"
      @click="toggleCheckIn"
      class="mr-2"
      :class="{ 'p-button-success': !isCheckedIn, 'p-button-danger': isCheckedIn }"
    />
  </div>
  <div class="text-h6 mb-4">Total Time spent on this job: {{ formattedTime }}</div>
  <div>
    <Button
      :label="buttonLabel + ' timer ' + extraLabel"
      @click="toggleJobRunning"
      :disabled="!isCheckedIn"
      class="mr-2"
      :class="{ 'p-button-warning': isJobRunning, 'p-button-success': !isJobRunning }"
    />
    <!--    <Button-->
    <!--      label="Stop"-->
    <!--      @click="stopTimer"-->
    <!--      :disabled="!isCheckedIn || !isRunning"-->
    <!--      class="p-button-danger"-->
    <!--    />-->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onUnmounted, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import axios from 'axios'
import { API_URL } from '@/main'

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status >= 200 && res.status < 300
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const props = defineProps<{ jobID: string }>()

const isCheckedIn = ref(false)
const isJobRunning = ref(false) // Reflects the API's isRunning (job not paused)
const elapsedTime = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

const buttonLabel = computed(() => (isJobRunning.value ? 'Pause' : 'Resume'))
const extraLabel = computed(() => (isJobRunning.value ? '' : '(You are currently on a break)'))

const formattedTime = computed(() => {
  const hours = Math.floor(elapsedTime.value / 3600)
  const minutes = Math.floor((elapsedTime.value % 3600) / 60)
  const seconds = Math.floor(elapsedTime.value % 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const getEmployeeId = (): string | null => {
  return localStorage.getItem('employeeId')
}

const makeApiCall = async (endpoint: string, action: string) => {
  try {
    const baseUrl = await getRequestUrl()
    const url = `${baseUrl}${endpoint}`
    const employeeId = getEmployeeId()

    if (!employeeId) {
      console.error('Employee ID not found')
      return false
    }

    const response = await axios.post(
      url,
      {
        employeeId: employeeId,
        jobId: props.jobID
      },
      { headers: config.headers }
    )

    if (response.status >= 200 && response.status < 300) {
      console.log(`${action} successful`)
      return true
    } else {
      console.error(`${action} failed: ${response.status}`)
      return false
    }
  } catch (error) {
    console.error(`Error during ${action}:`, error)
    return false
  }
}

const startTimer = () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedTime.value++
    }, 1000)
  }
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const updateTimerState = () => {
  if (isCheckedIn.value && isJobRunning.value) {
    startTimer()
  } else {
    stopTimer()
  }
}

const toggleCheckIn = async () => {
  const endpoint = isCheckedIn.value ? 'time-tracker/check-out' : 'time-tracker/check-in'
  const action = isCheckedIn.value ? 'Check-out' : 'Check-in'

  const success = await makeApiCall(endpoint, action)

  if (success) {
    isCheckedIn.value = !isCheckedIn.value
    if (!isCheckedIn.value) {
      isJobRunning.value = false
      elapsedTime.value = 0
    } else {
      isJobRunning.value = true
    }
    updateTimerState()
  }
  await getTotalTimeSpent()
}

const toggleJobRunning = async () => {
  const endpoint = isJobRunning.value ? 'time-tracker/pause' : 'time-tracker/resume'
  const action = isJobRunning.value ? 'Pause' : 'Resume'

  const success = await makeApiCall(endpoint, action)

  if (success) {
    isJobRunning.value = !isJobRunning.value
    updateTimerState()
  }
}

const getTotalTimeSpent = async () => {
  const baseUrl = await getRequestUrl()
  const employeeId = getEmployeeId()
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }

  try {
    const response = await axios.get(
      `${baseUrl}time-tracker/sofar/total-time-spent?empId=${employeeId}&jobId=${props.jobID}`,
      { headers: config.headers }
    )

    if (response.status === 200) {
      console.log('Total time spent:', response.data.data)
      elapsedTime.value = response.data.data.timeWorked
    } else {
      console.error('Failed to get total time spent:', response.status)
    }
  } catch (error) {
    console.error('Error fetching total time spent:', error)
  }
}

const checkIfEmployeeIsCheckedIn = async () => {
  const baseUrl = API_URL
  const employeeId = getEmployeeId()
  if (!employeeId) {
    console.error('Employee ID not found')
    return false
  }

  try {
    const response = await axios.get(
      `${baseUrl}time-tracker/employee/is-checked-in?empId=${employeeId}&jobId=${props.jobID}`,
      { headers: config.headers }
    )

    if (response.status === 200) {
      console.log('Check-in status:', response.data.data)
      isCheckedIn.value = response.data.data.isCheckedIn
      isJobRunning.value = response.data.data.isRunning
      updateTimerState()
    } else {
      console.error('Failed to get check-in status:', response.status)
      return false
    }
  } catch (error) {
    console.error('Error fetching check-in status:', error)
    return false
  }
}

onMounted(async () => {
  await getTotalTimeSpent()
  await checkIfEmployeeIsCheckedIn()
})

watch(() => props.jobID, getTotalTimeSpent)

// Clean up the interval when the component is unmounted
onUnmounted(() => {
  stopTimer()
})
</script>
<style scoped>
.p-button {
  margin-right: 0.5rem;
}
</style>
