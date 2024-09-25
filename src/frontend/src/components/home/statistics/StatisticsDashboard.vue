<template>
  <v-container fluid fill-height>
     <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h4>Statistics</h4>
      </v-col>
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
          <v-tabs-items v-model="activeTab" >
            <!-- Recent Jobs Completed Chart -->
            <v-tab-item v-if="currentTab === 'Recent Jobs Completed'">
              <v-card border="" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-briefcase mr-2"></v-icon>
                  Recent Jobs Completed
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="bar"
                    :data="recentJobsChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Most Active Employees Chart -->
            <v-tab-item v-if="currentTab === 'Most Active Employees'">
              <v-card border="md" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-user-friends mr-2"></v-icon>
                  Most Active Employees
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="bar"
                    :data="activeEmployeesChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Hours Worked Chart -->
            <v-tab-item v-if="currentTab === 'Hours Worked'">
              <v-card border="md" rounded="md" height="700px">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-clock mr-2"></v-icon>
                  Hours Worked
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="line"
                    :data="hoursWorkedChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Upcoming Appointments Chart -->
            <v-tab-item v-if="currentTab === 'Upcoming Appointments'">
              <v-card border="md" rounded="md" height="700px">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-calendar-alt mr-2"></v-icon>
                  Upcoming Appointments
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="doughnut"
                    :data="upcomingAppointmentsChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Team Breakdown Chart -->
            <v-tab-item v-if="currentTab === 'Team Breakdown'">
              <v-card border="md" rounded="md" height="700px">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-users mr-2"></v-icon>
                  Team Breakdown
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="bar"
                    :data="teamBreakdownChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Chart from 'primevue/chart'

export default defineComponent({
  name: 'StatisticsDashboard',
  components: {
    Chart
  },
  data() {
    return {
      activeTab: 0,
      currentTab: 'Recent Jobs Completed',
      tabs: [
        'Recent Jobs Completed',
        'Most Active Employees',
        'Hours Worked',
        'Upcoming Appointments',
        'Team Breakdown'
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      recentJobsChartData: {
        labels: ['Job 1', 'Job 2', 'Job 3'],
        datasets: [
          {
            label: 'Jobs Completed',
            backgroundColor: '#42A5F5',
            data: [10, 15, 8]
          }
        ]
      },
      activeEmployeesChartData: {
        labels: ['Alice', 'Bob', 'Charlie'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      hoursWorkedChartData: {
        labels: ['Alice', 'Bob', 'Charlie'],
        datasets: [
          {
            label: 'Hours Worked',
            backgroundColor: '#42A5F5',
            data: [40, 35, 30]
          }
        ]
      },
      upcomingAppointmentsChartData: {
        labels: ['Client Meeting', 'Team Sync', 'Project Deadline'],
        datasets: [
          {
            data: [5, 7, 9],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
          }
        ]
      },
      teamBreakdownChartData: {
        labels: ['Development', 'Marketing', 'Support'],
        datasets: [
          {
            label: 'Team Members',
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            data: [10, 8, 6]
          }
        ]
      }
    }
  },
  methods: {
    changeTab(tab: string) {
      this.currentTab = tab
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
