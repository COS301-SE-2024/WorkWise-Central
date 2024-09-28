<template>
  <div class="time-tracker">
    <h2>Time Tracker</h2>
    <div v-if="!isCheckedIn" class="status">Not checked in</div>
    <div v-else-if="isCheckedIn" class="status">Checked in</div>
    <div v-else class="status">Checked out</div>

    <div class="timer">{{ formattedTime }}</div>

    <button v-if="!isCheckedIn" @click="checkIn">Check In</button>
    <button v-else-if="isCheckedIn" @click="checkOut">Check Out</button>

    <button v-if="isCheckedIn" @click="toggleTimer">
      {{ isRunning ? 'Pause' : 'Resume' }}
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/main'

function getEmployeeId() {
  return localStorage.getItem('employeeId')
}

export default {
  props: { jobID: String },
  data() {
    return {
      isCheckedIn: false,
      checkInTime: null,
      checkOutTime: null,
      timeElapsed: 0,
      isRunning: false,
      pauses: [],
      timerId: null,
      config: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    }
  },
  computed: {
    formattedTime() {
      const hours = Math.floor(this.timeElapsed / 3600)
      const minutes = Math.floor((this.timeElapsed % 3600) / 60)
      const seconds = Math.floor(this.timeElapsed % 60)
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },
  methods: {
    async checkIn() {
      this.isCheckedIn = true
      this.checkInTime = new Date()
      const response = await axios.post(
        `${API_URL}time-tracker/check-in`,
        {
          employeeId: getEmployeeId(),
          jobId: this.jobID
        },
        this.config
      )
      console.log(response)
      this.startTimer()
    },
    async checkOut() {
      this.isCheckedIn = false
      this.stopTimer()
      const response = await axios.post(
        `${API_URL}time-tracker/check-out`,
        {
          employeeId: getEmployeeId(),
          jobId: this.jobID
        },
        this.config
      )
      console.log(response)
    },
    startTimer() {
      this.isRunning = true
      this.timerId = setInterval(() => {
        this.timeElapsed++
      }, 1000)
    },
    stopTimer() {
      this.isRunning = false
      clearInterval(this.timerId)
    },
    toggleTimer() {
      if (this.isRunning) {
        this.stopTimer()
        this.pause()
      } else {
        this.resume()
        this.startTimer()
      }
    },
    async pause() {
      const a = await axios.post(
        `${API_URL}time-tracker/pause`,
        {
          employeeId: getEmployeeId(),
          jobId: this.jobID
        },
        this.config
      )
      console.log(a)
    },
    async resume() {
      const b = await axios.post(
        `${API_URL}time-tracker/resume`,
        {
          employeeId: getEmployeeId(),
          jobId: this.jobID
        },
        this.config
      )
      console.log(b)
    },
    async getTotalTimeSpent() {
      const baseUrl = API_URL
      const employeeId = getEmployeeId()
      if (!employeeId) {
        console.error('Employee ID not found')
        return
      }

      try {
        const response = await axios.get(
          `${baseUrl}time-tracker/sofar/total-time-spent?empId=${employeeId}&jobId=${this.jobID}`,
          { headers: this.config.headers }
        )

        if (response.status === 200) {
          console.log('Total time spent:', response.data.data)
          this.timeElapsed = response.data.data.timeWorked
        } else {
          console.error('Failed to get total time spent:', response.status)
        }
      } catch (error) {
        console.error('Error fetching total time spent:', error)
      }
    },
    async checkIfEmployeeIsCheckedIn() {
      const baseUrl = API_URL
      const employeeId = getEmployeeId()
      if (!employeeId) {
        console.error('Employee ID not found')
        return false
      }

      try {
        const response = await axios.get(
          `${baseUrl}time-tracker/employee/is-checked-in?empId=${employeeId}&jobId=${this.jobID}`,
          { headers: this.config.headers }
        )

        if (response.status === 200) {
          console.log('Check-in status:', response.data.data)
          this.isCheckedIn = response.data.data.isCheckedIn
          this.isRunning = response.data.data.isRunning
          if (this.isRunning) this.startTimer()
        } else {
          console.error('Failed to get check-in status:', response.status)
          return false
        }
      } catch (error) {
        console.error('Error fetching check-in status:', error)
        return false
      }
    }
  },
  beforeUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  },
  async mounted() {
    await this.getTotalTimeSpent()
    await this.checkIfEmployeeIsCheckedIn()
  }
}
</script>

<style scoped>
.time-tracker {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

.status {
  font-weight: bold;
  margin-bottom: 10px;
}

.timer {
  font-size: 2em;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  margin: 5px;
}
</style>
