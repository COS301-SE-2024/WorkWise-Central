<template>
  <v-container fluid fill-height class="pa-0 ma-0">
    <v-row class="fill-height justify-center align-center">
      <v-col cols="12" class="text-center">
        <h4>Statistics</h4>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col>
        <v-card
          height="100%"
          width="100%"
          class="pa-16 ma-0 bg-background"
          rounded="md"
          elevation="0"
          outlined="false"
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
import { API_URL } from '@/main'

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

    async isLocalAvailable(localUrl: any) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      return API_URL
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
