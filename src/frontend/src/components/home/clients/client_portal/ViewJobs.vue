<template>
  <v-container>
    <v-card class="bg-cardColor">
      <v-card-title class="text-h5">Current Jobs</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="job in jobs" :key="job.id">
          <v-list-item-content>
            <v-list-item-title>{{ job.name }}</v-list-item-title>
            <v-list-item-subtitle>Status: {{ job.status }}</v-list-item-subtitle>
            <v-list-item-subtitle>Start Date: {{ job.startDate }}</v-list-item-subtitle>
            <v-list-item-subtitle
              >Expected Completion: {{ job.expectedCompletion }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Employee Location: {{ job.employeeLocation }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-btn color="success" @click="trackEmployee(job)"
            ><v-icon icon="fa: fa-solid fa-file" color="success"></v-icon>Track Employee</v-btn
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clientId: '',
      jobs: [
        {
          id: 1,
          name: 'Job 1',
          status: 'In Progress',
          startDate: '2023-07-01',
          expectedCompletion: '2023-08-01',
          employeeLocation: 'Not Available'
        },
        {
          id: 2,
          name: 'Job 2',
          status: 'Pending',
          startDate: '2023-08-15',
          expectedCompletion: '2023-09-15',
          employeeLocation: 'Not Available'
        }
      ]
    }
  },
  methods: {
    trackEmployee(job) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            job.employeeLocation = `Lat: ${latitude}, Lon: ${longitude}`
          },
          (error) => {
            console.error('Geolocation failed', error)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    },
    getRequests() {
      
    }
  },
  mounted() {
    if (sessionStorage.getItem('clientId') !== null) {
      this.clientId = sessionStorage.getItem('clientId')
    }
    this.getRequests()
  }
}
</script>
