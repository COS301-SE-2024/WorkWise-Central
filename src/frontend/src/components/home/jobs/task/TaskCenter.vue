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
            <v-list-item v-for="job in recentJobs" :key="job.id">
              <v-list-item-content>
                <v-list-item-title>{{ job.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ job.status }}</v-list-item-subtitle>
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
          <v-tab>Completed Jobs</v-tab>
          <v-tab>Ongoing Jobs</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <v-list>
              <v-list-item v-for="job in completedJobs" :key="job.id">
                <v-list-item-content>
                  <v-list-item-title>{{ job.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ job.status }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <ReportForm />
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-list>
              <v-list-item v-for="job in ongoingJobs" :key="job.id">
                <v-list-item-content>
                  <v-list-item-title>{{ job.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ job.status }}</v-list-item-subtitle>
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
  id: number
  name: string
  status: string
}

export default defineComponent({
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      automatedAssignment: false,
      activeTab: 0,
      jobs: [] as Job[],
      recentJobs: [
        { id: 1, name: 'Fix Leak', status: 'To Do' },
        { id: 2, name: 'Install Light', status: 'To Do' }
        // Add more recent jobs here
      ] as Job[],
      completedJobs: [
        { id: 3, name: 'Paint Wall', status: 'Completed' },
        { id: 4, name: 'Replace Pipe', status: 'Completed' }
        // Add more completed jobs here
      ] as Job[],
      ongoingJobs: [
        { id: 5, name: 'Repair Roof', status: 'In Progress' },
        { id: 6, name: 'Install Sink', status: 'In Progress' }
        // Add more ongoing jobs here
      ] as Job[]
    }
  },
  components: {
    ReportForm
  },
  methods: {
    createReport(job: Job) {
      alert(`Creating report for job: ${job.name}`)
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
        const apiURL = await this.getRequestUrl()
        const response = await axios.get(
          `${apiURL}job/all/company/${localStorage.getItem('currentCompany')}`,
          config
        )
        console.log(response)
        this.jobs = response.data
      } catch (error) {
        console.error('Error fetching jobs:', error)
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
