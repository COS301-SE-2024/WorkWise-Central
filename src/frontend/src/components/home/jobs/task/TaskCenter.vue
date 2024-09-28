<template>
  <main>
    <ReportForm />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import ReportForm from './ReportForm.vue'
import { API_URL } from '@/main'

interface Job {
  companyId: {}
  status: string
  clientId: {}
  assignedBy: {}
  assignedEmployees: {
    employeeIds: {}[]
    teamIds: {}[]
  }
  details: {
    heading: string
    description: string
    address: {
      street: string
      province: string
      suburb: string
      city: string
      postalCode: string
      complex: string
      houseNumber: string
    }
    startDate: string
    endDate: string
  }
  recordedDetails: {
    imagesTaken: any[]
    inventoryUsed: any[]
  }
  clientFeedback: {
    jobRating: number
    customerServiceRating: number
    comments: string
  }
  taskList: {
    name: string
    status: 'To do' | 'In progress' | 'Done'
    assignedEmployees: any[]
  }[]
  comments: {
    employeeId: {}
    comment: string
    date: string
  }[]
  tags: any[]
  priorityTag: {}
  attachments: string[]
}

export default defineComponent({
  data() {
    return {
      automatedAssignment: false,
      activeTab: 0,
      jobs: [] as Job[],
      recentJobs: [] as Job[],
      completedJobs: [] as Job[],
      ongoingJobs: [] as Job[]
    }
  },
  components: {
    ReportForm
  },
  methods: {
    async createReport(job: Job) {
      // Implement the report creation logic here
    },
    async getJobs() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const response = await axios.get(
          `${API_URL}job/all/company/detailed/${localStorage.getItem('currentCompany')}?currentEmployeeId=${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        this.jobs = response.data.data
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Fetch Data Error',
          detail: 'Failed to fetch data',
          life: 3000
        })
      }
    },
  },
  mounted() {
    this.getJobs()
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
