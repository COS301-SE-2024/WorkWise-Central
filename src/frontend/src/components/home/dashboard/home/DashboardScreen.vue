<template>
  <v-container fluid fill-height>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Dashboard</h2>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row justify="center">
      <v-col>
        <!-- Calendar Card -->
        <v-col cols="12">
          <v-card :max-height="1500" border="md" rounded="lg" class="bg-cardColor">
            <v-icon icon="fa:fa-solid fa-calender-alt"></v-icon>
            <v-card-title>Calendar</v-card-title>

            <v-card-item>
              <div class="calendar-container-dark is-light-mode" :style="{ height: '700px' }">
                <Qalendar />
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Qalendar from '@/components/home/dashboard/home/Calendar.vue'
export default {
  components: {
    Qalendar
  },
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
      isDarkMode: sessionStorage.getItem('isDarkMode') === 'true' ? true : false
    }
  },
  methods: {
    getColorCompetition(index) {
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
    getColorImportance(index) {
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
    created() {
      const isLogged = !!localStorage.getItem('access_token')
      if (!isLogged) {
        this.$router.push({ name: 'splash' })
      }
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

/* .calendar-container-dark {
  background-color: transparent;
  color: grey;
}

.calendar-container-light {
  background-color: transparent;
  color: darkslategrey;
} */
</style>
