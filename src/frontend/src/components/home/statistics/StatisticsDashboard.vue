<template>
  <v-container fluid fill-height>
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
            <v-tab-item v-if="currentTab === 'Recent Jobs Completed'">
              <v-card border="md" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-briefcase mr-2"></v-icon>
                  Recent Jobs Completed
                </v-card-title>
                <v-card-text class="bg-cardColor">
                  <v-list>
                    <v-list-item v-for="(job, index) in recentJobs" :key="index">
                      <v-chip variant="text" class="pa-5 ma-2">
                        <v-list-item-content>
                          {{ job.title }}
                          <v-list-item-subtitle>{{ job.date }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-chip>
                      <v-divider></v-divider>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="currentTab === 'Most Active Employees'">
              <v-card border="md" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-user-friends mr-2"></v-icon>
                  Most Active Employees
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(employee, index) in activeEmployees" :key="index">
                      <v-chip variant="text" class="pa-5 ma-2">
                        <v-list-item-content>
                          {{ employee.name }}
                          <v-list-item-subtitle>{{ employee.activityLevel }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-chip>
                      <v-divider></v-divider>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="currentTab === 'Hours Worked'">
              <v-card border="md" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-clock mr-2"></v-icon>
                  Hours Worked
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(employee, index) in hoursWorked" :key="index">
                      <v-chip variant="tonal" class="pa-5 ma-2">
                        <v-list-item-content>
                          {{ employee.name }}
                          <v-list-item-subtitle>{{ employee.hours }} hours</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-chip>
                      <v-divider v-if="index < hoursWorked.length - 1"></v-divider>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="currentTab === 'Upcoming Appointments'">
              <v-card border="md" rounded="md" height="auto">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-calendar-alt mr-2"></v-icon>
                  Upcoming Appointments
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(appointment, index) in upcomingAppointments" :key="index">
                      <v-chip variant="text" class="pa-5 ma-2">
                        <v-list-item-content>
                          {{ appointment.title }}
                          <v-list-item-subtitle>{{ appointment.date }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-chip>
                      <v-divider></v-divider>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="currentTab === 'Team Breakdown'">
              <v-card border="md" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-users mr-2"></v-icon>
                  Team Breakdown
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(team, index) in teams" :key="index">
                      <v-list-item-content>
                        {{ team.name }}
                        <v-list-item-subtitle>{{ team.members }} members</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-divider></v-divider>
                    </v-list-item>
                  </v-list>
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

export default defineComponent({
  name: 'StatisticsDashboard',
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
      recentJobs: [
        { title: 'Job 1', date: '2024-06-21' },
        { title: 'Job 2', date: '2024-06-20' },
        { title: 'Job 3', date: '2024-06-19' }
      ],
      activeEmployees: [
        { name: 'Alice', activityLevel: 'High' },
        { name: 'Bob', activityLevel: 'Medium' },
        { name: 'Charlie', activityLevel: 'Low' }
      ],
      hoursWorked: [
        { name: 'Alice', hours: 40 },
        { name: 'Bob', hours: 35 },
        { name: 'Charlie', hours: 30 }
      ],
      upcomingAppointments: [
        { title: 'Meeting with Client A', date: '2024-06-24' },
        { title: 'Team Sync', date: '2024-06-25' },
        { title: 'Project Deadline', date: '2024-06-26' }
      ],
      teams: [
        { name: 'Development Team', members: 10 },
        { name: 'Marketing Team', members: 8 },
        { name: 'Support Team', members: 6 }
      ],
      isDarkMode: sessionStorage.getItem('isDarkMode') === 'true' ? true : false
    }
  },
  methods: {
    getColorCompetition(index: number) {
      switch (index) {
        case 0:
          return 'firstPlace'
        case 1:
          return 'secondPlace'
        case 2:
          return 'thirdPlace'
        default:
          return ''
      }
    },
    getColorImportance(index: number) {
      switch (index) {
        case 0:
          return 'red'
        case 1:
          return 'orange'
        case 2:
          return 'yellow'
        default:
          return ''
      }
    },
    changeTab(tab: string) {
      this.currentTab = tab
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
