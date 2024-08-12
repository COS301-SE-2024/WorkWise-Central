<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mb-5">
          <v-card-title>
            Recently Added Jobs
            <!-- <v-switch
              class="ml-auto"
              v-model="automatedAssignment"
              label="Automated Job Assignment"
            ></v-switch> -->
          </v-card-title>
          <v-list>
            <v-list-item v-for="job in recentJobs" :key="job.details.heading">
              <v-list-item-content>
                <v-list-item-title>{{ job.details.heading }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  job.taskList.map((task) => task.name).join(', ')
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <ReportForm />
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-tabs v-model="activeTab" bg-color="secondary">
          <v-tab>All Jobs</v-tab>
          <v-tab>Completed Jobs</v-tab>
          <v-tab>Ongoing Jobs</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <v-list>
              <v-list-item v-for="job in jobs" :key="job.details.heading">
                <v-list-item-content>
                  <v-list-item-title>{{ job.details.heading }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    job.taskList.map((task) => task.name).join(', ')
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <ReportForm />
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list>
              <v-list-item v-for="job in completedJobs" :key="job.details.heading">
                <v-list-item-content>
                  <v-list-item-title>{{ job.details.heading }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    job.taskList.map((task) => task.name).join(', ')
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <ReportForm />
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-list>
              <v-list-item v-for="job in ongoingJobs" :key="job.details.heading">
                <v-list-item-content>
                  <v-list-item-title>{{ job.details.heading }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    job.taskList.map((task) => task.name).join(', ')
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <ReportForm />
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import ReportForm from './ReportForm.vue'

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
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
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
      const apiUrl = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiUrl}job/all/company/detailed/${localStorage.getItem('currentCompany')}`,
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
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  },
  mounted() {
    this.getJobs()
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
