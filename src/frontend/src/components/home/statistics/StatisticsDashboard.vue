<template>
  <v-container fluid fill-height>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Statistics Dashboard</h2>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card
          height="auto"
          class="pa-16 ma-0 bg-background"
          rounded="md"
          border="md"
          elevation="0"
        >
          <v-tabs v-model="activeTab" fixed-tabs bg-color="secondary" rounded="md">
            <v-tab v-for="tab in tabs" :key="tab" @click="changeTab(tab)">{{ tab }}</v-tab>
            <v-spacer></v-spacer>
          </v-tabs>
          <v-spacer></v-spacer>
          <v-tabs-items v-model="activeTab">
            <!-- Recent Jobs Completed Chart -->
            <v-tab-item v-if="currentTab === 'Client Breakdown'">
              <ClientBreakdown />
            </v-tab-item>

            <!-- Most Active Employees Chart -->
            <v-tab-item v-if="currentTab === 'Employee Breakdown'">
              <EmployeeBreakdown />
            </v-tab-item>

            <!-- Hours Worked Chart -->
            <v-tab-item v-if="currentTab === 'Job Breakdown'">
              <JobBreakdown />
            </v-tab-item>

            <!-- Upcoming Appointments Chart -->
            <v-tab-item v-if="currentTab === 'Inventory Breakdown'">
              <InventoryBreakdown />
            </v-tab-item>

            <!-- Team Breakdown Chart -->
            <v-tab-item v-if="currentTab === 'Team Breakdown'">
              <TeamBreakdown />
            </v-tab-item>

            <!-- Invoice Breakdown Chart -->
            <v-tab-item v-if="currentTab === 'Invoice Breakdown'">
              <InvoiceBreakdown />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

import ClientBreakdown from './ClientBreakdown.vue'
import JobBreakdown from './JobBreakdown.vue'
import EmployeeBreakdown from './EmployeeBreakdown.vue'
import InventoryBreakdown from './InventoryBreakdown.vue'
import InvoiceBreakdown from './InvoiceBreakdown.vue'
import TeamBreakdown from './TeamBreakdown.vue'

export default defineComponent({
  name: 'StatisticsDashboard',
  components: {
    ClientBreakdown,
    EmployeeBreakdown,
    InventoryBreakdown,
    InvoiceBreakdown,
    JobBreakdown,
    TeamBreakdown
  },
  data() {
    return {
      activeTab: 0,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      currentTab: 'Client Breakdown',
      tabs: [
        'Client Breakdown',
        'Employee Breakdown',
        'Job Breakdown',
        'Inventory Breakdown',
        'Team Breakdown',
        'Invoice Breakdown'
      ]
    }
  },
  methods: {
    changeTab(tab: string) {
      this.currentTab = tab
    },
    async getClients() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .get(`${apiURL}client/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response: any) => {
          console.log(response.data)
          this.clients = response.data.data
          console.log(this.clients)

          for (let i = 0; i < this.clients.length; i++) {
            this.clientIds[i] = this.clients[i]._id
            console.log(this.clientIds[i])
            this.clientDetails[i] = this.clients[i].details
            console.log(this.clientDetails[i])
          }
          console.log(this.clientDetails)
        })
        .catch((error: any) => {
          console.error('Failed to fetch clients:', error)
        })
    },
    async isLocalAvailable(localUrl: any) {
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
    },
    async getInventoryItems() {
      // Fetch inventory items from the backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployee: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}inventory/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        this.inventoryItems = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async getTeams() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}team/detailed/all/${localStorage.getItem('currentCompany')}`,
          config
        )
        console.log(response.data.data)
        this.teamItems = response.data.data
        this.teamLeaderId = response.data.data.teamLeaderId
      } catch (error) {
        console.error(error)
      }
    },
    async getEmployees() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        this.employees = response.data.data
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    // this.getClients()
    // this.getInventoryItems()
    // this.getTeams()
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
