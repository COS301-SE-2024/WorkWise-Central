<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col>
        <v-sheet
          height="auto"
          class="pa-16 ma-0"
          rounded="md"
          :theme="isdarkmode ? 'dark' : 'light'"
          border="md"
        >
          <v-row>
            <!-- Recent Jobs Completed Card -->
            <v-col cols="12" md="4">
              <v-card class="pa-4" border="md">
                <v-card-title>Recent Jobs Completed</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(job, index) in recentJobs" :key="index">
                      <v-list-item-content>{{ job.title }}</v-list-item-content>
                      <v-list-item-subtitle>{{ job.date }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Most Active Employees Card -->
            <v-col cols="12" md="4">
              <v-card class="pa-4" border="md">
                <v-card-title>Most Active Employees</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(employee, index) in activeEmployees" :key="index">
                      <v-list-item-content>{{ employee.name }}</v-list-item-content>
                      <v-list-item-subtitle>{{ employee.activityLevel }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Hours Worked by Employees Card -->
            <v-col cols="12" md="4">
              <v-card class="pa-4" border="md">
                <v-card-title>Hours Worked</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(employee, index) in hoursWorked" :key="index">
                      <v-list-item-content>{{ employee.name }}</v-list-item-content>
                      <v-list-item-subtitle>{{ employee.hours }} hours</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <!-- Calendar Card -->
            <v-col cols="12">
              <v-card class="pa-11" height="auto" border="md">
                <v-card-title>Calendar</v-card-title>
                <v-card-text>
                  <v-calendar
                    ref="calendar"
                    color="primary"
                    :weekdays="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                  ></v-calendar>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- Upcoming Appointments Card -->
          </v-row>
          <v-row
            ><v-col cols="12" md="6">
              <v-card class="pa-4" border="md">
                <v-card-title>Upcoming Appointments</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(appointment, index) in upcomingAppointments" :key="index">
                      <v-list-item-content>{{ appointment.title }}</v-list-item-content>
                      <v-list-item-subtitle>{{ appointment.date }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- Team Breakdown Card -->
            <v-col cols="12" md="6">
              <v-card class="pa-4" border="md">
                <v-card-title>Team Breakdown</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(team, index) in teams" :key="index">
                      <v-list-item-content>{{ team.name }}</v-list-item-content>
                      <v-list-item-subtitle>{{ team.members }} members</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col></v-row
          >
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
      isdarkmode: sessionStorage.getItem('isdarkmode') === 'true' ? true : false
    }
  }
}
</script>

<style scoped>
.fixed-container {
  min-height: 100vh;
}

.pa-11 {
  padding: 44px !important;
}

.ma-10 {
  margin: 40px !important;
}

.pa-4 {
  padding: 16px !important;
}

.v-card-title {
  font-weight: bold;
}
</style>
