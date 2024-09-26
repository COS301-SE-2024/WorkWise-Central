<template>
  <div class="mb-4">
    <Button
      :label="isCheckedIn ? 'Check Out' : 'Check In'"
      @click="toggleCheckIn"
      class="mr-2"
      :class="{ 'p-button-success': !isCheckedIn, 'p-button-danger': isCheckedIn }"
    />
  </div>
  <div class="text-h6 mb-4">{{ formattedTime }}</div>
  <div>
    <Button
      :label="isRunning ? 'Pause' : 'Resume'"
      @click="toggleTimer"
      :disabled="!isCheckedIn"
      class="mr-2"
      :class="{ 'p-button-warning': isRunning, 'p-button-success': !isRunning }"
    />
    <Button
      label="Stop"
      @click="stopTimer"
      :disabled="!isCheckedIn || !isRunning"
      class="p-button-danger"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onUnmounted } from 'vue'
import Button from 'primevue/button'
import axios from 'axios'

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
    return res.status < 300 && res.status > 199
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
const isRunning = ref(false)
const elapsedTime = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const hours = Math.floor(elapsedTime.value / 3600)
  const minutes = Math.floor((elapsedTime.value % 3600) / 60)
  const seconds = elapsedTime.value % 60
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
      config
    )

    if (response.status > 199 && response.status < 300) {
      console.log(`${action} successful`)
      return true
    } else {
      console.log('Response:', response.status)
      console.error(`${action} failed`)
      return false
    }
  } catch (error) {
    console.error(`Error during ${action}:`, error)
    return false
  }
}

const toggleCheckIn = async () => {
  const endpoint = isCheckedIn.value ? 'time-tracker/check-out' : 'time-tracker/check-in'
  const action = isCheckedIn.value ? 'Check-out' : 'Check-in'

  const success = await makeApiCall(endpoint, action)

  if (success) {
    isCheckedIn.value = !isCheckedIn.value
    if (!isCheckedIn.value) {
      await stopTimer()
    }
  }
}

const toggleTimer = async () => {
  if (isRunning.value) {
    const success = await makeApiCall('time-tracker/pause', 'Pause')
    if (success) {
      if (timerInterval) clearInterval(timerInterval)
      isRunning.value = false
    }
  } else {
    const success = await makeApiCall('time-tracker/resume', 'Resume')
    if (success) {
      timerInterval = setInterval(() => {
        elapsedTime.value++
      }, 1000)
      isRunning.value = true
    }
  }
}

const stopTimer = async () => {
  if (isRunning.value) {
    const success = await makeApiCall('time-tracker/pause', 'Stop')
    if (success) {
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
      isRunning.value = false
      elapsedTime.value = 0
    }
  }
}

// Clean up the interval when the component is unmounted
onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
.p-button {
  margin-right: 0.5rem;
}
</style>
